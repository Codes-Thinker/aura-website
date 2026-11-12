import { ArrowRight } from "lucide-react";
import { useLanguage } from "../common/language";
import { StoryImage } from "../common/ui";

const copy = {
  EN: {
    eyebrow: "Style beyond trends",
    lead: "Fashion is a",
    title: "MOOD.",
    body: "Trendy looks, funny moments, and unfiltered style — because fashion isn’t just what you wear, it’s how you feel.",
    cta: "Explore the edit",
    slogan: "Be bold / Be you / Be Insolite",
    mainAlt: "Insolite Magazine editorial, a playful street look",
    sideAlt: "Funny outfits, a playful street look",
  },
  FR: {
    eyebrow: "Le style au-delà des tendances",
    lead: "La mode est une",
    title: "HUMEUR.",
    body: "Looks tendance, moments drôles et style sans filtre — parce que la mode ne se résume pas à ce que l’on porte, c’est la façon dont on se sent.",
    cta: "Découvrir la sélection",
    slogan: "Soyez audacieux / Soyez vous / Soyez Insolite",
    mainAlt: "Éditorial Insolite Magazine, un look de rue espiègle",
    sideAlt: "Tenues amusantes, look de rue espiègle",
  },
};

/**
 * Home hero.
 * Mobile matches the approved phone reference: padded (not full-bleed) portrait,
 * then eyebrow → lead → HUMEUR → body in the same content column.
 * lg+: original two-column editorial layout with floating inset.
 */
const HomeHero = () => {
  const { lang } = useLanguage();
  const t = copy[lang];

  return (
    <section className="bg-ivory">
      <div className="mx-auto grid max-w-[1440px] grid-cols-1 items-end gap-8 pb-12 sm:gap-14 sm:pb-16 md:pb-24 lg:grid-cols-12 lg:gap-10 lg:px-12 lg:pt-20">
        {/*
          Copy — centered under the portrait on mobile (same axis as logo + image),
          left column on desktop.
        */}
        <div className="order-2 px-5 text-center sm:px-8 lg:order-1 lg:col-span-5 lg:px-0 lg:pb-10 lg:text-left">
          <p className="eyebrow motion-safe:animate-fade-up">{t.eyebrow}</p>

          <p className="mt-4 font-serif text-[1.65rem] italic motion-safe:animate-fade-up sm:text-4xl">
            {t.lead}
          </p>

          <h1 className="mt-1 font-serif text-[clamp(2.75rem,13vw,7.5rem)] leading-[0.85] tracking-[-0.03em] motion-safe:animate-fade-up">
            <span className="sr-only">{t.lead} </span>
            <span className="italic">{t.title}</span>
          </h1>

          <p className="mx-auto mt-6 max-w-sm font-sans text-[15px] leading-7 text-stone motion-safe:animate-fade-up sm:mt-8 sm:text-base sm:leading-8 lg:mx-0">
            {t.body}
          </p>

          <a
            href="#latest"
            className="btn-solid mt-7 motion-safe:animate-fade-up sm:mt-8 lg:inline-flex"
          >
            {t.cta}
            <ArrowRight className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
          </a>
        </div>

        {/*
          Mobile / tablet: portrait is truly centered (equal side margins) on the
          same vertical axis as the navbar logo — client flagged left gap > right.
          Desktop (lg+): editorial right-aligned frame + floating inset returns.
        */}
        <div className="relative order-1 flex justify-center px-5 pt-6 sm:px-8 lg:order-2 lg:col-span-7 lg:block lg:px-0 lg:pt-0">
          {/* “Main Character” label removed — portrait only */}
          <figure className="relative w-[55%] max-w-[250px] sm:w-[62%] sm:max-w-[300px] lg:ml-auto lg:mr-0 lg:w-[80%] lg:max-w-none">
            <div className="overflow-hidden bg-linen lg:aspect-[4/5]">
              <StoryImage
                src="https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1000&q=85"
                alt={t.mainAlt}
                eager
                className="mx-auto block h-auto w-full object-cover object-center img-tone lg:h-full"
              />
            </div>
          </figure>

          <div className="absolute -bottom-10 left-0 hidden w-[42%] border-[8px] border-ivory bg-linen lg:block lg:-left-14 lg:w-[36%]">
            <div className="aspect-[3/4] overflow-hidden">
              <StoryImage
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=85"
                alt={t.sideAlt}
                className="h-full w-full object-cover img-tone"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto flex max-w-[1440px] flex-col gap-3 border-t border-ink/15 px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-8 lg:px-12">
        <p className="eyebrow text-ink/70">Insolite Magazine x Khim Asriel</p>

        <p className="eyebrow text-ink/70">{t.slogan}</p>
      </div>
    </section>
  );
};

export default HomeHero;
