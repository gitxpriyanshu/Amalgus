/**
 * Advanced Parser service with Normalized Importance Weights (Sum = 1).
 */
export async function parseUserQuery(userQuery) {
  const API_URL = "https://api.groq.com/openai/v1/chat/completions";
  const API_KEY = import.meta.env.VITE_GROQ_API_KEY;

  const systemPrompt = `
    Task: Convert a buyer's glass inquiry into a weighted structured filter object.
    
    RULES:
    1. Extract all structured data (Category, Thickness, Dimensions, Color, UseCase).
    2. NORMALIZE importance weights so their TOTAL SUM = 1.
    3. Hierarchy:
       - Category: Highest (~0.40)
       - Thickness: Second Highest (~0.25)
       - UseCase: Medium (~0.15)
       - Dimensions: Medium-Low (~0.12)
       - Color: Lowest (~0.08)
    4. Detect Price Intent (budget | premium | neutral).
    5. Return ONLY valid JSON.

    OUTPUT FORMAT:
    {
      "category": { "primary": "...", "aliases": ["..."], "weight": 0.40 },
      "thickness": { "value": "...", "tolerance": "...", "weight": 0.25 },
      "dimensions": { "target": "...", "flexible": true, "weight": 0.12 },
      "color": { "value": "...", "weight": 0.08 },
      "useCase": { "value": "...", "weight": 0.15 },
      "priceIntent": "budget | premium | neutral",
      "keywords": [...]
    }
  `;

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${API_KEY}`
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userQuery }
        ],
        temperature: 0,
        response_format: { type: "json_object" }
      })
    });

    if (!response.ok) throw new Error("Normalized Parser failed");

    const data = await response.json();
    return JSON.parse(data.choices[0].message.content);
  } catch (error) {
    console.error("Normalized Matcher Failed:", error);
    return null;
  }
}
