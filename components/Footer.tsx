import Link from "next/link";

export default function Footer() {
    return (
        <footer className="bg-slate-50 border-t border-slate-200 pt-16 pb-12">
            <div className="max-w-6xl mx-auto px-6">
                <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-16">
                    <div className="text-center md:text-left">
                        <h3 className="text-2xl font-bold text-slate-900 mb-2">Ready to collaborate?</h3>
                        <p className="text-slate-600">I'm currently open for freelance projects and new opportunities.</p>
                    </div>
                    <div className="flex gap-4">
                        <a
                            href="https://github.com/dipras"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 px-6 py-3 bg-white border border-slate-200 rounded-lg text-slate-700 font-bold hover:bg-slate-50 hover:border-slate-300 transition-all"
                        >
                            GitHub
                        </a>
                        <a
                            href="https://www.linkedin.com/in/aldy-prastyo/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 px-6 py-3 bg-white border border-slate-200 rounded-lg text-slate-700 font-bold hover:bg-slate-50 hover:border-slate-300 transition-all"
                        >
                            LinkedIn
                        </a>
                        <Link
                            href="/contact"
                            className="flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-lg font-bold hover:bg-primary-hover shadow-lg shadow-primary/20 transition-all"
                        >
                            Let's Talk
                        </Link>
                    </div>
                </div>
                <div className="pt-8 border-t border-slate-200 flex flex-col md:flex-row justify-between items-center text-sm text-slate-500">
                    <p>© 2026 Aldy Prastyo. All rights reserved.</p>
                    <div className="flex gap-6 mt-4 md:mt-0 font-mono text-xs">
                        <span>v2.1.0</span>
                        <span>Sky Theme</span>
                    </div>
                </div>
            </div>
        </footer>
    )
}