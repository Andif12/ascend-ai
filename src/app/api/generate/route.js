export async function POST(req) {
  try {
    const body = await req.json();

    const prompt = `
Name: ${body.name}
Age: ${body.age}
Current Situation: ${body.situation}
Biggest Struggle: ${body.struggle}
5-Year Goal: ${body.goal}
`;

    const systemPrompt = `
You are the user's future self 10 years later.

You became wealthy, elite, wise, calm, disciplined, respected.

You know exactly why the user is stuck.

Speak personally and truthfully.

Rules:
- concise
- emotionally intelligent
- no generic advice
- no corporate tone
- no clichés
- memorable lines
- practical uncommon advice
- every sentence must matter

Respond in this exact structure:

1. FUTURE YOU SAYS
(2 short paragraphs)

2. WHAT HAPPENS IF NOTHING CHANGES
(3 bullets)

3. HIDDEN OPPORTUNITY
(3 bullets)

4. NEXT 7 DAYS PLAN
(5 concise actions)

5. SUCCESS TRAJECTORY

Current Score: X/100
Potential Score: Y/100

Rules:
- X and Y must be under 100
- Y must be higher than X
- no extra scoring section
`;

    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          model: "openai/gpt-4o-mini",
          temperature: 1,
          max_tokens: 700,
          messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: prompt }
          ]
        })
      }
    );

    const data = await response.json();

    return Response.json({
      result: data.choices[0].message.content
    });

  } catch (error) {
    return Response.json({
      result: "Your future self is temporarily unreachable."
    });
  }
}