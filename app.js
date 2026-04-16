import { PRODUCTS } from './data/products.js';

/**
 * AI matching service using Anthropic Claude API.
 * (Copying logic here as fallback if external module import fails in local file environment)
 */
async function findBestMatches(userQuery, products, apiKey) {
    const API_URL = "https://api.anthropic.com/v1/messages";
    
    if (!apiKey) {
        alert("Please enter your Anthropic API Key in the top right corner.");
        return [];
    }

    const systemPrompt = `
    You are an expert glass industry consultant for AmalGus.
    PRODUCT CATALOG: ${JSON.stringify(products)}
    
    Return ONLY a JSON array of the top 5 matches: { "id": number, "matchScore": number, "matchReason": string }.
    Score 0-100. MatchReason is 1-2 sentences. No markdown.
    `;

    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "x-api-key": apiKey,
                "anthropic-version": "2023-06-01",
                "dangerously-allow-the-browser": "true"
            },
            body: JSON.stringify({
                model: "claude-3-5-sonnet-20240620",
                max_tokens: 1000,
                system: systemPrompt,
                messages: [{ role: "user", content: userQuery }],
                temperature: 0
            })
        });

        if (!response.ok) throw new Error("API request failed");
        const data = await response.json();
        return JSON.parse(data.content[0].text.trim());
    } catch (error) {
        console.error("Match Error:", error);
        return [];
    }
}

// UI Elements
const catalogGrid = document.getElementById('catalogGrid');
const resultsGrid = document.getElementById('resultsGrid');
const resultsSection = document.getElementById('results');
const userQueryInput = document.getElementById('userQuery');
const findBtn = document.getElementById('findBtn');
const apiKeyInput = document.getElementById('apiKeyInput');

// Create Product Card
function createProductCard(product, matchData = null) {
    const card = document.createElement('div');
    card.className = 'product-card';
    
    const specs = [
        product.thickness ? `${product.thickness}mm` : null,
        product.color,
        product.coating !== 'None' ? product.coating : null
    ].filter(Boolean);

    card.innerHTML = `
        ${matchData ? `<div class="match-badge">${matchData.matchScore}% Match</div>` : ''}
        <div class="card-category">${product.category}</div>
        <div class="card-name">${product.name}</div>
        <div class="card-specs">
            ${specs.map(s => `<span class="spec-tag">${s}</span>`).join('')}
        </div>
        <p class="card-desc">${product.description}</p>
        ${matchData ? `<div class="match-reason">"${matchData.matchReason}"</div>` : ''}
        <div class="card-footer">
            <div class="price">₹${product.pricePerSqm}<span>/sqm</span></div>
            <div class="spec-tag">${product.supplier}</div>
        </div>
    `;
    return card;
}

// Initial Catalog Render
function renderCatalog() {
    PRODUCTS.forEach(p => {
        catalogGrid.appendChild(createProductCard(p));
    });
}

// Semantic Search Action
async function handleFindMatches() {
    const query = userQueryInput.value.trim();
    const apiKey = apiKeyInput.value.trim();

    if (!query) return;

    // Show loading state
    findBtn.disabled = true;
    findBtn.innerHTML = `<span>Analyzing...</span><i data-lucide="loader" class="spin"></i>`;
    lucide.createIcons();

    const matches = await findBestMatches(query, PRODUCTS, apiKey);

    if (matches && matches.length > 0) {
        resultsGrid.innerHTML = '';
        resultsSection.classList.remove('hidden');
        
        matches.forEach(match => {
            const product = PRODUCTS.find(p => p.id === match.id);
            if (product) {
                resultsGrid.appendChild(createProductCard(product, match));
            }
        });
        
        resultsSection.scrollIntoView({ behavior: 'smooth' });
    }

    findBtn.disabled = false;
    findBtn.innerHTML = `<span>Find Matches</span><i data-lucide="arrow-right"></i>`;
    lucide.createIcons();
}

// Event Listeners
findBtn.addEventListener('click', handleFindMatches);
renderCatalog();
