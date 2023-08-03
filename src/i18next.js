import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  'en-US': {
    translation: {
      add: 'Add',
      save: 'Save',
      update: 'Update',
      name: 'Name',
      salary: 'Salary',
      birthday: 'Birthday',
      address: 'Address',
      successful: 'Successful',
      failed: 'Failed',
      delete: 'Delete'
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en-US',
    interpolation: {
      escapeValue: false
    }
  });

  export default i18n;