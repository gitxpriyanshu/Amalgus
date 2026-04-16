# AmalGus Smart Product Discovery

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Anthropic Claude](https://img.shields.io/badge/Claude_3.5_Sonnet-D1D5DB?style=for-the-badge&logo=anthropic&logoColor=black)

**Find the Right Glass, Instantly.** An AI-powered B2B marketplace prototype that uses LLM-based semantic matching to solve complex architectural glass procurement.

---

## 🔗 Live Demo
[Check out the Live Prototype (Vercel/Netlify Placeholder)](#)

## 🛠️ Tech Stack
- **Frontend**: React 18 (Client-side Rendering)
- **Styling**: Tailwind CSS (Executive Professional Aesthetic)
- **Intelligence**: Anthropic Claude API (3.5 Sonnet)
- **Icons**: Lucide React
- **Development**: Vite

## 🚀 How to Run Locally

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/gitxpriyanshu/Amalgus.git
   cd Amalgus
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment Variables**:
   Create a `.env` file in the root directory and add your Anthropic API Key:
   ```env
   VITE_ANTHROPIC_API_KEY=your_anthropic_api_key_here
   ```

4. **Start the Development Server**:
   ```bash
   npm run dev
   ```

## 🧠 How the Intelligent Matching Works

AmalGus moves beyond traditional keyword search by implementing a **"Claude-in-Claude" architecture** for semantic discovery.

### LLM-Based Ranking
Instead of simple partial-string matching, the system understands the *intent* and *context* of a buyer's query. When a user asks for "safety glass for high-rise balconies," the AI understands that this implies a need for **Laminated Glass** or **Tempered Glass** with specific wind-load and safety certifications, even if those words aren't in the query.

### Why Claude Over Embeddings?
For this prototype, we opted for **Direct LLM Scoring** over Vector Embeddings because:
- **Precision**: LLMs can evaluate specific technical constraints (like thickness and price caps) more reliably than cosine similarity.
- **Explainability**: Claude generates a `matchReason`, providing transparency to the user on *why* a product was recommended.
- **Zero-Shot Flexibility**: No need to maintain an embedding database or handle complex indexing for a small, high-value catalog.

### Two-Phase Pipeline
1. **Hard Filtering**: The app first filters the local JavaScript catalog by Category, Max Price, and Thickness.
2. **AI Scoring**: The narrowed subset is sent to Claude 3.5 Sonnet to perform a multi-factor analysis and return a sorted JSON array of the top 5 matches with match scores (0-100%).

## 🤖 AI Tools Used
- **Claude 3.5 Sonnet**: The core intelligence engine used to rank products and generate technical justifications.
- **Antigravity AI / v0**: Used for rapid UI scaffolding and implementing the professional B2B "SaaS" aesthetics.

## ⚖️ Key Assumptions & Trade-offs
- **Mock Data**: Uses a hardcoded `products.js` file instead of a real-time database to maximize prototyping speed.
- **Client-Side API Calls**: Currently, the Anthropic API is called directly from the browser. **Note: This is not production-safe.** In a production environment, this key must be moved to a backend proxy to protect API credentials.
- **Latency**: AI-based discovery takes ~2–3 seconds per query. While slower than keyword search, the high precision and recommendation quality are prioritized for the B2B context.

## 📈 Potential Improvements
- **Backend Proxy**: Implement a Node.js/FastAPI backend to secure API keys and handle rate limiting.
- **Vector Database**: Integrate Pinecone or Weaviate for handling massive catalogs (10,000+ SKUs).
- **Session Caching**: Cache common queries to provide instantaneous results for repetitive lookups.
- **Multi-Supplier RFQ**: Integration with a real RFQ (Request for Quote) system to bridge search with procurement.

---
*Built with ❤️ for the Glass Industry.*
