import React, { useEffect, useState } from 'react';
import { listForms, getForm, createForm, updateForm, deleteForm } from '../api';

export default function Dashboard() {
  const [view, setView] = useState('list');     // 'list' | 'create' | 'edit'
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  // state za create/edit
  const [currentId, setCurrentId] = useState(null);
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');

  async function load() {
    setLoading(true);
    try {
      const data = await listForms();
      setItems(Array.isArray(data) ? data : []);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { load(); }, []);

  /* list actions */
  async function onDelete(id) {
    if (!confirm('Obrisati formu?')) return;
    await deleteForm(id);
    setItems(prev => prev.filter(x => String(x.id) !== String(id)));
  }

  async function startEdit(id) {
    setLoading(true);
    try {
      const data = await getForm(id);
      setCurrentId(id);
      setTitle(data.title || '');
      setDesc(data.description || '');
      setView('edit');
    } finally {
      setLoading(false);
    }
  }

  function startCreate() {
    setCurrentId(null);
    setTitle('');
    setDesc('');
    setView('create');
  }

  async function submitCreate(e) {
    e.preventDefault();
    await createForm({ title, description: desc });
    await load();
    setView('list');
  }

  async function submitEdit(e) {
    e.preventDefault();
    await updateForm(currentId, { title, description: desc });
    await load();
    setView('list');
  }

  function cancel() {
    setView('list');
    setCurrentId(null);
    setTitle('');
    setDesc('');
  }

  if (loading && view === 'list') return <div style={{ padding: 16 }}>Učitavanje…</div>;

  return (
    <div style={{ padding: 16 }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2>Dashboard</h2>
        {view === 'list' ? (
          <button onClick={startCreate}>+ New</button>
        ) : (
          <button onClick={cancel}>← Back</button>
        )}
      </header>

      {/* LIST */}
      {view === 'list' && (
        <div style={{ marginTop: 16 }}>
          {items.length === 0 ? (
            <div>Nema formi.</div>
          ) : (
            <ul>
              {items.map(f => (
                <li key={f.id} style={{ marginBottom: 10 }}>
                  <strong>{f.title || `Form #${f.id}`}</strong>
                  {f.description ? <div style={{ opacity: 0.8 }}>{f.description}</div> : null}
                  <div style={{ display: 'inline-flex', gap: 8, marginTop: 6 }}>
                    <button onClick={() => startEdit(f.id)}>Edit</button>
                    <button onClick={() => onDelete(f.id)}>Delete</button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      {/* CREATE */}
      {view === 'create' && (
        <form onSubmit={submitCreate} style={{ maxWidth: 420, marginTop: 16 }}>
          <h3>Create form</h3>
          <label>Title</label>
          <input value={title} onChange={e => setTitle(e.target.value)} required />
          <label style={{ marginTop: 8 }}>Description</label>
          <input value={desc} onChange={e => setDesc(e.target.value)} />
          <button type="submit" style={{ marginTop: 12 }}>Save</button>
        </form>
      )}

      {/* EDIT */}
      {view === 'edit' && (
        <form onSubmit={submitEdit} style={{ maxWidth: 420, marginTop: 16 }}>
          <h3>Edit form #{currentId}</h3>
          <label>Title</label>
          <input value={title} onChange={e => setTitle(e.target.value)} required />
          <label style={{ marginTop: 8 }}>Description</label>
          <input value={desc} onChange={e => setDesc(e.target.value)} />
          <button type="submit" style={{ marginTop: 12 }}>Update</button>
        </form>
      )}
    </div>
  );
}
