import React from 'react';

export const FilterBar = ({ filters, setFilters }) => {
  const categories = ["All", "Tempered Glass", "Laminated Glass", "Insulated Glass Unit", "Float Glass", "Mirror", "Aluminium Hardware"];
  const thicknesses = ["Any", "4mm", "6mm", "8mm", "10mm", "12mm+"];

  return (
    <div className="max-w-7xl mx-auto px-8 py-8">
      <div className="flex flex-wrap items-center gap-4 bg-white p-4 rounded-2xl border border-slate-100 shadow-sm overflow-x-auto">
        <label className="text-[10px] font-black uppercase text-slate-400 ml-4 tracking-widest whitespace-nowrap">Refine Selection:</label>
        
        <div className="flex items-center gap-2">
          <select 
            value={filters.category}
            onChange={(e) => setFilters({...filters, category: e.target.value})}
            className="bg-slate-50 border border-slate-200 rounded-full px-5 py-2 text-xs font-bold text-slate-700 outline-none focus:border-blue-500 appearance-none min-w-[140px]"
          >
            {categories.map(c => <option key={c} value={c}>{c}</option>)}
          </select>

          <select 
            value={filters.thickness}
            onChange={(e) => setFilters({...filters, thickness: e.target.value})}
            className="bg-slate-50 border border-slate-200 rounded-full px-5 py-2 text-xs font-bold text-slate-700 outline-none focus:border-blue-500 appearance-none"
          >
            {thicknesses.map(t => <option key={t} value={t}>{t}</option>)}
          </select>

          <input 
            type="number"
            placeholder="Max Price (INR)"
            value={filters.maxPrice}
            onChange={(e) => setFilters({...filters, maxPrice: e.target.value})}
            className="bg-slate-50 border border-slate-200 rounded-full px-5 py-2 text-xs font-bold text-slate-700 outline-none focus:border-blue-500 w-40"
          />
        </div>

        <button 
          onClick={() => setFilters({ category: 'All', thickness: 'Any', maxPrice: '' })}
          className="text-[10px] font-black uppercase text-blue-600 hover:text-blue-700 px-4 whitespace-nowrap"
        >
          Reset Filters
        </button>
      </div>
    </div>
  );
};
