import React, { useState } from 'react';
import { Trash2 } from 'lucide-react';
import { Button, Card } from '../components/ui';

/**
 * Calculate text statistics
 */
const calculateStats = (text) => ({
    chars: text.length,
    charsNoSpaces: text.replace(/\s/g, '').length,
    words: text.trim() === '' ? 0 : text.trim().split(/\s+/).length,
    lines: text === '' ? 0 : text.split(/\n/).length,
    paragraphs: text === '' ? 0 : text.split(/\n\s*\n/).filter(p => p.trim() !== '').length,
    bytes: new TextEncoder().encode(text).length
});

/**
 * Stat display card
 */
const StatCard = ({ value, label, color }) => (
    <Card className="text-center py-2">
        <div className={`text-2xl font-bold ${color}`}>{value}</div>
        <div className="text-xs text-slate-500 uppercase">{label}</div>
    </Card>
);

/**
 * Text Analyzer Tool
 */
const TextAnalyzer = () => {
    const [text, setText] = useState('');
    const stats = calculateStats(text);

    return (
        <div className="flex flex-col gap-4 h-full">
            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-6 gap-4 shrink-0">
                <StatCard value={stats.chars} label="Characters" color="text-blue-400" />
                <StatCard value={stats.words} label="Words" color="text-green-400" />
                <StatCard value={stats.lines} label="Lines" color="text-purple-400" />
                <StatCard value={stats.charsNoSpaces} label="No Spaces" color="text-orange-400" />
                <StatCard value={stats.paragraphs} label="Paragraphs" color="text-yellow-400" />
                <StatCard value={stats.bytes} label="Bytes" color="text-cyan-400" />
            </div>

            {/* Input Area */}
            <div className="flex-1 min-h-0 flex flex-col gap-2">
                <div className="flex justify-between items-center shrink-0">
                    <label className="text-xs font-bold text-slate-500 uppercase">Input Text</label>
                    <Button
                        variant="ghost"
                        onClick={() => setText('')}
                        icon={Trash2}
                        className="text-xs py-1 h-auto"
                    >
                        Clear
                    </Button>
                </div>
                <textarea
                    className="flex-1 bg-slate-900 border border-slate-700 rounded-lg p-4 font-mono text-sm text-slate-300 focus:border-blue-500 outline-none resize-none"
                    placeholder="Type or paste your text here..."
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                />
            </div>
        </div>
    );
};

export default TextAnalyzer;
