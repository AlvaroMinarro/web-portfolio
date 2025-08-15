import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Briefcase, MapPin, Calendar, ChevronDown, ChevronUp, Award } from 'lucide-react';
import { useLanguage } from '@hooks/index';
import { Button, Section } from '@components/ui';
import { experiences } from '@/data/portfolio';

const Experience = () => {
  const { t, language } = useLanguage();
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  const toggleExpanded = (id: string) => {
    setExpandedItems(prev =>
      prev.includes(id)
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

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
    hidden: { x: -50, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  };

  const getTypeLabel = (type: string) => {
    const types = {
      'full-time': language === 'es' ? 'Tiempo completo' : 'Full-time',
      'part-time': language === 'es' ? 'Tiempo parcial' : 'Part-time',
      'contract': language === 'es' ? 'Contrato' : 'Contract',
      'freelance': language === 'es' ? 'Freelance' : 'Freelance',
    };
    return types[type as keyof typeof types] || type;
  };

  return (
    <Section id="experience" className="bg-gray-50 dark:bg-gray-900">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
      >
        {/* Header */}
        <motion.div variants={itemVariants} className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 dark:bg-primary-900 rounded-full mb-6">
            <Briefcase className="w-8 h-8 text-primary-600 dark:text-primary-400" />
          </div>
          <h2 className="heading-secondary mb-4">{t.experience.title}</h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            {t.experience.subtitle}
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative max-w-5xl mx-auto">
          {/* Timeline Line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary-500 to-accent-500 transform md:-translate-x-0.5" />

          {/* Experience Items */}
          <div className="space-y-12">
            {experiences.map((exp, index) => {
              const isExpanded = expandedItems.includes(exp.id);
              const isEven = index % 2 === 0;

              return (
                <motion.div
                  key={exp.id}
                  variants={itemVariants}
                  className={`relative flex items-start ${
                    isEven ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  {/* Timeline Dot */}
                  <motion.div
                    className="absolute left-8 md:left-1/2 w-6 h-6 bg-primary-500 rounded-full border-4 border-white dark:border-gray-900 shadow-lg transform -translate-x-3 md:-translate-x-1/2 z-10 flex items-center justify-center"
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{ duration: 0.4, delay: index * 0.2 }}
                    viewport={{ once: true }}
                  >
                    <motion.div
                      className="w-2 h-2 bg-white rounded-full"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  </motion.div>

                  {/* Content Card */}
                  <motion.div
                    className={`ml-20 md:ml-0 md:w-5/12 ${
                      isEven ? 'md:pr-8' : 'md:pl-8'
                    }`}
                    initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <div className="card p-6 group hover:shadow-2xl transition-all duration-300 relative overflow-hidden">
                      {/* Company Type Badge */}
                      <div className="absolute top-4 right-4">
                        {exp.company === 'Proyecto Personal' ? (
                          <span className="px-3 py-1 bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 rounded-full text-xs font-medium">
                            {language === 'es' ? 'Personal' : 'Personal'}
                          </span>
                        ) : (
                          <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-full text-xs font-medium">
                            {language === 'es' ? 'Profesional' : 'Professional'}
                          </span>
                        )}
                      </div>

                      {/* Header */}
                      <div className="mb-6">
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                          {exp.position}
                        </h3>
                        <p className="text-lg font-semibold text-primary-600 dark:text-primary-400 mb-3">
                          {exp.company}
                        </p>
                        
                        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                          <div className="flex items-center">
                            <Calendar className="w-4 h-4 mr-1" />
                            {exp.period} - {language === 'es' ? t.experience.present : t.experience.present}
                          </div>
                          
                          {exp.location && (
                            <div className="flex items-center">
                              <MapPin className="w-4 h-4 mr-1" />
                              {exp.location}
                            </div>
                          )}
                          
                          {exp.type && (
                            <span className="px-2 py-1 bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 rounded-full text-xs font-medium">
                              {getTypeLabel(exp.type)}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Project Image */}
                      {exp.projectImage && (
                        <motion.div
                          className="mb-6 rounded-lg overflow-hidden"
                          whileHover={{ scale: 1.02 }}
                          transition={{ duration: 0.3 }}
                        >
                          <img
                            src={exp.projectImage}
                            alt={`${exp.company} project`}
                            className="w-full h-48 object-cover border border-gray-200 dark:border-gray-700"
                          />
                        </motion.div>
                      )}

                      {/* Description */}
                      <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                        {exp.description}
                      </p>

                      {/* Technologies */}
                      <div className="mb-6">
                        <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
                          <Award className="w-4 h-4 mr-2 text-primary-500" />
                          {language === 'es' ? 'Tecnologías utilizadas' : 'Technologies used'}
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {exp.technologies.slice(0, isExpanded ? exp.technologies.length : 6).map((tech) => (
                            <span
                              key={tech}
                              className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm font-medium hover:bg-primary-100 dark:hover:bg-primary-900 hover:text-primary-700 dark:hover:text-primary-300 transition-colors"
                            >
                              {tech}
                            </span>
                          ))}
                          
                          {exp.technologies.length > 6 && !isExpanded && (
                            <span className="px-3 py-1 bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 rounded-full text-sm font-medium">
                              +{exp.technologies.length - 6}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Achievements (Expanded) */}
                      <AnimatePresence>
                        {isExpanded && exp.achievements && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                            className="mb-6 pt-4 border-t border-gray-200 dark:border-gray-700"
                          >
                            <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
                              <Award className="w-4 h-4 mr-2 text-green-500" />
                              {language === 'es' ? 'Logros destacados' : 'Key achievements'}
                            </h4>
                            <ul className="space-y-2">
                              {exp.achievements.map((achievement, idx) => (
                                <motion.li
                                  key={idx}
                                  initial={{ opacity: 0, x: -10 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: idx * 0.1 }}
                                  className="flex items-start text-sm text-gray-600 dark:text-gray-300"
                                >
                                  <span className="w-2 h-2 bg-primary-500 rounded-full mt-2 mr-3 flex-shrink-0" />
                                  {achievement}
                                </motion.li>
                              ))}
                            </ul>
                          </motion.div>
                        )}
                      </AnimatePresence>

                      {/* Expand Button */}
                      {(exp.technologies.length > 6 || exp.achievements) && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => toggleExpanded(exp.id)}
                          className="text-primary-600 dark:text-primary-400 p-0 h-auto font-medium"
                        >
                          {isExpanded ? (
                            <>
                              {t.experience.viewLess}
                              <ChevronUp className="w-4 h-4 ml-1" />
                            </>
                          ) : (
                            <>
                              {t.experience.viewMore}
                              <ChevronDown className="w-4 h-4 ml-1" />
                            </>
                          )}
                        </Button>
                      )}

                      {/* Gradient Border Effect */}
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-primary-500/10 to-accent-500/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"
                        whileHover={{ scale: 1.02 }}
                      />
                    </div>
                  </motion.div>

                  {/* Spacer for alternating layout */}
                  <div className="hidden md:block md:w-5/12" />
                </motion.div>
              );
            })}
          </div>
        </div>
      </motion.div>
    </Section>
  );
};

export default Experience;