import { ArrowDownRight, ArrowUpRight, Download } from 'lucide-react';
import { useLanguage } from '@hooks/index';
import { Button, Section, StreamText } from '@components/ui';
import { portfolioAssets } from '@/data/portfolio';

const Hero = () => {
  const { t } = useLanguage();

  return (
    <Section id="home" className="hero-section">
      <div className="hero-index technical-label">
        <span>{t.hero.label}</span>
        <span>{t.hero.location}</span>
      </div>

      <div className="hero-grid">
        <div className="hero-copy">
          <p className="hero-role"><StreamText value={t.hero.role} initialStream /></p>
          <h1 id="home-heading" className="hero-name" aria-label={`${t.hero.name} — ${t.hero.role}`}>
            <span>Álvaro</span>{' '}
            <span>Miñarro Gil<span className="name-period" aria-hidden="true">.</span></span>
          </h1>
          <p className="hero-specialty"><StreamText value={t.hero.specialty} initialStream /></p>
          <p className="hero-description"><StreamText value={t.hero.description} initialStream /></p>
          <div className="hero-actions">
            <Button href="#projects">
              {t.hero.projectCta}
              <ArrowDownRight aria-hidden="true" size={18} />
            </Button>
            <span className="cv-download-peek">
              <img
                src={portfolioAssets.androidPeek}
                alt=""
                aria-hidden="true"
                width={512}
                height={512}
                decoding="async"
              />
              <Button
                variant="secondary"
                href={portfolioAssets.cv}
                download="AlvaroMinarro-CV.pdf"
              >
                {t.hero.downloadCV}
                <Download aria-hidden="true" size={18} />
              </Button>
            </span>
          </div>
        </div>

        <figure className="hero-portrait">
          <img
            src={portfolioAssets.portrait}
            alt={t.hero.portraitAlt}
            width={800}
            height={1067}
            fetchPriority="high"
            decoding="async"
          />
          <figcaption>
            <span className="technical-label" aria-hidden="true">AM / 01</span>
            <span>{t.hero.portraitCaption}</span>
          </figcaption>
        </figure>
      </div>

      <div className="hero-baseline">
        <div className="current-work">
          <span className="status-marker" aria-hidden="true" />
          <span>{t.hero.current}</span>
          <span className="text-secondary">{t.hero.currentRole}</span>
        </div>
        <a href="#contact" className="text-link">
          {t.hero.contactCta}
          <ArrowUpRight aria-hidden="true" size={18} />
        </a>
      </div>
    </Section>
  );
};

export default Hero;
