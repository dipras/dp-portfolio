import Image from "next/image";

const articles = [
    {
        category: "React Native",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuD4f_qw8SjOaGri-K5f9eKka_T-rEJoGyRe_guwdjQS1NNxNXi7qpzxuMmKw-PhIetUTeXLH_GsE_EjPQckaVWDN4NaNjRPQpYexxPjvK4Zo4IKKFnenSD53wvDjdUcE4STRrNSCDZNZ2SKIc3ZOU00jDZXsem2_iR7b3ROGbZkNLD95OTtToHbeBEpesppZV1c_AFKO89_L3oi09KEp0KIZwIlW9kSSnXcplqy8TU_XJ6y-S6A_pI3BK5xs0xia4WfHkxYJxWTcCAj",
        alt: "React logo abstract representation",
        tag: "Dev Environment",
        date: "Oct 12",
        title: "My Vim Configuration for React Native Development",
        excerpt: "Setting up Neovim with LSP, Treesitter, and specific plugins to supercharge your React Native workflow without leaving the terminal."
    }
];

export default function Blog() {
    return (
        <main className="flex-1 w-full max-w-7xl mx-auto px-4 pt-28 pb-20 lg:px-8">
            <section className="mb-16">
                <div
                    className="group relative overflow-hidden rounded-3xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex flex-col md:flex-row">
                        <div className="w-full md:w-1/2 relative min-h-75 overflow-hidden">
                            <Image
                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuC1CyYguc4bmIgMBxX3c9z59bInqd5CXVW1--rvwRz39q9-pN6cD6eqZ9WlJg1Yb1cWAALL1VA6KjN60eKv3a3xMze2tVk1Nc170DSknIgzg1laAPaXjLUNH9VZI4_5OGmNACSAiwjIjeymcS5GxGzgzyPR6JmxI6Wu8Qk8EVqQB5VEKRrwNDCSv4ORp5ng8si_erNK6Zwyb44DxQ_f2QTX5cEtLYrFwE6Wd_cV94VlUoBZxPwvgqRExiTbMNN8qsQof66ix0wNPH_1"
                                alt="Computer screen showing code editor with syntax highlighting"
                                fill
                                className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent z-10"></div>
                        </div>
                        <div className="flex flex-col justify-center p-8 md:p-12 md:w-1/2 gap-5 bg-white">
                            <div className="flex items-center gap-3">
                                <span
                                    className="px-3 py-1 rounded-full bg-primary text-white text-xs font-bold tracking-wide shadow-sm shadow-primary/20">FEATURED</span>
                                <span className="flex items-center text-text-muted text-xs font-semibold gap-1">
                                    <span className="material-symbols-outlined text-[16px]">calendar_today</span> Nov 14
                                </span>
                                <span className="text-text-muted text-xs font-semibold">•</span>
                                <span className="text-text-muted text-xs font-semibold">8 min read</span>
                            </div>
                            <h1
                                className="text-3xl md:text-4xl lg:text-5xl font-bold leading-[1.1] tracking-tight text-text-main">
                                Memory Management in C: A Deep Dive
                            </h1>
                            <p className="text-text-muted text-lg leading-relaxed line-clamp-3">
                                Understanding pointers, dynamic allocation, and how to avoid common pitfalls like memory
                                leaks and segfaults in your low-level applications.
                            </p>
                            <div className="pt-4">
                                <button
                                    className="inline-flex items-center gap-2 text-primary font-bold hover:gap-3 transition-all">
                                    Read Full Article <span className="material-symbols-outlined text-lg">arrow_right_alt</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <div className="flex flex-col lg:flex-row gap-12">
                <div className="flex-1">
                    <div className="flex items-center justify-between mb-8 border-b border-slate-200 pb-4">
                        <h2 className="text-2xl font-bold flex items-center gap-2">
                            <span className="material-symbols-outlined text-primary">new_releases</span> Latest Articles
                        </h2>
                        <div className="flex gap-2 bg-white p-1 rounded-lg border border-slate-200">
                            <button className="p-1.5 rounded-md bg-primary-light text-primary shadow-sm transition-colors">
                                <span className="material-symbols-outlined text-xl">grid_view</span>
                            </button>
                            <button className="p-1.5 rounded-md text-text-muted hover:bg-slate-100 transition-colors">
                                <span className="material-symbols-outlined text-xl">view_list</span>
                            </button>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {articles.map((article, index) => (
                            <article
                                key={index}
                                className="group card-hover flex flex-col h-full bg-white border border-slate-200 rounded-2xl overflow-hidden">
                                <div className="h-52 overflow-hidden relative">
                                    <div className="absolute top-4 left-4 z-10">
                                        <span
                                            className="px-3 py-1 bg-white/90 backdrop-blur-sm text-text-main text-xs font-bold rounded-full shadow-sm">
                                            {article.category}
                                        </span>
                                    </div>
                                    <Image
                                        src={article.image}
                                        alt={article.alt}
                                        fill
                                        className="object-cover object-center group-hover:scale-110 transition-transform duration-500"
                                    />
                                </div>
                                <div className="flex flex-col flex-1 p-6 gap-3">
                                    <div className="flex items-center gap-2 text-xs text-text-muted font-medium">
                                        <span className="bg-slate-100 px-2 py-0.5 rounded text-slate-600">{article.tag}</span>
                                        <span>•</span>
                                        <span>{article.date}</span>
                                    </div>
                                    <h3
                                        className="text-xl font-bold leading-tight text-text-main group-hover:text-primary transition-colors">
                                        {article.title}
                                    </h3>
                                    <p className="text-text-muted text-sm leading-relaxed line-clamp-3">
                                        {article.excerpt}
                                    </p>
                                    <div className="mt-auto pt-4 flex items-center text-primary text-sm font-bold">
                                        Read More <span
                                            className="material-symbols-outlined text-base ml-1 group-hover:translate-x-1 transition-transform">arrow_forward</span>
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>
                </div>
                <aside className="w-full lg:w-80 flex flex-col gap-8 shrink-0">
                    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
                        <div className="flex flex-col items-center text-center gap-4">
                            <div className="relative size-20 rounded-full overflow-hidden border-4 border-primary-light">
                                <Image
                                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBZ7eQPZHm1FDtxTUoKqzKHO-7LpVXrtK3wCAF2ySzRneawJ21T8lQ3ysBOYRBE76LxuSkGuwJFl7h6Bk3s3dRwIPG2lNWBBwygbsL2cxHL--Om_AYXkI9koVPU3GcqmXVaIu7WCdnp_SsBzR8oLYTFxI5aPlFIlVxlomEM6vUJNF2rldC9BNwPSJCg23XPXRKZ_W2VhcZ9rJ4SodkK3QT7ZqDCj_XC7P9amZYoXLjYTsbvaHftYAdMWrSxFxVaebz_tHTmDydU226P"
                                    alt="Portrait of the blog author"
                                    fill
                                    className="object-cover object-center"
                                />
                            </div>
                            <div>
                                <h3 className="text-lg font-bold">Hi, I'm Alex!</h3>
                                <p className="text-sm text-text-muted leading-relaxed mt-2">
                                    I'm a full-stack engineer passionate about C, Linux internals, and building performant
                                    web apps.
                                </p>
                            </div>
                            <a className="w-full py-2 rounded-xl bg-primary-light/50 text-primary text-sm font-bold hover:bg-primary hover:text-white transition-colors"
                                href="#">More about me</a>
                        </div>
                    </div>
                    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
                        <h3 className="text-base font-bold mb-4 flex items-center gap-2">
                            <span className="material-symbols-outlined text-primary">search</span> Search Articles
                        </h3>
                        <div className="relative group">
                            <input
                                className="w-full h-11 pl-11 pr-4 rounded-xl bg-slate-50 border border-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/20 text-sm placeholder:text-text-muted/60 transition-all outline-none"
                                placeholder="e.g. Linux Kernel..." type="text" />
                            <span
                                className="material-symbols-outlined absolute left-3 top-2.5 text-text-muted group-focus-within:text-primary transition-colors">search</span>
                        </div>
                    </div>
                    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
                        <h3 className="text-base font-bold mb-4 flex items-center gap-2">
                            <span className="material-symbols-outlined text-primary">tag</span> Explore Topics
                        </h3>
                        <div className="flex flex-wrap gap-2">
                            <a className="px-3 py-1.5 rounded-full bg-primary text-white transition-colors text-xs font-bold"
                                href="#">All</a>
                            <a className="px-3 py-1.5 rounded-full bg-slate-50 border border-slate-200 hover:border-primary hover:text-primary transition-colors text-xs font-semibold text-text-muted"
                                href="#">JavaScript</a>
                            <a className="px-3 py-1.5 rounded-full bg-slate-50 border border-slate-200 hover:border-primary hover:text-primary transition-colors text-xs font-semibold text-text-muted"
                                href="#">C</a>
                            <a className="px-3 py-1.5 rounded-full bg-slate-50 border border-slate-200 hover:border-primary hover:text-primary transition-colors text-xs font-semibold text-text-muted"
                                href="#">Linux</a>
                            <a className="px-3 py-1.5 rounded-full bg-slate-50 border border-slate-200 hover:border-primary hover:text-primary transition-colors text-xs font-semibold text-text-muted"
                                href="#">React Native</a>
                            <a className="px-3 py-1.5 rounded-full bg-slate-50 border border-slate-200 hover:border-primary hover:text-primary transition-colors text-xs font-semibold text-text-muted"
                                href="#">PHP</a>
                            <a className="px-3 py-1.5 rounded-full bg-slate-50 border border-slate-200 hover:border-primary hover:text-primary transition-colors text-xs font-semibold text-text-muted"
                                href="#">System Design</a>
                            <a className="px-3 py-1.5 rounded-full bg-slate-50 border border-slate-200 hover:border-primary hover:text-primary transition-colors text-xs font-semibold text-text-muted"
                                href="#">DevOps</a>
                        </div>
                    </div>
                    <div className="relative overflow-hidden bg-primary rounded-2xl p-6 text-white shadow-lg shadow-primary/20">
                        <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
                        <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
                        <div className="relative z-10">
                            <div className="flex items-center gap-3 mb-3">
                                <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                                    <span className="material-symbols-outlined">mail</span>
                                </div>
                                <h3 className="text-lg font-bold">Newsletter</h3>
                            </div>
                            <p className="text-sm text-sky-100 mb-5 leading-relaxed">
                                Get the latest low-level insights delivered straight to your inbox. No spam.
                            </p>
                            <div className="flex flex-col gap-3">
                                <input
                                    className="w-full h-11 px-4 rounded-xl bg-white/10 border border-white/20 placeholder:text-sky-200 text-white focus:outline-none focus:bg-white/20 focus:border-white/40 text-sm transition-all"
                                    placeholder="your@email.com" type="email" />
                                <button
                                    className="w-full h-11 bg-white text-primary hover:bg-sky-50 font-bold rounded-xl transition-colors shadow-sm">Subscribe</button>
                            </div>
                        </div>
                    </div>
                </aside>
            </div>
        </main>
    )
}