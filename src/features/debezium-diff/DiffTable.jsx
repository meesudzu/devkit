import { CheckCircle } from 'lucide-react';

/**
 * Renders the diff comparison table
 * @param {Object} props
 * @param {Array} props.diffs - Array of diff items
 */
const DiffTable = ({ diffs }) => {
    if (!diffs || diffs.length === 0) {
        return (
            <div className="text-center text-slate-500 py-10 flex flex-col items-center gap-2">
                <CheckCircle size={32} className="opacity-50" />
                <p>No differences found based on current filters.</p>
            </div>
        );
    }

    const getRowStyle = (type) => {
        switch (type) {
            case 'changed': return 'bg-yellow-500/10 text-yellow-200';
            case 'added': return 'bg-green-500/10 text-green-200';
            case 'removed': return 'bg-red-500/10 text-red-200';
            default: return 'text-slate-500';
        }
    };

    const getIndicator = (type) => {
        switch (type) {
            case 'changed': return <span className="text-yellow-500 font-bold">●</span>;
            case 'added': return <span className="text-green-500 font-bold">+</span>;
            case 'removed': return <span className="text-red-500 font-bold">-</span>;
            default: return null;
        }
    };

    return (
        <table className="w-full text-left border-collapse">
            <thead className="sticky top-0 bg-slate-800 z-10 shadow-md">
                <tr className="text-slate-400 border-b border-slate-700">
                    <th className="py-2 px-3 w-1/4">Key</th>
                    <th className="py-2 px-3 w-1/3 border-l border-slate-700">Before</th>
                    <th className="py-2 px-3 w-1/3 border-l border-slate-700">After</th>
                </tr>
            </thead>
            <tbody>
                {diffs.map((item) => (
                    <tr
                        key={item.key}
                        className={`border-b border-slate-800/50 hover:bg-slate-800/30 transition-colors ${getRowStyle(item.type)}`}
                    >
                        <td className="py-2 px-3 font-semibold flex items-center gap-2">
                            {getIndicator(item.type)}
                            {item.key}
                        </td>
                        <td className={`py-2 px-3 border-l border-slate-800 break-all ${item.type === 'removed' ? 'line-through opacity-70' : ''}`}>
                            {item.type === 'added'
                                ? <span className="text-slate-600">-</span>
                                : JSON.stringify(item.oldVal ?? item.val)}
                        </td>
                        <td className={`py-2 px-3 border-l border-slate-800 break-all ${item.type === 'added' ? 'font-bold' : ''}`}>
                            {item.type === 'removed'
                                ? <span className="text-slate-600">-</span>
                                : JSON.stringify(item.newVal ?? item.val)}
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default DiffTable;
