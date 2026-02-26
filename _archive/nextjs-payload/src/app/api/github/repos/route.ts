import { NextResponse } from 'next/server'

interface GitHubRepoOwner {
  login: string
  type: string
}

interface GitHubRepo {
  id: number
  name: string
  full_name: string
  description: string | null
  html_url: string
  homepage?: string | null
  language: string | null
  topics?: string[]
  stargazers_count: number
  forks_count: number
  archived: boolean
  disabled: boolean
  private: boolean
  visibility?: string
  pushed_at: string
  updated_at: string
  fork: boolean
  owner: GitHubRepoOwner
}

const GITHUB_API_BASE = 'https://api.github.com'

function getAuthHeaders() {
  const token = process.env.GITHUB_TOKEN || process.env.GITHUB_ACCESS_TOKEN
  const headers: Record<string, string> = {
    Accept: 'application/vnd.github+json',
    'X-GitHub-Api-Version': '2022-11-28',
  }
  if (token) headers.Authorization = `Bearer ${token}`
  return headers
}

function parseLinkHeader(linkHeader: string | null): Record<string, string> {
  if (!linkHeader) return {}
  const links: Record<string, string> = {}
  for (const part of linkHeader.split(',')) {
    const section = part.split(';')
    if (section.length !== 2) continue
    const url = section[0].trim().replace(/^[<]|[>]$/g, '')
    const name = section[1].trim().replace(/^rel="|"$/g, '')
    links[name] = url
  }
  return links
}

async function fetchAllReposAuthenticated(): Promise<GitHubRepo[]> {
  const headers = getAuthHeaders()
  if (!headers.Authorization) return []

  const repos: GitHubRepo[] = []
  let url = `${GITHUB_API_BASE}/user/repos?per_page=100&sort=updated&direction=desc&visibility=all&affiliation=owner,collaborator,organization_member`

  while (url) {
    const res = await fetch(url, { headers, cache: 'no-store' })
    if (!res.ok) throw new Error(`GitHub API error: ${res.status}`)
    const pageRepos = (await res.json()) as GitHubRepo[]
    repos.push(...pageRepos)
    const link = parseLinkHeader(res.headers.get('Link'))
    url = link.next || ''
  }
  return repos
}

async function fetchPublicReposForUser(
  username: string
): Promise<GitHubRepo[]> {
  const headers = getAuthHeaders()
  const repos: GitHubRepo[] = []
  let url = `${GITHUB_API_BASE}/users/${encodeURIComponent(username)}/repos?per_page=100&sort=updated&direction=desc&type=all`

  while (url) {
    const res = await fetch(url, { headers, cache: 'no-store' })
    if (!res.ok) throw new Error(`GitHub API error: ${res.status}`)
    const pageRepos = (await res.json()) as GitHubRepo[]
    repos.push(...pageRepos)
    const link = parseLinkHeader(res.headers.get('Link'))
    url = link.next || ''
  }
  return repos
}

export async function GET() {
  try {
    const targetUsername = process.env.GITHUB_USERNAME || 'Rakesh1002'

    let repos: GitHubRepo[] = []
    // Attempt to fetch all repos available to the authenticated user (includes private + org)
    const authedRepos = await fetchAllReposAuthenticated()
    if (authedRepos.length > 0) {
      repos = authedRepos
    } else {
      // Fallback: public repos for the target username
      repos = await fetchPublicReposForUser(targetUsername)
    }

    // Normalize and sort by recent activity
    const normalized = repos
      .filter(r => !r.archived && !r.disabled)
      .sort(
        (a, b) =>
          new Date(b.pushed_at).getTime() - new Date(a.pushed_at).getTime()
      )
      .map(r => ({
        id: r.id,
        name: r.name,
        fullName: r.full_name,
        description: r.description,
        htmlUrl: r.html_url,
        homepage: r.homepage || null,
        language: r.language,
        topics: r.topics || [],
        stars: r.stargazers_count,
        forks: r.forks_count,
        isPrivate: r.private,
        visibility: r.visibility || (r.private ? 'private' : 'public'),
        pushedAt: r.pushed_at,
        updatedAt: r.updated_at,
        isFork: r.fork,
        owner: r.owner,
      }))

    return NextResponse.json({ repos: normalized }, { status: 200 })
  } catch (error) {
    console.error('Error fetching GitHub repos:', error)
    return NextResponse.json(
      { error: 'Failed to fetch GitHub repositories' },
      { status: 500 }
    )
  }
}
