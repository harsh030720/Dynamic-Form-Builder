// src/reducers/formReducer.ts

export interface FieldConfig {
    name: string;
    label: string;
    type: string;
    required?: boolean;
    options?: string[];
  }
  
  export interface FormConfig {
    fields: FieldConfig[];
  }
  
  export interface FormState {
    values: Record<string, any>;
    errors: Record<string, string>;
  }
  
  export interface Action {
    type: 'UPDATE_FIELD' | 'RESET_FORM' |'SET_ERRORS';
    name?: string;
    value?: any;
    errors?: Record<string, string>;
  }
  
  export const validateField = (field: FieldConfig, value: any): string => {
    if (field.required && !value) {
      return `${field.label} is required.`;
    }
    if (field.type === 'email' && value) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
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
          values: { ...state.values, [action.name!]: action.value },
          errors: { ...state.errors, [action.name!]: '' },
        };
        case 'RESET_FORM':
  return { values: {}, errors: {} };

      case 'SET_ERRORS':
        return { ...state, errors: action.errors || {} };
      default:
        return state;
    }
  };
  