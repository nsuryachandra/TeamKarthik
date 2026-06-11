import { useState, useEffect } from "react";
import Home from "./pages/Home";
import Admin from "./pages/Admin";
import About from "./pages/About";
import ImpactDashboard from "./pages/ImpactDashboard";
import Join from "./pages/Join";
import Programs from "./pages/Programs";
import Reports from "./pages/Reports";
import Timeline from "./pages/Timeline";
import Updates from "./pages/Updates";
import Members from "./pages/Members";
import {
  Award,
  Menu,
  X,
  ShieldAlert,
  MapPin,
  Mail,
  Phone,
  Home as HomeIcon,
  Users,
  Shield,
  Briefcase,
  Calendar,
  Bell,
  FileText,
  UserPlus
} from "lucide-react";
export default function App() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState("home");
  const [config, setConfig] = useState(null);
  const [activities, setActivities] = useState([]);
  const [updates, setUpdates] = useState([]);
  const [gallery, setGallery] = useState([]);
  const [registrations, setRegistrations] = useState([]);
  const [reports, setReports] = useState([]);
  const [programs, setPrograms] = useState([]);
  const [timeline, setTimeline] = useState([]);
  const [successStories, setSuccessStories] = useState([]);
  const [coverageLocations, setCoverageLocations] = useState([]);
  const [annualReports, setAnnualReports] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [
          configRes,
          actRes,
          updateRes,
          galleryRes,
          regRes,
          reportsRes,
          programsRes,
          timelineRes,
          storiesRes,
          locationsRes,
          annualsRes
        ] = await Promise.all([
          fetch("/api/config"),
          fetch("/api/activities"),
          fetch("/api/updates"),
          fetch("/api/gallery"),
          fetch("/api/registrations"),
          fetch("/api/reports"),
          fetch("/api/programs"),
          fetch("/api/timeline"),
          fetch("/api/success-stories"),
          fetch("/api/coverage-locations"),
          fetch("/api/annual-reports")
        ]);
        const [
          configData,
          actData,
          updateData,
          galleryData,
          regData,
          reportsData,
          programsData,
          timelineData,
          storiesData,
          locationsData,
          annualsData
        ] = await Promise.all([
          configRes.json(),
          actRes.json(),
          updateRes.json(),
          galleryRes.json(),
          regRes.json(),
          reportsRes.json(),
          programsRes.json(),
          timelineRes.json(),
          storiesRes.json(),
          locationsRes.json(),
          annualsRes.json()
        ]);
        setConfig(configData);
        setActivities(actData);
        setUpdates(updateData);
        setGallery(galleryData);
        setRegistrations(regData);
        setReports(reportsData);
        setPrograms(programsData);
        setTimeline(timelineData);
        setSuccessStories(storiesData);
        setCoverageLocations(locationsData);
        setAnnualReports(annualsData);
      } catch (err) {
        console.error("Failed to sync backend state: ", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);
  const handleJoinSubmit = async (data) => {
    const response = await fetch("/api/registrations", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });
    if (!response.ok) {
      throw new Error("Failed to submit registration");
    }
    const newReg = await response.json();
    setRegistrations((prev) => [newReg, ...prev]);
  };
  const navigateToPage = (page) => {
    setCurrentPage(page);
    setIsAdmin(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  if (loading || !config) {
    return <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center space-y-4">
        <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center shadow-premium animate-pulse border border-slate-200">
          <Award className="w-6 h-6 text-accent" />
        </div>
        <div className="text-center space-y-1">
          <h2 className="font-display font-extrabold text-slate-950 text-sm tracking-wide">Syncing Team Karthik Platform</h2>
          <p className="text-[10px] font-mono text-slate-500 uppercase tracking-widest leading-none">Connecting database assets...</p>
        </div>
      </div>;
  }
  const navItems = [
    { label: "Home Base", page: "home", num: "01", icon: HomeIcon },
    { label: "Our Credentials", page: "stats", num: "02", icon: Award },
    { label: "About Our Creed", page: "about", num: "03", icon: Users },
    { label: "Team Members", page: "members", num: "04", icon: Shield },
    { label: "Campaigns & Programs", page: "programs", num: "05", icon: Briefcase },
    { label: "Daily Events Feed", page: "timeline", num: "06", icon: Calendar },
    { label: "Updates & Notices", page: "updates", num: "07", icon: Bell },
    { label: "AI Reports Library", page: "reports", num: "08", icon: FileText },
    { label: "Register / Join Us", page: "join-us", num: "09", icon: UserPlus }
  ];
  return <div className="min-h-screen bg-[#f8fafc] flex flex-col justify-between selection:bg-accent selection:text-white">
      
      {
    /* ==================== 1. COMPACT BRAND HEADER WITH LEFT MENU ==================== */
  }
      <header className="bg-white border-b border-slate-200/60 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex justify-between items-center">
          
          <div className="flex items-center gap-4">
            {
    /* Hamburger Button on Left */
  }
            <button
    onClick={() => setMenuOpen(true)}
    className="p-2.5 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl cursor-pointer text-slate-800 transition-all hover:scale-105"
  >
              <Menu className="w-5 h-5" />
            </button>

            <div
    onClick={() => navigateToPage("home")}
    className="flex items-center gap-3 cursor-pointer group text-left"
  >
              <div className="w-10 h-10 rounded-full overflow-hidden border border-slate-200 shadow-sm relative bg-slate-50">
                <img
    src="/team_logo.jpg"
    alt="Team Karthik logo"
    className="w-full h-full object-cover"
  />
              </div>
              <div className="hidden xs:block">
                <span className="font-display font-black text-sm sm:text-base tracking-tight uppercase text-slate-900 group-hover:text-accent transition-colors">
                  Team<span className="text-accent ml-0.5">Karthik</span>
                </span>
                <span className="text-[7.5px] font-mono tracking-widest uppercase text-slate-500 font-bold block -mt-0.5">
                  TRS STUDENT WING
                </span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <button
    onClick={() => setIsAdmin(!isAdmin)}
    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-bold uppercase border transition-all duration-300 cursor-pointer ${isAdmin ? "bg-amber-100 text-amber-800 border-amber-200" : "bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200"}`}
  >
              <div className={`w-1.5 h-1.5 rounded-full ${isAdmin ? "bg-amber-500" : "bg-slate-400"} animate-ping mr-0.5`} />
              {isAdmin ? "Admin Desk" : "Admin Panel"}
            </button>
          </div>
        </div>
      </header>

      {
    /* ==================== 2. MAIN APP PORT ==================== */
  }
      <main className="flex-grow">
        {isAdmin ? <Admin
    activities={activities}
    updates={updates}
    registrations={registrations}
    gallery={gallery}
    config={config}
    reports={reports}
    programs={programs}
    timeline={timeline}
    successStories={successStories}
    coverageLocations={coverageLocations}
    annualReports={annualReports}
    onUpdateActivities={setActivities}
    onUpdateUpdates={setUpdates}
    onUpdateRegistrations={setRegistrations}
    onUpdateGallery={setGallery}
    onUpdateConfig={setConfig}
    onUpdateReports={setReports}
    onUpdatePrograms={setPrograms}
    onUpdateTimeline={setTimeline}
    onUpdateSuccessStories={setSuccessStories}
    onUpdateCoverageLocations={setCoverageLocations}
    onUpdateAnnualReports={setAnnualReports}
  /> : <div>
            {currentPage === "home" && <Home
    activities={activities}
    updates={updates}
    config={config}
    reports={reports}
    programs={programs}
    onNavigatePage={navigateToPage}
  />}
            {currentPage === "stats" && <ImpactDashboard
    config={config}
    coverageLocations={coverageLocations}
    activities={activities}
    reports={reports}
    programs={programs}
  />}
            {currentPage === "about" && <About />}
            {currentPage === "members" && <Members />}
            {currentPage === "programs" && <Programs
    programs={programs}
    activities={activities}
    reports={reports}
  />}
            {currentPage === "timeline" && <Timeline
    activities={activities}
    programs={programs}
  />}
            {currentPage === "updates" && <Updates
    updates={updates}
  />}
            {currentPage === "reports" && <Reports
    reports={reports}
    activities={activities}
    programs={programs}
  />}
            {currentPage === "join-us" && <Join />}
          </div>}
      </main>

      {
    /* ==================== 3. LEFT-SIDE NAV DRAWER OVERLAY ==================== */
  }
      {menuOpen && <div className="fixed inset-0 z-50 flex justify-start bg-slate-955/40 backdrop-blur-xs transition-opacity duration-300">
          <div className="absolute inset-0" onClick={() => setMenuOpen(false)} />
          <div className="relative w-80 max-w-full h-full bg-gradient-to-b from-[#fafaf9] via-white to-[#f5f5f4] shadow-2xl flex flex-col justify-between p-6 border-r border-slate-150 animate-slide-in-left">
            
            <div className="space-y-6 text-left">
              <div className="flex justify-between items-center pb-4">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-full overflow-hidden border border-slate-200 shadow-sm bg-white p-0.5">
                    <img src="/team_logo.jpg" alt="Logo" className="w-full h-full object-cover rounded-full" />
                  </div>
                  <div>
                    <span className="font-display font-extrabold text-sm uppercase tracking-tight text-slate-950 block leading-none">Team Karthik</span>
                    <span className="text-[7.5px] font-mono tracking-widest uppercase text-slate-400 font-bold block mt-0.5">TRS Student Wing</span>
                  </div>
                </div>
                <button
    onClick={() => setMenuOpen(false)}
    className="text-slate-400 hover:text-slate-800 p-1.5 rounded-lg hover:bg-slate-100/50 cursor-pointer transition-colors"
  >
                  <X className="w-4.5 h-4.5" />
                </button>
              </div>

              {
    /* Decorative Subtle Line */
  }
              <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-slate-200 to-transparent" />

              {
    /* Premium Styled Left Nav Bar Menu */
  }
              <nav className="flex flex-col gap-1">
                {navItems.map((item, idx) => {
    const Icon = item.icon;
    return <button
      key={idx}
      onClick={() => {
        navigateToPage(item.page);
        setMenuOpen(false);
      }}
      className="group relative flex items-center justify-between pl-4 pr-3 py-3 rounded-xl hover:bg-slate-955/[0.02] transition-all duration-300 w-full text-left cursor-pointer"
    >
                      {
      /* Active/Hover Left Indicator Bar */
    }
                      <div className={`absolute left-0 top-1/2 -translate-y-1/2 w-[3px] rounded-r-md transition-all duration-300 ${currentPage === item.page ? "h-6 bg-accent" : "h-0 group-hover:h-6 bg-accent/60"}`} />
                      
                      <div className="flex items-center gap-3.5">
                        <Icon className={`w-4 h-4 transition-all duration-300 ${currentPage === item.page ? "text-accent scale-105" : "text-slate-400 group-hover:text-slate-900 group-hover:scale-105"}`} />
                        <span className={`text-[11px] font-display font-bold uppercase tracking-widest transition-colors ${currentPage === item.page ? "text-slate-950" : "text-[#475569] group-hover:text-slate-955"}`}>
                          {item.label}
                        </span>
                      </div>
                      <span className={`text-[9px] font-mono transition-colors font-semibold ${currentPage === item.page ? "text-accent" : "text-slate-350 group-hover:text-accent"}`}>
                        {item.num}
                      </span>
                    </button>;
  })}
              </nav>
            </div>

            <div className="pt-6 border-t border-slate-150 space-y-4">
              <button
    onClick={() => {
      setIsAdmin(!isAdmin);
      setMenuOpen(false);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }}
    className="w-full bg-slate-950 hover:bg-slate-900 text-white font-mono font-bold text-[10px] uppercase tracking-widest py-3.5 rounded-xl transition-all duration-300 cursor-pointer text-center shadow-md shadow-slate-900/10 hover:scale-[1.01]"
  >
                {isAdmin ? "Exit Admin Desk" : "Admin Panel Access"}
              </button>
              <p className="text-[8.5px] font-mono text-slate-400 text-center leading-normal">
                Team Karthik Youth Coordinator Platform
              </p>
            </div>
          </div>
        </div>}

      {
    /* ==================== 4. GORGEOUS STABLE FOOTER ==================== */
  }
      <footer id="global-platform-footer" className="bg-slate-900 text-slate-400 border-t border-slate-950 pt-16 pb-8 shrink-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="grid md:grid-cols-12 gap-8">
            
            <div className="md:col-span-5 space-y-4 text-left">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-full overflow-hidden border border-white/10 shadow-sm relative bg-slate-800">
                  <img
    src="/team_logo.jpg"
    alt="Team Karthik logo footer"
    className="w-full h-full object-cover"
  />
                </div>
                <div>
                  <span className="font-display font-extrabold text-white text-base tracking-tight leading-none block">
                    TEAM <span className="text-accent">KARTHIK</span>
                  </span>
                  <span className="text-[9px] font-mono tracking-widest text-slate-400 uppercase font-bold mt-0.5 block">
                    TRS STUDENT WING
                  </span>
                </div>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed max-w-sm font-sans">
                An active, youth development organization visiting classrooms and districts to deliver hardware literacy, strategic surveys, and vocational opportunities.
              </p>
            </div>

            <div className="md:col-span-3 space-y-3 text-xs text-left">
              <h4 className="font-mono text-[9px] uppercase tracking-widest text-slate-400 font-bold">
                Platform Navigation
              </h4>
              <div className="grid grid-cols-2 gap-2 font-medium">
                <button
    onClick={() => navigateToPage("home")}
    className="hover:text-white text-left transition-colors cursor-pointer"
  >
                  Home Base
                </button>
                <button
    onClick={() => navigateToPage("about")}
    className="hover:text-white text-left transition-colors cursor-pointer"
  >
                  About Creed
                </button>
                <button
    onClick={() => navigateToPage("programs")}
    className="hover:text-white text-left transition-colors cursor-pointer"
  >
                  Campaigns
                </button>
                <button
    onClick={() => navigateToPage("timeline")}
    className="hover:text-white text-left transition-colors cursor-pointer"
  >
                  Timeline
                </button>
                <button
    onClick={() => navigateToPage("updates")}
    className="hover:text-white text-left transition-colors cursor-pointer"
  >
                  Bulletins
                </button>
                <button
    onClick={() => navigateToPage("join-us")}
    className="hover:text-white text-left transition-colors cursor-pointer"
  >
                  Join Us
                </button>
              </div>
            </div>

            <div className="md:col-span-4 space-y-3 text-xs font-mono text-slate-400 text-left">
              <h4 className="font-mono text-[9px] uppercase tracking-widest text-slate-400 font-bold">
                Communications Hub
              </h4>
              <div className="space-y-2">
                <p className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-accent shrink-0" />
                  <span>District Headquarters, Hyderabad, Telangana, India</span>
                </p>
                <p className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-accent shrink-0" />
                  <span className="hover:text-white">coordinator@teamkarthik.org</span>
                </p>
                <p className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-accent shrink-0" />
                  <span>+91 88860 03000</span>
                </p>
              </div>
            </div>

          </div>

          <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between text-[11px] text-slate-500 gap-4">
            <p className="flex items-center gap-1 font-sans">
              <span>© {(/* @__PURE__ */ new Date()).getFullYear()} Team Karthik Platform. Crafted for active student wing representation.</span>
            </p>
            <div className="flex gap-4 font-mono text-[10px] uppercase font-bold text-slate-400">
              <span>Grassroots Vetted</span>
              <span>•</span>
              <button
    onClick={() => {
      setIsAdmin(!isAdmin);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }}
    className="flex items-center gap-1 hover:text-white cursor-pointer"
  >
                <ShieldAlert className="w-3 h-3 text-accent" />
                {isAdmin ? "Standard Mode" : "Admin Session"}
              </button>
            </div>
          </div>

        </div>
      </footer>

    </div>;
}
