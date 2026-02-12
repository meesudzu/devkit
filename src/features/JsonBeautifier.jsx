import React, { useState, useEffect } from 'react';
import { Copy, Check, Trash2 } from 'lucide-react';

const JsonBeautifier = () => {
    const [input, setInput] = useState('');
    const [output, setOutput] = useState('');
    const [spaces, setSpaces] = useState(2);
    const [copied, setCopied] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!input.trim()) {
            setOutput('');
            setError(null);
            return;
        }

        try {
            const parsed = JSON.parse(input);
            setOutput(JSON.stringify(parsed, null, spaces));
            setError(null);
        } catch (e) {
            setError(e.message);
            setOutput('');
        }
    }, [input, spaces]);

    const handleCopy = async () => {
        if (!output) return;
        await navigator.clipboard.writeText(output);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleClear = () => {
        setInput('');
        setOutput('');
        setError(null);
    };

    return (
        <div className="flex flex-col gap-4 h-full">
            <div className="flex flex-wrap items-center justify-between gap-4 bg-slate-900/50 p-4 rounded-xl border border-slate-800">
                <div className="flex items-center gap-3">
                    <span className="text-sm font-medium text-slate-400">Indentation:</span>
                    <div className="flex bg-slate-800 p-1 rounded-lg">
                        {[2, 4].map((s) => (
                            <button
                                key={s}
                                onClick={() => setSpaces(s)}
                                className={`px-4 py-1.5 rounded-md text-xs font-bold transition-all ${
                                    spaces === s
                                        ? 'bg-blue-600 text-white shadow-lg'
                                        : 'text-slate-400 hover:text-white'
                                }`}
                            >
                                {s} Spaces
                            </button>
                        ))}
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <button
                        onClick={handleClear}
                        className="p-2 text-slate-400 hover:text-red-400 transition-colors"
                        title="Clear all"
                    >
                        <Trash2 size={20} />
                    </button>
                    <button
                        onClick={handleCopy}
                        disabled={!output}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all ${
                            copied 
                                ? 'bg-green-500/20 text-green-400 border border-green-500/50' 
                                : 'bg-blue-600 text-white hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed'
                        }`}
                    >
                        {copied ? <Check size={18} /> : <Copy size={18} />}
                        {copied ? 'Copied' : 'Copy Result'}
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-1 min-h-0">
                <div className="flex flex-col gap-2 h-full">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Input JSON</label>
                    <textarea
                        className="flex-1 bg-slate-900 border border-slate-800 rounded-xl p-4 font-mono text-sm text-slate-300 focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 outline-none resize-none transition-all"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder='Paste your JSON here... e.g. {"name":"devkit","version":"1.4.1"}'
                    />
                </div>
                <div className="flex flex-col gap-2 h-full">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Beautified Output</label>
                    <div className="relative flex-1">
                        <textarea
                            readOnly
                            className={`w-full h-full bg-slate-900/50 border rounded-xl p-4 font-mono text-sm outline-none resize-none transition-all ${
                                error ? 'border-red-500/50 text-red-400' : 'border-slate-800 text-blue-400'
                            }`}
                            value={error ? `Error: ${error}` : output}
                            placeholder="Formatted JSON will appear here..."
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default JsonBeautifier;
