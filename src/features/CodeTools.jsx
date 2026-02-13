import React, { useState, useEffect } from 'react';
import { Copy, Check, Trash2, Wand2, Minimize2 } from 'lucide-react';
import beautify from 'js-beautify';
import yaml from 'js-yaml';
import { useNavigate } from 'react-router-dom';

const CodeTools = ({ initialLanguage = 'javascript', languageRoutes = null }) => {
    const navigate = useNavigate();
    const [input, setInput] = useState('');
    const [output, setOutput] = useState('');
    const [language, setLanguage] = useState(initialLanguage);
    const [mode, setMode] = useState('beautify'); // 'beautify' or 'minify'
    const [spaces, setSpaces] = useState(2);
    const [copied, setCopied] = useState(false);
    const [error, setError] = useState(null);

    const LANGUAGES = [
        { id: 'javascript', label: 'JavaScript' },
        { id: 'css', label: 'CSS' },
        { id: 'html', label: 'HTML' },
        { id: 'yaml', label: 'YAML' },
    ];

    useEffect(() => {
        setLanguage(initialLanguage);
        setError(null);
    }, [initialLanguage]);

    useEffect(() => {
        if (!input.trim()) {
            setOutput('');
            setError(null);
            return;
        }

        try {
            setError(null);
            let result = '';

            if (mode === 'beautify') {
                const options = {
                    indent_size: spaces,
                    indent_char: ' ',
                    max_preserve_newlines: 2,
                    preserve_newlines: true,
                };

                switch (language) {
                    case 'javascript':
                        result = beautify.js(input, options);
                        break;
                    case 'css':
                        result = beautify.css(input, options);
                        break;
                    case 'html':
                        result = beautify.html(input, options);
                        break;
                    case 'yaml':
                        const yamlObj = yaml.load(input);
                        result = yaml.dump(yamlObj, { indent: spaces });
                        break;
                    default:
                        result = input;
                }
            } else {
                // Minify
                switch (language) {
                    case 'javascript':
                        // Simple JS minification (removes comments and extra spaces)
                        result = input
                            .replace(/\/\*[\s\S]*?\*\/|([^:]|^)\/\/.*$/gm, '$1') // remove comments
                            .replace(/\s+/g, ' ')
                            .trim();
                        break;
                    case 'css':
                        result = input
                            .replace(/\/\*[\s\S]*?\*\//g, '') // remove comments
                            .replace(/\s+/g, ' ')
                            .replace(/\s*([{}:;])\s*/g, '$1')
                            .trim();
                        break;
                    case 'html':
                        result = input
                            .replace(/<!--[\s\S]*?-->/g, '') // remove comments
                            .replace(/\s+/g, ' ')
                            .replace(/>\s+</g, '><')
                            .trim();
                        break;
                    case 'yaml':
                        setError('Minification not available for YAML');
                        result = '';
                        break;
                    default:
                        result = input;
                }
            }
            setOutput(result);
        } catch (e) {
            setError(e.message);
            setOutput('');
        }
    }, [input, language, mode, spaces]);

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

    const handleLanguageChange = (nextLanguage) => {
        if (languageRoutes?.[nextLanguage]) {
            navigate(languageRoutes[nextLanguage]);
            return;
        }

        setLanguage(nextLanguage);
    };

    return (
        <div className="flex flex-col gap-4 h-full">
            <div className="flex flex-wrap items-center justify-between gap-4 bg-slate-900/50 p-4 rounded-xl border border-slate-800">
                <div className="flex flex-wrap items-center gap-6">
                    {/* Language Selector */}
                    <div className="flex items-center gap-3">
                        <span className="text-sm font-medium text-slate-400">Language:</span>
                        <select
                            value={language}
                            onChange={(e) => handleLanguageChange(e.target.value)}
                            className="bg-slate-800 text-slate-200 text-sm font-bold rounded-lg px-3 py-1.5 border border-slate-700 focus:border-blue-500 outline-none cursor-pointer"
                        >
                            {LANGUAGES.map((l) => (
                                <option key={l.id} value={l.id}>
                                    {l.label}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Mode Selector */}
                    <div className="flex items-center gap-3">
                        <span className="text-sm font-medium text-slate-400">Action:</span>
                        <div className="flex bg-slate-800 p-1 rounded-lg">
                            <button
                                onClick={() => setMode('beautify')}
                                className={`flex items-center gap-2 px-4 py-1.5 rounded-md text-xs font-bold transition-all ${mode === 'beautify'
                                    ? 'bg-blue-600 text-white shadow-lg'
                                    : 'text-slate-400 hover:text-white'
                                    }`}
                            >
                                <Wand2 size={14} />
                                Beautify
                            </button>
                            <button
                                onClick={() => setMode('minify')}
                                className={`flex items-center gap-2 px-4 py-1.5 rounded-md text-xs font-bold transition-all ${mode === 'minify'
                                    ? 'bg-blue-600 text-white shadow-lg'
                                    : 'text-slate-400 hover:text-white'
                                    }`}
                            >
                                <Minimize2 size={14} />
                                Minify
                            </button>
                        </div>
                    </div>

                    {/* Indentation Selector (only for beautify) */}
                    {mode === 'beautify' && (
                        <div className="flex items-center gap-3">
                            <span className="text-sm font-medium text-slate-400">Spaces:</span>
                            <div className="flex bg-slate-800 p-1 rounded-lg">
                                {[2, 4].map((s) => (
                                    <button
                                        key={s}
                                        onClick={() => setSpaces(s)}
                                        className={`px-3 py-1.5 rounded-md text-xs font-bold transition-all ${spaces === s
                                            ? 'bg-slate-600 text-white'
                                            : 'text-slate-400 hover:text-white'
                                            }`}
                                    >
                                        {s}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}
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
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all ${copied
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
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Input</label>
                    <textarea
                        className="flex-1 bg-slate-900 border border-slate-800 rounded-xl p-4 font-mono text-sm text-slate-300 focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 outline-none resize-none transition-all"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder={`Paste your ${language} here...`}
                    />
                </div>
                <div className="flex flex-col gap-2 h-full">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Result</label>
                    <div className="relative flex-1">
                        <textarea
                            readOnly
                            className={`w-full h-full bg-slate-900/50 border rounded-xl p-4 font-mono text-sm outline-none resize-none transition-all ${error ? 'border-red-500/50 text-red-400' : 'border-slate-800 text-blue-400'
                                }`}
                            value={error ? `Error: ${error}` : output}
                            placeholder="Result will appear here..."
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CodeTools;
