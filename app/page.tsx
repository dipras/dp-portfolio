export default function Home() {
  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col">
      <main className="grow">
        <section className="relative pt-16 pb-20 lg:pt-24 lg:pb-32 overflow-hidden">
          <div className="max-w-6xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
            <div className="flex flex-col items-start gap-6 order-2 lg:order-1">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-light text-primary border border-sky-200">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                </span>
                <span className="text-xs font-bold uppercase tracking-wider">Available for hire</span>
              </div>
              <h1 className="text-5xl lg:text-6xl font-bold leading-[1.1] tracking-tight text-slate-900 animate-fade-in-up">
                Hi, I'm <span className="text-primary">Aldy Prastyo</span> 👋
              </h1>
              <div className="text-lg text-slate-600 leading-relaxed max-w-lg flex flex-col gap-4 animate-fade-in-up delay-100">
                <p>
                  People call me <span className="text-primary">Dipras</span>. I'm a cheerful yet introverted developer who loves exploring how things work — from the lowest bits in C to the high level JavaScript.
                </p>
                <p>
                  Currently studying at Telkom University Surabaya and working part-time as a full-stack developer at ExportExpert Indonesia.
                </p>
                <p className="italic font-mono text-sm text-slate-500">
                  "i use Arch btw"
                </p>
              </div>
              <div className="flex flex-wrap gap-4 pt-2 animate-fade-in-up delay-200">
                <button className="rounded-full bg-primary hover:bg-primary-hover text-white px-8 py-3.5 text-base font-bold transition-all shadow-lg shadow-primary/25 hover:shadow-primary/40 hover:-translate-y-0.5">
                  View Projects
                </button>
                <button className="rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 px-8 py-3.5 text-base font-bold transition-all hover:-translate-y-0.5">
                  Read Blog
                </button>
              </div>
            </div>
            <div className="order-1 lg:order-2 flex justify-center lg:justify-end relative">
              <div className="relative w-full max-w-md aspect-square rounded-3xl overflow-hidden shadow-2xl border-4 border-white rotate-3 hover:rotate-0 transition-transform duration-500">
                <div className="absolute inset-0 bg-cover bg-center bg-[url('https://lh3.googleusercontent.com/aida-public/AB6AXuCS_MwChMuthrQ_H4rdr7jesH0fWrlZHsdGf1yAaM1201ZFQ6R6uTJ3gJo01GzXTMYgZnUi4mpQkC9gYPjNL9aJwJvN31FFbRm_TibZzjc5C7WfN90s7U2JKRILoLJTjdoBO71fInRnQfwB_H-IgtlMyk9hWTKpDLtRTSFU792WEgI19zRJDFw7-OuPWObXa7Ld5kTOJjBkIkCwR21NmdTC1QdGGquckA5jFuEzDyFmPUhThWa0WwNSBw2MJxv9nOP6A5v6OqAsW2h7')]"></div>
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
                    <span className="text-blue-300">&gt;</span> [OK] Linux Kernel v6.5
                  </code>
                </div>
              </div>
              <div className="absolute -z-10 top-10 right-10 w-72 h-72 bg-sky-200 rounded-full blur-3xl opacity-30"></div>
            </div>
          </div>
        </section>
        <section className="py-20 bg-slate-50" id="about">
          <div className="max-w-6xl mx-auto px-6">
            <div className="flex flex-col md:flex-row gap-12 lg:gap-20">
              <div className="md:w-1/3 flex flex-col gap-6">
                <h2 className="text-3xl font-bold text-slate-900">About Me</h2>
                <p className="text-slate-600 leading-relaxed">
                  I am a developer who loves digging deep. While I build robust applications using modern web technologies, my true passion lies in understanding how things work under the hood. From optimizing memory in <strong>C</strong> to configuring complex <strong>Linux</strong> environments, I thrive on complexity.
                </p>
              </div>
              <div className="md:w-2/3 grid sm:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
                  <div className="w-10 h-10 rounded-lg bg-sky-100 flex items-center justify-center text-primary mb-4">
                    <span className="material-symbols-outlined">memory</span>
                  </div>
                  <h3 className="font-bold text-slate-900 text-lg mb-2">Low-Level Enthusiast</h3>
                  <p className="text-slate-500 text-sm">Passionate about C programming, memory management, and system architecture.</p>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
                  <div className="w-10 h-10 rounded-lg bg-sky-100 flex items-center justify-center text-primary mb-4">
                    <span className="material-symbols-outlined">layers</span>
                  </div>
                  <h3 className="font-bold text-slate-900 text-lg mb-2">Full-Stack Capable</h3>
                  <p className="text-slate-500 text-sm">Building scalable apps with PHP backends and responsive React frontends.</p>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
                  <div className="w-10 h-10 rounded-lg bg-sky-100 flex items-center justify-center text-primary mb-4">
                    <span className="material-symbols-outlined">terminal</span>
                  </div>
                  <h3 className="font-bold text-slate-900 text-lg mb-2">Linux Native</h3>
                  <p className="text-slate-500 text-sm">Comfortable in the terminal, managing servers, bash scripting, and kernel tinkering.</p>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
                  <div className="w-10 h-10 rounded-lg bg-sky-100 flex items-center justify-center text-primary mb-4">
                    <span className="material-symbols-outlined">smartphone</span>
                  </div>
                  <h3 className="font-bold text-slate-900 text-lg mb-2">Mobile Dev</h3>
                  <p className="text-slate-500 text-sm">Crafting cross-platform mobile experiences with React Native that feel native.</p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="py-20" id="skills">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Technical Expertise</h2>
            <p className="text-slate-600 mb-10 max-w-xl mx-auto">My toolkit includes high-level frameworks for rapid development and low-level languages for performance critical tasks.</p>
            <div className="flex flex-wrap justify-center gap-4">
              <div className="group flex items-center gap-3 px-6 py-3 bg-white border border-slate-200 rounded-full shadow-sm hover:border-yellow-400 hover:shadow-md transition-all cursor-default">
                <span className="material-symbols-outlined text-slate-400 group-hover:text-yellow-500 transition-colors">code</span>
                <span className="font-bold text-slate-700 group-hover:text-slate-900">JavaScript</span>
              </div>
              <div className="group flex items-center gap-3 px-6 py-3 bg-white border border-slate-200 rounded-full shadow-sm hover:border-indigo-400 hover:shadow-md transition-all cursor-default">
                <span className="material-symbols-outlined text-slate-400 group-hover:text-indigo-500 transition-colors">data_object</span>
                <span className="font-bold text-slate-700 group-hover:text-slate-900">PHP</span>
              </div>
              <div className="group flex items-center gap-3 px-6 py-3 bg-white border border-slate-200 rounded-full shadow-sm hover:border-sky-400 hover:shadow-md transition-all cursor-default">
                <span className="material-symbols-outlined text-slate-400 group-hover:text-sky-500 transition-colors">smartphone</span>
                <span className="font-bold text-slate-700 group-hover:text-slate-900">React Native</span>
              </div>
              <div className="group flex items-center gap-3 px-6 py-3 bg-white border border-slate-200 rounded-full shadow-sm hover:border-blue-600 hover:shadow-md transition-all cursor-default">
                <span className="material-symbols-outlined text-slate-400 group-hover:text-blue-600 transition-colors">memory</span>
                <span className="font-bold text-slate-700 group-hover:text-slate-900">C Programming</span>
              </div>
              <div className="group flex items-center gap-3 px-6 py-3 bg-white border border-slate-200 rounded-full shadow-sm hover:border-slate-800 hover:shadow-md transition-all cursor-default">
                <span className="material-symbols-outlined text-slate-400 group-hover:text-slate-800 transition-colors">terminal</span>
                <span className="font-bold text-slate-700 group-hover:text-slate-900">Linux / Bash</span>
              </div>
              <div className="group flex items-center gap-3 px-6 py-3 bg-white border border-slate-200 rounded-full shadow-sm hover:border-orange-500 hover:shadow-md transition-all cursor-default">
                <span className="material-symbols-outlined text-slate-400 group-hover:text-orange-600 transition-colors">commit</span>
                <span className="font-bold text-slate-700 group-hover:text-slate-900">Git</span>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
