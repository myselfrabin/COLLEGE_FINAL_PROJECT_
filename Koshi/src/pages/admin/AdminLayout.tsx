import { Link, Outlet, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';

function useAuthToken() {
  return localStorage.getItem('admin_jwt');
}

export default function AdminLayout() {
  const token = useAuthToken();
  const location = useLocation();
  if (!token) {
    window.location.href = '/admin/login';
    return null;
  }
  const logout = () => { localStorage.removeItem('admin_jwt'); window.location.href = '/admin/login'; };
  const navLink = (to: string, label: string) => (
    <Link to={to} className={`px-3 py-2 rounded ${location.pathname === to ? 'bg-primary/10 text-primary' : 'hover:bg-muted'}`}>{label}</Link>
  );
  return (
    <div className="min-h-screen grid grid-cols-[220px_1fr]">
      <aside className="border-r p-4 space-y-2">
        <div className="font-bold text-lg mb-4">Admin</div>
        <nav className="flex flex-col gap-1">
          {navLink('/admin', 'Dashboard')}
          {navLink('/admin/places', 'Places')}
          {navLink('/admin/events', 'Events')}
          {navLink('/admin/updates', 'Updates')}
          {navLink('/admin/reviews', 'Reviews')}
        </nav>
        <Button variant="outline" className="mt-6" onClick={logout}>Logout</Button>
      </aside>
      <main className="p-6">
        <Outlet />
      </main>
    </div>
  );
}


