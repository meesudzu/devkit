import React, { useState, useEffect } from 'react';

/**
 * Encoding mode options
 */
const MODES = [
    { id: 'b64_enc', label: 'Base64 Encode' },
    { id: 'b64_dec', label: 'Base64 Decode' },
    { id: 'url_enc', label: 'URL Encode' },
    { id: 'url_dec', label: 'URL Decode' },
];

/**
 * String Encoding/Decoding Tools
 * Base64 and URL encode/decode functionality
 */
const StringTools = () => {
    const [input, setInput] = useState('');
    const [output, setOutput] = useState('');
    const [mode, setMode] = useState('b64_enc');

    useEffect(() => {
        try {
            if (!input) {
                setOutput('');
                return;
            }

            switch (mode) {
                case 'b64_enc':
                    setOutput(btoa(input));
                    break;
                case 'b64_dec':
                    setOutput(atob(input));
                    break;
                case 'url_enc':
                    setOutput(encodeURIComponent(input));
                    break;
                case 'url_dec':
                    setOutput(decodeURIComponent(input));
                    break;
                default:
                    setOutput('');
            }
        } catch (e) {
            setOutput("Error: " + e.message);
        }
    }, [input, mode]);

    return (
        <div className="flex flex-col gap-4 h-full">
            {/* Mode Selector */}
            <div className="flex gap-2 bg-slate-800 p-1 rounded-lg w-fit shrink-0">
                {MODES.map(m => (
                    <button
                        key={m.id}
                        onClick={() => setMode(m.id)}
                        className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${mode === m.id
                                ? 'bg-blue-600 text-white shadow'
                                : 'text-slate-400 hover:text-white'
                            }`}
                    >
                        {m.label}
                    </button>
                ))}
            </div>

            {/* Input/Output Areas */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-1 min-h-0">
                <div className="flex flex-col gap-2 h-full">
                    <label className="text-xs font-bold text-slate-500 uppercase">Input</label>
                    <textarea
                        className="flex-1 bg-slate-900 border border-slate-700 rounded-lg p-3 font-mono text-sm text-slate-300 focus:border-blue-500 outline-none resize-none"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Type here..."
                    />
                </div>
                <div className="flex flex-col gap-2 h-full">
                    <label className="text-xs font-bold text-slate-500 uppercase">Output</label>
                    <textarea
                        readOnly
                        className="flex-1 bg-slate-800 border border-slate-700 rounded-lg p-3 font-mono text-sm text-green-400 focus:outline-none resize-none"
                        value={output}
                    />
                </div>
            </div>
        </div>
    );
};

export default StringTools;
