import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, ArrowLeft, Droplets, Clock, AlertTriangle, CheckCircle2, Volume2 } from 'lucide-react';

interface LevelDetailProps {
    levelId: number;
    initialStages: number;
    onBack: () => void;
    onCompleteStage: (levelId: number) => void;
}

const LevelDetail: React.FC<LevelDetailProps> = ({ levelId, initialStages, onBack, onCompleteStage }) => {
    const [stages, setStages] = useState(initialStages);
    const [timeLeft, setTimeLeft] = useState<number | null>(null);
    const [isAlarming, setIsAlarming] = useState(false);
    const [shutterEffect, setShutterEffect] = useState(false);
    const [capturedImage, setCapturedImage] = useState<string | null>(null);
    const [scanStatus, setScanStatus] = useState<string | null>(null);
    const timerRef = useRef<number | null>(null);
    const audioCtxRef = useRef<AudioContext | null>(null);
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    // Audio Alarm Logic
    const startAlarmSound = () => {
        if (!audioCtxRef.current) {
            audioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
        }

        const ctx = audioCtxRef.current;
        const playTone = () => {
            if (ctx.state === 'suspended') ctx.resume();

            const osc = ctx.createOscillator();
            const gain = ctx.createGain();

            osc.type = 'sawtooth';
            osc.frequency.setValueAtTime(440, ctx.currentTime);
            osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.1);

            gain.gain.setValueAtTime(0.1, ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.4);

            osc.connect(gain);
            gain.connect(ctx.destination);

            osc.start();
            osc.stop(ctx.currentTime + 0.5);
        };

        const intervalId = window.setInterval(playTone, 1000);
        return () => window.clearInterval(intervalId);
    };

    useEffect(() => {
        let stopAudio: (() => void) | undefined;
        if (isAlarming) {
            stopAudio = startAlarmSound();
        }
        return () => {
            if (stopAudio) stopAudio();
        };
    }, [isAlarming]);

    useEffect(() => {
        // Immediate alarm on entry for Level 1
        // For subsequent levels, wait for 1 minute cooldown
        if (stages === 0) {
            if (levelId === 1) {
                setIsAlarming(true);
            } else {
                setTimeLeft(1800); // 30 minute cooldown
            }
        }
    }, [levelId]);

    useEffect(() => {
        if (timeLeft !== null && timeLeft > 0) {
            timerRef.current = window.setInterval(() => {
                setTimeLeft(prev => (prev !== null && prev > 0 ? prev - 1 : 0));
            }, 1000);
        } else if (timeLeft === 0) {
            setIsAlarming(true);
            if (timerRef.current) clearInterval(timerRef.current);
        }
        return () => {
            if (timerRef.current) clearInterval(timerRef.current);
        };
    }, [timeLeft]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setCapturedImage(reader.result as string);
                setShutterEffect(true);

                // AI Scanning Simulation
                const statuses = ["DETECTING HUMAN...", "ANALYZING ACTION...", "HYDRATION VERIFIED!"];
                statuses.forEach((status, index) => {
                    setTimeout(() => setScanStatus(status), 500 + index * 1000);
                });

                setTimeout(() => {
                    setShutterEffect(false);
                    setIsAlarming(false);

                    const newStage = stages + 1;
                    setStages(newStage);
                    onCompleteStage(levelId);

                    if (newStage === 1) {
                        // Start 30 minute countdown for second stage
                        setTimeLeft(1800);
                    } else {
                        // Completed all stages
                        setTimeLeft(null);
                    }

                    // Keep the verification UI visible for a moment longer to show the HEART
                    setTimeout(() => {
                        setCapturedImage(null);
                        setScanStatus(null);
                    }, 2500);
                }, 3500); // Wait for simulation to finish
            };
            reader.readAsDataURL(file);
        }
    };

    const startVerification = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    return (
        <div className="flex-1 p-6 flex flex-col items-center relative overflow-hidden">
            <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden"
                accept="image/*"
                capture="environment"
            />

            <AnimatePresence>
                {shutterEffect && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-white z-[100]"
                    />
                )}
            </AnimatePresence>

            <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="w-full max-w-2xl"
            >
                <header className="flex items-center justify-between mb-10">
                    <button onClick={onBack} className="!w-auto p-2 bg-primary/5 rounded-full hover:bg-primary/10 border border-primary/10 transition-colors">
                        <ArrowLeft className="text-primary" />
                    </button>
                    <div className="text-center">
                        <h2 className="text-3xl font-bold">LEVEL {levelId}</h2>
                        <p className="text-primary text-sm font-bold tracking-widest uppercase mt-1">Day 1 Mission</p>
                    </div>
                    <div className="w-10" />
                </header>

                <div className="grid gap-8">
                    <div className="glass-card p-10 flex flex-col items-center relative overflow-hidden">
                        {isAlarming && (
                            <motion.div
                                animate={{ opacity: [1, 0.5, 1], backgroundColor: ['rgba(244,63,94,0.1)', 'rgba(244,63,94,0.3)', 'rgba(244,63,94,0.1)'] }}
                                transition={{ duration: 1, repeat: Infinity }}
                                className="absolute inset-0 z-0"
                            />
                        )}

                        <div className="relative z-10 flex flex-col items-center w-full">
                            <div className="flex gap-4 mb-8">
                                {[1, 2].map(s => (
                                    <motion.div
                                        key={s}
                                        animate={stages >= s ? { scale: [1, 1.2, 1] } : {}}
                                        className={`w-16 h-16 rounded-full flex items-center justify-center border-2 transition-all duration-500 ${stages >= s
                                            ? 'bg-primary border-primary shadow-[0_0_20px_rgba(14,165,233,0.4)]'
                                            : 'bg-primary/5 border-primary/10'
                                            }`}
                                    >
                                        <Droplets className={stages >= s ? 'text-bg-deep' : 'text-text-muted'} />
                                    </motion.div>
                                ))}
                            </div>

                            {capturedImage ? (
                                <motion.div
                                    initial={{ scale: 0.8, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    className="flex flex-col items-center w-full"
                                >
                                    <div className="w-64 h-64 rounded-2xl overflow-hidden border-4 border-primary shadow-2xl mb-8 relative">
                                        <img src={capturedImage} alt="Verification" className="w-full h-full object-cover" />

                                        {/* AI Scanning Overlay */}
                                        <motion.div
                                            initial={{ top: "-100%" }}
                                            animate={{ top: "100%" }}
                                            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                                            className="absolute left-0 w-full h-1 bg-primary/80 shadow-[0_0_15px_#0ea5e9] z-20"
                                        />

                                        {/* Growing Heartcentered on image */}
                                        <AnimatePresence>
                                            {scanStatus === "HYDRATION VERIFIED!" && (
                                                <motion.div
                                                    initial={{ scale: 0, opacity: 0 }}
                                                    animate={{ scale: 1.2, opacity: 1 }}
                                                    transition={{ type: 'spring', damping: 10 }}
                                                    className="absolute inset-0 flex items-center justify-center text-8xl z-30 pointer-events-none"
                                                    style={{
                                                        // Scaling from 1x at Level 1 to 4.6x at Level 7
                                                        scale: 1 + (levelId - 1) * 0.6
                                                    }}
                                                >
                                                    ❤️
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                    <div className="bg-white/80 px-6 py-2 rounded-full border border-primary/20 backdrop-blur-md shadow-sm">
                                        <p className="text-primary font-bold tracking-[0.2em] text-xs uppercase animate-pulse">
                                            {scanStatus || "INITIALIZING SCAN..."}
                                        </p>
                                    </div>
                                </motion.div>
                            ) : (stages === 0 || isAlarming) ? (
                                <div className="text-center">
                                    <motion.div
                                        animate={{ scale: [1, 1.1, 1] }}
                                        transition={{ duration: 0.5, repeat: Infinity }}
                                    >
                                        <AlertTriangle className="text-error w-16 h-16 mx-auto mb-4" />
                                    </motion.div>
                                    <h3 className="text-2xl font-bold text-error mb-2 tracking-tighter">ALARM ACTIVE!</h3>
                                    <p className="text-text-muted mb-8 max-w-[280px] mx-auto text-sm">
                                        {stages === 0
                                            ? "Welcome! To begin, take a photo or upload an image of you drinking water."
                                            : "Time for your second cup! Upload a photo to stop the alarm."}
                                    </p>
                                    <button
                                        onClick={startVerification}
                                        className="px-10 py-5 bg-error text-white font-bold rounded-2xl shadow-[0_10px_30px_rgba(244,63,94,0.4)] hover:scale-105 active:scale-95 transition-all flex items-center gap-3 mx-auto"
                                    >
                                        <Camera size={24} /> STOP ALARM & UPLOAD
                                    </button>
                                </div>
                            ) : stages === 1 ? (
                                <div className="text-center">
                                    <div className="bg-primary/10 p-8 rounded-3xl border border-primary/20 mb-6">
                                        <div className="flex items-center justify-center gap-3 text-4xl font-bold text-primary mb-2">
                                            <Clock className="w-8 h-8" />
                                            {formatTime(timeLeft || 0)}
                                        </div>
                                        <p className="text-sm text-text-muted font-medium">COOLDOWN UNTIL NEXT STAGE</p>
                                    </div>
                                    <p className="text-xs text-text-muted max-w-[240px] mx-auto italic">
                                        "Drinking at intervals ensures your body absorbs the water effectively."
                                    </p>
                                </div>
                            ) : (
                                <div className="text-center">
                                    <motion.div
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        transition={{ type: 'spring', damping: 12 }}
                                    >
                                        <CheckCircle2 className="text-primary w-20 h-20 mx-auto mb-4" />
                                    </motion.div>
                                    <h3 className="text-3xl font-bold mb-2 tracking-tight">MISSION ACCOMPLISHED</h3>
                                    <p className="text-text-muted mb-8">You've successfully completed Level {levelId}!</p>
                                    <button
                                        onClick={onBack}
                                        className="!w-auto px-12 py-4 border-2 border-primary text-primary font-bold rounded-2xl bg-transparent hover:bg-primary/5 transition-colors"
                                    >
                                        BACK TO DASHBOARD
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>

                    {!isAlarming && stages === 1 && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="glass-card p-6 flex items-center gap-4 bg-primary/5 border-primary/20"
                        >
                            <div className="p-3 bg-primary/20 rounded-xl">
                                <Volume2 className="text-primary" />
                            </div>
                            <p className="text-sm text-text-muted leading-relaxed">
                                <b>Sounding System Active:</b> A rhythmic alarm will play automatically when it's time for Stage 2.
                            </p>
                        </motion.div>
                    )}
                </div>
            </motion.div>
        </div>
    );
};

export default LevelDetail;
