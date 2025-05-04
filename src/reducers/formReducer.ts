export interface FieldConfig {
  name: string;
  label: string;
  type: string;
  required?: boolean;
  options?: string[];
  pattern?: string;
  errorMessage?: string;
}

export interface FormConfig {
  fields: FieldConfig[];
}

export interface FormState {
  values: Record<string, any>;
  errors: Record<string, string>;
}

export type Action =
  | { type: 'UPDATE_FIELD'; name: string; value: any }
  | { type: 'SET_ERRORS'; errors: Record<string, string> }
  | { type: 'RESET_FORM' };

export const validateField = (field: FieldConfig, value: any): string => {
  if (field.required && (value === undefined || value === '' || value === false)) {
    return `${field.label} is required.`;
  }

  if (field.pattern && value) {
    const regex = new RegExp(field.pattern);
    if (!regex.test(value)) {
      return field.errorMessage || `${field.label} is invalid.`;
    }
  }

  if (field.type === 'email' && value) {
    const emailRegex = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;
    if (!emailRegex.test(value)) {
      return 'Invalid email format.';
    }
  }

  return '';
};

export const formReducer = (state: FormState, action: Action): FormState => {
  switch (action.type) {
    case 'UPDATE_FIELD':
      return {
        ...state,
        values: {
          ...state.values,
          [action.name]: action.value,
        },
        errors: {
          ...state.errors,
          [action.name]: '',
        },
      };

    case 'SET_ERRORS':
      return {
        ...state,
        errors: action.errors,
      };

    case 'RESET_FORM':
      return {
        values: {},
        errors: {},
      };

    default:
      return state;
  }
};
