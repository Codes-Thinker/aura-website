import { useLanguage } from "../common/language";
import { useDocumentTitle } from "../common/useDocumentTitle";
import { StoryImage } from "../common/ui";
import { siteConfig } from "../common/siteConfig";

/**
 * ABOUT page — `/about`.
 *
 * Text first, portrait last: the editor’s picture sits at the end of the copy
 * (moved off the home hero, which now leads with the editorial imagery only).
 *
 * Portrait asset: `/public/static-men-image/men.jpeg`
 */
const copy = {
  EN: {
    label: "About Insolite",
    eyebrow: "About",
    headline: "Style beyond trends.",
    paragraphs: [
      "Insolite Magazine is a fashion, beauty, gourmet and lifestyle magazine made in Paris, for people who dress and live with personality.",
      "We believe fashion is not just what you wear, it is how you feel. So we look for trends with a point of view, unexpected moments and style without filter.",
      "Each month we gather what inspires us across beauty, fashion, food and lifestyle, and let the rest fall away.",
    ],
    portraitAlt: "Khim Asriel, editor of Insolite Magazine",
  },
  FR: {
    label: "À propos d'Insolite",
    eyebrow: "À propos",
    headline: "Le style au-delà des tendances.",
    paragraphs: [
      "Insolite Magazine est un magazine de mode, beauté, gastronomie et lifestyle, réalisé à Paris, pour celles et ceux qui s’habillent et vivent avec personnalité.",
      "Nous pensons que la mode ne se résume pas à ce que l’on porte : c’est la façon dont on se sent. Nous cherchons donc des tendances avec un vrai regard, des moments inattendus et un style sans filtre.",
      "Chaque mois, nous réunissons ce qui nous inspire en beauté, mode, gastronomie et lifestyle, et laissons le reste tomber.",
    ],
    portraitAlt: "Khim Asriel, rédactrice d’Insolite Magazine",
  },
};

const About = () => {
  const { lang } = useLanguage();
  const t = copy[lang];

  useDocumentTitle(t.label);

  return (
    <main id="about" className="bg-ivory" aria-labelledby="about-title">
      <div className="mx-auto max-w-[1440px] px-5 py-10 sm:px-8 sm:py-14 md:py-24 lg:px-12">
        <div className="max-w-2xl">
          <p className="eyebrow text-stone">{t.eyebrow}</p>

          <h1
            id="about-title"
            className="mt-3 font-serif text-[1.85rem] italic leading-[1.08] sm:text-5xl md:text-6xl"
          >
            {t.headline}
          </h1>

          <div className="mt-5 h-px w-16 bg-ink md:mt-6" />

          {t.paragraphs.map((paragraph) => (
            <p
              key={paragraph}
              className="mt-5 font-sans text-[15px] leading-7 text-stone sm:text-base sm:leading-8 md:mt-6"
            >
              {paragraph}
            </p>
          ))}

          {siteConfig.address && (
            <address className="mt-7 not-italic sm:mt-8">
              <p className="font-sans text-sm leading-7 text-stone">{siteConfig.address}</p>
              {siteConfig.contactEmail && (
                <a
                  href={`mailto:${siteConfig.contactEmail}`}
                  className="mt-1 inline-block font-sans text-sm text-oxblood transition-colors duration-300 hover:text-ink"
                >
                  {siteConfig.contactEmail}
                </a>
              )}
            </address>
          )}
        </div>

        <figure className="editorial-portrait mt-12 sm:mt-16 md:mx-0 md:mt-20 md:w-[60%] md:max-w-[480px]">
          <StoryImage
            src="/static-men-image/men.jpeg"
            alt={t.portraitAlt}
            className="h-auto w-full object-cover object-center img-tone"
          />
        </figure>
      </div>
    </main>
  );
};

export default About;
