import { ArrowUpRight, Download, Github, Linkedin, Mail } from 'lucide-react';
import { useLanguage } from '@hooks/index';
import { Button, Section } from '@components/ui';
import { contactLinks, portfolioAssets } from '@/data/portfolio';

const contactIcons = { email: Mail, github: Github, linkedin: Linkedin };

const Contact = () => {
  const { t } = useLanguage();

  return (
    <Section id="contact" className="contact-section">
      <div className="contact-grid">
        <div>
          <p className="technical-label">{t.contact.label}</p>
          <h2 id="contact-heading">{t.contact.title}</h2>
          <p className="contact-description">{t.contact.description}</p>
        </div>
        <div className="contact-methods">
          {contactLinks.map(link => {
            const Icon = contactIcons[link.id];
            const external = link.id !== 'email';
            return (
              <a
                key={link.id}
                href={link.url}
                target={external ? '_blank' : undefined}
                rel={external ? 'noopener noreferrer' : undefined}
                className="contact-link"
              >
                <Icon aria-hidden="true" size={22} />
                <span>
                  <span className="contact-link-label">{link.id === 'email' ? t.contact.email : link.name}</span>
                  <span className="contact-link-detail">{link.display}</span>
                </span>
                <ArrowUpRight aria-hidden="true" size={22} />
                {external && <span className="sr-only">{t.controls.external}</span>}
              </a>
            );
          })}
          <div className="contact-cv">
            <h3>{t.contact.cvLabel}</h3>
            <p id="cv-note">{t.contact.cvNote}</p>
            <Button
              variant="secondary"
              href={portfolioAssets.cv}
              download="AlvaroMinarro-CV.pdf"
              aria-describedby="cv-note"
            >
              {t.hero.downloadCV}
              <Download aria-hidden="true" size={18} />
            </Button>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default Contact;
