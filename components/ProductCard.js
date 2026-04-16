import React from 'react';

export const ProductCard = ({ product, score, explanation }) => {
  const getScoreColor = (s) => {
    if (s >= 80) return 'text-emerald-600 bg-emerald-50 border-emerald-100';
    if (s >= 50) return 'text-amber-600 bg-amber-50 border-amber-100';
    return 'text-rose-600 bg-rose-50 border-rose-100';
  };

  return (
    <div className="bg-white rounded-[24px] border border-slate-200 p-6 hover:shadow-xl transition-all group flex flex-col h-full hover:border-blue-200">
      <div className="flex justify-between items-start mb-4">
        <div>
          <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest">{product.category}</span>
          <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors leading-tight mt-1">{product.productName}</h3>
        </div>
        <div className={`px-3 py-1 rounded-full text-xs font-black border ${getScoreColor(score)}`}>
          {score}% Match
        </div>
      </div>

      <div className="mb-6">
        <div className="text-2xl font-black text-slate-900 tracking-tighter">{product.price}</div>
      </div>

      <div className="grid grid-cols-3 gap-2 mb-6 text-[10px] font-bold text-slate-500 uppercase overflow-hidden">
        <div className="bg-slate-50 p-2 rounded-lg border border-slate-100 text-center">
          <span className="block text-[8px] opacity-70 mb-0.5">Thick</span>
          <span className="text-slate-900">{product.specifications.thickness}</span>
        </div>
        <div className="bg-slate-50 p-2 rounded-lg border border-slate-100 text-center">
          <span className="block text-[8px] opacity-70 mb-0.5">Size</span>
          <span className="text-slate-900 truncate">{product.specifications.dimensions}</span>
        </div>
        <div className="bg-slate-50 p-2 rounded-lg border border-slate-100 text-center">
          <span className="block text-[8px] opacity-70 mb-0.5">Color</span>
          <span className="text-slate-900">{product.specifications.color}</span>
        </div>
      </div>

      <div className="bg-blue-50/50 p-4 rounded-xl mb-6 flex-grow">
        <p className="text-[11px] font-bold text-slate-600 italic leading-relaxed">
          "{explanation}"
        </p>
      </div>

      <button className="w-full py-3 bg-white border border-slate-200 text-slate-900 font-bold text-xs uppercase rounded-xl hover:bg-slate-900 hover:text-white transition-all tracking-widest">
        View Full Details
      </button>
    </div>
  );
};
