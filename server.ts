import express from "express";
import path from "path";
import fs from "fs";

import dotenv from "dotenv";

dotenv.config();

const ROOT_DIR = process.cwd();
const DB_PATH = path.join(ROOT_DIR, "db.json");

// Helper to initialize database with high-quality mock data of Team Karthik if it doesn't exist
function initDatabase() {
  if (fs.existsSync(DB_PATH)) {
    try {
      return JSON.parse(fs.readFileSync(DB_PATH, "utf-8"));
    } catch (e) {
      console.error("Error reading db.json, re-initializing", e);
    }
  }

  const initialData = {
    activities: [
      {
        id: "act-1",
        title: "Connecting with the Leaders of Tomorrow at KL University",
        date: "2026-05-18",
        location: "KL University, Vaddeswaram",
        category: "College Visit",
        coverImage: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=1200&auto=format&fit=crop",
        summary: "An inspiring interactive session with over 800+ youth, discussing skill development, modern governance, and community leadership.",
        description: "Team Karthik conducted an immersive student reach-out session at KL University. The focus was on empowering the next generation to voice their opinions on regional growth, skill alignment, and civic responsibilities. We discussed how technology, social entrepreneurship, and active grassroots engagement can bridge the gap in local governance. The atmosphere was highly energetic, solidifying our belief that youth are ready to lead from the front.",
        keyHighlights: [
          "Interactive dialogue with 800+ engineering & business students.",
          "Launched the Youth Civic Participation questionnaire.",
          "Registered 120+ student volunteers to head local chapters."
        ],
        gallery: [
          "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=600&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?q=80&w=600&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=600&auto=format&fit=crop"
        ]
      },
      {
        id: "act-2",
        title: "Grassroots Development Insights: Tenali Community Meet",
        date: "2026-06-02",
        location: "Chenchupeta, Tenali Rural",
        category: "Community Interaction",
        coverImage: "https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=1200&auto=format&fit=crop",
        summary: "Direct community feedback session addressing youth unemployment and educational resources in rural pockets.",
        description: "Taking our outreach deep into suburban and rural regions, Team Karthik visited Chenchupeta in Tenali. We spent the day listening to local families, agricultural youth, and school dropouts about the real-world obstacles they face. Understanding these issues first-hand allows Team Karthik to shape our upcoming skill-enhancement drives and educational bridge courses.",
        keyHighlights: [
          "Conducted a door-to-door survey on skill gaps with 150+ families.",
          "Announced the upcoming Rural Skill Workshop Series.",
          "Setup a local counseling kiosk staffed by senior volunteers."
        ],
        gallery: [
          "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=600&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=600&auto=format&fit=crop"
        ]
      },
      {
        id: "act-3",
        title: "Empowering Young Minds: Nellore High School Reachout",
        date: "2026-05-24",
        location: "Nellore Public School Auditorium",
        category: "School Visit",
        coverImage: "https://images.unsplash.com/photo-1577896851231-70ef18881754?q=80&w=1200&auto=format&fit=crop",
        summary: "Interactive session helping grades 9-12 understand emerging technology and career opportunities in digital India.",
        description: "Children aren't just the future; they are the present. Team Karthik visited Nellore to conduct a seminar on digital literacy, career pathways, and the power of collaborative problem solving. Through interactive card exercises and roleplays, high schoolers mapped local issues and brainstormed low-cost community solutions.",
        keyHighlights: [
          "Interactive session for 500+ high school students.",
          "Distributed free Career Guidance kits designed by Team Karthik.",
          "Selected 5 student projects for potential mentorship."
        ],
        gallery: [
          "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=600&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?q=80&w=600&auto=format&fit=crop"
        ]
      },
      {
        id: "act-4",
        title: "Voice of the Youth: Guntur Student Leadership Circle",
        date: "2026-06-10",
        location: "Guntur Activism Hub",
        category: "Student Engagement",
        coverImage: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?q=80&w=1200&auto=format&fit=crop",
        summary: "An intensive strategy session where youth leaders mapped regional grievances and created actionable student charters.",
        description: "We gathered youth captains from across 12 towns to form the first 'Student Grievance Mapping Session'. The results were eye-opening: issues ranged from basic public transit delays for female students, to the severe shortage of affordable technical bootcamps. This charter will now be submitted to public authorities.",
        keyHighlights: [
          "35 student union presidents from disparate colleges joined hands.",
          "Drafted the 10-point Youth Charter of Grievances.",
          "Created 3 zonal student task forces to coordinate emergency college-level requests."
        ],
        gallery: [
          "https://images.unsplash.com/photo-1528605248644-14dd04022da1?q=80&w=600&auto=format&fit=crop"
        ]
      },
      {
        id: "act-5",
        title: "Smarter Cities Hackathon: Guntur Civic Innovation",
        date: "2026-04-12",
        location: "Guntur Youth Center",
        category: "Special Initiative",
        coverImage: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=1200&auto=format&fit=crop",
        summary: "A collaborative sandbox event inviting students to prototype localized apps and civic systems.",
        description: "In an effort to turn civic awareness into code and concrete action, Team Karthik hosted a micro-hackathon. Over 150 student programmers and designers spent 24 hours modeling everything from automated garbage reports to safe-route navigators for night college students.",
        keyHighlights: [
          "Over 25 prototypes pitched on local municipal action items.",
          "Top 3 teams awarded cash grants sponsored by alumni partners.",
          "The winners got immediate slots in local incubation projects."
        ],
        gallery: [
          "https://images.unsplash.com/photo-1531538606174-0f90ff5dce83?q=80&w=600&auto=format&fit=crop"
        ]
      }
    ],
    updates: [
      {
        id: "up-1",
        title: "Announcing Team Karthik Career Counseling Roadshow",
        date: "2026-06-08",
        category: "Program Announcement",
        summary: "We are coming to 15 towns in 20 days with professional counselors and digital training kits.",
        readingTime: "4 min read",
        content: "After a successful pilot program in Nellore, Team Karthik is proud to officially launch the Skill & Career counseling roadshow. Our team, composed of career coaches, psychological advisors, and young leaders, will tour 15 major tier-2 and tier-3 locations. High-school and intermediate students will get direct, individual guidance completely free of charge. We are heavily focusing on matching modern AI/software tools and creative digital industries with traditional talent.",
        image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=400"
      },
      {
        id: "up-2",
        title: "Volunteer Registry Surpasses 5,000 Active Core Members",
        date: "2026-05-30",
        category: "News",
        summary: "A landmark moment reflecting the growing grassroots trust in authentic grassroots student action.",
        readingTime: "3 min read",
        content: "This week, our centralized digital registry crossed a milestone—5,000 registered, vetted volunteers ready to mobilize for civic action, medical drives, and education camps. This registration isn't just a number; it is a declaration of trust. In contrast to standard youth-groups of political entities, Team Karthik volunteers are strictly bound by community impact indices, emphasizing work over symbols.",
        image: "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?q=80&w=400"
      },
      {
        id: "up-3",
        title: "Launch of Digital Skill Labs in Suburban Guntur",
        date: "2026-05-15",
        category: "Update",
        summary: "Equipping two underfunded youth activity classrooms with modern computers and high-speed research links.",
        readingTime: "2 min read",
        content: "We have finalized negotiations to open two community study and skills-access rooms. These rooms contain five computers each, programmed with code tutorials, digital graphics software, and free video lessons, allowing local high school dropouts and standard students to learn contemporary professional software.",
        image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=400"
      }
    ],
    registrations: [],
    gallery: [
      {
        id: "img-1",
        url: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=600",
        title: "Auditorium Address at KL University",
        category: "College Visit",
        date: "2026-05-18",
        location: "Vaddeswaram"
      },
      {
        id: "img-2",
        url: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=600",
        title: "School Students Digital Career Seminar",
        category: "School Visit",
        date: "2026-05-24",
        location: "Nellore"
      },
      {
        id: "img-3",
        url: "https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=600",
        title: "Grassroots Chenchupeta Community Group",
        category: "Community Interaction",
        date: "2026-06-02",
        location: "Tenali"
      },
      {
        id: "img-4",
        url: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?q=80&w=600",
        title: "Round Table Chat on Transportation",
        category: "Student Engagement",
        date: "2026-06-10",
        location: "Guntur"
      },
      {
        id: "img-5",
        url: "https://images.unsplash.com/photo-1531538606174-0f90ff5dce83?q=80&w=600",
        title: "Civic Hackathon Team Presentations",
        category: "Special Initiative",
        date: "2026-04-12",
        location: "Guntur Hub"
      }
    ],
    config: {
      hero: {
        headline: "empowering the next generation. driving real grassroots impact.",
        mission: "We are an active student and youth movement on a continuous mission visiting colleges, schools, and communities to spark career development, civic leadership, and transparent community service.",
        primaryCtaText: "Join Team Karthik",
        secondaryCtaText: "Explore Activities"
      },
      stats: {
        placesVisited: 142,
        activitiesConducted: 485,
        studentsReached: 28500,
        communityInteractions: 12400,
        activeInitiatives: 18
      },
      featuredActivityId: "act-1"
    }
  };

  fs.writeFileSync(DB_PATH, JSON.stringify(initialData, null, 2), "utf-8");
  return initialData;
}

// Write helper
function saveDatabase(data: any) {
  fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2), "utf-8");
}

let db = initDatabase();

let dbChanged = false;
if (!db.reports) { db.reports = []; dbChanged = true; }
if (!db.programs) { db.programs = []; dbChanged = true; }
if (!db.timeline) { db.timeline = []; dbChanged = true; }
if (!db.successStories) { db.successStories = []; dbChanged = true; }
if (!db.coverageLocations) { db.coverageLocations = []; dbChanged = true; }
if (!db.annualReports) { db.annualReports = []; dbChanged = true; }

if (dbChanged) {
  saveDatabase(db);
}

const app = express();
app.use(express.json());

// Google Drive URL Auto-Converter helper
function convertGDriveUrl(url: any): any {
  if (typeof url !== "string") return url;
  
  // 1. Match file share URL e.g. drive.google.com/file/d/FILE_ID/view?usp=sharing
  const fileIdMatch = url.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
  if (fileIdMatch && fileIdMatch[1]) {
    return `https://lh3.googleusercontent.com/d/${fileIdMatch[1]}`;
  }
  
  // 2. Match direct link or open link e.g. drive.google.com/open?id=FILE_ID
  const idMatch = url.match(/[?&]id=([a-zA-Z0-9_-]+)/);
  if (idMatch && idMatch[1]) {
    return `https://lh3.googleusercontent.com/d/${idMatch[1]}`;
  }
  
  return url;
}

// Deep object traversal for Google Drive links conversion
function deepConvertGDrive(obj: any): any {
  if (obj === null || obj === undefined) return obj;
  if (typeof obj === "string") {
    return convertGDriveUrl(obj);
  }
  if (Array.isArray(obj)) {
    return obj.map(item => deepConvertGDrive(item));
  }
  if (typeof obj === "object") {
    const res: any = {};
    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        res[key] = deepConvertGDrive(obj[key]);
      }
    }
    return res;
  }
  return obj;
}

// Global middleware to auto-convert all incoming GDrive URLs
app.use((req, res, next) => {
  if (req.body) {
    req.body = deepConvertGDrive(req.body);
  }
  next();
});

// Admin Login validation endpoint
app.post("/api/admin/login", (req, res) => {
  const { username, password } = req.body;
  const expectedUser = process.env.ADMIN_USERNAME || "admin";
  const expectedPass = process.env.ADMIN_PASSWORD || "teamkarthik2026";

  if (username === expectedUser && password === expectedPass) {
    res.json({ success: true, token: "session-token-karthik-trs" });
  } else {
    res.status(401).json({ success: false, error: "Invalid username or password" });
  }
});

export { app };

  // 1. API: HEALTH CHECK
  app.get("/api/health", (req, res) => {
    res.json({ status: "healthy", timestamp: new Date() });
  });

  // 2. API: CONFIG (HERO & STATS)
  app.get("/api/config", (req, res) => {
    res.json(db.config);
  });

  app.post("/api/config", (req, res) => {
    db.config = { ...db.config, ...req.body };
    saveDatabase(db);
    res.json({ success: true, config: db.config });
  });

  // 3. API: ACTIVITIES
  app.get("/api/activities", (req, res) => {
    res.json(db.activities);
  });

  app.post("/api/activities", (req, res) => {
    const newActivity = {
      id: "act_" + Date.now(),
      title: req.body.title || "Untitled Activity",
      date: req.body.date || new Date().toISOString().split("T")[0],
      location: req.body.location || "Unknown Location",
      category: req.body.category || "Special Initiative",
      coverImage: req.body.coverImage || "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=600",
      summary: req.body.summary || "Short description...",
      description: req.body.description || "Long detailed narrative...",
      keyHighlights: req.body.keyHighlights || [],
      gallery: req.body.gallery || [],
      programId: req.body.programId || ""
    };

    db.activities.unshift(newActivity);
    saveDatabase(db);

    res.status(201).json(newActivity);
  });

  app.put("/api/activities/:id", (req, res) => {
    const { id } = req.params;
    const index = db.activities.findIndex((a: any) => a.id === id);
    if (index === -1) {
      return res.status(404).json({ error: "Activity not found" });
    }

    db.activities[index] = {
      ...db.activities[index],
      ...req.body
    };
    saveDatabase(db);
    res.json(db.activities[index]);
  });

  app.delete("/api/activities/:id", (req, res) => {
    const { id } = req.params;
    const initialLen = db.activities.length;
    db.activities = db.activities.filter((a: any) => a.id !== id);

    if (db.featuredActivityId === id) {
      db.featuredActivityId = db.activities[0]?.id || "";
    }

    if (db.activities.length === initialLen) {
      return res.status(404).json({ error: "Activity not found" });
    }

    saveDatabase(db);
    res.json({ success: true, message: "Activity deleted successfully" });
  });

  // 4. API: UPDATES & ANNOUNCEMENTS
  app.get("/api/updates", (req, res) => {
    res.json(db.updates);
  });

  app.post("/api/updates", (req, res) => {
    const newUpdate = {
      id: "up_" + Date.now(),
      title: req.body.title || "New Announcement",
      date: req.body.date || new Date().toISOString().split("T")[0],
      category: req.body.category || "Notification",
      content: req.body.content || "Detailed content goes here...",
      summary: req.body.summary || "Summary snapshot...",
      readingTime: req.body.readingTime || "2 min read",
      image: req.body.image || "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=400"
    };

    db.updates.unshift(newUpdate);
    saveDatabase(db);
    res.status(201).json(newUpdate);
  });

  app.put("/api/updates/:id", (req, res) => {
    const { id } = req.params;
    const index = db.updates.findIndex((u: any) => u.id === id);
    if (index === -1) {
      return res.status(404).json({ error: "Update not found" });
    }
    db.updates[index] = { ...db.updates[index], ...req.body };
    saveDatabase(db);
    res.json(db.updates[index]);
  });

  app.delete("/api/updates/:id", (req, res) => {
    const { id } = req.params;
    const initialLen = db.updates.length;
    db.updates = db.updates.filter((u: any) => u.id !== id);
    if (db.updates.length === initialLen) {
      return res.status(404).json({ error: "Update not found" });
    }
    saveDatabase(db);
    res.json({ success: true });
  });

  // 5. API: GALLERY MANAGEMENT
  app.get("/api/gallery", (req, res) => {
    res.json(db.gallery);
  });

  app.post("/api/gallery", (req, res) => {
    const newItem = {
      id: "img_" + Date.now(),
      url: req.body.url || "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=600",
      title: req.body.title || "Activity moment",
      category: req.body.category || "General",
      date: req.body.date || new Date().toISOString().split("T")[0],
      location: req.body.location || ""
    };
    db.gallery.unshift(newItem);
    saveDatabase(db);
    res.status(201).json(newItem);
  });

  app.delete("/api/gallery/:id", (req, res) => {
    const { id } = req.params;
    const initialLen = db.gallery.length;
    db.gallery = db.gallery.filter((g: any) => g.id !== id);
    if (db.gallery.length === initialLen) {
      return res.status(440).json({ error: "Image not found" });
    }
    saveDatabase(db);
    res.json({ success: true });
  });

  // 6. API: JOIN REQUESTS (REGISTRATIONS)
  app.get("/api/registrations", (req, res) => {
    res.json(db.registrations);
  });

  app.post("/api/registrations", (req, res) => {
    const { fullName, mobileNumber, email, college, area, interests } = req.body;
    if (!fullName || !mobileNumber || !email) {
      return res.status(400).json({ error: "Please provide fullName, mobileNumber, and email." });
    }

    const newRequest = {
      id: "reg_" + Date.now(),
      fullName,
      mobileNumber,
      email,
      college: college || "None / General Community",
      area: area || "Guntur Zonal",
      interests: interests || [],
      date: new Date().toISOString(),
      status: "Pending" // Pending, Contacted, Approved, Rejected
    };

    db.registrations.unshift(newRequest);
    saveDatabase(db);
    res.status(201).json(newRequest);
  });

  app.put("/api/registrations/:id/status", (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    const index = db.registrations.findIndex((r: any) => r.id === id);
    if (index === -1) {
      return res.status(404).json({ error: "Registration not found" });
    }
    db.registrations[index].status = status;
    saveDatabase(db);
    res.json(db.registrations[index]);
  });

  app.delete("/api/registrations/:id", (req, res) => {
    const { id } = req.params;
    const initialLen = db.registrations.length;
    db.registrations = db.registrations.filter((r: any) => r.id !== id);
    if (db.registrations.length === initialLen) {
      return res.status(404).json({ error: "Registration not found" });
    }
    saveDatabase(db);
    res.json({ success: true });
  });

  // 6.5. API: REPORTS
  app.get("/api/reports", (req, res) => {
    res.json(db.reports || []);
  });

  app.post("/api/reports", (req, res) => {
    const newReport = {
      id: "rep_" + Date.now(),
      title: req.body.title || "Untitled Report",
      activityId: req.body.activityId || "",
      programId: req.body.programId || "",
      date: req.body.date || new Date().toISOString().split("T")[0],
      location: req.body.location || "Unknown Location",
      category: req.body.category || "Special Activity Report",
      summary: req.body.summary || "Executive summary...",
      description: req.body.description || "Detailed content...",
      observations: req.body.observations || [],
      discussions: req.body.discussions || [],
      outcomes: req.body.outcomes || [],
      gallery: req.body.gallery || [],
      documents: req.body.documents || [],
      isFeatured: req.body.isFeatured || false
    };
    if (!db.reports) db.reports = [];
    db.reports.unshift(newReport);
    saveDatabase(db);
    res.status(201).json(newReport);
  });

  app.put("/api/reports/:id", (req, res) => {
    const { id } = req.params;
    const index = (db.reports || []).findIndex((r: any) => r.id === id);
    if (index === -1) {
      return res.status(404).json({ error: "Report not found" });
    }
    db.reports[index] = { ...db.reports[index], ...req.body };
    saveDatabase(db);
    res.json(db.reports[index]);
  });

  app.delete("/api/reports/:id", (req, res) => {
    const { id } = req.params;
    const initialLen = (db.reports || []).length;
    db.reports = (db.reports || []).filter((r: any) => r.id !== id);
    if (db.reports.length === initialLen) {
      return res.status(404).json({ error: "Report not found" });
    }
    saveDatabase(db);
    res.json({ success: true });
  });

  // 6.6. API: PROGRAMS
  app.get("/api/programs", (req, res) => {
    res.json(db.programs || []);
  });

  app.post("/api/programs", (req, res) => {
    const newProgram = {
      id: "prog_" + Date.now(),
      name: req.body.name || "New Program",
      description: req.body.description || "Program description...",
      objectives: req.body.objectives || [],
      startDate: req.body.startDate || new Date().toISOString().split("T")[0],
      status: req.body.status || "Planned",
      relatedActivityIds: req.body.relatedActivityIds || [],
      relatedReportIds: req.body.relatedReportIds || [],
      gallery: req.body.gallery || []
    };
    if (!db.programs) db.programs = [];
    db.programs.unshift(newProgram);
    saveDatabase(db);
    res.status(201).json(newProgram);
  });

  app.put("/api/programs/:id", (req, res) => {
    const { id } = req.params;
    const index = (db.programs || []).findIndex((p: any) => p.id === id);
    if (index === -1) {
      return res.status(404).json({ error: "Program not found" });
    }
    db.programs[index] = { ...db.programs[index], ...req.body };
    saveDatabase(db);
    res.json(db.programs[index]);
  });

  app.delete("/api/programs/:id", (req, res) => {
    const { id } = req.params;
    const initialLen = (db.programs || []).length;
    db.programs = (db.programs || []).filter((p: any) => p.id !== id);
    if (db.programs.length === initialLen) {
      return res.status(404).json({ error: "Program not found" });
    }
    saveDatabase(db);
    res.json({ success: true });
  });

  // 6.7. API: TIMELINE
  app.get("/api/timeline", (req, res) => {
    res.json(db.timeline || []);
  });

  app.post("/api/timeline", (req, res) => {
    const newEntry = {
      id: "time_" + Date.now(),
      date: req.body.date || new Date().toISOString().split("T")[0],
      title: req.body.title || "New Timeline Milestone",
      summary: req.body.summary || "Milestone description...",
      category: req.body.category || "General",
      location: req.body.location || "",
      images: req.body.images || []
    };
    if (!db.timeline) db.timeline = [];
    db.timeline.unshift(newEntry);
    db.timeline.sort((a: any, b: any) => b.date.localeCompare(a.date));
    saveDatabase(db);
    res.status(201).json(newEntry);
  });

  app.put("/api/timeline/:id", (req, res) => {
    const { id } = req.params;
    const index = (db.timeline || []).findIndex((t: any) => t.id === id);
    if (index === -1) {
      return res.status(404).json({ error: "Timeline entry not found" });
    }
    db.timeline[index] = { ...db.timeline[index], ...req.body };
    db.timeline.sort((a: any, b: any) => b.date.localeCompare(a.date));
    saveDatabase(db);
    res.json(db.timeline[index]);
  });

  app.delete("/api/timeline/:id", (req, res) => {
    const { id } = req.params;
    const initialLen = (db.timeline || []).length;
    db.timeline = (db.timeline || []).filter((t: any) => t.id !== id);
    if (db.timeline.length === initialLen) {
      return res.status(404).json({ error: "Timeline entry not found" });
    }
    saveDatabase(db);
    res.json({ success: true });
  });

  // 6.8. API: SUCCESS STORIES
  app.get("/api/success-stories", (req, res) => {
    res.json(db.successStories || []);
  });

  app.post("/api/success-stories", (req, res) => {
    const newStory = {
      id: "story_" + Date.now(),
      title: req.body.title || "Untitled Success Story",
      summary: req.body.summary || "Summary text...",
      content: req.body.content || "Content story text...",
      coverImage: req.body.coverImage || "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=600",
      category: req.body.category || "General Success",
      relatedActivityId: req.body.relatedActivityId || "",
      relatedReportId: req.body.relatedReportId || "",
      date: req.body.date || new Date().toISOString().split("T")[0],
      author: req.body.author || "Team Karthik Coordinator",
      metrics: req.body.metrics || []
    };
    if (!db.successStories) db.successStories = [];
    db.successStories.unshift(newStory);
    saveDatabase(db);
    res.status(201).json(newStory);
  });

  app.put("/api/success-stories/:id", (req, res) => {
    const { id } = req.params;
    const index = (db.successStories || []).findIndex((s: any) => s.id === id);
    if (index === -1) {
      return res.status(404).json({ error: "Story not found" });
    }
    db.successStories[index] = { ...db.successStories[index], ...req.body };
    saveDatabase(db);
    res.json(db.successStories[index]);
  });

  app.delete("/api/success-stories/:id", (req, res) => {
    const { id } = req.params;
    const initialLen = (db.successStories || []).length;
    db.successStories = (db.successStories || []).filter((s: any) => s.id !== id);
    if (db.successStories.length === initialLen) {
      return res.status(404).json({ error: "Story not found" });
    }
    saveDatabase(db);
    res.json({ success: true });
  });

  // 6.9. API: COVERAGE LOCATIONS
  app.get("/api/coverage-locations", (req, res) => {
    res.json(db.coverageLocations || []);
  });

  app.post("/api/coverage-locations", (req, res) => {
    const newLoc = {
      id: "loc_" + Date.now(),
      name: req.body.name || "New Location",
      category: req.body.category || "Community",
      location: req.body.location || "Guntur, AP",
      latitude: Number(req.body.latitude) || 16.3,
      longitude: Number(req.body.longitude) || 80.4,
      activitiesCount: Number(req.body.activitiesCount) || 1,
      studentsReached: Number(req.body.studentsReached) || 0,
      description: req.body.description || "Description details..."
    };
    if (!db.coverageLocations) db.coverageLocations = [];
    db.coverageLocations.push(newLoc);
    saveDatabase(db);
    res.status(201).json(newLoc);
  });

  app.put("/api/coverage-locations/:id", (req, res) => {
    const { id } = req.params;
    const index = (db.coverageLocations || []).findIndex((l: any) => l.id === id);
    if (index === -1) {
      return res.status(404).json({ error: "Location not found" });
    }
    db.coverageLocations[index] = {
      ...db.coverageLocations[index],
      ...req.body,
      latitude: req.body.latitude !== undefined ? Number(req.body.latitude) : db.coverageLocations[index].latitude,
      longitude: req.body.longitude !== undefined ? Number(req.body.longitude) : db.coverageLocations[index].longitude,
      activitiesCount: req.body.activitiesCount !== undefined ? Number(req.body.activitiesCount) : db.coverageLocations[index].activitiesCount,
      studentsReached: req.body.studentsReached !== undefined ? Number(req.body.studentsReached) : db.coverageLocations[index].studentsReached
    };
    saveDatabase(db);
    res.json(db.coverageLocations[index]);
  });

  app.delete("/api/coverage-locations/:id", (req, res) => {
    const { id } = req.params;
    const initialLen = (db.coverageLocations || []).length;
    db.coverageLocations = (db.coverageLocations || []).filter((l: any) => l.id !== id);
    if (db.coverageLocations.length === initialLen) {
      return res.status(404).json({ error: "Location not found" });
    }
    saveDatabase(db);
    res.json({ success: true });
  });

  // 6.10. API: ANNUAL REPORTS
  app.get("/api/annual-reports", (req, res) => {
    res.json(db.annualReports || []);
  });

  app.post("/api/annual-reports", (req, res) => {
    const newAnn = {
      id: "ann_" + Date.now(),
      year: Number(req.body.year) || 2026,
      subtitle: req.body.subtitle || "Year highlight summary",
      theme: req.body.theme || "Core focus theme",
      summary: req.body.summary || "Summary text...",
      highlights: req.body.highlights || [],
      activitiesCount: Number(req.body.activitiesCount) || 0,
      studentsReached: Number(req.body.studentsReached) || 0,
      programsCount: Number(req.body.programsCount) || 0,
      milestonesCount: Number(req.body.milestonesCount) || 0,
      growthRate: req.body.growthRate || "0%",
      fullReportMarkdown: req.body.fullReportMarkdown || "",
      coverImage: req.body.coverImage || "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=600"
    };
    if (!db.annualReports) db.annualReports = [];
    db.annualReports.unshift(newAnn);
    db.annualReports.sort((a: any, b: any) => b.year - a.year);
    saveDatabase(db);
    res.status(201).json(newAnn);
  });

  app.put("/api/annual-reports/:id", (req, res) => {
    const { id } = req.params;
    const index = (db.annualReports || []).findIndex((a: any) => a.id === id);
    if (index === -1) {
      return res.status(404).json({ error: "Annual report not found" });
    }
    db.annualReports[index] = {
      ...db.annualReports[index],
      ...req.body,
      year: req.body.year !== undefined ? Number(req.body.year) : db.annualReports[index].year,
      activitiesCount: req.body.activitiesCount !== undefined ? Number(req.body.activitiesCount) : db.annualReports[index].activitiesCount,
      studentsReached: req.body.studentsReached !== undefined ? Number(req.body.studentsReached) : db.annualReports[index].studentsReached,
      programsCount: req.body.programsCount !== undefined ? Number(req.body.programsCount) : db.annualReports[index].programsCount,
      milestonesCount: req.body.milestonesCount !== undefined ? Number(req.body.milestonesCount) : db.annualReports[index].milestonesCount
    };
    db.annualReports.sort((a: any, b: any) => b.year - a.year);
    saveDatabase(db);
    res.json(db.annualReports[index]);
  });

  app.delete("/api/annual-reports/:id", (req, res) => {
    const { id } = req.params;
    const initialLen = (db.annualReports || []).length;
    db.annualReports = (db.annualReports || []).filter((a: any) => a.id !== id);
    if (db.annualReports.length === initialLen) {
      return res.status(404).json({ error: "Annual report not found" });
    }
    saveDatabase(db);
    res.json({ success: true });
  });

    // 7.5. API: GROQ AI REPORT GENERATOR
  app.post("/api/groq/generate-report", async (req, res) => {
    const { reportType, targetId, groqApiKey } = req.body;
    const apiKey = groqApiKey || process.env.GROQ_API_KEY;

    if (!apiKey) {
      return res.status(400).json({ error: "Groq API Key is required. Please set it in Settings." });
    }

    try {
      let prompt = "";
      if (reportType === "overall-stats") {
        prompt = `You are a professional research analyst at 'Team Karthik', the TRS Student Wing.
We are tracking our youth outreach statistics. Here is the current cumulative metric:
- Colleges Roamed: ${db.config?.stats?.collegesRoamed || 0}
- Issues Raised: ${db.config?.stats?.issuesRaised || 0}
- Issues Instantly Solved: ${db.config?.stats?.instantlySolved || 0}

We have logged the following daily events:
${JSON.stringify(db.activities || [], null, 2)}

Please write an executive overall impact analysis report. Format it nicely in Markdown with sections for:
1. Executive Summary
2. Key Metric Analysis
3. Grassroots Issues Catalogued
4. Instantly Solved Case Studies
5. Future Strategic Roadmap

Use formal, student-friendly, community-driven language (avoid technical API/node jargon).`;
      } else if (reportType === "monthly") {
        const month = targetId; // e.g. "June 2026"
        const monthlyEvents = (db.activities || []).filter((a) => {
          if (!a.date) return false;
          const dateObj = new Date(a.date);
          const name = dateObj.toLocaleDateString("en-US", { month: "long", year: "numeric" });
          return name.toLowerCase() === month.toLowerCase();
        });
        
        prompt = `You are a professional research analyst at 'Team Karthik', the TRS Student Wing.
Please compile a Monthly Impact Report for: "${month}".
Here are the daily events logged during this month:
${JSON.stringify(monthlyEvents, null, 2)}

Additionally, our overall stats are:
- Colleges Roamed: ${db.config?.stats?.collegesRoamed || 0}
- Issues Raised: ${db.config?.stats?.issuesRaised || 0}
- Issues Instantly Solved: ${db.config?.stats?.instantlySolved || 0}

Please generate a structured report in Markdown including:
1. Monthly Highlights
2. Region & Campus Coverage
3. Key Student Concerns Identified
4. Resolution Action Tracker

Keep the tone highly professional, encouraging, and clean.`;
      } else if (reportType === "program") {
        const prog = (db.programs || []).find((p) => p.id === targetId);
        if (!prog) {
          return res.status(404).json({ error: "Program not found" });
        }
        const progEvents = (db.activities || []).filter((a) => a.programId === targetId);
        
        prompt = `You are a professional research analyst at 'Team Karthik', the TRS Student Wing.
Please compile a Program Progress Audit for the program: "${prog.name}".
Program Description: "${prog.description}"
Program Objectives:
${(prog.objectives || []).map((o) => `- ${o}`).join("\n")}

Here are the daily events/activities executed under this program:
${JSON.stringify(progEvents, null, 2)}

Please generate a detailed program progress report in Markdown:
1. Program Objectives Status Audit
2. Summary of Events Completed
3. Impact Assessment
4. Recommended Adjustments & Next Milestones`;
      } else if (reportType === "event") {
        const evt = (db.activities || []).find((a) => a.id === targetId);
        if (!evt) {
          return res.status(404).json({ error: "Event not found" });
        }
        
        prompt = `You are a professional research analyst at 'Team Karthik', the TRS Student Wing.
Please write a comprehensive Event Briefing for the daily event: "${evt.title}".
Date: ${evt.date}
Location: ${evt.location}
Summary: ${evt.summary}
Description: ${evt.description}

Please write a structured event briefing in Markdown:
1. Event Context & Need
2. Summary of Engagement Activities
3. Key Feedback & Ground Realities Observed
4. Resolution Outcomes & Action Items`;
      } else {
        return res.status(400).json({ error: "Invalid reportType requested" });
      }

      // Query Groq API
      const groqResponse = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: "llama-3.3-70b-versatile",
          messages: [
            {
              role: "system",
              content: "You are a professional research and policy analyst representing Team Karthik. You generate clean, detailed, premium, markdown-formatted executive reports for public viewing."
            },
            {
              role: "user",
              content: prompt
            }
          ],
          temperature: 0.3
        })
      });

      if (!groqResponse.ok) {
        const errorText = await groqResponse.text();
        throw new Error(`Groq API responded with error: ${errorText}`);
      }

      const groqData = await groqResponse.json();
      const reportMarkdown = groqData.choices?.[0]?.message?.content || "";
      res.json({ reportMarkdown });
    } catch (err) {
      console.error("Groq generation failed:", err);
      res.status(500).json({ error: "Failed to generate report using Groq API", message: err.message });
    }
  });


  // 8. Serve built assets in production / Vercel, otherwise mount Vite middlewares
  if (!process.env.VERCEL && process.env.NODE_ENV !== "production") {
    // Development mode: use Vite middlewares
    import("vite").then(({ createServer: createViteServer }) => {
      createViteServer({
        server: { middlewareMode: true },
        appType: "spa",
      }).then((vite) => {
        app.use(vite.middlewares);
        const PORT = process.env.PORT || 3000;
        app.listen(Number(PORT), "0.0.0.0", () => {
          console.log(`Development server running on http://localhost:${PORT}`);
        });
      }).catch((err) => {
        console.error("Vite startup failed:", err);
      });
    });
  } else {
    // Production / Vercel: serve built static assets
    const distPath = path.join(ROOT_DIR, "dist");
    app.use(express.static(distPath));
    // SPA fallback
    app.get("*", (req, res) => {
      if (req.path.startsWith("/api/")) {
        return res.status(404).json({ error: "API route not found" });
      }
      res.sendFile(path.join(distPath, "index.html"));
    });
    // Start listening only when not on Vercel
    if (!process.env.VERCEL) {
      const PORT = process.env.PORT || 3000;
      app.listen(Number(PORT), "0.0.0.0", () => {
        console.log(`Production server running on http://localhost:${PORT}`);
      });
    }
  }

  export default app;
