import AdminLayout from './AdminLayout';
import AdminDashboard from './AdminDashboard';
import { AdminList } from './AdminEntities';
import { Routes, Route } from 'react-router-dom';

export default function AdminPages() {
  return (
    <Routes>
      <Route element={<AdminLayout />}>
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/places" element={<AdminList entity="places" />} />
        <Route path="/admin/events" element={<AdminList entity="events" />} />
        <Route path="/admin/updates" element={<AdminList entity="updates" />} />
        <Route path="/admin/reviews" element={<AdminList entity="reviews" />} />
      </Route>
    </Routes>
  );
}


