import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

// Create email transporter
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER, // your email
    pass: process.env.SMTP_PASS, // your email password or app password
  },
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, company, message, type, timestamp, source } = body

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Email to Rakesh
    const emailToRakesh = {
      from: process.env.SMTP_USER,
      to: process.env.CONTACT_EMAIL || process.env.SMTP_USER, // Rakesh's email
      subject: `New Contact Form Submission - ${type}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 20px; text-align: center;">
            <h1 style="color: white; margin: 0;">New Contact from Portfolio</h1>
          </div>
          
          <div style="padding: 20px; background: #f9f9f9;">
            <h2 style="color: #333; margin-top: 0;">Contact Details</h2>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 10px; border-bottom: 1px solid #ddd; font-weight: bold;">Name:</td>
                <td style="padding: 10px; border-bottom: 1px solid #ddd;">${name}</td>
              </tr>
              <tr>
                <td style="padding: 10px; border-bottom: 1px solid #ddd; font-weight: bold;">Email:</td>
                <td style="padding: 10px; border-bottom: 1px solid #ddd;"><a href="mailto:${email}">${email}</a></td>
              </tr>
              ${company ? `
              <tr>
                <td style="padding: 10px; border-bottom: 1px solid #ddd; font-weight: bold;">Company:</td>
                <td style="padding: 10px; border-bottom: 1px solid #ddd;">${company}</td>
              </tr>
              ` : ''}
              <tr>
                <td style="padding: 10px; border-bottom: 1px solid #ddd; font-weight: bold;">Type:</td>
                <td style="padding: 10px; border-bottom: 1px solid #ddd;">${type}</td>
              </tr>
              <tr>
                <td style="padding: 10px; border-bottom: 1px solid #ddd; font-weight: bold;">Source:</td>
                <td style="padding: 10px; border-bottom: 1px solid #ddd;">${source}</td>
              </tr>
              <tr>
                <td style="padding: 10px; border-bottom: 1px solid #ddd; font-weight: bold;">Date:</td>
                <td style="padding: 10px; border-bottom: 1px solid #ddd;">${new Date(timestamp).toLocaleString()}</td>
              </tr>
            </table>
            
            <h3 style="color: #333; margin-top: 20px;">Message:</h3>
            <div style="background: white; padding: 15px; border-left: 4px solid #667eea; margin: 10px 0;">
              ${message.replace(/\n/g, '<br>')}
            </div>
            
            <div style="margin-top: 20px; padding: 15px; background: #e8f4fd; border-radius: 5px;">
              <p style="margin: 0; color: #0066cc;"><strong>Quick Actions:</strong></p>
              <p style="margin: 5px 0 0 0;">
                <a href="mailto:${email}?subject=Re: Your inquiry about ${type}" style="color: #0066cc; text-decoration: none;">Reply to ${name}</a>
              </p>
            </div>
          </div>
        </div>
      `,
    }

    // Auto-reply to the user
    const autoReply = {
      from: process.env.SMTP_USER,
      to: email,
      subject: 'Thanks for reaching out! - Rakesh Roushan',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 20px; text-align: center;">
            <h1 style="color: white; margin: 0;">Thanks for reaching out!</h1>
          </div>
          
          <div style="padding: 20px;">
            <p>Hi ${name},</p>
            
            <p>Thanks for your message! I've received your inquiry about <strong>${type}</strong> and I'll get back to you within 24 hours.</p>
            
            <div style="background: #f0f7ff; padding: 15px; border-radius: 5px; margin: 20px 0;">
              <h3 style="margin-top: 0; color: #0066cc;">Your Message:</h3>
              <p style="margin: 0; font-style: italic;">"${message}"</p>
            </div>
            
            <p>In the meantime, feel free to:</p>
            <ul>
              <li>Check out my <a href="${process.env.NEXT_PUBLIC_SITE_URL || 'https://localhost:3000'}" style="color: #0066cc;">portfolio</a> to learn more about my work</li>
              <li>Connect with me on <a href="https://linkedin.com/in/rakeshroushan" style="color: #0066cc;">LinkedIn</a></li>
              <li>Explore AudioPod AI and my other projects</li>
            </ul>
            
            <p>Looking forward to connecting!</p>
            
            <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee;">
              <p style="margin: 0;"><strong>Rakesh Roushan</strong></p>
              <p style="margin: 5px 0; color: #666;">Founder, AudioPod AI | Product Leader | AI Enthusiast</p>
            </div>
          </div>
        </div>
      `,
    }

    // Send emails
    await Promise.all([
      transporter.sendMail(emailToRakesh),
      transporter.sendMail(autoReply)
    ])

    // Log successful submission (you can also save to database here)
    console.log('Contact form submission:', {
      name,
      email,
      company,
      type,
      timestamp,
      source
    })

    return NextResponse.json({ 
      success: true, 
      message: 'Message sent successfully' 
    })

  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json(
      { error: 'Failed to send message' },
      { status: 500 }
    )
  }
}