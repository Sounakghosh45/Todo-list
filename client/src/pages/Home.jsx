import { useState, useEffect, useContext } from 'react';
import ThemeContext from '../context/ThemeContext';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import TodoForm from '../components/TodoForm';
import TodoList from '../components/TodoList';
import { getTodos, createTodo, updateTodo, deleteTodo } from '../api';

function Home() {
    const [todos, setTodos] = useState([]);
    const [filter, setFilter] = useState('all');
    const { theme, toggleTheme } = useContext(ThemeContext);

    useEffect(() => {
        fetchTodos();
    }, []);

    useEffect(() => {
        fetchTodos();
    }, []);

    const fetchTodos = async () => {
        try {
            const data = await getTodos();
            setTodos(data);
        } catch (error) {
            console.error('Error fetching todos:', error);
        }
    };

    const addTodo = async (text) => {
        try {
            const newTodo = await createTodo(text);
            setTodos([newTodo, ...todos]);
        } catch (error) {
            console.error('Error adding todo:', error);
            alert('Failed to add todo. Please check if the backend server and MongoDB are running.');
        }
    };

    const toggleComplete = async (id, completed) => {
        try {
            const updated = await updateTodo(id, { completed: !completed });
            setTodos(todos.map(todo => (todo._id === id ? updated : todo)));
        } catch (error) {
            console.error('Error updating todo:', error);
        }
    };

    const removeTodo = async (id) => {
        try {
            await deleteTodo(id);
            setTodos(todos.filter(todo => todo._id !== id));
        } catch (error) {
            console.error('Error deleting todo:', error);
        }
    };

    const filteredTodos = todos.filter(todo => {
        if (filter === 'active') return !todo.completed;
        if (filter === 'completed') return todo.completed;
        return true;
    });

    return (
        <div className="app-layout">
            <Sidebar currentFilter={filter} setFilter={setFilter} theme={theme} />
            <div className="main-content">
                <Header theme={theme} toggleTheme={toggleTheme} />
                <TodoForm onAdd={addTodo} />
                <TodoList
                    todos={filteredTodos}
                    onToggle={toggleComplete}
                    onDelete={removeTodo}
                />
            </div>
        </div>
    );
}

export default Home;
