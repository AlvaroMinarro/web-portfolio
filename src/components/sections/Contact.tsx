import { motion } from 'framer-motion';
import { Mail, ExternalLink } from 'lucide-react';
import { useLanguage } from '@hooks/index';
import { Section } from '@components/ui';
import { contactLinks } from '@/data/portfolio';

const Contact = () => {
  const { t, language } = useLanguage();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  };

  return (
    <Section id="contact">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
      >
        {/* Header */}
        <motion.div variants={itemVariants} className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 dark:bg-primary-900 rounded-full mb-6">
            <Mail className="w-8 h-8 text-primary-600 dark:text-primary-400" />
          </div>
          <h2 className="heading-secondary mb-4">{t.contact.title}</h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            {t.contact.subtitle}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 max-w-6xl mx-auto items-center">
          {/* Contact Text */}
          <motion.div variants={itemVariants}>
            <h3 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-6">
              {t.contact.ctaTitle}
            </h3>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
              {t.contact.ctaDescription}
            </p>
            <div className="bg-gradient-to-r from-primary-500 to-accent-500 rounded-xl p-6 text-white">
              <div className="flex items-center text-sm">
                <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse" />
                {t.hero.status}
              </div>
            </div>
          </motion.div>

          {/* Contact Links */}
          <motion.div variants={itemVariants}>
            <div className="card p-8">
              <div className="space-y-4">
                {contactLinks.map((link, index) => (
                  <motion.a
                    key={link.name}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-primary-300 dark:hover:border-primary-600 hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-all duration-200 group"
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className={`w-12 h-12 rounded-lg bg-gray-100 dark:bg-gray-800 flex items-center justify-center mr-4 group-hover:bg-primary-100 dark:group-hover:bg-primary-900/30 transition-colors`}>
                      {link.icon.startsWith('/') || link.icon.startsWith(import.meta.env.BASE_URL) ? (
                        <img 
                          src={link.icon} 
                          alt={link.name} 
                          className={`w-6 h-6 ${
                            link.name === 'GitHub' ? 'filter dark:invert' : ''
                          }`}
                        />
                      ) : (
                        <span className="text-2xl">{link.icon}</span>
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                        {link.name === 'Email' ? t.contact.links.email : link.name}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {link.name === 'Email' 
                          ? (language === 'es' ? 'Envíame un mensaje' : 'Send me a message')
                          : (language === 'es' ? `Conecta conmigo en ${link.name}` : `Connect with me on ${link.name}`)
                        }
                      </p>
                    </div>
                    <ExternalLink className="w-5 h-5 text-gray-400 group-hover:text-primary-500 transition-colors" />
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </Section>
  );
};

export default Contact;
