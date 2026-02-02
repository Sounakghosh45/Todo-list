import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import ThemeContext from '../context/ThemeContext';
import { FaUserPlus, FaSun, FaMoon } from 'react-icons/fa';

const Register = () => {
    const [formData, setFormData] = useState({ username: '', password: '' });
    const { register } = useContext(AuthContext);
    const { theme, toggleTheme } = useContext(ThemeContext);
    const navigate = useNavigate();
    const [error, setError] = useState('');

    const { username, password } = formData;

    const onChange = (e) =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async (e) => {
        e.preventDefault();
        if (password.length < 6) {
            setError('Password must be at least 6 characters');
            return;
        }

        const res = await register(username, password);
        if (res.success) {
            navigate('/');
        } else {
            setError(res.error);
        }
    };

    return (
        <div style={containerStyle}>
            <div style={themeToggleContainer}>
                <button onClick={toggleTheme} style={toggleButtonStyle}>
                    {theme === 'dark' ? <FaSun /> : <FaMoon />}
                </button>
            </div>
            <div style={cardStyle}>
                <h2 style={titleStyle}>
                    <FaUserPlus /> Register
                </h2>
                {error && <p style={errorStyle}>{error}</p>}
                <form onSubmit={onSubmit}>
                    <div style={inputGroupStyle}>
                        <label style={labelStyle}>Username</label>
                        <input
                            type="text"
                            name="username"
                            value={username}
                            onChange={onChange}
                            style={inputStyle}
                            required
                        />
                    </div>
                    <div style={inputGroupStyle}>
                        <label style={labelStyle}>Password</label>
                        <input
                            type="password"
                            name="password"
                            value={password}
                            onChange={onChange}
                            style={inputStyle}
                            required
                            minLength="6"
                        />
                    </div>
                    <button type="submit" style={buttonStyle}>Register</button>
                </form>
                <p style={footerStyle}>
                    Already have an account? <Link to="/login" style={linkStyle}>Login</Link>
                </p>
            </div>
        </div>
    );
};

// Reusing styles manually since we are in a hurry, normally would use a shared component or CSS classes
const containerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    width: '100%',
};

const cardStyle = {
    background: 'var(--card-bg)',
    padding: '40px',
    borderRadius: 'var(--radius)',
    boxShadow: 'var(--shadow)',
    width: '100%',
    maxWidth: '400px',
    textAlign: 'center',
};

const titleStyle = {
    color: 'var(--primary)',
    marginBottom: '20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '10px',
};

const errorStyle = {
    background: 'rgba(239, 68, 68, 0.1)',
    color: 'var(--danger)',
    padding: '10px',
    borderRadius: '8px',
    marginBottom: '20px',
};

const inputGroupStyle = {
    marginBottom: '20px',
    textAlign: 'left',
};

const labelStyle = {
    display: 'block',
    marginBottom: '8px',
    color: 'var(--text-secondary)',
};

const inputStyle = {
    width: '100%',
    padding: '12px',
    borderRadius: '8px',
    border: '1px solid var(--text-secondary)',
    background: 'transparent',
    color: 'var(--text-main)',
    fontSize: '1rem',
};

const buttonStyle = {
    width: '100%',
    padding: '12px',
    background: 'var(--primary)',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontSize: '1rem',
    cursor: 'pointer',
    transition: 'background 0.2s',
};

const footerStyle = {
    marginTop: '20px',
    color: 'var(--text-secondary)',
};

const linkStyle = {
    color: 'var(--primary)',
    textDecoration: 'none',
    fontWeight: 'bold',
};

const themeToggleContainer = {
    position: 'absolute',
    top: '20px',
    right: '20px',
};

const toggleButtonStyle = {
    background: 'var(--card-bg)',
    border: '1px solid var(--text-secondary)',
    color: 'var(--text-main)',
    padding: '10px',
    borderRadius: '50%',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '1.2rem',
    transition: 'all 0.3s ease',
    boxShadow: 'var(--shadow)',
};

export default Register;
