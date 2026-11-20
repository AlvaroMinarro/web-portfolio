import { useEffect, useRef, useState, type CSSProperties } from 'react';
import { splitRollingSegments } from '@utils/rollingNumber';

type RollingNumberProps = {
  value: string;
  /** Extra delay per digit column, applied from the least significant digit. */
  staggerMs?: number;
};

const DIGITS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

/**
 * Odometer-style counter: each digit column rolls through its cards to the
 * final figure the first time the counter enters the viewport. Separators and
 * qualifiers stay static, the plain value remains the accessible text, and the
 * global reduced-motion rule turns the roll into an instant final figure.
 */
const RollingNumber = ({ value, staggerMs = 90 }: RollingNumberProps) => {
  const containerRef = useRef<HTMLSpanElement | null>(null);
  const [rolled, setRolled] = useState(false);

  useEffect(() => {
    const node = containerRef.current;
    if (!node) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setRolled(true);
      return;
    }
    const observer = new IntersectionObserver(entries => {
      if (entries.some(entry => entry.isIntersecting)) {
        setRolled(true);
        observer.disconnect();
      }
    }, { rootMargin: '0px 0px -10% 0px' });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const segments = splitRollingSegments(value);
  const digitCount = segments.filter(segment => segment.kind === 'digit').length;
  let seenDigits = 0;

  return (
    <span ref={containerRef} className={`rolling-number${rolled ? ' is-rolled' : ''}`}>
      <span className="sr-only">{value}</span>
      <span className="rolling-number-reel" aria-hidden="true">
        {segments.map((segment, index) => {
          if (segment.kind === 'text') {
            return <span key={index} className="rolling-number-static">{segment.text}</span>;
          }
          const delay = (digitCount - 1 - seenDigits) * staggerMs;
          seenDigits += 1;
          return (
            <span key={index} className="rolling-digit">
              <span
                className="rolling-digit-strip"
                style={{ '--rolling-target': segment.digit, transitionDelay: `${delay}ms` } as CSSProperties}
              >
                {DIGITS.map(digit => (
                  <span key={digit} className="rolling-digit-card">{digit}</span>
                ))}
              </span>
            </span>
          );
        })}
      </span>
    </span>
  );
};

export default RollingNumber;
