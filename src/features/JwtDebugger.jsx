import React, { useState, useEffect } from 'react';
import { AlertTriangle } from 'lucide-react';
import { Card } from '../components/ui';

/**
 * JWT Token Debugger
 * Decodes and displays JWT header and payload
 */
const JwtDebugger = () => {
    const [token, setToken] = useState('');
    const [header, setHeader] = useState({});
    const [payload, setPayload] = useState({});
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!token) {
            setHeader({});
            setPayload({});
            setError(null);
            return;
        }

        try {
            const parts = token.split('.');
            if (parts.length !== 3) {
                throw new Error("Invalid JWT format (must have 3 parts)");
            }

            const decode = (str) => JSON.parse(
                atob(str.replace(/-/g, '+').replace(/_/g, '/'))
            );

            setHeader(decode(parts[0]));
            setPayload(decode(parts[1]));
            setError(null);
        } catch (e) {
            setError("Invalid Token: " + e.message);
        }
    }, [token]);

    const isExpired = payload.exp ? (Date.now() >= payload.exp * 1000) : false;

    return (
        <div className="flex flex-col gap-6 h-full">
            <div className="flex flex-col gap-2 shrink-0">
                <label className="text-sm font-medium text-slate-400">JWT Token Input</label>
                <textarea
                    className="w-full h-24 bg-slate-900 border border-slate-700 rounded-lg p-3 font-mono text-sm text-blue-300 focus:outline-none focus:border-blue-500 resize-none"
                    placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
                    value={token}
                    onChange={(e) => setToken(e.target.value)}
                />
                {error && (
                    <div className="text-red-400 text-sm flex items-center gap-2">
                        <AlertTriangle size={14} /> {error}
                    </div>
                )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-1 min-h-0">
                <Card title="Header" className="h-full flex flex-col">
                    <pre className="text-xs text-green-400 font-mono overflow-auto flex-1">
                        {JSON.stringify(header, null, 2)}
                    </pre>
                </Card>

                <Card title="Payload" className="h-full flex flex-col relative">
                    {payload.exp && (
                        <div className={`absolute top-3 right-4 px-2 py-0.5 rounded text-xs font-bold uppercase ${isExpired ? 'bg-red-500/20 text-red-400' : 'bg-green-500/20 text-green-400'
                            }`}>
                            {isExpired ? 'Expired' : 'Valid'}
                        </div>
                    )}
                    <pre className="text-xs text-purple-400 font-mono overflow-auto flex-1">
                        {JSON.stringify(payload, null, 2)}
                    </pre>
                    {payload.iat && (
                        <div className="mt-2 text-xs text-slate-500 border-t border-slate-700 pt-2 shrink-0">
                            Issued At: {new Date(payload.iat * 1000).toLocaleString()}
                        </div>
                    )}
                    {payload.exp && (
                        <div className="text-xs text-slate-500 shrink-0">
                            Expires At: {new Date(payload.exp * 1000).toLocaleString()}
                        </div>
                    )}
                </Card>
            </div>
        </div>
    );
};

export default JwtDebugger;
