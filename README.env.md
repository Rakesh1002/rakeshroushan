# Environment Variables Setup

To enable the smart chat feature and contact form integration, you'll need to set up the following environment variables:

## Required Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```env
# OpenAI Configuration
NEXT_PUBLIC_OPENAI_API_KEY=your_openai_api_key_here

# Email Configuration (for contact form)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password_or_email_password
CONTACT_EMAIL=rakesh@example.com

# Site Configuration
NEXT_PUBLIC_SITE_URL=https://yourportfolio.com
```

## Getting Your OpenAI API Key

1. Go to [OpenAI API Keys](https://platform.openai.com/api-keys)
2. Create a new secret key
3. Copy the key and add it to your `.env.local` file

## Setting up Email (Gmail Example)

1. Enable 2-factor authentication on your Gmail account
2. Generate an App Password:
   - Go to Google Account settings
   - Security → 2-Step Verification → App passwords
   - Generate a password for "Mail"
3. Use your Gmail address for `SMTP_USER` and the app password for `SMTP_PASS`

## Production Notes

For production deployment:
- Use server-side API routes instead of client-side OpenAI calls
- Store sensitive keys securely (not in `NEXT_PUBLIC_` variables)
- Consider using services like Resend, SendGrid, or AWS SES for email

## Features Enabled

- **Smart Chat**: AI-powered responses using OpenAI GPT-3.5-turbo
- **Contact Form**: Automatic email notifications and user confirmations
- **Context Awareness**: Chat maintains conversation history
- **Smart Triggers**: Automatically suggests contact form for business inquiries