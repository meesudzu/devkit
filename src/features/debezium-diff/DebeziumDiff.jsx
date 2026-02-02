import React, { useState, useEffect } from 'react';
import { FileJson, Trash2, AlertTriangle } from 'lucide-react';
import { Button, Card } from '../../components/ui';
import DiffTable from './DiffTable';
import PayloadModal from './PayloadModal';

/**
 * Debezium/JSON Diff Tool
 * Compare before/after states from CDC events
 */
const DebeziumDiff = () => {
    const [leftInput, setLeftInput] = useState('');
    const [rightInput, setRightInput] = useState('');
    const [diffResult, setDiffResult] = useState(null);
    const [error, setError] = useState(null);
    const [showDiffOnly, setShowDiffOnly] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    /**
     * Compare two JSON objects and return diff array
     */
    const compareJSON = () => {
        try {
            if (!leftInput || !rightInput) {
                setDiffResult(null);
                return;
            }

            const obj1 = JSON.parse(leftInput);
            const obj2 = JSON.parse(rightInput);
            const allKeys = new Set([...Object.keys(obj1), ...Object.keys(obj2)]);
            const diffs = [];

            allKeys.forEach(key => {
                const val1 = obj1[key];
                const val2 = obj2[key];
                const exists1 = key in obj1;
                const exists2 = key in obj2;

                if (exists1 && !exists2) {
                    diffs.push({ key, type: 'removed', val: val1 });
                } else if (!exists1 && exists2) {
                    diffs.push({ key, type: 'added', val: val2 });
                } else if (JSON.stringify(val1) !== JSON.stringify(val2)) {
                    diffs.push({ key, type: 'changed', oldVal: val1, newVal: val2 });
                } else {
                    diffs.push({ key, type: 'same', val: val1 });
                }
            });

            // Sort: changed > added > removed > same
            const sortOrder = { changed: 0, added: 1, removed: 2, same: 3 };
            diffs.sort((a, b) => sortOrder[a.type] - sortOrder[b.type]);

            setDiffResult(diffs);
            setError(null);
        } catch (err) {
            setError("JSON Error: " + err.message);
            setDiffResult(null);
        }
    };

    useEffect(() => {
        if (leftInput && rightInput) compareJSON();
    }, [leftInput, rightInput]);

    const handlePayloadExtract = (left, right) => {
        setLeftInput(JSON.stringify(left, null, 2));
        setRightInput(JSON.stringify(right, null, 2));
        setError(null);
    };

    const handleClear = () => {
        setLeftInput('');
        setRightInput('');
        setDiffResult(null);
        setError(null);
    };

    const displayDiffs = diffResult
        ? (showDiffOnly ? diffResult.filter(d => d.type !== 'same') : diffResult)
        : null;

    return (
        <div className="h-full flex flex-col gap-4">
            <PayloadModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSubmit={handlePayloadExtract}
            />

            {/* Toolbar */}
            <div className="flex flex-wrap items-center gap-3 bg-slate-800 p-3 rounded-lg border border-slate-700 shrink-0">
                <Button variant="secondary" onClick={() => setIsModalOpen(true)} icon={FileJson}>
                    Input Payload
                </Button>

                <div className="h-6 w-px bg-slate-700 mx-2" />

                <label className="flex items-center gap-2 text-sm text-slate-300 cursor-pointer select-none bg-slate-700/50 px-3 py-1.5 rounded hover:bg-slate-700 border border-slate-600">
                    <input
                        type="checkbox"
                        checked={showDiffOnly}
                        onChange={(e) => setShowDiffOnly(e.target.checked)}
                        className="w-4 h-4 rounded border-slate-500 text-blue-600 focus:ring-blue-500"
                    />
                    Show Changes Only
                </label>

                <div className="flex-1" />
                <Button variant="ghost" onClick={handleClear} icon={Trash2}>Clear</Button>
            </div>

            {error && (
                <div className="text-red-400 text-sm px-2 flex items-center gap-2 shrink-0">
                    <AlertTriangle size={14} /> {error}
                </div>
            )}

            {/* Input Areas */}
            <div className={`grid grid-cols-1 md:grid-cols-2 gap-4 flex-1 min-h-0 ${displayDiffs ? 'max-h-[40%]' : ''} transition-all duration-300`}>
                <textarea
                    className="bg-slate-900 border border-slate-700 rounded-lg p-3 font-mono text-sm text-slate-300 resize-none focus:border-blue-500 outline-none"
                    placeholder="Before JSON..."
                    value={leftInput}
                    onChange={(e) => setLeftInput(e.target.value)}
                />
                <textarea
                    className="bg-slate-900 border border-slate-700 rounded-lg p-3 font-mono text-sm text-slate-300 resize-none focus:border-blue-500 outline-none"
                    placeholder="After JSON..."
                    value={rightInput}
                    onChange={(e) => setRightInput(e.target.value)}
                />
            </div>

            {/* Result Area */}
            {displayDiffs && (
                <Card title={`Comparison Result (${displayDiffs.length} fields)`} className="flex-1 min-h-0 bg-slate-900">
                    <div className="overflow-auto flex-1 font-mono text-sm scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-slate-900/50">
                        <DiffTable diffs={displayDiffs} />
                    </div>
                </Card>
            )}
        </div>
    );
};

export default DebeziumDiff;
