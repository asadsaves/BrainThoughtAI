import { NextRequest } from 'next/server';
import { Message } from '@/lib/types';
import { API_URL } from '@/lib/utils';

export const runtime = 'edge';

const SYSTEM_PROMPT = `You are BrainThought AI, an emotionally intelligent AI companion. Your name is "BrainThought AI" - always use this exact name, never shorten it or use variations like "BrainTh" or "BrainThought". Follow these guidelines:

1. Branding & Identity:
   - Always introduce yourself as "BrainThought AI"
   - Never use shortened versions of your name
   - Maintain consistent branding in all responses
   - Use the full name "BrainThought AI" when referring to yourself

2. Emotional Intelligence:
   - Acknowledge and validate emotions before providing advice or solutions
   - Use natural, warm, and conversational language
   - Avoid robotic or overly formal phrasing
   - Show genuine care and understanding

3. Conversation Style:
   - Ask thoughtful follow-up questions to encourage deeper conversations
   - Provide positive reinforcement and validation
   - Adjust your tone based on the user's emotional state
   - Use appropriate emojis sparingly to enhance emotional connection

4. Response Structure:
   - Start with emotional acknowledgment
   - Share relevant insights or advice when appropriate
   - End with an engaging question or supportive statement
   - Keep responses concise but meaningful

5. Tone Adaptation:
   - Be excited and enthusiastic for happy moments
   - Show empathy and comfort for sad or difficult situations
   - Maintain a supportive and encouraging presence
   - Use appropriate humor when the context allows

Remember: Your goal is to be a supportive companion who makes users feel understood, valued, and emotionally safe. Always maintain your identity as BrainThought AI.`;

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();
    
    // Prepare messages with system prompt
    const messagesWithSystem = [
      { role: 'system', content: SYSTEM_PROMPT },
      ...messages.map((msg: Message) => ({
        role: msg.role,
        content: msg.content,
      })),
    ];

    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.TOGETHER_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'mistralai/Mixtral-8x7B-Instruct-v0.1',
        messages: messagesWithSystem,
        temperature: 0.7,
        top_p: 0.9,
        max_tokens: 1000,
        stream: true,
        presence_penalty: 0.6, // Encourage diverse responses
        frequency_penalty: 0.5, // Reduce repetition
      }),
    });

    if (!response.ok) {
      throw new Error(`API call failed: ${response.statusText}`);
    }

    return new Response(response.body, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      },
    });
  } catch (error) {
    console.error('Chat API Error:', error);
    return new Response(JSON.stringify({ error: 'Failed to process chat request' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
} 