import { ArrowUpRight } from 'lucide-react';
import { useLanguage } from '@hooks/index';
import { Section } from '@components/ui';
import { technologies, technologyLogos, technologySymbols } from '@/data/portfolio';

const Technologies = () => {
  const { t } = useLanguage();

  return (
    <Section id="technologies">
      <div className="section-intro">
        <p className="technical-label">{t.technologies.label}</p>
        <h2 id="technologies-heading">{t.technologies.title}</h2>
      </div>
      <p className="capabilities-description">{t.technologies.description}</p>
      <div className="capability-list">
        {technologies.map((group, index) => {
          const content = t.technologies.groups[group.id];
          return (
            <article className="capability-row" key={group.id}>
              <span className="capability-index technical-label" aria-hidden="true">0{index + 1}</span>
              <div className="capability-copy">
                <h3>{content.title}</h3>
                <p>{content.description}</p>
                <a href={`#${group.evidenceSection}`} className="text-link">
                  {content.evidence}
                  <ArrowUpRight aria-hidden="true" size={18} />
                </a>
              </div>
              <ul className="capability-tools" aria-label={content.title}>
                {group.tools.map(tool => {
                  const Symbol = technologySymbols[tool];
                  return (
                    <li key={tool}>
                      {technologyLogos[tool] ? (
                        <img
                          className="capability-tool-icon"
                          src={technologyLogos[tool]}
                          alt=""
                          width={28}
                          height={28}
                          loading="lazy"
                          decoding="async"
                          onError={event => { event.currentTarget.hidden = true; }}
                        />
                      ) : Symbol ? (
                        <Symbol
                          className="capability-tool-icon"
                          size={28}
                          aria-hidden="true"
                          focusable="false"
                        />
                      ) : null}
                      <span>{tool}</span>
                    </li>
                  );
                })}
              </ul>
            </article>
          );
        })}
      </div>
      <p id="capability-visual-note" className="capabilities-description">{t.technologies.visualNote}</p>
      <p className="workflow-note technical-label">{t.technologies.workflow}</p>
    </Section>
  );
};

export default Technologies;
