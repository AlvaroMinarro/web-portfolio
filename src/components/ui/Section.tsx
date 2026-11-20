import type { SectionProps } from '@/types';

const Section = ({ id, className = '', children, ...props }: SectionProps) => (
  <section
    id={id}
    aria-labelledby={id ? `${id}-heading` : undefined}
    tabIndex={-1}
    className={`portfolio-section ${className}`}
    {...props}
  >
    <div className="section-container">{children}</div>
  </section>
);

export default Section;
