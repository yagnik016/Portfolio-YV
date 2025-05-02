'use client';

import { useTheme } from 'next-themes';
import { motion } from 'framer-motion';
import { Moon, Sun } from 'lucide-react';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="fixed top-4 right-4 p-3 rounded-full bg-white/90 dark:bg-gray-800/90 shadow-lg hover:shadow-xl transition-all duration-300 z-50"
    >
      <motion.div
        initial={false}
        animate={{
          rotate: theme === 'dark' ? 360 : 0,
          scale: theme === 'dark' ? 1 : 0
        }}
        transition={{ duration: 0.3 }}
        className="absolute inset-0 flex items-center justify-center"
      >
        <Moon className="w-6 h-6 text-gray-800 dark:text-gray-200" />
      </motion.div>
      <motion.div
        initial={false}
        animate={{
          rotate: theme === 'light' ? 360 : 0,
          scale: theme === 'light' ? 1 : 0
        }}
        transition={{ duration: 0.3 }}
        className="absolute inset-0 flex items-center justify-center"
      >
        <Sun className="w-6 h-6 text-gray-800 dark:text-gray-200" />
      </motion.div>
    </motion.button>
  );
} 