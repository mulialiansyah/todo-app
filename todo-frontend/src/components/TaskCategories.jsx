import { useState, useEffect } from 'react';
import { Edit, Trash2, X } from 'lucide-react';

export default function TaskCategories({ user }) {
  const [categories, setCategories] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('add'); // 'add' or 'edit'
  const [currentCategory, setCurrentCategory] = useState({ id: null, name: '', type: 'Status' });

  useEffect(() => {
    fetchCategories();
  }, [user]);

  const fetchCategories = async () => {
    if (!user) return;
    try {
      const res = await fetch(`http://localhost:3000/categories?userId=${user.id}`);
      if (res.ok) {
        const data = await res.json();
        setCategories(data);
      }
    } catch (err) {
      console.error("Failed to fetch categories", err);
    }
  };

  const handleSaveCategory = async (e) => {
    e.preventDefault();
    const url = modalMode === 'add' 
      ? 'http://localhost:3000/categories'
      : `http://localhost:3000/categories/${currentCategory.id}`;
    
    const method = modalMode === 'add' ? 'POST' : 'PUT';

    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...currentCategory, userId: user.id })
      });

      if (res.ok) {
        fetchCategories();
        setIsModalOpen(false);
      }
    } catch (err) {
      console.error("Failed to save category", err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this category?")) return;
    try {
      const res = await fetch(`http://localhost:3000/categories/${id}`, { method: 'DELETE' });
      if (res.ok) fetchCategories();
    } catch (err) {
      console.error("Failed to delete", err);
    }
  };

  const openAddModal = (defaultType = 'Status') => {
    setModalMode('add');
    setCurrentCategory({ id: null, name: '', type: defaultType });
    setIsModalOpen(true);
  };

  const openEditModal = (cat) => {
    setModalMode('edit');
    setCurrentCategory(cat);
    setIsModalOpen(true);
  };

  const statusCategories = categories.filter(c => c.type === 'Status');
  const priorityCategories = categories.filter(c => c.type === 'Priority');

  return (
    <div className="dashboard-content" style={{ padding: '40px' }}>
      
      <div className="panel" style={{ minHeight: 'calc(100vh - 160px)' }}>
        <div className="categories-header">
          <h2 style={{ fontSize: '24px', fontWeight: '600' }}>Task Categories</h2>
          <button className="go-back-btn" onClick={() => window.history.back()}>Go Back</button>
        </div>
        
        <button className="btn-add-category" onClick={() => openAddModal('Status')}>Add Category</button>

        {/* Task Status Table */}
        <div className="table-section">
          <div className="table-header">
            <h3 style={{ borderBottom: '3px solid #ff6b6b', paddingBottom: '4px', display: 'inline-block' }}>Task Status</h3>
            <span className="add-link" onClick={() => openAddModal('Status')} style={{cursor: 'pointer'}}>+ Add Task Status</span>
          </div>
          
          <table className="category-table">
            <thead>
              <tr>
                <th width="10%">SN</th>
                <th width="60%">Task Status</th>
                <th width="30%">Action</th>
              </tr>
            </thead>
            <tbody>
              {statusCategories.length === 0 && (
                <tr><td colSpan="3" style={{textAlign:'center', color: '#888'}}>No statuses found.</td></tr>
              )}
              {statusCategories.map((cat, idx) => (
                <tr key={cat.id}>
                  <td>{idx + 1}</td>
                  <td>{cat.name}</td>
                  <td>
                    <div className="action-buttons-cell">
                      <button className="btn-action btn-action-edit" onClick={() => openEditModal(cat)}>
                        <Edit size={14} /> Edit
                      </button>
                      <button className="btn-action btn-action-delete" onClick={() => handleDelete(cat.id)}>
                        <Trash2 size={14} /> Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Task Priority Table */}
        <div className="table-section" style={{ marginTop: '48px' }}>
          <div className="table-header">
            <h3 style={{ borderBottom: '3px solid #ff6b6b', paddingBottom: '4px', display: 'inline-block' }}>Task Priority</h3>
            <span className="add-link" onClick={() => openAddModal('Priority')} style={{cursor: 'pointer'}}>+ Add New Priority</span>
          </div>
          
          <table className="category-table">
            <thead>
              <tr>
                <th width="10%">SN</th>
                <th width="60%">Task Priority</th>
                <th width="30%">Action</th>
              </tr>
            </thead>
            <tbody>
              {priorityCategories.length === 0 && (
                <tr><td colSpan="3" style={{textAlign:'center', color: '#888'}}>No priorities found.</td></tr>
              )}
              {priorityCategories.map((cat, idx) => (
                <tr key={cat.id}>
                  <td>{idx + 1}</td>
                  <td>{cat.name}</td>
                  <td>
                    <div className="action-buttons-cell">
                      <button className="btn-action btn-action-edit" onClick={() => openEditModal(cat)}>
                        <Edit size={14} /> Edit
                      </button>
                      <button className="btn-action btn-action-delete" onClick={() => handleDelete(cat.id)}>
                        <Trash2 size={14} /> Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Popup */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h3>{modalMode === 'add' ? 'Add Category' : 'Edit Category'}</h3>
              <X size={20} style={{cursor: 'pointer'}} onClick={() => setIsModalOpen(false)} />
            </div>
            <form onSubmit={handleSaveCategory}>
              <div className="input-group">
                <label>Category Type</label>
                <select 
                  value={currentCategory.type} 
                  onChange={(e) => setCurrentCategory({...currentCategory, type: e.target.value})}
                  className="modal-input"
                  disabled={modalMode === 'edit'}
                >
                  <option value="Status">Task Status</option>
                  <option value="Priority">Task Priority</option>
                </select>
              </div>
              <div className="input-group" style={{marginTop: '16px'}}>
                <label>Category Name</label>
                <input 
                  type="text" 
                  value={currentCategory.name} 
                  onChange={(e) => setCurrentCategory({...currentCategory, name: e.target.value})}
                  className="modal-input"
                  required
                  placeholder="e.g. Completed, High, etc."
                />
              </div>
              <div style={{marginTop: '24px', display: 'flex', justifyContent: 'flex-end', gap: '12px'}}>
                <button type="button" className="btn-cancel" onClick={() => setIsModalOpen(false)}>Cancel</button>
                <button type="submit" className="btn-save">Save</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
