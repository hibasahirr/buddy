import React from 'react';
import { motion } from 'framer-motion';
import { Droplets, Clock, Lock, CheckCircle2, Trophy, ArrowRight, BarChart2 } from 'lucide-react';

interface DashboardProps {
    user: string;
    onSelectLevel: (levelId: number, currentStages: number) => void;
    onOpenAnalytics: () => void;
    levels: Level[];
    isDayComplete: boolean;
}

interface Level {
    id: number;
    stagesCompleted: number;
    totalStages: number;
    unlocked: boolean;
}

const Dashboard: React.FC<DashboardProps> = ({ user, onSelectLevel, onOpenAnalytics, levels, isDayComplete }) => {
    const nextReminder = 30; // 30 minutes for UI consistency

    const totalProgress = (levels.reduce((acc, l) => acc + l.stagesCompleted, 0) / (7 * 2)) * 100;

    return (
        <div className="flex-1 p-6 flex flex-col items-center">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full max-w-4xl"
            >
                <header className="flex justify-between items-end mb-8">
                    <div>
                        <h2 className="text-3xl font-bold flex items-center gap-2">
                            SipBuddy, <span className="text-gradient font-black">{user}</span>
                        </h2>
                        <p className="text-text-muted">Stay fueled, stay sharp!</p>
                    </div>
                    <div className="text-right">
                        <p className="text-sm text-text-muted mb-1 flex items-center justify-end gap-2">
                            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                            Active Mission
                        </p>
                        <div className="flex items-center gap-3">
                            <div className="w-32 bg-primary/10 h-2 rounded-full overflow-hidden">
                                <motion.div
                                    animate={{ width: `${totalProgress}%` }}
                                    className="h-full bg-primary"
                                />
                            </div>
                            <span className="font-bold text-primary">{Math.round(totalProgress)}%</span>
                        </div>
                    </div>
                </header>

                <div className="grid lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2 space-y-6">
                        {isDayComplete && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="glass-card p-8 bg-gradient-to-r from-primary/5 via-accent/5 to-transparent border-primary/20 relative overflow-hidden group"
                            >
                                <motion.div
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                                    className="absolute -right-20 -top-20 text-[200px] opacity-[0.03] pointer-events-none"
                                >
                                    ❄️
                                </motion.div>
                                <div className="absolute -right-4 -top-4 text-7xl opacity-10 rotate-12 group-hover:rotate-45 transition-transform duration-500">🏆</div>
                                <h3 className="text-2xl font-black mb-2 flex items-center gap-2">
                                    MISSION COMPLETED!
                                </h3>
                                <p className="text-sm text-text-muted max-w-md mb-6 leading-relaxed">
                                    Incredible job! You've reached your hydration goal for today. Your focus and energy levels thank you for being a true <b>SipBuddy</b>! 🌊
                                </p>
                                <div className="flex gap-4">
                                    <button className="!w-auto px-6 py-2 bg-primary text-white font-bold text-xs shadow-lg shadow-primary/20">
                                        REST UNTIL TOMORROW
                                    </button>
                                </div>
                            </motion.div>
                        )}

                        <div className="glass-card p-6 flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="p-3 bg-primary/10 rounded-xl">
                                    <Clock className="text-primary" />
                                </div>
                                <div>
                                    <p className="text-sm text-text-muted">Next Drink In</p>
                                    <p className="text-2xl font-bold">{nextReminder} mins</p>
                                </div>
                            </div>
                            <button
                                onClick={() => {
                                    const currentLevel = levels.find(l => l.unlocked && l.stagesCompleted < l.totalStages);
                                    if (currentLevel) onSelectLevel(currentLevel.id, currentLevel.stagesCompleted);
                                }}
                                className="!w-auto px-8 py-3 flex items-center gap-2 group shadow-xl shadow-primary/20"
                                disabled={levels.every(l => l.stagesCompleted === l.totalStages)}
                            >
                                <Droplets size={20} className="group-hover:animate-bounce" />
                                Start Current Mission
                            </button>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {levels.map((level) => (
                                <motion.div
                                    key={level.id}
                                    whileHover={level.unlocked ? { scale: 1.05 } : {}}
                                    onClick={() => level.unlocked && onSelectLevel(level.id, level.stagesCompleted)}
                                    className={`glass-card p-4 flex flex-col items-center relative overflow-hidden cursor-pointer transition-all ${level.unlocked ? 'border-primary/20 hover:border-primary shadow-sm hover:shadow-md' : 'border-transparent opacity-40'
                                        }`}
                                >
                                    {!level.unlocked && (
                                        <div className="absolute inset-0 bg-white/40 backdrop-blur-[1px] flex items-center justify-center z-10">
                                            <Lock size={20} className="text-text-muted opacity-50" />
                                        </div>
                                    )}

                                    <span className={`text-[10px] font-black mb-2 tracking-widest ${level.unlocked ? 'text-primary' : 'text-text-muted'}`}>
                                        LEVEL {level.id}
                                    </span>

                                    <div className="flex gap-2 mb-3">
                                        {[1, 2].map(stage => (
                                            <div
                                                key={stage}
                                                className={`w-2.5 h-2.5 rounded-full transition-all duration-500 ${level.stagesCompleted >= stage
                                                    ? 'bg-primary shadow-[0_0_10px_rgba(14,165,233,0.4)]'
                                                    : 'bg-primary/5 border border-primary/20'
                                                    }`}
                                            />
                                        ))}
                                    </div>

                                    {level.stagesCompleted === level.totalStages ? (
                                        <CheckCircle2 size={24} className="text-primary" />
                                    ) : (
                                        <Droplets
                                            size={24}
                                            className={level.unlocked ? 'text-accent' : 'text-text-muted/30'}
                                        />
                                    )}
                                </motion.div>
                            ))}
                            <div className="glass-card p-4 flex flex-col items-center justify-center border-dashed border-primary/20 bg-primary/5">
                                <Trophy size={24} className="text-primary/20" />
                                <span className="text-[10px] font-bold text-primary/30 mt-2">GOAL</span>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div className="glass-card p-6">
                            <h3 className="font-bold flex items-center gap-2 mb-4">
                                <CheckCircle2 size={18} className="text-primary" />
                                Shift Stats
                            </h3>
                            <div className="space-y-4">
                                <div className="flex justify-between items-center text-sm">
                                    <span className="text-text-muted">Last Intake</span>
                                    <span className="font-medium">Just Now</span>
                                </div>
                                <div className="flex justify-between items-center text-sm">
                                    <span className="text-text-muted">Current Level</span>
                                    <span className="font-medium text-primary">
                                        {levels.filter(l => l.unlocked).length}
                                    </span>
                                </div>
                                <div className="flex justify-between items-center text-sm">
                                    <span className="text-text-muted">Total Cups</span>
                                    <span className="font-medium text-accent">
                                        {levels.reduce((acc, l) => acc + l.stagesCompleted, 0)}
                                    </span>
                                </div>
                                <button
                                    onClick={onOpenAnalytics}
                                    className="w-full mt-4 py-3 bg-primary/5 border border-primary/10 rounded-xl flex items-center justify-center gap-2 text-[10px] font-black tracking-widest hover:bg-primary/10 transition-all text-primary"
                                >
                                    <BarChart2 size={14} /> VIEW MONTHLY ANALYTICS
                                </button>
                            </div>
                        </div>

                        <motion.div
                            whileHover={{ scale: 1.02 }}
                            className="glass-card p-6 bg-gradient-to-br from-primary/10 to-transparent border-primary/20"
                        >
                            <p className="text-sm font-bold text-primary mb-2 flex items-center gap-2">
                                PRO TIP <ArrowRight size={14} />
                            </p>
                            <p className="text-xs text-text-muted leading-relaxed">
                                Drinking 2 cups per hour keeps your brain sharp and prevents fatigue during long 9-hour shifts.
                            </p>
                        </motion.div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default Dashboard;
