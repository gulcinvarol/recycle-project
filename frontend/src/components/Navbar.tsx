import { Link } from 'react-router-dom';
import { Recycle } from 'lucide-react';
import { Button } from "@/components/ui/button";

const Navbar = () => {
  return (
    <nav className="border-b bg-white/75 backdrop-blur-lg sticky top-0 z-50">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2 font-bold text-xl text-green-700 transition-colors hover:text-green-600">
          <Recycle className="h-6 w-6" />
          <span>EcoZeka</span>
        </Link>
        
        <div className="flex items-center gap-4">
          <Link to="/" className="text-sm font-medium text-slate-600 hover:text-green-600 transition-colors">
            Ana Sayfa
          </Link>
          <Link to="/analiz">
            <Button className="bg-green-600 hover:bg-green-700">Analiz Et</Button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;