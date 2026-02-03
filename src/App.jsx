import { useState } from 'react';
import {
  ArrowRightLeft,
  ShieldCheck,
  Clock,
  Type,
  AlignLeft,
  KeyRound,
  Hash,
  Lock
} from 'lucide-react';

// Layout components
import { Sidebar, Header } from './layouts';

// Feature components
import {
  DebeziumDiff,
  JwtDebugger,
  EpochConverter,
  StringTools,
  CharacterCount,
  PasswordGenerator,
  HashGenerator,
  BasicAuthGenerator
} from './features';

// UI components
import { Card } from './components/ui';

/**
 * Navigation configuration
 */
const NAV_ITEMS = [
  { id: 'debezium', label: 'Debezium Diff', icon: ArrowRightLeft },
  { id: 'jwt', label: 'JWT Debugger', icon: ShieldCheck },
  { id: 'epoch', label: 'Epoch Converter', icon: Clock },
  { id: 'string', label: 'Base64 / URL', icon: Type },
  { id: 'charcount', label: 'Word Counter', icon: AlignLeft },
  { id: 'password', label: 'Password Gen', icon: Lock },
  { id: 'hash', label: 'Hash Generator', icon: Hash },
  { id: 'basicauth', label: 'Basic Auth', icon: KeyRound },
];

/**
 * Feature component mapping
 */
const FEATURE_COMPONENTS = {
  debezium: DebeziumDiff,
  jwt: JwtDebugger,
  epoch: EpochConverter,
  string: StringTools,
  charcount: CharacterCount,
  password: PasswordGenerator,
  hash: HashGenerator,
  basicauth: BasicAuthGenerator,
};

/**
 * Main Application Component
 */
const App = () => {
  const [activeTab, setActiveTab] = useState('debezium');

  const activeNavItem = NAV_ITEMS.find(i => i.id === activeTab);
  const ActiveFeature = FEATURE_COMPONENTS[activeTab];

  return (
    <div className="flex h-screen w-full bg-slate-950 text-slate-200 font-sans selection:bg-blue-500/30">
      <Sidebar
        navItems={NAV_ITEMS}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />

      <div className="flex-1 flex flex-col overflow-hidden w-full">
        <Header title={activeNavItem?.label} />

        <main className="flex-1 overflow-hidden p-4 md:p-6 relative">
          <div className="h-full w-full max-w-6xl mx-auto">
            {ActiveFeature && <ActiveFeature />}
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;