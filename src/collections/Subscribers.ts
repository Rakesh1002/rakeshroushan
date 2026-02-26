import type { CollectionConfig } from 'payload'

export const Subscribers: CollectionConfig = {
  slug: 'subscribers',
  admin: {
    useAsTitle: 'email',
    group: 'Marketing',
    defaultColumns: ['email', 'firstName', 'subscribedAt', 'status'],
  },
  access: {
    create: () => true, // Allow anyone to subscribe
    read: ({ req: { user } }) =>
      Boolean(user?.role === 'admin' || user?.role === 'editor'),
    update: ({ req: { user } }) =>
      Boolean(user?.role === 'admin' || user?.role === 'editor'),
    delete: ({ req: { user } }) => Boolean(user?.role === 'admin'),
  },
  fields: [
    {
      name: 'email',
      type: 'email',
      required: true,
      unique: true,
      admin: {
        description: 'Subscriber email address',
      },
    },
    {
      name: 'firstName',
      type: 'text',
      admin: {
        description: 'Optional first name',
      },
    },
    {
      name: 'lastName',
      type: 'text',
      admin: {
        description: 'Optional last name',
      },
    },
    {
      name: 'status',
      type: 'select',
      options: [
        {
          label: 'Active',
          value: 'active',
        },
        {
          label: 'Unsubscribed',
          value: 'unsubscribed',
        },
        {
          label: 'Bounced',
          value: 'bounced',
        },
      ],
      defaultValue: 'active',
      required: true,
    },
    {
      name: 'subscribedAt',
      type: 'date',
      admin: {
        date: {
          pickerAppearance: 'dayAndTime',
        },
        readOnly: true,
      },
      defaultValue: () => new Date(),
    },
    {
      name: 'unsubscribedAt',
      type: 'date',
      admin: {
        date: {
          pickerAppearance: 'dayAndTime',
        },
        condition: data => data.status === 'unsubscribed',
      },
    },
    {
      name: 'interests',
      type: 'array',
      fields: [
        {
          name: 'interest',
          type: 'select',
          options: [
            {
              label: 'Technology',
              value: 'technology',
            },
            {
              label: 'AI & Machine Learning',
              value: 'ai-ml',
            },
            {
              label: 'Product Development',
              value: 'product-development',
            },
            {
              label: 'Leadership',
              value: 'leadership',
            },
            {
              label: 'Engineering',
              value: 'engineering',
            },
          ],
        },
      ],
    },
    {
      name: 'source',
      type: 'select',
      options: [
        {
          label: 'Blog Subscription',
          value: 'blog',
        },
        {
          label: 'Newsletter Popup',
          value: 'popup',
        },
        {
          label: 'Contact Form',
          value: 'contact',
        },
        {
          label: 'Social Media',
          value: 'social',
        },
        {
          label: 'Other',
          value: 'other',
        },
      ],
      defaultValue: 'blog',
      admin: {
        description: 'Where did they subscribe from?',
      },
    },
    {
      name: 'notes',
      type: 'textarea',
      admin: {
        description: 'Internal notes about this subscriber',
      },
    },
  ],
  hooks: {
    afterChange: [
      async ({ operation, doc, req }) => {
        if (operation === 'create' && doc.status === 'active') {
          // Send welcome email
          try {
            // You can integrate with email services like Resend, SendGrid, etc.
            console.log(`New subscriber: ${doc.email}`)
            // await sendWelcomeEmail(doc.email, doc.firstName)
          } catch (error) {
            console.error('Failed to send welcome email:', error)
          }
        }

        if (operation === 'update' && doc.status === 'unsubscribed') {
          // Update unsubscribed date
          if (!doc.unsubscribedAt) {
            await req.payload.update({
              collection: 'subscribers',
              id: doc.id,
              data: {
                unsubscribedAt: new Date().toISOString(),
              },
            })
          }
        }
      },
    ],
  },
}
