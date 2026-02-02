/**
 * Reusable Button component with multiple variants
 * @param {Object} props
 * @param {React.ReactNode} props.children - Button content
 * @param {Function} props.onClick - Click handler
 * @param {'primary'|'secondary'|'danger'|'ghost'} props.variant - Button style variant
 * @param {string} props.className - Additional CSS classes
 * @param {boolean} props.disabled - Whether button is disabled
 * @param {React.ComponentType} props.icon - Optional Lucide icon component
 */
const Button = ({
    children,
    onClick,
    variant = 'primary',
    className = '',
    disabled = false,
    icon: Icon
}) => {
    const baseStyle = "px-4 py-2 rounded-md font-medium transition-all flex items-center gap-2 text-sm";

    const variants = {
        primary: "bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-500/20",
        secondary: "bg-slate-700 hover:bg-slate-600 text-slate-200 border border-slate-600",
        danger: "bg-red-900/50 hover:bg-red-900/80 text-red-200 border border-red-800",
        ghost: "text-slate-400 hover:text-white hover:bg-slate-800"
    };

    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className={`${baseStyle} ${variants[variant]} ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
        >
            {Icon && <Icon size={16} />}
            {children}
        </button>
    );
};

export default Button;
