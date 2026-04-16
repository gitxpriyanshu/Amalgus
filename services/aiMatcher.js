/**
 * Matches a user's natural language query against a catalog of glass products
 * using the Anthropic Claude API.
 * 
 * @param {string} userQuery - The buyer's natural language requirement.
 * @param {Array} products - The product catalog JSON array.
 * @returns {Promise<Array>} - Top 5 matching products with scores and reasons.
 */
export async function findBestMatches(userQuery, products) {
  const API_URL = "https://api.anthropic.com/v1/messages";
  
  // Note: Ensure your API key is available in your environment.
  // We use a placeholder here for the user to fill or for the app to pick up.
  const API_KEY = ""; // Replace with your actual key or use env variable

  const systemPrompt = `
    You are an expert glass industry consultant for AmalGus, a B2B/B2C marketplace.
    Your task is to match user requirements to the provided product catalog.
    
    PRODUCT CATALOG:
    ${JSON.stringify(products, null, 2)}

    INSTRUCTIONS:
    1. Analyze the buyer's requirement carefully (consider use case, safety needs, thermal performance, and budget).
    2. Score each product from 0-100 based on fit.
    3. Factors: category relevance, thickness suitability, coating/certification requirements, and price sensitivity.
    4. Return ONLY a valid JSON array of the top 5 matches.
    5. Each object must have: { "id": number, "matchScore": number, "matchReason": string }
    6. "matchReason" must be 1-2 concise sentences explaining the technical or functional rationale for the match.
    
    IMPORTANT: Respond ONLY with the JSON array. No markdown, no conversational text, no explanation outside the JSON.
  `;

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": API_KEY,
        "anthropic-version": "2023-06-01",
        "dangerously-allow-the-browser": "true"
      },
      body: JSON.stringify({
        model: "claude-3-5-sonnet-20240620", // Using a standard stable model name
        max_tokens: 1500,
        system: systemPrompt,
        messages: [
          { role: "user", content: `Query: "${userQuery}"` }
        ],
        temperature: 0
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Claude API Error: ${errorData.error?.message || response.statusText}`);
    }

    const data = await response.json();
    const rawText = data.content[0].text.trim();
    
    // Parse the JSON array from the response
    let matches = JSON.parse(rawText);

    // Ensure it's sorted by matchScore descending and limited to top 5
    return matches
      .sort((a, b) => b.matchScore - a.matchScore)
      .slice(0, 5);

  } catch (error) {
    console.error("Failed to find best matches:", error);
    return [];
  }
}
