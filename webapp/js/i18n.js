/**
 * Internationalization (i18n) Manager for MCMI-II Assessment Tool
 * Supports Persian (Farsi) and English
 */

class I18nManager {
  constructor() {
    this.currentLang = localStorage.getItem('language') || 'fa'; // Default to Persian
    this.translations = {};
    this.listeners = [];
  }

  async init() {
    await this.loadTranslations();
    this.applyLanguage();
  }

  async loadTranslations() {
    try {
      const [faResponse, enResponse] = await Promise.all([
        fetch('locales/fa.json'),
        fetch('locales/en.json')
      ]);
      
      this.translations.fa = await faResponse.json();
      this.translations.en = await enResponse.json();
      
      console.log(`✅ Loaded translations for ${Object.keys(this.translations).length} languages`);
    } catch (error) {
      console.error('❌ Failed to load translations:', error);
      // Fallback to hardcoded translations if fetch fails
      this.loadFallbackTranslations();
    }
  }

  loadFallbackTranslations() {
    // Minimal fallback translations
    this.translations = {
      fa: {
        app: {
          title: 'ارزیابی MCMI-II',
          loading: 'در حال بارگذاری...'
        }
      },
      en: {
        app: {
          title: 'MCMI-II Assessment',
          loading: 'Loading...'
        }
      }
    };
  }

  t(key, params = {}) {
    const keys = key.split('.');
    let translation = this.translations[this.currentLang];
    
    for (const k of keys) {
      if (translation && translation[k]) {
        translation = translation[k];
      } else {
        console.warn(`Translation missing for key: ${key} in language: ${this.currentLang}`);
        return key;
      }
    }
    
    // Replace parameters like {name} with actual values
    if (typeof translation === 'string') {
      Object.keys(params).forEach(param => {
        translation = translation.replace(`{${param}}`, params[param]);
      });
    }
    
    return translation;
  }

  setLanguage(lang) {
    if (!this.translations[lang]) {
      console.error(`Language ${lang} not available`);
      return;
    }
    
    this.currentLang = lang;
    localStorage.setItem('language', lang);
    this.applyLanguage();
    this.notifyListeners();
  }

  getCurrentLanguage() {
    return this.currentLang;
  }

  isRTL() {
    return this.currentLang === 'fa';
  }

  applyLanguage() {
    // Set HTML lang and dir attributes
    document.documentElement.setAttribute('lang', this.currentLang);
    document.documentElement.setAttribute('dir', this.isRTL() ? 'rtl' : 'ltr');
    
    // Update all elements with data-i18n attribute
    document.querySelectorAll('[data-i18n]').forEach(element => {
      const key = element.getAttribute('data-i18n');
      const translation = this.t(key);
      
      if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
        element.placeholder = translation;
      } else {
        element.textContent = translation;
      }
    });
    
    // Update all elements with data-i18n-html attribute (for HTML content)
    document.querySelectorAll('[data-i18n-html]').forEach(element => {
      const key = element.getAttribute('data-i18n-html');
      element.innerHTML = this.t(key);
    });
    
    // Update document title
    document.title = this.t('app.title');
  }

  onChange(callback) {
    this.listeners.push(callback);
  }

  notifyListeners() {
    this.listeners.forEach(callback => callback(this.currentLang));
  }

  getAvailableLanguages() {
    return [
      { code: 'fa', name: 'فارسی', nativeName: 'فارسی' },
      { code: 'en', name: 'English', nativeName: 'English' }
    ];
  }
}

// Export singleton instance
const i18n = new I18nManager();
export default i18n;
