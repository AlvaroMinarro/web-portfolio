import { useEffect, useRef, useState } from 'react';
import { useLanguage } from '@hooks/index';

const BASE_URL = import.meta.env.BASE_URL;

type ShowcaseScreen = {
  id: 'mosaic' | 'details' | 'stats' | 'widget';
  src: string;
  frame: 'phone' | 'wide' | 'widget';
};

const screens: ShowcaseScreen[] = [
  { id: 'mosaic', src: `${BASE_URL}app-screens/mosaic.webp`, frame: 'wide' },
  { id: 'details', src: `${BASE_URL}app-screens/match-details.webp`, frame: 'phone' },
  { id: 'stats', src: `${BASE_URL}app-screens/stats.webp`, frame: 'wide' },
  { id: 'widget', src: `${BASE_URL}app-screens/widget.webp`, frame: 'widget' },
];

/**
 * Apple-style scroll theater for the flagship app: the screens stay pinned in a
 * sticky stage while the caption column scrolls through numbered acts, each
 * zone flipping the live screen with the site's reveal easing. The screens are
 * decorative (the captions carry the meaning), lazy-loaded, and reduced motion
 * flattens the crossfade into an instant swap.
 */
const AppShowcase = () => {
  const { t } = useLanguage();
  const zoneRefs = useRef<(HTMLParagraphElement | null)[]>([]);
  const [stage, setStage] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        const index = Number((entry.target as HTMLElement).dataset.stage);
        if (Number.isInteger(index) && index >= 0 && index < screens.length) {
          setStage(index);
        }
      }
    }, { rootMargin: '-40% 0px -40% 0px', threshold: 0 });
    for (const zone of zoneRefs.current) {
      if (zone) observer.observe(zone);
    }
    return () => observer.disconnect();
  }, []);

  return (
    <div className="app-showcase">
      <p className="technical-label showcase-label">{t.projects.showcase.label}</p>
      <div className="showcase-grid">
        <div className="showcase-stage" aria-hidden="true">
          {screens.map((screen, index) => (
            <img
              key={screen.id}
              src={screen.src}
              alt=""
              loading="lazy"
              decoding="async"
              className={`showcase-screen showcase-screen--${screen.frame}${index === stage ? ' is-live' : ''}`}
            />
          ))}
        </div>
        <div className="showcase-captions">
          {screens.map((screen, index) => (
            <p
              key={screen.id}
              className={`showcase-caption${index === stage ? ' is-live' : ''}`}
              data-stage={index}
              ref={node => { zoneRefs.current[index] = node; }}
            >
              <span className="technical-label">{t.projects.showcase[screen.id].label}</span>
              <span>{t.projects.showcase[screen.id].text}</span>
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AppShowcase;
