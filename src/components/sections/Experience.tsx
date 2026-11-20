import { useState } from 'react';
import { ArrowUpRight, Minus, Plus } from 'lucide-react';
import { useLanguage } from '@hooks/index';
import { Section } from '@components/ui';
import { experiences } from '@/data/portfolio';
import type { ExperienceId } from '@/types';

const Experience = () => {
  const { t } = useLanguage();
  const [expanded, setExpanded] = useState<ExperienceId[]>(['llamas']);

  const toggleExpanded = (id: ExperienceId) => {
    setExpanded(previous => previous.includes(id)
      ? previous.filter(item => item !== id)
      : [...previous, id]);
  };

  return (
    <Section id="experience" className="experience-section">
      <div className="section-intro">
        <p className="technical-label">{t.experience.label}</p>
        <h2 id="experience-heading">{t.experience.title}</h2>
      </div>

      {(['employment', 'independent'] as const).map(category => (
        <div className="experience-group" key={category}>
          <h3 className="experience-group-heading technical-label">
            {category === 'employment' ? t.experience.employment : t.experience.independent}
          </h3>
          {experiences.filter(item => item.category === category).map(item => {
            const content = t.experience.items[item.id];
            const isExpanded = expanded.includes(item.id);
            const detailId = `experience-${item.id}-details`;

            return (
              <article className="experience-row" key={item.id}>
                <div className="experience-meta">
                  <p className="experience-period">{content.period}</p>
                  <p>{content.metadata}</p>
                </div>
                <div className="experience-body">
                  <div className="experience-title">
                    <div>
                      <h4>{item.company}</h4>
                      <p className="experience-role">{content.role}</p>
                    </div>
                    {item.logo && (
                      <img
                        src={item.logo}
                        alt=""
                        width={200}
                        height={200}
                        loading="lazy"
                        decoding="async"
                      />
                    )}
                  </div>
                  <p>{content.description}</p>
                  <ul className="tool-list" aria-label={t.nav.technologies}>
                    {item.technologies.map(technology => <li key={technology}>{technology}</li>)}
                  </ul>
                  {content.details.length > 0 && (
                    <>
                      <button
                        type="button"
                        className="disclosure-button"
                        aria-expanded={isExpanded}
                        aria-controls={detailId}
                        aria-label={`${isExpanded ? t.experience.viewLess : t.experience.viewMore} — ${item.company}`}
                        onClick={() => toggleExpanded(item.id)}
                      >
                        {isExpanded ? t.experience.viewLess : t.experience.viewMore}
                        {isExpanded ? <Minus aria-hidden="true" size={18} /> : <Plus aria-hidden="true" size={18} />}
                      </button>
                      <ul id={detailId} className="responsibility-list" hidden={!isExpanded}>
                        {content.details.map(detail => <li key={detail}>{detail}</li>)}
                      </ul>
                    </>
                  )}
                  {item.id === 'tracker' && (
                    <a href="#projects" className="text-link">
                      {t.experience.projectCta}
                      <ArrowUpRight aria-hidden="true" size={18} />
                    </a>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      ))}

      <div className="education-block" aria-labelledby="education-heading">
        <div className="education-copy">
          <p className="technical-label">{t.experience.education.label}</p>
          <h3 id="education-heading">{t.experience.education.title}</h3>
          <p>{t.experience.education.specialty}</p>
          <p className="role-period">{t.experience.education.period}</p>
        </div>
        <div className="education-grade">
          <p className="grade-number">9.8<span>/10</span></p>
          <p>{t.experience.education.grade}</p>
        </div>
      </div>
    </Section>
  );
};

export default Experience;
