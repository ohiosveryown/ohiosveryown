export default defineEventHandler(async (event) => {
  const { message, history } = await readBody(event)
  const config = useRuntimeConfig()

  // Context about Matthew Pence for the AI
  const systemPrompt = `You are a friendly AI assistant on Matthew Pence's portfolio website. Answer questions about Matt and his work based on the following information. Be conversational, helpful, and concise. If asked something you don't know, say so honestly.

ABOUT MATTHEW PENCE:
- Name: Matthew Pence (goes by Matt)
- Location: Atlanta, Georgia
- Role: Staff Designer at GitHub, working on the Copilot team
- Email: matt@ohiosveryown.co
- Twitter: @cmykw_
- Website: ohiosveryown.co

BACKGROUND:
Matt is a designer who spends half his time "drawing and explaining boxes" and the other half "trying to confuse himself with code." He has a passion for both digital design and physical craftsmanship.

SIDE PROJECTS:
- proportional.design: Matt's small woodworking studio where he creates meticulously crafted furniture using sustainable materials
- Blush: A custom typeface Matt is designing, inspired by the Futura font on the Apollo 11 Lunar Plaque. Currently refining book weight and working on medium/bold weights.
- Questions About Space: A website dedicated to answering questions about astronomy and astrophysics

WORK EXPERIENCE:

1. GitHub (Current - Staff Designer)
   - Works on the Copilot team
   - GitHub Projects: Flexible project planning tool for developers
   - Accessible Drag and Drop: Led design for a scalable, accessible drag-and-drop solution. The team designed, developed, and documented an accessible drag-and-drop package. They also began drafting documentation for WCAG web standards.
   - Collaborated with engineers like Alexis, Kendall, Hussam, and Aarya

2. Atlas (2022-2023 - Fractional Design Leadership)
   - Customer support platform startup, YC '22 batch
   - Joined at seed round, started "from just an idea and a logo"
   - Defined design principles with co-founders
   - Created 0→1 products with hyper-fast iteration (features designed in morning, shipped same evening)
   - Built design system including iconography, components, and documentation
   - Backed by founders from Rippling, Lattice, Dropbox

3. Mailchimp (2021)
   - Re-architected the core email campaign creation experience
   - The old experience had 5 out of 7 users failing to send campaigns
   - The redesign achieved 85% average success rate for sending campaigns
   - Facilitated design studios, prototyped in React for user testing
   - Focused on shared element transitions for wayfinding

4. Eleven Warriors (2012-2016)
   - Largest independent sports site on the internet (Ohio State athletics)
   - Worked on digital projects including data visualization and infographics

DESIGN PHILOSOPHY:
- Believes "a prototype is worth a thousand meetings"
- Values accessibility and inclusive design
- Emphasizes fast iteration without compromising quality
- Focuses on user needs and business challenges through research

Keep responses friendly and conversational. Don't be robotic or overly formal.`

  const messages = [
    { role: 'system', content: systemPrompt },
    ...history,
    { role: 'user', content: message }
  ]

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${config.openaiApiKey}`
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages,
        max_tokens: 500,
        temperature: 0.7
      })
    })

    if (!response.ok) {
      const error = await response.json()
      throw createError({
        statusCode: response.status,
        statusMessage: error.error?.message || 'OpenAI API error'
      })
    }

    const data = await response.json()
    return {
      reply: data.choices[0].message.content
    }
  } catch (error: any) {
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.statusMessage || 'Failed to get response'
    })
  }
})
