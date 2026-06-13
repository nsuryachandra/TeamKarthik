import { motion } from "motion/react";
import {
  ArrowRight,
  Sparkles,
  Award,
  BookOpen,
  Calendar,
  Bell,
  FileText,
  Users,
  Shield,
  HelpCircle
} from "lucide-react";
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  show: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      type: "spring", 
      stiffness: 100, 
      damping: 15 
    } 
  }
};

export default function Home({
  activities = [],
  updates = [],
  config,
  reports = [],
  programs = [],
  onNavigatePage
}) {
  const highlights = [
    {
      title: "Our Grassroots Creed",
      desc: "Learn about the TRS Student Wing's core values, coordinator structure, and student-focused goals.",
      page: "about",
      icon: Users,
      badge: "Vision",
      color: "bg-blue-50 text-blue-600 border-blue-100"
    },
    {
      title: "Campaigns & Programs",
      desc: "Explore active student chapters, software courses, and career programs run by our organizers.",
      page: "programs",
      icon: BookOpen,
      badge: "Programs",
      color: "bg-emerald-50 text-emerald-600 border-emerald-100"
    },
    {
      title: "Daily Events Feed",
      desc: "A live, chronological timeline showing school workshops, seminars, and resource launches.",
      page: "timeline",
      icon: Calendar,
      badge: "Live Log",
      color: "bg-indigo-50 text-indigo-600 border-indigo-100"
    },
    {
      title: "AI Reports Library",
      desc: "Access automated, Groq-powered monthly summaries, event impact analyses, and strategic briefs.",
      page: "reports",
      icon: FileText,
      badge: "AI Summaries",
      color: "bg-amber-50 text-amber-600 border-amber-100"
    },
    {
      title: "Announcements & Bulletins",
      desc: "Stay updated with important notices, volunteer guides, and meeting reports posted by admins.",
      page: "updates",
      icon: Bell,
      badge: "Bulletins",
      color: "bg-rose-50 text-rose-600 border-rose-100"
    }
  ];
  return <div className="space-y-20 pb-20 bg-[#f8fafc]">
      
      {
    /* ==================== 1. HERO SECTION ==================== */
  }
      <section className="relative flex items-center justify-center pt-16 pb-12 overflow-hidden border-b border-slate-200/50 gold-mesh-gradient">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full radial-glow-primary pointer-events-none -z-10" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10 text-center space-y-8">
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-block relative group"
          >
            {
    /* Glowing Accent Gradient Ring */
  }
            <div className="absolute -inset-2 rounded-full bg-gradient-to-r from-accent via-rose-500 to-amber-500 opacity-60 blur-lg group-hover:opacity-90 group-hover:scale-[1.04] transition-all duration-700 animate-pulse" />
            
            {
    /* Logo Container */
  }
            <div className="relative w-36 h-36 sm:w-48 sm:h-48 rounded-full overflow-hidden border-4 border-white shadow-2xl mx-auto bg-slate-50 flex items-center justify-center">
              <img
                src="/team_logo.jpg"
                alt="Team Karthik Logo"
                className="w-full h-full object-cover group-hover:scale-[1.05] transition-transform duration-500"
              />
            </div>
            <div className="absolute -bottom-2 right-1/2 translate-x-1/2 bg-accent text-white text-[9.5px] font-mono font-black px-3.5 py-1 rounded-full uppercase tracking-widest shadow-lg border border-white/20">
              TRS Student Wing
            </div>
          </motion.div>

          <div className="space-y-4 max-w-3xl mx-auto">
            <motion.h1
    initial={{ opacity: 0, y: 15 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
    className="text-4xl sm:text-6xl font-display font-extrabold tracking-tight text-slate-950 uppercase leading-none"
  >
              TEAM <span className="text-accent">KARTHIK</span>
            </motion.h1>

            <motion.p
    initial={{ opacity: 0, y: 15 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay: 0.15 }}
    className="text-slate-600 text-sm sm:text-lg font-sans max-w-2xl mx-auto leading-relaxed"
  >
              {config?.hero?.mission || "Empowering the next generation. Driving real grassroots impact through hardware literacy, career guidance, and student advocacy."}
            </motion.p>
          </div>

          <motion.div
    initial={{ opacity: 0, y: 15 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay: 0.3 }}
    className="flex flex-col sm:flex-row gap-4 justify-center pt-2"
  >
            <button
    onClick={() => onNavigatePage("join-us")}
    className="px-8 py-3.5 bg-accent hover:bg-accent-dark text-white font-bold rounded-full text-xs sm:text-sm uppercase tracking-wider transition hover:scale-[1.01] shadow-md cursor-pointer flex items-center justify-center gap-2"
  >
              Join Our Movement
              <ArrowRight className="w-4 h-4 text-white" />
            </button>
            <button
    onClick={() => onNavigatePage("programs")}
    className="px-8 py-3.5 bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 font-bold rounded-full text-xs sm:text-sm uppercase tracking-wider transition cursor-pointer flex items-center justify-center gap-2"
  >
              Explore Programs
              <BookOpen className="w-4 h-4 text-accent" />
            </button>
          </motion.div>
        </div>
      </section>

      {
    /* ==================== 2. STATISTICS DASHBOARD ==================== */
  }
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {/* Stat 1 */}
          <motion.div
            variants={itemVariants}
            className="bg-white p-8 rounded-2xl border border-slate-200 shadow-premium flex items-center gap-5 text-left hover:border-slate-350 transition-all duration-300 hover:scale-[1.02]"
          >
            <div className="w-14 h-14 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 border border-blue-100">
              <Award className="w-7 h-7" />
            </div>
            <div>
              <div className="text-3xl font-extrabold text-slate-900 font-display">
                {config?.stats?.collegesRoamed || 0}
              </div>
              <div className="text-[10px] text-slate-400 font-bold uppercase font-mono tracking-wider">
                Colleges Roamed
              </div>
            </div>
          </motion.div>

          {/* Stat 2 */}
          <motion.div
            variants={itemVariants}
            className="bg-white p-8 rounded-2xl border border-slate-200 shadow-premium flex items-center gap-5 text-left hover:border-slate-355 transition-all duration-300 hover:scale-[1.02]"
          >
            <div className="w-14 h-14 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0 border border-amber-100">
              <HelpCircle className="w-7 h-7" />
            </div>
            <div>
              <div className="text-3xl font-extrabold text-slate-900 font-display">
                {config?.stats?.issuesRaised || 0}
              </div>
              <div className="text-[10px] text-slate-400 font-bold uppercase font-mono tracking-wider">
                Issues Logged
              </div>
            </div>
          </motion.div>

          {/* Stat 3 */}
          <motion.div
            variants={itemVariants}
            className="bg-white p-8 rounded-2xl border border-slate-200 shadow-premium flex items-center gap-5 text-left hover:border-slate-355 transition-all duration-300 hover:scale-[1.02]"
          >
            <div className="w-14 h-14 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 border border-emerald-100">
              <Sparkles className="w-7 h-7" />
            </div>
            <div>
              <div className="text-3xl font-extrabold text-slate-900 font-display">
                {config?.stats?.instantlySolved || 0}
              </div>
              <div className="text-[10px] text-slate-400 font-bold uppercase font-mono tracking-wider">
                Instantly Solved
              </div>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {
    /* ==================== 3. SECTION DIRECTORIES GRID ==================== */
  }
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-3">
          <div className="text-accent font-mono text-xs uppercase tracking-widest font-bold">Platform Overview</div>
          <h2 className="text-2xl sm:text-4xl font-display font-extrabold text-slate-950 uppercase">Explore Our Platform</h2>
          <p className="text-slate-500 text-sm max-w-xl mx-auto leading-relaxed">
            Navigate through our dedicated portals to see details on student chapters, local workshops, AI-driven surveys, and volunteer applications.
          </p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {highlights.map((h, i) => {
            const Icon = h.icon;
            return (
              <motion.div
                key={i}
                variants={itemVariants}
                className="bg-white border border-slate-200/80 rounded-3xl p-6 text-left shadow-premium hover:border-slate-350 hover:shadow-md transition-all duration-300 flex flex-col justify-between hover:scale-[1.02]"
              >
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${h.color} border`}>
                      <Icon className="w-5.5 h-5.5" />
                    </div>
                    <span className="text-[9px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-slate-50 border border-slate-100 text-slate-450">
                      {h.badge}
                    </span>
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-display font-extrabold text-base text-slate-900 leading-snug">{h.title}</h3>
                    <p className="text-slate-500 text-xs leading-relaxed font-sans">{h.desc}</p>
                  </div>
                </div>

                <button
                  onClick={() => onNavigatePage(h.page)}
                  className="mt-6 flex items-center gap-1 text-xs font-mono font-bold text-accent hover:text-accent-dark cursor-pointer transition-colors"
                >
                  Enter Portal <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </motion.div>
            );
          })}

          {/* Special Join Card to complete 3x2 grid */}
          <motion.div
            variants={itemVariants}
            className="bg-slate-950 text-white rounded-3xl p-6 text-left shadow-premium flex flex-col justify-between border border-slate-900 hover:scale-[1.02] transition-transform duration-300"
          >
            <div className="space-y-4">
              <div className="w-11 h-11 rounded-xl flex items-center justify-center bg-white/10 text-white border border-white/10">
                <Shield className="w-5.5 h-5.5 text-accent" />
              </div>
              <div className="space-y-2">
                <h3 className="font-display font-extrabold text-base uppercase text-white leading-snug">Register with Us</h3>
                <p className="text-slate-400 text-xs leading-relaxed font-sans">
                  Sign up as a local student coordinator, run campaigns, and lead local initiatives directly in your college.
                </p>
              </div>
            </div>

            <button
              onClick={() => onNavigatePage("join-us")}
              className="mt-6 w-full py-2.5 bg-accent hover:bg-accent-dark text-white rounded-xl font-mono font-bold text-xs uppercase tracking-wider cursor-pointer text-center transition-colors"
            >
              Sign Up Now
            </button>
          </motion.div>
        </motion.div>
      </section>

      {
    /* ==================== 4. LEADER BOARD BANNER ==================== */
  }
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="bg-gradient-to-br from-slate-900 to-slate-950 text-white rounded-3xl p-8 sm:p-12 overflow-hidden relative border border-slate-850 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8 text-left"
        >
          <div className="absolute top-0 right-0 w-80 h-80 bg-accent/10 rounded-full pointer-events-none blur-3xl" />
          <div className="space-y-4 max-w-xl relative z-10">
            <span className="text-xs font-mono uppercase tracking-widest text-accent font-bold">Launch Phase</span>
            <h2 className="text-3xl font-display font-extrabold text-white leading-tight uppercase">Let's build student advocacy together.</h2>
            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
              We connect local coordinators with regional resources. Get access to classroom equipment, career seminars, and direct feedback lines for local issues.
            </p>
          </div>
          <button
            onClick={() => onNavigatePage("join-us")}
            className="shrink-0 px-8 py-3.5 bg-accent hover:bg-accent-dark text-white font-mono font-bold text-xs uppercase tracking-wider rounded-xl transition-all hover:scale-[1.01] shadow-lg cursor-pointer"
          >
            Join Coordinator Board
          </button>
        </motion.div>
      </section>

    </div>;
}
