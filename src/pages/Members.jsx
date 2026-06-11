import { Mail, Linkedin, Twitter, Users, Award, Code } from "lucide-react";

export default function Members() {
  return (
    <div className="pt-8 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 text-left">
      
      {/* Header */}
      <section className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs font-mono font-bold uppercase tracking-widest text-accent bg-amber-50 text-amber-800 px-3.5 py-1.5 rounded-full inline-block border border-amber-200">
          Active Leadership
        </span>
        <h1 className="text-4xl sm:text-5xl font-display font-extrabold text-slate-900 tracking-tight leading-none uppercase">
          Meet Our Team
        </h1>
        <p className="text-slate-500 text-sm sm:text-base leading-relaxed font-sans max-w-2xl mx-auto">
          Dedicated student organizers and volunteers leading the youth empowerment and digital literacy movement at the grassroots.
        </p>
      </section>

      {/* Leadership Center Person */}
      <section className="flex justify-center">
        <div className="group bg-white border border-slate-200/90 rounded-3xl p-8 text-center shadow-lg hover:border-slate-350 transition-all duration-300 max-w-xl w-full relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-[4px] bg-gradient-to-r from-accent via-rose-500 to-amber-500" />
          
          <div className="space-y-6 flex flex-col items-center">
            {/* Karthik Pic */}
            <div className="w-40 h-40 rounded-full border-4 border-slate-100 overflow-hidden shadow-md group-hover:scale-105 transition-transform duration-300">
              <img 
                src="/karthik_pic.jpeg" 
                alt="Karthik Yadav" 
                className="w-full h-full object-cover" 
                onError={(e) => {
                  e.currentTarget.src = "/team_logo.jpg"; // Fallback just in case
                }}
              />
            </div>

            <div className="space-y-2">
              <div className="inline-flex items-center gap-1 bg-amber-50 px-3 py-1 rounded-full text-[10px] font-mono font-bold text-amber-800 uppercase tracking-wider border border-amber-200">
                <Award className="w-3.5 h-3.5" /> Founder & Leader
              </div>
              <h3 className="font-display font-extrabold text-2xl text-slate-950">Karthik Yadav</h3>
              <p className="text-accent text-xs font-mono font-bold uppercase tracking-wider">Chief Student Organizer</p>
            </div>
            
            <p className="text-slate-600 text-sm leading-relaxed max-w-md">
              Coordinates local college outreach, school computer classroom installations, and student advocacy groups throughout Greater Hyderabad and Telangana zones.
            </p>
            
            <div className="pt-4 border-t border-slate-150 w-full flex justify-center gap-4 text-slate-400">
              <a href="#" className="hover:text-slate-700 transition-colors"><Mail className="w-4 h-4" /></a>
              <a href="#" className="hover:text-slate-700 transition-colors"><Linkedin className="w-4 h-4" /></a>
              <a href="#" className="hover:text-slate-700 transition-colors"><Twitter className="w-4 h-4" /></a>
            </div>
          </div>
        </div>
      </section>

      {/* Core Team Grid (Suryachandra and Empty Placeholder) */}
      <section className="space-y-6">
        <h2 className="text-center font-display font-bold text-lg text-slate-700 uppercase tracking-wider">
          Core Coordinators
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Suryachandra */}
          <div className="group bg-white border border-slate-200/80 rounded-3xl p-6 text-left shadow-premium hover:border-slate-350 transition-all duration-300 flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-[3px] bg-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
            <div className="space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-center text-indigo-600 font-display font-extrabold text-2xl group-hover:bg-indigo-600 group-hover:text-white transition-colors duration-300">
                <Code className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h3 className="font-display font-extrabold text-lg text-slate-950">Suryachandra</h3>
                <p className="text-indigo-600 text-xs font-mono font-bold uppercase tracking-wider">Tech & Operations Coordinator</p>
              </div>
              <p className="text-slate-500 text-xs leading-relaxed font-sans">
                Oversees platform architecture, data integrations, and administrative tools to manage school drives and student registries.
              </p>
            </div>

            <div className="pt-6 mt-6 border-t border-slate-100 flex items-center gap-3.5 text-slate-400">
              <a href="#" className="hover:text-slate-700 transition-colors"><Mail className="w-4 h-4" /></a>
              <a href="#" className="hover:text-slate-700 transition-colors"><Linkedin className="w-4 h-4" /></a>
              <a href="#" className="hover:text-slate-700 transition-colors"><Twitter className="w-4 h-4" /></a>
            </div>
          </div>

          {/* Placeholder for no other data */}
          <div className="bg-slate-50/50 border border-dashed border-slate-300 rounded-3xl p-6 text-center flex flex-col items-center justify-center min-h-[200px] space-y-3">
            <div className="w-12 h-12 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-400">
              <Users className="w-5 h-5" />
            </div>
            <div className="space-y-1">
              <h4 className="font-display font-bold text-sm text-slate-700">No other organizers recorded</h4>
              <p className="text-xs text-slate-500 max-w-xs leading-relaxed">
                Additional volunteer positions and college representative nodes are currently being vetted.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Vision Callout */}
      <section className="bg-slate-100 border border-slate-200 rounded-3xl p-8 sm:p-12 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-64 h-64 bg-accent/5 rounded-full pointer-events-none blur-2xl" />
        <div className="max-w-2xl space-y-4 relative z-10">
          <span className="text-xs font-mono uppercase tracking-widest text-accent font-bold">Volunteer Driven</span>
          <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-slate-900 uppercase">Want to make an impact?</h2>
          <p className="text-slate-550 text-xs sm:text-sm leading-relaxed">
            Team Karthik relies on active local student volunteers across institutions. Join us to help teach computer skills, organize survey campaigns, and build resource spaces in schools.
          </p>
        </div>
      </section>

    </div>
  );
}
