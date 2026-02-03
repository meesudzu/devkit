import { useState, useCallback } from 'react';
import { Copy, RefreshCw, Check } from 'lucide-react';
import { Button, Card } from '../components/ui';

/**
 * Password Generator - Generate secure random passwords
 */
const PasswordGenerator = () => {
    const [password, setPassword] = useState('');
    const [length, setLength] = useState(16);
    const [copied, setCopied] = useState(false);
    const [options, setOptions] = useState({
        uppercase: true,
        lowercase: true,
        numbers: true,
        symbols: true
    });

    const charSets = {
        uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
        lowercase: 'abcdefghijklmnopqrstuvwxyz',
        numbers: '0123456789',
        symbols: '!@#$%^&*()_+-=[]{}|;:,.<>?'
    };

    const generatePassword = useCallback(() => {
        let chars = '';
        if (options.uppercase) chars += charSets.uppercase;
        if (options.lowercase) chars += charSets.lowercase;
        if (options.numbers) chars += charSets.numbers;
        if (options.symbols) chars += charSets.symbols;

        if (!chars) {
            setPassword('Select at least one option');
            return;
        }

        const array = new Uint32Array(length);
        crypto.getRandomValues(array);

        let result = '';
        for (let i = 0; i < length; i++) {
            result += chars[array[i] % chars.length];
        }
        setPassword(result);
        setCopied(false);
    }, [length, options]);

    const copyToClipboard = async () => {
        await navigator.clipboard.writeText(password);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const toggleOption = (key) => {
        setOptions(prev => ({ ...prev, [key]: !prev[key] }));
    };

    return (
        <div className="flex flex-col gap-6 max-w-2xl mx-auto">
            <Card title="Password Generator">
                <div className="flex flex-col gap-6">
                    {/* Generated Password Display */}
                    <div className="flex gap-2">
                        <input
                            readOnly
                            value={password}
                            className="flex-1 bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 font-mono text-lg text-green-400 focus:outline-none"
                            placeholder="Click Generate..."
                        />
                        <Button
                            variant="secondary"
                            onClick={copyToClipboard}
                            disabled={!password}
                            icon={copied ? Check : Copy}
                        >
                            {copied ? 'Copied!' : 'Copy'}
                        </Button>
                    </div>

                    {/* Length Slider */}
                    <div className="flex flex-col gap-2">
                        <div className="flex justify-between text-sm">
                            <span className="text-slate-400">Length</span>
                            <span className="text-blue-400 font-mono font-bold">{length}</span>
                        </div>
                        <input
                            type="range"
                            min="8"
                            max="64"
                            value={length}
                            onChange={(e) => setLength(parseInt(e.target.value))}
                            className="w-full accent-blue-500"
                        />
                    </div>

                    {/* Character Options */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        {Object.entries(options).map(([key, value]) => (
                            <label
                                key={key}
                                className={`flex items-center gap-2 px-3 py-2 rounded-lg border cursor-pointer transition-all ${value
                                    ? 'bg-blue-600/20 border-blue-500/50 text-blue-300'
                                    : 'bg-slate-800 border-slate-700 text-slate-400'
                                    }`}
                            >
                                <input
                                    type="checkbox"
                                    checked={value}
                                    onChange={() => toggleOption(key)}
                                    className="hidden"
                                />
                                <span className={`w-4 h-4 rounded border flex items-center justify-center ${value ? 'bg-blue-500 border-blue-500' : 'border-slate-500'}`}>
                                    {value && <Check size={12} className="text-white" />}
                                </span>
                                <span className="text-sm capitalize">{key}</span>
                            </label>
                        ))}
                    </div>

                    {/* Generate Button */}
                    <Button onClick={generatePassword} icon={RefreshCw} className="w-full justify-center py-3">
                        Generate Password
                    </Button>
                </div>
            </Card>
        </div>
    );
};

export default PasswordGenerator;
