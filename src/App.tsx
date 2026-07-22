/ @ts-nocheck
import { useEffect, useMemo, useRef, useState } from 'react'
import Lenis from 'lenis'
import {
  ArrowDown,
  ArrowUpRight,
  Braces,
  Code2,
  Download,
  Github,
  Linkedin,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Sparkles
} from 'lucide-react'
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useTransform
} from 'framer-motion'
import ScrollScene from './components/ScrollScene.jsx'
import Artifact from './components/Artifact.jsx'
import Cursor from './components/Cursor.jsx'
import NeuralCanvas from './components/NeuralCanvas.jsx'
import { achievements, languages, projects, skills } from './data'
import { LetterCascade } from './components/ui/letter-cascade'
import { KineticTextReveal } from './components/ui/kinetic-text-reveal'
import DecryptedText from './components/ui/decrypted-text'
import { Terminal } from './components/ui/terminal'
import { AsciiArt } from './components/ui/ascii-art'
import { Magnetic } from './components/motion/Magnetic'
import { ParallaxLayer, ParallaxProvider } from './components/motion/Parallax'
import { ViewReveal } from './components/motion/ViewReveal'
import './premium-glass.css'

const navItems = [
  ['home', 'Entry'],
  ['profile', 'Profile'],
  ['projects', 'Projects'],
  ['field-log', 'Field log'],
  ['toolkit', 'Toolkit'],
  ['contact', 'Contact']
]

const roleWords = ['AI / ML', 'PROMPT SYSTEMS', 'INTERFACE REFINEMENT', 'STUDENT BUILDER']

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max)
}

function ProjectFrame({ project, index, progress, active }) {
  const count = projects.length
  const start = index / count
  const end = (index + 1) / count
  const fadeInStart = index === 0 ? 0 : start - 0.02
  const fadeInEnd = index === 0 ? 0.025 : start + 0.06
  const fadeOutStart = index === count - 1 ? 0.94 : end - 0.075
  const fadeOutEnd = index === count - 1 ? 1 : end + 0.018

  const opacity = useTransform(
    progress,
    [fadeInStart, fadeInEnd, fadeOutStart, fadeOutEnd],
    index === 0 ? [1, 1, 1, 0] : index === count - 1 ? [0, 1, 1, 1] : [0, 1, 1, 0]
  )
  const x = useTransform(progress, [start, (start + end) / 2, end], ['10vw', '0vw', '-9vw'])
  const y = useTransform(progress, [start, (start + end) / 2, end], ['7vh', '0vh', '-6vh'])
  const scale = useTransform(progress, [start, (start + end) / 2, end], [0.82, 1, 0.86])
  const rotate = useTransform(progress, [start, end], [index % 2 ? -4 : 4, index % 2 ? 3 : -3])
  const visualRotate = useTransform(progress, [start, end], [-28 + index * 9, 46 + index * 16])
  const visualY = useTransform(progress, [start, end], ['6vh', '-6vh'])

  return (
    <motion.article
      className={`project-state ${active ? 'is-active' : ''}`}
      style={{ opacity, pointerEvents: active ? 'auto' : 'none' }}
      aria-hidden={!active}
    >
      <motion.div className="project-state__copy" style={{ x, y }}>
        <div className="micro-label">SELECTED PROJECT / {project.index}</div>
        <h2>
          <LetterCascade
            text={project.title}
            staggerFrom="center"
            staggerDuration={0.055}
            stiffness={185}
            damping={23}
          />
        </h2>
        <div className="project-state__description">
          {active && (
            <KineticTextReveal
              text={`${project.description} ${project.contribution}`}
              splitBy="words"
              direction="up"
              distance={12}
              stagger={0.034}
              blur
              className="project-copy-reveal"
              transition={{ duration: 0.92, ease: [0.16, 1, 0.3, 1] }}
            />
          )}
        </div>
        <div className="project-state__tags">
          {project.tags.map((tag) => <span key={tag}>{tag}</span>)}
        </div>
        <div className="project-state__actions">
          {project.live && (
            <Magnetic strength={0.2}>
              <a href={project.live} target="_blank" rel="noreferrer">
                Open live site <ArrowUpRight size={15} />
              </a>
            </Magnetic>
          )}
          <Magnetic strength={0.2}>
            <a href={project.source} target="_blank" rel="noreferrer">
              View source <Github size={15} />
            </a>
          </Magnetic>
        </div>
      </motion.div>

      <motion.div className="project-state__visual" style={{ scale, rotate, y: visualY }}>
        <ParallaxLayer className="project-parallax" depth={22 - index * 3}>
          <motion.div className="project-object" style={{ rotateY: visualRotate }}>
            <div className="project-object__glass" />
            <div className="project-object__plate">
              <span>{project.index} / SELECTED WORK</span>
              <strong>{project.title}</strong>
              <small>{project.kicker}</small>
            </div>
            <div className="project-object__edge project-object__edge--one" />
            <div className="project-object__edge project-object__edge--two" />
            <div className="project-object__grain" />
          </motion.div>
          <div className="project-telemetry project-telemetry--a">SYS / 0{index + 1}</div>
          <div className="project-telemetry project-telemetry--b">STATE / {project.live ? 'DEPLOYED' : 'IN DEVELOPMENT'}</div>
          <div className="project-telemetry project-telemetry--c">PROMPT / CONTENT / UI</div>
        </ParallaxLayer>
      </motion.div>
    </motion.article>
  )
}

function ProjectSequence({ progress }) {
  const [activeProject, setActiveProject] = useState(0)
  const backgroundColor = useTransform(
    progress,
    [0, 0.29, 0.36, 0.62, 0.7, 1],
    ['#e7e8e9', '#e7e8e9', '#11151a', '#11151a', '#e7e8e9', '#e7e8e9']
  )
  const foreground = useTransform(
    progress,
    [0, 0.29, 0.36, 0.62, 0.7, 1],
    ['#111419', '#111419', '#f1f3f4', '#f1f3f4', '#111419', '#111419']
  )
  const veilOpacity = useTransform(progress, [0.3, 0.335, 0.35, 0.65, 0.685, 0.7], [0, 1, 0, 0, 1, 0])
  const indexFloat = useTransform(progress, [0, 1], ['0%', '-66.666%'])

  useMotionValueEvent(progress, 'change', (latest) => {
    const next = clamp(Math.floor(latest * projects.length), 0, projects.length - 1)
    setActiveProject((current) => current === next ? current : next)
  })

  return (
    <motion.div className="project-sequence" style={{ backgroundColor, color: foreground }}>
      <div className="project-sequence__index" aria-hidden="true">
        <motion.div style={{ y: indexFloat }}>
          {projects.map((project) => <span key={project.index}>{project.index}</span>)}
        </motion.div>
      </div>
      {projects.map((project, index) => (
        <ProjectFrame
          key={project.title}
          project={project}
          index={index}
          progress={progress}
          active={activeProject === index}
        />
      ))}
      <motion.div className="transition-veil" style={{ opacity: veilOpacity }} />
      <div className="sequence-counter">
        <span>{String(activeProject + 1).padStart(2, '0')}</span>
        <i />
        <span>{String(projects.length).padStart(2, '0')}</span>
      </div>
    </motion.div>
  )
}

function AchievementSequence({ progress }) {
  const compact = typeof window !== 'undefined' && window.matchMedia('(max-width: 760px)').matches
  const cardStep = compact ? 79 : 29
  const trackX = useTransform(progress, [0.08, 0.92], ['9vw', `-${(achievements.length - 1) * cardStep}vw`])
  const titleY = useTransform(progress, [0, 0.2, 0.78, 1], ['12vh', '0vh', '0vh', '-15vh'])
  const titleOpacity = useTransform(progress, [0, 0.14, 0.84, 1], [0, 1, 1, 0])
  const scanX = useTransform(progress, [0, 1], ['8vw', '92vw'])
  const progressScale = useTransform(progress, [0, 1], [0, 1])

  return (
    <div className="achievement-sequence">
      <motion.div className="achievement-heading" style={{ y: titleY, opacity: titleOpacity }}>
        <div className="micro-label">FIELD LOG / COMPLETE RECORD</div>
        <h2><ViewReveal text={`Built in public.\nMeasured in outcomes.`} splitBy="lines" stagger={0.12} /></h2>
        <p>Competition results, invited events, school representation, and the complete names behind each entry.</p>
      </motion.div>

      <motion.div className="achievement-track" style={{ x: trackX }}>
        {achievements.map((item, index) => (
          <article className={`achievement-card achievement-card--${item.tone}`} key={`${item.year}-${item.title}`}>
            <div className="achievement-card__top">
              <span>{String(index + 1).padStart(2, '0')}</span>
              <span>{item.year}</span>
            </div>
            <strong>{item.result}</strong>
            <h3>{item.title}</h3>
            <p><b>{item.event}</b><br />{item.detail}</p>
            <div className="achievement-card__code">REC / TSB-{item.year}-{String(index + 1).padStart(2, '0')}</div>
          </article>
        ))}
      </motion.div>
      <motion.div className="achievement-scan" style={{ x: scanX }} />
      <div className="achievement-progress"><motion.i style={{ scaleX: progressScale }} /></div>
    </div>
  )
}

function ToolkitSequence({ progress }) {
  const ringRotate = useTransform(progress, [0, 1], [0, 300])
  const ringScale = useTransform(progress, [0, 0.45, 1], [0.66, 1.02, 0.82])
  const listX = useTransform(progress, [0.12, 0.62], ['36vw', '0vw'])
  const listOpacity = useTransform(progress, [0.12, 0.32, 0.94, 1], [0, 1, 1, 0])
  const orbY = useTransform(progress, [0, 1], ['5vh', '-5vh'])
  const terminalY = useTransform(progress, [0.3, 0.65], ['16vh', '0vh'])
  const terminalOpacity = useTransform(progress, [0.28, 0.46, 0.94, 1], [0, 1, 1, 0])

  const terminalCommands = [
    'whoami',
    'cat profile.txt',
    'ls selected-projects/',
    'git log --achievements --oneline',
  ]

  const terminalOutputs = {
    0: ['Tanish Singh Bisht', 'Aspiring AI/ML Specialist · New Delhi, India'],
    1: ['Class XII · PCM with Computer Science', 'Pyrotech School Tech Club · Programmer'],
    2: ['NovaLearn AI', 'BuildSpace OS', 'CredFolio'],
    3: ['2026 MindBot · 1st Prize', '2026 Overclock Delhi Hackathon · 2nd Place', '2023 Indian Science Olympiad · School Rank 2'],
  }

  return (
    <div className="toolkit-sequence">
      <motion.div className="toolkit-orb-wrap" style={{ y: orbY, scale: ringScale }}>
        <ParallaxLayer className="toolkit-parallax" depth={16}>
          <motion.div className="toolkit-orb" style={{ rotate: ringRotate }}>
            <div className="toolkit-orb__ring toolkit-orb__ring--one" />
            <div className="toolkit-orb__ring toolkit-orb__ring--two" />
            <div className="toolkit-orb__core"><span>06</span><small>CORE TOOLS</small></div>
            {skills.map((skill, index) => {
              const angle = (360 / skills.length) * index
              return (
                <span
                  className="toolkit-orb__skill"
                  key={skill}
                  style={{ '--angle': `${angle}deg` }}
                >
                  {skill}
                </span>
              )
            })}
          </motion.div>
        </ParallaxLayer>
      </motion.div>

      <motion.div className="toolkit-copy" style={{ x: listX, opacity: listOpacity }}>
        <div className="micro-label">CURRENT TOOLKIT / ACCURATELY LABELLED</div>
        <h2><ViewReveal text="Tools that help ideas survive contact with reality." stagger={0.035} /></h2>
        <div className="toolkit-grid">
          {skills.map((skill, index) => (
            <div key={skill}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              {index % 2 ? <Braces size={17} /> : <Code2 size={17} />}
              <strong>{skill}</strong>
            </div>
          ))}
        </div>
        <div className="language-table">
          <div className="language-table__head"><span>LANGUAGE</span><span>PROFICIENCY</span></div>
          {languages.map((language) => (
            <div className="language-table__row" key={language.name}>
              <strong>{language.name}</strong>
              <span>{language.level}</span>
              <i><b style={{ width: `${language.width}%` }} /></i>
            </div>
          ))}
        </div>
      </motion.div>

      <motion.div className="toolkit-terminal" style={{ y: terminalY, opacity: terminalOpacity }}>
        <Terminal
          commands={terminalCommands}
          outputs={terminalOutputs}
          username="tanish@portfolio"
          typingSpeed={52}
          delayBetweenCommands={940}
          initialDelay={480}
          enableSound={false}
          className="max-w-none px-0"
        />
      </motion.div>
    </div>
  )
}


function HeroSequence({ progress, roleIndex }) {
  const titleXLeft = useTransform(progress, [0, 0.52, 1], ['0vw', '-34vw', '-50vw'])
  const titleXRight = useTransform(progress, [0, 0.52, 1], ['0vw', '32vw', '52vw'])
  const titleOpacity = useTransform(progress, [0, 0.43, 0.66], [1, 1, 0])
  const titleBlur = useTransform(progress, [0.4, 0.72], ['blur(0px)', 'blur(13px)'])
  const artifactX = useTransform(progress, [0, 0.58, 1], ['0vw', '0vw', '27vw'])
  const introOpacity = useTransform(progress, [0.46, 0.64, 0.94, 1], [0, 1, 1, 0])
  const introY = useTransform(progress, [0.46, 0.72], ['9vh', '0vh'])
  const fog = useTransform(progress, [0.3, 0.5, 0.68], [0, 0.78, 0])
  const backdrop = useTransform(progress, [0, 0.55, 0.72, 1], ['#e9eaeb', '#e9eaeb', '#101419', '#101419'])
  const color = useTransform(progress, [0, 0.55, 0.72, 1], ['#111419', '#111419', '#edf1f3', '#edf1f3'])
  const scrollLine = useTransform(progress, [0, 1], [0, 1])

  return (
    <motion.div className="hero-world" style={{ backgroundColor: backdrop, color }}>
      <ParallaxLayer depth={-12} className="hero-parallax-word hero-parallax-word--left">
        <motion.div className="hero-word hero-word--left" style={{ x: titleXLeft, opacity: titleOpacity, filter: titleBlur }}>
          <DecryptedText
            text="TANISH"
            speed={180}
            sequential
            revealDirection="start"
            characters="ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
            animateOn="view"
            className="decrypted-revealed"
            encryptedClassName="decrypted-encrypted"
          />
        </motion.div>
      </ParallaxLayer>
      <ParallaxLayer depth={12} className="hero-parallax-word hero-parallax-word--right">
        <motion.div className="hero-word hero-word--right" style={{ x: titleXRight, opacity: titleOpacity, filter: titleBlur }}>
          <DecryptedText
            text="SINGH BISHT"
            speed={155}
            sequential
            revealDirection="end"
            characters="ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
            animateOn="view"
            className="decrypted-revealed"
            encryptedClassName="decrypted-encrypted"
          />
        </motion.div>
      </ParallaxLayer>
      <motion.div className="hero-artifact" style={{ x: artifactX }}>
        <ParallaxLayer depth={26}><Artifact progress={progress} mode="identity" label="TSB" /></ParallaxLayer>
      </motion.div>
      <ParallaxLayer depth={-8} className="hero-meta hero-meta--left">
        <span>PCM + COMPUTER SCIENCE</span>
        <span>CLASS XII / EXPECTED 2027</span>
      </ParallaxLayer>
      <ParallaxLayer depth={8} className="hero-meta hero-meta--right">
        <span>ASPIRING AI / ML SPECIALIST</span>
        <span>NEW DELHI / INDIA</span>
      </ParallaxLayer>
      <motion.div className="hero-intro" style={{ opacity: introOpacity, y: introY }}>
        <div className="micro-label">IDENTITY / TANISH SINGH BISHT</div>
        <h1>
          <DecryptedText
            text="Tanish Singh Bisht"
            speed={140}
            maxIterations={22}
            revealDirection="center"
            characters="ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789/.-"
            animateOn="hover"
            className="decrypted-revealed"
            encryptedClassName="decrypted-encrypted"
            parentClassName="decrypted-name"
          />
        </h1>
        <div className="role-switch">
          <span>ASPIRING</span>
          <AnimatePresence mode="wait">
            <motion.strong
              key={roleWords[roleIndex]}
              initial={{ y: 15, opacity: 0, filter: 'blur(7px)' }}
              animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
              exit={{ y: -15, opacity: 0, filter: 'blur(7px)' }}
              transition={{ duration: 0.84, ease: [0.16, 1, 0.3, 1] }}
            >
              {roleWords[roleIndex]}
            </motion.strong>
          </AnimatePresence>
        </div>
        <p>AI-assisted workflows, prompt design, content refinement, and carefully considered interface adjustments.</p>
      </motion.div>
      <motion.div className="scene-fog" style={{ opacity: fog }} />
      <div className="hero-scroll">
        <span>SCROLL TO EXAMINE</span>
        <i><motion.b style={{ scaleY: scrollLine }} /></i>
        <ArrowDown size={14} />
      </div>
    </motion.div>
  )
}

function ProfileSequence({ progress }) {
  const portraitX = useTransform(progress, [0, 0.45, 1], ['24vw', '16vw', '-23vw'])
  const portraitScale = useTransform(progress, [0, 0.45, 1], [0.7, 1, 0.78])
  const copyX = useTransform(progress, [0.08, 0.42], ['-13vw', '0vw'])
  const copyOpacity = useTransform(progress, [0.08, 0.28, 0.88, 1], [0, 1, 1, 0])
  const educationY = useTransform(progress, [0.4, 0.78], ['18vh', '0vh'])
  const educationOpacity = useTransform(progress, [0.42, 0.62, 0.92, 1], [0, 1, 1, 0])
  const asciiOpacity = useTransform(progress, [0.12, 0.3, 0.72, 0.9], [0, 0.84, 0.84, 0])
  const fog = useTransform(progress, [0, 0.12, 0.9, 1], [1, 0, 0, 1])

  return (
    <div className="profile-world">
      <motion.div className="profile-copy" style={{ x: copyX, opacity: copyOpacity }}>
        <div className="micro-label">SUBJECT / TANISH SINGH BISHT</div>
        <h2><ViewReveal text={`Curious by default.\nTechnical by choice.`} splitBy="lines" stagger={0.13} /></h2>
        <p>I’m a Class XII PCM and Computer Science student interested in AI/ML and software technology. I work best in AI-assisted project workflows, shaping prompts, refining content, and making precise manual adjustments to interfaces.</p>
        <div className="profile-role">
          <Sparkles size={17} />
          <div><span>PYROTECH / SCHOOL TECH CLUB</span><strong>Programmer · selected team representative at invited inter-school technology competitions</strong></div>
        </div>
      </motion.div>
      <motion.div className="profile-artifact" style={{ x: portraitX, scale: portraitScale }}>
        <ParallaxLayer depth={20} className="portrait-parallax">
          <Artifact progress={progress} mode="portrait" image="/assets/tanish-portrait.jpg" />
          <motion.div className="ascii-portrait" style={{ opacity: asciiOpacity }}>
            <AsciiArt
              src="/assets/tanish-portrait.jpg"
              resolution={92}
              charset="dense"
              color="#d6eef2"
              backgroundColor="transparent"
              animationStyle="fade"
              animationDuration={1.75}
              animateOnView
              objectFit="cover"
              className="ascii-portrait__canvas"
            />
          </motion.div>
        </ParallaxLayer>
      </motion.div>
      <motion.div className="education-records" style={{ y: educationY, opacity: educationOpacity }}>
        <article><span>2027 / EXPECTED</span><strong>Tagore International School, Vasant Vihar</strong><p>CBSE Class XII · PCM with Computer Science</p></article>
        <article><span>2025 / COMPLETED</span><strong>Army Public School, Gangtok</strong><p>CBSE Class X · 78%</p></article>
      </motion.div>
      <motion.div className="scene-fog" style={{ opacity: fog }} />
    </div>
  )
}

function ContactSequence({ progress, jumpTo }) {
  const titleScale = useTransform(progress, [0, 0.45, 1], [0.74, 1, 1.3])
  const titleY = useTransform(progress, [0, 1], ['14vh', '-9vh'])
  const titleOpacity = useTransform(progress, [0, 0.16, 0.8, 1], [0, 1, 1, 0.18])
  const linksY = useTransform(progress, [0.28, 0.66], ['20vh', '0vh'])
  const linksOpacity = useTransform(progress, [0.28, 0.48, 0.96, 1], [0, 1, 1, 0])
  const glowScale = useTransform(progress, [0, 1], [0.55, 1.65])

  const rows = [
    { icon: Mail, label: 'EMAIL', value: 'tsbworkspace@proton.me', href: 'mailto:tsbworkspace@proton.me' },
    { icon: Phone, label: 'PHONE', value: '+91 92115 02009', href: 'tel:+919211502009' },
    { icon: Linkedin, label: 'LINKEDIN', value: 'linkedin.com/in/tanishsinghbisht321', href: 'https://www.linkedin.com/in/tanishsinghbisht321/' },
    { icon: Github, label: 'GITHUB', value: 'github.com/Kryz21', href: 'https://github.com/Kryz21' },
  ]

  return (
    <div className="contact-world">
      <motion.div className="contact-glow" style={{ scale: glowScale }} />
      <motion.h2 style={{ scale: titleScale, y: titleY, opacity: titleOpacity }}>BUILD<br /><span>NEXT.</span></motion.h2>
      <motion.div className="contact-panel" style={{ y: linksY, opacity: linksOpacity }}>
        <div>
          <div className="micro-label">CONTACT / NEXT SIGNAL</div>
          <p><ViewReveal text="For student technology projects, collaborative experiments, and opportunities to keep learning by building." stagger={0.026} /></p>
        </div>
        <div className="contact-links">
          {rows.map(({ icon: Icon, label, value, href }) => (
            <Magnetic key={label} strength={0.09} className="contact-magnetic-row">
              <a href={href} target={href.startsWith('http') ? '_blank' : undefined} rel={href.startsWith('http') ? 'noreferrer' : undefined}>
                <Icon size={17} /><span>{label}</span><strong>{value}</strong><ArrowUpRight size={16} />
              </a>
            </Magnetic>
          ))}
          <div><MessageCircle size={17} /><span>DISCORD</span><strong>userinkasol</strong><i /></div>
          <div><MapPin size={17} /><span>LOCATION</span><strong>New Delhi, India</strong><i /></div>
        </div>
        <div className="contact-actions">
          <Magnetic strength={0.16}><a href="/assets/Tanish_Singh_Bisht_CV.pdf" download><Download size={16} /> Download complete CV</a></Magnetic>
          <Magnetic strength={0.16}><button onClick={() => jumpTo('home')}>Back to origin <ArrowUpRight size={15} /></button></Magnetic>
        </div>
      </motion.div>
    </div>
  )
}

function App() {
  const [activeScene, setActiveScene] = useState(0)
  const [roleIndex, setRoleIndex] = useState(0)
  const [time, setTime] = useState('')
  const reducedMotion = useReducedMotion()
  const lenisRef = useRef(null)

  const sceneLabel = useMemo(() => navItems[activeScene]?.[1] || 'Entry', [activeScene])

  useEffect(() => {
    if (reducedMotion) return undefined
    const lenis = new Lenis({
      duration: 1.4,
      smoothWheel: true,
      wheelMultiplier: 0.7,
      touchMultiplier: 1,
      lerp: 0.062
    })
    lenisRef.current = lenis
    let frame = 0
    const raf = (stamp) => {
      lenis.raf(stamp)
      frame = requestAnimationFrame(raf)
    }
    frame = requestAnimationFrame(raf)
    return () => {
      cancelAnimationFrame(frame)
      lenis.destroy()
      lenisRef.current = null
    }
  }, [reducedMotion])

  useEffect(() => {
    const updateTime = () => {
      setTime(new Intl.DateTimeFormat('en-IN', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
        timeZone: 'Asia/Kolkata'
      }).format(new Date()))
    }
    updateTime()
    const clock = window.setInterval(updateTime, 1000)
    const role = window.setInterval(() => setRoleIndex((value) => (value + 1) % roleWords.length), 3200)
    return () => {
      window.clearInterval(clock)
      window.clearInterval(role)
    }
  }, [])

  useEffect(() => {
    const observers = navItems.map(([id], index) => {
      const node = document.getElementById(id)
      if (!node) return null
      const observer = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) setActiveScene(index)
      }, { rootMargin: '-43% 0px -43% 0px' })
      observer.observe(node)
      return observer
    })
    return () => observers.forEach((observer) => observer?.disconnect())
  }, [])

  const jumpTo = (id) => {
    const target = document.getElementById(id)
    if (!target) return
    if (reducedMotion || !lenisRef.current) {
      target.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth' })
      return
    }
    lenisRef.current.scrollTo(target, {
      duration: 1.8,
      easing: (value) => 1 - Math.pow(1 - value, 5)
    })
  }

  return (
    <ParallaxProvider>
    <div className="site-shell">
      <Cursor />
      <NeuralCanvas />
      <div className="global-noise" aria-hidden="true" />
      <div className="global-vignette" aria-hidden="true" />

      <header className="hud">
        <button onClick={() => jumpTo('home')} className="hud__brand" aria-label="Return to the beginning">
          <span>TSB</span>
          <small>SPECIMEN PORTFOLIO</small>
        </button>
        <div className="hud__scene">
          <span>{String(activeScene + 1).padStart(2, '0')} / {String(navItems.length).padStart(2, '0')}</span>
          <strong>{sceneLabel}</strong>
        </div>
        <div className="hud__time"><i />NEW DELHI / {time} IST</div>
      </header>

      <nav className="scene-nav" aria-label="Portfolio sections">
        {navItems.map(([id, label], index) => (
          <button className={activeScene === index ? 'is-active' : ''} key={id} onClick={() => jumpTo(id)}>
            <span>{String(index).padStart(2, '0')}</span>
            <i />
            <b>
              <LetterCascade
                text={label}
                staggerDuration={0.042}
                stiffness={195}
                damping={24}
              />
            </b>
          </button>
        ))}
      </nav>

      <main>
        <ScrollScene id="home" index={0} label="ENTRY / IDENTITY" tone="light" height="310vh" className="hero-scene">
          {(progress) => <HeroSequence progress={progress} roleIndex={roleIndex} />}
        </ScrollScene>

        <ScrollScene id="profile" index={1} label="PROFILE / FORMATION" tone="dark" height="290vh" className="profile-scene">
          {(progress) => <ProfileSequence progress={progress} />}
        </ScrollScene>

        <ScrollScene id="projects" index={2} label="SELECTED PROJECTS" tone="light" height="650vh" className="projects-scene">
          {(progress) => <ProjectSequence progress={progress} />}
        </ScrollScene>

        <ScrollScene id="field-log" index={3} label="FIELD LOG / OUTCOMES" tone="dark" height="590vh" className="field-scene">
          {(progress) => <AchievementSequence progress={progress} />}
        </ScrollScene>

        <ScrollScene id="toolkit" index={4} label="TOOLKIT / SIGNAL" tone="light" height="430vh" className="toolkit-scene">
          {(progress) => <ToolkitSequence progress={progress} />}
        </ScrollScene>

        <ScrollScene id="contact" index={5} label="CONTACT / NEXT SIGNAL" tone="dark" height="280vh" className="contact-scene">
          {(progress) => <ContactSequence progress={progress} jumpTo={jumpTo} />}
        </ScrollScene>
      </main>

      <footer className="site-footer">
        <span>DESIGNED AROUND MOTION / BUILT WITH REACT</span>
        <span>© 2026 TANISH SINGH BISHT</span>
      </footer>
    </div>
    </ParallaxProvider>
  )
}

export default App
