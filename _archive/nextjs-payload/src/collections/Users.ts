import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  auth: {
    verify: {
      generateEmailHTML: ({ token, user }) => {
        return `
          <h1>Please verify your email</h1>
          <p>Hello ${user.email}, please click the link below to verify your email address:</p>
          <a href="${process.env.NEXT_PUBLIC_PAYLOAD_URL}/verify?token=${token}">Verify Email</a>
        `
      },
    },
    maxLoginAttempts: 5,
    lockTime: 600 * 1000, // 10 minutes
  },
  admin: {
    useAsTitle: 'email',
    group: 'Admin',
  },
  access: {
    create: () => true,
    read: () => true,
    update: ({ req: { user } }) => Boolean(user),
    delete: ({ req: { user } }) => Boolean(user?.role === 'admin'),
  },
  fields: [
    {
      name: 'firstName',
      type: 'text',
      required: true,
    },
    {
      name: 'lastName',
      type: 'text',
      required: true,
    },
    {
      name: 'role',
      type: 'select',
      options: [
        {
          label: 'Admin',
          value: 'admin',
        },
        {
          label: 'Editor',
          value: 'editor',
        },
        {
          label: 'User',
          value: 'user',
        },
      ],
      defaultValue: 'user',
      required: true,
    },
    {
      name: 'avatar',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description: 'Profile picture',
      },
    },
  ],
}
