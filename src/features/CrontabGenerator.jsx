import { useState, useEffect } from 'react';
import { Copy, Check, CalendarClock, Globe, Clock } from 'lucide-react';
import cronstrue from 'cronstrue';
import { Button, Card } from '../components/ui';

/**
 * Crontab Generator - Generate and explain cron expressions
 */
const CrontabGenerator = () => {
    const [expression, setExpression] = useState('* * * * *');
    const [description, setDescription] = useState('');
    const [error, setError] = useState('');
    const [copied, setCopied] = useState(false);

    // Time state
    const [localTime, setLocalTime] = useState('');
    const [utcTime, setUtcTime] = useState('');
    const [showUtc, setShowUtc] = useState(false);

    // Fields state
    const [fields, setFields] = useState({
        minute: '*',
        hour: '*',
        day: '*',
        month: '*',
        weekday: '*'
    });

    const PRESETS = [
        { label: 'Every minute', value: '* * * * *' },
        { label: 'Every 5 minutes', value: '*/5 * * * *' },
        { label: 'Every hour', value: '0 * * * *' },
        { label: 'Daily at midnight (UTC)', value: '0 0 * * *' },
        { label: 'Every Sunday at 3AM', value: '0 3 * * 0' },
        { label: 'First of every month', value: '0 0 1 * *' },
    ];

    // Update times every second
    useEffect(() => {
        const updateTime = () => {
            const now = new Date();
            setLocalTime(now.toLocaleString());
            setUtcTime(now.toLocaleString(undefined, { timeZone: 'UTC' }));
        };

        updateTime();
        const timer = setInterval(updateTime, 1000);
        return () => clearInterval(timer);
    }, []);

    // Update description when expression changes
    useEffect(() => {
        try {
            const desc = cronstrue.toString(expression);
            setDescription(desc);
            setError('');
        } catch (e) {
            setError('Invalid cron expression');
            setDescription('');
        }
    }, [expression]);

    // Update expression when fields change
    const handleFieldChange = (field, value) => {
        const newFields = { ...fields, [field]: value || '*' };
        setFields(newFields);
        setExpression(`${newFields.minute} ${newFields.hour} ${newFields.day} ${newFields.month} ${newFields.weekday}`);
    };

    // Auto-remove '*' when focusing
    const handleFocus = (field) => {
        if (fields[field] === '*') {
            handleFieldChange(field, '');
        }
    };

    // Restore '*' on blur if empty
    const handleBlur = (field) => {
        if (fields[field] === '') {
            handleFieldChange(field, '*');
        }
    };

    // Update fields when expression changes (simple split)
    useEffect(() => {
        const parts = expression.split(' ');
        if (parts.length === 5) {
            setFields({
                minute: parts[0],
                hour: parts[1],
                day: parts[2],
                month: parts[3],
                weekday: parts[4]
            });
        }
    }, [expression]);

    const copyToClipboard = async () => {
        await navigator.clipboard.writeText(expression);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const setPreset = (presetValue) => {
        setExpression(presetValue);
    };

    return (
        <div className="flex flex-col gap-6 max-w-4xl mx-auto pb-10">
            {/* Time Display Section */}
            <div className="flex flex-col md:flex-row justify-end items-end gap-3">
                {/* Local Time (Always visible) */}
                <div className="inline-flex items-center gap-2 bg-slate-900/50 px-4 py-2 rounded-lg border border-slate-700/50 text-slate-300 font-mono text-sm">
                    <Clock size={14} className="text-green-400" />
                    <span>Local:</span>
                    <span className="text-white font-bold">{localTime}</span>
                </div>

                {/* UTC Time (Conditional) */}
                {showUtc && (
                    <div className="inline-flex items-center gap-2 bg-blue-900/20 px-4 py-2 rounded-lg border border-blue-500/30 text-slate-300 font-mono text-sm">
                        <Globe size={14} className="text-blue-400" />
                        <span>UTC:</span>
                        <span className="text-white font-bold">{utcTime}</span>
                    </div>
                )}

                {/* UTC Toggle */}
                <label className="flex items-center gap-2 px-3 py-2 rounded-lg border border-slate-700/50 bg-slate-900/30 cursor-pointer hover:bg-slate-800 transition-colors select-none h-[38px]">
                    <input
                        type="checkbox"
                        checked={showUtc}
                        onChange={(e) => setShowUtc(e.target.checked)}
                        className="rounded border-slate-600 bg-slate-800 text-blue-500 focus:ring-offset-slate-900"
                    />
                    <span className="text-xs text-slate-300">Show UTC</span>
                </label>
            </div>

            <Card title="Crontab Generator">
                <div className="flex flex-col gap-8">

                    {/* Main Display */}
                    <div className="flex flex-col items-center gap-4 py-4">
                        <div className="text-3xl md:text-5xl font-mono font-bold text-center text-white tracking-wider">
                            {expression}
                        </div>
                        <div className="h-8">
                            {description && (
                                <span className="text-green-400 font-medium text-lg px-4 py-1 bg-green-900/20 rounded-full border border-green-900/30">
                                    {description}
                                </span>
                            )}
                            {error && (
                                <span className="text-red-400 font-medium text-lg px-4 py-1 bg-red-900/20 rounded-full border border-red-900/30">
                                    {error}
                                </span>
                            )}
                        </div>
                    </div>

                    {/* Editor Fields */}
                    <div className="grid grid-cols-5 gap-2 md:gap-4">
                        {[
                            { id: 'minute', label: 'Minute', range: '0-59' },
                            { id: 'hour', label: 'Hour', range: '0-23' },
                            { id: 'day', label: 'Day', range: '1-31' },
                            { id: 'month', label: 'Month', range: '1-12' },
                            { id: 'weekday', label: 'Week', range: '0-6' },
                        ].map((field) => (
                            <div key={field.id} className="flex flex-col gap-2">
                                <label className="text-center text-xs text-slate-400 font-medium uppercase tracking-wider">{field.label}</label>
                                <input
                                    type="text"
                                    value={fields[field.id]}
                                    onFocus={() => handleFocus(field.id)}
                                    onBlur={() => handleBlur(field.id)}
                                    onChange={(e) => handleFieldChange(field.id, e.target.value)}
                                    className="bg-slate-900 border border-slate-700 rounded-lg px-2 py-3 text-center text-lg font-mono text-slate-200 focus:border-blue-500 outline-none focus:ring-1 focus:ring-blue-500/50 transition-all"
                                    placeholder="*"
                                />
                                <span className="text-[10px] text-center text-slate-600">{field.range}</span>
                            </div>
                        ))}
                    </div>

                    {/* Actions */}
                    <div className="flex justify-center gap-4">
                        <Button
                            size="lg"
                            className="w-full md:w-auto px-8"
                            onClick={copyToClipboard}
                            icon={copied ? Check : Copy}
                        >
                            {copied ? 'Copied Crontab!' : 'Copy to Clipboard'}
                        </Button>
                    </div>

                    {/* Presets */}
                    <div className="border-t border-slate-800 pt-6">
                        <h3 className="text-sm font-semibold text-slate-400 mb-4 uppercase tracking-wider">Quick Presets</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                            {PRESETS.map((preset) => (
                                <button
                                    key={preset.label}
                                    onClick={() => setPreset(preset.value)}
                                    className="flex flex-col items-start gap-1 p-3 rounded-lg border border-slate-800 bg-slate-900/30 hover:bg-slate-800 hover:border-slate-700 transition-all text-left group"
                                >
                                    <span className="text-sm text-slate-300 group-hover:text-white font-medium">{preset.label}</span>
                                    <span className="text-xs text-slate-500 font-mono group-hover:text-blue-400 transition-colors">{preset.value}</span>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Help Text */}
                    <div className="bg-slate-950/50 p-4 rounded-lg border border-slate-800 text-xs text-slate-500 space-y-2">
                        <p>
                            <strong className="text-slate-400">Tips:</strong>
                            <ul className="list-disc list-inside mt-1 ml-1 space-y-1">
                                <li>Use <code className="text-blue-400">*</code> for "every" (e.g., every minute)</li>
                                <li>Use <code className="text-blue-400">*/n</code> for intervals (e.g., */5 for every 5 units)</li>
                                <li>Use <code className="text-blue-400">,</code> for lists (e.g., 1,3,5)</li>
                                <li>Use <code className="text-blue-400">-</code> for ranges (e.g., 1-5)</li>
                            </ul>
                        </p>
                    </div>

                </div>
            </Card>
        </div>
    );
};

export default CrontabGenerator;
