'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

export default function Navbar() {
    const pathname = usePathname();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const navLinks = [
        { name: 'About', href: '/about' },
        { name: 'Projects', href: '/projects' },
        { name: 'Blog', href: '/blog' },
        { name: 'Contact', href: '/contact' },
    ];

    useEffect(() => {
        if (!isMenuOpen) return;

        const closeOnEscape = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                setIsMenuOpen(false);
            }
        };

        window.addEventListener('keydown', closeOnEscape);
        return () => window.removeEventListener('keydown', closeOnEscape);
    }, [isMenuOpen]);

    return (
        <header
            className="fixed top-0 z-50 w-full bg-white/80 backdrop-blur-lg border-b border-border transition-all duration-300">
            <div className="max-w-300 mx-auto px-4 md:px-10 h-16 flex items-center justify-between">
                <Link href="/" className="flex items-center gap-2" onClick={() => setIsMenuOpen(false)}>
                    <div
                        className="size-9 flex items-center justify-center rounded-xl bg-primary text-white shadow-lg shadow-primary/20">
                        <span className="material-symbols-outlined text-[20px]">terminal</span>
                    </div>
                    <h2 className="text-xl font-bold tracking-tight">Dipras</h2>
                </Link>
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
                <a href='/aldy_prastyo.pdf'
                    className="hidden md:flex items-center justify-center gap-2 rounded-full h-10 px-6 bg-primary text-white text-sm font-semibold hover:bg-primary-hover transition-all shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transform hover:-translate-y-0.5 active:translate-y-0">
                    <span>Resume</span>
                    <span className="material-symbols-outlined text-[18px]">download</span>
                </a>
                <button
                    type="button"
                    className="md:hidden flex size-10 items-center justify-center rounded-full text-text-main hover:bg-slate-100 transition-colors"
                    aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
                    aria-expanded={isMenuOpen}
                    aria-controls="mobile-navigation"
                    onClick={() => setIsMenuOpen((isOpen) => !isOpen)}
                >
                    <span className="material-symbols-outlined">
                        {isMenuOpen ? 'close' : 'menu'}
                    </span>
                </button>
            </div>
            {isMenuOpen && (
                <>
                    <button
                        type="button"
                        aria-label="Close navigation menu"
                        className="fixed inset-x-0 top-16 h-[calc(100vh-4rem)] bg-slate-900/20 md:hidden"
                        onClick={() => setIsMenuOpen(false)}
                    />
                    <nav
                        id="mobile-navigation"
                        className="absolute inset-x-4 top-18 z-10 flex flex-col gap-2 rounded-2xl border border-slate-200 bg-white p-3 shadow-xl md:hidden"
                    >
                        {navLinks.map((link) => {
                            const isActive = pathname === link.href;

                            return (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    onClick={() => setIsMenuOpen(false)}
                                    className={`rounded-xl px-4 py-3 text-sm transition-colors ${
                                        isActive
                                            ? 'bg-primary-light font-bold text-primary'
                                            : 'font-medium text-text-muted hover:bg-slate-50 hover:text-primary'
                                    }`}
                                >
                                    {link.name}
                                </Link>
                            );
                        })}
                        <a
                            href="/aldy_prastyo.pdf"
                            onClick={() => setIsMenuOpen(false)}
                            className="mt-1 flex items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary-hover"
                        >
                            <span>Resume</span>
                            <span className="material-symbols-outlined text-[18px]">download</span>
                        </a>
                    </nav>
                </>
            )}
        </header>
    )
}
