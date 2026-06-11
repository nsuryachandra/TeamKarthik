import { useState } from "react";
import { User, Phone, Mail, Award, CheckCircle2, ArrowRight, BookOpen, MapPin, Sparkles } from "lucide-react";
export default function Join() {
  const [fullName, setFullName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [email, setEmail] = useState("");
  const [college, setCollege] = useState("");
  const [area, setArea] = useState("");
  const [selectedInterests, setSelectedInterests] = useState([]);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const interestsList = [
    "Helping with school visits",
    "Running computer classes",
    "Gathering community feedback",
    "Designing banners and posts",
    "Speaking or teaching",
    "Surveying local schools",
    "Helping organize student camps"
  ];
  const handleInterestToggle = (interest) => {
    setSelectedInterests(
      (prev) => prev.includes(interest) ? prev.filter((i) => i !== interest) : [...prev, interest]
    );
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!fullName || !mobileNumber || !email) {
      setErrorMsg("Please fill out your Full Name, Mobile Number, and Email Address.");
      return;
    }
    setLoading(true);
    setErrorMsg("");
    try {
      const res = await fetch("/api/registrations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName,
          mobileNumber,
          email,
          college: college || "General Public",
          area: area || "General Sector",
          interests: selectedInterests
        })
      });
      if (!res.ok) {
        throw new Error("Failed to submit membership application.");
      }
      setSuccess(true);
    } catch (err) {
      setErrorMsg(err.message || "An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  return <div className="pt-8 pb-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left">
      <div className="grid lg:grid-cols-12 gap-12 items-center">
        
        {
    /* Left Column Text branding details */
  }
        <div className="lg:col-span-5 space-y-6">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-accent bg-accent-light px-3 py-1 rounded-full w-max block border border-accent/20">
            Volunteer Registration
          </span>
          <h1 className="text-3xl sm:text-5xl font-display font-extrabold text-slate-900 tracking-tight leading-tight uppercase">
            Join Team <span className="text-gradient">Karthik</span>.
          </h1>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            We are looking for active college students, writers, designers, and organizers. By joining our team, you can help us run computer workshops, coordinate student camps, and deliver career guidance directly to communities that need it.
          </p>

          <div className="space-y-4 pt-4">
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-lg bg-slate-100 border border-slate-200 text-accent flex items-center justify-center shrink-0">
                <Award className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900">Voluntary Growth Opportunities</h4>
                <p className="text-xs text-slate-500">Represent Team Karthik at your campus and lead local activities.</p>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-lg bg-slate-100 border border-slate-200 text-accent flex items-center justify-center shrink-0">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900">Practical Skills & Mentorship</h4>
                <p className="text-xs text-slate-500">Get access to computer classes, project training, and job search guidance.</p>
              </div>
            </div>
          </div>
        </div>

        {
    /* Right Column Registration Form container */
  }
        <div className="lg:col-span-7">
          <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-10 shadow-premium relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 rounded-bl-full pointer-events-none blur-xl" />

            {success ? (
    /* Success Landing Block */
    <div className="text-center py-8 space-y-6">
                <div className="w-16 h-16 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center mx-auto shadow-md">
                  <CheckCircle2 className="w-8 h-8 animate-bounce" />
                </div>
                <div className="space-y-2">
                  <h3 className="font-display font-extrabold text-slate-900 text-2xl uppercase">
                    Registration Submitted!
                  </h3>
                  <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                    Thank you, <span className="font-bold text-slate-900">{fullName}</span>, for applying to Team Karthik. Our youth coordinator will contact you shortly via <strong>{email}</strong> or <strong>{mobileNumber}</strong> to confirm details.
                  </p>
                </div>
                <div className="pt-4 max-w-sm mx-auto border-t border-slate-200">
                  <p className="font-mono text-[10px] uppercase text-accent font-bold">
                    What's Next?
                  </p>
                  <p className="text-xs text-slate-500 mt-1 leading-normal">
                    We will send you details in the next 24-48 hours and assign you to the nearest student coordinator in your district.
                  </p>
                </div>
              </div>
  ) : (
    /* Active Registry Form */
    <form onSubmit={handleSubmit} className="space-y-6">
                <div className="border-b border-slate-100 pb-3">
                  <h3 className="font-display font-black text-slate-900 text-xl uppercase">
                    Volunteer Form
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Please fill out this simple form to join. Fields marked with <span className="text-accent">*</span> are required.
                  </p>
                </div>

                {errorMsg && <div className="bg-red-50 text-red-655 border border-red-200 p-3.5 rounded-xl text-xs font-semibold leading-relaxed">
                    {errorMsg}
                  </div>}

                <div className="grid sm:grid-cols-2 gap-6">
                  {
      /* Full Name */
    }
                  <div className="space-y-2">
                    <label htmlFor="reg-fullname" className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500 block">
                      Full Name <span className="text-accent">*</span>
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
                      <input
      id="reg-fullname"
      type="text"
      required
      placeholder="John Doe"
      value={fullName}
      onChange={(e) => setFullName(e.target.value)}
      className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-200 text-slate-900 text-sm focus:outline-none focus:border-primary bg-white"
    />
                    </div>
                  </div>

                  {
      /* Mobile Phone */
    }
                  <div className="space-y-2">
                    <label htmlFor="reg-mobile" className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500 block">
                      Mobile Number <span className="text-accent">*</span>
                    </label>
                    <div className="relative">
                      <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
                      <input
      id="reg-mobile"
      type="tel"
      required
      placeholder="9876543210"
      value={mobileNumber}
      onChange={(e) => setMobileNumber(e.target.value)}
      className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-200 text-slate-900 text-sm focus:outline-none focus:border-primary bg-white"
    />
                    </div>
                  </div>

                  {
      /* Email Address */
    }
                  <div className="space-y-2">
                    <label htmlFor="reg-email" className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500 block">
                      Email Address <span className="text-accent">*</span>
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
                      <input
      id="reg-email"
      type="email"
      required
      placeholder="john@example.com"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-200 text-slate-900 text-sm focus:outline-none focus:border-primary bg-white"
    />
                    </div>
                  </div>

                  {
      /* College/Institution */
    }
                  <div className="space-y-2">
                    <label htmlFor="reg-college" className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500 block">
                      College / Institution
                    </label>
                    <div className="relative">
                      <BookOpen className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
                      <input
      id="reg-college"
      type="text"
      placeholder="College Name"
      value={college}
      onChange={(e) => setCollege(e.target.value)}
      className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-200 text-slate-900 text-sm focus:outline-none focus:border-primary bg-white"
    />
                    </div>
                  </div>

                  {
      /* Area */
    }
                  <div className="space-y-2 sm:col-span-2">
                    <label htmlFor="reg-area" className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500 block">
                      Area / Town
                    </label>
                    <div className="relative">
                      <MapPin className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
                      <input
      id="reg-area"
      type="text"
      placeholder="Town or Village Name"
      value={area}
      onChange={(e) => setArea(e.target.value)}
      className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-200 text-slate-900 text-sm focus:outline-none focus:border-primary bg-white"
    />
                    </div>
                  </div>
                </div>

                {
      /* Tag Selection Interests */
    }
                <div className="space-y-3">
                  <label className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500 block">
                    What are you interested in?
                  </label>
                  <p className="text-[11px] text-slate-400 -mt-1 leading-normal">
                    Select the fields that fit your interests best. (Optional)
                  </p>
                  <div className="flex flex-wrap gap-2 pt-1">
                    {interestsList.map((interest) => {
      const isSelected = selectedInterests.includes(interest);
      return <button
        key={interest}
        type="button"
        onClick={() => handleInterestToggle(interest)}
        className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${isSelected ? "bg-primary text-white border-primary shadow-sm" : "bg-slate-50 text-slate-600 border-slate-200 hover:border-primary"}`}
      >
                          {isSelected ? "\u2713 " : "+ "}
                          {interest}
                        </button>;
    })}
                  </div>
                </div>

                {
      /* Submit button */
    }
                <button
      type="submit"
      disabled={loading}
      className="w-full bg-accent hover:bg-accent-dark text-white font-bold py-3.5 rounded-xl shadow cursor-pointer transition disabled:opacity-50 flex items-center justify-center gap-2 hover:scale-[1.005]"
    >
                  {loading ? "Saving..." : "Submit Registration"}
                  <ArrowRight className="w-4 h-4 text-white" />
                </button>
              </form>
  )}
          </div>
        </div>

      </div>
    </div>;
}
