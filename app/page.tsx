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
function WaitlistForm({ variant = 'hero' }: { variant?: 'hero' | 'inline' | 'footer' }) {
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [school, setSchool] = useState('')
  const [state, setState] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [msg, setMsg] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setState('loading')
    // Simulating API call for visual prototype
    setTimeout(() => {
      setState('success')
      setMsg('You\'re on the list! We\'ll be in touch very soon.')
    }, 1500)
  }

  const isFooter = variant === 'footer'

  if (state === 'success') {
    return (
      <div className={`rounded-2xl border p-6 text-center ${isFooter ? 'bg-navy-mid border-white/10' : 'border-blue/20 bg-blue/5'} ${variant !== 'hero' ? 'max-w-lg mx-auto' : ''}`}>
        <div className={`w-12 h-12 rounded-full border flex items-center justify-center mx-auto mb-3 ${isFooter ? 'bg-accent/10 border-accent/20 text-accent' : 'bg-blue/10 border-blue/20 text-blue'}`}>
          <CheckIcon />
        </div>
        <p className={`font-semibold text-lg mb-1 ${isFooter ? 'text-white' : 'text-blue'}`}>You're on the list.</p>
        <p className={`text-sm ${isFooter ? 'text-white/60' : 'text-text-muted'}`}>{msg}</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className={`space-y-4 ${variant === 'inline' ? 'max-w-lg mx-auto' : ''}`}>
      <div className="flex flex-col md:flex-row gap-4">
        <input
          type="text"
          placeholder="Your name"
          value={name}
          onChange={e => setName(e.target.value)}
          className={`input-glow flex-1 rounded-xl px-4 py-3 text-sm transition-colors ${isFooter ? 'bg-white/10 border border-white/20 text-white placeholder-white/50 focus:border-white focus:bg-white/15' : 'bg-surface border border-border text-text-main placeholder-text-muted focus:border-blue'}`}
          required
        />
        <input
          type="text"
          placeholder="School name (optional)"
          value={school}
          onChange={e => setSchool(e.target.value)}
          className={`input-glow flex-1 rounded-xl px-4 py-3 text-sm transition-colors ${isFooter ? 'bg-white/10 border border-white/20 text-white placeholder-white/50 focus:border-white focus:bg-white/15' : 'bg-surface border border-border text-text-main placeholder-text-muted focus:border-blue'}`}
        />
      </div>
      <div className="flex flex-col md:flex-row gap-4">
        <input
          type="email"
          placeholder="School email address"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className={`input-glow flex-[2] rounded-xl px-4 py-3 text-sm transition-colors ${isFooter ? 'bg-white/10 border border-white/20 text-white placeholder-white/50 focus:border-white focus:bg-white/15' : 'bg-surface border border-border text-text-main placeholder-text-muted focus:border-blue'}`}
          required
        />
        <button
          type="submit"
          disabled={state === 'loading'}
          className={`btn-primary flex-1 font-semibold text-sm px-6 py-3 rounded-xl transition-all flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed ${isFooter ? 'bg-accent text-navy hover:bg-white' : 'bg-blue text-white hover:bg-blue/90 shadow-lg shadow-blue/20 hover:shadow-blue/30'}`}
        >
          {state === 'loading' ? (
            <span className="flex items-center gap-2">
              <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Joining...
            </span>
          ) : (
            <>Join Waitlist <ArrowRight /></>
          )}
        </button>
      </div>
      <p className={`text-xs ${isFooter ? 'text-white/30' : 'text-text-muted'}`}>No spam. No commitment. Just early access.</p>
    </form>
  )
}


function BrowserChrome() {
  return (
    <div className="w-full h-12 bg-white border-b border-border flex items-center px-4 gap-4 z-20 shrink-0">
      <div className="flex gap-2">
        <div className="w-3 h-3 rounded-full bg-red-400" />
        <div className="w-3 h-3 rounded-full bg-amber-400" />
        <div className="w-3 h-3 rounded-full bg-green-400" />
      </div>
      <div className="flex-1 bg-base border border-border rounded-md h-7 flex items-center px-3 justify-center text-xs text-text-muted font-medium">
        <span className="opacity-50 mr-1">🔒</span> claivis.org/dashboard
      </div>
    </div>
  )
}

function MockupContent({ step }: { step: number }) {
  if (step === 0) return (
    <div className="h-full border-2 border-dashed border-blue/30 rounded-2xl bg-blue/5 flex flex-col items-center justify-center text-center p-8 relative overflow-hidden">
      <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-sm mb-4 text-blue">
        <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>
      </div>
      <h4 className="text-xl font-bold text-text-main mb-2">Upload Curriculum</h4>
      <p className="text-text-muted text-sm max-w-xs mb-6">Drag and drop your PDF, Word, or Excel scheme of work here.</p>
      <div className="bg-white rounded-xl shadow-sm border border-border p-3 w-full max-w-xs flex items-center gap-3 animate-fade-up">
        <div className="w-8 h-8 bg-green-100 rounded text-green-600 flex items-center justify-center text-xs font-bold">XLS</div>
        <div className="flex-1 text-left">
          <div className="text-xs font-bold text-text-main">Term_1_Scheme.xlsx</div>
          <div className="text-[10px] text-text-muted">Parsing 12 subjects...</div>
        </div>
        <div className="w-4 h-4 border-2 border-t-blue border-border rounded-full animate-spin" />
      </div>
    </div>
  )
  if (step === 1) return (
    <div className="h-full flex flex-col p-6 bg-base">
      <div className="flex justify-between items-center mb-4">
        <h4 className="font-bold text-text-main">Weekly Schedule</h4>
        <div className="text-xs font-bold text-blue bg-blue/10 px-3 py-1 rounded-full">SS2 Science</div>
      </div>
      <div className="flex-1 bg-white border border-border rounded-xl shadow-sm overflow-hidden flex">
        <div className="w-16 border-r border-border bg-base text-[10px] text-text-muted font-medium py-2 flex flex-col justify-around text-center">
          <span>8:00</span><span>9:00</span><span>10:00</span><span>11:00</span><span>12:00</span>
        </div>
        <div className="flex-1 grid grid-cols-3 divide-x divide-border">
          {['Mon', 'Tue', 'Wed'].map((day, d) => (
            <div key={day} className="relative">
              <div className="text-center text-[10px] font-bold text-text-muted py-1 border-b border-border bg-base">{day}</div>
              <div className="absolute top-[10%] left-1 right-1 sm:left-2 sm:right-2 h-[20%] bg-blue/10 border border-blue/20 rounded-md p-1 sm:p-2 flex flex-col justify-center hover:bg-blue hover:text-white transition-colors cursor-pointer group overflow-hidden">
                <div className="text-[9px] sm:text-[10px] font-bold text-blue group-hover:text-white leading-tight truncate">Physics</div>
                <div className="text-[7px] sm:text-[8px] text-text-muted group-hover:text-white/80 truncate mt-0.5">Period 1</div>
              </div>
              <div className="absolute top-[35%] left-1 right-1 sm:left-2 sm:right-2 h-[20%] bg-gold/10 border border-gold/20 rounded-md p-1 sm:p-2 flex flex-col justify-center hover:bg-gold hover:text-white transition-colors cursor-pointer group overflow-hidden">
                <div className="text-[9px] sm:text-[10px] font-bold text-gold group-hover:text-white leading-tight truncate">Math</div>
                <div className="text-[7px] sm:text-[8px] text-text-muted group-hover:text-white/80 truncate mt-0.5">Period 2</div>
              </div>
              {d === 1 && (
                <div className="absolute top-[65%] left-1 right-1 sm:left-2 sm:right-2 h-[20%] bg-accent/10 border border-accent/20 rounded-md p-1 sm:p-2 flex flex-col justify-center hover:bg-accent-dark hover:text-white transition-colors cursor-pointer group shadow-lg shadow-accent/20 overflow-hidden">
                  <div className="text-[9px] sm:text-[10px] font-bold text-accent-dark group-hover:text-white flex justify-between items-center gap-0.5 w-full leading-tight">
                    <span className="truncate">Biology</span>
                    <span className="animate-pulse flex-shrink-0 text-[8px] sm:text-[10px]">●</span>
                  </div>
                  <div className="text-[7px] sm:text-[8px] text-text-muted group-hover:text-white/80 truncate mt-0.5">Claivis Agent</div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
  if (step === 2) return (
    <div className="h-full bg-white rounded-xl shadow-md border border-border overflow-hidden flex flex-col relative">
      <div className="flex-1 bg-gradient-to-br from-blue-mid to-navy flex flex-col items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIi8+PC9zdmc+')] opacity-30" />
        <div className="w-24 h-24 rounded-full bg-white/10 backdrop-blur-md border border-white/20 shadow-2xl flex items-center justify-center animate-float z-10 relative">
          <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-accent to-blue flex items-center justify-center text-3xl shadow-inner">🤖</div>
          <div className="absolute inset-0 rounded-full border border-white/50 animate-ping opacity-50"></div>
        </div>
        <div className="absolute bottom-4 left-4 right-4 bg-navy/80 backdrop-blur-md rounded-lg p-3 border border-white/10">
          <p className="text-white text-sm text-center">"Today, we will be looking at Newton's Laws of Motion..."</p>
        </div>
      </div>
      <div className="h-14 bg-white border-t border-border flex items-center px-4 justify-between">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
          <span className="text-xs font-bold text-text-main">LIVE</span>
          <span className="text-xs text-text-muted border-l border-border pl-2 ml-1">Physics SS2</span>
        </div>
        <div className="flex gap-1">
          {[3, 5, 8, 6, 4, 7, 9, 5].map((h, i) => (
            <div key={i} className="w-1 rounded-full bg-blue animate-pulse" style={{ height: `${h * 1.5}px`, animationDelay: `${i * 0.1}s` }} />
          ))}
        </div>
      </div>
    </div>
  )
  if (step === 3) return (
    <div className="h-full bg-white rounded-xl shadow-md border border-border flex flex-col p-3 sm:p-4">
      <h4 className="font-bold text-text-main mb-3 sm:mb-4 border-b border-border pb-2 text-sm sm:text-base">Live Session Transcript</h4>
      <div className="flex-1 space-y-3 sm:space-y-4 overflow-hidden relative">
        <div className="flex gap-2 sm:gap-3">
          <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-blue/10 flex items-center justify-center text-sm sm:text-xl">🤖</div>
          <div className="flex-1 bg-surface-alt rounded-2xl rounded-tl-sm p-2.5 sm:p-3 text-[11px] sm:text-sm text-text-main leading-relaxed">
            Force is equal to mass times acceleration. F = ma. Are there any questions on this formula?
          </div>
        </div>
        <div className="flex gap-2 sm:gap-3 flex-row-reverse animate-fade-up">
          <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-gold/10 flex items-center justify-center text-xs sm:text-sm font-bold text-gold">S</div>
          <div className="flex-1 bg-gold/5 border border-gold/20 rounded-2xl rounded-tr-sm p-2.5 sm:p-3 text-[11px] sm:text-sm text-text-main leading-relaxed">
            <span className="text-[9px] sm:text-[10px] text-text-muted block mb-0.5 sm:mb-1">Student 🎤</span>
            Yes, does that mean a heavier object always hits the ground faster?
          </div>
        </div>
        <div className="flex gap-2 sm:gap-3 animate-fade-up" style={{ animationDelay: '1s' }}>
          <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-blue/10 flex items-center justify-center text-sm sm:text-xl shadow-lg shadow-blue/20">🤖</div>
          <div className="flex-1 bg-blue text-white rounded-2xl rounded-tl-sm p-2.5 sm:p-3 text-[11px] sm:text-sm shadow-md relative leading-relaxed">
            <div className="absolute -left-1 top-2.5 sm:top-3 w-2.5 sm:w-3 h-2.5 sm:h-3 bg-blue rotate-45"></div>
            That's a great question! Actually, in a vacuum, all objects fall at the same rate regardless of mass due to gravity...
          </div>
        </div>
      </div>
    </div>
  )
  return null
}

// ── Main Page ──────────────────────────────────────────────────────────────────
export default function Home() {
  useReveal()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeStep, setActiveStep] = useState(0)
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40)
      
      // Calculate active step for desktop cards
      if (window.innerWidth >= 1024) {
        let currentStep = 0
        cardRefs.current.forEach((ref, index) => {
          if (ref) {
            const rect = ref.getBoundingClientRect()
            // If the card's top is in the top 60% of the viewport, it's active
            if (rect.top < window.innerHeight * 0.6) {
              currentStep = index
            }
          }
        })
        setActiveStep(currentStep)
      }
    }
    
    window.addEventListener('scroll', onScroll, { passive: true })
    // Trigger once on mount
    onScroll()
    
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
      title: 'Upload Curriculum',
      desc: 'Share your school\'s scheme of work — in Word, PDF, or Excel. Claivis reads it, structures it, and builds lesson plans automatically.',
      color: 'blue',
    },
    {
      n: '02',
      title: 'Schedule Classes',
      desc: 'Map your existing school timetable to the platform. Claivis knows what to teach, which class, which period — every week of the term.',
      color: 'accent',
    },
    {
      n: '03',
      title: 'Claivis Teaches',
      desc: 'When the period starts, the AI character appears on your classroom screen and begins the structured, visual lesson.',
      color: 'gold',
    },
    {
      n: '04',
      title: 'Live Q&A',
      desc: 'A student asks a question out loud. Claivis hears, responds clearly, confirms understanding, and continues the lesson seamlessly.',
      color: 'blue-mid',
    },
  ]

  const subjects = ['Physics', 'Chemistry', 'Biology', 'Mathematics', 'Further Mathematics', 'English Language', 'Agricultural Science', 'Economics', 'Geography', 'Civic Education', 'Computer Science', 'Literature', 'Government']

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
    <div className="min-h-screen bg-base text-text-main">

      {/* ── NAV ─────────────────────────────────────────────────────────────── */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/90 backdrop-blur-md border-b border-border shadow-sm py-3' : 'bg-transparent py-5'}`}>
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue to-accent flex items-center justify-center shadow-lg shadow-blue/20">
              <span className="text-white font-bold text-lg" style={{ fontFamily: 'var(--font-display)' }}>C</span>
            </div>
            <span className="font-bold text-xl tracking-tight text-text-main" style={{ fontFamily: 'var(--font-display)' }}>Claivis</span>
          </a>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-8">
            {[['How it works', '#how'], ['Features', '#features'], ['FAQ', '#faq']].map(([label, href]) => ( // ['Pricing', '#pricing'] is in between Features and FAQ
              <a key={label} href={href} className="text-sm font-medium text-text-muted hover:text-blue transition-colors">{label}</a>
            ))}
          </div>

          {/* Desktop CTAs */}
          <div className="hidden md:flex items-center gap-4">
            <a
              href="https://chat.whatsapp.com/YOUR_GROUP_LINK"
              target="_blank"
              rel="noopener noreferrer"
              className="text-text-muted hover:text-[#25D366] transition-colors"
              title="Join WhatsApp Community"
            >
              <WhatsAppIcon />
            </a>
            <a href="#waitlist" className="btn-primary bg-blue text-white font-semibold text-sm px-5 py-2.5 rounded-xl hover:bg-blue/90 shadow-md shadow-blue/20 transition-all">
              Join Waitlist
            </a>
          </div>

          {/* Mobile menu toggle */}
          <button className="md:hidden text-text-main" onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-white border-b border-border shadow-lg px-6 py-4 space-y-4">
            {[['How it works', '#how'], ['Features', '#features'], ['FAQ', '#faq']].map(([label, href]) => ( // ['Pricing', '#pricing'] is in between Features and FAQ
              <a key={label} href={href} onClick={() => setMobileOpen(false)} className="block text-sm font-medium text-text-muted hover:text-blue py-2">{label}</a>
            ))}
            <div className="pt-4 border-t border-border space-y-3">
              <a href="https://chat.whatsapp.com/YOUR_GROUP_LINK" target="_blank" rel="noopener noreferrer" className="wa-btn flex items-center justify-center gap-2 text-white text-sm font-medium px-4 py-3 rounded-xl w-full">
                <WhatsAppIcon /> Join WhatsApp Community
              </a>
              <a href="#waitlist" onClick={() => setMobileOpen(false)} className="btn-primary block text-center bg-blue text-white font-semibold text-sm px-5 py-3 rounded-xl w-full">
                Join Waitlist
              </a>
            </div>
          </div>
        )}
      </nav>

      {/* ── HERO ────────────────────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex items-center justify-center pt-32 pb-16 overflow-hidden bg-gradient-to-b from-white to-base">
        {/* Abstract Background Elements */}
        <div className="absolute top-20 right-0 w-[600px] h-[600px] bg-blue/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-[-100px] w-[500px] h-[500px] bg-accent/5 rounded-full blur-3xl pointer-events-none" />

        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9IiNDQkQ1RTEiIGZpbGwtb3BhY2l0eT0iMC41Ii8+PC9zdmc+')] [mask-image:linear-gradient(to_bottom,white,transparent)] pointer-events-none opacity-60" />

        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 border border-blue/10 bg-blue/5 rounded-full px-4 py-1.5 text-xs font-semibold text-blue mb-8 animate-fade-in shadow-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue"></span>
            </span>
            Nigeria's first AI teaching agent — now accepting pilot schools
          </div>

          {/* Headline */}
          <h1 className="text-5xl md:text-7xl font-extrabold leading-[1.1] mb-6 text-text-main" style={{ fontFamily: 'var(--font-display)', letterSpacing: '-0.02em' }}>
            When the teacher<br />
            is absent,<br />
            <span className="gradient-text">Claivis shows up.</span>
          </h1>

          {/* Subheadline */}
          <p className="text-lg md:text-xl text-text-muted max-w-2xl mx-auto mb-10 leading-relaxed font-medium">
            An AI teaching agent that delivers curriculum-aligned lessons, answers student questions in real time, and keeps every classroom running.
          </p>

          {/* Waitlist form */}
          <div className="max-w-2xl mx-auto mb-8">
            <WaitlistForm variant="hero" />
          </div>

          {/* Social proof strip */}
          <div className="mt-14 flex flex-col sm:flex-row items-center justify-center gap-6 text-sm font-medium text-text-muted">
            <div className="flex items-center gap-3">
              <div className="flex -space-x-2">
                {['1A4A8A', '2563EB', '00D4FF', 'F5A623'].map((c, i) => (
                  <div key={i} className="w-8 h-8 rounded-full border-2 border-white flex items-center justify-center text-xs font-bold text-white shadow-sm" style={{ background: `#${c}` }}>
                    {String.fromCharCode(65 + i)}
                  </div>
                ))}
              </div>
              <span>Principals already on the waitlist</span>
            </div>
            <span className="hidden sm:block text-border">|</span>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-[#25D366]" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" /></svg>
              <span>Built for WAEC curriculum</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── PROBLEM STRIP ──────────────────────────────────────────────────── */}
      <section className="relative bg-white border-y border-border py-5 overflow-hidden shadow-sm">
        <div className="marquee-inner">
          {[...subjects, ...subjects].map((s, i) => (
            <div key={i} className="flex items-center gap-6 px-6 flex-shrink-0">
              <span className="text-text-muted text-sm font-bold tracking-widest uppercase">{s}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-blue/20 flex-shrink-0" />
            </div>
          ))}
        </div>
      </section>

      {/* ── STATS ───────────────────────────────────────────────────────────── */}
      <section className="py-24 px-6 max-w-6xl mx-auto">
        <div className="text-center mb-16 reveal">
          <p className="text-blue text-sm font-bold tracking-widest uppercase mb-3">The reality on the ground</p>
          <h2 className="text-3xl md:text-5xl font-extrabold text-text-main" style={{ fontFamily: 'var(--font-display)' }}>
            Nigeria's teacher shortage<br />is not a future problem.
          </h2>
          <p className="text-text-muted mt-4 max-w-2xl mx-auto text-lg">It is happening in classrooms across the country right now, every single school day.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((s, i) => (
            <div key={i} className={`card-hover reveal reveal-delay-${i + 1} bg-white rounded-[2rem] p-6 md:p-8 border border-border shadow-sm relative overflow-hidden group flex flex-col justify-between h-full transition-shadow duration-300 hover:shadow-xl hover:shadow-blue/5`}>
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-blue via-blue to-accent opacity-0 group-hover:opacity-100 transition-all duration-300 ease-in-out" />
              <div className="mb-4">
                <div className="text-text-main tracking-tighter font-semibold" style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.75rem, 3.5vw, 3rem)' }}>{s.num}</div>
              </div>
              <div>
                <p className="text-text-main font-semibold leading-tight text-lg mb-1">{s.label}</p>
                <p className="text-text-muted text-sm">{s.sub}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── HOW IT WORKS (STACKING CARDS SCROLL EFFECT) ──────────────────── */}
      <section id="how" className="py-24 bg-white border-y border-border">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-20 reveal">
            <p className="text-blue text-sm font-bold tracking-widest uppercase mb-3">Simple by design</p>
            <h2 className="text-4xl md:text-5xl font-extrabold text-text-main" style={{ fontFamily: 'var(--font-display)' }}>
              From syllabus to live<br />lesson in minutes.
            </h2>
          </div>

          
          {/* Desktop Layout (Sticky Stacking Cards) */}
          <div className="hidden lg:flex flex-row gap-16 lg:gap-24 items-start relative pb-32">
            {/* Left side: Static Steps */}
            <div className="w-[45%] sticky top-32 space-y-10 relative z-10 shrink-0">
              {/* Timeline line */}
              <div className="absolute left-8 top-10 bottom-10 w-0.5 bg-border hidden md:block" />
              
              {howSteps.map((step, i) => (
                <div 
                  key={i} 
                  className={`flex items-start gap-6 relative transition-all duration-500 ease-out ${activeStep === i ? 'opacity-100 translate-x-2' : 'opacity-40'}`}
                >
                  <div className={`w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0 border-2 transition-all duration-500 ${activeStep >= i ? 'bg-blue text-white border-blue shadow-lg shadow-blue/20 scale-105' : 'bg-surface border-border text-text-muted'}`}>
                    <span className="font-bold text-xl font-mono">{step.n}</span>
                  </div>
                  <div className="pt-3">
                    <h3 className={`text-2xl font-bold mb-2 transition-colors ${activeStep === i ? 'text-text-main' : 'text-text-main'}`} style={{ fontFamily: 'var(--font-display)' }}>
                      {step.title}
                    </h3>
                    <p className="text-text-muted leading-relaxed text-lg">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Right side: Stacking Cards */}
            <div className="w-[55%] space-y-[40vh]">
              {[0, 1, 2, 3].map((stepIndex) => (
                <div 
                  key={stepIndex}
                  ref={el => { cardRefs.current[stepIndex] = el }}
                  data-index={stepIndex}
                  className="sticky top-32 h-[500px] md:h-[600px] w-full bg-base rounded-3xl border border-border shadow-2xl overflow-hidden flex flex-col transition-transform duration-700 ease-out origin-top"
                  style={{ 
                    zIndex: (stepIndex + 1) * 10, 
                    transform: activeStep > stepIndex ? `scale(${1 - (activeStep - stepIndex) * 0.04})` : 'scale(1)' 
                  }}
                >
                  <BrowserChrome />
                  <div className="flex-1 p-6 relative overflow-hidden bg-base">
                    <MockupContent step={stepIndex} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Mobile Layout (Interleaved Text and Cards) */}
          <div className="flex lg:hidden flex-col gap-20">
            {howSteps.map((step, i) => (
              <div key={i} className="flex flex-col gap-8">
                {/* Text Block */}
                <div className="flex items-start gap-5">
                  <div className="w-14 h-14 rounded-2xl bg-blue text-white shadow-lg shadow-blue/20 flex items-center justify-center flex-shrink-0 border-2 border-blue font-bold text-xl font-mono">
                    {step.n}
                  </div>
                  <div className="pt-2">
                    <h3 className="text-2xl font-bold mb-2 text-text-main" style={{ fontFamily: 'var(--font-display)' }}>
                      {step.title}
                    </h3>
                    <p className="text-text-muted leading-relaxed">{step.desc}</p>
                  </div>
                </div>
                
                {/* Mockup Card */}
                <div className="h-[450px] sm:h-[500px] w-full bg-base rounded-3xl border border-border shadow-2xl overflow-hidden flex flex-col">
                  <BrowserChrome />
                  <div className="flex-1 p-4 sm:p-6 relative overflow-hidden bg-base">
                    <MockupContent step={i} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURES ────────────────────────────────────────────────────────── */}
      <section id="features" className="py-24 px-6 max-w-6xl mx-auto">
        <div className="text-center mb-16 reveal">
          <p className="text-blue text-sm font-bold tracking-widest uppercase mb-3">Built for real classrooms</p>
          <h2 className="text-3xl md:text-5xl font-extrabold text-text-main" style={{ fontFamily: 'var(--font-display)' }}>
            Everything a school needs.<br />Nothing it doesn't.
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <div key={i} className={`card-hover reveal reveal-delay-${(i % 3) + 1} bg-white rounded-3xl border border-border p-8 relative overflow-hidden group shadow-sm`}>
              <div className="w-12 h-12 rounded-xl bg-blue/5 text-2xl flex items-center justify-center mb-6 text-blue group-hover:scale-110 group-hover:bg-blue/10 transition-all">{f.icon}</div>
              <h3 className="text-text-main text-xl font-bold mb-3" style={{ fontFamily: 'var(--font-display)' }}>{f.title}</h3>
              <p className="text-text-muted text-sm leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── CHALK SECTION — THE COMPARISON ─────────────────────────────────── */}
      <section className="bg-blue py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16 reveal">
            <p className="text-accent text-sm font-bold tracking-widest uppercase mb-3">The honest comparison</p>
            <h2 className="text-3xl md:text-5xl font-extrabold text-white" style={{ fontFamily: 'var(--font-display)' }}>
              Claivis costs less than<br />hiring one specialist teacher.
            </h2>
            <p className="text-white/70 mt-4 max-w-xl mx-auto text-lg">And it covers every subject, every classroom, every period — not just one.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Without Claivis */}
            <div className="reveal reveal-delay-1 bg-white rounded-3xl p-8 md:p-10 shadow-2xl relative overflow-hidden">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 rounded-2xl bg-red-50 flex items-center justify-center text-red-500 text-2xl font-bold">✗</div>
                <h3 className="font-extrabold text-text-main text-2xl" style={{ fontFamily: 'var(--font-display)' }}>Without Claivis</h3>
              </div>
              <ul className="space-y-4">
                {[
                  'Empty classrooms when teachers are absent',
                  'Physics periods missed for weeks',
                  'Students arrive for WAEC unprepared',
                  'Principal scrambles to find cover',
                  'Parents complain about wasted fees',
                  'Hiring one specialist costs ₦1,800,000+/yr',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-base text-text-muted font-medium">
                    <span className="text-red-400 mt-1 flex-shrink-0">✗</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* With Claivis */}
            <div className="reveal reveal-delay-2 bg-navy rounded-3xl p-8 md:p-10 shadow-2xl shadow-navy/50 relative overflow-hidden border border-white/10">
              <div className="absolute inset-0 bg-gradient-to-br from-blue/20 via-transparent to-accent/10" />
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-blue via-accent to-blue" />

              <div className="flex items-center gap-4 mb-8 relative z-10">
                <div className="w-12 h-12 rounded-2xl bg-accent/20 border border-accent/30 flex items-center justify-center text-accent text-2xl font-bold">✓</div>
                <h3 className="font-extrabold text-white text-2xl" style={{ fontFamily: 'var(--font-display)' }}>With Claivis</h3>
              </div>
              <ul className="space-y-4 relative z-10">
                {[
                  'Every period taught — regardless of absence',
                  'All WAEC subjects covered automatically',
                  'Students ask questions live and get answers',
                  'Principal sees reports after every session',
                  'Parents see results improving term over term',
                  'Growth plan covers all subjects for ₦1,350,000/yr',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-base text-white/80 font-medium">
                    <span className="text-accent mt-1 flex-shrink-0">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── PRICING ───────────────────────────────────────────────────────────
      <section id="pricing" className="py-24 px-6 max-w-6xl mx-auto">
        <div className="text-center mb-16 reveal">
          <p className="text-blue text-sm font-bold tracking-widest uppercase mb-3">Simple pricing</p>
          <h2 className="text-3xl md:text-5xl font-extrabold text-text-main" style={{ fontFamily: 'var(--font-display)' }}>
            One clear price.<br />No hidden fees.
          </h2>
          <p className="text-text-muted mt-4 max-w-xl mx-auto text-lg">Paid per academic term. Cancel anytime. First 5 schools get the pilot free.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {pricing.map((plan, i) => (
            <div key={i} className={`reveal reveal-delay-${i + 1} card-hover relative rounded-3xl border overflow-hidden ${plan.highlighted ? 'border-blue bg-white shadow-2xl shadow-blue/10 scale-105 z-10' : 'border-border bg-white shadow-sm'}`}>
              {plan.highlighted && (
                <div className="absolute top-0 left-0 right-0 bg-blue text-white text-xs font-bold uppercase tracking-widest py-1.5 text-center">
                  Most Popular
                </div>
              )}
              <div className={`p-8 ${plan.highlighted ? 'pt-10' : ''}`}>
                <h3 className="text-text-main font-extrabold text-2xl mb-2" style={{ fontFamily: 'var(--font-display)' }}>{plan.name}</h3>
                <p className="text-text-muted text-sm mb-6 min-h-[40px]">{plan.desc}</p>
                <div className="mb-8">
                  <span className="text-4xl font-extrabold text-text-main tracking-tight" style={{ fontFamily: 'var(--font-display)' }}>{plan.price}</span>
                  {plan.price !== 'Custom' && <span className="text-text-muted text-sm ml-2 font-medium">{plan.period}</span>}
                </div>
                <ul className="space-y-4 mb-8">
                  {plan.features.map((f, j) => (
                    <li key={j} className="flex items-start gap-3 text-sm text-text-main font-medium">
                      <span className="text-blue mt-0.5"><CheckIcon /></span>
                      {f}
                    </li>
                  ))}
                </ul>
                <a
                  href="#waitlist"
                  className={`btn-primary block text-center font-bold text-sm py-4 rounded-xl transition-all ${plan.highlighted ? 'bg-blue text-white hover:bg-blue-mid shadow-lg shadow-blue/20' : 'bg-surface-alt text-text-main hover:bg-border'}`}
                >
                  {plan.cta}
                </a>
              </div>
            </div>
          ))}
        </div>
      </section> */}

      {/* ── FAQ ─────────────────────────────────────────────────────────────── */}
      <section id="faq" className="py-24 px-6 max-w-3xl mx-auto">
        <div className="text-center mb-16 reveal">
          <p className="text-blue text-sm font-bold tracking-widest uppercase mb-3">Questions answered</p>
          <h2 className="text-3xl md:text-5xl font-extrabold text-text-main" style={{ fontFamily: 'var(--font-display)' }}>
            Everything you want to know
          </h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <FAQItem key={i} q={faq.q} a={faq.a} delay={i} />
          ))}
        </div>
      </section>

      {/* ── WAITLIST SECTION (FOOTER CTA) ────────────────────────────────────── */}
      <section id="waitlist" className="py-24 px-6 relative overflow-hidden bg-blue">
        <div className="absolute inset-0 bg-gradient-to-br from-blue/20 to-navy-mid pointer-events-none" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSIvPjwvc3ZnPg==')] pointer-events-none" />

        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <div className="reveal">
            <div className="inline-flex items-center gap-2 border border-accent/20 bg-accent/10 rounded-full px-4 py-1.5 text-xs font-semibold text-accent mb-6 shadow-lg shadow-accent/10">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
              </span>
              Limited pilot spots — first 5 schools only
            </div>
            <h2 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight text-white" style={{ fontFamily: 'var(--font-display)' }}>
              Ready to end<br />
              <span className="gradient-text-light">empty classrooms?</span>
            </h2>
            <p className="text-white/70 mb-10 text-lg max-w-xl mx-auto">
              Join the waitlist today. The first 5 schools receive a completely free one-term pilot.
            </p>
          </div>

          <div className="reveal reveal-delay-2 mt-8 max-w-2xl mx-auto">
            <WaitlistForm variant="footer" />
          </div>
        </div>
      </section>

      {/* ── FOOTER ──────────────────────────────────────────────────────────── */}
      <footer className="bg-navy border-t border-white/10 py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-10 mb-10">
            {/* Brand */}
            <div className="md:col-span-2">
              <div className="flex items-center gap-2 mb-4 group">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue to-accent flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-lg" style={{ fontFamily: 'var(--font-display)' }}>C</span>
                </div>
                <span className="font-bold text-xl tracking-tight text-white" style={{ fontFamily: 'var(--font-display)' }}>Claivis</span>
              </div>
              <p className="text-white/50 text-sm leading-relaxed max-w-xs mb-6">
                Nigeria's first AI teaching infrastructure. Built to ensure that no student ever sits in an empty classroom again.
              </p>
            </div>

            {/* Links */}
            <div>
              <p className="text-white text-sm font-bold uppercase tracking-widest mb-4">Product</p>
              <ul className="space-y-3">
                {['How it works', 'Features', 'Request Demo'].map(l => ( // 'Pricing' is in between Features and Request Demo
                  <li key={l}><a href="#" className="text-white/50 hover:text-accent font-medium text-sm transition-colors">{l}</a></li>
                ))}
              </ul>
            </div>

            <div>
              <p className="text-white text-sm font-bold uppercase tracking-widest mb-4">Contact</p>
              <ul className="space-y-3 text-sm font-medium text-white/50 mb-6">
                <li><a href="mailto:hello@claivis.org" className="hover:text-accent transition-colors">hello@claivis.org</a></li>
                <li><a href="https://claivis.org" className="hover:text-accent transition-colors">claivis.org</a></li>
                <li className="text-white/30">Lagos, Nigeria</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-white/10 pt-8 flex flex-col lg:flex-row items-center justify-between gap-6 text-center lg:text-left">
            <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-6 text-white/40 text-sm font-medium">
              <p>© {new Date().getFullYear()} Claivis Limited. All rights reserved.</p>
              <div className="hidden sm:block w-1 h-1 bg-white/20 rounded-full" />
              <div className="flex gap-4 sm:gap-6">
                <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
              </div>
            </div>
            <div className="flex items-center gap-2 text-white/40 text-sm font-medium">
              Built in Nigeria, for Nigeria — and the world.<span className="text-accent">♥</span>
            </div>
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
    <div className={`reveal reveal-delay-${(delay % 4) + 1} bg-white rounded-2xl border border-border overflow-hidden shadow-sm hover:shadow-md transition-shadow`}>
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-4 p-6 text-left group"
      >
        <span className="font-bold text-text-main group-hover:text-blue transition-colors text-lg">{q}</span>
        <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-all ${open ? 'bg-blue text-white rotate-45 shadow-md shadow-blue/20' : 'bg-surface-alt text-text-muted group-hover:bg-blue/10 group-hover:text-blue'}`}>
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12M6 12h12" />
          </svg>
        </div>
      </button>
      {open && (
        <div className="px-6 pb-6 pt-2 animate-fade-in">
          <p className="text-text-muted text-base leading-relaxed">{a}</p>
        </div>
      )}
    </div>
  )
}
