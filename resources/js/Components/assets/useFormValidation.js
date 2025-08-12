// src/component/assets/useFormValidation.js
import { reactive, ref } from 'vue';

export function useFormValidation(t) {
  const formData = reactive({
    userRole: 'tenant',
    accountType: 'individual',
    fullName: '',
    organizationName: '',
    googleMapsLink: '',
    businessLicense: null,
    email: '',
    phoneNumber: '',
    password: '',
    confirmPassword: '',
    city: '',
    region: '', 
    subcity: '',
    area: '',
    agreeToTerms: false,
  });

  const errors = reactive({});
  const touched = reactive({});
  const isSubmitting = ref(false);

  const validateField = (field) => {
    const value = formData[field];
    delete errors[field];

    if (field === 'email' && !value) errors.email = t.value('errors.emailRequired');
    else if (field === 'fullName' && formData.accountType === 'individual' && !value) errors.fullName = t.value('errors.nameRequired');
     else if (field === 'region' && !value) errors.region = t.value('errors.regionRequired');
    else if (field === 'city' && formData.region && formData.region !== 'addis_ababa' && !value) errors.city = t.value('errors.cityRequired');
    else if (field === 'subcity' && formData.region === 'addis_ababa' && !value) errors.subcity = t.value('errors.subcityRequired');
    else if (field === 'area' && !value) errors.area = t.value('errors.areaRequired');
    else if (field === 'agreeToTerms' && !value) errors.agreeToTerms = t.value('errors.agreeTermsRequired');
    // Add other validation rules as needed
  };
  
  const updateField = (field, value) => {
    formData[field] = value;
    if (touched[field]) {
      validateField(field);
    }
  };

  const touchField = (field) => {
    touched[field] = true;
    validateField(field);
  };

  const validateForm = () => {
    Object.keys(formData).forEach(field => {
      touched[field] = true;
      validateField(field);
    });
    return Object.keys(errors).length === 0;
  };

  return { formData, errors, isSubmitting, updateField, touchField, validateForm };
}