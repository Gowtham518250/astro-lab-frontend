import Link from "next/link"
import { Atom, Facebook, Github, Instagram, Linkedin, Twitter, Youtube } from "lucide-react"

export function PublicFooter() {
  return (
    <footer className="border-t border-white/10 bg-slate-950 pt-20 pb-10 text-slate-300">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-5">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-3 transition-opacity hover:opacity-80">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-400 via-sky-500 to-violet-500 shadow-[0_4px_20px_rgba(34,211,238,0.4)]">
                <Atom className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-bold tracking-tight text-white">Astro Lab</span>
            </Link>
            <p className="mt-6 max-w-sm text-base leading-7 text-slate-400">
              Master Physics, Chemistry, Biology, Astronomy, Robotics, Artificial Intelligence, Mathematics, Earth Science and Space Science through beautifully designed expert-led learning experiences.
            </p>
            <div className="mt-8 flex items-center gap-4">
              {[
                { name: "Twitter", icon: Twitter },
                { name: "GitHub", icon: Github },
                { name: "LinkedIn", icon: Linkedin },
                { name: "YouTube", icon: Youtube },
              ].map((social) => {
                const Icon = social.icon
                return (
                  <Link
                    key={social.name}
                    href="#"
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-slate-900 transition-colors hover:border-cyan-400/30 hover:bg-cyan-400/10 hover:text-cyan-300"
                  >
                    <Icon className="h-4 w-4" />
                    <span className="sr-only">{social.name}</span>
                  </Link>
                )
              })}
            </div>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">Platform</h3>
            <ul className="mt-6 space-y-4">
              {["Browse Courses", "Categories", "Pricing", "Enterprise", "Testimonials"].map((item) => (
                <li key={item}>
                  <Link href="#" className="text-sm transition-colors hover:text-cyan-300">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">Company</h3>
            <ul className="mt-6 space-y-4">
              {["About Us", "Careers", "Blog", "Instructors", "Partners"].map((item) => (
                <li key={item}>
                  <Link href="#" className="text-sm transition-colors hover:text-cyan-300">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">Legal</h3>
            <ul className="mt-6 space-y-4">
              {["Privacy Policy", "Terms of Service", "Cookie Policy", "Accessibility", "Support"].map((item) => (
                <li key={item}>
                  <Link href="#" className="text-sm transition-colors hover:text-cyan-300">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-16 border-t border-white/10 pt-8 flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="text-sm text-slate-500">
            &copy; {new Date().getFullYear()} Astro Lab Inc. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 text-sm text-slate-500">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
              </span>
              All systems operational
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
