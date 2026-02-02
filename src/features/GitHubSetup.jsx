/**
 * GitHub Integration/Setup Guide
 */
const GitHubSetup = () => (
    <div className="prose prose-invert max-w-none overflow-y-auto h-full pr-2">
        <h3>How to Push This Tool to GitHub</h3>
        <p className="text-slate-300">
            Follow these steps to deploy this project (DevOps style):
        </p>
        <div className="bg-slate-900 p-4 rounded-lg border border-slate-700 my-4 font-mono text-sm">
            <p className="text-slate-500"># 1. Clone repo (if not already)</p>
            <p className="text-green-400">git clone https://github.com/username/devops-toolbox.git</p>
            <p className="text-green-400">cd devops-toolbox</p>
            <br />
            <p className="text-slate-500"># 2. Update files</p>
            <p># Copy the project files to the repo</p>
            <br />
            <p className="text-green-400">git add .</p>
            <p className="text-green-400">git commit -m "Add DevOps toolkit"</p>
            <p className="text-green-400">git push origin main</p>
        </div>
    </div>
);

export default GitHubSetup;
