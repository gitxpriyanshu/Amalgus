import React from 'react';

export const Header = () => (
  <header className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-slate-200 py-4 px-8">
    <div className="max-w-7xl mx-auto flex justify-between items-center">
      <div className="flex items-center gap-2 group cursor-pointer">
        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-black text-sm transition-transform group-hover:rotate-12">A</div>
        <span className="text-xl font-bold tracking-tighter text-slate-900">AMALGUS <span className="text-blue-600">X</span></span>
      </div>
      
      <nav className="hidden md:flex items-center gap-8">
        <a href="#" className="text-sm font-semibold text-slate-600 hover:text-blue-600 transition-colors">Products</a>
        <a href="#" className="text-sm font-semibold text-slate-600 hover:text-blue-600 transition-colors">Suppliers</a>
        <a href="#" className="text-sm font-semibold text-slate-600 hover:text-blue-600 transition-colors">Solutions</a>
        <div className="h-4 w-px bg-slate-200 mx-2"></div>
        <button className="text-sm font-bold text-slate-900 hover:opacity-70">Login</button>
        <button className="bg-blue-600 text-white px-5 py-2 rounded-full text-sm font-bold shadow-lg shadow-blue-200 hover:bg-blue-700 transition-all">Get Started</button>
      </nav>
    </div>
  </header>
);
