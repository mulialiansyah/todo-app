import { Edit, Trash2 } from 'lucide-react';
import { taskStatusCategories, taskPriorityCategories } from '../data/mockData';

export default function TaskCategories() {
  return (
    <div className="dashboard-content" style={{ padding: '40px' }}>
      
      <div className="panel" style={{ minHeight: 'calc(100vh - 160px)' }}>
        <div className="categories-header">
          <h2 style={{ fontSize: '24px', fontWeight: '600' }}>Task Categories</h2>
          <button className="go-back-btn">Go Back</button>
        </div>
        
        <button className="btn-add-category">Add Category</button>

        {/* Task Status Table */}
        <div className="table-section">
          <div className="table-header">
            <h3 style={{ borderBottom: '3px solid #ff6b6b', paddingBottom: '4px', display: 'inline-block' }}>Task Status</h3>
            <span className="add-link">+ Add Task Status</span>
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
              {taskStatusCategories.map((cat, idx) => (
                <tr key={cat.id}>
                  <td>{idx + 1}</td>
                  <td>{cat.name}</td>
                  <td>
                    <div className="action-buttons-cell">
                      <button className="btn-action btn-action-edit">
                        <Edit size={14} /> Edit
                      </button>
                      <button className="btn-action btn-action-delete">
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
            <span className="add-link">+ Add New Priority</span>
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
              {taskPriorityCategories.map((cat, idx) => (
                <tr key={cat.id}>
                  <td>{idx + 1}</td>
                  <td>{cat.name}</td>
                  <td>
                    <div className="action-buttons-cell">
                      <button className="btn-action btn-action-edit">
                        <Edit size={14} /> Edit
                      </button>
                      <button className="btn-action btn-action-delete">
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
    </div>
  );
}
