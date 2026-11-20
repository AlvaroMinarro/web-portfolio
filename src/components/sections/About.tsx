import { ArrowUpRight } from 'lucide-react';
import { useLanguage } from '@hooks/index';
import { Section } from '@components/ui';
import { portfolioAssets } from '@/data/portfolio';

const About = () => {
  const { t } = useLanguage();

  return (
    <Section id="about">
      <div className="section-intro">
        <p className="technical-label">{t.about.label}</p>
        <h2 id="about-heading">{t.about.title}</h2>
      </div>
      <div className="about-grid">
        <div className="about-narrative">
          {t.about.description.map(paragraph => (
            <p key={paragraph}>{paragraph}</p>
          ))}
          <a href="#experience" className="text-link">
            {t.about.experienceCta}
            <ArrowUpRight aria-hidden="true" size={18} />
          </a>
        </div>

        <aside className="current-role" aria-labelledby="current-role-heading">
          <p className="technical-label">{t.about.currentLabel}</p>
          <div className="employer-identity">
            <img
              src={portfolioAssets.llamas}
              alt="Llamas"
              width={200}
              height={200}
              loading="lazy"
              decoding="async"
            />
            <h3 id="current-role-heading">Llamas</h3>
          </div>
          <p className="current-role-title">{t.about.currentRole}</p>
          <p className="role-period">{t.about.currentPeriod}</p>
          <p>{t.about.currentDescription}</p>
          <p className="technical-label current-tools">{t.about.currentTools}</p>
        </aside>
      </div>
    </Section>
  );
};

export default About;
