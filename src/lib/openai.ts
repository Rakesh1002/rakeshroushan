// Chat API functions for secure server-side OpenAI integration

export async function getChatResponse(
  message: string,
  conversationHistory: Array<{
    role: 'user' | 'assistant'
    content: string
  }> = []
): Promise<{ response: string; shouldShowContact: boolean }> {
  try {
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message,
        conversationHistory,
      }),
    })

    if (!response.ok) {
      throw new Error('Chat API request failed')
    }

    const data = await response.json()
    return {
      response:
        data.response ||
        "I'm sorry, I couldn't process that right now. Could you try asking again?",
      shouldShowContact: data.shouldShowContact || false,
    }
  } catch (error) {
    console.error('Chat API Error:', error)
    return {
      response:
        "I'm experiencing some technical difficulties right now. Feel free to reach out directly through the contact form!",
      shouldShowContact: true,
    }
  }
}

// Check if user message indicates interest in connecting/hiring
export function shouldShowContactForm(message: string): boolean {
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

  return contactKeywords.some(keyword =>
    message.toLowerCase().includes(keyword)
  )
}
