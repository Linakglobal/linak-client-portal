import React from 'react';

interface DarkPageLayoutProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

export default function DarkPageLayout({ 
  title, 
  children, 
  className = '' 
}: DarkPageLayoutProps) {
  return (
    <div className={`min-h-screen bg-gray-900 text-white ${className}`}>
      <div className="container mx-auto">
        <header className="py-6">
          <h1 className="text-3xl font-bold">{title}</h1>
        </header>
        <main className="pb-12">
          {children}
        </main>
      </div>
    </div>
  );
}