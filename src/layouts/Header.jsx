import { Github } from 'lucide-react';

/**
 * Header component with title and actions
 * @param {Object} props
 * @param {string} props.title - Page title
 */
const Header = ({ title }) => {
    return (
        <header className="h-14 bg-slate-900/50 border-b border-slate-800 flex items-center px-6 justify-between backdrop-blur-md shrink-0">
            <h2 className="font-semibold text-slate-200">{title}</h2>
            <div className="flex gap-2">
                <a
                    href="https://github.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate-500 hover:text-white transition-colors"
                >
                    <Github size={20} />
                </a>
            </div>
        </header>
    );
};

export default Header;
