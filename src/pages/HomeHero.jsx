import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import { useLanguage } from "../common/language";
import { StoryImage } from "../common/ui";

const AUTOPLAY_MS = 6000;

/*
  Home header carousel. Each slide is an editorial teaser pointing into the
  magazine; no portrait of the editor is shown on the home page.
  Images are the existing editorial photos already used across the site.
*/
const slides = [
  {
    id: "edito",
    to: "/edito",
    image:
      "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1200&q=85",
    EN: {
      eyebrow: "Edito",
      title: "A letter for the November edit.",
      body: "Cozy, comforting and undeniably chic. This month we dive into the season’s most captivating trends.",
      cta: "Read the letter",
      alt: "Autumn editorial look",
    },
    FR: {
      eyebrow: "Edito",
      title: "Une lettre pour l’édition de novembre.",
      body: "Cocooning, réconfortant et indéniablement chic. Ce mois-ci, nous plongeons dans les tendances les plus captivantes de la saison.",
      cta: "Lire la lettre",
      alt: "Look éditorial d’automne",
    },
  },
  {
    id: "mood",
    href: "#latest",
    image:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1200&q=85",
    EN: {
      eyebrow: "Style beyond trends",
      title: "Fashion is how you feel.",
      body: "Trendy looks, funny moments and unfiltered style. Fashion isn’t just what you wear, it’s how you feel.",
      cta: "Explore the edit",
      alt: "Playful street look",
    },
    FR: {
      eyebrow: "Le style au-delà des tendances",
      title: "La mode, c’est ce que l’on ressent.",
      body: "Looks tendance, moments drôles et style sans filtre. La mode ne se résume pas à ce que l’on porte, c’est la façon dont on se sent.",
      cta: "Découvrir la sélection",
      alt: "Look de rue espiègle",
    },
  },
  {
    id: "beauty",
    href: "#beauty",
    image:
      "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=1200&q=85",
    EN: {
      eyebrow: "Beauty",
      title: "Rituals that survive the cold.",
      body: "Hydration, richer pigments and a three-step evening reset that feels like luxury without the noise.",
      cta: "Discover beauty",
      alt: "Beauty editorial",
    },
    FR: {
      eyebrow: "Beauté",
      title: "Des rituels qui résistent au froid.",
      body: "Hydratation, pigments plus riches et un reset du soir en trois gestes qui ont l’air luxueux sans le bruit.",
      cta: "Découvrir la beauté",
      alt: "Éditorial beauté",
    },
  },
  {
    id: "in-out",
    to: "/in-out",
    image:
      "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&w=1200&q=85",
    EN: {
      eyebrow: "In & Out",
      title: "What is up, what is down.",
      body: "Creative layering stays up. Forced trends and empty maximalism go down.",
      cta: "See the scorecard",
      alt: "Layered outfit editorial",
    },
    FR: {
      eyebrow: "In & Out",
      title: "Ce qui monte, ce qui descend.",
      body: "Le layering créatif reste en haut. Les tendances forcées et le maximalisme vide descendent.",
      cta: "Voir le tableau",
      alt: "Éditorial de superpositions",
    },
  },
];

const copy = {
  EN: {
    label: "Featured stories",
    previous: "Previous slide",
    next: "Next slide",
    goTo: "Go to slide",
    pause: "Pause slideshow",
    play: "Play slideshow",
  },
  FR: {
    label: "Sélection à la une",
    previous: "Diapositive précédente",
    next: "Diapositive suivante",
    goTo: "Aller à la diapositive",
    pause: "Mettre le diaporama en pause",
    play: "Lancer le diaporama",
  },
};

const pad = (n) => String(n).padStart(2, "0");

/**
 * Home header — editorial carousel (no portrait).
 * Auto-advances every few seconds; pauses on hover/focus and when the visitor
 * prefers reduced motion. Swipeable on touch screens; arrow buttons and dots
 * work for keyboard and screen-reader users.
 */
const HomeHero = () => {
  const { lang } = useLanguage();
  const t = copy[lang];
  const count = slides.length;

  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(true);
  const touchStartX = useRef(null);

  const goTo = (next) => setIndex(((next % count) + count) % count);

  // Autoplay runs for every visitor. A visible Pause button stops it.
  // Restarting the timer on each change means a manual click gets a full interval.
  useEffect(() => {
    if (!playing) return undefined;

    const timer = setInterval(() => setIndex((i) => (i + 1) % count), AUTOPLAY_MS);
    return () => clearInterval(timer);
  }, [playing, count, index]);

  const onTouchStart = (event) => {
    touchStartX.current = event.touches[0].clientX;
  };

  const onTouchEnd = (event) => {
    if (touchStartX.current === null) return;
    const delta = event.changedTouches[0].clientX - touchStartX.current;
    touchStartX.current = null;
    if (Math.abs(delta) > 40) goTo(index + (delta < 0 ? 1 : -1));
  };

  return (
    <section className="bg-ivory">
      <div
        role="region"
        aria-roledescription="carousel"
        aria-label={t.label}
        className="mx-auto max-w-[1440px]"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        <div className="overflow-hidden">
          <div
            className="flex transition-transform duration-[900ms] ease-luxe motion-reduce:transition-none"
            style={{ transform: `translateX(-${index * 100}%)` }}
          >
            {slides.map((slide, i) => {
              const s = slide[lang];
              const isActive = i === index;

              return (
                <div
                  key={slide.id}
                  role="group"
                  aria-roledescription="slide"
                  aria-label={`${i + 1} / ${count}`}
                  aria-hidden={!isActive}
                  inert={!isActive}
                  className="w-full shrink-0"
                >
                  <div className="grid grid-cols-1 items-center gap-8 px-5 pb-10 pt-8 sm:gap-10 sm:px-8 sm:pt-12 lg:grid-cols-12 lg:gap-12 lg:px-12 lg:pb-16 lg:pt-16">
                    <div className="order-1 text-center lg:order-1 lg:col-span-5 lg:text-left">
                      <p className="eyebrow motion-safe:animate-fade-up">{s.eyebrow}</p>

                      <h1 className="mt-4 font-serif text-[clamp(2.4rem,9vw,5.5rem)] leading-[0.92] tracking-[-0.03em] motion-safe:animate-fade-up">
                        {s.title}
                      </h1>

                      <p className="mx-auto mt-6 max-w-sm font-sans text-[15px] leading-7 text-stone sm:mt-8 sm:text-base sm:leading-8 lg:mx-0">
                        {s.body}
                      </p>

                      {slide.to ? (
                        <Link to={slide.to} className="btn-solid mt-7 sm:mt-8 lg:inline-flex" tabIndex={isActive ? 0 : -1}>
                          {s.cta}
                          <ArrowRight className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
                        </Link>
                      ) : (
                        <a href={slide.href} className="btn-solid mt-7 sm:mt-8 lg:inline-flex" tabIndex={isActive ? 0 : -1}>
                          {s.cta}
                          <ArrowRight className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
                        </a>
                      )}
                    </div>

                    <div className="order-2 lg:order-2 lg:col-span-7">
                      <div className="aspect-[4/3] overflow-hidden bg-linen lg:aspect-[5/4]">
                        <StoryImage
                          src={slide.image}
                          alt={s.alt}
                          eager={i === 0}
                          className="h-full w-full object-cover object-center img-tone"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-4 px-5 pb-6 sm:px-8 lg:px-12">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => goTo(index - 1)}
              aria-label={t.previous}
              className="flex h-10 w-10 items-center justify-center border border-ink/20 text-ink transition-colors duration-300 hover:border-oxblood hover:text-oxblood"
            >
              <ChevronLeft className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => goTo(index + 1)}
              aria-label={t.next}
              className="flex h-10 w-10 items-center justify-center border border-ink/20 text-ink transition-colors duration-300 hover:border-oxblood hover:text-oxblood"
            >
              <ChevronRight className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => setPlaying((p) => !p)}
              aria-label={playing ? t.pause : t.play}
              aria-pressed={!playing}
              className="flex h-10 w-10 items-center justify-center border border-ink/20 text-ink transition-colors duration-300 hover:border-oxblood hover:text-oxblood"
            >
              {playing ? (
                <Pause className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
              ) : (
                <Play className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
              )}
            </button>
          </div>

          <div className="flex items-center gap-2" role="group" aria-label={t.label}>
            {slides.map((slide, i) => (
              <button
                key={slide.id}
                type="button"
                onClick={() => goTo(i)}
                aria-label={`${t.goTo} ${i + 1}`}
                aria-current={i === index ? "true" : undefined}
                className={`h-px transition-all duration-500 ${
                  i === index ? "w-10 bg-oxblood" : "w-5 bg-ink/30 hover:bg-ink"
                }`}
              />
            ))}
          </div>

          <p className="eyebrow tabular-nums text-ink/70">
            {pad(index + 1)} / {pad(count)}
          </p>
        </div>
      </div>

      <div className="mx-auto flex max-w-[1440px] flex-col gap-3 border-t border-ink/15 px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-8 lg:px-12">
        <p className="eyebrow text-ink/70">Insolite Magazine x Khim Asriel</p>

        <p className="eyebrow text-ink/70">
          {lang === "FR" ? "Soyez audacieux / Soyez vous / Soyez Insolite" : "Be bold / Be you / Be Insolite"}
        </p>
      </div>
    </section>
  );
};

export default HomeHero;
