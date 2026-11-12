import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useLanguage } from "./language";
import { categories } from "./navigation";
import { LanguageSwitch, Logo } from "./ui";

const copy = {
  EN: {
    openMenu: "Open menu",
    closeMenu: "Close menu",
    subscribe: "Subscribe",
    menuSubscribe: "Subscribe to the magazine",
    menuLabel: "Site menu",
    issue: "Issue N° 01 — Autumn / Winter 2026",
  },
  FR: {
    openMenu: "Ouvrir le menu",
    closeMenu: "Fermer le menu",
    subscribe: "S'abonner",
    menuSubscribe: "S'abonner au magazine",
    menuLabel: "Menu du site",
    issue: "Numéro 01 — Automne / Hiver 2026",
  },
};

const CategoryLink = ({ item, label }) => {
  const isAnchor = item.to.includes("#");
  const className =
    "group relative py-2 font-sans text-[12px] font-normal tracking-[0.24em] uppercase transition-colors duration-300";

  const underline = (active) => (
    <span
      aria-hidden="true"
      className={`absolute inset-x-0 -bottom-px h-px origin-left bg-ink transition-transform duration-500 ease-luxe ${
        active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
      }`}
    />
  );

  // Hash links point at a section on the home page, so they never show as active.
  if (isAnchor) {
    return (
      <Link to={item.to} className={`${className} text-stone hover:text-ink`}>
        {label}
        {underline(false)}
      </Link>
    );
  }

  return (
    <NavLink
      to={item.to}
      className={({ isActive }) =>
        `${className} ${isActive ? "text-ink" : "text-stone hover:text-ink"}`
      }
    >
      {({ isActive }) => (
        <>
          {label}
          {underline(isActive)}
        </>
      )}
    </NavLink>
  );
};

const MobileMenu = ({ onClose, lang, t }) => (
  <div
    id="mobile-menu"
    role="dialog"
    aria-modal="true"
    aria-label={t.menuLabel}
    className="fixed inset-0 z-[60] flex flex-col overflow-y-auto bg-ivory md:hidden"
  >
    {/* Equal side columns keep the logo on the true page center */}
    <div className="grid h-20 shrink-0 grid-cols-[1fr_auto_1fr] items-center px-5">
      <div className="flex items-center justify-start">
        <LanguageSwitch className="flex" />
      </div>

      <Link to="/" onClick={onClose} aria-label="Insolite Magazine home" className="justify-self-center">
        <Logo />
      </Link>

      <div className="flex items-center justify-end">
        <button
          type="button"
          onClick={onClose}
          autoFocus
          aria-label={t.closeMenu}
          className="-mr-2 p-2"
        >
          <X className="h-5 w-5" strokeWidth={1.25} />
        </button>
      </div>
    </div>

    <nav aria-label="Categories" translate="no" className="flex flex-1 flex-col justify-center px-6">
      <ul>
        {categories.map((item) => {
          const isInOut = item.key === "in-out";

          return (
            <li key={item.key}>
              <Link
                to={item.to}
                onClick={onClose}
                className={`block border-b border-ink/10 py-5 font-serif text-4xl leading-none uppercase tracking-[0.02em] transition-colors hover:text-oxblood ${
                  isInOut ? "text-oxblood" : ""
                }`}
              >
                {item.label[lang]}
                {/* In & Out gets a playful cue in the mobile menu */}
                {isInOut && (
                  <span aria-hidden="true" className="ml-3 font-sans text-sm tracking-[0.2em] normal-case">
                    ↑↓
                  </span>
                )}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>

    <div className="px-6 pt-10 pb-10">
      <Link
        to="/#subscribe"
        onClick={onClose}
        className="btn-solid w-full"
      >
        {t.menuSubscribe}
      </Link>
    </div>
  </div>
);

const Navbar = () => {
  const { lang } = useLanguage();
  const { pathname } = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [menuPath, setMenuPath] = useState(pathname);
  const t = copy[lang];

  // Browser back or forward should not leave the mobile menu covering the new page.
  // Adjusting state during render avoids a second render pass from an effect.
  if (pathname !== menuPath) {
    setMenuPath(pathname);
    setMenuOpen(false);
  }

  useEffect(() => {
    if (!menuOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === "Escape") setMenuOpen(false);
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-ink/10 bg-ivory/95 text-ink backdrop-blur-md">
        {/* Announcement strip */}
        <div className="bg-ink px-4 py-2 text-center font-sans text-[10px] tracking-[0.3em] text-ivory/85 uppercase">
          <span>Insolite Magazine x Khim Asriel</span>
          <span aria-hidden="true" className="mx-3 hidden text-ivory/35 sm:inline">
            |
          </span>
          <span className="hidden text-ivory/60 sm:inline">
            {t.issue}
          </span>
        </div>

        {/*
          Main row — equal 1fr side columns so the logo sits on the true
          horizontal center of the page (same axis as the hero portrait).
          Asymmetric columns were shifting the wordmark off the image center.
        */}
        <div className="mx-auto grid h-[4.5rem] max-w-[1440px] grid-cols-[1fr_auto_1fr] items-center px-3 sm:h-24 sm:px-8 md:h-28 lg:px-12">
          <div className="flex items-center justify-start">
            <LanguageSwitch className="hidden md:flex" />

            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-label={t.openMenu}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              className="p-1.5 md:hidden"
            >
              <Menu className="h-5 w-5" strokeWidth={1.25} />
            </button>
          </div>

          <Link
            to="/"
            aria-label="Insolite Magazine home"
            className="min-w-0 justify-self-center scale-[0.78] sm:scale-100"
          >
            <Logo />
          </Link>

          <div className="flex items-center justify-end">
            {/* Compact FR/EN — smaller tracking so it fits without crowding the logo */}
            <LanguageSwitch className="flex !gap-1 !px-0 text-[10px] tracking-[0.12em] md:hidden" />

            <Link
              to="/#subscribe"
              className="hidden bg-ink px-5 py-3 font-sans text-[10px] font-medium tracking-[0.22em] text-ivory uppercase transition-colors duration-500 hover:bg-oxblood md:inline-flex"
            >
              {t.subscribe}
            </Link>
          </div>
        </div>

        {/* Category navigation (desktop) */}
        <nav aria-label="Categories" translate="no" className="hidden border-t border-ink/10 md:block">
          <ul className="mx-auto flex max-w-[1440px] items-center justify-center gap-8 px-12 lg:gap-16">
            {categories.map((item) => (
              <li key={item.key}>
                <CategoryLink item={item} label={item.label[lang]} />
              </li>
            ))}
          </ul>
        </nav>
      </header>

      {menuOpen && (
        <MobileMenu onClose={() => setMenuOpen(false)} lang={lang} t={t} />
      )}
    </>
  );
};

export default Navbar;
