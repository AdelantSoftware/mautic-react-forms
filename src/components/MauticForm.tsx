import React, { useState } from "react";
import type {
  MauticFormProps,
  MauticFormTranslations,
  ToastState,
} from "../types";
import { Toast } from "./Toast";

export const MauticForm = ({
  formId,
  formName,
  action,
  children,
  successCallback,
  translations = {},
}: MauticFormProps) => {
  const [toast, setToast] = useState<ToastState>({
    show: false,
    message: "",
    type: "success",
  });

  const showToast = (message: string, type: ToastState["type"]) => {
    setToast({ show: true, message, type });
    setTimeout(() => {
      setToast({ show: false, message: "", type: "success" });
    }, 5000);
  };

  // Default translations
  const defaultTranslations: MauticFormTranslations = {
    submitSuccess: "Form submitted successfully!",
    submitError: "Error submitting form. Please try again.",
  };

  // Merge default translations with provided translations
  const t = {
    ...defaultTranslations,
    ...translations,
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);

    try {
      const response = await fetch(`${action}?formId=${formId}`, {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
          "X-Requested-With": "XMLHttpRequest",
        },
        credentials: "include",
      });

      if (response.ok) {
        successCallback?.(formData);
        showToast(t.submitSuccess!, "success");
        form.reset();
      } else {
        throw new Error("Form submission failed");
      }
    } catch (error) {
      showToast(t.submitError!, "error");
    }
  };

  return (
    <>
      <div id={`mauticform_wrapper_${formName}`} className="mauticform_wrapper">
        <form
          autoComplete="true"
          role="form"
          method="post"
          onSubmit={handleSubmit}
          id={`mauticform_${formName}`}
          data-mautic-form={formName}
          encType="multipart/form-data"
        >
          <div className="mauticform-innerform">
            <div
              className="mauticform-page-wrapper mauticform-page-1"
              data-mautic-form-page="1"
            >
              {children}
            </div>
          </div>
          <div
            className="mauticform-error"
            id={`mauticform_${formName}_error`}
          ></div>
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
      {toast.show && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() =>
            setToast({ show: false, message: "", type: "success" })
          }
        />
      )}
    </>
  );
};
