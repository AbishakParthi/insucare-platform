"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { company, navLinks } from "@insucare/domain";
import { Menu, Phone, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { ThemeToggle } from "./theme-toggle";

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const updateScrolled = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", updateScrolled);
    updateScrolled();
    return () => window.removeEventListener("scroll", updateScrolled);
  }, []);

  return (
    <motion.header 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }}
      className={`sticky top-0 z-50 transition-all duration-500 border-b border-oxblood/10 dark:border-white/10 bg-white/85 dark:bg-ink/85 backdrop-blur-2xl ${
        isScrolled ? "shadow-sm" : ""
      }`}
    >
      <div className={`container-padded flex items-center justify-between gap-6 transition-all duration-500 ${isScrolled ? "min-h-20" : "min-h-24"}`}>
        <Link href="/" className="flex items-center gap-3 transition-transform hover:scale-105" aria-label="InsuCARE home" onClick={() => setIsOpen(false)}>
          <Image
            src="/brand/insucare-logo.jpeg"
            alt="InsuCARE logo"
            width={132}
            height={72}
            className="h-12 w-auto rounded-sm object-contain shadow-sm"
            priority
          />
          <span className="hidden border-l border-oxblood/20 pl-3 text-xs font-bold uppercase tracking-[0.28em] text-oxblood dark:text-champagne md:block">
            IRDAI Registered
          </span>
        </Link>
        <nav className="hidden items-center gap-8 text-sm font-semibold text-ink/80 dark:text-porcelain/80 lg:flex">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link 
                key={link.href} 
                href={link.href} 
                className={`relative group transition-colors hover:text-oxblood dark:hover:text-champagne ${isActive ? "text-oxblood dark:text-champagne" : ""}`}
              >
                {link.label}
                {isActive ? (
                  <motion.span layoutId="nav-indicator" className="absolute -bottom-2 left-0 right-0 h-0.5 bg-oxblood dark:bg-champagne rounded-full" />
                ) : (
                  <span className="absolute -bottom-2 left-1/2 w-0 h-0.5 bg-oxblood dark:bg-champagne rounded-full transition-all duration-300 group-hover:w-full group-hover:left-0" />
                )}
              </Link>
            );
          })}
        </nav>
        <div className="hidden items-center gap-3 lg:flex">
          <ThemeToggle />
          <Link
            href={`tel:${company.phone.replace(/\s/g, "")}`}
            className="inline-flex items-center gap-2 rounded-full border border-oxblood/15 dark:border-white/15 px-4 py-2 text-sm font-bold text-oxblood dark:text-white transition-all hover:border-oxblood dark:hover:border-champagne hover:text-oxblood dark:hover:text-champagne hover:scale-105 active:scale-95"
          >
            <Phone className="h-4 w-4" />
            {company.phone}
          </Link>
          <Link href="/contact" className="rounded-full bg-oxblood px-5 py-2.5 text-sm font-bold text-white shadow-premium transition-all hover:bg-garnet hover:scale-105 active:scale-95 hover:shadow-glow">
            Get Consultation
          </Link>
        </div>
        <div className="flex items-center gap-3 lg:hidden">
          <ThemeToggle />
          <button 
            className="rounded-full border border-oxblood/15 dark:border-white/15 text-oxblood dark:text-white flex h-[46px] w-[46px] items-center justify-center overflow-hidden" 
            aria-label={isOpen ? "Close navigation" : "Open navigation"}
            onClick={() => setIsOpen(!isOpen)}
          >
          <AnimatePresence mode="wait" initial={false}>
            {isOpen ? (
              <motion.div
                key="close"
                initial={{ opacity: 0, rotate: -90 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: 90 }}
                transition={{ duration: 0.2 }}
              >
                <X className="h-5 w-5" />
              </motion.div>
            ) : (
              <motion.div
                key="menu"
                initial={{ opacity: 0, rotate: -90 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: 90 }}
                transition={{ duration: 0.2 }}
              >
                <Menu className="h-5 w-5" />
              </motion.div>
            )}
          </AnimatePresence>
        </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="border-t border-oxblood/10 dark:border-white/10 bg-white/95 dark:bg-ink/95 backdrop-blur-xl px-6 py-6 lg:hidden shadow-premium-hover absolute w-full left-0 overflow-hidden"
          >
            <motion.nav 
              initial="closed"
              animate="open"
              exit="closed"
              variants={{
                open: { transition: { staggerChildren: 0.05, delayChildren: 0.1 } },
                closed: { transition: { staggerChildren: 0.05, staggerDirection: -1 } }
              }}
              className="flex flex-col gap-6"
            >
              {navLinks.map((link) => (
                <motion.div key={link.href} variants={{ closed: { opacity: 0, x: -16 }, open: { opacity: 1, x: 0 } }}>
                  <Link 
                    href={link.href} 
                    onClick={() => setIsOpen(false)}
                    className={`block text-lg font-bold transition-colors ${pathname === link.href ? "text-oxblood dark:text-champagne" : "text-ink/80 dark:text-porcelain/80 hover:text-oxblood dark:hover:text-champagne"}`}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div variants={{ closed: { opacity: 0, y: 16 }, open: { opacity: 1, y: 0 } }} className="mt-2 flex flex-col gap-4 border-t border-oxblood/10 dark:border-white/10 pt-6">
                <Link
                  href={`tel:${company.phone.replace(/\s/g, "")}`}
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-oxblood/15 dark:border-white/15 px-4 py-3.5 text-sm font-bold text-oxblood dark:text-white hover:bg-oxblood/5 dark:hover:bg-white/5 transition-transform active:scale-95"
                >
                  <Phone className="h-4 w-4" />
                  {company.phone}
                </Link>
                <Link 
                  href="/contact" 
                  onClick={() => setIsOpen(false)} 
                  className="rounded-full bg-oxblood px-5 py-3.5 text-center text-sm font-bold text-white shadow-premium hover:bg-garnet hover:shadow-glow transition-transform active:scale-95"
                >
                  Get Consultation
                </Link>
              </motion.div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
