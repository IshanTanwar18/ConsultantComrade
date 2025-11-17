import { useEffect, useState } from "react";
import { api } from "../api";
import ContactForm from "../components/ContactForm";
import NewsletterForm from "../components/NewsletterForm";
import Consulting from "../assets/Consulting.svg";

export default function LandingPage() {
  const [projects, setProjects] = useState([]);
  const [clients, setClients] = useState([]);

  // Hero contact form (Get a Free Consultation)
  const [heroForm, setHeroForm] = useState({
    fullName: "",
    email: "",
    mobile: "",
    city: "",
  });
  const [heroMsg, setHeroMsg] = useState("");
  const [heroStatus, setHeroStatus] = useState("idle");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [projRes, clientRes] = await Promise.all([
          api.get("/projects"),
          api.get("/clients"),
        ]);
        setProjects(projRes.data);
        setClients(clientRes.data);
      } catch (err) {
        console.error("Error fetching data", err);
      }
    };
    fetchData();
  }, []);

  const handleHeroChange = (e) => {
    setHeroForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleHeroSubmit = async (e) => {
    e.preventDefault();
    setHeroMsg("");
    setHeroStatus("idle");
    try {
      await api.post("/contacts", heroForm);
      setHeroMsg("Thank you! We will contact you soon.");
      setHeroStatus("success");
      setHeroForm({ fullName: "", email: "", mobile: "", city: "" });
    } catch (err) {
      console.error(err);
      setHeroMsg("Something went wrong. Please try again.");
      setHeroStatus("error");
    }
  };

  return (
    <div className="bg-slate-50">
      {/* ================= HERO ================= */}
      <section
        id="hero"
        className="relative bg-slate-900 text-white overflow-hidden rounded-md"
      >
        {/* Background image */}
        <img
          src={Consulting}
          width="150px"
          height="80px"
          alt="Team discussion"
          className="absolute inset-0 w-full h-full object-cover opacity-70"
        />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/80 via-slate-900/40 to-slate-900/20" />

        <div className="relative max-w-6xl mx-auto px-4 py-16 lg:py-24 grid gap-10 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] items-center">
          {/* Left text */}
          <div>
            <p className="text-xs uppercase tracking-widest text-indigo-300 mb-3">
              STRATEGY • INNOVATION • RESULTS
            </p>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight mb-4 text-white">
              Consulting & Advisory
              <br />
              <span className="text-indigo-400">for Modern Businesses</span>
            </h1>

            <p className="text-sm md:text-base text-slate-200/90 max-w-lg mb-6">
              At Consulting Comrade, we guide companies to success with
              data-driven strategies, intelligent design solutions, and
              actionable insights that drive measurable results.
            </p>

            <div className="flex flex-col md:flex-wrap gap-4 text-xs md:text-sm">
              <div className="flex items-center gap-2">
                <span className="h-6 w-6 rounded-full bg-indigo-500/30 flex items-center justify-center text-white font-bold">
                  ✓
                </span>
                <span>End-to-end business strategy</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="h-6 w-6 rounded-full bg-indigo-500/30 flex items-center justify-center text-white font-bold">
                  ✓
                </span>
                <span>Scalable digital solutions</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="h-6 w-6 rounded-full bg-indigo-500/30 flex items-center justify-center text-white font-bold">
                  ✓
                </span>
                <span>Design-driven growth consulting</span>
              </div>
            </div>
          </div>

          {/* Right: Get a Free Consultation form */}
          <div className="bg-slate-100 rounded-2xl shadow-2xl shadow-slate-900/40 p-6 md:p-7 text-slate-900">
            <h2 className="text-xl font-semibold mb-1">
              Get a Free Consultation
            </h2>
            <p className="text-xs text-slate-500 mb-5">
              Share your details and we&apos;ll reach out with a tailored plan
              for your product.
            </p>

            <form
              onSubmit={handleHeroSubmit}
              className="space-y-4 bg-gray-900 p-6 rounded-xl shadow-lg max-w-md mx-auto"
            >
              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">
                  Your Name
                </label>
                <input
                  name="fullName"
                  value={heroForm.fullName}
                  onChange={handleHeroChange}
                  required
                  placeholder="John Doe"
                  className="w-full rounded-lg border border-gray-700 px-3 py-2 text-sm text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-gray-800 transition"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">
                  Work Email
                </label>
                <input
                  name="email"
                  type="email"
                  value={heroForm.email}
                  onChange={handleHeroChange}
                  required
                  placeholder="john@example.com"
                  className="w-full rounded-lg border border-gray-700 px-3 py-2 text-sm text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-gray-800 transition"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">
                  Phone Number
                </label>
                <input
                  name="mobile"
                  value={heroForm.mobile}
                  onChange={handleHeroChange}
                  required
                  placeholder="+91 9876543210"
                  className="w-full rounded-lg border border-gray-700 px-3 py-2 text-sm text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-gray-800 transition"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">
                  City / Location
                </label>
                <input
                  name="city"
                  value={heroForm.city}
                  onChange={handleHeroChange}
                  required
                  placeholder="Indore, India"
                  className="w-full rounded-lg border border-gray-700 px-3 py-2 text-sm text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-gray-800 transition"
                />
              </div>

              <button
                type="submit"
                className="mt-3 w-full rounded-lg bg-indigo-600 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-300"
              >
                Schedule a Consultation
              </button>
            </form>

            {heroMsg && (
              <p
                className={`mt-3 text-xs ${
                  heroStatus === "success" ? "text-green-600" : "text-red-600"
                }`}
              >
                {heroMsg}
              </p>
            )}
          </div>
        </div>
      </section>

      {/* ================= IMAGE COLLAGE + ABOUT (like reference) ================= */}
      <section className="bg-white">
        <div className="max-w-6xl mx-auto px-4 py-14 md:py-20">
          {/* Image collage */}
          <div className="relative mx-auto mb-10 h-64 md:h-72 max-w-4xl">
            {/* subtle background shapes */}
            <div className="absolute -left-10 bottom-4 h-24 w-24 rounded-3xl bg-sky-50" />
            <div className="absolute -right-6 top-0 h-28 w-28 rounded-full bg-slate-50" />

            {/* left image */}
            <div className="absolute left-0 top-6 w-40 md:w-52 h-28 md:h-32 rounded-xl overflow-hidden shadow-lg bg-white">
              <img
                src="https://images.pexels.com/photos/7578936/pexels-photo-7578936.jpeg?auto=compress&cs=tinysrgb&w=1200"
                alt="Handshake"
                className="w-full h-full object-cover"
              />
              {/* orange L-corner */}
              <div className="absolute -left-2 -bottom-2 h-6 w-6 border-l-4 border-b-4 border-orange-500 rounded-bl-xl" />
            </div>

            {/* center image */}
            <div className="absolute left-1/2 top-1/2 w-48 md:w-64 h-32 md:h-40 -translate-x-1/2 -translate-y-1/2 rounded-xl overflow-hidden shadow-xl bg-white">
              <img
                src="https://images.pexels.com/photos/1181562/pexels-photo-1181562.jpeg?auto=compress&cs=tinysrgb&w=1200"
                alt="Discussion"
                className="w-full h-full object-cover"
              />
              {/* light block behind */}
              <div className="absolute -left-6 -bottom-6 h-16 w-24 rounded-3xl bg-sky-50 -z-10" />
            </div>

            {/* right image */}
            <div className="absolute right-0 bottom-4 w-40 md:w-52 h-28 md:h-32 rounded-xl overflow-hidden shadow-lg bg-white">
              <img
                src="https://images.pexels.com/photos/3184405/pexels-photo-3184405.jpeg?auto=compress&cs=tinysrgb&w=1200"
                alt="Clients"
                className="w-full h-full object-cover"
              />
              {/* blue L-corner */}
              <div className="absolute -right-2 -top-2 h-6 w-6 border-r-4 border-t-4 border-sky-500 rounded-tr-xl" />
            </div>
          </div>

          {/* About text */}
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-semibold text-slate-800">
              About Us
            </h2>
            <div className="mt-2 mb-4 mx-auto h-1 w-16 rounded-full bg-sky-500" />
            <p className="text-sm md:text-base text-slate-600 mb-5">
              We partner with product-led teams to turn ideas into scalable
              digital solutions. From early strategy workshops to post-launch
              optimisation, Real Trust works as an extended part of your team to
              ship experiences that actually move business metrics.
            </p>

            <div className="grid gap-3 md:grid-cols-3 text-xs md:text-sm text-slate-600 mt-4">
              <div>
                <p className="font-semibold text-slate-800 mb-1">
                  Strategic Consulting
                </p>
                <p>
                  Discovery, positioning and roadmapping aligned with your
                  business goals.
                </p>
              </div>
              <div>
                <p className="font-semibold text-slate-800 mb-1">
                  Experience Design
                </p>
                <p>
                  Web and product experiences crafted to be simple, clear and
                  conversion-focused.
                </p>
              </div>
              <div>
                <p className="font-semibold text-slate-800 mb-1">
                  Growth & Delivery
                </p>
                <p>
                  Full-stack execution, analytics and continuous improvement for
                  long-term impact.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= WHY CHOOSE US ================= */}
      <section className="bg-white">
        <div className="max-w-6xl mx-auto px-4 py-12">
          <h2 className="text-center text-2xl md:text-3xl font-semibold text-slate-800">
            Why Choose Us?
          </h2>
          <div className="mx-auto mt-2 mb-8 h-1 w-16 rounded-full bg-sky-500" />

          <div className="grid gap-6 md:grid-cols-3">
            <FeatureCard
              icon="📈"
              title="Potential ROI"
              text="We focus on the metrics that matter, from activation and retention to lifetime value."
            />
            <FeatureCard
              icon="🎨"
              title="Design"
              text="Pixel-perfect, accessible and responsive interfaces that your users love to use."
            />
            <FeatureCard
              icon="⚙️"
              title="Engineering"
              text="Battle-tested MERN stack foundations, cloud-ready architecture and clean code."
            />
          </div>
        </div>
      </section>

      {/* ================= OUR PROJECTS (from backend) ================= */}
      <section id="projects" className="bg-sky-50">
        <div className="max-w-6xl mx-auto px-4 py-12">
          <h2 className="text-center text-2xl md:text-3xl font-semibold text-slate-800">
            Our Projects
          </h2>
          <p className="text-center text-sm md:text-base text-slate-600 max-w-2xl mx-auto mt-2 mb-8">
            These cards come directly from your backend 
            Add new projects from the Admin panel to see them here.
          </p>

          {projects.length === 0 ? (
            <p className="text-center text-sm text-slate-500">
              No projects added yet.
            </p>
          ) : (
            <div className="grid gap-6 md:grid-cols-3">
              {projects.map((p) => (
                <div
                  key={p._id}
                  className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden flex flex-col"
                >
                  <div className="h-40 bg-slate-100 overflow-hidden">
                    <img
                      src={p.imageUrl}
                      alt={p.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4 flex-1 flex flex-col">
                    <h3 className="text-sm font-semibold text-slate-800 mb-1">
                      {p.name}
                    </h3>
                    <p className="text-xs text-slate-600 mb-3 flex-1">
                      {p.description}
                    </p>
                    <button className="self-start rounded-full bg-orange-500 px-4 py-1.5 text-xs font-semibold text-white hover:bg-orange-600">
                      Read More
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ================= HAPPY CLIENTS (from backend) ================= */}
      <section id="clients" className="bg-white">
        <div className="max-w-6xl mx-auto px-4 py-12">
          <h2 className="text-center text-2xl md:text-3xl font-semibold text-slate-800">
            Happy Clients
          </h2>
          <p className="text-center text-sm md:text-base text-slate-600 max-w-2xl mx-auto mt-2 mb-8">
            Testimonials are also powered by your backend{" "}
             Add clients in the Admin panel.
          </p>

          {clients.length === 0 ? (
            <p className="text-center text-sm text-slate-500">
              No clients added yet.
            </p>
          ) : (
            <div className="grid gap-6 md:grid-cols-3">
              {clients.map((c) => (
                <div
                  key={c._id}
                  className="bg-slate-50 rounded-xl shadow-sm border border-slate-100 p-5 flex flex-col"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="h-10 w-10 rounded-full overflow-hidden bg-slate-200">
                      <img
                        src={c.imageUrl}
                        alt={c.name}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-slate-800">
                        {c.name}
                      </h3>
                      <p className="text-[11px] text-sky-600">
                        {c.designation}
                      </p>
                    </div>
                  </div>
                  <p className="text-xs text-slate-600 flex-1">
                    {c.description}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ================= CONTACT + NEWSLETTER ================= */}
      <section
        id="contact"
        className="bg-slate-900 text-white py-12 mt-4 bg-cover bg-center"
        style={{
          backgroundImage:
            "url(https://images.pexels.com/photos/269077/pexels-photo-269077.jpeg?auto=compress&cs=tinysrgb&w=1600)",
        }}
      >
        <div className="bg-slate-900/80">
          <div className="max-w-6xl mx-auto px-4 py-10 grid gap-10 md:grid-cols-2">
            <div>
              <h2 className="text-2xl md:text-3xl font-semibold mb-2">
                Let&apos;s Talk About Your Project
              </h2>
              <p className="text-sm md:text-base text-slate-200 mb-4">
                This contact form below is the same one stored in your backend
               
                .
              </p>
              <ContactForm />
            </div>

            <div id="newsletter">
              <h3 className="text-xl font-semibold mb-3">
                Stay in the Loop — Subscribe
              </h3>
              <p className="text-sm text-slate-200 mb-4">
                Subscribe to our newsletter. Emails are saved via{" "}
              </p>
              <NewsletterForm />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

/* Small reusable card for “Why Choose Us?” */
function FeatureCard({ icon, title, text }) {
  return (
    <div className="bg-slate-50 rounded-xl border border-slate-100 shadow-sm p-5 text-center">
      <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-sky-100 text-lg">
        {icon}
      </div>
      <h3 className="text-sm font-semibold text-slate-800 mb-1">{title}</h3>
      <p className="text-xs text-slate-600">{text}</p>
    </div>
  );
}