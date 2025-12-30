export default function Contact() {
    return (
        <main className="grow pt-28 pb-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
                <div className="mb-12 text-center md:text-left border-b border-slate-200 pb-10">
                    <div
                        className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-50 border border-sky-100 text-sky-700 text-xs font-semibold uppercase tracking-wide mb-4">
                        <span className="material-symbols-outlined text-sm">code</span>
                        <span>Open for work</span>
                    </div>
                    <h1 className="font-display text-4xl md:text-6xl font-bold text-slate-900 mb-4 tracking-tight">
                        Let's build something <span className="text-sky-700">amazing</span>.
                    </h1>
                    <p className="text-lg md:text-xl text-slate-600 max-w-3xl leading-relaxed">
                        Specializing in JavaScript, PHP, React Native, and C. From high-level applications to low-level
                        system programming, I'm ready for the next challenge.
                    </p>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
                    <div className="lg:col-span-7">
                        <div
                            className="bg-white rounded-3xl shadow-xl shadow-slate-200/60 border border-slate-100 p-6 md:p-10 h-full">
                            <h3 className="text-2xl font-display font-bold text-slate-900 mb-8 flex items-center gap-2">
                                <span className="material-symbols-outlined text-sky-700">edit_note</span>
                                Send a Message
                            </h3>
                            <form className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-slate-700 ml-1">Name</label>
                                        <input
                                            className="w-full rounded-xl border-slate-200 bg-slate-50 text-slate-900 placeholder:text-slate-400 focus:border-sky-500 focus:ring-sky-500/20 py-3 px-4 transition-all"
                                            placeholder="John Doe" type="text" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-slate-700 ml-1">Email</label>
                                        <input
                                            className="w-full rounded-xl border-slate-200 bg-slate-50 text-slate-900 placeholder:text-slate-400 focus:border-sky-500 focus:ring-sky-500/20 py-3 px-4 transition-all"
                                            placeholder="john@example.com" type="email" />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-slate-700 ml-1">Subject</label>
                                    <input
                                        className="w-full rounded-xl border-slate-200 bg-slate-50 text-slate-900 placeholder:text-slate-400 focus:border-sky-500 focus:ring-sky-500/20 py-3 px-4 transition-all"
                                        placeholder="Project collaboration..." type="text" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-slate-700 ml-1">Message</label>
                                    <textarea
                                        className="w-full rounded-xl border-slate-200 bg-slate-50 text-slate-900 placeholder:text-slate-400 focus:border-sky-500 focus:ring-sky-500/20 py-3 px-4 transition-all resize-y"
                                        placeholder="Tell me about your project stack and requirements..."
                                        rows={5}></textarea>
                                </div>
                                <div className="pt-4">
                                    <button
                                        className="group w-full md:w-auto inline-flex items-center justify-center gap-2 bg-sky-700 hover:bg-sky-800 text-white px-8 py-3.5 rounded-xl font-bold transition-all shadow-lg shadow-sky-700/20 hover:shadow-sky-700/30 active:scale-95"
                                        type="button">
                                        <span>Send Message</span>
                                        <span
                                            className="material-symbols-outlined text-lg group-hover:translate-x-1 transition-transform">send</span>
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className="lg:col-span-5 flex flex-col gap-6">
                        <div
                            className="bg-white rounded-3xl shadow-xl shadow-slate-200/60 border border-slate-100 p-6 md:p-10 grow">
                            <h3 className="text-2xl font-display font-bold text-slate-900 mb-8">Contact Info</h3>
                            <div className="space-y-8">
                                <div className="flex items-start gap-4 group">
                                    <div
                                        className="w-14 h-14 rounded-2xl bg-sky-50 group-hover:bg-sky-700 flex items-center justify-center text-sky-700 group-hover:text-white shrink-0 transition-colors duration-300">
                                        <span className="material-symbols-outlined text-2xl">mail</span>
                                    </div>
                                    <div className="pt-1">
                                        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Email
                                            Address</p>
                                        <a className="text-lg font-bold text-slate-900 hover:text-sky-700 transition-colors"
                                            href="mailto:dipras75@gmail.com">dipras75@gmail.com</a>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4 group">
                                    <div
                                        className="w-14 h-14 rounded-2xl bg-sky-50 group-hover:bg-sky-700 flex items-center justify-center text-sky-700 group-hover:text-white shrink-0 transition-colors duration-300">
                                        <span className="material-symbols-outlined text-2xl">dns</span>
                                    </div>
                                    <div className="pt-1">
                                        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
                                            Availability</p>
                                        <p className="text-lg font-bold text-slate-900">Remote / Worldwide</p>
                                    </div>
                                </div>
                            </div>
                            <div className="my-10 h-px bg-slate-100 w-full"></div>
                            <div>
                                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">On the web</h4>
                                <div className="flex flex-wrap gap-3">
                                    <a className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-700 font-semibold hover:bg-white hover:border-sky-200 hover:text-sky-700 hover:shadow-lg hover:shadow-slate-200/50 transition-all duration-300"
                                        href="https://github.com/dipras">
                                        <span className="material-symbols-outlined text-[20px]">code</span>
                                        <span>GitHub</span>
                                    </a>
                                    <a className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-700 font-semibold hover:bg-white hover:border-sky-200 hover:text-sky-700 hover:shadow-lg hover:shadow-slate-200/50 transition-all duration-300"
                                        href="https://www.linkedin.com/in/aldy-prastyo/">
                                        <span className="material-symbols-outlined text-[20px]">work</span>
                                        <span>LinkedIn</span>
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div
                            className="bg-linear-to-br from-sky-700 to-sky-900 rounded-3xl shadow-xl shadow-sky-900/20 p-6 md:p-8 text-white relative overflow-hidden">
                            <div
                                className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-sky-500 rounded-full opacity-20 blur-3xl">
                            </div>
                            <div
                                className="absolute bottom-0 left-0 -mb-10 -ml-10 w-32 h-32 bg-sky-400 rounded-full opacity-10 blur-3xl">
                            </div>
                            <div className="relative z-10 flex flex-col h-full justify-between gap-6">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-white/10 rounded-lg backdrop-blur-sm">
                                        <span className="material-symbols-outlined text-sky-100">terminal</span>
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-lg leading-tight">System Status</h3>
                                        <p className="text-sky-200 text-xs">Linux Env • Low-level</p>
                                    </div>
                                </div>
                                <div className="space-y-3 bg-black/10 rounded-xl p-4 backdrop-blur-sm border border-white/5">
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="text-sky-200">Response</span>
                                        <span className="font-mono font-bold text-white">&lt; 24h</span>
                                    </div>
                                    <div className="w-full h-1 bg-sky-900/50 rounded-full overflow-hidden">
                                        <div className="h-full bg-sky-300 w-3/4 rounded-full"></div>
                                    </div>
                                </div>
                                <div
                                    className="flex items-center gap-2 text-sm bg-white/10 w-fit px-3 py-1.5 rounded-full backdrop-blur-md">
                                    <span className="relative flex h-2 w-2">
                                        <span
                                            className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                        <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                                    </span>
                                    <span className="font-bold text-white text-xs tracking-wide">ONLINE &amp; CODING</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}