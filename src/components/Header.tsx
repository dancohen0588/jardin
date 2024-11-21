import { Flower2 } from 'lucide-react';

export default function Header() {
  return (
    <header className="bg-emerald-700 text-white py-6 px-4 shadow-lg">
      <div className="max-w-5xl mx-auto flex items-center gap-3">
        <Flower2 className="w-8 h-8" />
        <h1 className="text-2xl font-semibold">Mon Jardin</h1>
      </div>
    </header>
  );
}