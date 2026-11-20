import { Fragment, useRef, type CSSProperties } from 'react';
import { splitStreamWords } from '@utils/streamText';

type StreamTextProps = {
  value: string;
  /** Per-word stagger in milliseconds while a new value streams in. */
  wordStaggerMs?: number;
};

/**
 * Text that re-writes itself word by word, like a streamed answer, whenever
 * its value changes (language switches). The first render paints complete
 * text: streaming is a visual layer over the full DOM string, so readers,
 * crawlers and reduced-motion users get the content instantly.
 */
const StreamText = ({ value, wordStaggerMs = 30 }: StreamTextProps) => {
  const previous = useRef(value);
  const isNewValue = previous.current !== value;
  previous.current = value;

  const words = splitStreamWords(value);
  const totalMs = words.length * wordStaggerMs + 250;

  return (
    <span
      key={value}
      className={`stream-text${isNewValue ? ' is-streaming' : ''}`}
      style={{
        '--stream-word-stagger': `${wordStaggerMs}ms`,
        '--stream-total': `${totalMs}ms`,
      } as CSSProperties}
    >
      {words.map((word, index) => (
        <Fragment key={`${index}-${word}`}>
          {index > 0 && ' '}
          <span className="stream-word" style={{ '--stream-i': index } as CSSProperties}>
            {word}
          </span>
        </Fragment>
      ))}
      {isNewValue && <span className="stream-caret" aria-hidden="true" />}
    </span>
  );
};

export default StreamText;
