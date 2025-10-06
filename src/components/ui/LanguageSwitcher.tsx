/**
 * @fileoverview Modern, beautiful, and professional language switcher component
 * Features gradient backgrounds, glassmorphism effects, and smooth animations
 * Supports Brazilian Portuguese and English with premium styling
 */

'use client';

import React, { useState } from 'react';
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

  const currentLang = languages.find(lang => lang.code === currentLanguage) || languages[0];

  return (
    <div className="relative">
      {/* Main Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="group relative flex items-center space-x-3 px-4 py-3 rounded-xl border border-slate-200/60 shadow-lg hover:shadow-xl transition-all duration-150 cursor-pointer hover:bg-gradient-to-r hover:from-blue-500/30 hover:to-purple-500/30 z-50"
        whileHover={{ 
          scale: 1.02,
          y: -1
        }}
        whileTap={{ scale: 0.98 }}
        style={{
          background: 'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(248,250,252,0.9) 100%)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(148, 163, 184, 0.2)'
        }}
      >
        
        {/* Content */}
        <div className="relative flex items-center space-x-3">
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 shadow-md">
            <Globe className="w-4 h-4 text-white" />
          </div>
          
          <div className="flex items-center space-x-2">
            <span className="text-lg">{currentLang.flag}</span>
            <span className="text-sm font-semibold text-slate-700">{currentLang.short}</span>
          </div>
          
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="flex items-center justify-center"
          >
            <ChevronDown className="w-4 h-4 text-slate-500" />
          </motion.div>
        </div>
      </motion.button>

      {/* Dropdown Menu */}
          <AnimatePresence>
            {isOpen && (
              <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-[90]"
              onClick={() => setIsOpen(false)}
            />
            
            {/* Menu */}
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ 
                duration: 0.3,
                ease: [0.4, 0, 0.2, 1]
              }}
              className="absolute top-full mt-3 right-0 bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-slate-200/50 py-2 min-w-[200px] z-[100]"
              style={{
                background: 'rgba(255, 255, 255, 0.95)',
                backdropFilter: 'blur(20px)',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(148, 163, 184, 0.1)'
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
                    backgroundColor: 'rgba(59, 130, 246, 0.05)'
                  }}
                  transition={{ duration: 0.2 }}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-slate-100 to-slate-200 group-hover:from-blue-100 group-hover:to-purple-100 transition-all duration-200">
                      <span className="text-lg">{language.flag}</span>
                    </div>
                    <div className="text-left">
                      <div className="font-semibold text-slate-700 group-hover:text-slate-900 transition-colors">
                        {language.name}
                      </div>
                      <div className="text-xs text-slate-500 group-hover:text-slate-600 transition-colors">
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
              <div className="mx-4 mt-2 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};
