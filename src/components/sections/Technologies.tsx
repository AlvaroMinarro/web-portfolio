import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cpu, Palette, Server, Database, Wrench, Star } from 'lucide-react';
import { useLanguage } from '@hooks/index';
import { Section } from '@components/ui';
import { technologies } from '@/data/portfolio';
import type { Technology } from '@/types';

const Technologies = () => {
  const { t, language } = useLanguage();
  const [activeCategory, setActiveCategory] = useState<Technology['category'] | 'all'>('all');

  const categories = [
    { key: 'all' as const, icon: Cpu, label: language === 'es' ? 'Todas' : 'All' },
    { key: 'mobile' as const, icon: Cpu, label: t.technologies.categories.mobile },
    { key: 'frontend' as const, icon: Palette, label: t.technologies.categories.frontend },
    { key: 'backend' as const, icon: Server, label: t.technologies.categories.backend },
    { key: 'database' as const, icon: Database, label: t.technologies.categories.database },
    { key: 'tools' as const, icon: Wrench, label: t.technologies.categories.tools },
  ];

  const filteredTechnologies = activeCategory === 'all' 
    ? technologies 
    : technologies.filter(tech => tech.category === activeCategory);

  const getLevelLabel = (level: number) => {
    const labels = {
      es: { 1: 'Estudiando', 2: 'Avanzado', 3: 'Experto' },
      en: { 1: 'Learning', 2: 'Advanced', 3: 'Expert' }
    };
    return labels[language][level as keyof typeof labels.es];
  };

  const getLevelColor = (level: number) => {
    const colors = {
      1: 'text-yellow-500 bg-yellow-100 dark:bg-yellow-900',
      2: 'text-blue-500 bg-blue-100 dark:bg-blue-900',
      3: 'text-green-500 bg-green-100 dark:bg-green-900'
    };
    return colors[level as keyof typeof colors];
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0, scale: 0.9 },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
    exit: {
      y: -30,
      opacity: 0,
      scale: 0.9,
      transition: {
        duration: 0.3,
      },
    },
  };

  // Función para renderizar icono
  const renderIcon = (tech: Technology) => {
    if (typeof tech.icon === 'string' && (tech.icon.startsWith('/') || tech.icon.startsWith('data:') || tech.icon.includes('.'))) {
      // Para ciertos SVGs que necesitan coloreado específico
      const needsColorOverride = ['ts.svg', 'typescript.svg'];
      const needsColor = needsColorOverride.some(name => tech.icon.includes(name));
      
      return (
        <div className="relative w-10 h-10 lg:w-12 lg:h-12 flex items-center justify-center">
          <img 
            src={tech.icon} 
            alt={tech.name} 
            className={`w-10 h-10 lg:w-12 lg:h-12 object-contain group-hover:scale-110 transition-transform duration-300 ${
              needsColor ? 'filter brightness-0 saturate-100' : ''
            }`}
            style={needsColor ? {
              filter: tech.name === 'TypeScript' 
                ? 'brightness(0) saturate(100%) invert(22%) sepia(85%) saturate(5200%) hue-rotate(214deg) brightness(95%) contrast(95%)'
                : undefined
            } : undefined}
            onError={(e) => {
              console.warn(`No se pudo cargar el icono: ${tech.icon}`);
              // Fallback a emoji si la imagen no carga
              e.currentTarget.style.display = 'none';
              e.currentTarget.nextElementSibling?.classList.remove('hidden');
            }}
          />
          <span className="text-3xl lg:text-4xl group-hover:scale-110 transition-transform duration-300 hidden">
            {tech.name.charAt(0)}
          </span>
        </div>
      );
    }
    return (
      <div className="relative w-10 h-10 lg:w-12 lg:h-12 flex items-center justify-center">
        <span className="text-3xl lg:text-4xl group-hover:scale-110 transition-transform duration-300">
          {tech.icon}
        </span>
      </div>
    );
  };

  return (
    <Section id="technologies">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true, margin: '-100px' }}
      >
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 dark:bg-primary-900 rounded-full mb-6">
            <Cpu className="w-8 h-8 text-primary-600 dark:text-primary-400" />
          </div>
          <h2 className="heading-secondary mb-4">{t.technologies.title}</h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            {t.technologies.subtitle}
          </p>
        </div>

        {/* Legend */}
        <motion.div
          className="flex flex-wrap justify-center gap-4 mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center space-x-2 px-4 py-2 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
            <Star className="w-4 h-4 text-yellow-500" />
            <span className="text-sm font-medium text-yellow-700 dark:text-yellow-300">
              {getLevelLabel(1)}
            </span>
          </div>
          <div className="flex items-center space-x-2 px-4 py-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <Star className="w-4 h-4 text-blue-500" />
            <Star className="w-4 h-4 text-blue-500" />
            <span className="text-sm font-medium text-blue-700 dark:text-blue-300">
              {getLevelLabel(2)}
            </span>
          </div>
          <div className="flex items-center space-x-2 px-4 py-2 bg-green-50 dark:bg-green-900/20 rounded-lg">
            <Star className="w-4 h-4 text-green-500" />
            <Star className="w-4 h-4 text-green-500" />
            <Star className="w-4 h-4 text-green-500" />
            <span className="text-sm font-medium text-green-700 dark:text-green-300">
              {getLevelLabel(3)}
            </span>
          </div>
        </motion.div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <motion.button
                key={category.key}
                onClick={() => setActiveCategory(category.key)}
                className={`inline-flex items-center px-4 py-2 rounded-lg font-medium transition-all duration-200 focus-ring ${
                  activeCategory === category.key
                    ? 'bg-primary-500 text-white shadow-primary'
                    : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-primary-50 dark:hover:bg-primary-900/20 border border-gray-200 dark:border-gray-700'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Icon className="w-4 h-4 mr-2" />
                {category.label}
              </motion.button>
            );
          })}
        </div>

        {/* Technologies Grid */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 lg:gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <AnimatePresence mode="wait">
            {filteredTechnologies.map((tech, index) => (
              <motion.div
                key={`${tech.name}-${activeCategory}`}
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                layout
                className="relative group cursor-pointer"
                style={{ animationDelay: `${index * 50}ms` }}
                whileHover={{ 
                  y: -8,
                  scale: 1.02,
                }}
                transition={{ type: 'spring', stiffness: 400, damping: 25 }}
              >
                <div className="card p-4 lg:p-6 text-center h-full flex flex-col justify-between relative overflow-hidden border-2 border-transparent group-hover:border-primary-200 dark:group-hover:border-primary-700 transition-all duration-300">
                  {/* Level Badge */}
                  {tech.level && (
                    <motion.div
                      className={`absolute top-2 right-2 px-2 py-1 rounded-full text-xs font-bold ${getLevelColor(tech.level)} shadow-sm`}
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ delay: index * 0.05 + 0.3, type: 'spring' }}
                    >
                      <div className="flex items-center space-x-0.5">
                        {Array.from({ length: tech.level }, (_, i) => (
                          <Star key={i} className="w-2.5 h-2.5 fill-current" />
                        ))}
                      </div>
                    </motion.div>
                  )}

                  <div className="flex-1 flex flex-col items-center justify-center">
                    <motion.div
                      className="mb-3 lg:mb-4 flex items-center justify-center h-14 lg:h-16"
                      whileHover={{ 
                        scale: 1.05,
                        rotate: [0, -3, 3, 0],
                      }}
                      transition={{ duration: 0.4 }}
                    >
                      {renderIcon(tech)}
                    </motion.div>
                    
                    <motion.h3 
                      className="font-semibold text-gray-900 dark:text-white transition-all duration-300 text-sm lg:text-base group-hover:text-primary-600 dark:group-hover:text-primary-400"
                      whileHover={{ scale: 1.05 }}
                    >
                      {tech.name}
                    </motion.h3>
                    
                    {tech.level && (
                      <motion.p 
                        className="text-xs text-gray-500 dark:text-gray-400 mt-2 opacity-70 group-hover:opacity-100 transition-opacity duration-300"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.7 }}
                        transition={{ delay: index * 0.05 + 0.5 }}
                      >
                        {getLevelLabel(tech.level)}
                      </motion.p>
                    )}
                  </div>
                  
                  {/* Animated bottom bar */}
                  <motion.div
                    className="mt-2 h-1 bg-gradient-to-r from-primary-500 to-accent-500 rounded-full scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center"
                    initial={{ scaleX: 0 }}
                    whileHover={{ scaleX: 1 }}
                  />

                  {/* Glow effect on hover */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-primary-500/5 to-accent-500/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                  />
                  
                  {/* Subtle shadow enhancement */}
                  <motion.div
                    className="absolute inset-0 rounded-xl shadow-lg opacity-0 group-hover:opacity-20 transition-opacity duration-300 pointer-events-none"
                    style={{
                      boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
                    }}
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 0.2 }}
                  />
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>


      </motion.div>
    </Section>
  );
};

export default Technologies;