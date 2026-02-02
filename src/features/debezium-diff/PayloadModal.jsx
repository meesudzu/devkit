import { AlertTriangle } from 'lucide-react';
import { Button, Modal } from '../../components/ui';

/**
 * Modal for inputting Debezium/Kafka payload
 * @param {Object} props
 * @param {boolean} props.isOpen - Whether modal is visible
 * @param {Function} props.onClose - Close handler
 * @param {Function} props.onSubmit - Submit handler with extracted before/after
 */
const PayloadModal = ({ isOpen, onClose, onSubmit }) => {
    const [payloadInput, setPayloadInput] = React.useState('');
    const [error, setError] = React.useState(null);

    /**
     * Extract before/after from various Debezium payload formats
     */
    const smartExtract = (inputStr) => {
        try {
            const parsed = JSON.parse(inputStr);

            // Case 1: Root level before/after
            if (parsed.before && parsed.after) {
                return { left: parsed.before, right: parsed.after, found: true };
            }
            // Case 2: Create event (no before)
            if (!parsed.before && parsed.after) {
                return { left: {}, right: parsed.after, found: true };
            }
            // Case 3: Legacy Debezium Envelope
            if (parsed.payload) {
                if (parsed.payload.before && parsed.payload.after) {
                    return { left: parsed.payload.before, right: parsed.payload.after, found: true };
                }
                if (parsed.payload.after) {
                    return { left: {}, right: parsed.payload.after, found: true };
                }
            }

            return { found: false, data: parsed };
        } catch (e) {
            return { found: false, error: e };
        }
    };

    const handleSubmit = () => {
        if (!payloadInput.trim()) {
            setError("Please enter JSON payload.");
            return;
        }

        const extraction = smartExtract(payloadInput);
        if (extraction.found) {
            onSubmit(extraction.left, extraction.right);
            setError(null);
            setPayloadInput('');
            onClose();
        } else {
            setError(extraction.error
                ? "Invalid JSON format."
                : "Could not find before/after structure in payload."
            );
        }
    };

    const handleClose = () => {
        setError(null);
        setPayloadInput('');
        onClose();
    };

    return (
        <Modal isOpen={isOpen} onClose={handleClose} title="Input Debezium/Kafka Payload">
            <div className="flex flex-col gap-4 h-[500px]">
                <div className="text-sm text-slate-400">
                    Paste full JSON payload (root level or nested in <code>payload</code>).
                    Tool will auto-extract <code>before</code> and <code>after</code>.
                </div>

                {error && (
                    <div className="bg-red-900/30 border border-red-500/50 text-red-200 px-4 py-2 rounded-md flex items-center gap-2 text-sm">
                        <AlertTriangle size={14} /> {error}
                    </div>
                )}

                <textarea
                    className="flex-1 bg-slate-950 border border-slate-700 rounded-lg p-3 font-mono text-sm text-slate-300 focus:border-blue-500 outline-none resize-none"
                    placeholder='Example: { "before": {...}, "after": {...}, "op": "u" }'
                    value={payloadInput}
                    onChange={(e) => setPayloadInput(e.target.value)}
                    autoFocus
                />

                <div className="flex justify-end gap-3 pt-2">
                    <Button variant="ghost" onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleSubmit}>Extract & Compare</Button>
                </div>
            </div>
        </Modal>
    );
};

// Need React for useState
import React from 'react';

export default PayloadModal;
