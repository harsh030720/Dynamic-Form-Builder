import React, { useReducer, useState, useEffect } from 'react';
import {
  formReducer,
  validateField,
  FormState,
  FieldConfig,
  FormConfig,
} from '../reducers/formReducer';
import './DynamicForm.css';

interface FormProps {
  config: FormConfig;
}

const DynamicForm: React.FC<FormProps> = ({ config }) => {
  const [dynamicConfig, setDynamicConfig] = useState<FormConfig>(config);
  const initialState: FormState = { values: {}, errors: {} };
  const [state, dispatch] = useReducer(formReducer, initialState);

  useEffect(() => {
    setDynamicConfig(config);
  }, [config]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, field: FieldConfig) => {
    const value = field.type === 'checkbox' ? e.target.checked : e.target.value;
    dispatch({ type: 'UPDATE_FIELD', name: field.name, value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errors: Record<string, string> = {};
    dynamicConfig.fields.forEach((field) => {
      const error = validateField(field, state.values[field.name]);
      if (error) {
        errors[field.name] = error;
      }
    });
    if (Object.keys(errors).length > 0) {
      dispatch({ type: 'SET_ERRORS', errors });
    } else {
      console.log('Form Submitted:', state.values);
      alert('Form submitted! Check the console.');
    }
  };

  const handleReset = () => {
    dispatch({ type: 'RESET_FORM' });
  };

  const renderField = (field: FieldConfig) => {
    switch (field.type) {
      case 'text':
      case 'email':
      case 'number':
        return (
          <input
            className="form-input"
            type={field.type}
            name={field.name}
            value={state.values[field.name] || ''}
            onChange={(e) => handleChange(e, field)}
            placeholder={`Enter ${field.label}`}
          />
        );
      case 'checkbox':
        return (
          <div className="form-checkbox-group">
            <input
              className="form-checkbox"
              type="checkbox"
              name={field.name}
              checked={state.values[field.name] || false}
              onChange={(e) => handleChange(e, field)}
              id={field.name}
            />
            <label htmlFor={field.name}>{field.label}</label>
          </div>
        );
      case 'radio':
        return (
          <div className="form-radio-group">
            {field.options?.map((opt) => (
              <label key={opt} className="form-radio-option">
                <input
                  type="radio"
                  name={field.name}
                  value={opt}
                  checked={state.values[field.name] === opt}
                  onChange={(e) => handleChange(e, field)}
                />
                {opt}
              </label>
            ))}
          </div>
        );
      default:
        return null;
    }
  };

  const handleJSONChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    try {
      const newConfig = JSON.parse(e.target.value);
      setDynamicConfig(newConfig);
    } catch (err) {
      console.warn('Invalid JSON:', err);
    }
  };

  return (
    <div className="form-container">
      <form className="dynamic-form" onSubmit={handleSubmit} noValidate>
        {dynamicConfig.fields.map((field) => (
          <div key={field.name} className="form-group">
            {field.type !== 'checkbox' && (
              <label htmlFor={field.name} className="form-label">
                {field.label}
                {field.required && <span className="form-required"> *</span>}
              </label>
            )}
            {renderField(field)}
            {state.errors[field.name] && (
              <div className="form-error">{state.errors[field.name]}</div>
            )}
          </div>
        ))}
        <div className="form-button-group">
          <button type="submit" className="form-submit">Submit</button>
          <button type="button" className="form-reset"  onClick={handleReset}>Reset</button>
        </div>
      </form>
      <div className="json-editor">
        <h3>Edit Form JSON</h3>
        <textarea
          rows={20}
          cols={50}
          defaultValue={JSON.stringify(config, null, 2)}
          onChange={handleJSONChange}
        ></textarea>
      </div>
    </div>
  );
};

export default DynamicForm;
