/**
 * Card container component with optional title header
 * @param {Object} props
 * @param {React.ReactNode} props.title - Optional card title
 * @param {React.ReactNode} props.children - Card content
 * @param {string} props.className - Additional CSS classes
 */
const Card = ({ title, children, className = '' }) => (
    <div className={`bg-slate-800/50 border border-slate-700 rounded-xl overflow-hidden backdrop-blur-sm flex flex-col ${className}`}>
        {title && (
            <div className="px-4 py-3 border-b border-slate-700 bg-slate-800/80 font-semibold text-slate-200 flex items-center gap-2 shrink-0">
                {title}
            </div>
        )}
        <div className="p-4 flex-1 min-h-0 flex flex-col">
            {children}
        </div>
    </div>
);

export default Card;
