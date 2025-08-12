// src/component/assets/location.js
export const ethiopianLocations = {
  regions: [
    {
      id: 'addis_ababa',
      name: 'Addis Ababa / አዲስ አበባ',
      // Addis Ababa has subcities instead of cities
      subcities: [
        { id: 'addis_ketema', name: 'Addis Ketema / አዲስ ከተማ', areas: [{ id: 'merkato', name: 'Merkato / መርካቶ' }, { id: 'autobus_tera', name: 'Autobus Tera / አውቶቡስ ተራ' }] },
        { id: 'arada', name: 'Arada / አራዳ', areas: [{ id: 'piassa', name: 'Piassa / ፒያሳ' }, { id: 'arat_kilo', name: 'Arat Kilo / አራት ኪሎ' }] },
        { id: 'kirkos', name: 'Kirkos / ቂርቆስ', areas: [{ id: 'kasanchis', name: 'Kasanchis / ካዛንቺስ' }, { id: 'meskel_square', name: 'Meskel Square / መስቀል አደባባይ' }] },
        { id: 'bole', name: 'Bole / ቦሌ', areas: [{ id: 'bole_medhanialem', name: 'Bole Medhanialem / ቦሌ መድኃኔዓለም' }, { id: 'edna_mall', name: 'Edna Mall / ኤድና ሞል' }] },
        { id: 'yeka', name: 'Yeka / የካ', areas: [{ id: 'megenagna', name: 'Megenagna / መገናኛ' }, { id: 'shola', name: 'Shola / ሾላ' }] },
      ]
    },
    {
      id: 'amhara', name: 'Amhara / አማራ',
      cities: [
        { id: 'bahir_dar', name: 'Bahir Dar / ባህር ዳር' },
        { id: 'gondar', name: 'Gondar / ጎንደር' },
        { id: 'dessie', name: 'Dessie / ደሴ' },
        { id: 'kombolcha', name: 'Kombolcha / ኮምቦልቻ' },
        { id: 'woldiya', name: 'Woldiya / ወልድያ' },
        { id: 'debre_markos', name: 'Debre Markos / ደብረ ማርቆስ' },
      ]
    },
    {
      id: 'oromia', name: 'Oromia / ኦሮሚያ',
      cities: [
        { id: 'adama', name: 'Adama (Nazret) / አዳማ (ናዝሬት)' },
        { id: 'jimma', name: 'Jimma / ጅማ' },
        { id: 'bishoftu', name: 'Bishoftu (Debre Zeit) / ቢሾፍቱ (ደብረ ዘይት)' },
        { id: 'nekemte', name: 'Nekemte / ነቀምቴ' },
        { id: 'shashemene', name: 'Shashemene / ሻሸመኔ' },
        { id: 'asella', name: 'Asella / አሰላ' },
      ]
    },
    {
      id: 'tigray', name: 'Tigray / ትግራይ',
      cities: [
        { id: 'mekelle', name: 'Mekelle / መቀሌ' },
        { id: 'adigrat', name: 'Adigrat / አዲግራት' },
        { id: 'axum', name: 'Axum / አክሱም' },
        { id: 'shire', name: 'Shire / ሽሬ' },
        { id: 'alamata', name: 'Alamata / አላማጣ' },
      ]
    },
    {
      id: 'somali', name: 'Somali / ሶማሌ',
      cities: [
        { id: 'jijiga', name: 'Jijiga / ጅጅጋ' },
        { id: 'gode', name: 'Gode / ጎዴ' },
        { id: 'kebri_dahar', name: 'Kebri Dahar / ቀብሪ ደሃር' },
        { id: 'degehabur', name: 'Degehabur / ደገሃቡር' },
      ]
    },
    {
      id: 'afar', name: 'Afar / አፋር',
      cities: [
        { id: 'semera', name: 'Semera / ሰመራ' },
        { id: 'asayita', name: 'Asayita / አሳይታ' },
        { id: 'afambo', name: 'Afambo / አፋምቦ' },
      ]
    },
    {
      id: 'sidama', name: 'Sidama / ሲዳማ',
      cities: [ { id: 'hawassa', name: 'Hawassa / ሀዋሳ' } ]
    },
    {
      id: 'harari', name: 'Harari / ሐረሪ',
      cities: [ { id: 'harar', name: 'Harar / ሐረር' } ]
    },
    {
      id: 'gambela', name: 'Gambela / ጋምቤላ',
      cities: [ { id: 'gambela_city', name: 'Gambela / ጋምቤላ' } ]
    },
    {
      id: 'benishangul_gumuz', name: 'Benishangul-Gumuz / ቤኒሻንጉል ጉሙዝ',
      cities: [ { id: 'assosa', name: 'Assosa / አሶሳ' } ]
    },
    {
      id: 'swepr', name: 'South West Ethiopia People Region / ደቡብ ምዕራብ ህዝቦች ክልል',
      cities: [ { id: 'bonga', name: 'Bonga / ቦንጋ' } ]
    },
    {
      id: 'ser', name: 'South Ethiopia Regional State / የደቡብ ኢትዮጵያ ህዝብ ክልል',
      cities: [ { id: 'arba_minch', name: 'Arba Minch / አርባ ምንጭ' } ]
    },
    {
      id: 'cer', name: 'Central Ethiopia Regional State / ማዕከላዊ የኢትዮጵያ ክልላዊ ግዛት',
      cities: [ { id: 'butajira', name: 'Butajira / ቡታጅራ' } ]
    },
    
  ]
};