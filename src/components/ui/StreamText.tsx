import { Fragment, useLayoutEffect, useRef, useState, type CSSProperties } from 'react';
import { splitStreamWords } from '@utils/streamText';

type StreamTextProps = {
  value: string;
  /** Per-word stagger in milliseconds while a new value streams in. */
  wordStaggerMs?: number;
  /** Stream on first mount, not only when the value later changes. */
  initialStream?: boolean;
};

/**
 * Text that re-writes itself word by word, like a streamed answer, whenever
 * its value changes (language switches). The first render paints complete
 * text and the change detection lives in a layout effect — never in render —
 * so StrictMode's double render cannot swallow the streaming class. Readers,
 * crawlers and reduced-motion users get the content instantly.
 */
const StreamText = ({ value, wordStaggerMs = 45, initialStream = false }: StreamTextProps) => {
  const previousRef = useRef(value);
  const [streaming, setStreaming] = useState(initialStream);

  useLayoutEffect(() => {
    if (previousRef.current === value) return;
    previousRef.current = value;
    setStreaming(true);
  }, [value]);

  const words = splitStreamWords(value);

  return (
    <span
      key={value}
      className={`stream-text${streaming ? ' is-streaming' : ''}`}
      style={{ '--stream-word-stagger': `${wordStaggerMs}ms` } as CSSProperties}
    >
      {words.map((word, index) => (
        <Fragment key={`${index}-${word}`}>
          {index > 0 && ' '}
          <span
            className={`stream-word${index === words.length - 1 ? ' stream-word--last' : ''}`}
            style={{ '--stream-i': index } as CSSProperties}
          >
            {word}
          </span>
        </Fragment>
      ))}
    </span>
  );
};

export default StreamText;
