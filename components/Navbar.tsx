'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';

export default function Navbar() {
    const pathname = usePathname();

    const navLinks = [
        { name: 'About', href: '/about' },
        { name: 'Projects', href: '/projects' },
        { name: 'Blog', href: '/blog' },
        { name: 'Contact', href: '/contact' },
    ];

    return (
        <header
            className="fixed top-0 z-50 w-full bg-white/80 backdrop-blur-lg border-b border-border transition-all duration-300">
            <div className="max-w-300 mx-auto px-4 md:px-10 h-16 flex items-center justify-between">
                <a href='/' className="flex items-center gap-2">
                    <div
                        className="size-9 flex items-center justify-center rounded-xl bg-primary text-white shadow-lg shadow-primary/20">
                        <span className="material-symbols-outlined text-[20px]">terminal</span>
                    </div>
                    <h2 className="text-xl font-bold tracking-tight">Dipras</h2>
                </a>
                <nav className="hidden md:flex items-center gap-1 bg-slate-100/50 p-1 rounded-full border border-slate-200/50">
                    {navLinks.map((link) => {
                        const isActive = pathname === link.href;
                        return (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={`px-5 py-1.5 text-sm rounded-full transition-colors ${isActive
                                    ? 'font-bold text-primary bg-white shadow-sm'
                                    : 'font-medium text-text-muted hover:text-primary'
                                    }`}
                            >
                                {link.name}
                            </Link>
                        );
                    })}
                </nav>
                <button
                    className="hidden md:flex items-center justify-center gap-2 rounded-full h-10 px-6 bg-primary text-white text-sm font-semibold hover:bg-primary-hover transition-all shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transform hover:-translate-y-0.5 active:translate-y-0">
                    <span>Resume</span>
                    <span className="material-symbols-outlined text-[18px]">download</span>
                </button>
                <button className="md:hidden text-text-main p-2">
                    <span className="material-symbols-outlined">menu</span>
                </button>
            </div>
        </header>
    )
}