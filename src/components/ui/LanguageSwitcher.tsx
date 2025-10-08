/**
 * @fileoverview Modern, beautiful, and professional language switcher component
 * Features gradient backgrounds, glassmorphism effects, and smooth animations
 * Supports Brazilian Portuguese and English with premium styling
 */

'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { Globe, Check, ChevronDown } from 'lucide-react';

const languages = [
  { code: 'en', name: 'English', flag: '🇺🇸', short: 'EN' },
  { code: 'pt', name: 'Português', flag: '🇧🇷', short: 'PT' }
];

export const LanguageSwitcher: React.FC = () => {
  const { currentLanguage, changeLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentLang = languages.find(lang => lang.code === currentLanguage) || languages[0];

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Main Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="group relative flex items-center space-x-2 px-3 py-2 rounded-lg border border-blue-400/50 shadow-md hover:shadow-lg transition-all duration-150 cursor-pointer hover:bg-blue-500/20 z-50"
        whileHover={{ 
          scale: 1.02,
          y: -1
        }}
        whileTap={{ scale: 0.98 }}
        style={{
          background: 'rgba(59, 130, 246, 0.1)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(96, 165, 250, 0.3)'
        }}
      >
        
        {/* Content */}
        <div className="relative flex items-center space-x-2">
          <div className="flex items-center justify-center w-6 h-6 rounded-md bg-gradient-to-br from-blue-400 to-purple-500 shadow-sm">
            <Globe className="w-3 h-3 text-white" />
          </div>
          
          <div className="flex items-center space-x-1">
            <span className="text-sm text-gray-300">{currentLang.flag}</span>
            <span className="text-xs font-semibold text-blue-300">{currentLang.short}</span>
          </div>
          
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="flex items-center justify-center"
          >
            <ChevronDown className="w-3 h-3 text-blue-400" />
          </motion.div>
        </div>
      </motion.button>

      {/* Dropdown Menu */}
          <AnimatePresence>
            {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ 
                duration: 0.3,
                ease: [0.4, 0, 0.2, 1]
              }}
              className="absolute top-full mt-2 right-0 backdrop-blur-xl rounded-xl shadow-xl border border-gray-500/50 py-1 min-w-[160px] z-[10000]"
              style={{
                background: 'rgba(55, 65, 81, 0.95)',
                backdropFilter: 'blur(20px)',
                boxShadow: '0 20px 40px -12px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(107, 114, 128, 0.3)'
              }}
            >
              {languages.map((language, index) => (
                <motion.button
                  key={language.code}
                  onClick={() => {
                    changeLanguage(language.code);
                    setIsOpen(false);
                  }}
                  className="w-full flex items-center justify-between px-4 py-3 text-sm transition-all duration-200 group"
                  whileHover={{ 
                    x: 4,
                    backgroundColor: 'rgba(75, 85, 99, 0.5)'
                  }}
                  transition={{ duration: 0.2, delay: index * 0.1 }}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                >
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-gray-600 to-gray-500 group-hover:from-blue-400 group-hover:to-purple-500 transition-all duration-200">
                      <span className="text-lg">{language.flag}</span>
                    </div>
                    <div className="text-left">
                      <div className="font-semibold text-white group-hover:text-blue-300 transition-colors">
                        {language.name}
                      </div>
                      <div className="text-xs text-gray-300 group-hover:text-blue-200 transition-colors">
                        {language.short}
                      </div>
                    </div>
                  </div>
                  
                  {currentLanguage === language.code && (
                    <motion.div
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ 
                        duration: 0.3,
                        ease: "easeOut"
                      }}
                      className="flex items-center justify-center w-6 h-6 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 shadow-md"
                    >
                      <Check className="w-3 h-3 text-white" />
                    </motion.div>
                  )}
                </motion.button>
              ))}
              
              {/* Bottom Accent */}
              <div className="mx-4 mt-2 h-px bg-gradient-to-r from-transparent via-gray-500 to-transparent" />
            </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
