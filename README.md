# AmalGus

Find the right glass product using natural language.

This project is built as part of the AmalGus assignment. It focuses on converting user requirements into structured data and matching them with the most relevant products.

---

## Objective

The goal of this project is to:

* Accept a natural language query from the user
* Extract technical parameters from it
* Match products using a weighted logic
* Rank results based on relevance
* Explain why each product is recommended

---

## How it Works

### 1. Query Understanding

The user enters a requirement like:

"6mm tempered glass for office partitions"

This is converted into structured data:

```json
{
  "category": "Tempered Glass",
  "thickness": "6mm",
  "useCase": "office partitions",
  "color": "Clear"
}
```

This step is handled using the Groq API (Llama 3).

---

### 2. Matching Logic

Each product is evaluated using a weighted scoring system:

* Category
* Thickness
* Use-case
* Color

Each parameter contributes to a final score between 0 and 100.

---

### 3. Ranking

All products are scored and sorted based on relevance.
The top results are displayed to the user.

---

### 4. Explanation

Each product includes:

* Match score
* A short explanation
* Which attributes matched

This helps the user understand why a product is recommended.

---

## Additional Improvements

To make the system more practical, a few improvements were added beyond the basic requirements:

### Fallback Handling

If no product matches the filters:

* The system shows closest matches instead of empty results
* A message is displayed to inform the user

---

### Confidence Indicator

A simple confidence level is shown based on match quality:

* High
* Moderate
* Low

---

### Limitations

If a product does not fully match:

* The system highlights differences
* Example: price higher than requested, slight thickness variation

This avoids misleading recommendations.

---

## Tech Stack

* React 18
* Tailwind CSS
* Groq API (Llama 3)
* Lucide React

---

## How to Run

Install dependencies:

```bash
npm install
```

Create a `.env` file:

```env
VITE_GROQ_API_KEY=your_groq_key_here
```

Start the app:

```bash
npm run dev
```

---

## Assumptions

* Uses a small mock dataset (15 products)
* Matching is done on the client side
* No database or vector search is used

---

## Future Improvements

* Backend integration
* Larger product catalog
* Advanced filtering
* Supplier and RFQ integration

---

## Summary

This project demonstrates how natural language input can be used to build a simple and explainable product discovery system.

It focuses on clarity, ranking logic, and making the results easy to understand for the user.
