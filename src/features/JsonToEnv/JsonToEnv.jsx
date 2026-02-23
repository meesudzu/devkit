import React, { useState, useEffect } from 'react';
import { Copy, Check } from 'lucide-react';

/**
 * JsonToEnv Component
 * Converts JSON objects to .env format (KEY=VALUE)
 */
const JsonToEnv = () => {
    const [input, setInput] = useState('');
    const [output, setOutput] = useState('');
    const [error, setError] = useState(null);
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        if (!input.trim()) {
            setOutput('');
            setError(null);
            return;
        }

        try {
            const parsed = JSON.parse(input);

            // Check if it's an object
            if (typeof parsed !== 'object' || parsed === null || Array.isArray(parsed)) {
                throw new Error('Input must be a JSON object');
            }

            const envLines = Object.entries(parsed)
                .filter(([key]) => key.trim() !== '')
                .map(([key, value]) => {
                    let formattedValue = value;

                    // Handle objects/arrays by stringifying them
                    if (typeof value === 'object' && value !== null) {
                        formattedValue = JSON.stringify(value);
                    }

                    // Escape existing double quotes
                    formattedValue = String(formattedValue).replace(/"/g, '\\"');

                    return `${key}="${formattedValue}"`;
                });

            setOutput(envLines.join('\n'));
            setError(null);
        } catch (e) {
            setError(e.message);
            // Don't clear output strictly on error to allow user to see partial work if we were doing valid-as-you-type, 
            // but here we are parsing whole thing. Let's keep previous valid output or clear? 
            // Clearing acts as visual feedback that it's broken.
            setOutput('');
        }
    }, [input]);

    const handleCopy = () => {
        if (!output) return;
        navigator.clipboard.writeText(output);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="flex flex-col h-full gap-4">
            <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-slate-100">JSON to .env Converter</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-1 min-h-0">
                {/* Input Section */}
                <div className="flex flex-col gap-2 h-full">
                    <label className="text-xs font-bold text-slate-500 uppercase flex justify-between">
                        <span>Input (JSON)</span>
                        {error && <span className="text-red-400 normal-case">{error}</span>}
                    </label>
                    <textarea
                        className={`flex-1 bg-slate-900 border ${error ? 'border-red-500/50' : 'border-slate-700'} rounded-lg p-3 font-mono text-sm text-slate-300 focus:border-blue-500 outline-none resize-none transition-colors`}
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder={'{\n  "KEY_A": "Value A",\n  "KEY_B": "Value B"\n}'}
                    />
                </div>

                {/* Output Section */}
                <div className="flex flex-col gap-2 h-full">
                    <label className="text-xs font-bold text-slate-500 uppercase flex justify-between items-center">
                        <span>Output (.env)</span>
                        {output && (
                            <button
                                onClick={handleCopy}
                                className="flex items-center gap-1 text-xs text-blue-400 hover:text-blue-300 transition-colors"
                            >
                                {copied ? <Check size={14} /> : <Copy size={14} />}
                                {copied ? 'Copied' : 'Copy'}
                            </button>
                        )}
                    </label>
                    <textarea
                        readOnly
                        className="flex-1 bg-slate-950 border border-slate-800 rounded-lg p-3 font-mono text-sm text-green-400 focus:outline-none resize-none"
                        value={output}
                        placeholder="KEY_A=Value A..."
                    />
                </div>
            </div>
        </div>
    );
};

export default JsonToEnv;
