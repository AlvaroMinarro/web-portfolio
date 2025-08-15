import { motion } from 'framer-motion';
import type { SectionProps } from '@/types';

const Section = ({ className = '', children, ...props }: SectionProps & { id?: string }) => {
  return (
    <motion.section
      className={`section-padding ${className}`}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      viewport={{ once: true, margin: '-100px' }}
      {...props}
    >
      <div className="section-container">
        {children}
      </div>
    </motion.section>
  );
};

export default Section;
