import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import {
  ArrowRightLeft,
  ShieldCheck,
  Clock,
  Type,
  AlignLeft,
  KeyRound,
  Hash,
  Lock,
  CalendarClock,
  Mail,
  FileJson,
  Code,
  Braces
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
  BasicAuthGenerator,
  CrontabGenerator,
  SmtpChecker,
  JsonToEnv,
  JsonBeautifier,
  CodeTools
} from './features';

/**
 * Navigation configuration
 */
const MENU_GROUPS = [
  {
    label: 'Development',
    items: [
      { id: 'debezium', label: 'Debezium Diff', icon: ArrowRightLeft },
      { id: 'json2env', label: 'JSON to .env', icon: FileJson },
      { id: 'smtp', label: 'SMTP Checker', icon: Mail },
    ]
  },
  {
    label: 'Formatting',
    items: [
      { id: 'jsonbeautifier', label: 'JSON Beautifier', icon: Braces },
      { id: 'codetools', label: 'Code Tools', icon: Code },
    ]
  },
  {
    label: 'Security',
    items: [
      { id: 'jwt', label: 'JWT Debugger', icon: ShieldCheck },
      { id: 'password', label: 'Password Gen', icon: Lock },
      { id: 'hash', label: 'Hash Generator', icon: Hash },
      { id: 'basicauth', label: 'Basic Auth', icon: KeyRound },
    ]
  },
  {
    label: 'Utilities',
    items: [
      { id: 'epoch', label: 'Epoch Converter', icon: Clock },
      { id: 'string', label: 'Base64 / URL', icon: Type },
      { id: 'charcount', label: 'Word Counter', icon: AlignLeft },
      { id: 'crontab', label: 'Crontab Gen', icon: CalendarClock },
    ]
  }
];

/**
 * Flattened navigation items for routes
 */
const NAV_ITEMS = MENU_GROUPS.flatMap(group => group.items);

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
  crontab: CrontabGenerator,
  smtp: SmtpChecker,
  json2env: JsonToEnv,
  jsonbeautifier: JsonBeautifier,
  codetools: CodeTools,
};

/**
 * Main Application Component
 */
const App = () => {
  const location = useLocation();
  // Extract feature ID from path (e.g., "/crontab" -> "crontab")
  const currentId = location.pathname.substring(1) || 'debezium';
  const activeNavItem = NAV_ITEMS.find(i => i.id === currentId) || NAV_ITEMS[0];

  return (
    <div className="flex h-screen w-full bg-slate-950 text-slate-200 font-sans selection:bg-blue-500/30">
      <Sidebar menuGroups={MENU_GROUPS} />

      <div className="flex-1 flex flex-col overflow-hidden w-full">
        <Header title={activeNavItem?.label} />

        <main className="flex-1 overflow-y-auto p-4 md:p-6 relative">
          <div className="h-full w-full max-w-6xl mx-auto">
            <Routes>
              <Route path="/" element={<Navigate to="/debezium" replace />} />

              {NAV_ITEMS.map(item => {
                const Component = FEATURE_COMPONENTS[item.id];
                return (
                  <Route
                    key={item.id}
                    path={`/${item.id}`}
                    element={<Component />}
                  />
                );
              })}

              {/* Fallback for unknown routes */}
              <Route path="*" element={<Navigate to="/debezium" replace />} />
            </Routes>
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;