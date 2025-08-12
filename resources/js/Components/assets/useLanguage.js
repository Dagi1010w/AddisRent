// src/composables/useLanguage.js

import { ref, computed } from 'vue';

// The language ref is defined outside the function to create a shared, singleton state.
const language = ref('en'); // Defaults to English

const translations = {
  en: {
    // App Main Content
    'app.title': 'AddisRent',
    'app.subtitle': '🌍 Ethiopia\'s Premier Platform',
    'app.welcome': 'Welcome to AddisRent 🌍',
    'app.description': 'Your trusted rental & investment platform in Ethiopia',
    'app.tagline': '📍 Pin your next home, office, or land today',
    
    // Features Grid
    'features.listProperties': 'List Properties',
    'features.listPropertiesDesc': 'Easy listing for landlords',
    'features.findRentals': 'Find Rentals', 
    'features.findRentalsDesc': 'Discover your perfect home',
    'features.investSmart': 'Invest Smart',
    'features.investSmartDesc': 'Investment opportunities',
    'features.trustedNetwork': 'Trusted Network',
    'features.trustedNetworkDesc': 'Verified users & properties',
    
    // Form Headers
    'form.createAccount': 'Create Your AddisRent Account',
    'form.getStarted': 'Select your role and get started',
    'form.createAccountMobile': 'Create Your Account', 
    'form.joinToday': 'Join AddisRent today',
    
    // User Roles
    'roles.selectRole': 'Select your role:',
    'roles.tenant': 'I\'m a Tenant',
    'roles.tenantDesc': 'Looking for a place to rent',
    'roles.buyer': 'I\'m a Buyer',
    'roles.buyerDesc': 'Looking to purchase property',
    'roles.lessor': 'I\'m a Lessor', 
    'roles.lessorDesc': 'I have properties to rent',
    'roles.seller': 'I\'m a Seller',
    'roles.sellerDesc': 'I have properties to sell',
    
    // Account Types
    'account.accountType': 'Account Type:',
    'account.individual': 'Individual',
    'account.organization': 'Organization',
    
    // Form Fields
    'fields.fullName': 'Full Name',
    'fields.fullNamePlaceholder': 'Enter your full name',
    'fields.organizationName': 'Organization Name',
    'fields.organizationNamePlaceholder': 'Enter organization name',
    'fields.contactPerson': 'Contact Person Name',
    'fields.contactPersonPlaceholder': 'Enter contact person name',
    'fields.gender': 'Gender',
    'fields.male': 'Male',
    'fields.female': 'Female',
    'fields.email': 'Email Address',
    'fields.emailPlaceholder': 'Enter your email address',
    'fields.phoneNumber': 'Phone Number',
    'fields.phoneNumberPlaceholder': '+251 9XX XXX XXX',
    'fields.password': 'Password',
    'fields.passwordPlaceholder': 'Create a strong password',
    'fields.confirmPassword': 'Confirm Password',
    'fields.confirmPasswordPlaceholder': 'Confirm your password',
    'fields.googleMapsLink': 'Google Maps Link',
    'fields.googleMapsPlaceholder': 'https://maps.google.com/...',
    'fields.businessLicense': 'Business License',
    'fields.uploadLicense': 'Upload license',
    'fields.propertyInterest': 'Property Interest',
    'fields.propertyInterestPlaceholder': 'What are you looking for?',
    
    // Property Types
    'property.apartment': 'Apartment',
    'property.house': 'House',
    'property.office': 'Office Space',
    'property.commercial': 'Commercial Property',
    'property.land': 'Land',
    
    // Location
     'location.location': 'Location',
    'location.region': 'Region',
    'location.regionPlaceholder': 'Select Region',
    'location.city': 'City',
    'location.cityPlaceholder': 'Select City',
    'location.subcity': 'Sub-City',
    'location.subcityPlaceholder': 'Select Sub-City',
    'location.area': 'Area',
    'location.areaPlaceholder': 'Select Area',

    
    // Terms and Actions
    'terms.agree': 'I agree to the',
    'terms.termsConditions': 'Terms & Conditions',
    'terms.and': 'and',
    'terms.privacyPolicy': 'Privacy Policy',
    'actions.createAccount': 'Create Account',
    'actions.creatingAccount': 'Creating Account...',
    'actions.getStarted': 'Get Started',
    
    // Success Message
    'success.welcome': 'Welcome to AddisRent! 🎉',
    'success.accountCreated': 'Your account has been created successfully. You can now start exploring rental opportunities.',
    
    // Navigation Links
    'nav.alreadyAccount': 'Already have an account?',
    'nav.loginHere': 'Login here',
    'nav.backToHome': 'Back to Home',
    'nav.help': 'Help',
    'nav.privacy': 'Privacy',
    
    // Validation Errors
    'errors.emailRequired': 'Email is required',
    'errors.emailInvalid': 'Invalid email format',
    'errors.phoneRequired': 'Phone number is required',
    'errors.phoneInvalid': 'Invalid Ethiopian phone number',
    'errors.passwordRequired': 'Password is required',
    'errors.passwordTooShort': 'Password must be at least 8 characters',
    'errors.passwordWeak': 'Password must contain at least one lowercase, uppercase, and number',
    'errors.confirmPasswordRequired': 'Please confirm your password',
    'errors.passwordsNotMatch': 'Passwords do not match',
    'errors.nameRequired': 'Full name is required',
    'errors.nameTooShort': 'Name must be at least 2 characters',
    'errors.organizationNameRequired': 'Organization name is required',
    'errors.contactPersonRequired': 'Contact person name is required',
    'errors.genderRequired': 'Gender is required',
    'errors.subcityRequired': 'Subcity is required',
    'errors.areaRequired': 'Area is required',
    'errors.agreeTermsRequired': 'You must agree to the terms and conditions',
    'errors.cityRequired': 'City is required',
     'errors.regionRequired': 'Region is required',
    'errors.subcityRequired': 'Sub-City is required',
    'errors.areaRequired': 'Area is required'
  },
  am: {
    // App Main Content
    'app.title': 'አዲስሬንት',
    'app.subtitle': '🌍 የኢትዮጵያ ቀዳሚ መድረክ',
    'app.welcome': 'እንኳን ወደ አዲስሬንት በደህና መጡ 🌍',
    'app.description': 'በኢትዮጵያ የሚመካ የኪራይና ኢንቨስትመንት መድረክ',
    'app.tagline': '📍 የሚቀጥለውን ቤትዎን፣ ቢሮዎን ወይም መሬትዎን ዛሬ ይመዝግቡ',
    
    // Features Grid
    'features.listProperties': 'ንብረት ይዘርዝሩ',
    'features.listPropertiesDesc': 'ለቤት ባለቤቶች ቀላል መዝገብ',
    'features.findRentals': 'ኪራይ ያግኙ',
    'features.findRentalsDesc': 'ፍጹም ቤትዎን ያግኙ',
    'features.investSmart': 'በብልህነት ኢንቨስት ያድርጉ',
    'features.investSmartDesc': 'የኢንቨስትመንት እድሎች',
    'features.trustedNetwork': 'የሚመካ አውታር',
    'features.trustedNetworkDesc': 'የተረጋገጡ ተጠቃሚዎችና ንብረቶች',
    
    // Form Headers
    'form.createAccount': 'የአዲስሬንት መለያዎን ይፍጠሩ',
    'form.getStarted': 'ሚናዎን ይምረጡ እና ይጀምሩ',
    'form.createAccountMobile': 'መለያዎን ይፍጠሩ',
    'form.joinToday': 'ዛሬ አዲስሬንት ይቀላቀሉ',
    
    // User Roles
    'roles.selectRole': 'ሚናዎን ይምረጡ:',
    'roles.tenant': 'ተከራይ ነኝ',
    'roles.tenantDesc': 'ለኪራይ ቦታ እየፈለግኩ ነው',
    'roles.buyer': 'ገዢ ነኝ',
    'roles.buyerDesc': 'ንብረት ለመግዛት እየፈለግኩ ነው',
    'roles.lessor': 'አከራይ ነኝ',
    'roles.lessorDesc': 'ለኪራይ የምሰጠው ንብረት አለኝ',
    'roles.seller': 'ሻጭ ነኝ',
    'roles.sellerDesc': 'ለመሽጥ የምፈልገው ንብረት አለኝ',
    
    // Account Types
    'account.accountType': 'የመለያ ዓይነት:',
    'account.individual': 'ግለሰብ',
    'account.organization': 'ድርጅት',
    
    // Form Fields
    'fields.fullName': 'ሙሉ ስም',
    'fields.fullNamePlaceholder': 'ሙሉ ስምዎን ያስገቡ',
    'fields.organizationName': 'የድርጅት ስም',
    'fields.organizationNamePlaceholder': 'የድርጅት ስም ያስገቡ',
    'fields.contactPerson': 'የመገናኛ ሰው ስም',
    'fields.contactPersonPlaceholder': 'የመገናኛ ሰው ስም ያስገቡ',
    'fields.gender': 'ጾታ',
    'fields.male': 'ወንድ',
    'fields.female': 'ሴት',
    'fields.email': 'ኢሜል አድራሻ',
    'fields.emailPlaceholder': 'ኢሜል አድራሻዎን ያስገቡ',
    'fields.phoneNumber': 'ስልክ ቁጥር',
    'fields.phoneNumberPlaceholder': '+251 9XX XXX XXX',
    'fields.password': 'የይለፍ ቃል',
    'fields.passwordPlaceholder': 'ጠንካራ የይለፍ ቃል ይፍጠሩ',
    'fields.confirmPassword': 'የይለፍ ቃል ያጽድቁ',
    'fields.confirmPasswordPlaceholder': 'የይለፍ ቃልዎን ያጽድቁ',
    'fields.googleMapsLink': 'የጉግል ካርታ ሊንክ',
    'fields.googleMapsPlaceholder': 'https://maps.google.com/...',
    'fields.businessLicense': 'የንግድ ፍቃድ',
    'fields.uploadLicense': 'ፍቃድ ይጫኑ',
    'fields.propertyInterest': 'የንብረት ፍላጎት',
    'fields.propertyInterestPlaceholder': 'ምን እየፈለጉ ነው?',
    
    // Property Types
    'property.apartment': 'አፓርትመንት',
    'property.house': 'ቤት',
    'property.office': 'የቢሮ ቦታ',
    'property.commercial': 'የንግድ ንብረት',
    'property.land': 'መሬት',
    
    // Location
    'location.location': 'አካባቢ',
    'location.region': 'ክልል',
    'location.regionPlaceholder': 'ክልል ይምረጡ',
    'location.city': 'ከተማ',
    'location.cityPlaceholder': 'ከተማ ይምረጡ',
    'location.subcity': 'ክፍለ ከተማ',
    'location.subcityPlaceholder': 'ክፍለ ከተማ ይምረጡ',
    'location.area': 'አካባቢ',
    'location.areaPlaceholder': 'አካባቢ ይምረጡ',

    
    // Terms and Actions
    'terms.agree': 'እኔ እቀበላለሁ',
    'terms.termsConditions': 'ውል እና ሁኔታዎች',
    'terms.and': 'እና',
    'terms.privacyPolicy': 'የግላዊነት ፖሊሲ',
    'actions.createAccount': 'መለያ ይፍጠሩ',
    'actions.creatingAccount': 'መለያ እየፈጠርን ነው...',
    'actions.getStarted': 'ጀምሩ',
    
    // Success Message
    'success.welcome': 'እንኳን ወደ አዲስሬንት በደህና መጡ! 🎉',
    'success.accountCreated': 'መለያዎ በተሳካ ሁኔታ ተፈጥሯል። አሁን የኪራይ እድሎችን ማሰስ ይጀምሩ።',
    
    // Navigation Links
    'nav.alreadyAccount': 'ቀደም ብለው መለያ አለዎት?',
    'nav.loginHere': 'እዚህ ግቡ',
    'nav.backToHome': 'ወደ ቤት ተመለስ',
    'nav.help': 'እርዳታ',
    'nav.privacy': 'ግላዊነት',
    
    // Validation Errors
    'errors.cityRequired': 'ከተማ ያስፈልጋል',
    'errors.emailRequired': 'ኢሜል ያስፈልጋል',
    'errors.emailInvalid': 'የተሳሳተ ኢሜል ቅርጸት',
    'errors.phoneRequired': 'ስልክ ቁጥር ያስፈልጋል',
    'errors.phoneInvalid': 'የተሳሳተ የኢትዮጵያ ስልክ ቁጥር',
    'errors.passwordRequired': 'የይለፍ ቃል ያስፈልጋል',
    'errors.passwordTooShort': 'የይለፍ ቃል ቢያንስ 8 ባህሪያት ሊኖረው ይገባል',
    'errors.passwordWeak': 'የይለፍ ቃል ቢያንስ አንድ ትንሽ፣ ትልቅ እና ቁጥር ሊኖረው ይገባል',
    'errors.confirmPasswordRequired': 'እባክዎ የይለፍ ቃልዎን ያጽድቁ',
    'errors.passwordsNotMatch': 'የይለፍ ቃሎች አይዛመዱም',
    'errors.nameRequired': 'ሙሉ ስም ያስፈልጋል',
    'errors.nameTooShort': 'ስም ቢያንስ 2 ባህሪያት ሊኖረው ይገባል',
    'errors.organizationNameRequired': 'የድርጅት ስም ያስፈልጋል',
    'errors.contactPersonRequired': 'የመገናኛ ሰው ስም ያስፈልጋል',
    'errors.genderRequired': 'ጾታ ያስፈልጋል',
    'errors.regionRequired': 'ክልል ያስፈልጋል',
    'errors.subcityRequired': 'ክፍለ ከተማ ያስፈልጋል',
    'errors.areaRequired': 'አካባቢ ያስፈልጋል',
    'errors.cityRequired': 'ከተማ ያስፈልጋል',
    'errors.agreeTermsRequired': 'ሁኔታዎችን መቀበል አለቦት',
    'errors.areaRequired': 'አካባቢ ያስፈልጋል',
  }
};
// NOTE: Make sure to copy your full translation objects here.

/**
 * Composable for handling language and translations.
 */
export function useLanguage() {

  /**
   * Changes the current language.
   * @param {string} lang - The new language to set ('en' or 'am').
   */
  const setLanguage = (lang) => {
    if (['en', 'am'].includes(lang)) {
      language.value = lang;
    }
  };

  /**
   * The translation function. It's a computed property that reacts to language changes.
   */
  const t = computed(() => {
    return (key) => {
      return translations[language.value][key] || key;
    };
  });

  return {
    language: computed(() => language.value),
    setLanguage,
    t,
  };
}