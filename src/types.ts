import type React from "react";

export interface MauticFormProps {
  formId: string;
  formName: string;
  action: string;
  children: React.ReactNode;
  successCallback?: (formData: FormData) => void;
  errorCallback?: (error: Error | unknown, formData: FormData) => void;
  className?: string;
}

// --- Auto-form types ---

export interface MauticFieldDefinition {
  id: number;
  label: string;
  type: string;
  alias?: string;
  isRequired?: boolean;
  properties?: Record<string, unknown>;
  showWhen?: unknown[];
  showWhenValueExists?: boolean;
  leadField?: string;
  saveResult?: boolean;
  defaultValue?: string | null;
}

export interface MauticFormDefinition {
  id: number;
  name: string;
  alias?: string;
  description?: string;
  fields: MauticFieldDefinition[];
  actions?: {
    submit?: { label?: string };
  };
}

export interface MauticAutoFormProps {
  formId: number;
  /** Mautic instance base URL */
  mauticBaseUrl: string;
  /**
   * Pre-fetched form definition (from GET /api/forms/{formId}), or omit to
   * auto-fetch from the public GET /form/{formId} endpoint (no auth needed).
   */
  definition?: MauticFormDefinition;
  /** Optional: called when the definition is resolved */
  onFormLoaded?: (def: MauticFormDefinition) => void;
  /** Optional: custom renderer for individual fields. Return null to use default. */
  renderField?: (field: MauticFieldDefinition, formName: string) => React.ReactNode;
  successCallback?: (formData: FormData) => void;
  errorCallback?: (error: Error | unknown, formData: FormData) => void;
  className?: string;
  fieldClassName?: string;
  submitClassName?: string;
  submitLabel?: string;
}

export interface MauticInputProps
  extends React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
  formName: string;
  name: string;
  label?: string;
  type?: string;
  required?: boolean;
  validate?: string;
  validationType?: string;
  className?: string;
  errorMessage?: string;
  placeholder?: string;
  autocomplete?: string;
  component?: "input" | "textarea";
}

export interface MauticSubmitButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  children?: React.ReactNode;
  formName: string;
}

// Add window augmentation for Mautic
declare global {
  interface Window {
    MauticSDKLoaded?: boolean;
    MauticLang?: {
      submittingMessage: string;
    };
    MauticSDK?: {
      onLoad: () => void;
    };
    MauticDomain?: string;
    mt?: (action: string, eventName: string, config?: any) => void;
  }
}
