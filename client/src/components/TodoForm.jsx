import { useState } from 'react';
import { FaPlus } from 'react-icons/fa';

const TodoForm = ({ onAdd }) => {
    const [text, setText] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!text.trim()) return;
        onAdd(text);
        setText('');
    };

    return (
        <form onSubmit={handleSubmit} style={formStyle}>
            <input
                type="text"
                placeholder="Add a new task..."
                value={text}
                onChange={(e) => setText(e.target.value)}
                style={inputStyle}
            />
            <button type="submit" style={buttonStyle}>
                <FaPlus />
            </button>
        </form>
    );
};

const formStyle = {
    display: 'flex',
    gap: '10px',
    marginBottom: '30px',
    background: 'var(--card-bg)',
    padding: '10px',
    borderRadius: 'var(--radius)',
    boxShadow: 'var(--shadow)',
};

const inputStyle = {
    flex: 1,
    background: 'transparent',
    border: 'none',
    padding: '12px',
    fontSize: '1rem',
    color: 'var(--text-main)',
};

const buttonStyle = {
    background: 'var(--primary)',
    color: 'white',
    border: 'none',
    width: '48px',
    height: '48px',
    borderRadius: '8px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '1.2rem',
    transition: 'background 0.2s',
};

export default TodoForm;
