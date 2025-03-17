import { useAuth } from '../auth/AuthContext';

export default function Header() {
  const { isAuthenticated, user, logout } = useAuth();

  return (
    <header className="site-header">
      <div className="header-container">
        <div className="logo">
          <h1>Firecrawl</h1>
        </div>
        
        {isAuthenticated && (
          <nav className="main-nav">
            <ul>
              <li>
                <a href="/dashboard">Dashboard</a>
              </li>
              <li>
                <a href="/acknowledge">Acknowledge</a>
              </li>
            </ul>
          </nav>
        )}
        
        <div className="user-actions">
          {isAuthenticated ? (
            <>
              <span className="user-name">Welcome, {user?.name || 'User'}</span>
              <button onClick={logout} className="logout-button">Logout</button>
            </>
          ) : (
            <a href="/login" className="login-link">Login</a>
          )}
        </div>
      </div>
    </header>
  );
} 