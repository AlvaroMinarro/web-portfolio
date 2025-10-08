import { motion } from 'framer-motion';
import { ChevronDown, ArrowRight, Download } from 'lucide-react';
import { useLanguage, useActiveSection } from '@hooks/index';
import { Button, Section } from '@components/ui';
const BASE_URL = import.meta.env.BASE_URL;
const perfilImage = `${BASE_URL}perfil.jpg`;

const Hero = () => {
  const { t } = useLanguage();
  const { scrollToSection } = useActiveSection();

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

  const imageVariants = {
    hidden: { x: -50, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: 'easeOut',
      },
    },
  };

  return (
    <Section id="home" className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 via-white to-accent-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800">
      <motion.div
        className="w-full max-w-7xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Profile Image - Left Side */}
          <motion.div 
            variants={imageVariants}
            className="flex justify-center lg:justify-end order-1 lg:order-1"
          >
            <div className="relative group">
              {/* Background Glow */}
              <motion.div
                className="absolute -inset-8 bg-gradient-to-r from-primary-500/20 to-accent-500/20 rounded-full opacity-70 blur-2xl"
                animate={{
                  scale: [1, 1.1, 1],
                  rotate: [0, 180, 360],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: 'linear',
                }}
              />
              
              {/* Main Image */}
              <motion.div
                className="relative w-80 h-80 lg:w-96 lg:h-96"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <img
                  src={perfilImage}
                  alt="Álvaro Miñarro"
                  className="w-full h-full rounded-full object-cover shadow-2xl border-4 border-white dark:border-gray-800"
                  onError={(e) => {
                    console.error('Error loading profile image:', perfilImage);
                    console.error('Error details:', e);
                    // Intentar ruta alternativa
                    e.currentTarget.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgdmlld0JveD0iMCAwIDQwMCA0MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjQwMCIgaGVpZ2h0PSI0MDAiIGZpbGw9IiNGM0Y0RjYiLz48dGV4dCB4PSIyMDAiIHk9IjIxMCIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjE4IiBmaWxsPSIjNjM3ODlBIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj7DgWx2YXJvIE1pw7FhcnJvPC90ZXh0Pjwvc3ZnPg==';
                  }}
                  onLoad={() => {
                    console.log('Profile image loaded successfully');
                  }}
                />
                
                {/* Floating Tech Icons */}
                <motion.div
                  className="absolute -top-4 -right-4 w-16 h-16 bg-primary-500 rounded-full flex items-center justify-center shadow-lg"
                  animate={{ 
                    y: [0, -10, 0],
                    rotate: [0, 360],
                  }}
                  transition={{ 
                    y: { duration: 3, repeat: Infinity, ease: 'easeInOut' },
                    rotate: { duration: 8, repeat: Infinity, ease: 'linear' },
                  }}
                >
                  <img src={`${BASE_URL}android.svg`} alt="Android" className="w-8 h-8" />
                </motion.div>
                
                <motion.div
                  className="absolute -bottom-4 -left-4 w-14 h-14 bg-accent-500 rounded-full flex items-center justify-center shadow-lg"
                  animate={{ 
                    y: [0, 10, 0],
                    rotate: [360, 0],
                  }}
                  transition={{ 
                    y: { duration: 4, repeat: Infinity, ease: 'easeInOut' },
                    rotate: { duration: 6, repeat: Infinity, ease: 'linear' },
                  }}
                >
                  <img src={`${BASE_URL}kotlin.svg`} alt="Kotlin" className="w-7 h-7" />
                </motion.div>
                
                <motion.div
                  className="absolute top-1/2 -left-6 w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center shadow-lg"
                  animate={{ 
                    x: [-5, 5, -5],
                    scale: [1, 1.1, 1],
                  }}
                  transition={{ 
                    duration: 5,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                >
                  <img src={`${BASE_URL}jetpackcompose.svg`} alt="Jetpack Compose" className="w-6 h-6" />
                </motion.div>
              </motion.div>
            </div>
          </motion.div>

          {/* Content - Right Side */}
          <motion.div 
            variants={itemVariants}
            className="text-center lg:text-left order-2 lg:order-2"
          >
            {/* Greeting */}
            <motion.p
              variants={itemVariants}
              className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-4"
            >
              {t.hero.greeting}
            </motion.p>

            {/* Name */}
            <motion.h1
              variants={itemVariants}
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4"
            >
              <span className="text-gradient">{t.hero.name}</span>
            </motion.h1>

            {/* Role */}
            <motion.h2
              variants={itemVariants}
              className="text-xl md:text-2xl lg:text-3xl font-semibold text-gray-700 dark:text-gray-200 mb-6"
            >
              {t.hero.role}
            </motion.h2>

            {/* Education */}
            <motion.p
              variants={itemVariants}
              className="text-lg md:text-xl text-primary-600 dark:text-primary-400 font-medium mb-6"
            >
              {t.hero.education}
            </motion.p>

            {/* Description */}
            <motion.p
              variants={itemVariants}
              className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed"
            >
              {t.hero.description}
            </motion.p>

            {/* Experience Highlight */}
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap gap-3 mb-8 justify-center lg:justify-start"
            >
              <span className="px-4 py-2 bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 rounded-full text-sm font-medium">
                {t.hero.badges?.androidExpert ?? 'Android Expert'}
              </span>
              <span className="px-4 py-2 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-full text-sm font-medium">
                {t.hero.badges?.kotlinCompose ?? 'Kotlin & Compose'}
              </span>
              <span className="px-4 py-2 bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 rounded-full text-sm font-medium">
                {t.hero.badges?.fullStack ?? 'Full Stack'}
              </span>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-12"
            >
              <Button
                size="lg"
                onClick={() => scrollToSection('experience')}
                className="group"
              >
                {t.hero.cta}
                <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
              </Button>
              
              <Button
                variant="secondary"
                size="lg"
                href={`${BASE_URL}AlvaroMinarro-CV.pdf`}
                download="AlvaroMinarro-CV.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="group"
              >
                <Download className="mr-2 w-5 h-5 transition-transform group-hover:translate-y-0.5" />
                {t.hero.downloadCV}
              </Button>
            </motion.div>

            {/* Current Status */}
            <motion.div
              variants={itemVariants}
              className="flex items-center justify-center lg:justify-start space-x-2 text-sm text-gray-500 dark:text-gray-400"
            >
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span>{t.hero.status}</span>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col items-center mt-16"
        >
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
            {t.hero.scroll}
          </p>
          <motion.button
            onClick={() => scrollToSection('about')}
            className="text-primary-500 hover:text-primary-600 transition-colors focus-ring rounded-full p-2"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <ChevronDown className="w-6 h-6" />
          </motion.button>
        </motion.div>
      </motion.div>

      {/* Background Elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <motion.div
          className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary-200 dark:bg-primary-900 rounded-full opacity-20 blur-3xl"
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent-200 dark:bg-accent-900 rounded-full opacity-20 blur-3xl"
          animate={{
            x: [0, -100, 0],
            y: [0, 50, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </div>
    </Section>
  );
};

export default Hero;