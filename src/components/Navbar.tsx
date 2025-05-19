import React, { useState } from 'react';
import { useApp } from '../contexts/AppContext';
import { useTheme } from '../contexts/ThemeContext';
import { useLanguage } from '../contexts/LanguageContext';
import { Settings as Lungs, Moon, Sun, Menu, X, History, HelpCircle, Languages } from 'lucide-react';

const Navbar: React.FC = () => {
  const { currentPage, navigateTo } = useApp();
  const { theme, toggleTheme } = useTheme();
  const { language, setLanguage, t } = useLanguage();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleLangMenu = () => setIsLangMenuOpen(!isLangMenuOpen);

  const NavItem: React.FC<{ 
    page: 'home' | 'history' | 'guide', 
    label: string, 
    icon: React.ReactNode 
  }> = ({ page, label, icon }) => (
    <button
      onClick={() => {
        navigateTo(page);
        setIsMenuOpen(false);
      }}
      className={`flex items-center gap-2 px-4 py-2 rounded-md ${
        currentPage === page
          ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100'
          : 'hover:bg-gray-100 dark:hover:bg-gray-800'
      } transition-colors duration-200`}
    >
      {icon}
      <span>{label}</span>
    </button>
  );

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-sm transition-colors duration-200">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <Lungs className="h-8 w-8 text-blue-700 dark:text-blue-400" />
            <span className="font-bold text-xl text-gray-900 dark:text-white">
              {t('appName')}
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-4">
            <NavItem 
              page="home" 
              label={t('home')} 
              icon={<Lungs size={18} />} 
            />
            <NavItem 
              page="history" 
              label={t('history')} 
              icon={<History size={18} />} 
            />
            <NavItem 
              page="guide" 
              label={t('guide')} 
              icon={<HelpCircle size={18} />} 
            />
          </div>

          {/* Theme and Language Toggles */}
          <div className="hidden md:flex items-center gap-4">
            {/* Language Toggle */}
            <div className="relative">
              <button
                onClick={toggleLangMenu}
                className="flex items-center gap-1 px-2 py-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <Languages size={20} />
                <span className="uppercase">{language}</span>
              </button>
              {isLangMenuOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-gray-800 rounded-md shadow-lg z-10">
                  <button
                    onClick={() => {
                      setLanguage('en');
                      setIsLangMenuOpen(false);
                    }}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    English
                  </button>
                  <button
                    onClick={() => {
                      setLanguage('vi');
                      setIsLangMenuOpen(false);
                    }}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    Tiếng Việt
                  </button>
                </div>
              )}
            </div>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              {theme === 'dark' ? (
                <Sun size={20} className="text-yellow-400" />
              ) : (
                <Moon size={20} className="text-blue-700" />
              )}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              {isMenuOpen ? (
                <X size={24} className="text-gray-700 dark:text-gray-300" />
              ) : (
                <Menu size={24} className="text-gray-700 dark:text-gray-300" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex flex-col gap-2">
              <NavItem 
                page="home" 
                label={t('home')} 
                icon={<Lungs size={18} />} 
              />
              <NavItem 
                page="history" 
                label={t('history')} 
                icon={<History size={18} />} 
              />
              <NavItem 
                page="guide" 
                label={t('guide')} 
                icon={<HelpCircle size={18} />} 
              />

              <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                {/* Language Toggle (Mobile) */}
                <div className="flex gap-2">
                  <button
                    onClick={() => setLanguage('en')}
                    className={`px-3 py-1 rounded ${
                      language === 'en'
                        ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100'
                        : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                    }`}
                  >
                    EN
                  </button>
                  <button
                    onClick={() => setLanguage('vi')}
                    className={`px-3 py-1 rounded ${
                      language === 'vi'
                        ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100'
                        : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                    }`}
                  >
                    VI
                  </button>
                </div>

                {/* Theme Toggle (Mobile) */}
                <button
                  onClick={toggleTheme}
                  className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  {theme === 'dark' ? (
                    <Sun size={20} className="text-yellow-400" />
                  ) : (
                    <Moon size={20} className="text-blue-700" />
                  )}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;