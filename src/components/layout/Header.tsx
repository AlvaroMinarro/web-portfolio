import { useEffect, useRef, useState } from 'react';
import { Menu, X, Sun, Moon, Globe } from 'lucide-react';
import { useTheme, useLanguage, useActiveSection } from '@hooks/index';
import { Button, StreamText } from '@components/ui';
import { sectionIds } from '@/types';
import type { Section } from '@/types';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement | HTMLAnchorElement>(null);
  const headerRef = useRef<HTMLElement>(null);
  const { theme, toggleTheme } = useTheme();
  const { language, toggleLanguage, t } = useLanguage();
  const { activeSection, scrollToSection } = useActiveSection();

  useEffect(() => {
    if (!isMenuOpen) return;

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    };
    const closeOutside = (event: PointerEvent) => {
      if (event.target instanceof Node && !headerRef.current?.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };
    const desktop = window.matchMedia('(min-width: 1280px)');
    const closeOnDesktop = () => {
      if (desktop.matches) {
        const focusWasInMenu = document.getElementById('mobile-navigation')?.contains(document.activeElement);
        setIsMenuOpen(false);
        if (focusWasInMenu || document.activeElement === menuButtonRef.current) {
          headerRef.current?.querySelector<HTMLAnchorElement>('.header-identity')?.focus();
        }
      }
    };

    document.addEventListener('keydown', closeOnEscape);
    document.addEventListener('pointerdown', closeOutside);
    desktop.addEventListener('change', closeOnDesktop);
    return () => {
      document.removeEventListener('keydown', closeOnEscape);
      document.removeEventListener('pointerdown', closeOutside);
      desktop.removeEventListener('change', closeOnDesktop);
    };
  }, [isMenuOpen]);

  const navigate = (section: Section) => {
    setIsMenuOpen(false);
    scrollToSection(section);
    window.history.pushState(null, '', `#${section}`);
    document.getElementById(section)?.focus({ preventScroll: true });
  };

  const navLinks = (className: string) => sectionIds.map(section => (
    <a
      key={section}
      href={`#${section}`}
      className={className}
      aria-current={activeSection === section ? 'location' : undefined}
      onClick={event => {
        event.preventDefault();
        navigate(section);
      }}
    >
      {t.nav[section]}
    </a>
  ));

  return (
    <>
      <a className="skip-link" href="#main-content">{t.controls.skip}</a>
      <header className="portfolio-header" ref={headerRef}>
        <nav className="section-container" aria-label={t.controls.navigation}>
          <div className="header-row">
            <a
              href="#home"
              className="header-identity"
              onClick={event => {
                event.preventDefault();
                navigate('home');
              }}
            >
              Álvaro Miñarro Gil<span className="name-period" aria-hidden="true">.</span>
            </a>
            <div className="desktop-navigation">{navLinks('nav-link')}</div>
            <div className="header-controls">
              <Button
                variant="ghost"
                size="sm"
                className="language-toggle"
                onClick={toggleLanguage}
                aria-label={t.controls.switchLanguage}
                lang={language === 'es' ? 'en' : 'es'}
                title={t.controls.switchLanguage}
              >
                <Globe size={16} aria-hidden="true" />
                <StreamText value={language === 'es' ? 'EN' : 'ES'} />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="theme-toggle"
                onClick={event => {
                  const bounds = event.currentTarget.getBoundingClientRect();
                  toggleTheme({
                    x: event.detail > 0 ? event.clientX : bounds.left + bounds.width / 2,
                    y: event.detail > 0 ? event.clientY : bounds.top + bounds.height / 2,
                  });
                }}
                aria-label={theme === 'dark' ? t.controls.lightTheme : t.controls.darkTheme}
                title={theme === 'dark' ? t.controls.lightTheme : t.controls.darkTheme}
              >
                {theme === 'dark' ? <Sun size={20} aria-hidden="true" /> : <Moon size={20} aria-hidden="true" />}
              </Button>
              <Button
                ref={menuButtonRef}
                variant="ghost"
                size="sm"
                className="menu-toggle"
                onClick={() => setIsMenuOpen(open => !open)}
                aria-expanded={isMenuOpen}
                aria-controls="mobile-navigation"
                aria-label={isMenuOpen ? t.controls.closeMenu : t.controls.openMenu}
              >
                {isMenuOpen ? <X size={22} aria-hidden="true" /> : <Menu size={22} aria-hidden="true" />}
              </Button>
            </div>
          </div>
          <div id="mobile-navigation" className="mobile-navigation" hidden={!isMenuOpen}>
            {navLinks('nav-link')}
          </div>
        </nav>
      </header>
    </>
  );
};

export default Header;
