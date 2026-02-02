import TodoItem from './TodoItem';

const TodoList = ({ todos, onToggle, onDelete }) => {
    if (todos.length === 0) {
        return <p style={{ textAlign: 'center', color: 'var(--text-secondary)' }}>No tasks for today!</p>;
    }

    return (
        <ul style={{ listStyle: 'none' }}>
            {todos.map((todo) => (
                <TodoItem
                    key={todo._id}
                    todo={todo}
                    onToggle={onToggle}
                    onDelete={onDelete}
                />
            ))}
        </ul>
    );
};

export default TodoList;
