import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

type Entity = 'places' | 'events' | 'updates' | 'reviews';

function useJwt() { return localStorage.getItem('admin_jwt') || ''; }

async function api(entity: Entity, method: string, body?: any, id?: string) {
  const token = useJwt();
  const url = id ? `http://localhost:3000/admin/${entity}/${id}` : `http://localhost:3000/admin/${entity}`;
  const res = await fetch(url, { method, headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` }, body: body ? JSON.stringify(body) : undefined });
  const data = await res.json();
  if (!res.ok) throw new Error(data?.message || 'Request failed');
  return data;
}

export function AdminList({ entity }: { entity: Entity }) {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState<any>({});

  useEffect(() => {
    (async () => {
      try { const data = await api(entity, 'GET'); setItems(data); } finally { setLoading(false); }
    })();
  }, [entity]);

  const create = async () => {
    const doc = await api(entity, 'POST', form);
    setItems([doc, ...items]);
    setForm({});
  };
  const update = async (id: string, patch: any) => {
    const doc = await api(entity, 'PUT', patch, id);
    setItems(items.map((x) => (x._id === id ? doc : x)));
  };
  const remove = async (id: string) => {
    await api(entity, 'DELETE', undefined, id);
    setItems(items.filter((x) => x._id !== id));
  };

  const renderForm = () => {
    switch (entity) {
      case 'places':
        return (
          <div className="grid md:grid-cols-2 gap-2">
            <div><Label>Name</Label><Input value={form.name || ''} onChange={(e) => setForm({ ...form, name: e.target.value })} /></div>
            <div><Label>Slug</Label><Input value={form.slug || ''} onChange={(e) => setForm({ ...form, slug: e.target.value })} /></div>
            <div><Label>Category</Label><Input value={form.category || ''} onChange={(e) => setForm({ ...form, category: e.target.value })} /></div>
            <div><Label>Image URL</Label><Input value={form.imageUrl || ''} onChange={(e) => setForm({ ...form, imageUrl: e.target.value })} /></div>
            <div className="md:col-span-2"><Label>Description</Label><Input value={form.description || ''} onChange={(e) => setForm({ ...form, description: e.target.value })} /></div>
          </div>
        );
      case 'events':
        return (
          <div className="grid md:grid-cols-2 gap-2">
            <div><Label>Title</Label><Input value={form.title || ''} onChange={(e) => setForm({ ...form, title: e.target.value })} /></div>
            <div><Label>Slug</Label><Input value={form.slug || ''} onChange={(e) => setForm({ ...form, slug: e.target.value })} /></div>
            <div><Label>District</Label><Input value={form.district || ''} onChange={(e) => setForm({ ...form, district: e.target.value })} /></div>
            <div><Label>Start Date</Label><Input value={form.startDate || ''} onChange={(e) => setForm({ ...form, startDate: e.target.value })} /></div>
            <div><Label>End Date</Label><Input value={form.endDate || ''} onChange={(e) => setForm({ ...form, endDate: e.target.value })} /></div>
            <div className="md:col-span-2"><Label>Description</Label><Input value={form.description || ''} onChange={(e) => setForm({ ...form, description: e.target.value })} /></div>
          </div>
        );
      case 'updates':
        return (
          <div className="grid gap-2">
            <div><Label>Title</Label><Input value={form.title || ''} onChange={(e) => setForm({ ...form, title: e.target.value })} /></div>
            <div><Label>Body</Label><Input value={form.body || ''} onChange={(e) => setForm({ ...form, body: e.target.value })} /></div>
            <div><Label>Severity (info|warning|critical)</Label><Input value={form.severity || ''} onChange={(e) => setForm({ ...form, severity: e.target.value })} /></div>
          </div>
        );
      case 'reviews':
        return (
          <div className="grid md:grid-cols-2 gap-2">
            <div><Label>Place Slug</Label><Input value={form.placeSlug || ''} onChange={(e) => setForm({ ...form, placeSlug: e.target.value })} /></div>
            <div><Label>Name</Label><Input value={form.name || ''} onChange={(e) => setForm({ ...form, name: e.target.value })} /></div>
            <div><Label>Rating</Label><Input value={form.rating || ''} onChange={(e) => setForm({ ...form, rating: e.target.value })} /></div>
            <div className="md:col-span-2"><Label>Comment</Label><Input value={form.comment || ''} onChange={(e) => setForm({ ...form, comment: e.target.value })} /></div>
          </div>
        );
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>{entity.toUpperCase()}</span>
          <div className="flex gap-2">
            <Button onClick={create}>Create</Button>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4 space-y-2">{renderForm()}</div>
        {loading ? (
          <div>Loading…</div>
        ) : (
          <div className="space-y-2">
            {items.map((item) => (
              <div key={item._id} className="p-3 border rounded flex items-center gap-2">
                <div className="flex-1 truncate">
                  <pre className="text-xs whitespace-pre-wrap break-words">{JSON.stringify(item, null, 2)}</pre>
                </div>
                <Button variant="outline" onClick={() => update(item._id, form)}>Update</Button>
                <Button variant="destructive" onClick={() => remove(item._id)}>Delete</Button>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export default function AdminEntitiesRouter() { return null; }


