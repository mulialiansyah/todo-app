import { useState, useEffect } from 'react';
import { X, Image as ImageIcon } from 'lucide-react';

export default function TaskModal({ isOpen, onClose, onSave, taskToEdit, categories }) {
  const [task, setTask] = useState({
    title: '',
    description: '',
    status: 'Not Started',
    priority: 'Moderate',
    deadline: '',
    image: ''
  });
  const fileInputRef = useState(null);

  useEffect(() => {
    if (taskToEdit) {
      setTask({
        ...taskToEdit,
        deadline: taskToEdit.deadline ? taskToEdit.deadline.split('T')[0] : ''
      });
    } else {
      setTask({ title: '', description: '', status: 'Not Started', priority: 'Moderate', deadline: '', image: '' });
    }
  }, [taskToEdit, isOpen]);

  if (!isOpen) return null;

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setTask({...task, image: reader.result});
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(task);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content" style={{width: '700px', padding: '30px', borderRadius: '12px'}}>
        <div className="modal-header" style={{borderBottom: '2px solid #f0f0f0', paddingBottom: '16px', marginBottom: '24px'}}>
          <h3 style={{fontSize: '16px', fontWeight: 'bold'}}>
            <span style={{borderBottom: '2px solid #ff474d', paddingBottom: '16px'}}>{taskToEdit ? 'Edit Task' : 'Add New Task'}</span>
          </h3>
          <div style={{display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '14px', fontWeight: 'bold'}} onClick={onClose}>
            Go Back
          </div>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="input-group" style={{marginBottom: '20px'}}>
            <label style={{display: 'block', fontSize: '14px', fontWeight: 'bold', marginBottom: '8px'}}>Title</label>
            <input 
              type="text" 
              className="modal-input"
              value={task.title}
              onChange={(e) => setTask({...task, title: e.target.value})}
              required
            />
          </div>
          
          <div className="input-group" style={{marginBottom: '20px'}}>
            <label style={{display: 'block', fontSize: '14px', fontWeight: 'bold', marginBottom: '8px'}}>Date</label>
            <input 
              type="date" 
              className="modal-input"
              value={task.deadline}
              onChange={(e) => setTask({...task, deadline: e.target.value})}
            />
          </div>

          <div className="input-group" style={{marginBottom: '20px'}}>
            <label style={{display: 'block', fontSize: '14px', fontWeight: 'bold', marginBottom: '12px'}}>Priority</label>
            <div style={{display: 'flex', gap: '24px'}}>
              <label style={{display: 'flex', alignItems: 'center', gap: '6px', fontSize: '14px', color: '#ff474d'}}>
                <span style={{width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#ff474d'}}></span> Extreme
                <input type="radio" name="priority" value="Extreme" checked={task.priority === 'Extreme'} onChange={(e) => setTask({...task, priority: e.target.value})} style={{marginLeft: '4px'}} />
              </label>
              <label style={{display: 'flex', alignItems: 'center', gap: '6px', fontSize: '14px', color: '#4e95ff'}}>
                <span style={{width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#4e95ff'}}></span> Moderate
                <input type="radio" name="priority" value="Moderate" checked={task.priority === 'Moderate'} onChange={(e) => setTask({...task, priority: e.target.value})} style={{marginLeft: '4px'}} />
              </label>
              <label style={{display: 'flex', alignItems: 'center', gap: '6px', fontSize: '14px', color: '#28c76f'}}>
                <span style={{width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#28c76f'}}></span> Low
                <input type="radio" name="priority" value="Low" checked={task.priority === 'Low'} onChange={(e) => setTask({...task, priority: e.target.value})} style={{marginLeft: '4px'}} />
              </label>
            </div>
          </div>

          <div style={{display: 'flex', gap: '20px', marginBottom: '30px'}}>
            <div className="input-group" style={{flex: 2}}>
              <label style={{display: 'block', fontSize: '14px', fontWeight: 'bold', marginBottom: '8px'}}>Task Description</label>
              <textarea 
                className="modal-input"
                style={{height: '140px', resize: 'none'}}
                placeholder="Start writing here....."
                value={task.description}
                onChange={(e) => setTask({...task, description: e.target.value})}
              ></textarea>
            </div>
            
            <div className="input-group" style={{flex: 1}}>
              <label style={{display: 'block', fontSize: '14px', fontWeight: 'bold', marginBottom: '8px'}}>Upload Image</label>
              <div 
                style={{
                  border: '1px dashed #ccc', 
                  borderRadius: '8px', 
                  height: '140px', 
                  display: 'flex', 
                  flexDirection: 'column', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  backgroundColor: '#fafafa',
                  textAlign: 'center',
                  padding: '16px',
                  position: 'relative',
                  overflow: 'hidden'
                }}
              >
                {task.image ? (
                  <>
                    <img src={task.image} alt="Preview" style={{width: '100%', height: '100%', objectFit: 'cover', position: 'absolute', top: 0, left: 0}} />
                    <button type="button" onClick={() => setTask({...task, image: ''})} style={{
                      position: 'absolute', top: '8px', right: '8px', background: 'rgba(0,0,0,0.5)', color: 'white', border: 'none', borderRadius: '50%', width: '24px', height: '24px', cursor: 'pointer', zIndex: 1
                    }}><X size={14} /></button>
                  </>
                ) : (
                  <>
                    <ImageIcon size={32} color="#ccc" style={{marginBottom: '12px'}} />
                    <div style={{fontSize: '12px', color: '#aaa', marginBottom: '8px'}}>Drag&Drop files here<br/>or</div>
                    <button type="button" onClick={() => document.getElementById('imageUpload').click()} style={{
                      background: 'white', 
                      border: '1px solid #ccc', 
                      borderRadius: '16px', 
                      padding: '4px 16px',
                      fontSize: '12px',
                      cursor: 'pointer'
                    }}>Browse</button>
                  </>
                )}
                <input 
                  id="imageUpload" 
                  type="file" 
                  accept="image/*" 
                  style={{display: 'none'}} 
                  onChange={handleImageUpload} 
                />
              </div>
            </div>
          </div>

          <div style={{display: 'flex'}}>
            <button type="submit" className="btn-save" style={{padding: '10px 30px', fontSize: '14px'}}>Done</button>
          </div>
        </form>
      </div>
    </div>
  );
}
