import React, { useEffect, useMemo, useState } from 'react';
import {
  ArrowRight,
  BadgeCheck,
  Building2,
  Calculator,
  CheckCircle2,
  ChevronRight,
  Clock3,
  DoorOpen,
  Hammer,
  Image,
  Mail,
  MapPin,
  Menu,
  Paintbrush,
  Phone,
  Ruler,
  ShieldCheck,
  TreePine,
  Wrench,
  X,
} from 'lucide-react';

const navItems = [
  { label: 'Services', id: 'services' },
  { label: 'Service Area', id: 'service-area' },
  { label: 'Estimate', id: 'estimate' },
  { label: 'Projects', id: 'projects' },
  { label: 'FAQ', id: 'faq' },
  { label: 'Contact', id: 'contact' },
];

const serviceItems = [
  {
    title: 'Handyman Services',
    description:
      'Punch-list repairs, fixture swaps, trim touchups, and everyday fixes handled by a crew that treats your home like a neighbor\u2019s.',
    icon: Wrench,
  },
  {
    title: 'Concrete Work',
    description:
      'Walkways, pads, porch extensions, and repair work with solid prep and clean finishing from our family team.',
    icon: Building2,
  },
  {
    title: 'Window Installation',
    description:
      'Window replacement, flashing corrections, and trim upgrades to make your home more comfortable and weather-tight.',
    icon: Ruler,
  },
  {
    title: 'Door Installation',
    description:
      'Entry, patio, and interior door installs with careful leveling, hardware setup, and dependable sealing.',
    icon: DoorOpen,
  },
  {
    title: 'Framing And Carpentry',
    description:
      'Structural framing, built-ins, custom trim, and detailed woodwork with pride in every cut and finish.',
    icon: Hammer,
  },
  {
    title: 'Painting And Finishes',
    description:
      'Surface prep, patching, and durable interior/exterior finishing work that leaves each room clean and ready to enjoy.',
    icon: Paintbrush,
  },
];

const estimateProfiles = {
  handyman: {
    label: 'Handyman Tasks',
    unitLabel: 'labor hours',
    min: 2,
    max: 40,
    step: 1,
    defaultScope: 8,
    rate: 95,
  },
  concrete: {
    label: 'Concrete Work',
    unitLabel: 'sq ft',
    min: 80,
    max: 1200,
    step: 20,
    defaultScope: 300,
    rate: 24,
  },
  windows: {
    label: 'Windows',
    unitLabel: 'windows',
    min: 1,
    max: 25,
    step: 1,
    defaultScope: 6,
    rate: 780,
  },
  doors: {
    label: 'Doors',
    unitLabel: 'doors',
    min: 1,
    max: 20,
    step: 1,
    defaultScope: 4,
    rate: 640,
  },
};

const projectItems = [
  {
    title: 'Kitchen Rebuild With New Window Casing',
    category: 'Cabinetry + Windows',
    placeholder: 'Shot List 01 | Kitchen window casing install (before/after wide angle)',
  },
  {
    title: 'Stair And Entry Door Refresh',
    category: 'Doors + Carpentry',
    placeholder: 'Shot List 02 | New entry door and stair trim detail (front approach)',
  },
  {
    title: 'Mudroom Concrete + Tile Transition',
    category: 'Concrete + Finishes',
    placeholder: 'Shot List 03 | Fresh concrete transition with finish work (45-degree angle)',
  },
  {
    title: 'Custom Bunk Room Buildout',
    category: 'Handyman + Built-Ins',
    placeholder: 'Shot List 04 | Built-in bunk room finish photo (corner room perspective)',
  },
  {
    title: 'Garage Shop Conversion',
    category: 'Framing + Doors',
    placeholder: 'Shot List 05 | Garage conversion framing and door install (full bay view)',
  },
];

const serviceAreaCities = [
  'Chattanooga',
  'Cleveland',
  'Athens',
  'Sweetwater',
  'Lenoir City',
  'Farragut',
  'Knoxville',
];

const landingPages = [
  {
    title: 'Handyman Services | Chattanooga To Knoxville',
    href: '/handyman-services-chattanooga-to-knoxville.html',
    description:
      'Local handyman repairs, punch-list jobs, and property maintenance across the East Tennessee corridor.',
  },
  {
    title: 'Concrete Services | Chattanooga To Knoxville',
    href: '/concrete-services-chattanooga-to-knoxville.html',
    description:
      'Concrete walkways, pads, repairs, and finishing work for homeowners from Chattanooga through Knoxville.',
  },
  {
    title: 'Window Installation | Chattanooga To Knoxville',
    href: '/window-installation-chattanooga-to-knoxville.html',
    description:
      'Energy-focused window replacement and trim updates with weather-ready installation standards.',
  },
  {
    title: 'Door Installation | Chattanooga To Knoxville',
    href: '/door-installation-chattanooga-to-knoxville.html',
    description:
      'Interior and exterior door installation with alignment, hardware setup, and sealed fit.',
  },
];

const cityLandingPages = [
  {
    title: 'Handyman Services | Chattanooga, TN',
    href: '/handyman-services-chattanooga-tn.html',
  },
  {
    title: 'Handyman Services | Knoxville, TN',
    href: '/handyman-services-knoxville-tn.html',
  },
  {
    title: 'Concrete Services | Chattanooga, TN',
    href: '/concrete-services-chattanooga-tn.html',
  },
  {
    title: 'Concrete Services | Knoxville, TN',
    href: '/concrete-services-knoxville-tn.html',
  },
  {
    title: 'Window Installation | Chattanooga, TN',
    href: '/window-installation-chattanooga-tn.html',
  },
  {
    title: 'Window Installation | Knoxville, TN',
    href: '/window-installation-knoxville-tn.html',
  },
  {
    title: 'Door Installation | Chattanooga, TN',
    href: '/door-installation-chattanooga-tn.html',
  },
  {
    title: 'Door Installation | Knoxville, TN',
    href: '/door-installation-knoxville-tn.html',
  },
];

const faqItems = [
  {
    question: 'Do you offer handyman services in Chattanooga and Knoxville?',
    answer:
      'Yes. We schedule handyman calls across the Chattanooga-to-Knoxville corridor, including nearby cities in between.',
  },
  {
    question: 'Can you handle concrete work and door or window installation together?',
    answer:
      'Yes. We regularly scope bundled projects that include concrete, windows, doors, and finish carpentry on the same timeline.',
  },
  {
    question: 'How fast can we get a quote in East Tennessee?',
    answer:
      'Most requests get an initial response quickly, then we confirm measurements and provide a written quote after the site review.',
  },
  {
    question: 'Do you work with homeowners only, or rental properties too?',
    answer:
      'Both. We support homeowners, rental turnovers, and property managers who need reliable field execution and clean communication.',
  },
];

const App = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [estimateType, setEstimateType] = useState('handyman');
  const [scope, setScope] = useState(estimateProfiles.handyman.defaultScope);
  const [formSent, setFormSent] = useState(false);

  const profile = estimateProfiles[estimateType];

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setScope(profile.defaultScope);
  }, [profile]);

  const estimateRange = useMemo(() => {
    const center = profile.rate * scope;
    const low = Math.round((center * 0.85) / 50) * 50;
    const high = Math.round((center * 1.2) / 50) * 50;
    return { low, high };
  }, [profile, scope]);

  const scrollToSection = (id) => {
    setMobileMenuOpen(false);
    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setFormSent(true);
  };

  return (
    <div className="relative overflow-x-hidden text-slate-900">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-36 left-[-12rem] h-96 w-96 rounded-full bg-amber-200/40 blur-3xl" />
        <div className="absolute top-[24rem] right-[-10rem] h-[28rem] w-[28rem] rounded-full bg-orange-300/30 blur-3xl" />
      </div>

      <nav
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
          isScrolled ? 'bg-slate-950/95 shadow-lg backdrop-blur-md' : 'bg-slate-950/50 backdrop-blur-sm'
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 md:px-8">
          <button
            type="button"
            onClick={() => scrollToSection('top')}
            className="flex items-center gap-2 text-left"
          >
            <TreePine className="h-7 w-7 text-amber-400" />
            <span className="font-display text-2xl tracking-wide text-white">TIMBER &amp; TESTAMENT</span>
          </button>

          <div className="hidden items-center gap-7 md:flex">
            {navItems.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => scrollToSection(item.id)}
                className="text-sm font-semibold uppercase tracking-wider text-slate-200 transition-colors hover:text-amber-300"
              >
                {item.label}
              </button>
            ))}
            <button
              type="button"
              onClick={() => scrollToSection('contact')}
              className="rounded-sm bg-amber-500 px-4 py-2 text-sm font-bold text-slate-950 transition-colors hover:bg-amber-400"
            >
              Book A Visit
            </button>
          </div>

          <button
            type="button"
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileMenuOpen}
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="text-white md:hidden"
          >
            {mobileMenuOpen ? <X className="h-7 w-7" /> : <Menu className="h-7 w-7" />}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="border-t border-slate-800 bg-slate-950 px-5 pb-5 pt-3 md:hidden">
            <div className="flex flex-col gap-3">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => scrollToSection(item.id)}
                  className="border-b border-slate-800 py-2 text-left text-sm font-semibold uppercase tracking-wide text-slate-300"
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      <header id="top" className="relative min-h-[92vh] pt-24 text-white">
        <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_15%_20%,rgba(245,158,11,0.32),transparent_35%),radial-gradient(circle_at_85%_35%,rgba(249,115,22,0.22),transparent_42%),linear-gradient(180deg,#111827_0%,#020617_100%)]" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-slate-950/50 via-slate-950/65 to-slate-950/90" />

        <div className="mx-auto grid max-w-7xl gap-10 px-5 py-20 md:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div className="space-y-7">
            <p className="inline-flex items-center gap-2 rounded-full border border-amber-300/30 bg-amber-300/10 px-4 py-1 text-xs font-bold uppercase tracking-[0.22em] text-amber-200">
              Now Taking 2026 Projects
            </p>
            <h1 className="font-display text-5xl leading-[0.95] md:text-7xl">Family-Owned Home Services For Carpentry, Concrete, Windows, Doors, And Handyman Work.</h1>
            <p className="max-w-xl text-lg text-slate-200 md:text-xl">
              Timber &amp; Testament is a local family business serving East Tennessee homeowners from Chattanooga to Knoxville with dependable repair and upgrade work done with pride.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row">
              <button
                type="button"
                onClick={() => scrollToSection('estimate')}
                className="inline-flex items-center justify-center gap-2 rounded-sm bg-amber-500 px-7 py-4 text-sm font-bold uppercase tracking-wider text-slate-950 transition-colors hover:bg-amber-400"
              >
                Start Estimate
                <ArrowRight className="h-4 w-4" />
              </button>
              <a
                href="tel:+18652001604"
                className="inline-flex items-center justify-center gap-2 rounded-sm border border-slate-400/40 px-7 py-4 text-sm font-bold uppercase tracking-wider text-white transition-colors hover:border-amber-300 hover:text-amber-200"
              >
                Call 865-200-1604
              </a>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <HighlightCard title="Neighbor-First Scheduling" description="We keep room in the calendar for urgent repairs and family timelines." icon={Clock3} />
            <HighlightCard title="Proud Local Craft" description="Detail-focused execution with clean standards from a hometown crew." icon={BadgeCheck} />
            <HighlightCard title="Built For Real Life" description="Durable materials and practical install methods made to hold up." icon={ShieldCheck} />
            <HighlightCard title="One Family Team" description="Focused service for handyman, carpentry, concrete, windows, and doors." icon={CheckCircle2} />
          </div>
        </div>
      </header>

      <section id="services" className="mx-auto max-w-7xl px-5 py-24 md:px-8">
        <div className="mb-12 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.25em] text-amber-700">Service Coverage</p>
            <h2 className="mt-2 font-display text-5xl leading-none text-slate-900">What We Handle</h2>
          </div>
          <p className="max-w-xl text-sm leading-relaxed text-slate-600 md:text-base">
            From small repair calls to larger upgrades, every project gets hands-on care and clear communication from start to finish.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {serviceItems.map((service) => (
            <ServiceCard
              key={service.title}
              icon={service.icon}
              title={service.title}
              description={service.description}
            />
          ))}
        </div>
      </section>

      <section id="service-area" className="bg-slate-950 py-24 text-slate-100">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <p className="text-sm font-bold uppercase tracking-[0.24em] text-amber-300">Service Area</p>
          <h2 className="mt-2 font-display text-5xl leading-none">Serving Homeowners From Chattanooga To Knoxville</h2>
          <p className="mt-5 max-w-3xl text-base leading-relaxed text-slate-300">
            If you are searching for a trusted local handyman, concrete crew, window installer, or door installer in East Tennessee, our family-owned team is built for exactly that work.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            {serviceAreaCities.map((city) => (
              <span
                key={city}
                className="rounded-full border border-amber-300/30 bg-amber-300/10 px-4 py-2 text-sm font-semibold text-amber-100"
              >
                {city}, TN
              </span>
            ))}
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {landingPages.map((page) => (
              <a
                key={page.href}
                href={page.href}
                className="rounded-lg border border-slate-700 bg-slate-900 p-5 transition-colors hover:border-amber-300/50 hover:bg-slate-800"
              >
                <p className="text-sm font-bold uppercase tracking-wide text-amber-200">{page.title}</p>
                <p className="mt-2 text-sm leading-relaxed text-slate-300">{page.description}</p>
              </a>
            ))}
          </div>

          <div className="mt-10 rounded-lg border border-slate-700 bg-slate-900 p-5">
            <p className="text-sm font-bold uppercase tracking-wide text-amber-200">City Service Landing Pages</p>
            <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {cityLandingPages.map((page) => (
                <a
                  key={page.href}
                  href={page.href}
                  className="rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-xs font-semibold uppercase tracking-wide text-slate-200 transition-colors hover:border-amber-300/50 hover:text-amber-100"
                >
                  {page.title}
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="process" className="bg-white py-24 text-slate-900">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <p className="text-sm font-bold uppercase tracking-[0.24em] text-amber-700">How We Work</p>
          <h2 className="mt-2 font-display text-5xl leading-none">Field-Proven Process</h2>

          <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            <ProcessCard
              step="01"
              title="Site Visit"
              description="We inspect measurements, surfaces, and access points before quoting any scope."
            />
            <ProcessCard
              step="02"
              title="Scope + Budget"
              description="You get a written plan with pricing ranges and option levels to match priorities."
            />
            <ProcessCard
              step="03"
              title="Build Phase"
              description="Our team executes by sequence, protects the site, and keeps communication tight."
            />
            <ProcessCard
              step="04"
              title="Final Walkthrough"
              description="Punch items are closed before handoff so your project is complete on delivery."
            />
          </div>
        </div>
      </section>

      <section id="estimate" className="mx-auto max-w-7xl px-5 py-24 md:px-8">
        <div className="grid gap-8 rounded-2xl border border-amber-200/70 bg-white/90 p-6 shadow-xl backdrop-blur-sm lg:grid-cols-[1fr_0.95fr] lg:p-10">
          <div className="space-y-7">
            <div>
              <p className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-[0.24em] text-amber-700">
                <Calculator className="h-4 w-4" /> Budget Planner
              </p>
              <h2 className="mt-3 font-display text-5xl leading-none text-slate-900">Quick Estimate Tool</h2>
            </div>

            <div>
              <label className="mb-3 block text-sm font-bold uppercase tracking-wide text-slate-600">Service Type</label>
              <div className="grid gap-2 sm:grid-cols-2">
                {Object.entries(estimateProfiles).map(([key, value]) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setEstimateType(key)}
                    className={`rounded-md border px-4 py-3 text-left text-sm font-semibold transition-colors ${
                      estimateType === key
                        ? 'border-amber-500 bg-amber-50 text-amber-800'
                        : 'border-slate-200 bg-white text-slate-700 hover:border-slate-400'
                    }`}
                  >
                    {value.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-bold uppercase tracking-wide text-slate-600">
                Scope: <span className="text-amber-700">{scope} {profile.unitLabel}</span>
              </label>
              <input
                type="range"
                min={profile.min}
                max={profile.max}
                step={profile.step}
                value={scope}
                onChange={(event) => setScope(Number(event.target.value))}
                className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-slate-200 accent-amber-600"
              />
              <div className="mt-2 flex justify-between text-xs text-slate-500">
                <span>{profile.min}</span>
                <span>{profile.max}</span>
              </div>
            </div>
          </div>

          <div className="rounded-xl bg-slate-900 p-8 text-center text-slate-100">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-amber-300">Estimated Budget Range</p>
            <p className="mt-5 text-5xl font-black text-white">
              ${estimateRange.low.toLocaleString()} - ${estimateRange.high.toLocaleString()}
            </p>
            <p className="mx-auto mt-5 max-w-sm text-sm leading-relaxed text-slate-300">
              Ballpark range based on typical labor and material conditions. Final quote follows site verification.
            </p>
            <button
              type="button"
              onClick={() => scrollToSection('contact')}
              className="mt-7 inline-flex items-center gap-2 rounded-sm bg-amber-500 px-6 py-3 text-sm font-bold uppercase tracking-wide text-slate-950 transition-colors hover:bg-amber-400"
            >
              Request Detailed Quote
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </section>

      <section id="projects" className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <div className="mb-10 flex items-end justify-between gap-6">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.24em] text-amber-700">Project Snapshot</p>
              <h2 className="mt-2 font-display text-5xl leading-none text-slate-900">Recent Work</h2>
            </div>
            <span className="hidden text-sm font-semibold text-slate-500 md:block">Handyman + Concrete + Window + Door scopes</span>
          </div>

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {projectItems.map((project) => (
              <ProjectCard
                key={project.title}
                title={project.title}
                category={project.category}
                placeholder={project.placeholder}
              />
            ))}
          </div>
        </div>
      </section>

      <section id="faq" className="mx-auto max-w-7xl px-5 py-24 md:px-8">
        <div className="max-w-4xl">
          <p className="text-sm font-bold uppercase tracking-[0.24em] text-amber-700">Common Questions</p>
          <h2 className="mt-2 font-display text-5xl leading-none text-slate-900">FAQ For Chattanooga To Knoxville Homeowners</h2>
        </div>

        <div className="mt-10 grid gap-4">
          {faqItems.map((item) => (
            <FaqItem key={item.question} question={item.question} answer={item.answer} />
          ))}
        </div>
      </section>

      <section id="contact" className="relative overflow-hidden bg-slate-950 py-24 text-white">
        <div className="absolute -left-20 top-6 h-72 w-72 rounded-full border-[28px] border-slate-800/70" />
        <div className="mx-auto grid max-w-7xl gap-10 px-5 md:px-8 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="space-y-6">
            <p className="text-sm font-bold uppercase tracking-[0.24em] text-amber-300">Contact Timber &amp; Testament</p>
            <h2 className="font-display text-5xl leading-none">Tell Us What You Need, We&apos;ll Take Care Of It.</h2>
            <p className="max-w-md text-slate-300">
              Share your goals and timeline. Our family-owned team handles handyman work, concrete, window installs, door installs, carpentry, and finishing services.
            </p>

            <div className="space-y-4 text-sm">
              <a href="tel:+18652001604" className="flex items-center gap-3 text-slate-100 hover:text-amber-300">
                <Phone className="h-5 w-5 text-amber-400" /> 865-200-1604
              </a>
              <a
                href="mailto:timberandtestamentllc@gmail.com"
                className="flex items-center gap-3 text-slate-100 hover:text-amber-300"
              >
                <Mail className="h-5 w-5 text-amber-400" /> timberandtestamentllc@gmail.com
              </a>
              <p className="flex items-center gap-3 text-slate-300">
                <MapPin className="h-5 w-5 text-amber-400" /> Chattanooga To Knoxville Service Corridor
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="rounded-lg border border-slate-800 bg-slate-900/80 p-6 shadow-xl">
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="First Name" name="firstName" type="text" placeholder="Jordan" required />
              <Field label="Last Name" name="lastName" type="text" placeholder="Parker" required />
            </div>

            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <Field label="Email" name="email" type="email" placeholder="you@example.com" required />
              <Field label="Phone" name="phone" type="tel" placeholder="865-555-0199" required />
            </div>

            <div className="mt-4">
              <label htmlFor="scope" className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-400">
                Project Scope
              </label>
              <textarea
                id="scope"
                name="scope"
                required
                rows={5}
                placeholder="Example: 10 windows, 2 exterior doors, front walkway concrete replacement"
                className="w-full rounded-sm border border-slate-700 bg-slate-950 p-3 text-sm text-white outline-none transition-colors focus:border-amber-400"
              />
            </div>

            <button
              type="submit"
              className="mt-6 inline-flex items-center gap-2 rounded-sm bg-amber-500 px-6 py-3 text-sm font-bold uppercase tracking-wide text-slate-950 transition-colors hover:bg-amber-400"
            >
              Submit Request
              <ArrowRight className="h-4 w-4" />
            </button>

            {formSent && (
              <p className="mt-3 text-sm font-semibold text-emerald-300">
                Request captured. We&apos;ll follow up to confirm scope and scheduling.
              </p>
            )}
          </form>
        </div>
      </section>

      <footer className="border-t border-slate-800 bg-slate-950 py-8 text-slate-400">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-5 text-sm md:flex-row md:items-center md:justify-between md:px-8">
          <p className="font-semibold text-slate-300">TIMBER &amp; TESTAMENT</p>
          <p>
            Home Services | Handyman | Concrete | Windows | Doors |{' '}
            <a href="/local-citation-partnership-kit.html" className="text-amber-300 hover:text-amber-200">
              Partner + Citation Kit
            </a>
          </p>
          <p>Local And Family-Owned</p>
          <p>(c) {new Date().getFullYear()} Timber &amp; Testament</p>
        </div>
      </footer>
    </div>
  );
};

const HighlightCard = ({ title, description, icon }) => (
  <div className="rounded-md border border-white/15 bg-white/5 p-5 backdrop-blur-sm">
    {React.createElement(icon, { className: 'h-6 w-6 text-amber-300' })}
    <h3 className="mt-4 text-lg font-bold text-white">{title}</h3>
    <p className="mt-2 text-sm text-slate-300">{description}</p>
  </div>
);

const ServiceCard = ({ icon, title, description }) => (
  <div className="group rounded-xl border border-slate-200 bg-white p-7 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg">
    <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-amber-100 text-amber-700 transition-colors group-hover:bg-amber-200">
      {React.createElement(icon, { className: 'h-6 w-6' })}
    </div>
    <h3 className="mt-5 text-xl font-bold text-slate-900">{title}</h3>
    <p className="mt-3 text-sm leading-relaxed text-slate-600">{description}</p>
  </div>
);

const ProcessCard = ({ step, title, description }) => (
  <div className="rounded-lg border border-slate-200 bg-slate-50 p-6">
    <p className="text-xs font-bold tracking-[0.22em] text-amber-700">STEP {step}</p>
    <h3 className="mt-3 text-xl font-bold text-slate-900">{title}</h3>
    <p className="mt-3 text-sm leading-relaxed text-slate-600">{description}</p>
  </div>
);

const FaqItem = ({ question, answer }) => (
  <details className="rounded-lg border border-slate-200 bg-white p-5 open:border-amber-400">
    <summary className="cursor-pointer list-none text-lg font-bold text-slate-900">{question}</summary>
    <p className="mt-3 text-sm leading-relaxed text-slate-700">{answer}</p>
  </details>
);

const ProjectCard = ({ title, category, placeholder }) => (
  <div className="group relative overflow-hidden rounded-lg">
    <div className="h-64 w-full bg-gradient-to-br from-slate-200 to-slate-300" />
    <div className="absolute inset-0 flex items-center justify-center border-2 border-dashed border-slate-400/70 bg-slate-700/35 p-6 text-center">
      <div className="space-y-2 text-white">
        <Image className="mx-auto h-8 w-8 text-amber-300" />
        <p className="text-sm font-semibold uppercase tracking-wide">{placeholder}</p>
      </div>
    </div>
    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/30 to-transparent" />
    <div className="absolute inset-x-0 bottom-0 p-5">
      <p className="text-xs font-bold uppercase tracking-wider text-amber-300">{category}</p>
      <h3 className="mt-1 text-lg font-bold text-white">{title}</h3>
    </div>
  </div>
);

const Field = ({ label, name, type, placeholder, required }) => (
  <div>
    <label htmlFor={name} className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-400">
      {label}
    </label>
    <input
      id={name}
      name={name}
      type={type}
      required={required}
      placeholder={placeholder}
      className="w-full rounded-sm border border-slate-700 bg-slate-950 p-3 text-sm text-white outline-none transition-colors focus:border-amber-400"
    />
  </div>
);

export default App;

