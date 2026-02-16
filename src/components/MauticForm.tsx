import type React from "react";
import { useMauticForm } from "../hooks/useMauticForm";
import type { MauticFormProps } from "../types";

export const MauticForm = ({
  formId,
  formName,
  action,
  children,
  successCallback,
  errorCallback,
  className,
}: MauticFormProps) => {
  const { handleSubmit, isSubmitting, error } = useMauticForm({
    formId,
    formName,
    action,
    successCallback,
    errorCallback,
  });

  return (
    <div
      id={`mauticform_wrapper_${formName}`}
      className={`mauticform_wrapper ${className || ""}`}
    >
      <form
        autoComplete="true"
        method="post"
        onSubmit={handleSubmit}
        id={`mauticform_${formName}`}
        data-mautic-form={formName}
        encType="multipart/form-data"
        aria-busy={isSubmitting}
      >
        <div className="mauticform-innerform">
          <div
            className="mauticform-page-wrapper mauticform-page-1"
            data-mautic-form-page="1"
          >
            {children}
          </div>
        </div>
        <div className="mauticform-error" id={`mauticform_${formName}_error`}>
          {error && error.message}
        </div>
        <div
          className="mauticform-message"
          id={`mauticform_${formName}_message`}
        ></div>
        <input
          type="hidden"
          name="mauticform[formId]"
          id={`mauticform_${formName}_id`}
          value={formId}
        />
        <input
          type="hidden"
          name="mauticform[return]"
          id={`mauticform_${formName}_return`}
          value=""
        />
        <input
          type="hidden"
          name="mauticform[formName]"
          id={`mauticform_${formName}_name`}
          value={formName}
        />
      </form>
    </div>
  );
};
