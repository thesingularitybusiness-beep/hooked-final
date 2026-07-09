import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.NVIDIA_API_KEY,
  baseURL: 'https://integrate.api.nvidia.com/v1',
});

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).end();

  const { videoUrl } = req.body;

  if (!videoUrl) {
    return res.status(400).json({ error: 'Video URL required' });
  }

  try {
    const prompt = `You are a video diagnostic expert. Analyze this video and provide:
1. A score from 1-10
2. 3 main problems
3. Actionable fixes for each problem
4. What high-performing creators do differently

Format as:
YOUR VIDEO SCORE: X/10

HERE'S WHAT'S WRONG:

[Problem 1]
→ FIX: [Solution]

[Problem 2]
→ FIX: [Solution]

[Problem 3]
→ FIX: [Solution]

WHAT HIGH-PERFORMING CREATORS DO DIFFERENTLY:
- [Point 1]
- [Point 2]
- [Point 3]

YOUR ACTION PLAN:
1. [Action 1]
2. [Action 2]
3. [Action 3]

Video URL: ${videoUrl}`;

    const completion = await openai.chat.completions.create({
      model: "z-ai/glm-5.2",
      messages: [{ role: "user", content: prompt }],
      temperature: 1,
      top_p: 1,
      max_tokens: 1024,
      seed: 42,
    });

    const analysis = completion.choices[0].message.content;

    res.status(200).json({ success: true, analysis });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: error.message });
  }
}