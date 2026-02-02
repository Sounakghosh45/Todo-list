import { FaTrash, FaCheck } from 'react-icons/fa';

const TodoItem = ({ todo, onToggle, onDelete }) => {
    return (
        <li style={itemStyle(todo.completed)}>
            <div
                style={checkContainerStyle(todo.completed)}
                onClick={() => onToggle(todo._id, todo.completed)}
            >
                {todo.completed && <FaCheck color="white" size={12} />}
            </div>

            <span
                style={textStyle(todo.completed)}
                onClick={() => onToggle(todo._id, todo.completed)}
            >
                {todo.text}
            </span>

            <button
                style={deleteButtonStyle}
                onClick={() => onDelete(todo._id)}
            >
                <FaTrash />
            </button>
        </li>
    );
};

const itemStyle = (completed) => ({
    display: 'flex',
    alignItems: 'center',
    background: 'var(--card-bg)',
    marginBottom: '10px',
    padding: '16px',
    borderRadius: 'var(--radius)',
    boxShadow: 'var(--shadow)',
    transition: 'all 0.2s ease',
    opacity: completed ? 0.7 : 1,
});

const checkContainerStyle = (completed) => ({
    width: '24px',
    height: '24px',
    borderRadius: '50%',
    border: `2px solid ${completed ? 'var(--success)' : 'var(--text-secondary)'}`,
    background: completed ? 'var(--success)' : 'transparent',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: '16px',
    cursor: 'pointer',
    flexShrink: 0,
});

const textStyle = (completed) => ({
    flex: 1,
    textDecoration: completed ? 'line-through' : 'none',
    color: completed ? 'var(--text-secondary)' : 'var(--text-main)',
    cursor: 'pointer',
});

const deleteButtonStyle = {
    background: 'transparent',
    border: 'none',
    color: 'var(--danger)',
    cursor: 'pointer',
    padding: '8px',
    fontSize: '1rem',
    opacity: 0.8,
};

export default TodoItem;
