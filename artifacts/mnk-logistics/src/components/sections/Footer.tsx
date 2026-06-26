export function Footer() {
  return (
    <footer className="bg-[var(--mnk-navy)] border-t border-[var(--mnk-hairline)] py-12 relative z-10 pl-8 md:pl-16">
      <div className="max-w-7xl mx-auto px-4 md:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="font-display text-3xl text-white">MNK LOGISTICS</div>
        
        <div className="flex gap-4 font-mono text-xs text-[var(--mnk-steel)]">
          <span>DOT: 1234567</span>
          <span>MC: 987654</span>
        </div>
        
        <div className="font-sans text-sm text-[var(--mnk-steel)]">
          &copy; {new Date().getFullYear()} MNK Logistics LLC. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
