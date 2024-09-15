import React from 'react'
import '../styles/Header.css'

function Header() {
    return (
        <header className="header">
          <div className="logo">HealthGuardian</div>
          <div className="header-icons">
            <div className="icon notification-icon">🔔</div>
            <div className="icon profile-icon">👤</div>
          </div>
        </header>
    );
}

export default Header
