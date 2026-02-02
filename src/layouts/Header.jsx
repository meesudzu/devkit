import React from 'react';

/**
 * Header component with title
 * @param {Object} props
 * @param {string} props.title - Page title
 */
const Header = ({ title }) => {
    return (
        <header className="h-14 bg-slate-900/50 border-b border-slate-800 flex items-center px-6 justify-between backdrop-blur-md shrink-0">
            <h2 className="font-semibold text-slate-200">{title}</h2>
        </header>
    );
};

export default Header;
