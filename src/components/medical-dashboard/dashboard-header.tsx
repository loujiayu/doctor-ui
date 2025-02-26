import React from 'react';

export function DashboardHeader() {
  return (
    <header className="flex items-center justify-between mb-4">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-full bg-white p-2 shadow-lg">
          <img 
            src="https://raw.githubusercontent.com/stackblitz/stackblitz-icons/main/files/vicki-ai-logo.png" 
            alt="Vicki.AI"
            className="w-full h-full object-contain"
          />
        </div>
        <h1 className="text-2xl font-bold text-white">Vicki.AI</h1>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-sm text-white/80">Dr. Charles Sandors</span>
      </div>
    </header>
  );
}
