export default function Projects() {
    return (
        <main className="grow pt-28 pb-20">
            <div className="max-w-300 mx-auto px-4 md:px-10 flex flex-col gap-12">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div className="flex flex-col gap-3 max-w-2xl">
                        <div
                            className="inline-flex w-fit items-center gap-2 px-3 py-1 rounded-full bg-primary-soft text-primary text-xs font-bold uppercase tracking-wider mb-2">
                            <span className="size-2 rounded-full bg-primary animate-pulse"></span>
                            Portfolio 2024
                        </div>
                        <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-text-main">
                            Selected Works
                        </h1>
                        <p className="text-text-muted text-lg md:text-xl font-medium leading-relaxed max-w-lg">
                            Exploring the intersection of web, mobile, and low-level systems.
                        </p>
                    </div>
                    <div className="flex flex-wrap gap-2 md:justify-end">
                        <button
                            className="h-10 px-6 rounded-full bg-primary text-white text-sm font-semibold shadow-md shadow-primary/20 hover:bg-primary-hover transition-all">
                            All
                        </button>
                        <button
                            className="h-10 px-6 rounded-full bg-white border border-border text-text-muted hover:text-primary hover:border-primary/30 transition-all text-sm font-medium hover:bg-primary-soft/50 hover:shadow-sm">
                            Web
                        </button>
                        <button
                            className="h-10 px-6 rounded-full bg-white border border-border text-text-muted hover:text-primary hover:border-primary/30 transition-all text-sm font-medium hover:bg-primary-soft/50 hover:shadow-sm">
                            Mobile
                        </button>
                        <button
                            className="h-10 px-6 rounded-full bg-white border border-border text-text-muted hover:text-primary hover:border-primary/30 transition-all text-sm font-medium hover:bg-primary-soft/50 hover:shadow-sm">
                            Systems
                        </button>
                    </div>
                </div>
                <div className="w-full">
                    <div
                        className="group relative flex flex-col md:flex-row overflow-hidden rounded-3xl bg-card shadow-xl shadow-slate-200/60 border border-slate-100 hover:shadow-2xl hover:shadow-slate-200/80 transition-all duration-300 transform hover:-translate-y-1">
                        <div
                            className="flex flex-col justify-center p-8 md:p-12 md:w-1/2 gap-6 order-2 md:order-1 relative z-10">
                            <div className="flex flex-col gap-4">
                                <div className="flex items-center gap-3">
                                    <span
                                        className="px-3 py-1 rounded-full bg-orange-100 text-orange-600 text-xs font-bold uppercase tracking-wide">Featured
                                        Project</span>
                                    <span className="flex items-center gap-1 text-xs font-semibold text-text-muted">
                                        <span className="material-symbols-outlined text-[14px]">calendar_today</span> 2023
                                    </span>
                                </div>
                                <h3
                                    className="text-3xl md:text-4xl font-bold text-text-main group-hover:text-primary transition-colors">
                                    Kernel Module Monitor</h3>
                                <p className="text-text-muted text-base leading-relaxed">
                                    A lightweight monitoring tool for custom kernel modules built for Arch Linux
                                    environments. Optimized for low-overhead performance, featuring real-time memory
                                    tracking and deadlock detection.
                                </p>
                                <div className="flex flex-wrap gap-2 mt-2">
                                    <span
                                        className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-600 text-xs font-mono font-medium border border-slate-200">C
                                        Language</span>
                                    <span
                                        className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-600 text-xs font-mono font-medium border border-slate-200">Linux
                                        Kernel</span>
                                    <span
                                        className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-600 text-xs font-mono font-medium border border-slate-200">Makefile</span>
                                </div>
                            </div>
                            <div className="flex items-center gap-4 mt-2">
                                <a className="flex items-center justify-center gap-2 h-12 px-8 rounded-full bg-text-main text-white font-semibold text-sm hover:bg-primary transition-colors shadow-lg shadow-slate-900/10 group/btn"
                                    href="#">
                                    <span>View Case Study</span>
                                    <span
                                        className="material-symbols-outlined text-[18px] group-hover/btn:translate-x-1 transition-transform">arrow_forward</span>
                                </a>
                                <a className="flex items-center justify-center size-12 rounded-full border border-border text-text-main hover:border-primary hover:text-primary transition-colors bg-white hover:bg-primary-soft/10"
                                    href="#" title="Source Code">
                                    <span className="material-symbols-outlined text-[20px]">code</span>
                                </a>
                            </div>
                        </div>
                        <div className="md:w-1/2 bg-slate-900 relative order-1 md:order-2 min-h-80 overflow-hidden">
                            <div
                                className="absolute inset-0 bg-linear-to-lfrom-transparent to-black/20 z-10 md:block hidden">
                            </div>
                            <div
                                className="absolute inset-0 bg-linear-to-t from-black/40 to-transparent z-10 md:hidden block">
                            </div>
                            <div className="w-full h-full bg-cover bg-center transform group-hover:scale-105 transition-transform duration-700 ease-in-out"
                                style={{ backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuAp5LJpyw3iz8DlZ2L5E6M_b3fxlFQ64_0NpNXHQmDud81bxdb3CsEGQPjGsO-fC_Pwh72o68OR5w1NCFwpW1cJ2m95jYTMY5tUmKomgFLStuWuuvCzbE28Fm4hOAfXKZNRiKX5B87UoGkoYz37BjUcA5iljfym8C-HCRtBukyLQWwz-S99cqspLEX_jr3GLd2D-9q6SuCNiTXZGd6qf4U94FsWyM9k3OI1hG45zyLQB5cdhkAV5adLacrRboqrMumwA5s8BcEG8Acn')` }}>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <div
                        className="group flex flex-col rounded-3xl bg-card overflow-hidden shadow-lg shadow-slate-200/50 hover:shadow-xl hover:shadow-slate-200/80 transition-all duration-300 hover:-translate-y-1 border border-slate-100">
                        <div className="relative h-56 overflow-hidden">
                            <div className="absolute top-4 right-4 z-20">
                                <div
                                    className="size-10 rounded-full bg-white/90 backdrop-blur flex items-center justify-center shadow-sm text-primary">
                                    <span className="material-symbols-outlined text-[20px]">dashboard</span>
                                </div>
                            </div>
                            <div className="w-full h-full bg-cover bg-center transform group-hover:scale-105 transition-transform duration-500"
                                style={{ backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuCtioZY23N8_pevNafrNF5Fw1z_q_zXSpZdn1Rf0O4asyFi9DCWJB5DiCSsH9cVnNDL-sN8GRePRgUivs7w7ntE0iqCDDxRXUI-X_0lqayRJx9wPtLkq-HNPBMjKg6Zt3yF5PXZg7BvlSccf6suvtdt6rCOYQcr4_-Nh_JgBemaA-4xVGWLXwjssjIfpUxUmQhHll5iyX9J2zpbMKwJBVV0fEe2aLrTqyJfldYk8Zii7gfkPUIMjZFZOA_83MTu360EpqqpZBZ3AWjL')` }}>
                            </div>
                            <div className="absolute inset-0 bg-linear-to-t from-black/50 to-transparent opacity-40"></div>
                        </div>
                        <div className="flex flex-col flex-1 p-6 gap-4">
                            <div>
                                <h3
                                    className="text-xl font-bold text-text-main mb-2 group-hover:text-primary transition-colors">
                                    E-Commerce Dashboard</h3>
                                <p className="text-text-muted text-sm leading-relaxed line-clamp-3">
                                    Full-stack inventory management system with real-time analytics. Includes Stripe
                                    integration.
                                </p>
                            </div>
                            <div className="mt-auto pt-4 border-t border-dashed border-slate-100 flex flex-col gap-4">
                                <div className="flex flex-wrap gap-2">
                                    <span
                                        className="text-[11px] font-bold px-3 py-1 rounded-full bg-primary-soft text-primary">PHP</span>
                                    <span
                                        className="text-[11px] font-bold px-3 py-1 rounded-full bg-primary-soft text-primary">Vue.js</span>
                                    <span
                                        className="text-[11px] font-bold px-3 py-1 rounded-full bg-primary-soft text-primary">MySQL</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <a className="text-sm font-bold text-text-main hover:text-primary flex items-center gap-1 group/link transition-colors"
                                        href="#">
                                        Live Demo <span
                                            className="material-symbols-outlined text-[16px] group-hover/link:translate-x-0.5 transition-transform">arrow_outward</span>
                                    </a>
                                    <a className="text-text-muted hover:text-primary transition-colors p-2 hover:bg-slate-50 rounded-full"
                                        href="#">
                                        <span className="material-symbols-outlined text-[20px]">code</span>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div
                        className="group flex flex-col rounded-3xl bg-card overflow-hidden shadow-lg shadow-slate-200/50 hover:shadow-xl hover:shadow-slate-200/80 transition-all duration-300 hover:-translate-y-1 border border-slate-100">
                        <div className="relative h-56 overflow-hidden">
                            <div className="absolute top-4 right-4 z-20">
                                <div
                                    className="size-10 rounded-full bg-white/90 backdrop-blur flex items-center justify-center shadow-sm text-primary">
                                    <span className="material-symbols-outlined text-[20px]">smartphone</span>
                                </div>
                            </div>
                            <div className="w-full h-full bg-cover bg-center transform group-hover:scale-105 transition-transform duration-500"
                                style={{ backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuCGQWImCp0L7lErwaxNRWAFgtWmYWXz6zKrmngqrDTCImh2yPaOkt28wZuWMRlkamgxctWTfLLjPVik9UAt2ZMK0DPeIbxtOfxK5X5RkGrkjwDuyzMIv9_dOES4HuWvzL_9fJBVyeHZENzqs3FYcX11imL__sh8aELNU0iJMrurRQQIEOP1ZYozivpIzTUdPIr-aPvVZV0i5tJboLF3LeouDnz7LsMdL9ZcBy91L9OA9ycVobrHf0DyHMEIincTQYeINBGFJwV-KjWc')` }}>
                            </div>
                            <div className="absolute inset-0 bg-linear-to-t from-black/50 to-transparent opacity-40"></div>
                        </div>
                        <div className="flex flex-col flex-1 p-6 gap-4">
                            <div>
                                <h3
                                    className="text-xl font-bold text-text-main mb-2 group-hover:text-primary transition-colors">
                                    Crypto Wallet Mobile</h3>
                                <p className="text-text-muted text-sm leading-relaxed line-clamp-3">
                                    A secure, non-custodial wallet mobile application. Features biometric authentication and
                                    WebSockets.
                                </p>
                            </div>
                            <div className="mt-auto pt-4 border-t border-dashed border-slate-100 flex flex-col gap-4">
                                <div className="flex flex-wrap gap-2">
                                    <span
                                        className="text-[11px] font-bold px-3 py-1 rounded-full bg-primary-soft text-primary">React
                                        Native</span>
                                    <span
                                        className="text-[11px] font-bold px-3 py-1 rounded-full bg-primary-soft text-primary">TypeScript</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <a className="text-sm font-bold text-text-main hover:text-primary flex items-center gap-1 group/link transition-colors"
                                        href="#">
                                        View App <span
                                            className="material-symbols-outlined text-[16px] group-hover/link:translate-x-0.5 transition-transform">arrow_outward</span>
                                    </a>
                                    <a className="text-text-muted hover:text-primary transition-colors p-2 hover:bg-slate-50 rounded-full"
                                        href="#">
                                        <span className="material-symbols-outlined text-[20px]">code</span>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div
                        className="group flex flex-col rounded-3xl bg-card overflow-hidden shadow-lg shadow-slate-200/50 hover:shadow-xl hover:shadow-slate-200/80 transition-all duration-300 hover:-translate-y-1 border border-slate-100">
                        <div
                            className="relative h-56 overflow-hidden bg-slate-900 flex items-center justify-center group-hover:bg-slate-800 transition-colors">
                            <div className="absolute top-4 right-4 z-20">
                                <div
                                    className="size-10 rounded-full bg-white/10 backdrop-blur flex items-center justify-center shadow-sm">
                                    <span className="material-symbols-outlined text-white text-[20px]">settings_suggest</span>
                                </div>
                            </div>
                            <div className="absolute inset-0 opacity-30"
                                style={{ backgroundImage: `radial-gradient(#94a3b8 1px, transparent 1px)`, backgroundSize: `16px 16px` }}>
                            </div>
                            <span
                                className="material-symbols-outlined text-7xl text-slate-700 group-hover:text-primary transition-colors duration-500">terminal</span>
                        </div>
                        <div className="flex flex-col flex-1 p-6 gap-4">
                            <div>
                                <h3
                                    className="text-xl font-bold text-text-main mb-2 group-hover:text-primary transition-colors">
                                    Auto-Backup Script</h3>
                                <p className="text-text-muted text-sm leading-relaxed line-clamp-3">
                                    Automated bash script for server backups. Compresses directories, encrypts with GPG,
                                    uploads to S3.
                                </p>
                            </div>
                            <div className="mt-auto pt-4 border-t border-dashed border-slate-100 flex flex-col gap-4">
                                <div className="flex flex-wrap gap-2">
                                    <span
                                        className="text-[11px] font-bold px-3 py-1 rounded-full bg-primary-soft text-primary">Bash</span>
                                    <span
                                        className="text-[11px] font-bold px-3 py-1 rounded-full bg-primary-soft text-primary">AWS
                                        CLI</span>
                                    <span
                                        className="text-[11px] font-bold px-3 py-1 rounded-full bg-primary-soft text-primary">Linux</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <a className="text-sm font-bold text-text-main hover:text-primary flex items-center gap-1 group/link transition-colors"
                                        href="#">
                                        View Gist <span
                                            className="material-symbols-outlined text-[16px] group-hover/link:translate-x-0.5 transition-transform">arrow_outward</span>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div
                        className="group flex flex-col rounded-3xl bg-card overflow-hidden shadow-lg shadow-slate-200/50 hover:shadow-xl hover:shadow-slate-200/80 transition-all duration-300 hover:-translate-y-1 border border-slate-100">
                        <div className="relative h-56 overflow-hidden">
                            <div className="absolute top-4 right-4 z-20">
                                <div
                                    className="size-10 rounded-full bg-white/90 backdrop-blur flex items-center justify-center shadow-sm text-primary">
                                    <span className="material-symbols-outlined text-[20px]">memory</span>
                                </div>
                            </div>
                            <div className="w-full h-full bg-cover bg-center transform group-hover:scale-105 transition-transform duration-500"
                                style={{ backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuCypWURj9IUGMfiENVyOQxitWn23Asp7RofGs3KIuPWwfVm4nJoytN5YdLKCHVvfHxQwwaxNGW-x7DciHZdRKlFRoZwH6A6p7Udm1B5xqN86bgDKyhhYPcUUytNXOVo0UUkkSpxGxJUUpqG09m73bv5JjUYjsJnZiIB44Gn5vim37ZWMAH6wZyzfInQYWp8uJRkyLIzX9M5RKZRUQRo1NT31VL7TfVMCKvbO-WGg9lam65AGjovudDy8Ec6_s9s1SUsLLgn7g95XRXw')` }}>
                            </div>
                            <div className="absolute inset-0 bg-linear-to-t from-black/50 to-transparent opacity-40"></div>
                        </div>
                        <div className="flex flex-col flex-1 p-6 gap-4">
                            <div>
                                <h3
                                    className="text-xl font-bold text-text-main mb-2 group-hover:text-primary transition-colors">
                                    Custom Memory Allocator</h3>
                                <p className="text-text-muted text-sm leading-relaxed line-clamp-3">
                                    Implementation of malloc/free in C to understand memory management. Handles block
                                    splitting/coalescing.
                                </p>
                            </div>
                            <div className="mt-auto pt-4 border-t border-dashed border-slate-100 flex flex-col gap-4">
                                <div className="flex flex-wrap gap-2">
                                    <span
                                        className="text-[11px] font-bold px-3 py-1 rounded-full bg-primary-soft text-primary">C</span>
                                    <span
                                        className="text-[11px] font-bold px-3 py-1 rounded-full bg-primary-soft text-primary">System</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <a className="text-sm font-bold text-text-main hover:text-primary flex items-center gap-1 group/link transition-colors"
                                        href="#">
                                        Source Code <span
                                            className="material-symbols-outlined text-[16px] group-hover/link:translate-x-0.5 transition-transform">arrow_outward</span>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div
                        className="group flex flex-col rounded-3xl bg-card overflow-hidden shadow-lg shadow-slate-200/50 hover:shadow-xl hover:shadow-slate-200/80 transition-all duration-300 hover:-translate-y-1 border border-slate-100">
                        <div className="relative h-56 overflow-hidden">
                            <div className="absolute top-4 right-4 z-20">
                                <div
                                    className="size-10 rounded-full bg-white/90 backdrop-blur flex items-center justify-center shadow-sm text-primary">
                                    <span className="material-symbols-outlined text-[20px]">web</span>
                                </div>
                            </div>
                            <div className="w-full h-full bg-cover bg-center transform group-hover:scale-105 transition-transform duration-500"
                                style={{backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuAuirhbn0xgX3lMsTpbplcbFuYSILb1yayooyVfkUxwaLYVj8SO6QZdmhUSbKKM3o9f0jgygdG1_G5kI3POF8j7GH4jlK7jkjdOtbDkGHpBMXt6_5H3g742yc-dqgjhu7a0NQRkLTHuLZEWpt0HO72sAMece6QfHhUsp8mZkTm3OXPBE3vEFG3ybsKfUgoxXSw0st8GJSGUr9FGAEaIAaYMk5kvaJhhzBff9be2dOj5thpARRj8vNB2ouFUk5ef8AbXJZNiv-nnELGI')`}}>
                            </div>
                            <div className="absolute inset-0 bg-linear-to-t from-black/50 to-transparent opacity-40"></div>
                        </div>
                        <div className="flex flex-col flex-1 p-6 gap-4">
                            <div>
                                <h3
                                    className="text-xl font-bold text-text-main mb-2 group-hover:text-primary transition-colors">
                                    Portfolio V1</h3>
                                <p className="text-text-muted text-sm leading-relaxed line-clamp-3">
                                    My first personal website built to learn responsive design principles. Static site on
                                    GitHub Pages.
                                </p>
                            </div>
                            <div className="mt-auto pt-4 border-t border-dashed border-slate-100 flex flex-col gap-4">
                                <div className="flex flex-wrap gap-2">
                                    <span
                                        className="text-[11px] font-bold px-3 py-1 rounded-full bg-primary-soft text-primary">HTML/CSS</span>
                                    <span
                                        className="text-[11px] font-bold px-3 py-1 rounded-full bg-primary-soft text-primary">JS</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <a className="text-sm font-bold text-text-main hover:text-primary flex items-center gap-1 group/link transition-colors"
                                        href="#">
                                        Archive <span
                                            className="material-symbols-outlined text-[16px] group-hover/link:translate-x-0.5 transition-transform">arrow_outward</span>
                                    </a>
                                    <a className="text-text-muted hover:text-primary transition-colors p-2 hover:bg-slate-50 rounded-full"
                                        href="#">
                                        <span className="material-symbols-outlined text-[20px]">code</span>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div
                        className="group flex flex-col rounded-3xl bg-primary-soft/30 overflow-hidden border-2 border-dashed border-primary/20 hover:border-primary/50 transition-all duration-300 items-center justify-center p-8 gap-4 cursor-pointer min-h-75">
                        <div
                            className="size-16 rounded-full bg-white flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                            <span className="material-symbols-outlined text-primary text-[32px]">add</span>
                        </div>
                        <h3 className="text-lg font-bold text-primary">Load More Projects</h3>
                    </div>
                </div>
            </div>
        </main>
    )
}