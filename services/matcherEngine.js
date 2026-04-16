/**
 * Deterministic Matching Engine for AmalGus.
 * Calculates weighted scores between a buyer's 
 * structured inquiry and the product catalog.
 */

export function calculateMatchScore(product, query) {
  let score = 0;

  // 1. Category Match
  let categoryHit = 0;
  if (product.category.toLowerCase() === query.category.primary.toLowerCase()) {
    categoryHit = 1;
  } else if (query.category.aliases.some(alias => product.productName.toLowerCase().includes(alias.toLowerCase()))) {
    categoryHit = 0.8;
  }
  score += categoryHit * (query.category.weight || 0.4);

  // 2. Thickness Match
  let thicknessHit = 0;
  const prodThick = parseFloat(product.specifications.thickness);
  const queryThick = parseFloat(query.thickness.value);
  if (prodThick === queryThick) {
    thicknessHit = 1;
  } else if (Math.abs(prodThick - queryThick) <= 1) { // 1mm default tolerance
    thicknessHit = 0.8;
  }
  score += thicknessHit * (query.thickness.weight || 0.25);

  // 3. Use Case Match
  let useCaseHit = 0;
  if (product.description.toLowerCase().includes(query.useCase.value.toLowerCase())) {
    useCaseHit = 1;
  }
  score += useCaseHit * (query.useCase.weight || 0.15);

  // 4. Color Match
  let colorHit = 0;
  if (product.specifications.color.toLowerCase() === query.color.value.toLowerCase()) {
    colorHit = 1;
  }
  score += colorHit * (query.color.weight || 0.08);

  // 5. Dimensions Match
  let dimHit = 0;
  if (product.specifications.dimensions.includes(query.dimensions.target)) {
    dimHit = 1;
  } else if (query.dimensions.flexible) {
    dimHit = 0.5; // Half points for flexible mismatch
  }
  score += dimHit * (query.dimensions.weight || 0.12);

  // 6. Keyword Bonus
  const keywordMatches = query.keywords.filter(kw => 
    product.productName.toLowerCase().includes(kw.toLowerCase()) || 
    product.description.toLowerCase().includes(kw.toLowerCase())
  ).length;
  
  const bonus = (keywordMatches / query.keywords.length) * 0.05; // Max 5% bonus
  
  return Math.min(Math.round((score + bonus) * 100), 100);
}

export function getTopMatches(products, query) {
  return products
    .map(p => ({
      product: p,
      score: calculateMatchScore(p, query)
    }))
    .filter(m => m.score > 20) // Filter out noise
    .sort((a, b) => b.score - a.score)
    .slice(0, 5);
}

export function getMatchExplanation(product, query) {
  const reasons = [];
  if (product.category.toLowerCase() === query.category.primary.toLowerCase()) {
    reasons.push(`Exact category match for ${product.category}.`);
  }
  if (parseFloat(product.specifications.thickness) === parseFloat(query.thickness.value)) {
    reasons.push(`Perfect thickness match at ${query.thickness.value}.`);
  }
  if (product.description.toLowerCase().includes(query.useCase.value.toLowerCase())) {
    reasons.push(`Specifically designed for ${query.useCase.value}.`);
  }
  
  return reasons.join(' ') || "Matches your general architectural requirements.";
}
