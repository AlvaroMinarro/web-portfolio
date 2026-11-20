import { ArrowUpRight } from 'lucide-react';
import { useLanguage } from '@hooks/index';

const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="portfolio-footer">
      <div className="section-container footer-grid">
        <div>
          <p className="footer-name">© {new Date().getFullYear()} Álvaro Miñarro Gil</p>
          <p>{t.footer.identity}</p>
        </div>
        <div className="footer-signoff">
          <p className="technical-label">{t.footer.theme}</p>
          <a href="#home" className="text-link">
            {t.controls.backTop}
            <ArrowUpRight aria-hidden="true" size={18} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
