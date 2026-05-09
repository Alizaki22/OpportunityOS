import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
    Sparkles,
    ArrowRight,
    GraduationCap,
    Briefcase,
    Code,
    Bot,
    Trophy,
    Globe,
    Zap,
    Shield,
    Rocket,
    ChevronRight,
    Star,
    Users,
    Target,
    TrendingUp,
} from 'lucide-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';

const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: { delay: i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] },
    }),
};

const features = [
    { icon: GraduationCap, title: 'Scholarships', desc: 'AI-matched funding from 50+ countries', color: 'hsl(258 90% 66%)' },
    { icon: Briefcase, title: 'Jobs & Internships', desc: 'Curated roles at top companies worldwide', color: 'hsl(142 71% 45%)' },
    { icon: Code, title: 'Hackathons', desc: 'Compete, build, and win with global teams', color: 'hsl(199 89% 48%)' },
    { icon: Bot, title: 'AI Copilot', desc: 'Resume builder, SOP writer, career coach', color: 'hsl(38 92% 50%)' },
    { icon: Trophy, title: 'Gamification', desc: 'Earn XP, badges, and climb leaderboards', color: 'hsl(340 82% 52%)' },
    { icon: Shield, title: 'Web3 Passport', desc: 'On-chain reputation, NFT achievements, Solana identity', color: 'hsl(270 70% 60%)' },
];

const stats = [
    { value: '50K+', label: 'Opportunities' },
    { value: '120+', label: 'Countries' },
    { value: '15K+', label: 'Students' },
    { value: '$2B+', label: 'In Funding' },
];

const testimonials = [
    { name: 'Priya S.', role: 'CS Student, IIT Delhi', text: 'OpportunityOS helped me land a Google internship and Chevening scholarship. The AI copilot is insane.', avatar: 'PS' },
    { name: 'James C.', role: 'Engineering, NUS', text: 'The gamification keeps me motivated. I apply to more opportunities and actually track my progress.', avatar: 'JC' },
    { name: 'Maria L.', role: 'Business, USP Brazil', text: 'Found a fully-funded fellowship I never would have discovered on my own. Life-changing platform.', avatar: 'ML' },
];

export default function Landing() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-background overflow-hidden">
            {/* Navigation */}
            <nav className="fixed top-0 left-0 right-0 z-50 glass-strong border-b border-border">
                <div className="max-w-7xl mx-auto flex items-center justify-between h-16 px-4 sm:px-6">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'var(--gradient-primary)' }}>
                            <Sparkles className="w-4 h-4 text-primary-foreground" />
                        </div>
                        <span className="font-display text-lg font-bold text-foreground">OpportunityOS</span>
                    </div>
                    <div className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
                        <a href="#features" className="hover:text-foreground transition-colors">Features</a>
                        <a href="#stats" className="hover:text-foreground transition-colors">Impact</a>
                        <a href="#testimonials" className="hover:text-foreground transition-colors">Stories</a>
                    </div>
                    <div className="flex items-center gap-3">
                        <WalletMultiButton
                            style={{
                                background: 'transparent',
                                border: '1px solid hsl(240 4% 16%)',
                                borderRadius: 'var(--radius)',
                                fontSize: '0.8125rem',
                                height: '36px',
                                padding: '0 14px',
                                fontFamily: 'Inter, sans-serif',
                                fontWeight: 500,
                                color: 'hsl(0 0% 90%)',
                            }}
                        />
                        <button
                            onClick={() => navigate('/onboarding')}
                            className="px-4 py-2 rounded-lg text-sm font-semibold text-primary-foreground transition-all hover:opacity-90 hidden sm:block"
                            style={{ background: 'var(--gradient-primary)' }}
                        >
                            Get Started
                        </button>
                    </div>
                </div>
            </nav>

            {/* Hero */}
            <section className="relative pt-32 pb-20 px-4 sm:px-6" style={{ background: 'var(--gradient-hero)' }}>
                {/* Glow orbs */}
                <div className="absolute top-20 left-1/4 w-[400px] h-[400px] rounded-full opacity-20 blur-[120px]" style={{ backgroundColor: 'hsl(258 90% 66%)' }} />
                <div className="absolute bottom-0 right-1/4 w-[300px] h-[300px] rounded-full opacity-15 blur-[100px]" style={{ backgroundColor: 'hsl(199 89% 48%)' }} />

                <div className="max-w-4xl mx-auto text-center relative z-10">
                    <motion.div
                        initial="hidden" animate="visible" custom={0} variants={fadeUp}
                        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/20 bg-primary/5 mb-8"
                    >
                        <Zap className="w-3.5 h-3.5 text-primary" />
                        <span className="text-xs font-medium text-primary">AI-Powered Career Operating System</span>
                    </motion.div>

                    <motion.h1
                        initial="hidden" animate="visible" custom={1} variants={fadeUp}
                        className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1] mb-6"
                    >
                        <span className="text-foreground">Unlock Global</span>
                        <br />
                        <span className="gradient-text">Opportunities</span>
                        <br />
                        <span className="text-foreground">with AI</span>
                    </motion.h1>

                    <motion.p
                        initial="hidden" animate="visible" custom={2} variants={fadeUp}
                        className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed"
                    >
                        Discover scholarships, jobs, hackathons, and more — personalized by AI, gamified for growth, powered by Web3. Your career copilot starts here.
                    </motion.p>

                    <motion.div
                        initial="hidden" animate="visible" custom={3} variants={fadeUp}
                        className="flex flex-col sm:flex-row items-center justify-center gap-4"
                    >
                        <button
                            onClick={() => navigate('/onboarding')}
                            className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl text-sm font-semibold text-primary-foreground transition-all hover:opacity-90 glow-primary"
                            style={{ background: 'var(--gradient-primary)' }}
                        >
                            Start Your Journey
                            <ArrowRight className="w-4 h-4" />
                        </button>
                        <button
                            onClick={() => navigate('/opportunities')}
                            className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl text-sm font-medium border border-border text-foreground hover:bg-secondary transition-colors"
                        >
                            Explore Opportunities
                            <ChevronRight className="w-4 h-4" />
                        </button>
                    </motion.div>

                    {/* Mini cards floating */}
                    <motion.div
                        initial="hidden" animate="visible" custom={4} variants={fadeUp}
                        className="mt-16 flex flex-wrap justify-center gap-3"
                    >
                        {['Scholarships', 'Jobs', 'Hackathons', 'Grants', 'Fellowships', 'Internships'].map(tag => (
                            <span key={tag} className="px-3 py-1.5 rounded-full text-xs font-medium bg-secondary/60 text-muted-foreground border border-border">
                                {tag}
                            </span>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Stats */}
            <section id="stats" className="py-16 px-4 sm:px-6 border-y border-border">
                <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
                    {stats.map((stat, i) => (
                        <motion.div
                            key={stat.label}
                            initial="hidden" whileInView="visible" viewport={{ once: true }} custom={i} variants={fadeUp}
                            className="text-center"
                        >
                            <p className="font-display text-3xl sm:text-4xl font-bold gradient-text">{stat.value}</p>
                            <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Features */}
            <section id="features" className="py-20 px-4 sm:px-6">
                <div className="max-w-6xl mx-auto">
                    <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0} variants={fadeUp} className="text-center mb-14">
                        <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-4">
                            Everything You Need to <span className="gradient-text">Level Up</span>
                        </h2>
                        <p className="text-muted-foreground max-w-xl mx-auto">One platform to discover, apply, track, and grow — powered by AI and Web3.</p>
                    </motion.div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                        {features.map((f, i) => (
                            <motion.div
                                key={f.title}
                                initial="hidden" whileInView="visible" viewport={{ once: true }} custom={i} variants={fadeUp}
                                className="group p-6 rounded-xl border border-border bg-card card-hover"
                            >
                                <div
                                    className="w-11 h-11 rounded-lg flex items-center justify-center mb-4"
                                    style={{ backgroundColor: f.color + '15', color: f.color }}
                                >
                                    <f.icon className="w-5 h-5" />
                                </div>
                                <h3 className="font-semibold text-foreground mb-2">{f.title}</h3>
                                <p className="text-sm text-muted-foreground">{f.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* How It Works */}
            <section className="py-20 px-4 sm:px-6 border-t border-border">
                <div className="max-w-5xl mx-auto">
                    <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0} variants={fadeUp} className="text-center mb-14">
                        <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-4">
                            How It <span className="gradient-text">Works</span>
                        </h2>
                    </motion.div>
                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            { step: '01', icon: Target, title: 'Tell Us About You', desc: 'Complete AI onboarding — skills, goals, interests. Takes 2 minutes.' },
                            { step: '02', icon: Bot, title: 'AI Matches You', desc: 'Our copilot curates opportunities, builds roadmaps, and writes your SOPs.' },
                            { step: '03', icon: TrendingUp, title: 'Level Up', desc: 'Apply, track progress, earn XP, climb leaderboards, mint achievement NFTs.' },
                        ].map((item, i) => (
                            <motion.div
                                key={item.step}
                                initial="hidden" whileInView="visible" viewport={{ once: true }} custom={i} variants={fadeUp}
                                className="relative p-6 rounded-xl border border-border bg-card text-center"
                            >
                                <span className="text-5xl font-display font-bold text-primary/10">{item.step}</span>
                                <div className="w-12 h-12 rounded-xl mx-auto flex items-center justify-center bg-primary/10 -mt-4 mb-4">
                                    <item.icon className="w-6 h-6 text-primary" />
                                </div>
                                <h3 className="font-semibold text-foreground mb-2">{item.title}</h3>
                                <p className="text-sm text-muted-foreground">{item.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <section id="testimonials" className="py-20 px-4 sm:px-6 border-t border-border">
                <div className="max-w-6xl mx-auto">
                    <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0} variants={fadeUp} className="text-center mb-14">
                        <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-4">
                            Loved by <span className="gradient-text">Students Worldwide</span>
                        </h2>
                    </motion.div>
                    <div className="grid md:grid-cols-3 gap-6">
                        {testimonials.map((t, i) => (
                            <motion.div
                                key={t.name}
                                initial="hidden" whileInView="visible" viewport={{ once: true }} custom={i} variants={fadeUp}
                                className="p-6 rounded-xl border border-border bg-card"
                            >
                                <div className="flex gap-1 mb-4">
                                    {[1, 2, 3, 4, 5].map(s => <Star key={s} className="w-4 h-4 fill-warning text-warning" />)}
                                </div>
                                <p className="text-sm text-secondary-foreground/80 mb-5 leading-relaxed">"{t.text}"</p>
                                <div className="flex items-center gap-3">
                                    <div className="w-9 h-9 rounded-full flex items-center justify-center bg-primary/20 text-primary text-xs font-semibold">
                                        {t.avatar}
                                    </div>
                                    <div>
                                        <p className="text-sm font-semibold text-foreground">{t.name}</p>
                                        <p className="text-xs text-muted-foreground">{t.role}</p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Web3 Passport Section */}
            <section className="py-20 px-4 sm:px-6 border-t border-border">
                <div className="max-w-5xl mx-auto">
                    <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0} variants={fadeUp} className="text-center mb-14">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-accent/20 bg-accent/5 mb-6">
                            <Shield className="w-3.5 h-3.5 text-accent" />
                            <span className="text-xs font-medium text-accent">Powered by Solana</span>
                        </div>
                        <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-4">
                            Your <span className="gradient-text">Web3 Student Passport</span>
                        </h2>
                        <p className="text-muted-foreground max-w-xl mx-auto">
                            Build a verifiable on-chain identity. Earn NFT achievements, prove your skills, and carry your reputation across chains.
                        </p>
                    </motion.div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {[
                            { icon: Shield, label: 'Reputation Score', value: 'On-chain', desc: 'Verifiable skill reputation' },
                            { icon: Trophy, label: 'NFT Achievements', value: 'Mint & Collect', desc: 'Proof-of-participation badges' },
                            { icon: GraduationCap, label: 'Credentials', value: 'Verified', desc: 'Education & skill proofs' },
                            { icon: Globe, label: 'Cross-Chain', value: 'Coming Soon', desc: 'Portable identity via LI.FI' },
                        ].map((item, i) => (
                            <motion.div
                                key={item.label}
                                initial="hidden" whileInView="visible" viewport={{ once: true }} custom={i}
                                variants={fadeUp}
                                className="p-5 rounded-xl border border-border bg-card card-hover text-center"
                            >
                                <div className="w-11 h-11 rounded-xl mx-auto flex items-center justify-center bg-primary/10 mb-3">
                                    <item.icon className="w-5 h-5 text-primary" />
                                </div>
                                <p className="text-xs font-semibold text-primary mb-1">{item.value}</p>
                                <h3 className="font-semibold text-foreground text-sm mb-1">{item.label}</h3>
                                <p className="text-xs text-muted-foreground">{item.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-20 px-4 sm:px-6">
                <motion.div
                    initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0} variants={fadeUp}
                    className="max-w-3xl mx-auto text-center p-10 sm:p-14 rounded-2xl gradient-border relative overflow-hidden"
                    style={{ background: 'var(--gradient-glow)' }}
                >
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[300px] h-[200px] rounded-full opacity-30 blur-[80px]" style={{ backgroundColor: 'hsl(258 90% 66%)' }} />
                    <div className="relative z-10">
                        <Rocket className="w-10 h-10 text-primary mx-auto mb-6" />
                        <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-4">
                            Ready to Launch Your Career?
                        </h2>
                        <p className="text-muted-foreground mb-8 max-w-md mx-auto">
                            Join thousands of students discovering opportunities they never knew existed.
                        </p>
                        <button
                            onClick={() => navigate('/onboarding')}
                            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl text-sm font-semibold text-primary-foreground glow-primary"
                            style={{ background: 'var(--gradient-primary)' }}
                        >
                            Get Started Free
                            <ArrowRight className="w-4 h-4" />
                        </button>
                    </div>
                </motion.div>
            </section>

            {/* Footer */}
            <footer className="py-10 px-4 sm:px-6 border-t border-border">
                <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-md flex items-center justify-center" style={{ background: 'var(--gradient-primary)' }}>
                            <Sparkles className="w-3 h-3 text-primary-foreground" />
                        </div>
                        <span className="font-display text-sm font-bold text-foreground">OpportunityOS</span>
                    </div>
                    <p className="text-xs text-muted-foreground">Built with AI, powered by Solana. For students, by students.</p>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <a href="#" className="hover:text-foreground transition-colors">Privacy</a>
                        <a href="#" className="hover:text-foreground transition-colors">Terms</a>
                        <a href="#" className="hover:text-foreground transition-colors">Twitter</a>
                    </div>
                </div>
            </footer>
        </div>
    );
}