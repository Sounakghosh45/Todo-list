import { FaList, FaCheckCircle, FaRegCircle } from 'react-icons/fa';

const Sidebar = ({ currentFilter, setFilter, theme }) => {
    const filters = [
        { id: 'all', label: 'All Tasks', icon: <FaList /> },
        { id: 'active', label: 'Active', icon: <FaRegCircle /> },
        { id: 'completed', label: 'Completed', icon: <FaCheckCircle /> },
    ];

    return (
        <aside style={sidebarStyle(theme)}>
            <h3 style={headerStyle}>My Lists</h3>
            <ul style={listStyle}>
                {filters.map((filter) => (
                    <li
                        key={filter.id}
                        style={itemStyle(currentFilter === filter.id, theme)}
                        onClick={() => setFilter(filter.id)}
                    >
                        <span style={iconStyle}>{filter.icon}</span>
                        {filter.label}
                    </li>
                ))}
            </ul>
        </aside>
    );
};

const sidebarStyle = (theme) => ({
    width: '250px',
    background: 'var(--card-bg)',
    borderRadius: 'var(--radius)',
    padding: '20px',
    height: 'fit-content',
    boxShadow: 'var(--shadow)',
    transition: 'background 0.3s ease',
    flexShrink: 0,
});

const headerStyle = {
    fontSize: '1.2rem',
    marginBottom: '20px',
    color: 'var(--primary)',
    fontWeight: '700',
    paddingLeft: '10px',
    borderLeft: '4px solid var(--primary)',
};

const listStyle = {
    listStyle: 'none',
};

const itemStyle = (isActive, theme) => ({
    display: 'flex',
    alignItems: 'center',
    padding: '12px 15px',
    marginBottom: '8px',
    borderRadius: '8px',
    cursor: 'pointer',
    color: isActive ? 'white' : 'var(--text-secondary)',
    background: isActive ? 'var(--primary)' : 'transparent',
    fontWeight: isActive ? '600' : '400',
    transition: 'all 0.2s ease',
});

const iconStyle = {
    marginRight: '10px',
    display: 'flex',
    alignItems: 'center',
    fontSize: '1.1rem',
};

export default Sidebar;
