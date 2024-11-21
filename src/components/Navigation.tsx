import { Home, Flower } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

export default function Navigation() {
  const location = useLocation();
  
  const getLinkClass = (path: string) => {
    const baseClass = "flex items-center gap-2 px-4 py-2 rounded-lg transition-colors";
    return location.pathname === path
      ? `${baseClass} bg-emerald-700 text-white`
      : `${baseClass} text-emerald-700 hover:bg-emerald-50`;
  };

  return (
    <nav className="bg-white shadow-md p-2 mb-6 rounded-lg">
      <ul className="flex gap-2">
        <li>
          <Link to="/" className={getLinkClass('/')}>
            <Home className="w-5 h-5" />
            <span>Tâches</span>
          </Link>
        </li>
        <li>
          <Link to="/plantes" className={getLinkClass('/plantes')}>
            <Flower className="w-5 h-5" />
            <span>Mes Plantes</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
}