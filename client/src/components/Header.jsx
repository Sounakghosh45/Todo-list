import { useContext } from 'react';
import AuthContext from '../context/AuthContext';
import { FaTasks, FaSun, FaMoon, FaSignOutAlt } from 'react-icons/fa';

const Header = ({ theme, toggleTheme }) => {
    const { logout } = useContext(AuthContext);

    return (
        <header style={headerStyle}>
            <div style={topRowStyle}>
                <button onClick={toggleTheme} style={toggleButtonStyle}>
                    {theme === 'dark' ? <FaSun /> : <FaMoon />}
                </button>
                <button onClick={logout} style={{ ...toggleButtonStyle, marginLeft: '10px' }}>
                    <FaSignOutAlt /> Logout
                </button>
            </div>
            <h1 style={titleStyle}>
                <FaTasks style={iconStyle} />  Todo List
            </h1>
            <p style={subtitleStyle}>Focus on what matters.</p>
        </header>
    );
};

const headerStyle = {
    marginBottom: '40px',
    textAlign: 'center',
};

const titleStyle = {
    fontSize: '2.5rem',
    fontWeight: '700',
    color: 'var(--primary)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '12px',
};

const iconStyle = {
    fontSize: '2rem',
};

const subtitleStyle = {
    color: 'var(--text-secondary)',
    marginTop: '8px',
    fontSize: '1rem',
};

export default Header;

const topRowStyle = {
    display: 'flex',
    justifyContent: 'flex-end',
    marginBottom: '-20px',
};

const toggleButtonStyle = {
    background: 'transparent',
    border: '1px solid var(--text-secondary)',
    color: 'var(--text-main)',
    padding: '8px 12px',
    borderRadius: '20px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '5px',
    fontSize: '1rem',
    transition: 'all 0.3s ease',
};
