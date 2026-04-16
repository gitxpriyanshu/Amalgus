import React from 'react';

export const Hero = ({ query, setQuery, onSearch, loading }) => {
  const examples = [
    "Tempered glass for office partitions",
    "Laminated glass for balcony railing",
    "Budget float glass for windows"
  ];

  return (
    <section className="pt-20 pb-12 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-5xl font-extrabold tracking-tight text-slate-900 mb-4">
          Find the Right Glass Product <span className="text-blue-600 italic">Instantly.</span>
        </h2>
        <p className="text-lg text-slate-500 mb-10 font-medium">
          Describe your requirement in natural language. Our AI engine scales technical specifications for precision matches.
        </p>

        <div className="bg-white rounded-[32px] p-2 shadow-2xl border border-slate-100 mb-6 transition-all focus-within:ring-4 focus-within:ring-blue-50">
          <textarea
            className="w-full h-32 p-6 rounded-[28px] outline-none text-lg text-slate-700 placeholder:text-slate-300 resize-none"
            placeholder="e.g. 6mm tempered glass for office partitions, clear, around 2m x 1.2m"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <div className="p-2 flex justify-end">
            <button 
              onClick={onSearch}
              disabled={loading}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-2xl font-black text-sm uppercase tracking-widest transition-all shadow-lg shadow-blue-200 flex items-center gap-2 group"
            >
              {loading ? (
                "Finding Best Matches..."
              ) : (
                <>
                  <span className="group-hover:translate-x-1 transition-transform">🔍</span> Find Best Matches
                </>
              )}
            </button>
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-3">
          {examples.map((example, i) => (
            <button
              key={i}
              onClick={() => setQuery(example)}
              className="bg-slate-100 hover:bg-slate-200 text-slate-600 px-4 py-2 rounded-full text-xs font-bold transition-colors border border-slate-200"
            >
              {example}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};
