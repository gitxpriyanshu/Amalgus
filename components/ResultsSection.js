import React from 'react';
import { ProductCard } from './ProductCard';

export const ResultsSection = ({ results, loading }) => {
  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-8 py-12">
        <h2 className="text-2xl font-bold text-slate-900 mb-8 animate-pulse text-center">Identifying Enterprise Grade Matches...</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3, 4, 5, 6].map(i => (
            <div key={i} className="h-80 bg-slate-100 rounded-[24px] border border-slate-200 animate-pulse"></div>
          ))}
        </div>
      </div>
    );
  }

  if (!results || results.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-8 py-20 text-center">
        <div className="text-5xl mb-4">🔍</div>
        <h3 className="text-xl font-bold text-slate-800">No matches found for this specific inquiry.</h3>
        <p className="text-slate-500 mt-2">Try broadening your requirements or adjusting the filters above.</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-8 py-12">
      <h2 className="text-2xl font-bold text-slate-900 mb-8">Top Matches for Your Requirement</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-in fade-in slide-in-from-bottom-5 duration-700">
        {results.map((res, i) => (
          <ProductCard 
            key={i} 
            product={res.product} 
            score={res.score} 
            explanation={res.reason} 
          />
        ))}
      </div>
    </div>
  );
};
