import { motion } from 'framer-motion';
import { Heart, Code } from 'lucide-react';
import { useLanguage } from '@hooks/index';

const Footer = () => {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();

  return (
    <motion.footer
      className="bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      <div className="section-container">
        <div className="py-8 lg:py-12">
          <div className="text-center">
            <motion.div
              className="flex items-center justify-center space-x-2 text-gray-600 dark:text-gray-400"
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <span>{t.footer.madeWith}</span>
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1, repeat: Infinity, repeatDelay: 3 }}
              >
                <Heart className="w-4 h-4 text-red-500 fill-current" />
              </motion.div>
              <span>{t.footer.and}</span>
              <Code className="w-4 h-4 text-primary-500" />
              <span>React + TypeScript</span>
            </motion.div>
            
            <motion.p
              className="mt-4 text-sm text-gray-500 dark:text-gray-400"
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              © {currentYear} Álvaro. {t.footer.rights}
            </motion.p>
          </div>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;
