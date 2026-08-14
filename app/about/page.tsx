import { DiscordStatusBadge } from "@/components/DiscordPresence"
import InlineMarkup from "@/components/InlineMarkup"
import Reveal from "@/components/motion/Reveal"
import { StaggerGroup, StaggerItem } from "@/components/motion/Stagger"
import { getAbout } from "@/lib/about"

export default function About() {
    const about = getAbout()

    return (
        <main className="grow pt-28 pb-20">
            <div className="max-w-250 mx-auto px-4 md:px-10 flex flex-col gap-16">
                <div className="flex flex-col md:flex-row items-center md:items-start gap-10 md:gap-16">
                    <Reveal className="relative shrink-0 group">
                        <div
                            className="absolute -inset-4 rounded-full bg-linear-to-r from-primary to-sky-300 opacity-20 blur-xl group-hover:opacity-40 transition-opacity duration-500">
                        </div>
                        <div
                            className="relative size-48 md:size-64 rounded-4xl overflow-hidden border-4 border-white shadow-2xl shadow-primary/10 rotate-3 group-hover:rotate-0 transition-transform duration-500">
                            <div
                                className="w-full h-full bg-cover bg-center"
                                style={{ backgroundImage: `url('${about.photo}')` }}>
                            </div>
                        </div>
                        <div className="absolute -bottom-6 -right-6 bg-white p-3 rounded-2xl shadow-lg border border-slate-100 hidden md:block animate-bounce [animation-duration:3s]">
                            <span className="material-symbols-outlined text-4xl text-primary">code</span>
                        </div>
                    </Reveal>
                    <Reveal delay={0.1} className="flex flex-col gap-6 text-center md:text-left">
                        <div className="space-y-2">
                            <DiscordStatusBadge />
                            <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-text-main leading-tight">
                                Hi, I&apos;m <span
                                    className="text-transparent bg-clip-text bg-linear-to-r from-primary to-sky-400">{about.nickname}</span>.
                            </h1>
                            <h2 className="text-xl md:text-2xl font-medium text-text-muted">{about.title}</h2>
                        </div>
                        <p className="text-text-muted text-lg leading-relaxed max-w-2xl">
                            <InlineMarkup text={about.intro} />
                        </p>
                        <div className="flex flex-wrap gap-3 justify-center md:justify-start pt-2">
                            <a className="flex items-center gap-2 text-text-main hover:text-primary font-semibold transition-colors"
                                href={`mailto:${about.email}`}>
                                <span className="material-symbols-outlined text-xl">mail</span>
                                {about.email}
                            </a>
                            <span className="text-slate-300">|</span>
                            <a className="flex items-center gap-2 text-text-main hover:text-primary font-semibold transition-colors"
                                href={`https://${about.github}`}>
                                <span className="material-symbols-outlined text-xl">public</span>
                                {about.github}
                            </a>
                        </div>
                    </Reveal>
                </div>
                <Reveal className="w-full py-8 border-y border-dashed border-slate-200">
                    <div
                        className="flex flex-wrap justify-center md:justify-between items-center gap-8 md:gap-12 opacity-80 grayscale hover:grayscale-0 transition-all duration-500">
                        {about.skills.map((skill) => (
                            <div key={skill.label} className="flex items-center gap-2 font-bold text-xl text-slate-600">
                                <span className="material-symbols-outlined text-3xl">{skill.icon}</span> {skill.label}
                            </div>
                        ))}
                    </div>
                </Reveal>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
                    <div className="flex flex-col gap-8">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="p-2 rounded-lg bg-primary-soft text-primary">
                                <span className="material-symbols-outlined text-2xl">work_history</span>
                            </div>
                            <h3 className="text-2xl font-bold text-text-main">Experience</h3>
                        </div>
                        <StaggerGroup className="relative pl-8 border-l border-slate-200 space-y-10">
                            {about.experience.map((job) => (
                                <StaggerItem key={`${job.company}-${job.period}`} className="relative">
                                    <span
                                        className={`absolute -left-9.25 top-1 size-4 rounded-full border-2 border-white ${job.current
                                            ? 'bg-primary shadow-md'
                                            : 'bg-slate-300 group-hover:bg-primary transition-colors'
                                            }`}></span>
                                    <div className="flex flex-col gap-2 group">
                                        <h4 className="text-xl font-bold text-text-main group-hover:text-primary transition-colors">
                                            {job.role}</h4>
                                        <div className="flex items-center justify-between text-sm">
                                            <span className="font-semibold text-slate-700">{job.company}</span>
                                            <span className="px-2 py-1 rounded-md bg-slate-100 text-text-muted font-medium">{job.period}</span>
                                        </div>
                                        <div className="text-text-muted leading-relaxed mt-1 text-sm">
                                            <p className={job.highlights.length > 0 ? "mb-2" : undefined}>{job.summary}</p>
                                            {job.highlights.length > 0 && (
                                                <ul className="list-disc pl-4 space-y-1">
                                                    {job.highlights.map((highlight) => (
                                                        <li key={highlight}>{highlight}</li>
                                                    ))}
                                                </ul>
                                            )}
                                        </div>
                                    </div>
                                </StaggerItem>
                            ))}
                        </StaggerGroup>
                    </div>
                    <div className="flex flex-col gap-8">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="p-2 rounded-lg bg-orange-100 text-orange-600">
                                <span className="material-symbols-outlined text-2xl">school</span>
                            </div>
                            <h3 className="text-2xl font-bold text-text-main">Education</h3>
                        </div>
                        <StaggerGroup className="flex flex-col gap-6">
                            {about.education.map((school) => (
                                <StaggerItem
                                    key={school.school}
                                    className="group p-6 rounded-3xl bg-card border border-border hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300">
                                    <div className="flex justify-between items-start mb-2">
                                        <h4 className="text-lg font-bold text-text-main group-hover:text-primary transition-colors">
                                            {school.program}</h4>
                                        <span
                                            className="text-sm font-medium text-text-muted bg-slate-50 px-2 py-1 rounded-md border border-slate-100">{school.status}</span>
                                    </div>
                                    <div className="text-slate-700 font-medium mb-2">{school.school}</div>
                                    <p className="text-sm text-text-muted">{school.description}</p>
                                </StaggerItem>
                            ))}
                        </StaggerGroup>
                    </div>
                </div>
                <Reveal
                    className="relative rounded-4xl bg-linear-to-br from-primary to-sky-600 p-8 md:p-12 overflow-hidden text-center md:text-left flex flex-col md:flex-row items-center justify-between gap-8 shadow-xl shadow-primary/20">
                    <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 rounded-full bg-white opacity-10 blur-3xl">
                    </div>
                    <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-64 h-64 rounded-full bg-black opacity-10 blur-3xl">
                    </div>
                    <div className="relative z-10 max-w-sm">
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Let&apos;s build something efficient together.
                        </h2>
                        <p className="text-sky-100 text-lg">
                            Whether that&apos;s a backend, a mobile app, or something closer to the system level,
                            I&apos;m interested in working on it.
                        </p>
                    </div>
                    <div className="relative z-10 flex flex-col sm:flex-row gap-4">
                        <a href="/contact"
                            className="px-8 py-4 rounded-xl bg-white text-primary font-bold shadow-lg hover:shadow-xl hover:bg-slate-50 transition-all transform hover:-translate-y-1">
                            Contact Me
                        </a>
                        <a href="/resume.pdf"
                            className="px-8 py-4 rounded-xl bg-primary-hover border border-white/20 text-white font-bold hover:bg-sky-800 transition-all flex items-center justify-center gap-2">
                            <span className="material-symbols-outlined text-[20px]">download</span>
                            Download CV
                        </a>
                    </div>
                </Reveal>
            </div>
        </main>
    )
}
