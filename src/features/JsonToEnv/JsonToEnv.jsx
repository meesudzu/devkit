import React, { useState, useEffect } from 'react';
import { Copy, Check, ArrowRightLeft } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

/**
 * JsonToEnv Component
 * Converts JSON objects to .env format (KEY=VALUE) and vice versa
 */
const JsonToEnv = ({ initialMode = 'json2env' }) => {
    const location = useLocation();
    const navigate = useNavigate();

    const [input, setInput] = useState(location.state?.prefilledInput || '');
    const [output, setOutput] = useState('');
    const [error, setError] = useState(null);
    const [copied, setCopied] = useState(false);

    const mode = initialMode;

    // Handle incoming prefilledInput when route changes
    useEffect(() => {
        if (location.state?.prefilledInput) {
            setInput(location.state.prefilledInput);
            navigate(location.pathname, { replace: true, state: {} });
        } else {
            setInput('');
        }
    }, [mode]);

    useEffect(() => {
        if (!input.trim()) {
            setOutput('');
            setError(null);
            return;
        }

        try {
            if (mode === 'json2env') {
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
            } else {
                // env to json
                const lines = input.split('\n');
                const result = {};

                for (let line of lines) {
                    line = line.trim();
                    // Skip empty lines and comments
                    if (!line || line.startsWith('#')) continue;

                    // Match key=value (first = splits key and value)
                    const matchIdx = line.indexOf('=');
                    if (matchIdx !== -1) {
                        const key = line.substring(0, matchIdx).trim();
                        let value = line.substring(matchIdx + 1).trim();

                        // Remove wrapping quotes and unescape inner quotes
                        if (value.startsWith('"') && value.endsWith('"')) {
                            value = value.slice(1, -1);
                            value = value.replace(/\\"/g, '"');
                        } else if (value.startsWith("'") && value.endsWith("'")) {
                            value = value.slice(1, -1);
                        }

                        // Try to parse values back to boolean/number if possible, else string
                        if (value === 'true') value = true;
                        else if (value === 'false') value = false;
                        else if (value === 'null') value = null;
                        else if (!isNaN(Number(value)) && value !== '') {
                            // Let's keep numeric-looking things as plain strings in env to json,
                            // or parse them if they don't have leading zero
                            if (!value.startsWith('0') || value === '0') {
                                value = Number(value);
                            }
                        }

                        if ((typeof value === 'string') && (value.startsWith('{') || value.startsWith('['))) {
                            try {
                                value = JSON.parse(value);
                            } catch (e) {
                                // keep as string if invalid JSON
                            }
                        }

                        result[key] = value;
                    }
                }

                setOutput(JSON.stringify(result, null, 2));
                setError(null);
            }
        } catch (e) {
            setError(e.message);
            setOutput('');
        }
    }, [input, mode]);

    const handleCopy = () => {
        if (!output) return;
        navigator.clipboard.writeText(output);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const toggleMode = () => {
        const nextMode = mode === 'json2env' ? 'env2json' : 'json2env';
        navigate(`/${nextMode}`, { state: { prefilledInput: output } });
    };

    return (
        <div className="flex flex-col h-full gap-4">
            <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-slate-100">
                    {mode === 'json2env' ? 'JSON to .env Converter' : '.env to JSON Converter'}
                </h2>
                <button
                    onClick={toggleMode}
                    className="flex items-center gap-2 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg transition-colors text-sm font-medium"
                >
                    <ArrowRightLeft size={16} />
                    Switch to {mode === 'json2env' ? '.env to JSON' : 'JSON to .env'}
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-1 min-h-0">
                {/* Input Section */}
                <div className="flex flex-col gap-2 h-full">
                    <label className="text-xs font-bold text-slate-500 uppercase flex justify-between">
                        <span>Input ({mode === 'json2env' ? 'JSON' : '.env'})</span>
                        {error && <span className="text-red-400 normal-case">{error}</span>}
                    </label>
                    <textarea
                        className={`flex-1 bg-slate-900 border ${error ? 'border-red-500/50' : 'border-slate-700'} rounded-lg p-3 font-mono text-sm text-slate-300 focus:border-blue-500 outline-none resize-none transition-colors`}
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder={mode === 'json2env' ? '{\n  "KEY_A": "Value A",\n  "KEY_B": "Value B"\n}' : 'KEY_A="Value A"\nKEY_B="Value B"'}
                    />
                </div>

                {/* Output Section */}
                <div className="flex flex-col gap-2 h-full">
                    <label className="text-xs font-bold text-slate-500 uppercase flex justify-between items-center">
                        <span>Output ({mode === 'json2env' ? '.env' : 'JSON'})</span>
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
                        placeholder={mode === 'json2env' ? 'KEY_A="Value A"...' : '{\n  "KEY_A": "Value A"\n}...'}
                    />
                </div>
            </div>
        </div>
    );
};

export default JsonToEnv;
