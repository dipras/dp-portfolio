export default function About() {
    return (
        <main className="grow pt-28 pb-20">
            <div className="max-w-250 mx-auto px-4 md:px-10 flex flex-col gap-16">
                <div className="flex flex-col md:flex-row items-center md:items-start gap-10 md:gap-16">
                    <div className="relative shrink-0 group">
                        <div
                            className="absolute -inset-4 rounded-full bg-linear-to-r from-primary to-sky-300 opacity-20 blur-xl group-hover:opacity-40 transition-opacity duration-500">
                        </div>
                        <div
                            className="relative size-48 md:size-64 rounded-4xl overflow-hidden border-4 border-white shadow-2xl shadow-primary/10 rotate-3 group-hover:rotate-0 transition-transform duration-500">
                            <div className="w-full h-full bg-cover bg-center bg-[url('/about.webp')]">
                            </div>
                        </div>
                        <div className="absolute -bottom-6 -right-6 bg-white p-3 rounded-2xl shadow-lg border border-slate-100 hidden md:block animate-bounce [animation-duration:3s]">
                            <span className="material-symbols-outlined text-4xl text-primary">code</span>
                        </div>
                    </div>
                    <div className="flex flex-col gap-6 text-center md:text-left">
                        <div className="space-y-2">
                            <div
                                className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-soft text-primary text-xs font-bold uppercase tracking-wider mx-auto md:mx-0 w-fit">
                                <span className="size-2 rounded-full bg-primary animate-pulse"></span>
                                Available for hire
                            </div>
                            <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-text-main leading-tight">
                                Hi, I'm <span
                                    className="text-transparent bg-clip-text bg-linear-to-r from-primary to-sky-400">Dipras</span>.
                            </h1>
                            <h2 className="text-xl md:text-2xl font-medium text-text-muted">Full Stack &amp; Systems Engineer
                            </h2>
                        </div>
                        <p className="text-text-muted text-lg leading-relaxed max-w-2xl">
                            I bridge the gap between high-level web interfaces and low-level system operations.
                            Passionate about <strong className="text-text-main">Linux internals</strong>, minimalist code, and
                            building scalable applications.
                            When I'm not writing <span
                                className="font-mono text-primary bg-primary-soft/50 px-1 rounded">JavaScript</span> or <span
                                    className="font-mono text-primary bg-primary-soft/50 px-1 rounded">PHP</span>, you can find me
                            optimizing memory allocation in <span
                                className="font-mono text-primary bg-primary-soft/50 px-1 rounded">C</span>.
                        </p>
                        <div className="flex flex-wrap gap-3 justify-center md:justify-start pt-2">
                            <a className="flex items-center gap-2 text-text-main hover:text-primary font-semibold transition-colors"
                                href="mailto:dipras75@gmail.com">
                                <span className="material-symbols-outlined text-xl">mail</span>
                                dipras75@gmail.com
                            </a>
                            <span className="text-slate-300">|</span>
                            <a className="flex items-center gap-2 text-text-main hover:text-primary font-semibold transition-colors"
                                href="https://github.com/dipras">
                                <span className="material-symbols-outlined text-xl">public</span>
                                github.com/dipras
                            </a>
                        </div>
                    </div>
                </div>
                <div className="w-full py-8 border-y border-dashed border-slate-200">
                    <div
                        className="flex flex-wrap justify-center md:justify-between items-center gap-8 md:gap-12 opacity-80 grayscale hover:grayscale-0 transition-all duration-500">
                        <div className="flex items-center gap-2 font-bold text-xl text-slate-600">
                            <span className="material-symbols-outlined text-3xl">javascript</span> JS/TS
                        </div>
                        <div className="flex items-center gap-2 font-bold text-xl text-slate-600">
                            <span className="material-symbols-outlined text-3xl">php</span> PHP
                        </div>
                        <div className="flex items-center gap-2 font-bold text-xl text-slate-600">
                            <span className="material-symbols-outlined text-3xl">smartphone</span> React Native
                        </div>
                        <div className="flex items-center gap-2 font-bold text-xl text-slate-600">
                            <span className="material-symbols-outlined text-3xl">memory</span> C / Systems
                        </div>
                        <div className="flex items-center gap-2 font-bold text-xl text-slate-600">
                            <span className="material-symbols-outlined text-3xl">terminal</span> Linux
                        </div>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
                    <div className="flex flex-col gap-8">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="p-2 rounded-lg bg-primary-soft text-primary">
                                <span className="material-symbols-outlined text-2xl">work_history</span>
                            </div>
                            <h3 className="text-2xl font-bold text-text-main">Experience</h3>
                        </div>
                        <div className="relative pl-8 border-l border-slate-200 space-y-10">
                            <div className="relative">
                                <span
                                    className="absolute -left-9.25 top-1 size-4 rounded-full border-2 border-white bg-primary shadow-md"></span>
                                <div className="flex flex-col gap-2 group">
                                    <h4 className="text-xl font-bold text-text-main group-hover:text-primary transition-colors">
                                        Fullstack Developer</h4>
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="font-semibold text-slate-700">Export Expert</span>
                                        <span className="px-2 py-1 rounded-md bg-slate-100 text-text-muted font-medium">2024 - Present</span>
                                    </div>
                                    <div className="text-text-muted leading-relaxed mt-1 text-sm">
                                        <p className="mb-2">I currently work as a Fullstack Developer at Export Expert Indonesia, an exclusive integration platform designed to empower Indonesians eager to explore the export industry.</p>
                                        <ul className="list-disc pl-4 space-y-1">
                                            <li>Develop and maintain the main website of exportexpert.id using React.js.</li>
                                            <li>Build the backend server with NestJS, ensuring scalable architecture.</li>
                                            <li>Create the mobile application using React Native for Android and iOS.</li>
                                            <li>Develop the admin panel with Bun.js for internal management.</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            <div className="relative">
                                <span
                                    className="absolute -left-9.25 top-1 size-4 rounded-full border-2 border-white bg-slate-300 group-hover:bg-primary transition-colors"></span>
                                <div className="flex flex-col gap-2 group">
                                    <h4 className="text-xl font-bold text-text-main group-hover:text-primary transition-colors">
                                        Community Moderator</h4>
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="font-semibold text-slate-700">Web Programming Unpas</span>
                                        <span className="px-2 py-1 rounded-md bg-slate-100 text-text-muted font-medium">2022 - 2024</span>
                                    </div>
                                    <div className="text-text-muted leading-relaxed mt-1 text-sm">
                                        <p className="mb-2">Moderator for the Web Programming UNPAS Discord community.</p>
                                        <ul className="list-disc pl-4 space-y-1">
                                            <li>Contributed to Bellshade, a GitHub repository for learning programming.</li>
                                            <li>Moderated the WPU CSS War event in 2022.</li>
                                            <li>Served as a moderator for WPUCast podcast.</li>
                                            <li>Helped organize the Kartini Day event.</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            <div className="relative">
                                <span
                                    className="absolute -left-9.25 top-1 size-4 rounded-full border-2 border-white bg-slate-300 group-hover:bg-primary transition-colors"></span>
                                <div className="flex flex-col gap-2 group">
                                    <h4 className="text-xl font-bold text-text-main group-hover:text-primary transition-colors">
                                        Fullstack Developer</h4>
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="font-semibold text-slate-700">Aspenku</span>
                                        <span className="px-2 py-1 rounded-md bg-slate-100 text-text-muted font-medium">2022 - 2024</span>
                                    </div>
                                    <div className="text-text-muted leading-relaxed mt-1 text-sm">
                                        <p className="mb-2">Developed several projects for a goods export company based in Jakarta.</p>
                                        <ul className="list-disc pl-4 space-y-1">
                                            <li>Backend Server: Developed API using Node.js.</li>
                                            <li>Frontend Website: Built aspenku.com using React.js.</li>
                                            <li>Mobile Application: Developed app using React Native.</li>
                                            <li>Admin Panel: Created dashboard using Next.js.</li>
                                            <li>NLC Website: Developed nlc.aspenku.com with WordPress.</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            <div className="relative">
                                <span
                                    className="absolute -left-9.25 top-1 size-4 rounded-full border-2 border-white bg-slate-300 group-hover:bg-primary transition-colors"></span>
                                <div className="flex flex-col gap-2 group">
                                    <h4 className="text-xl font-bold text-text-main group-hover:text-primary transition-colors">
                                        Wordpress Developer</h4>
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="font-semibold text-slate-700">KPMI</span>
                                        <span className="px-2 py-1 rounded-md bg-slate-100 text-text-muted font-medium">2020 - 2022</span>
                                    </div>
                                    <p className="text-text-muted leading-relaxed mt-1 text-sm">
                                        Responsible for developing, customizing, and maintaining the organization's website to support its mission in empowering Muslim entrepreneurs across Indonesia.
                                    </p>
                                </div>
                            </div>

                            <div className="relative">
                                <span
                                    className="absolute -left-9.25 top-1 size-4 rounded-full border-2 border-white bg-slate-300 group-hover:bg-primary transition-colors"></span>
                                <div className="flex flex-col gap-2 group">
                                    <h4 className="text-xl font-bold text-text-main group-hover:text-primary transition-colors">
                                        Backend Developer</h4>
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="font-semibold text-slate-700">Mars Digital</span>
                                        <span className="px-2 py-1 rounded-md bg-slate-100 text-text-muted font-medium">Oct 2019 - Jan 2020</span>
                                    </div>
                                    <p className="text-text-muted leading-relaxed mt-1 text-sm">
                                        Freelance developer. Developed the backend of a financial reporting system for OpenRoad Auto Group (USA) using Node.js.
                                    </p>
                                </div>
                            </div>

                            <div className="relative">
                                <span
                                    className="absolute -left-9.25 top-1 size-4 rounded-full border-2 border-white bg-slate-300 group-hover:bg-primary transition-colors"></span>
                                <div className="flex flex-col gap-2 group">
                                    <h4 className="text-xl font-bold text-text-main group-hover:text-primary transition-colors">
                                        Fullstack Developer</h4>
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="font-semibold text-slate-700">Pojokan.io</span>
                                        <span className="px-2 py-1 rounded-md bg-slate-100 text-text-muted font-medium">2018 - 2019</span>
                                    </div>
                                    <div className="text-text-muted leading-relaxed mt-1 text-sm">
                                        <p className="mb-2">A private community where I learned to code and worked on national/international projects.</p>
                                        <ul className="list-disc pl-4 space-y-1">
                                            <li>Frontend: Developed online meeting platform with ReactJs.</li>
                                            <li>Backend: Built LMS with NodeJS.</li>
                                            <li>Fullstack: Developed healthcare platform for Doctor Kai (Australia) using React Native.</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col gap-8">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="p-2 rounded-lg bg-orange-100 text-orange-600">
                                <span className="material-symbols-outlined text-2xl">school</span>
                            </div>
                            <h3 className="text-2xl font-bold text-text-main">Education</h3>
                        </div>
                        <div className="flex flex-col gap-6">
                            <div
                                className="group p-6 rounded-3xl bg-card border border-border hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300">
                                <div className="flex justify-between items-start mb-2">
                                    <h4 className="text-lg font-bold text-text-main group-hover:text-primary transition-colors">
                                        Software Engineering</h4>
                                    <span
                                        className="text-sm font-medium text-text-muted bg-slate-50 px-2 py-1 rounded-md border border-slate-100">Present</span>
                                </div>
                                <div className="text-slate-700 font-medium mb-2">Telkom University Surabaya</div>
                                <p className="text-sm text-text-muted">
                                    Major in Rekayasa Perangkat Lunak. Focusing on modern software development practices and system architecture.
                                </p>
                            </div>
                            <div
                                className="group p-6 rounded-3xl bg-card border border-border hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300">
                                <div className="flex justify-between items-start mb-2">
                                    <h4 className="text-lg font-bold text-text-main group-hover:text-primary transition-colors">
                                        Computer & Network Engineering</h4>
                                    <span
                                        className="text-sm font-medium text-text-muted bg-slate-50 px-2 py-1 rounded-md border border-slate-100">Graduated</span>
                                </div>
                                <div className="text-slate-700 font-medium mb-2">SMKN 1 Karanganyar</div>
                                <p className="text-sm text-text-muted">
                                    Major in Teknik Komputer dan Jaringan (TKJ). Learned about network infrastructure, server administration, and hardware troubleshooting.
                                </p>
                            </div>
                            <div className="mt-4 p-6 rounded-3xl bg-slate-50 border border-dashed border-slate-200">
                                <h4 className="text-sm font-bold text-text-muted uppercase tracking-wider mb-4">Certifications
                                </h4>
                                <div className="flex flex-wrap gap-2">
                                    <span
                                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-xs font-semibold text-slate-700 shadow-sm">
                                        <span
                                            className="material-symbols-outlined text-[14px] text-green-500">check_circle</span>
                                        LFCS (Linux Foundation)
                                    </span>
                                    <span
                                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-xs font-semibold text-slate-700 shadow-sm">
                                        <span
                                            className="material-symbols-outlined text-[14px] text-green-500">check_circle</span>
                                        AWS Certified Developer
                                    </span>
                                    <span
                                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-xs font-semibold text-slate-700 shadow-sm">
                                        <span
                                            className="material-symbols-outlined text-[14px] text-green-500">check_circle</span>
                                        Cisco CCNA
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div
                    className="relative rounded-4xl bg-linear-to-br from-primary to-sky-600 p-8 md:p-12 overflow-hidden text-center md:text-left flex flex-col md:flex-row items-center justify-between gap-8 shadow-xl shadow-primary/20">
                    <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 rounded-full bg-white opacity-10 blur-3xl">
                    </div>
                    <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-64 h-64 rounded-full bg-black opacity-10 blur-3xl">
                    </div>
                    <div className="relative z-10 max-w-sm">
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Let's build something efficient together.
                        </h2>
                        <p className="text-sky-100 text-lg">
                            Whether it's a high-performance backend, a mobile app, or systems programming, I'm ready to
                            tackle the challenge.
                        </p>
                    </div>
                    <div className="relative z-10 flex flex-col sm:flex-row gap-4">
                        <a href="/contact"
                            className="px-8 py-4 rounded-xl bg-white text-primary font-bold shadow-lg hover:shadow-xl hover:bg-slate-50 transition-all transform hover:-translate-y-1">
                            Contact Me
                        </a>
                        <a href="/aldy_prastyo.pdf"
                            className="px-8 py-4 rounded-xl bg-primary-hover border border-white/20 text-white font-bold hover:bg-sky-800 transition-all flex items-center justify-center gap-2">
                            <span className="material-symbols-outlined text-[20px]">download</span>
                            Download CV
                        </a>
                    </div>
                </div>
            </div>
        </main>
    )
}