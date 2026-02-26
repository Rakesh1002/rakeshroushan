'use client'

import { useMemo } from 'react'

export function Footer() {
  const year = useMemo(() => new Date().getFullYear(), [])
  const name = process.env.NEXT_PUBLIC_SITE_OWNER || 'Rakesh Roushan'

  return (
    <footer className="w-full bg-gray-900 py-8 text-gray-300">
      <p className="text-center text-sm">
        © {year} {name}. All rights reserved.
      </p>
    </footer>
  )
}
