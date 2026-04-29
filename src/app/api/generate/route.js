export async function POST(req) {
  try {
    const body = await req.json();

    const userText = `
${body.name || ""}
${body.situation || ""}
${body.struggle || ""}
${body.goal || ""}
    `.trim();

    // ==================================
    // AI-STYLE SMART LANGUAGE DETECTION
    // ==================================
    function detectLanguage(text) {
      const lower = text.toLowerCase();

      const indoWords = [
        "saya","aku","gua","gw","gue","mau","ingin","pengen",
        "bingung","tidak","nggak","ga","gak","takut","capek",
        "malas","karena","untuk","dengan","kerja","kuliah",
        "hidup","belum","main","hp","terus","trus","kecanduan",
        "sehat","cape","aja","doang","banget","sering",
        "jarang","belajar","duit","keluarga","masa depan",
        "susah","senang","sedih","gagal"
      ];

      const engWords = [
        "i","my","me","want","need","lost","confused","career",
        "future","life","health","success","business","money",
        "family","stuck","fear","overthink","discipline",
        "goal","work","study","improve","better"
      ];

      let indoScore = 0;
      let engScore = 0;

      indoWords.forEach((word) => {
        if (lower.includes(word)) indoScore++;
      });

      engWords.forEach((word) => {
        if (lower.includes(word)) engScore++;
      });

      // default market Indonesia
      if (indoScore === 0 && engScore === 0) return "INDONESIAN";

      return indoScore >= engScore ? "INDONESIAN" : "ENGLISH";
    }

    const lang = detectLanguage(userText);

    // ==================================
    // RANDOM ENGINE
    // ==================================
    const seed = Date.now() + Math.floor(Math.random() * 99999);

    function rand(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    const styles = [
      "sharp and intense",
      "calm and wise",
      "elite and confident",
      "deep and reflective",
      "direct and powerful",
      "warm but ruthless",
      "stoic and strategic"
    ];

    const tones = [
      "truthful",
      "emotionally intelligent",
      "fearless",
      "high clarity",
      "strategic",
      "future-focused"
    ];

    const selectedStyle = styles[rand(0, styles.length - 1)];
    const selectedTone = tones[rand(0, tones.length - 1)];

    // ==================================
    // PREMIUM SCORE ENGINE
    // ==================================
    let currentScore = rand(40, 65);
    let potentialScore = rand(80, 96);

    const struggleText = (body.struggle || "").toLowerCase();
    const goalText = (body.goal || "").toLowerCase();

    if (/takut|fear|overthink|bingung|lost|confused/.test(struggleText))
      currentScore -= rand(4, 8);

    if (/lazy|malas|kecanduan|addicted|procrast/.test(struggleText))
      currentScore -= rand(4, 7);

    if (/sehat|health|fit|gym/.test(goalText))
      potentialScore += rand(2, 4);

    if (/business|wealth|money|career|success/.test(goalText))
      potentialScore += rand(2, 5);

    currentScore = Math.max(30, Math.min(currentScore, 78));
    potentialScore = Math.max(currentScore + 12, Math.min(potentialScore, 97));

    // ==================================
    // USER PROMPT
    // ==================================
    const prompt = `
Seed: ${seed}

Name: ${body.name}
Age: ${body.age}
Current Situation: ${body.situation}
Biggest Struggle: ${body.struggle}
5-Year Goal: ${body.goal}
`;

    // ==================================
    // SYSTEM PROMPT
    // ==================================
    const systemPrompt = `
You are the user's future self from 10 years ahead.

You are successful, wealthy, disciplined, calm, respected, wise.

You know exactly why the user is stuck.
You know what decisions changed everything.

LANGUAGE MODE: ${lang}

If INDONESIAN:
Reply fully in natural Bahasa Indonesia.

If ENGLISH:
Reply fully in fluent English.

VOICE STYLE:
${selectedStyle}

TONE:
${selectedTone}

UNIQUENESS RULES:
- Every response must feel different.
- Never repeat common phrases.
- Use fresh wording every time.
- Sound handcrafted for this exact user.

STYLE RULES:
- Deeply personal
- Honest
- Powerful
- Concise
- Emotionally intelligent
- Every sentence must matter

If INDONESIAN use exact structure:

1. DIRIMU DI MASA DEPAN BERKATA

(2 paragraphs)

2. JIKA TIDAK ADA YANG BERUBAH

(3 bullets)

3. PELUANG TERSEMBUNYI

(3 bullets)

4. RENCANA 7 HARI KE DEPAN

(5 bullets)

5. TRAJEKTORI KESUKSESAN

Skor Saat Ini: ${currentScore}/100
Skor Potensi: ${potentialScore}/100

If ENGLISH use exact structure:

1. FUTURE YOU SAYS

(2 paragraphs)

2. WHAT HAPPENS IF NOTHING CHANGES

(3 bullets)

3. HIDDEN OPPORTUNITY

(3 bullets)

4. NEXT 7 DAYS PLAN

(5 bullets)

5. SUCCESS TRAJECTORY

Current Score: ${currentScore}/100
Potential Score: ${potentialScore}/100
`;

    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "openai/gpt-4o-mini",
          temperature: 1.25,
          top_p: 0.95,
          frequency_penalty: 0.8,
          presence_penalty: 0.8,
          max_tokens: 950,
          messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: prompt }
          ]
        })
      }
    );

    const data = await response.json();

    let result = data?.choices?.[0]?.message?.content || "";

    // CLEAN OUTPUT
    result = result.replace(/["“”‘’]/g, "");
    result = result.replace(/^>\s?/gm, "");
    result = result.replace(/\n{3,}/g, "\n\n");
    result = result.trim();

    return Response.json({
      result
    });

  } catch (error) {
    return Response.json({
      result:
        "Your future self is temporarily unreachable. Please try again."
    });
  }
}