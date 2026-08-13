import Image from "next/image";
import Link from "next/link";
import { DiscordStatusBadge } from "@/components/DiscordPresence";
import Reveal from "@/components/motion/Reveal";
import { StaggerGroup, StaggerItem } from "@/components/motion/Stagger";
import { formatPostDate, getPosts, getProjects } from "@/lib/content";

export default function Home() {
  const projects = getProjects();
  const featuredProject = projects.find((project) => project.featured) ?? projects[0];
  const listedProjects = projects.filter((project) => project.slug !== featuredProject?.slug).slice(0, 4);
  const posts = getPosts().slice(0, 3);

  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col">
      <main className="grow">
        <section className="relative pt-16 pb-20 lg:pt-24 lg:pb-32 overflow-hidden">
          <div className="max-w-6xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
            <div className="flex flex-col items-start gap-6 order-2 lg:order-1">
              <DiscordStatusBadge />
              <Reveal>
                <h1 className="text-5xl lg:text-6xl font-bold leading-[1.1] tracking-tight text-slate-900">
                  Hi, I&apos;m <span className="text-primary">Aldy Prastyo</span> <span aria-hidden="true">👋</span>
                </h1>
              </Reveal>
              <Reveal delay={0.1} className="text-lg text-slate-600 leading-relaxed max-w-lg flex flex-col gap-4">
                <p>
                  People call me <span className="text-primary">Dipras</span>. I&apos;m a cheerful yet introverted developer who loves exploring how things work, from the lowest bits in C to high-level JavaScript.
                </p>
                <p>
                  Currently studying at Telkom University Surabaya and working as a full-stack developer.
                </p>
              </Reveal>
              <Reveal delay={0.2} className="flex flex-wrap gap-4 pt-2">
                <Link
                  href="/projects"
                  className="rounded-full bg-primary hover:bg-primary-hover text-white px-8 py-3.5 text-base font-bold transition-all shadow-lg shadow-primary/25 hover:shadow-primary/40 hover:-translate-y-0.5"
                >
                  View Projects
                </Link>
                <Link
                  href="/blog"
                  className="rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 px-8 py-3.5 text-base font-bold transition-all hover:-translate-y-0.5"
                >
                  Read Blog
                </Link>
              </Reveal>
            </div>
            <Reveal delay={0.15} className="order-1 lg:order-2 flex justify-center lg:justify-end relative">
              <div className="relative w-full max-w-md aspect-square rounded-3xl overflow-hidden shadow-2xl border-4 border-white rotate-3 hover:rotate-0 transition-transform duration-500">
                <Image
                  src="/about.webp"
                  alt="Aldy Prastyo"
                  fill
                  priority
                  sizes="(min-width: 1024px) 28rem, 90vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent"></div>
                <div className="absolute bottom-6 left-6 right-6 p-5 bg-white/10 backdrop-blur-md rounded-xl border border-white/20 text-white">
                  <div className="flex gap-2 mb-3">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-400"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-400"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-green-400"></div>
                  </div>
                  <code className="font-mono text-xs opacity-90 block leading-relaxed">
                    <span className="text-green-400">$</span> ./init_portfolio.sh<br />
                    <span className="text-blue-300">&gt;</span> Loading modules...<br />
                    <span className="text-blue-300">&gt;</span> [OK] React Native<br />
                    <span className="text-blue-300">&gt;</span> [OK] Linux Kernel v6.5<br />
                    <span className="text-green-400">$</span> uname -a<br />
                    <span className="text-blue-300">&gt;</span> Arch Linux x86_64 (i use it btw)
                  </code>
                </div>
              </div>
              <div className="absolute -z-10 top-10 right-10 w-72 h-72 bg-sky-200 rounded-full blur-3xl opacity-30"></div>
            </Reveal>
          </div>
        </section>
        {projects.length > 0 && (
          <section className="py-20" id="projects">
            <div className="max-w-6xl mx-auto px-6 flex flex-col gap-10">
              <Reveal className="flex flex-col gap-3 max-w-xl">
                <h2 className="text-3xl font-bold text-slate-900">Selected Work</h2>
                <p className="text-slate-600 leading-relaxed">
                  A few things I&apos;ve built recently, from developer tooling to editor extensions.
                </p>
              </Reveal>

              {featuredProject && (
                <Reveal
                  delay={0.1}
                  as="article"
                  className="group relative flex flex-col md:flex-row overflow-hidden rounded-3xl bg-white shadow-xl shadow-slate-200/60 border border-slate-100 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="relative min-h-80 h-full md:w-1/2">
                    <Image
                      src={featuredProject.image}
                      alt={featuredProject.imageAlt}
                      fill
                      className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                      sizes="(min-width: 768px) 50vw, 100vw"
                    />
                  </div>
                  <div className="flex flex-col justify-center p-8 md:p-10 md:w-1/2 gap-5">
                    <div className="flex items-center gap-3">
                      <span className="px-3 py-1 rounded-full bg-primary-soft text-primary text-xs font-bold uppercase tracking-wide">
                        Featured
                      </span>
                      <span className="text-xs font-semibold text-slate-400">{featuredProject.year}</span>
                    </div>
                    <h3 className="text-2xl md:text-3xl font-bold text-slate-900 group-hover:text-primary transition-colors">
                      {featuredProject.title}
                    </h3>
                    <p className="text-slate-600 leading-relaxed">{featuredProject.excerpt}</p>
                    <div className="flex flex-wrap gap-2">
                      {featuredProject.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-600 text-xs font-mono font-medium border border-slate-200"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <Link
                      href={`/projects/${featuredProject.slug}`}
                      className="w-fit flex items-center gap-2 h-12 px-8 rounded-full bg-slate-900 text-white font-semibold text-sm hover:bg-primary transition-colors shadow-lg shadow-slate-900/10"
                    >
                      View Case Study
                      <span className="material-symbols-outlined text-lg">arrow_forward</span>
                    </Link>
                  </div>
                </Reveal>
              )}

              {listedProjects.length > 0 && (
                <StaggerGroup className="grid sm:grid-cols-2 gap-6">
                  {listedProjects.map((project) => (
                    <StaggerItem
                      key={project.slug}
                      as="article"
                      className="group flex flex-col rounded-3xl bg-white overflow-hidden shadow-lg shadow-slate-200/50 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-slate-100"
                    >
                      <div className="relative h-48 overflow-hidden">
                        <Image
                          src={project.image}
                          alt={project.imageAlt}
                          fill
                          className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                          sizes="(min-width: 640px) 50vw, 100vw"
                        />
                      </div>
                      <div className="flex flex-col flex-1 p-6 gap-3">
                        <p className="text-xs font-bold uppercase tracking-wide text-primary">
                          {project.category} · {project.year}
                        </p>
                        <h3 className="text-lg font-bold text-slate-900 group-hover:text-primary transition-colors">
                          <Link href={`/projects/${project.slug}`}>{project.title}</Link>
                        </h3>
                        <p className="text-slate-500 text-sm leading-relaxed line-clamp-2 flex-1">{project.excerpt}</p>
                        <Link
                          href={`/projects/${project.slug}`}
                          className="text-sm font-bold text-slate-900 hover:text-primary flex items-center gap-1 transition-colors mt-1"
                        >
                          View Project
                          <span className="material-symbols-outlined text-base">arrow_outward</span>
                        </Link>
                      </div>
                    </StaggerItem>
                  ))}
                </StaggerGroup>
              )}

              <Reveal delay={0.2} className="flex justify-center pt-2">
                <Link
                  href="/projects"
                  className="rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 px-8 py-3.5 text-base font-bold transition-all hover:-translate-y-0.5"
                >
                  View All Projects
                </Link>
              </Reveal>
            </div>
          </section>
        )}
        <section className="py-20 bg-slate-50" id="about">
          <div className="max-w-6xl mx-auto px-6">
            <div className="flex flex-col md:flex-row gap-12 lg:gap-20">
              <Reveal className="md:w-1/3 flex flex-col gap-6">
                <h2 className="text-3xl font-bold text-slate-900">About Me</h2>
                <p className="text-slate-600 leading-relaxed">
                  I am a developer who loves digging deep. I build applications with modern web technologies, but what I really enjoy is understanding how things work under the hood, whether that means optimizing memory in <strong>C</strong> or configuring a <strong>Linux</strong> environment.
                </p>
              </Reveal>
              <StaggerGroup className="md:w-2/3 grid sm:grid-cols-2 gap-6">
                <StaggerItem className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
                  <div className="w-10 h-10 rounded-lg bg-sky-100 flex items-center justify-center text-primary mb-4">
                    <span className="material-symbols-outlined">memory</span>
                  </div>
                  <h3 className="font-bold text-slate-900 text-lg mb-2">Low-Level Enthusiast</h3>
                  <p className="text-slate-500 text-sm">Passionate about C programming, memory management, and system architecture.</p>
                </StaggerItem>
                <StaggerItem className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
                  <div className="w-10 h-10 rounded-lg bg-sky-100 flex items-center justify-center text-primary mb-4">
                    <span className="material-symbols-outlined">layers</span>
                  </div>
                  <h3 className="font-bold text-slate-900 text-lg mb-2">Full-Stack Capable</h3>
                  <p className="text-slate-500 text-sm">Building scalable apps with PHP backends and responsive React frontends.</p>
                </StaggerItem>
                <StaggerItem className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
                  <div className="w-10 h-10 rounded-lg bg-sky-100 flex items-center justify-center text-primary mb-4">
                    <span className="material-symbols-outlined">terminal</span>
                  </div>
                  <h3 className="font-bold text-slate-900 text-lg mb-2">Linux Native</h3>
                  <p className="text-slate-500 text-sm">Comfortable in the terminal, managing servers, bash scripting, and kernel tinkering.</p>
                </StaggerItem>
                <StaggerItem className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
                  <div className="w-10 h-10 rounded-lg bg-sky-100 flex items-center justify-center text-primary mb-4">
                    <span className="material-symbols-outlined">smartphone</span>
                  </div>
                  <h3 className="font-bold text-slate-900 text-lg mb-2">Mobile Dev</h3>
                  <p className="text-slate-500 text-sm">Crafting cross-platform mobile experiences with React Native that feel native.</p>
                </StaggerItem>
              </StaggerGroup>
            </div>
          </div>
        </section>
        <section className="py-20" id="skills">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <Reveal>
              <h2 className="text-3xl font-bold text-slate-900 mb-4">Technical Expertise</h2>
              <p className="text-slate-600 mb-10 max-w-xl mx-auto">My toolkit includes high-level frameworks for rapid development and low-level languages for performance critical tasks.</p>
            </Reveal>
            <StaggerGroup className="grid sm:grid-cols-2 gap-10 sm:gap-6 max-w-2xl mx-auto">
              <div className="flex flex-col items-center gap-4">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Languages &amp; Frameworks</span>
                <div className="flex flex-wrap justify-center gap-4">
                  <StaggerItem className="group flex items-center gap-3 px-6 py-3 bg-white border border-slate-200 rounded-full shadow-sm hover:border-primary/40 hover:shadow-md hover:shadow-primary/20 transition-all cursor-default">
                    <span className="material-symbols-outlined text-slate-400 group-hover:text-primary transition-colors">code</span>
                    <span className="font-bold text-slate-700 group-hover:text-slate-900">JavaScript</span>
                  </StaggerItem>
                  <StaggerItem className="group flex items-center gap-3 px-6 py-3 bg-white border border-slate-200 rounded-full shadow-sm hover:border-primary/40 hover:shadow-md hover:shadow-primary/20 transition-all cursor-default">
                    <span className="material-symbols-outlined text-slate-400 group-hover:text-primary transition-colors">data_object</span>
                    <span className="font-bold text-slate-700 group-hover:text-slate-900">PHP</span>
                  </StaggerItem>
                  <StaggerItem className="group flex items-center gap-3 px-6 py-3 bg-white border border-slate-200 rounded-full shadow-sm hover:border-primary/40 hover:shadow-md hover:shadow-primary/20 transition-all cursor-default">
                    <span className="material-symbols-outlined text-slate-400 group-hover:text-primary transition-colors">smartphone</span>
                    <span className="font-bold text-slate-700 group-hover:text-slate-900">React Native</span>
                  </StaggerItem>
                </div>
              </div>
              <div className="flex flex-col items-center gap-4">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Systems &amp; Tooling</span>
                <div className="flex flex-wrap justify-center gap-4">
                  <StaggerItem className="group flex items-center gap-3 px-6 py-3 bg-white border border-slate-200 rounded-full shadow-sm hover:border-primary/40 hover:shadow-md hover:shadow-primary/20 transition-all cursor-default">
                    <span className="material-symbols-outlined text-slate-400 group-hover:text-primary transition-colors">memory</span>
                    <span className="font-bold text-slate-700 group-hover:text-slate-900">C Programming</span>
                  </StaggerItem>
                  <StaggerItem className="group flex items-center gap-3 px-6 py-3 bg-white border border-slate-200 rounded-full shadow-sm hover:border-primary/40 hover:shadow-md hover:shadow-primary/20 transition-all cursor-default">
                    <span className="material-symbols-outlined text-slate-400 group-hover:text-primary transition-colors">terminal</span>
                    <span className="font-bold text-slate-700 group-hover:text-slate-900">Linux / Bash</span>
                  </StaggerItem>
                  <StaggerItem className="group flex items-center gap-3 px-6 py-3 bg-white border border-slate-200 rounded-full shadow-sm hover:border-primary/40 hover:shadow-md hover:shadow-primary/20 transition-all cursor-default">
                    <span className="material-symbols-outlined text-slate-400 group-hover:text-primary transition-colors">commit</span>
                    <span className="font-bold text-slate-700 group-hover:text-slate-900">Git</span>
                  </StaggerItem>
                </div>
              </div>
            </StaggerGroup>
          </div>
        </section>
        {posts.length > 0 && (
          <section className="py-20 bg-slate-50" id="articles">
            <div className="max-w-6xl mx-auto px-6 flex flex-col gap-10">
              <Reveal className="flex flex-col gap-3 max-w-xl">
                <h2 className="text-3xl font-bold text-slate-900">From the Blog</h2>
                <p className="text-slate-600 leading-relaxed">
                  Notes on what I&apos;m building and learning, from web apps down to the kernel.
                </p>
              </Reveal>

              <StaggerGroup className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {posts.map((post) => (
                  <StaggerItem
                    key={post.slug}
                    as="article"
                    className="group flex flex-col rounded-3xl bg-white overflow-hidden shadow-lg shadow-slate-200/50 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-slate-100"
                  >
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={post.image}
                        alt={post.imageAlt}
                        fill
                        className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      />
                    </div>
                    <div className="flex flex-col flex-1 p-6 gap-3">
                      <p className="text-xs font-bold uppercase tracking-wide text-primary">
                        {formatPostDate(post.date)} · {post.readTime}
                      </p>
                      <h3 className="text-lg font-bold text-slate-900 group-hover:text-primary transition-colors">
                        <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                      </h3>
                      <p className="text-slate-500 text-sm leading-relaxed line-clamp-2 flex-1">{post.excerpt}</p>
                      <Link
                        href={`/blog/${post.slug}`}
                        className="text-sm font-bold text-slate-900 hover:text-primary flex items-center gap-1 transition-colors mt-1"
                      >
                        Read Article
                        <span className="material-symbols-outlined text-base">arrow_outward</span>
                      </Link>
                    </div>
                  </StaggerItem>
                ))}
              </StaggerGroup>

              <Reveal delay={0.2} className="flex justify-center pt-2">
                <Link
                  href="/blog"
                  className="rounded-full bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 px-8 py-3.5 text-base font-bold transition-all hover:-translate-y-0.5"
                >
                  Read All Articles
                </Link>
              </Reveal>
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
