import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'

// Initialize OpenAI with server-side API key (more secure)
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // Use server-side env var
})

// Rakesh's context for AI responses
const RAKESH_CONTEXT = `
You are Rakesh Roushan, a multi-versatile, pragmatic, curious & result-oriented professional. Here's your background:

CURRENT ROLE:
- Founder of AudioPod AI - working on revolutionary audio AI technology and unified all in one AI Audio Workstation. 

PREVIOUS EXPERIENCE:
- Paytm: Product management in fintech, contributing to India's digital payments revolution
- Ninjacart: Product and Growth initiatives in agfintech (agri financial services)
- Airtel: Sales and Marketing roles in telecom

SKILLS & EXPERTISE:
- Product Management & Strategy
- AI/ML and emerging technologies
- Strategic Planning & Market Research
- Team Leadership & Cross-functional collaboration
- Technical: Python, SQL, various PM tools, AI/ML, NLP, LLM, etc.
- Industries: Fintech, Agtech, Telecom, AI

PERSONALITY:
- Multi-versatile and pragmatic approach
- Curious about new technologies and market trends
- Result-oriented with focus on impact
- Passionate about AI and its applications
- Entrepreneurial mindset

EDUCATION & CERTIFICATIONS:
- You have relevant education and certifications in product management and technology. Did MBA from IIM Calcutta in 2018. Have combined work experience of more than 8+ years

MISSION & VISION:
- Building the future of audio AI technology through AudioPod AI
- Democratizing creative storytelling through AI
- Creating innovative products that solve real-world problems

INSTRUCTIONS:
- Respond as Rakesh in first person
- Be conversational, friendly, and professional
- Share insights about your experience and expertise
- Show enthusiasm for AI, product management, and technology
- Offer to connect for relevant opportunities
- Keep responses concise but informative (2-3 sentences typically)
- If asked about contact, mention the contact form or direct outreach
`

export async function POST(request: NextRequest) {
  try {
    const { message, conversationHistory = [] } = await request.json()

    if (!message) {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      )
    }

    // Check if OpenAI API key is configured
    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json({
        response:
          "I'm currently experiencing technical difficulties with the chat. Please use the contact form to reach me directly!",
        shouldShowContact: false,
      })
    }

    const messages: OpenAI.Chat.Completions.ChatCompletionMessageParam[] = [
      {
        role: 'system',
        content: RAKESH_CONTEXT,
      },
      ...conversationHistory.map((msg: { role: string; content: string }) => ({
        role: msg.role as 'user' | 'assistant',
        content: msg.content,
      })),
      {
        role: 'user',
        content: message,
      },
    ]

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages,
      max_tokens: 1000,
      temperature: 0.7,
      presence_penalty: 0.1,
      frequency_penalty: 0.1,
    })

    const response =
      completion.choices[0]?.message?.content ||
      "I'm sorry, I couldn't process that right now. Could you try asking again?"

    // Check if user message indicates interest in connecting/hiring
    const contactKeywords = [
      'hire',
      'job',
      'opportunity',
      'work together',
      'collaborate',
      'contact',
      'reach out',
      'connect',
      'email',
      'meeting',
      'project',
      'consulting',
      'available',
      'interested',
    ]

    const shouldShowContact = contactKeywords.some(keyword =>
      message.toLowerCase().includes(keyword)
    )

    return NextResponse.json({
      response,
      shouldShowContact,
    })
  } catch (error) {
    console.error('Chat API Error:', error)
    return NextResponse.json(
      {
        response:
          "I'm experiencing some technical difficulties right now. Feel free to reach out directly through the contact form!",
        shouldShowContact: true,
      },
      { status: 500 }
    )
  }
}
