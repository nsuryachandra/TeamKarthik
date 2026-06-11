import { Award, Eye, Rocket, Shield, Sparkles, Users } from "lucide-react";
export default function About() {
  const coreValues = [
    {
      title: "Honesty and Openness",
      desc: "Acting in full transparency with local students and residents, focusing on real action instead of empty promises.",
      icon: Shield
    },
    {
      title: "Student Leadership",
      desc: "Helping college representatives learn project management and team leadership by organizing local events.",
      icon: Users
    },
    {
      title: "Skill Training",
      desc: "Introducing computer literacy, basic software guidance, and local career workshops to help students.",
      icon: Rocket
    },
    {
      title: "Service to Communities",
      desc: "Continuous local support\u2014regularly visiting school classrooms to host seminars, guidance talks, and surveys.",
      icon: Award
    }
  ];
  const leadershipRoles = [
    {
      name: "Strategic Coordinate Board",
      role: "Project Planning",
      desc: "Formed by senior coordinators and local partners to verify volunteer registrations and arrange school workshops."
    },
    {
      name: "District Student Presidents",
      role: "College Chapters Coordinator",
      desc: "Student leaders across campuses coordinating campus visits, student meetings, and educational guidance seminars."
    },
    {
      name: "Outreach Coordinators",
      role: "Field Work Operations",
      desc: "Volunteers who lead the skill workshops, help set up computer classrooms, and conduct student surveys."
    }
  ];
  return <div className="pt-8 pb-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20 text-left">
      
      {
    /* 1. HEADER SECTION */
  }
      <section className="text-center max-w-3xl mx-auto space-y-5">
        <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-accent bg-accent-light px-3.5 py-1.5 rounded-full inline-block">
          TRS Student Wing • Our Mission & Team
        </span>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-extrabold text-slate-900 tracking-tight leading-none uppercase">
          About Team Karthik
        </h1>
        <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-sans mt-2">
          Team Karthik is a volunteer-led student wing dedicated to youth development. We organize practical computer classes, conduct career surveys, and establish student support clubs in local colleges.
        </p>
      </section>

      {
    /* 2. VISION, MISSION, WHY WE EXIST */
  }
      <section className="grid md:grid-cols-2 gap-12 items-center">
        <div className="relative">
          <div className="relative bg-white border border-slate-200 rounded-3xl p-8 shadow-premium space-y-6">
            <h2 className="text-2xl font-display font-extrabold text-slate-900 uppercase">
              Our Vision and Goal
            </h2>
            <div className="space-y-4 text-sm text-slate-650 leading-relaxed">
              <p>
                Today, students need practical skills and real-world experiences. Standard youth associations often focus only on campaigns, leaving out the most important aspects: job skills, tutoring, and career growth.
              </p>
              <p>
                <strong>Team Karthik was started to fill this gap.</strong> We visit schools and colleges regularly. We host interactive training sessions, distribute guidance booklets, set up study rooms, and create simple platforms for students to discuss local problems and find solutions.
              </p>
              <p className="text-accent font-semibold italic">
                "Our progress is measured by the classrooms we help, the guidance we provide, and the career paths we support."
              </p>
            </div>
          </div>
        </div>

        {
    /* Vision & Mission Split Cards */
  }
        <div className="space-y-6">
          <div className="p-6 bg-white border border-slate-200 rounded-2xl shadow-premium flex items-start gap-4">
            <div className="w-12 h-12 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-center shrink-0">
              <Eye className="w-6 h-6 text-accent" />
            </div>
            <div>
              <h3 className="font-display font-bold text-lg text-slate-900">Our Vision</h3>
              <p className="text-sm text-slate-500 mt-1 leading-relaxed">
                To build a strong student network across regional institutions, helping students gain computing knowledge and lead useful social programs.
              </p>
            </div>
          </div>

          <div className="p-6 bg-white border border-slate-200 rounded-2xl shadow-premium flex items-start gap-4">
            <div className="w-12 h-12 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-center shrink-0">
              <Rocket className="w-6 h-6 text-accent" />
            </div>
            <div>
              <h3 className="font-display font-bold text-lg text-slate-900">Our Mission</h3>
              <p className="text-sm text-slate-500 mt-1 leading-relaxed">
                Organizing computer classrooms, conducting career guidance campaigns, and helping college students prepare for jobs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {
    /* 3. CORE VALUES GRID */
  }
      <section className="space-y-10">
        <div className="text-center space-y-2">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-accent">
            Core Beliefs
          </span>
          <h2 className="text-3xl font-display font-extrabold text-slate-900 uppercase">
            Values We Live By
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {coreValues.map((value, i) => {
    const IconComp = value.icon;
    return <div
      key={i}
      className="bg-white border border-slate-200 p-6 rounded-2xl shadow-premium flex flex-col justify-between hover:border-slate-350 transition duration-300 group"
    >
                <div className="space-y-4">
                  <div className="w-10 h-10 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-center text-accent transition-colors group-hover:bg-accent group-hover:text-white">
                    <IconComp className="w-5 h-5" />
                  </div>
                  <h3 className="font-display font-bold text-base text-slate-900">
                    {value.title}
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    {value.desc}
                  </p>
                </div>
                <div className="pt-4 text-[10px] font-mono text-slate-400 font-bold">Value 0{i + 1}</div>
              </div>;
  })}
        </div>
      </section>

      {
    /* 4. LEADERSHIP STRUCTURE */
  }
      <section className="bg-slate-100 border border-slate-200 text-slate-900 rounded-3xl p-8 sm:p-12 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-64 h-64 bg-accent/5 rounded-full pointer-events-none blur-2xl" />

        <div className="grid lg:grid-cols-3 gap-12 items-start relative">
          <div className="space-y-4 lg:sticky lg:top-4">
            <span className="text-xs font-mono uppercase tracking-widest text-accent font-bold">
              Team Structure
            </span>
            <h2 className="text-3xl font-display font-extrabold text-slate-900 leading-tight uppercase">
              How We Work Together
            </h2>
            <p className="text-sm text-slate-500 leading-relaxed">
              We work as a simple, coordinated team. Every coordinator has a specific task, making it easy for college representatives to lead local programs.
            </p>
            <div className="flex items-center gap-2 pt-2 text-xs font-mono text-accent font-bold">
              <Sparkles className="w-4 h-4 text-accent" />
              <span>Coordinators active in regional zones</span>
            </div>
          </div>

          <div className="lg:col-span-2 space-y-6">
            {leadershipRoles.map((role, i) => <div
    key={i}
    className="bg-white border border-slate-200/80 rounded-2xl p-6 space-y-3 hover:border-slate-350 transition-colors duration-200 shadow-sm text-left"
  >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <h3 className="font-display font-bold text-lg text-slate-900">
                    {role.name}
                  </h3>
                  <span className="text-xs font-mono uppercase tracking-wider text-accent font-bold">
                    {role.role}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                  {role.desc}
                </p>
              </div>)}
          </div>
        </div>
      </section>
    </div>;
}
