import { useState } from "react";
import type { MauticFormProps } from "../types";

interface UseMauticFormProps
	extends Pick<
		MauticFormProps,
		"formId" | "formName" | "action" | "successCallback" | "errorCallback"
	> {}

export const useMauticForm = ({
	formId,
	formName,
	action,
	successCallback,
	errorCallback,
}: UseMauticFormProps) => {
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [error, setError] = useState<Error | null>(null);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsSubmitting(true);
		setError(null);
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

			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}

			// Mautic might return JSON or HTML depending on config, but X-Requested-With usually hints JSON
			// If the response is not valid JSON, we might want to handle that too, but let's assume valid JSON for now or just check success.

			successCallback?.(formData);
			form.reset();
		} catch (err) {
			const errorObj =
				err instanceof Error ? err : new Error("Unknown error occurred");
			setError(errorObj);
			errorCallback?.(errorObj, formData);
		} finally {
			setIsSubmitting(false);
		}
	};

	return {
		handleSubmit,
		isSubmitting,
		error,
	};
};
