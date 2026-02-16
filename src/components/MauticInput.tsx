import type { MauticInputProps } from "../types";

export const MauticInput = ({
  formName,
  name,
  label,
  type = "text",
  required = false,
  validate,
  validationType,
  className = "",
  errorMessage = "Required",
  placeholder = "",
  autocomplete = "off",
  component,
  ...props
}: MauticInputProps) => {
  const fieldId = `mauticform_${formName}_${name}`;
  const inputId = `mauticform_input_${formName}_${name}`;
  const shouldRenderTextarea = component === 'textarea' || type === 'textarea';

  return (
    <div
      id={fieldId}
      className={`mauticform-row mauticform-${type} ${required ? "mauticform-required" : ""
        } ${className}`}
      data-validate={validate}
      data-validation-type={validationType}
    >
      {label && (
        <label
          id={`mauticform_label_${formName}_${name}`}
          htmlFor={inputId}
          className="mauticform-label mb-2 block text-sm font-medium"
        >
          {label}
        </label>
      )}
      {shouldRenderTextarea ? (
        <textarea
          id={inputId}
          name={`mauticform[${name}]`}
          className={`mauticform-input w-full rounded-md border px-3 py-2 ${className}`}
          placeholder={placeholder}
          required={required}
          aria-required={required}
          {...(props as React.TextareaHTMLAttributes<HTMLTextAreaElement>)}
        ></textarea>
      ) : (
        <input
          id={inputId}
          name={`mauticform[${name}]`}
          type={type}
          className={`mauticform-input w-full rounded-md border px-3 py-2 ${className}`}
          placeholder={placeholder}
          autoComplete={autocomplete}
          required={required}
          aria-required={required}
          {...props}
        />
      )}
      <span
        className="mauticform-errormsg mt-1 text-sm text-red-500"
        style={{ display: "none" }}
      >
        {errorMessage}
      </span>
    </div>
  );
};
