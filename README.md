# AmalGus Smart Product Discovery

**Find the Right Glass, Instantly.**
An AI-powered B2B marketplace prototype that enables intelligent product discovery and supplier matching for glass and allied materials.

---

## 🛠️ Tech Stack

* **Frontend**: React 18
* **Styling**: Tailwind CSS
* **AI Integration**: Groq API (Llama 3)
* **Icons**: Lucide React

---

## 🚀 How to Run Locally

1. Install dependencies

```bash
npm install
```

2. Create `.env` file

```env
VITE_GROQ_API_KEY=your_groq_key_here
```

3. Start development server

```bash
npm run dev
```

---

## 🧠 How Intelligent Matching Works

This system implements a **hybrid AI + rule-based matching engine** designed specifically for glass industry use cases.

---

### 1️⃣ Query Understanding (AI Parser)

User input (natural language):

> “6mm tempered glass for office partitions”

Is converted into structured data:

```json
{
  "category": "Tempered Glass",
  "thickness": "6mm",
  "useCase": "office partitions",
  "color": "Clear"
}
```

The parser also:

* Adds **synonyms (tempered = toughened)**
* Applies **tolerance (±0.5mm)**
* Assigns **importance weights**

---

### 2️⃣ Weighted Matching Engine (Core Logic)

Each product is scored using a **weighted scoring system**:

* Category match → highest priority
* Thickness match → high
* Use-case match → medium
* Dimensions → flexible
* Color → lower priority

Final score:

```
Score = Weighted Sum of Matches (0–100%)
```

---

### 3️⃣ Intelligent Ranking

* All products are evaluated
* Sorted by match score
* Top 5 results returned

---

### 4️⃣ Explainable Results

Each result includes:

* ✅ Match Score (e.g., 87%)
* ✅ Explanation (why it matched)

Example:

> “Matches required thickness and is suitable for office partitions.”

---

## 🤖 AI Usage

* **Groq (Llama 3)**:

  * Used for parsing natural language queries
  * Enhances semantic understanding

* **Antigravity AI / v0**:

  * Used for rapid UI development and layout

---

## ⚖️ Key Design Decisions

### Why Hybrid Approach (AI + Logic)?

* AI handles **understanding intent**
* Rule-based system ensures **consistent scoring**
* Better control compared to pure LLM ranking

---

## ⚖️ Assumptions & Trade-offs

* Uses **mock dataset (15 products)**
* Matching runs **client-side for speed**
* No database or embeddings (kept lightweight for prototype)

---

## 📈 Future Improvements

* Backend API for secure AI calls
* Vector search (FAISS / Pinecone) for large catalogs
* Advanced filtering (price range, certifications)
* Real supplier integration (RFQ system)

---

## 🎯 Key Highlights

* Natural language → structured query
* Weighted intelligent matching
* Explainable AI recommendations
* Real-world glass industry relevance

---
