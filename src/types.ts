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

export interface MauticSubmitButtonProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement> {
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
