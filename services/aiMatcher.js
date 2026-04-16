/**
 * Matcher service using Groq API (Llama-3-70b) for ultra-fast semantic discovery.
 */
export async function findBestMatches(userQuery, products) {
  const API_URL = "https://api.groq.com/openai/v1/chat/completions";
  
  // Reading from Vite environment variable
  const API_KEY = import.meta.env.VITE_GROQ_API_KEY;

  const systemPrompt = `
    You are an expert glass industry consultant for AmalGus.
    Task: Match user requirements to the product catalog below.
    
    PRODUCT CATALOG:
    ${JSON.stringify(products, null, 2)}

    INSTRUCTIONS:
    1. Score each product 0-100 based on fit.
    2. Return ONLY a valid JSON array of the top 5 matches.
    3. Format: [{ "id": number, "matchScore": number, "matchReason": string }]
    4. matchReason: 1-2 concise sentences.
    5. Return ONLY JSON. No explanation.
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

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Groq API Error: ${errorData.error?.message || response.statusText}`);
    }

    const data = await response.json();
    const result = JSON.parse(data.choices[0].message.content);
    
    // Support either a top-level array or an object containing the array
    const matchesList = Array.isArray(result) ? result : (result.matches || Object.values(result)[0]);

    return matchesList
      .sort((a, b) => b.matchScore - a.matchScore)
      .slice(0, 5);

  } catch (error) {
    console.error("Failed to find best matches via Groq:", error);
    return [];
  }
}
