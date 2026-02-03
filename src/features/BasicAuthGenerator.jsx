import { useState, useEffect } from 'react';
import { Copy, Check, KeyRound, Server } from 'lucide-react';
import bcrypt from 'bcryptjs';
import { Button, Card } from '../components/ui';

/**
 * Basic Auth Generator - Generate HTTP Basic Authentication headers
 * and Nginx/Apache htpasswd entries
 */
const BasicAuthGenerator = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    // HTTP Header State
    const [encoded, setEncoded] = useState('');
    const [header, setHeader] = useState('');

    // Nginx State
    const [htpasswd, setHtpasswd] = useState('');
    const [loading, setLoading] = useState(false);

    const [copied, setCopied] = useState({ encoded: false, header: false, htpasswd: false });

    // Auto-update Basic Auth Header (fast)
    useEffect(() => {
        if (username || password) {
            const credentials = `${username}:${password}`;
            const base64 = btoa(credentials);
            setEncoded(base64);
            setHeader(`Authorization: Basic ${base64}`);
        } else {
            setEncoded('');
            setHeader('');
        }
    }, [username, password]);

    // Generate bcrypt hash for Nginx (slow, manual trigger)
    const generateHtpasswd = async () => {
        if (!username || !password) return;
        setLoading(true);
        try {
            const salt = await bcrypt.genSalt(10);
            const hash = await bcrypt.hash(password, salt);
            setHtpasswd(`${username}:${hash}`);
        } catch (e) {
            setHtpasswd('Error generating hash');
        }
        setLoading(false);
    };

    const copyToClipboard = async (text, type) => {
        await navigator.clipboard.writeText(text);
        setCopied(prev => ({ ...prev, [type]: true }));
        setTimeout(() => setCopied(prev => ({ ...prev, [type]: false })), 2000);
    };

    return (
        <div className="flex flex-col gap-6 max-w-2xl mx-auto mt-8">
            <Card title="Basic Auth Generator">
                <div className="flex flex-col gap-6">
                    {/* Credentials Input */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex flex-col gap-2">
                            <label className="text-sm text-slate-400">Username</label>
                            <input
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-slate-200 focus:border-blue-500 outline-none"
                                placeholder="admin"
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="text-sm text-slate-400">Password</label>
                            <input
                                type="text"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-slate-200 focus:border-blue-500 outline-none"
                                placeholder="secret123"
                            />
                        </div>
                    </div>

                    {/* Preview */}
                    {(username || password) && (
                        <div className="bg-slate-900/50 p-4 rounded-lg border border-slate-700/50">
                            <div className="text-xs text-slate-500 mb-2">Credentials Preview</div>
                            <code className="text-sm text-purple-400 font-mono">{username}:{password}</code>
                        </div>
                    )}

                    <div className="w-full h-px bg-slate-800 my-2"></div>

                    {/* Base64 Encoded */}
                    <div className="flex flex-col gap-2">
                        <label className="text-sm text-slate-400 flex items-center gap-2">
                            <KeyRound size={14} />
                            HTTP Header (Base64)
                        </label>
                        <div className="flex gap-2">
                            <input
                                readOnly
                                value={header}
                                className="flex-1 bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 font-mono text-sm text-green-400 focus:outline-none"
                                placeholder="Authorization: Basic ..."
                            />
                            <Button
                                variant="secondary"
                                onClick={() => copyToClipboard(header, 'header')}
                                disabled={!header}
                                icon={copied.header ? Check : Copy}
                            />
                        </div>
                        <div className="text-xs text-slate-500 font-mono pl-1">
                            Base64: {encoded || '...'}
                        </div>
                    </div>

                    <div className="w-full h-px bg-slate-800 my-2"></div>

                    {/* Nginx / Apache htpasswd */}
                    <div className="flex flex-col gap-2">
                        <label className="text-sm text-slate-400 flex items-center gap-2">
                            <Server size={14} />
                            Nginx / Apache htpasswd (bcrypt)
                        </label>
                        <div className="flex gap-2">
                            <input
                                readOnly
                                value={htpasswd}
                                className="flex-1 bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 font-mono text-sm text-orange-400 focus:outline-none"
                                placeholder="username:$2y$10$..."
                            />
                            <Button
                                variant="secondary"
                                onClick={() => copyToClipboard(htpasswd, 'htpasswd')}
                                disabled={!htpasswd}
                                icon={copied.htpasswd ? Check : Copy}
                            />
                        </div>
                        <Button
                            onClick={generateHtpasswd}
                            disabled={!username || !password || loading}
                            className="w-full justify-center"
                        >
                            {loading ? 'Generating...' : 'Generate htpasswd Entry'}
                        </Button>
                        <div className="bg-slate-900/50 p-3 rounded border border-slate-700/50 mt-2">
                            <div className="text-xs text-slate-500 mb-1">Nginx Usage:</div>
                            <code className="text-xs text-blue-300 font-mono block mb-2">
                                echo "{htpasswd || 'user:pass'}" &gt; /etc/nginx/.htpasswd
                            </code>
                            <div className="text-xs text-slate-500 mb-1">Config:</div>
                            <code className="text-xs text-slate-400 font-mono">
                                auth_basic "Restricted";<br />
                                auth_basic_user_file /etc/nginx/.htpasswd;
                            </code>
                        </div>
                    </div>

                </div>
            </Card>
        </div>
    );
};

export default BasicAuthGenerator;
