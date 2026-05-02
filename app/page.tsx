'use client'

import { useState, useEffect, useRef } from 'react'

// ── Icons ─────────────────────────────────────────────────────────────────────
const CheckIcon = () => (
  <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
  </svg>
)

const ArrowRight = ({ className = '' }) => (
  <svg className={`w-4 h-4 ${className}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
  </svg>
)

const WhatsAppIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
)

const MenuIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
  </svg>
)

const CloseIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
  </svg>
)

// ── Scroll reveal hook ─────────────────────────────────────────────────────────
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal')
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible') })
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' })
    els.forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])
}

// ── Waitlist form ──────────────────────────────────────────────────────────────
function WaitlistForm({ variant = 'hero' }: { variant?: 'hero' | 'inline' }) {
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [school, setSchool] = useState('')
  const [state, setState] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [msg, setMsg] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const trimmedName = name.trim()
    const trimmedEmail = email.trim()
    const trimmedSchool = school.trim()

    if (!trimmedEmail || !trimmedName) {
      setState('error')
      setMsg('Please enter your name and email.')
      return
    }
    setState('loading')
    setMsg('')

    try {
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: trimmedName,
          email: trimmedEmail,
          school: trimmedSchool,
        }),
      })

      const data = await res.json()

      if (!res.ok || !data.success) {
        setState('error')
        setMsg(data.error || 'Something went wrong. Please try again.')
        return
      }

      setState('success')
      setMsg(data.message || 'You\'re on the list! We\'ll be in touch very soon.')
      setName('')
      setEmail('')
      setSchool('')
    } catch {
      setState('error')
      setMsg('Unable to submit right now. Please try again.')
    }
  }

  if (state === 'success') {
    return (
      <div className={`rounded-2xl border border-accent/30 bg-accent/5 p-6 text-center ${variant === 'hero' ? '' : 'max-w-lg mx-auto'}`}>
        <div className="w-12 h-12 rounded-full bg-accent/10 border border-accent/30 flex items-center justify-center mx-auto mb-3">
          <CheckIcon />
        </div>
        <p className="text-accent font-semibold text-lg mb-1">You're on the list.</p>
        <p className="text-white/60 text-sm">{msg}</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className={`space-y-3 ${variant === 'inline' ? 'max-w-lg mx-auto' : ''}`}>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <input
          type="text"
          placeholder="Your name"
          value={name}
          onChange={e => setName(e.target.value)}
          className="input-glow w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/30 focus:border-accent/50 transition-colors"
          required
        />
        <input
          type="text"
          placeholder="School name (optional)"
          value={school}
          onChange={e => setSchool(e.target.value)}
          className="input-glow w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/30 focus:border-accent/50 transition-colors"
        />
      </div>
      <div className="flex gap-3">
        <input
          type="email"
          placeholder="School email address"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="input-glow flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/30 focus:border-accent/50 transition-colors"
          required
        />
        <button
          type="submit"
          disabled={state === 'loading'}
          className="btn-primary flex-shrink-0 bg-accent text-navy font-semibold text-sm px-6 py-3 rounded-xl hover:bg-white transition-colors flex items-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {state === 'loading' ? (
            <span className="flex items-center gap-2">
              <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
              </svg>
              Joining...
            </span>
          ) : (
            <>Join Waitlist <ArrowRight /></>
          )}
        </button>
      </div>
      {msg && state === 'error' && <p className="text-red-400 text-xs">{msg}</p>}
      <p className="text-white/30 text-xs">No spam. No commitment. Just early access.</p>
    </form>
  )
}

// ── Main Page ──────────────────────────────────────────────────────────────────
export default function Home() {
  useReveal()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const stats = [
    { num: '277,000+', label: 'Teacher shortage in Nigeria', sub: 'Federal Ministry of Education' },
    { num: '9M+', label: 'Students losing learning time', sub: 'Every school day' },
    { num: '35,000', label: 'Secondary schools affected', sub: 'Across Nigeria' },
    { num: '0', label: 'AI classroom solutions', sub: 'Currently deployed in Nigeria' },
  ]

  const features = [
    {
      icon: '🎓',
      title: 'Curriculum-Aligned Lessons',
      desc: 'Upload your scheme of work once. Claivis generates structured lesson plans for every subject, class level, and period — aligned to WAEC and NERDC standards.',
    },
    {
      icon: '🎤',
      title: 'Live Voice Interaction',
      desc: 'Students ask questions out loud. Claivis hears them, answers clearly in real time, and returns seamlessly to the lesson — just like a real teacher would.',
    },
    {
      icon: '👁️',
      title: 'Visual AI Character',
      desc: 'A warm, human-feeling AI teacher appears on your classroom screen. Not a video. Not a chatbot. A live visual presence students can actually see and talk to.',
    },
    {
      icon: '📊',
      title: 'Lesson Reports',
      desc: 'After every session, your administrator receives a report showing what was taught, questions students asked, and engagement levels. Full visibility, always.',
    },
    {
      icon: '📶',
      title: 'Offline Ready',
      desc: 'Lessons sync overnight so teaching continues even when internet is unreliable. No connectivity, no problem — your school never loses a period.',
    },
    {
      icon: '🏫',
      title: 'School Dashboard',
      desc: 'Manage your timetable, track lesson coverage across all classrooms, and monitor subject gaps from one clean web dashboard.',
    },
  ]

  const howSteps = [
    {
      n: '01',
      title: 'Upload Your Curriculum',
      desc: 'Share your school\'s scheme of work — in Word, PDF, or Excel. Claivis reads it, structures it, and builds lesson plans for every subject and class level automatically.',
      color: 'from-blue/20 to-transparent',
      accent: '#1A4A8A',
    },
    {
      n: '02',
      title: 'Schedule Your Classes',
      desc: 'Map your existing school timetable to the platform. Claivis knows what to teach, which class, which period — Monday through Friday, every week of term.',
      color: 'from-accent/10 to-transparent',
      accent: '#00D4FF',
    },
    {
      n: '03',
      title: 'The Bell Rings — Claivis Teaches',
      desc: 'When the period starts, the AI character appears on your classroom screen and begins the lesson. Structured. Visual. Warm. Whether the teacher is present or not.',
      color: 'from-gold/10 to-transparent',
      accent: '#F5A623',
    },
    {
      n: '04',
      title: 'Students Ask — Claivis Answers',
      desc: 'A student raises their voice: "I don\'t understand Newton\'s third law." Claivis responds clearly, confirms understanding, and continues the lesson where it left off.',
      color: 'from-blue/20 to-transparent',
      accent: '#1A4A8A',
    },
  ]

  const subjects = ['Physics', 'Chemistry', 'Biology', 'Mathematics', 'Further Mathematics', 'English Language', 'Agricultural Science', 'Economics', 'Geography', 'Civic Education', 'Computer Science', 'Literature', 'Government', 'Physics', 'Chemistry', 'Biology', 'Mathematics', 'Further Mathematics', 'English Language', 'Agricultural Science', 'Economics']

  const pricing = [
    {
      name: 'Starter',
      price: '₦180,000',
      period: 'per term',
      desc: 'For small schools testing Claivis for the first time.',
      features: ['Up to 3 classrooms', 'Core subjects covered', 'Basic lesson reports', 'Email support', 'Admin dashboard'],
      cta: 'Join Waitlist',
      highlighted: false,
    },
    {
      name: 'Growth',
      price: '₦450,000',
      period: 'per term',
      desc: 'The standard plan for schools serious about student outcomes.',
      features: ['Up to 10 classrooms', 'Full JSS & SSS curriculum', 'Advanced analytics', 'Offline lesson mode', 'Priority support', 'Teacher review tools'],
      cta: 'Join Waitlist',
      highlighted: true,
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      period: 'per term',
      desc: 'For school groups, chains, and government partnerships.',
      features: ['Unlimited classrooms', 'Multi-campus dashboard', 'Custom AI character', 'Ministry-level reporting', 'Dedicated account manager', 'SLA guarantee'],
      cta: 'Contact Us',
      highlighted: false,
    },
  ]

  const faqs = [
    {
      q: 'Does Claivis replace our teachers?',
      a: 'No. Claivis is designed to fill the gap when a qualified teacher is unavailable — not replace teachers who are present. Think of it as an intelligent substitute that ensures no period is ever wasted. When your teacher is in the room, Claivis can still assist as a teaching aid.',
    },
    {
      q: 'What does a student need to interact with Claivis?',
      a: 'Nothing. Students simply speak in their normal voice to ask questions. No devices, no apps, no accounts. All they need is a voice — which they already have.',
    },
    {
      q: 'What hardware does our school need?',
      a: 'A television screen (32 inch or larger), a basic computer or mini-PC, an omnidirectional microphone, and a standard internet connection. Most schools already have most of what\'s needed.',
    },
    {
      q: 'Does it follow our WAEC curriculum specifically?',
      a: 'Yes. You upload your school\'s own scheme of work, and Claivis generates lessons aligned to it. It follows your exact plan — not a generic syllabus — so it teaches exactly what your students need.',
    },
    {
      q: 'What happens when internet is unavailable?',
      a: 'Claivis syncs lessons overnight. Core lesson delivery works offline using pre-downloaded content. Live voice Q&A requires connectivity, but the structured lesson always plays.',
    },
    {
      q: 'How much does it cost compared to hiring a teacher?',
      a: 'Hiring one qualified Physics teacher in Lagos costs approximately ₦1,800,000 per year. Claivis Growth covers all subjects across 10 classrooms for ₦1,350,000 per year — less than one teacher, for your entire school.',
    },
  ]

  return (
    <div className="min-h-screen bg-navy text-white overflow-x-hidden">

      {/* ── NAV ─────────────────────────────────────────────────────────────── */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-navy/95 backdrop-blur-md border-b border-white/5 shadow-xl' : 'bg-transparent'}`}>
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center">
              <span className="text-navy font-bold text-sm" style={{ fontFamily: 'var(--font-display)' }}>C</span>
            </div>
            <span className="font-bold text-lg tracking-tight" style={{ fontFamily: 'var(--font-display)' }}>Claivis</span>
          </a>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-8">
            {[['How it works', '#how'], ['Features', '#features'], ['Pricing', '#pricing'], ['FAQ', '#faq']].map(([label, href]) => (
              <a key={label} href={href} className="text-sm text-white/60 hover:text-white transition-colors">{label}</a>
            ))}
          </div>

          {/* Desktop CTAs */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href="https://chat.whatsapp.com/YOUR_GROUP_LINK"
              target="_blank"
              rel="noopener noreferrer"
              className="wa-btn flex items-center gap-2 text-white text-sm font-medium px-4 py-2 rounded-xl"
            >
              <WhatsAppIcon />
              Join Community
            </a>
            <a href="#waitlist" className="btn-primary bg-accent text-navy font-semibold text-sm px-5 py-2 rounded-xl hover:bg-white transition-colors">
              Join Waitlist
            </a>
          </div>

          {/* Mobile menu toggle */}
          <button className="md:hidden text-white/70 hover:text-white" onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="md:hidden bg-navy-mid border-t border-white/5 px-6 py-4 space-y-3">
            {[['How it works', '#how'], ['Features', '#features'], ['Pricing', '#pricing'], ['FAQ', '#faq']].map(([label, href]) => (
              <a key={label} href={href} onClick={() => setMobileOpen(false)} className="block text-sm text-white/60 hover:text-white py-1">{label}</a>
            ))}
            <div className="pt-2 space-y-2">
              <a href="https://chat.whatsapp.com/YOUR_GROUP_LINK" target="_blank" rel="noopener noreferrer" className="wa-btn flex items-center justify-center gap-2 text-white text-sm font-medium px-4 py-3 rounded-xl w-full">
                <WhatsAppIcon /> Join WhatsApp Community
              </a>
              <a href="#waitlist" onClick={() => setMobileOpen(false)} className="btn-primary block text-center bg-accent text-navy font-semibold text-sm px-5 py-3 rounded-xl w-full">
                Join Waitlist
              </a>
            </div>
          </div>
        )}
      </nav>

      {/* ── HERO ────────────────────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24 pb-16">
        {/* Background orbs */}
        <div className="orb w-96 h-96 bg-blue/20 top-10 -left-32" />
        <div className="orb w-80 h-80 bg-accent/10 top-40 right-0" />
        <div className="orb w-64 h-64 bg-blue/15 bottom-20 left-1/2" />

        {/* Grid texture */}
        <div className="absolute inset-0 opacity-[0.03]"
          style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '60px 60px' }} />

        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 border border-accent/20 bg-accent/5 rounded-full px-4 py-1.5 text-xs text-accent mb-8 animate-fade-in">
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse-slow" />
            Nigeria's first AI teaching agent — now accepting pilot schools
          </div>

          {/* Headline */}
          <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6" style={{ fontFamily: 'var(--font-display)', letterSpacing: '-0.02em' }}>
            <span className="block text-white">When the teacher</span>
            <span className="block text-white">is absent,</span>
            <span className="block gradient-text">Claivis shows up.</span>
          </h1>

          {/* Subheadline */}
          <p className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto mb-10 leading-relaxed">
            An AI teaching agent that delivers curriculum-aligned lessons, answers student questions in real time, and keeps every classroom running — even when no qualified teacher is available.
          </p>

          {/* Waitlist form */}
          <div className="max-w-2xl mx-auto mb-8">
            <WaitlistForm variant="hero" />
          </div>

          {/* WhatsApp CTA */}
          <div className="flex items-center justify-center gap-3 flex-wrap">
            <span className="text-white/30 text-sm">Or</span>
            <a
              href="https://chat.whatsapp.com/YOUR_GROUP_LINK"
              target="_blank"
              rel="noopener noreferrer"
              className="wa-btn inline-flex items-center gap-2 text-white text-sm font-medium px-5 py-2.5 rounded-xl"
            >
              <WhatsAppIcon />
              Join our WhatsApp community
            </a>
            <span className="text-white/30 text-xs">Get early updates, share feedback, shape the product</span>
          </div>

          {/* Social proof strip */}
          <div className="mt-14 flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-white/40">
            <div className="flex items-center gap-2">
              <div className="flex -space-x-2">
                {['1A4A8A', '2563EB', '0F2040', '162B52'].map((c, i) => (
                  <div key={i} className="w-7 h-7 rounded-full border-2 border-navy flex items-center justify-center text-xs font-bold text-white" style={{ background: `#${c}` }}>{String.fromCharCode(65 + i)}</div>
                ))}
              </div>
              <span>Principals already on the waitlist</span>
            </div>
            <span className="hidden sm:block text-white/20">·</span>
            <span>Built for WAEC curriculum</span>
            <span className="hidden sm:block text-white/20">·</span>
            <span>Free pilot for first 5 schools</span>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-white/20 animate-float">
          <span className="text-xs tracking-widest uppercase">Scroll</span>
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </section>

      {/* ── PROBLEM STRIP ──────────────────────────────────────────────────── */}
      <section className="relative bg-navy-mid border-y border-white/5 py-6 overflow-hidden">
        <div className="marquee-inner">
          {[...subjects, ...subjects].map((s, i) => (
            <div key={i} className="flex items-center gap-4 px-4 flex-shrink-0">
              <span className="text-white/20 text-sm font-medium tracking-wide uppercase">{s}</span>
              <span className="w-1 h-1 rounded-full bg-accent/30 flex-shrink-0" />
            </div>
          ))}
        </div>
      </section>

      {/* ── STATS ───────────────────────────────────────────────────────────── */}
      <section className="py-20 px-6 max-w-6xl mx-auto">
        <div className="text-center mb-14 reveal">
          <p className="text-accent text-sm font-medium tracking-widest uppercase mb-3">The reality on the ground</p>
          <h2 className="text-3xl md:text-4xl font-bold" style={{ fontFamily: 'var(--font-display)' }}>
            Nigeria's teacher shortage<br />is not a future problem.
          </h2>
          <p className="text-white/50 mt-3 max-w-xl mx-auto">It is happening in classrooms across the country right now, every single school day.</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((s, i) => (
            <div key={i} className={`card-hover reveal reveal-delay-${i + 1} relative bg-navy-light rounded-2xl p-6 border border-white/5 overflow-hidden`}>
              <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-accent/40 to-transparent" />
              <div className="stat-number text-white mb-1">{s.num}</div>
              <p className="text-white/70 text-sm font-medium leading-snug">{s.label}</p>
              <p className="text-white/30 text-xs mt-1">{s.sub}</p>
            </div>
          ))}
        </div>

        {/* The gap statement */}
        <div className="reveal mt-10 bg-gradient-to-r from-navy-light via-navy-mid to-navy-light rounded-2xl border border-white/5 p-8 text-center">
          <p className="text-white/40 text-sm uppercase tracking-widest mb-2">The bottom line</p>
          <p className="text-xl md:text-2xl text-white font-medium max-w-3xl mx-auto leading-relaxed" style={{ fontFamily: 'var(--font-display)' }}>
            "Every week, thousands of Nigerian students sit in classrooms with no teacher, no lesson, and no learning — because the system cannot supply enough qualified subject teachers."
          </p>
          <div className="mt-4 flex items-center justify-center gap-2 text-accent">
            <div className="h-px w-8 bg-accent/40" />
            <span className="text-xs tracking-widest uppercase">This is what Claivis was built to solve</span>
            <div className="h-px w-8 bg-accent/40" />
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ────────────────────────────────────────────────────── */}
      <section id="how" className="py-20 px-6 max-w-6xl mx-auto">
        <div className="text-center mb-16 reveal">
          <p className="text-accent text-sm font-medium tracking-widest uppercase mb-3">Simple by design</p>
          <h2 className="text-3xl md:text-4xl font-bold" style={{ fontFamily: 'var(--font-display)' }}>
            How Claivis works
          </h2>
          <p className="text-white/50 mt-3 max-w-xl mx-auto">From your scheme of work to a live classroom session in less than a week.</p>
        </div>

        <div className="space-y-6">
          {howSteps.map((step, i) => (
            <div key={i} className={`reveal reveal-delay-${i + 1} card-hover flex flex-col md:flex-row items-start gap-6 bg-navy-light rounded-2xl border border-white/5 p-8 overflow-hidden relative`}>
              <div className={`absolute inset-0 bg-gradient-to-br ${step.color} opacity-60`} />
              <div className="relative flex-shrink-0">
                <div className="w-14 h-14 rounded-2xl border flex items-center justify-center" style={{ borderColor: `${step.accent}40`, background: `${step.accent}15` }}>
                  <span className="font-bold text-xl" style={{ fontFamily: 'var(--font-display)', color: step.accent }}>{step.n}</span>
                </div>
              </div>
              <div className="relative">
                <h3 className="text-lg font-semibold text-white mb-2" style={{ fontFamily: 'var(--font-display)' }}>{step.title}</h3>
                <p className="text-white/60 leading-relaxed">{step.desc}</p>
              </div>
              <div className="hidden md:flex ml-auto relative flex-shrink-0 items-center">
                <ArrowRight className="text-white/10 w-8 h-8" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── DEMO SCENE ──────────────────────────────────────────────────────── */}
      <section className="py-16 px-6 max-w-6xl mx-auto">
        <div className="reveal bg-navy-light rounded-3xl border border-white/5 overflow-hidden">
          {/* Fake browser chrome */}
          <div className="bg-navy-mid px-4 py-3 flex items-center gap-3 border-b border-white/5">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500/60" />
              <div className="w-3 h-3 rounded-full bg-gold/60" />
              <div className="w-3 h-3 rounded-full bg-green-500/60" />
            </div>
            <div className="flex-1 bg-navy/60 rounded-md px-3 py-1 text-white/30 text-xs">claivis.org/dashboard</div>
          </div>

          {/* Dashboard mockup */}
          <div className="grid md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-white/5">
            {/* Sidebar */}
            <div className="bg-navy p-6 space-y-4">
              <p className="text-white/30 text-xs uppercase tracking-widest mb-4">Class Schedule — Today</p>
              {[
                { time: '8:00 AM', subject: 'Physics — SS2A', status: 'completed', teacher: 'Claivis' },
                { time: '9:40 AM', subject: 'Chemistry — SS1B', status: 'live', teacher: 'Claivis' },
                { time: '11:20 AM', subject: 'Mathematics — JSS3', status: 'upcoming', teacher: 'Mr. Adeyemi' },
                { time: '1:00 PM', subject: 'Biology — SS2B', status: 'upcoming', teacher: 'Claivis' },
              ].map((c, i) => (
                <div key={i} className={`flex items-center gap-3 p-3 rounded-xl border ${c.status === 'live' ? 'border-accent/30 bg-accent/5' : 'border-white/5 bg-white/2'}`}>
                  <div className="text-right flex-shrink-0">
                    <p className="text-white/40 text-xs">{c.time}</p>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-white text-sm font-medium truncate">{c.subject}</p>
                    <p className="text-white/40 text-xs">{c.teacher}</p>
                  </div>
                  <div className={`flex-shrink-0 w-2 h-2 rounded-full ${c.status === 'live' ? 'bg-accent animate-pulse' : c.status === 'completed' ? 'bg-green-500/60' : 'bg-white/20'}`} />
                </div>
              ))}
            </div>

            {/* Live session view */}
            <div className="md:col-span-2 p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                    <span className="text-accent text-xs font-medium uppercase tracking-widest">Live Session</span>
                  </div>
                  <h3 className="text-white font-semibold">Chemistry — SS1B · Period 2</h3>
                  <p className="text-white/40 text-sm">Topic: Periodic Table — Group VII Elements</p>
                </div>
                <div className="text-right">
                  <p className="text-white/30 text-xs">Session time</p>
                  <p className="text-white font-mono text-lg">24:17</p>
                </div>
              </div>

              {/* AI character placeholder */}
              <div className="relative bg-navy rounded-2xl border border-white/5 aspect-video flex items-center justify-center mb-6 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-blue/10 via-transparent to-accent/5" />
                <div className="text-center z-10">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue to-accent/60 flex items-center justify-center mx-auto mb-3 animate-float shadow-2xl shadow-blue/20">
                    <span className="text-2xl">🎓</span>
                  </div>
                  <p className="text-white/60 text-sm font-medium">AI Teaching Character</p>
                  <p className="text-white/30 text-xs mt-1">"...Halogens are highly reactive non-metals found in Group VII. Let me explain why..."</p>
                </div>
                {/* Waveform */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-end gap-0.5">
                  {[3,5,8,6,4,7,9,5,3,6,8,4,7,5,3].map((h, i) => (
                    <div key={i} className="w-1 rounded-full bg-accent/40 animate-pulse" style={{ height: `${h * 3}px`, animationDelay: `${i * 0.1}s` }} />
                  ))}
                </div>
              </div>

              {/* Q&A feed */}
              <div className="space-y-2">
                <p className="text-white/30 text-xs uppercase tracking-widest mb-3">Student Questions</p>
                {[
                  { student: 'Student (Back row)', q: 'What makes chlorine more reactive than iodine?', time: '2 min ago', answered: true },
                  { student: 'Student (Front row)', q: 'Is fluorine the most reactive element in all of chemistry?', time: 'Just now', answered: false },
                ].map((item, i) => (
                  <div key={i} className={`flex gap-3 p-3 rounded-xl border ${item.answered ? 'border-white/5 bg-white/2' : 'border-accent/20 bg-accent/5'}`}>
                    <div className="w-6 h-6 rounded-full bg-blue/40 flex items-center justify-center flex-shrink-0 text-xs text-white/60 mt-0.5">?</div>
                    <div className="flex-1">
                      <p className="text-white/40 text-xs mb-0.5">{item.student} · {item.time}</p>
                      <p className="text-white/80 text-sm">{item.q}</p>
                    </div>
                    <div className={`flex-shrink-0 text-xs px-2 py-1 rounded-lg self-start ${item.answered ? 'bg-green-500/10 text-green-400' : 'bg-accent/10 text-accent animate-pulse'}`}>
                      {item.answered ? 'Answered' : 'Answering...'}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FEATURES ────────────────────────────────────────────────────────── */}
      <section id="features" className="py-20 px-6 max-w-6xl mx-auto">
        <div className="text-center mb-16 reveal">
          <p className="text-accent text-sm font-medium tracking-widest uppercase mb-3">Built for real classrooms</p>
          <h2 className="text-3xl md:text-4xl font-bold" style={{ fontFamily: 'var(--font-display)' }}>
            Everything a school needs.<br />Nothing it doesn't.
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((f, i) => (
            <div key={i} className={`card-hover reveal reveal-delay-${(i % 3) + 1} bg-navy-light rounded-2xl border border-white/5 p-6 relative overflow-hidden group`}>
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="text-3xl mb-4">{f.icon}</div>
              <h3 className="text-white font-semibold mb-2" style={{ fontFamily: 'var(--font-display)' }}>{f.title}</h3>
              <p className="text-white/50 text-sm leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── CHALK SECTION — THE COMPARISON ─────────────────────────────────── */}
      <section className="chalk-section py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14 reveal">
            <p className="text-blue text-sm font-medium tracking-widest uppercase mb-3">The honest comparison</p>
            <h2 className="text-3xl md:text-4xl font-bold text-navy" style={{ fontFamily: 'var(--font-display)' }}>
              Claivis costs less than<br />hiring one specialist teacher.
            </h2>
            <p className="text-navy/50 mt-3 max-w-xl mx-auto">And it covers every subject, every classroom, every period — not just one.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Without Claivis */}
            <div className="reveal reveal-delay-1 bg-white rounded-2xl border border-navy/10 p-8 shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-red-50 border border-red-100 flex items-center justify-center text-red-400 text-xl">✗</div>
                <h3 className="font-bold text-navy text-lg" style={{ fontFamily: 'var(--font-display)' }}>Without Claivis</h3>
              </div>
              <ul className="space-y-3">
                {[
                  'Empty classrooms when teachers are absent',
                  'Physics periods missed for weeks — sometimes entire terms',
                  'Students arrive for WAEC unprepared in core subjects',
                  'Principal scrambles to find cover every Monday morning',
                  'Parents complain about wasted fees and poor results',
                  'Hiring one specialist teacher costs ₦1,800,000+ per year',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-navy/70">
                    <span className="text-red-400 mt-0.5 flex-shrink-0">✗</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* With Claivis */}
            <div className="reveal reveal-delay-2 bg-navy rounded-2xl border border-accent/20 p-8 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue via-accent to-blue" />
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent text-xl">✓</div>
                <h3 className="font-bold text-white text-lg" style={{ fontFamily: 'var(--font-display)' }}>With Claivis</h3>
              </div>
              <ul className="space-y-3">
                {[
                  'Every period taught — regardless of teacher availability',
                  'All WAEC subjects covered across every class level',
                  'Students ask questions live and get real answers',
                  'Principal sees lesson reports after every session',
                  'Parents see results improving term over term',
                  'Claivis Growth covers all subjects for ₦1,350,000 per year',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-white/70">
                    <span className="text-accent mt-0.5 flex-shrink-0">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── PRICING ─────────────────────────────────────────────────────────── */}
      <section id="pricing" className="py-20 px-6 max-w-6xl mx-auto">
        <div className="text-center mb-16 reveal">
          <p className="text-accent text-sm font-medium tracking-widest uppercase mb-3">Simple pricing</p>
          <h2 className="text-3xl md:text-4xl font-bold" style={{ fontFamily: 'var(--font-display)' }}>
            One clear price.<br />No hidden fees.
          </h2>
          <p className="text-white/50 mt-3 max-w-xl mx-auto">Paid per academic term. Cancel anytime. First 5 schools get the pilot free.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {pricing.map((plan, i) => (
            <div key={i} className={`reveal reveal-delay-${i + 1} card-hover relative rounded-2xl border overflow-hidden ${plan.highlighted ? 'border-accent/30 bg-navy-light' : 'border-white/5 bg-navy-light'}`}>
              {plan.highlighted && (
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue via-accent to-blue" />
              )}
              {plan.highlighted && (
                <div className="absolute top-4 right-4">
                  <span className="bg-accent/10 border border-accent/20 text-accent text-xs font-medium px-2.5 py-1 rounded-full">Most Popular</span>
                </div>
              )}
              <div className="p-8">
                <h3 className="text-white font-bold text-xl mb-1" style={{ fontFamily: 'var(--font-display)' }}>{plan.name}</h3>
                <p className="text-white/40 text-sm mb-6">{plan.desc}</p>
                <div className="mb-8">
                  <span className="text-4xl font-bold text-white" style={{ fontFamily: 'var(--font-display)' }}>{plan.price}</span>
                  {plan.price !== 'Custom' && <span className="text-white/40 text-sm ml-2">{plan.period}</span>}
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((f, j) => (
                    <li key={j} className="flex items-center gap-3 text-sm text-white/70">
                      <span className="text-accent flex-shrink-0"><CheckIcon /></span>
                      {f}
                    </li>
                  ))}
                </ul>
                <a
                  href="#waitlist"
                  className={`btn-primary block text-center font-semibold text-sm py-3 rounded-xl transition-colors ${plan.highlighted ? 'bg-accent text-navy hover:bg-white' : 'bg-white/5 text-white border border-white/10 hover:bg-white/10'}`}
                >
                  {plan.cta}
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Pilot callout */}
        <div className="reveal mt-8 text-center">
          <div className="inline-flex items-center gap-3 bg-gold/5 border border-gold/20 rounded-2xl px-6 py-4">
            <span className="text-gold text-xl">🎯</span>
            <p className="text-sm text-white/70">
              <span className="text-gold font-semibold">Free pilot for the first 5 schools.</span> No payment, no commitment — just real results.{' '}
              <a href="#waitlist" className="text-gold hover:underline">Apply now →</a>
            </p>
          </div>
        </div>
      </section>

      {/* ── WHATSAPP CTA BAND ────────────────────────────────────────────────── */}
      <section className="py-16 px-6 bg-navy-mid border-y border-white/5">
        <div className="max-w-4xl mx-auto reveal">
          <div className="flex flex-col md:flex-row items-center gap-8 bg-navy-light rounded-3xl border border-white/5 p-8 md:p-10 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 via-transparent to-transparent" />
            <div className="relative flex-1 text-center md:text-left">
              <div className="inline-flex items-center gap-2 bg-green-500/10 border border-green-500/20 rounded-full px-3 py-1 text-green-400 text-xs font-medium mb-3">
                <WhatsAppIcon />
                WhatsApp Community
              </div>
              <h3 className="text-2xl font-bold text-white mb-2" style={{ fontFamily: 'var(--font-display)' }}>
                Shape the future of Claivis
              </h3>
              <p className="text-white/50 text-sm leading-relaxed max-w-lg">
                Join our WhatsApp community for school principals and educators. Get early product updates, share what your school needs, ask questions, and help us build something that actually works for Nigerian classrooms.
              </p>
              <div className="mt-4 flex flex-wrap gap-3 justify-center md:justify-start">
                {['Early product previews', 'Direct founder access', 'Peer principal network', 'Influence the roadmap'].map((b, i) => (
                  <span key={i} className="text-xs text-white/40 border border-white/10 rounded-full px-3 py-1">{b}</span>
                ))}
              </div>
            </div>
            <div className="relative flex-shrink-0 text-center">
              <a
                href="https://chat.whatsapp.com/YOUR_GROUP_LINK"
                target="_blank"
                rel="noopener noreferrer"
                className="wa-btn inline-flex items-center gap-3 text-white font-semibold text-base px-8 py-4 rounded-2xl"
              >
                <WhatsAppIcon />
                Join the Community
              </a>
              <p className="text-white/30 text-xs mt-3">Free to join. Leave anytime.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ─────────────────────────────────────────────────────────────── */}
      <section id="faq" className="py-20 px-6 max-w-3xl mx-auto">
        <div className="text-center mb-14 reveal">
          <p className="text-accent text-sm font-medium tracking-widest uppercase mb-3">Questions answered</p>
          <h2 className="text-3xl md:text-4xl font-bold" style={{ fontFamily: 'var(--font-display)' }}>
            Everything you want to know
          </h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <FAQItem key={i} q={faq.q} a={faq.a} delay={i} />
          ))}
        </div>
      </section>

      {/* ── WAITLIST SECTION ─────────────────────────────────────────────────── */}
      <section id="waitlist" className="py-24 px-6 relative overflow-hidden">
        <div className="orb w-96 h-96 bg-blue/20 top-0 left-1/4 -translate-x-1/2" />
        <div className="orb w-64 h-64 bg-accent/10 bottom-0 right-1/4" />

        <div className="relative z-10 max-w-2xl mx-auto text-center">
          <div className="reveal">
            <div className="inline-flex items-center gap-2 border border-accent/20 bg-accent/5 rounded-full px-4 py-1.5 text-xs text-accent mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse-slow" />
              Limited pilot spots — first 5 schools only
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4 leading-tight" style={{ fontFamily: 'var(--font-display)' }}>
              Ready to end<br />
              <span className="gradient-text">empty classrooms?</span>
            </h2>
            <p className="text-white/50 mb-8 leading-relaxed">
              Join the waitlist today. The first 5 schools receive a completely free one-term pilot — no payment, no contract, just Claivis teaching in your classrooms.
            </p>
          </div>

          <div className="reveal reveal-delay-2 bg-navy-light rounded-2xl border border-white/5 p-6 md:p-8">
            <WaitlistForm variant="inline" />

            <div className="mt-6 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-white/30">
              <div className="flex items-center gap-2"><CheckIcon /><span>No spam, ever</span></div>
              <div className="flex items-center gap-2"><CheckIcon /><span>No payment required</span></div>
              <div className="flex items-center gap-2"><CheckIcon /><span>Cancel anytime</span></div>
            </div>
          </div>

          {/* WhatsApp alternative */}
          <div className="reveal reveal-delay-3 mt-6 flex items-center justify-center gap-3">
            <span className="text-white/30 text-sm">Prefer WhatsApp?</span>
            <a
              href="https://chat.whatsapp.com/YOUR_GROUP_LINK"
              target="_blank"
              rel="noopener noreferrer"
              className="wa-btn inline-flex items-center gap-2 text-white text-sm font-medium px-4 py-2 rounded-xl"
            >
              <WhatsAppIcon />
              Join our community instead
            </a>
          </div>
        </div>
      </section>

      {/* ── FOOTER ──────────────────────────────────────────────────────────── */}
      <footer className="bg-navy-mid border-t border-white/5 py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-10 mb-10">
            {/* Brand */}
            <div className="md:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center">
                  <span className="text-navy font-bold text-sm" style={{ fontFamily: 'var(--font-display)' }}>C</span>
                </div>
                <span className="font-bold text-lg" style={{ fontFamily: 'var(--font-display)' }}>Claivis</span>
              </div>
              <p className="text-white/40 text-sm leading-relaxed max-w-xs">
                Nigeria's first AI teaching infrastructure. Built to ensure that no student ever sits in an empty classroom again.
              </p>
              <div className="flex items-center gap-3 mt-4">
                <a
                  href="https://chat.whatsapp.com/YOUR_GROUP_LINK"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="wa-btn inline-flex items-center gap-2 text-white text-xs font-medium px-3 py-2 rounded-lg"
                >
                  <WhatsAppIcon />
                  WhatsApp Community
                </a>
              </div>
            </div>

            {/* Links */}
            <div>
              <p className="text-white/40 text-xs uppercase tracking-widest mb-4">Product</p>
              <ul className="space-y-2">
                {['How it works', 'Features', 'Pricing', 'Request Demo'].map(l => (
                  <li key={l}><a href="#" className="text-white/50 hover:text-white text-sm transition-colors">{l}</a></li>
                ))}
              </ul>
            </div>

            <div>
              <p className="text-white/40 text-xs uppercase tracking-widest mb-4">Contact</p>
              <ul className="space-y-2 text-sm text-white/50">
                <li><a href="mailto:hello@claivis.org" className="hover:text-white transition-colors">hello@claivis.org</a></li>
                <li><a href="https://claivis.org" className="hover:text-white transition-colors">claivis.org</a></li>
                <li className="text-white/30">Lagos, Nigeria</li>
              </ul>
              <div className="mt-4">
                <p className="text-white/40 text-xs uppercase tracking-widest mb-2">Legal</p>
                <ul className="space-y-1">
                  {['Privacy Policy', 'Terms of Service'].map(l => (
                    <li key={l}><a href="#" className="text-white/30 hover:text-white/60 text-xs transition-colors">{l}</a></li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="border-t border-white/5 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-white/20 text-xs">© {new Date().getFullYear()} Claivis Limited. All rights reserved.</p>
            <p className="text-white/20 text-xs">Built in Nigeria, for Nigeria — and the world.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

// ── FAQ Item component ─────────────────────────────────────────────────────────
function FAQItem({ q, a, delay }: { q: string; a: string; delay: number }) {
  const [open, setOpen] = useState(false)
  return (
    <div className={`reveal reveal-delay-${(delay % 4) + 1} bg-navy-light rounded-2xl border border-white/5 overflow-hidden`}>
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-4 p-6 text-left group"
      >
        <span className="font-medium text-white/90 group-hover:text-white transition-colors text-sm md:text-base">{q}</span>
        <div className={`flex-shrink-0 w-8 h-8 rounded-lg border border-white/10 flex items-center justify-center transition-all ${open ? 'bg-accent/10 border-accent/20 rotate-45' : 'bg-white/5'}`}>
          <svg className="w-4 h-4 text-white/50" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12M6 12h12" />
          </svg>
        </div>
      </button>
      {open && (
        <div className="px-6 pb-6">
          <div className="h-px bg-white/5 mb-4" />
          <p className="text-white/50 text-sm leading-relaxed">{a}</p>
        </div>
      )}
    </div>
  )
}
