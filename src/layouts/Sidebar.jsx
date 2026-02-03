import { Terminal } from 'lucide-react';

/**
 * Navigation item configuration
 */
const NavItem = ({ item, isActive, onClick }) => (
    <button
        onClick={onClick}
        className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-all ${isActive
            ? 'bg-blue-600/10 text-blue-400 border border-blue-600/20'
            : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
            }`}
    >
        <item.icon size={18} />
        <span className="text-sm font-medium">{item.label}</span>
    </button>
);

/**
 * Sidebar navigation component
 * @param {Object} props
 * @param {Array} props.navItems - Navigation items array
 * @param {string} props.activeTab - Currently active tab ID
 * @param {Function} props.onTabChange - Tab change handler
 */
const Sidebar = ({ navItems, activeTab, onTabChange }) => {
    return (
        <div className="w-64 bg-slate-900 border-r border-slate-800 flex flex-col shrink-0">
            {/* Logo */}
            <div className="p-4 border-b border-slate-800 flex items-center gap-2 text-blue-400">
                <Terminal size={24} />
                <span className="font-bold text-lg tracking-tight text-slate-100">
                    Dev<span className="text-blue-500">Kit</span>
                </span>
            </div>

            {/* Navigation */}
            <nav className="flex-1 p-2 space-y-1 overflow-y-auto">
                {navItems.map((item) => (
                    <NavItem
                        key={item.id}
                        item={item}
                        isActive={activeTab === item.id}
                        onClick={() => onTabChange(item.id)}
                    />
                ))}
            </nav>

            {/* Footer */}
            <div className="p-4 border-t border-slate-800 text-xs text-slate-500 text-center">
                v1.4.1 &bull; Local Storage Only
            </div>
        </div>
    );
};

export default Sidebar;
