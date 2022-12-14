import {showMessage} from 'react-native-flash-message';

export const showError = message => {
  showMessage({
    message: message,
    type: 'danger',
    icon: 'danger',
  });
};

export const showSuccess = message => {
  showMessage({
    message: message,
    type: 'success',
    icon: 'success',
  });
};

export const showWarning = message => {
  showMessage({
    message: message,
    type: 'warning',
    icon: 'warning',
  });
};
