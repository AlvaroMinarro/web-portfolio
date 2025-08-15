import { motion } from 'framer-motion';
import { Download, User, Code2, Sparkles } from 'lucide-react';
import { useLanguage } from '@hooks/index';
import { Button, Section } from '@components/ui';
import perfilImage from '/perfil.jpg?url';

const About = () => {
  const { t } = useLanguage();

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

  const skills = [
    { name: 'Android Development', level: 95, color: 'bg-green-500' },
    { name: 'Kotlin & Jetpack Compose', level: 95, color: 'bg-purple-500' },
    { name: 'JavaScript/TypeScript', level: 85, color: 'bg-blue-500' },
    { name: 'Angular & React', level: 80, color: 'bg-red-500' },
    { name: 'Kotlin Multiplatform', level: 60, color: 'bg-yellow-500' },
    { name: 'AWS & Firebase', level: 75, color: 'bg-orange-500' },
  ];

  return (
    <Section id="about" className="bg-gray-50 dark:bg-gray-900">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
      >
        {/* Header */}
        <motion.div variants={itemVariants} className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 dark:bg-primary-900 rounded-full mb-6">
            <User className="w-8 h-8 text-primary-600 dark:text-primary-400" />
          </div>
          <h2 className="heading-secondary mb-4">{t.about.title}</h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            {t.about.subtitle}
          </p>
        </motion.div>

        {/* Main Content: Text + Image */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-20">
          {/* Content - Texto a la izquierda */}
          <motion.div variants={itemVariants}>
            <div className="space-y-6">
              {t.about.description.map((paragraph, index) => (
                <motion.p
                  key={index}
                  variants={itemVariants}
                  className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed"
                >
                  {paragraph}
                </motion.p>
              ))}
            </div>

            {/* CTA */}
            <motion.div variants={itemVariants} className="mt-8">
              <Button
                variant="primary"
                size="lg"
                href="#" // Aquí pondrías el enlace a tu CV
                target="_blank"
                rel="noopener noreferrer"
                className="group"
              >
                <Download className="w-5 h-5 mr-2 transition-transform group-hover:translate-y-0.5" />
                {t.about.downloadCV}
              </Button>
            </motion.div>
          </motion.div>

          {/* Profile Image - Imagen a la derecha */}
          <motion.div variants={itemVariants}>
            <div className="relative group">
              <motion.div
                className="absolute -inset-4 bg-gradient-to-r from-primary-500 to-accent-500 rounded-xl opacity-20 group-hover:opacity-30 transition-opacity duration-300 blur-lg"
                whileHover={{ scale: 1.05 }}
              />
              <motion.img
                src={perfilImage}
                alt="Álvaro"
                className="relative w-full max-w-md mx-auto rounded-xl shadow-2xl border-4 border-white dark:border-gray-800 object-cover aspect-square"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
                onError={(e) => {
                  console.error('Error loading profile image in About:', perfilImage);
                  e.currentTarget.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgdmlld0JveD0iMCAwIDQwMCA0MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjQwMCIgaGVpZ2h0PSI0MDAiIGZpbGw9IiNGM0Y0RjYiLz48dGV4dCB4PSIyMDAiIHk9IjIxMCIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjE4IiBmaWxsPSIjNjM3ODlBIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj7DgWx2YXJvIE1pw7FhcnJvPC90ZXh0Pjwvc3ZnPg==';
                }}
                onLoad={() => {
                  console.log('Profile image loaded successfully in About');
                }}
              />
              
              {/* Floating Elements */}
              <motion.div
                className="absolute -top-4 -right-4 w-12 h-12 bg-primary-500 rounded-full flex items-center justify-center shadow-lg"
                animate={{ rotate: 360 }}
                transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
              >
                <Code2 className="w-6 h-6 text-white" />
              </motion.div>
              
              <motion.div
                className="absolute -bottom-4 -left-4 w-10 h-10 bg-accent-500 rounded-full flex items-center justify-center shadow-lg"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              >
                <Sparkles className="w-5 h-5 text-white" />
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Skills Section - Gráficas debajo */}
        <motion.div variants={itemVariants} className="max-w-4xl mx-auto">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center flex items-center justify-center">
            <Code2 className="w-6 h-6 mr-3 text-primary-500" />
            {t.about.skills}
          </h3>
          
          <div className="grid md:grid-cols-2 gap-6">
            {skills.map((skill, index) => (
              <motion.div
                key={skill.name}
                variants={itemVariants}
                className="group bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700"
              >
                <div className="flex justify-between items-center mb-3">
                  <span className="text-base font-medium text-gray-700 dark:text-gray-300">
                    {skill.name}
                  </span>
                  <span className="text-sm font-semibold text-primary-600 dark:text-primary-400">
                    {skill.level}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
                  <motion.div
                    className={`h-full ${skill.color} rounded-full`}
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    transition={{ duration: 1, delay: index * 0.1, ease: 'easeOut' }}
                    viewport={{ once: true }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </Section>
  );
};

export default About;
