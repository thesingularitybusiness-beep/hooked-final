export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).end();

  const analysis = `YOUR VIDEO SCORE: 6/10

🔴 Your Hook Is Too Slow
→ FIX: Start with something surprising

🟡 Low Retention in the Middle
→ FIX: Add visuals every 5-10 seconds

🟢 Strong CTA
Good job!

YOUR ACTION PLAN:
1. Re-do your hook
2. Add more visuals
3. Re-upload`;

  res.status(200).json({ success: true, analysis });
}