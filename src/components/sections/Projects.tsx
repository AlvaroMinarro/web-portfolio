import { ArrowUpRight } from 'lucide-react';
import { useLanguage } from '@hooks/index';
import { Section, RollingNumber, AppShowcase } from '@components/ui';
import { flagshipProject, portfolioAssets } from '@/data/portfolio';
import { formatProjectMetrics } from '@/data/projectMetrics';
import { useProjectMetrics } from '@/hooks/useProjectMetrics';

const Projects = () => {
  const { t, language } = useLanguage();
  const measured = useProjectMetrics();
  const metrics = formatProjectMetrics(measured, flagshipProject.snapshot, language);

  return (
    <Section id="projects" className="project-section">
      <div className="section-intro">
        <p className="technical-label">{t.projects.label}</p>
        <h2 id="projects-heading">{t.projects.title}</h2>
      </div>

      <article className="flagship">
        <div className="project-identity">
          <p className="technical-label">{t.projects.category}</p>
          <figure className="project-mark">
            <img
              src={portfolioAssets.tracker}
              alt="LoL Esports Tracker"
              width={320}
              height={320}
              loading="lazy"
              decoding="async"
            />
            <figcaption>{t.projects.logoCaption}</figcaption>
          </figure>
          <p className="project-period">{t.projects.period}</p>
        </div>

        <div className="project-story">
          <h3>{flagshipProject.title}</h3>
          <p className="project-description">{t.projects.description}</p>
          <ul className="tool-list" aria-label={t.nav.technologies}>
            {flagshipProject.technologies.map(technology => (
              <li key={technology}>{technology}</li>
            ))}
          </ul>

          <AppShowcase />
          <dl className="project-metrics">
            <div>
              <dt>{t.projects[metrics.primaryLabel]}</dt>
              <dd><RollingNumber value={metrics.primaryValue} /></dd>
            </div>
            <div>
              <dt>{t.projects[metrics.secondaryLabel]}</dt>
              <dd><RollingNumber value={metrics.secondaryValue} /></dd>
            </div>
          </dl>
          <p className="evidence-note">
            {metrics.source === 'google-play' ? (
              <>
                {t.projects.sourceDate}{' '}
                <time dateTime={metrics.observedOn}>{metrics.observedDate}</time>.{' '}
                {t.projects.reportingDelay}
              </>
            ) : metrics.observedDate ? (
              t.projects.snapshotDated.replace('{date}', metrics.observedDate)
            ) : t.projects.snapshot}
          </p>

          <div className="project-details">
            <div>
              <h4>{t.projects.architecture}</h4>
              <p>{t.projects.architectureDescription}</p>
            </div>
            <div>
              <h4>{t.projects.platforms}</h4>
              <p>{t.projects.platformDescription}</p>
            </div>
          </div>
          <a href="#contact" className="text-link">
            {t.projects.contactCta}
            <ArrowUpRight aria-hidden="true" size={18} />
          </a>
        </div>
      </article>
    </Section>
  );
};

export default Projects;
