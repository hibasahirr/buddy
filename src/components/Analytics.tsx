import React from 'react';
import { motion } from 'framer-motion';
import { BarChart2, X, TrendingUp } from 'lucide-react';

interface AnalyticsProps {
    onClose: () => void;
    history: { date: string; amount: number }[];
}

const Analytics: React.FC<AnalyticsProps> = ({ onClose, history }) => {
    // Generate some dummy data if history is empty for demonstration
    const chartData = history.length > 0 ? history : Array.from({ length: 30 }, (_, i) => ({
        date: `${i + 1}`,
        amount: Math.floor(Math.random() * 14) + 1
    }));

    const maxAmount = Math.max(...chartData.map(d => d.amount));

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-white/60 backdrop-blur-md z-[200] flex items-center justify-center p-4"
        >
            <motion.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                className="glass-card w-full max-w-4xl p-8 relative overflow-hidden shadow-2xl border-primary/20"
            >
                <div className="absolute top-0 right-0 p-4">
                    <button onClick={onClose} className="!w-auto p-2 bg-primary/5 rounded-full hover:bg-primary/10 border border-primary/10 transition-colors">
                        <X className="text-primary" />
                    </button>
                </div>

                <header className="mb-10">
                    <h2 className="text-3xl font-bold flex items-center gap-3">
                        <BarChart2 className="text-primary" /> Monthly Vitality
                    </h2>
                    <p className="text-text-muted">Your hydration trends over the last 30 days</p>
                </header>

                <div className="grid gap-8">
                    <div className="h-64 flex items-end gap-1 px-2 border-b border-primary/10 pb-2">
                        {chartData.map((data, i) => (
                            <div key={i} className="flex-1 flex flex-col items-center group relative">
                                <motion.div
                                    initial={{ height: 0 }}
                                    animate={{ height: `${(data.amount / maxAmount) * 100}%` }}
                                    className={`w-full rounded-t-sm transition-all duration-300 ${data.amount >= 14 ? 'bg-primary shadow-[0_0_10px_rgba(14,165,233,0.4)]' : 'bg-primary/30'
                                        }`}
                                />
                                <div className="absolute -top-10 opacity-0 group-hover:opacity-100 transition-opacity bg-primary text-white px-2 py-1 rounded text-[10px] font-bold z-10 whitespace-nowrap shadow-lg">
                                    {data.amount} Cups
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="grid md:grid-cols-3 gap-4">
                        <div className="p-4 bg-primary/5 rounded-2xl border border-primary/10">
                            <p className="text-xs text-text-muted mb-1 flex items-center gap-2">
                                <TrendingUp size={14} className="text-primary" /> Monthly Avg
                            </p>
                            <p className="text-2xl font-bold">10.4 Cups</p>
                        </div>
                        <div className="p-4 bg-primary/5 rounded-2xl border border-primary/10">
                            <p className="text-xs text-text-muted mb-1">Peak Day</p>
                            <p className="text-2xl font-bold text-primary">14 Cups</p>
                        </div>
                        <div className="p-4 bg-primary/5 rounded-2xl border border-primary/10">
                            <p className="text-xs text-text-muted mb-1">Consistency</p>
                            <p className="text-2xl font-bold text-accent">92%</p>
                        </div>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
};

export default Analytics;
