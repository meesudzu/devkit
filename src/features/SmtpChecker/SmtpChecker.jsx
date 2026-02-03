import React, { useState } from 'react';
import { ExternalLink, RefreshCw } from 'lucide-react';

const SmtpChecker = () => {
    const [key, setKey] = useState(0);

    const refreshIframe = () => {
        setKey(prev => prev + 1);
    };

    return (
        <div className="flex flex-col h-full w-full bg-slate-900 rounded-lg border border-slate-800 overflow-hidden shadow-sm">
            <div className="flex items-center justify-between px-4 py-3 border-b border-slate-800 bg-slate-900/50">
                <div className="flex items-center gap-2">
                    <h2 className="text-sm font-medium text-slate-200">SMTP Checker</h2>
                    <span className="text-xs text-slate-500 font-mono hidden sm:inline-block">smtp-checker.runany.dev</span>
                </div>
                <div className="flex items-center gap-2">
                    <button
                        onClick={refreshIframe}
                        className="p-1.5 text-slate-400 hover:text-slate-100 hover:bg-slate-800 rounded-md transition-colors"
                        title="Reload Frame"
                    >
                        <RefreshCw size={14} />
                    </button>
                    <a
                        href="https://smtp-checker.runany.dev"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 text-slate-400 hover:text-slate-100 hover:bg-slate-800 rounded-md transition-colors"
                        title="Open in new tab"
                    >
                        <ExternalLink size={14} />
                    </a>
                </div>
            </div>

            <div className="flex-1 w-full bg-white relative">
                <iframe
                    key={key}
                    src="https://smtp-checker.runany.dev"
                    className="absolute inset-0 w-full h-full border-0"
                    title="SMTP Checker"
                    allow="clipboard-write"
                    loading="lazy"
                />
            </div>
        </div>
    );
};

export default SmtpChecker;
