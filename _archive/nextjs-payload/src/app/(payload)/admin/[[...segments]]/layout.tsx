import '@payloadcms/next/css'
import config from '@payload-config'
import { RootLayout, handleServerFunctions } from '@payloadcms/next/layouts'
import { importMap } from '../importMap'

export default async function AdminLayout(props: {
  children: React.ReactNode
}) {
  async function serverFunction(args: {
    name: string
    args: Record<string, unknown>
  }) {
    'use server'

    return handleServerFunctions({
      ...args,
      config,
      importMap,
    })
  }

  return RootLayout({
    ...props,
    config,
    importMap,
    serverFunction,
  })
}
