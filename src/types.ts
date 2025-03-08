import React from "react";

export interface ToastState {
  show: boolean;
  message: string;
  type: "success" | "error";
}

export interface ToastProps {
  message: string;
  type: "success" | "error";
  onClose: () => void;
}

export interface MauticFormProps {
  formId: string;
  formName: string;
  action?: string;
  children: React.ReactNode;
  successCallback?: (formData: any) => void;
}

export interface MauticInputProps {
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
}

export interface MauticSubmitButtonProps {
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

export interface ToastState {
  show: boolean;
  message: string;
  type: "success" | "error";
}

export interface ToastProps {
  message: string;
  type: "success" | "error";
  onClose: () => void;
}

export interface MauticFormProps {
  formId: string;
  formName: string;
  action?: string;
  children: React.ReactNode;
  successCallback?: (formData: any) => void;
}

export interface MauticInputProps {
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
}

export interface MauticSubmitButtonProps {
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
