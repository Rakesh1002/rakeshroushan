import { buildConfig } from 'payload'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import 'dotenv/config'
import sharp from 'sharp'
import nodemailer from 'nodemailer'
import { nodemailerAdapter } from '@payloadcms/email-nodemailer'

// Import collections
import { Users } from './src/collections/Users'
import { Posts } from './src/collections/Posts'
import { Media } from './src/collections/Media'
import { Subscribers } from './src/collections/Subscribers'

export default buildConfig({
  admin: {
    user: 'users',
    meta: {
      titleSuffix: '- Blog Admin',
      favicon: '/favicon.ico',
      ogImage: '/og-image.jpg',
    },
  },
  editor: lexicalEditor({}),
  email: nodemailerAdapter({
    defaultFromAddress: process.env.SMTP_USER || 'no-reply@rakeshroushan.com',
    defaultFromName: process.env.EMAIL_FROM_NAME || 'RR',
    transport: nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: parseInt(process.env.SMTP_PORT || '587', 10),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    }),
  }),
  collections: [
    Users,
    Posts,
    Media,
    Subscribers,
  ],
  typescript: {
    outputFile: path.resolve(__dirname, 'payload-types.ts'),
  },
  graphQL: {
    schemaOutputFile: path.resolve(__dirname, 'generated-schema.graphql'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL,
    },
  }),
  secret: process.env.PAYLOAD_SECRET || 'your-secret-here',
  sharp,
})