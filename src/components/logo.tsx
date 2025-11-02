import React from 'react';

export function Logo({ className }: { className?: string }) {
  return (
    <div className={className}>
      <div className="flex items-center gap-2" aria-label="OmniCom logo">
        <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center">
            <div className="w-3 h-3 rounded-full bg-sidebar-background"></div>
        </div>
        <span className="font-headline text-lg font-bold">OmniCom</span>
      </div>
    </div>
  );
}
