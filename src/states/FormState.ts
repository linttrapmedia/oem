import { State, StateType } from '@/registry';

type FormStateValue<T extends Record<string, any>> = {
  values: T;
  errors: Partial<Record<keyof T, string>>;
  touched: Partial<Record<keyof T, boolean>>;
  dirty: boolean;
  valid: boolean;
};

type FormValidators<T extends Record<string, any>> = Partial<
  Record<keyof T, (value: T[keyof T], values: T) => string | undefined>
>;

type FormCustomMethods<T extends Record<string, any>> = {
  setField: (
    state: StateType<FormStateValue<T>, FormCustomMethods<T>>,
    field: keyof T,
    value: T[keyof T],
  ) => void;
  setError: (
    state: StateType<FormStateValue<T>, FormCustomMethods<T>>,
    field: keyof T,
    error: string | undefined,
  ) => void;
  touch: (
    state: StateType<FormStateValue<T>, FormCustomMethods<T>>,
    field: keyof T,
  ) => void;
  validate: (
    state: StateType<FormStateValue<T>, FormCustomMethods<T>>,
  ) => boolean;
  reset: (
    state: StateType<FormStateValue<T>, FormCustomMethods<T>>,
  ) => void;
};

export const useFormState = <T extends Record<string, any>>(
  initialValues: T,
  validators?: FormValidators<T>,
) => {
  const runValidation = (values: T): Partial<Record<keyof T, string>> => {
    const errors: Partial<Record<keyof T, string>> = {};
    if (validators) {
      for (const field in validators) {
        const validator = validators[field];
        if (validator) {
          const error = validator(values[field], values);
          if (error) errors[field] = error;
        }
      }
    }
    return errors;
  };

  const state = State<FormStateValue<T>, FormCustomMethods<T>>(
    {
      values: { ...initialValues },
      errors: {},
      touched: {},
      dirty: false,
      valid: true,
    },
    {
      setField: (s, field, value) => {
        const prev = s.val();
        const values = { ...prev.values, [field]: value };
        const errors = runValidation(values);
        s.set({
          ...prev,
          values,
          errors,
          dirty: true,
          valid: Object.keys(errors).length === 0,
        });
      },
      setError: (s, field, error) => {
        const prev = s.val();
        const errors = { ...prev.errors };
        if (error) {
          errors[field] = error;
        } else {
          delete errors[field];
        }
        s.set({
          ...prev,
          errors,
          valid: Object.keys(errors).length === 0,
        });
      },
      touch: (s, field) => {
        const prev = s.val();
        s.set({
          ...prev,
          touched: { ...prev.touched, [field]: true },
        });
      },
      validate: (s) => {
        const prev = s.val();
        const errors = runValidation(prev.values);
        const touched: Partial<Record<keyof T, boolean>> = {};
        for (const field in initialValues) {
          touched[field] = true;
        }
        const valid = Object.keys(errors).length === 0;
        s.set({ ...prev, errors, touched, valid });
        return valid;
      },
      reset: (s) => {
        s.set({
          values: { ...initialValues },
          errors: {},
          touched: {},
          dirty: false,
          valid: true,
        });
      },
    },
  );

  return state;
};
