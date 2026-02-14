import { useState, useEffect } from 'react';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import LevelDetail from './components/LevelDetail';
import Analytics from './components/Analytics';

interface Level {
  id: number;
  stagesCompleted: number;
  totalStages: number;
  unlocked: boolean;
}

interface UserData {
  username: string;
  stats: { date: string; amount: number }[];
}

function App() {
  const [user, setUser] = useState<UserData | null>(null);
  const [view, setView] = useState<'LOGIN' | 'DASHBOARD' | 'LEVEL_DETAIL' | 'ANALYTICS'>('LOGIN');
  const [selectedLevelId, setSelectedLevelId] = useState<number | null>(null);
  const [currentTime, setCurrentTime] = useState(new Date());

  const [levels, setLevels] = useState<Level[]>(() => {
    const saved = localStorage.getItem('sipbuddy_levels');
    const savedDate = localStorage.getItem('sipbuddy_last_active');
    const today = new Date().toDateString();

    // Reset if it's a new day
    if (saved && savedDate === today) {
      return JSON.parse(saved);
    }

    return Array.from({ length: 7 }, (_, i) => ({
      id: i + 1,
      stagesCompleted: 0,
      totalStages: 2,
      unlocked: i === 0,
    }));
  });

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    localStorage.setItem('sipbuddy_levels', JSON.stringify(levels));
    localStorage.setItem('sipbuddy_last_active', new Date().toDateString());
  }, [levels]);

  const handleLogin = (username: string) => {
    setUser({ username, stats: [] });
    setView('DASHBOARD');
  };

  const handleSelectLevel = (levelId: number) => {
    setSelectedLevelId(levelId);
    setView('LEVEL_DETAIL');
  };

  const handleCompleteStage = (levelId: number) => {
    const updatedLevels = [...levels];
    const levelIndex = updatedLevels.findIndex(l => l.id === levelId);

    if (levelIndex === -1) return;

    const level = { ...updatedLevels[levelIndex] };
    level.stagesCompleted += 1;

    // Unlock next level if this one is finished
    if (level.stagesCompleted >= level.totalStages) {
      if (levelIndex < updatedLevels.length - 1) {
        updatedLevels[levelIndex + 1].unlocked = true;
      }
    }

    updatedLevels[levelIndex] = level;
    setLevels(updatedLevels);
  };

  const isDayComplete = levels.every(l => l.stagesCompleted === l.totalStages);

  return (
    <div className="flex flex-col min-h-screen">
      <div className="fixed top-4 left-1/2 -translate-x-1/2 z-[100] bg-primary/5 backdrop-blur-md px-4 py-1 rounded-full border border-primary/10 text-[10px] uppercase tracking-widest font-bold text-primary/40">
        {currentTime.toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })} | {currentTime.toLocaleTimeString()}
      </div>

      {view === 'LOGIN' && (
        <Login onLogin={handleLogin} />
      )}

      {view === 'DASHBOARD' && user && (
        <Dashboard
          user={user.username}
          levels={levels}
          onSelectLevel={handleSelectLevel}
          onOpenAnalytics={() => setView('ANALYTICS')}
          isDayComplete={isDayComplete}
        />
      )}

      {view === 'LEVEL_DETAIL' && selectedLevelId !== null && (
        <LevelDetail
          levelId={selectedLevelId}
          initialStages={levels.find(l => l.id === selectedLevelId)?.stagesCompleted || 0}
          onBack={() => setView('DASHBOARD')}
          onCompleteStage={handleCompleteStage}
        />
      )}

      {view === 'ANALYTICS' && user && (
        <Analytics
          onClose={() => setView('DASHBOARD')}
          history={user.stats}
        />
      )}
    </div>
  );
}

export default App;
