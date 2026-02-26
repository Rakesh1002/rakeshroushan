'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useEffect, useMemo, useRef, useState } from 'react'
import { ExternalLink, Github, Lock, GitFork, Star } from 'lucide-react'

type RepoOwner = {
  login: string
}

type Repo = {
  id: number
  name: string
  fullName: string
  description: string | null
  htmlUrl: string
  homepage: string | null
  language: string | null
  topics: string[]
  stars: number
  forks: number
  isPrivate: boolean
  visibility: 'public' | 'private' | string
  pushedAt: string
  updatedAt: string
  isFork: boolean
  owner: RepoOwner
}

export function Projects() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const [repos, setRepos] = useState<Repo[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const includeNames = (process.env.NEXT_PUBLIC_GITHUB_INCLUDE_REPOS || '')
    .split(',')
    .map(s => s.trim().toLowerCase())
    .filter(Boolean)

  const showStats = process.env.NEXT_PUBLIC_GITHUB_SHOW_STATS !== 'false'

  useEffect(() => {
    let isMounted = true
    ;(async () => {
      try {
        setLoading(true)
        const res = await fetch('/api/github/repos', { cache: 'no-store' })
        if (!res.ok) throw new Error('Failed to load repositories')
        const data = await res.json()
        if (isMounted) setRepos(Array.isArray(data.repos) ? data.repos : [])
      } catch (e) {
        if (isMounted) setError((e as Error).message)
      } finally {
        if (isMounted) setLoading(false)
      }
    })()
    return () => {
      isMounted = false
    }
  }, [])

  const displayedRepos = useMemo(() => {
    if (includeNames.length === 0) return repos
    return repos.filter(
      r =>
        includeNames.includes(r.name.toLowerCase()) ||
        includeNames.includes(r.fullName.toLowerCase())
    )
  }, [repos])

  const repoCountText = useMemo(() => {
    if (loading) return 'Loading...'
    if (error) return 'Error loading repositories'
    return `${displayedRepos.length} repositories`
  }, [loading, error, displayedRepos.length])

  return (
    <section id="projects" className="bg-gray-50 py-20" ref={ref}>
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          className="mb-10 text-center"
        >
          <h2 className="mb-3 text-5xl font-bold text-gray-900">Projects</h2>
          <p className="text-gray-600">{repoCountText}</p>
        </motion.div>

        {error && (
          <div className="mx-auto mb-8 max-w-2xl text-center text-red-600">
            {error}
          </div>
        )}

        {loading ? (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
            {Array.from({ length: 6 }).map((_, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={
                  isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }
                }
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="rounded-xl bg-white p-5 shadow-md transition-shadow hover:shadow-lg"
              >
                <div className="animate-pulse">
                  <div className="mb-2 h-6 w-2/3 rounded bg-gray-200" />
                  <div className="mb-4 h-4 w-full rounded bg-gray-200" />
                  <div className="h-4 w-5/6 rounded bg-gray-200" />
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
            {displayedRepos.map((repo, index) => (
              <motion.div
                key={repo.id}
                initial={{ opacity: 0, y: 30 }}
                animate={
                  isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }
                }
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="rounded-xl bg-white p-5 shadow-md transition-shadow hover:shadow-lg"
              >
                <div className="mb-2 flex items-start justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <Github className="h-5 w-5 text-gray-700" />
                    <a
                      href={repo.htmlUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-lg font-semibold text-gray-900 hover:underline"
                    >
                      {repo.name}
                    </a>
                    {repo.isPrivate && (
                      <span
                        title="Private"
                        className="inline-flex items-center gap-1 rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-700"
                      >
                        <Lock className="h-3 w-3" /> Private
                      </span>
                    )}
                  </div>
                  {showStats && (
                    <div className="flex items-center gap-3 text-sm text-gray-600">
                      <div className="inline-flex items-center gap-1">
                        <Star className="h-4 w-4 text-yellow-500" />{' '}
                        {repo.stars}
                      </div>
                      <div className="inline-flex items-center gap-1">
                        <GitFork className="h-4 w-4" /> {repo.forks}
                      </div>
                    </div>
                  )}
                </div>
                {repo.description && (
                  <p className="mb-3 text-sm leading-relaxed text-gray-600">
                    {repo.description}
                  </p>
                )}
                <div className="mb-3 flex flex-wrap gap-2">
                  {repo.language && (
                    <span className="rounded-full bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700">
                      {repo.language}
                    </span>
                  )}
                  {repo.owner?.login && (
                    <span className="rounded-full bg-purple-50 px-2 py-1 text-xs font-medium text-purple-700">
                      {repo.owner.login}
                    </span>
                  )}
                  {repo.topics?.slice(0, 5).map((topic: string) => (
                    <span
                      key={topic}
                      className="rounded-full bg-gray-100 px-2 py-1 text-xs font-medium text-gray-700"
                    >
                      {topic}
                    </span>
                  ))}
                </div>
                <div className="flex items-center justify-between">
                  <div className="text-xs text-gray-500">
                    Updated {new Date(repo.pushedAt).toLocaleDateString()}
                  </div>
                  <div className="flex items-center gap-2">
                    {repo.homepage && (
                      <a
                        href={repo.homepage}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-sm text-blue-600 hover:underline"
                      >
                        <ExternalLink className="h-4 w-4" /> Live
                      </a>
                    )}
                    <a
                      href={repo.htmlUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-sm text-gray-700 hover:underline"
                    >
                      <Github className="h-4 w-4" /> Code
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-12 text-center"
        >
          <a
            href="https://github.com/Rakesh1002"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block transform rounded-full bg-gradient-to-r from-purple-600 to-pink-600 px-8 py-4 font-semibold text-white transition-all duration-300 hover:scale-105 hover:from-purple-700 hover:to-pink-700"
          >
            View All on GitHub
          </a>
        </motion.div>
      </div>
    </section>
  )
}
