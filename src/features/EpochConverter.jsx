import React, { useState, useEffect } from 'react';
import { Copy } from 'lucide-react';
import { Button, Card } from '../components/ui';

/**
 * Common timezones
 */
const TIMEZONES = [
    "UTC",
    "Asia/Ho_Chi_Minh",
    "Asia/Tokyo",
    "Asia/Singapore",
    "Europe/London",
    "Europe/Frankfurt",
    "America/New_York",
    "America/Los_Angeles",
    "Australia/Sydney"
];

/**
 * Epoch/Unix Timestamp Converter
 * Convert between timestamps and human-readable dates
 */
const EpochConverter = () => {
    const [ts, setTs] = useState(Math.floor(Date.now() / 1000));
    const [iso, setIso] = useState(new Date().toISOString());
    const [targetTz, setTargetTz] = useState(Intl.DateTimeFormat().resolvedOptions().timeZone);

    // Update current timestamp display every second
    useEffect(() => {
        const timer = setInterval(() => { }, 1000);
        return () => clearInterval(timer);
    }, []);

    /**
     * Handle timestamp change - auto-detect seconds vs milliseconds
     */
    const handleTsChange = (val) => {
        setTs(val);
        try {
            const multiplier = val.toString().length > 11 ? 1 : 1000;
            setIso(new Date(val * multiplier).toISOString());
        } catch {
            // Invalid date, ignore
        }
    };

    /**
     * Copy text to clipboard
     */
    const copyToClipboard = (text) => {
        navigator.clipboard?.writeText(text) || (() => {
            const el = document.createElement('textarea');
            el.value = text;
            document.body.appendChild(el);
            el.select();
            document.execCommand('copy');
            document.body.removeChild(el);
        })();
    };

    /**
     * Format date for specific timezone
     */
    const getFormattedDate = (timestamp, tz) => {
        try {
            const multiplier = timestamp.toString().length > 11 ? 1 : 1000;
            const date = new Date(timestamp * multiplier);
            return new Intl.DateTimeFormat('en-GB', {
                dateStyle: 'full',
                timeStyle: 'long',
                timeZone: tz
            }).format(date);
        } catch (e) {
            return "Invalid Date/Timezone";
        }
    };

    const localTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

    return (
        <div className="flex flex-col gap-6 max-w-3xl mx-auto mt-8 h-full overflow-y-auto pr-2">
            {/* Current Timestamp Display */}
            <div className="text-center mb-4 shrink-0">
                <div className="text-4xl font-mono text-blue-400 font-bold tracking-wider">
                    {Math.floor(Date.now() / 1000)}
                </div>
                <div className="text-sm text-slate-500 mt-1">Current Unix Timestamp</div>
            </div>

            <Card title="Converter">
                <div className="flex flex-col gap-6">
                    {/* Timestamp Input */}
                    <div className="flex flex-col gap-2">
                        <label className="text-sm text-slate-400">Timestamp (Seconds or Millis)</label>
                        <div className="flex gap-2">
                            <input
                                type="number"
                                className="flex-1 bg-slate-900 border border-slate-700 rounded px-3 py-2 text-slate-200 font-mono focus:border-blue-500 outline-none"
                                value={ts}
                                onChange={(e) => handleTsChange(e.target.value)}
                            />
                            <Button variant="secondary" onClick={() => handleTsChange(Math.floor(Date.now() / 1000))}>
                                Reset to Now
                            </Button>
                        </div>
                    </div>

                    {/* ISO Output */}
                    <div className="flex flex-col gap-2">
                        <label className="text-sm text-slate-400">Human Readable (ISO 8601)</label>
                        <div className="flex gap-2 group">
                            <input
                                readOnly
                                className="flex-1 bg-slate-800 border border-slate-700 rounded px-3 py-2 text-green-400 font-mono focus:outline-none cursor-text"
                                value={iso}
                            />
                            <Button variant="ghost" onClick={() => copyToClipboard(iso)} icon={Copy} />
                        </div>
                    </div>

                    {/* Timezone Display */}
                    <div className="bg-slate-900/50 p-4 rounded-lg border border-slate-700/50 flex flex-col gap-3">
                        <div className="flex justify-between items-center border-b border-slate-700 pb-2">
                            <span className="text-xs font-bold text-slate-500 uppercase">Target Timezone</span>
                            <select
                                value={targetTz}
                                onChange={(e) => setTargetTz(e.target.value)}
                                className="bg-slate-800 border border-slate-600 rounded text-xs px-2 py-1 text-slate-300 outline-none focus:border-blue-500"
                            >
                                <option value={localTimezone}>Local System ({localTimezone})</option>
                                {TIMEZONES.map(t => (
                                    <option key={t} value={t}>{t}</option>
                                ))}
                            </select>
                        </div>

                        <div className="font-mono text-sm space-y-2">
                            <div className="flex justify-between">
                                <span className="text-slate-500">Selected:</span>
                                <span className="text-blue-300 text-right">{getFormattedDate(ts, targetTz)}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-slate-500">UTC:</span>
                                <span className="text-orange-300 text-right">
                                    {new Date(ts * (ts.toString().length > 11 ? 1 : 1000)).toUTCString()}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </Card>
        </div>
    );
};

export default EpochConverter;
