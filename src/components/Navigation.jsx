import { useState, useEffect } from "react";
import { Menu, X, ShieldAlert, Award, ChevronRight } from "lucide-react";
export default function Navigation({ currentTab, setCurrentTab, isAdmin, setIsAdmin }) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  const navLinks = [
    { name: "Home", id: "home" },
    { name: "About Team", id: "about" },
    { name: "Impact Hub", id: "impact" },
    { name: "Programs", id: "programs" },
    { name: "Activities", id: "activities" },
    { name: "Reports", id: "reports" },
    { name: "Success Stories", id: "stories" },
    { name: "Timeline", id: "timeline" },
    { name: "Year in Review", id: "year-review" },
    { name: "Updates", id: "updates" }
  ];
  return <nav
    id="main-nav"
    className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? "top-3 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" : "top-0 py-2 sm:py-4 bg-black/40 backdrop-blur-md"}`}
  >
      <div
    className={`transition-all duration-500 ease-out ${scrolled ? "glass-panel shadow-premium rounded-2xl border border-white/10 px-5 py-2.5" : "bg-transparent py-2"}`}
  >
        <div className="flex justify-between items-center gap-4">
          
          {
    /* Logo / Branding */
  }
          <div
    onClick={() => {
      setCurrentTab("home");
      setIsAdmin(false);
    }}
    className="flex items-center gap-3 cursor-pointer group shrink-0"
  >
            <div className={`w-11 h-11 rounded-xl bg-white/5 flex items-center justify-center shadow-lg transition-all duration-500 group-hover:scale-105 border border-white/10 group-hover:border-accent`}>
              <Award className="w-5.5 h-5.5 text-accent animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-1">
                <span className="font-display font-black text-sm sm:text-base tracking-tight uppercase text-white">
                  Team<span className="text-accent ml-1">Karthik</span>
                </span>
              </div>
              <div className="flex items-center gap-1 -mt-1">
                <span className="text-[8px] font-mono tracking-wider uppercase bg-accent/10 text-accent font-bold px-1 py-0.5 rounded border border-accent/25">
                  TRS STUDENT WING
                </span>
              </div>
            </div>
          </div>

          {
    /* Desktop Navigation */
  }
          <div className="hidden md:flex flex-grow justify-center max-w-3xl">
            <div className="bg-white/5 border border-white/10 p-1 rounded-full flex items-center gap-0.5 overflow-x-auto scrollbar-hide max-w-full">
              {navLinks.map((link) => {
    const isActive = !isAdmin && currentTab === link.id;
    return <button
      key={link.id}
      onClick={() => {
        setCurrentTab(link.id);
        setIsAdmin(false);
      }}
      className={`relative px-3.5 py-1.5 rounded-full text-[11px] lg:text-xs font-semibold uppercase tracking-wider transition-all duration-300 ease-out whitespace-nowrap cursor-pointer ${isActive ? "bg-accent text-primary font-black shadow-md border border-accent/20" : "text-gray-300 hover:text-white hover:bg-white/5"}`}
    >
                    {link.name}
                    {isActive && <span className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-3 h-0.5 bg-accent rounded-full animate-pulse" />}
                  </button>;
  })}
            </div>
          </div>

          {
    /* Action CTAs */
  }
          <div className="hidden md:flex items-center gap-3 shrink-0">
            <button
    onClick={() => {
      setIsAdmin(!isAdmin);
    }}
    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-bold uppercase border transition-all duration-300 cursor-pointer ${isAdmin ? "bg-amber-500/20 text-accent border-amber-500/30" : "bg-white/5 text-white border-white/10 hover:bg-white/10"}`}
  >
              <div className={`w-1.5 h-1.5 rounded-full ${isAdmin ? "bg-amber-500" : "bg-gray-500"} animate-ping mr-0.5`} />
              {isAdmin ? "Admin Desk" : "Admin Portal"}
            </button>

            <button
    onClick={() => {
      setCurrentTab("join");
      setIsAdmin(false);
    }}
    className="bg-accent hover:bg-accent-dark text-primary font-black px-5 py-2.5 rounded-full text-xs uppercase tracking-wider shadow-lg shadow-accent/15 hover:shadow-accent/30 transition-all duration-300 transform active:scale-95 flex items-center gap-1 cursor-pointer hover:scale-[1.03]"
  >
              Join Us
              <ChevronRight className="w-4 h-4 text-primary" />
            </button>
          </div>

          {
    /* Mobile menu button */
  }
          <div className="md:hidden flex items-center gap-2">
            <button
    onClick={() => setIsAdmin(!isAdmin)}
    className={`px-2.5 py-1.5 rounded-lg border text-[10px] font-mono font-black uppercase tracking-wider cursor-pointer ${isAdmin ? "bg-amber-500/20 text-accent border-amber-500/30" : "bg-white/5 text-white border-white/10"}`}
  >
              {isAdmin ? "Admin Desk" : "Admin"}
            </button>
            <button
    onClick={() => setIsOpen(!isOpen)}
    className="p-2 rounded-lg text-gray-300 hover:bg-white/5 transition-colors cursor-pointer"
  >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {
    /* Mobile Drawer */
  }
      {isOpen && <div className="md:hidden mt-2 bg-black/90 backdrop-blur-xl border border-white/10 shadow-premium rounded-2.5xl px-4 pt-4 pb-6 absolute top-full left-4 right-4 z-50">
          <div className="space-y-1.5 max-h-[350px] overflow-y-auto scrollbar-hide pr-1">
            {navLinks.map((link) => <button
    key={link.id}
    onClick={() => {
      setCurrentTab(link.id);
      setIsAdmin(false);
      setIsOpen(false);
    }}
    className={`block w-full text-left px-4 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-200 ${!isAdmin && currentTab === link.id ? "bg-accent text-primary font-black border border-accent/20" : "text-gray-300 hover:bg-white/5 text-left"}`}
  >
                {link.name}
              </button>)}
          </div>

          <div className="mt-4 pt-4 border-t border-white/5 space-y-3">
            <button
    onClick={() => {
      setIsAdmin(true);
      setIsOpen(false);
    }}
    className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-xs font-mono font-black uppercase tracking-wider bg-white/5 text-white border border-white/10"
  >
              <ShieldAlert className="w-4 h-4 text-accent" />
              Go to Admin Workspace
            </button>

            <button
    onClick={() => {
      setCurrentTab("join");
      setIsAdmin(false);
      setIsOpen(false);
    }}
    className="w-full bg-accent hover:bg-accent-dark text-primary font-black text-center py-3 rounded-xl text-xs uppercase tracking-widest shadow"
  >
              Join Team Karthik
            </button>
          </div>
        </div>}
    </nav>;
}
