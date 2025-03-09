"use client";

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
}: MauticInputProps) => {
  const fieldId = `mauticform_${formName}_${name}`;

  return (
    <div
      id={fieldId}
      className={`mauticform-row mauticform-${type} ${
        required ? "mauticform-required" : ""
      } ${className}`}
      data-validate={validate}
      data-validation-type={validationType}
    >
      {label && (
        <label
          id={`mauticform_label_${formName}_${name}`}
          htmlFor={`mauticform_input_${formName}_${name}`}
          className="mauticform-label mb-2 block text-sm font-medium"
        >
          {label}
        </label>
      )}
      {type === "textarea" ? (
        <textarea
          id={`mauticform_input_${formName}_${name}`}
          name={`mauticform[${name}]`}
          className={`mauticform-input w-full rounded-md border px-3 py-2 ${className}`}
          placeholder={placeholder}
          rows={5}
          cols={70}
        ></textarea>
      ) : (
        <input
          id={`mauticform_input_${formName}_${name}`}
          name={`mauticform[${name}]`}
          type={type}
          className={`mauticform-input w-full rounded-md border px-3 py-2 ${className}`}
          placeholder={placeholder}
          autoComplete={autocomplete}
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
