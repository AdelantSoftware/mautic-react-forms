import { useEffect, useState } from "react";
import type { MauticAutoFormProps, MauticFieldDefinition, MauticFormDefinition } from "../types";
import { fetchPublicFormDefinition } from "../utils/parseFormHtml";
import { MauticForm } from "./MauticForm";
import { MauticInput } from "./MauticInput";
import { MauticSubmitButton } from "./MauticSubmitButton";

const mapFieldType = (mauticType: string): string => {
    const t = mauticType.toLowerCase();
    if (t === "email") return "email";
    if (t === "number") return "number";
    if (t === "tel" || t === "phone") return "tel";
    if (t === "date") return "date";
    if (t === "url") return "url";
    if (t === "textarea" || t === "text") return "textarea";
    return "text";
};

const defaultRenderField = (
    field: MauticFieldDefinition,
    formName: string,
    fieldClassName?: string,
) => (
    <MauticInput
        key={field.id}
        formName={formName}
        name={field.alias || `field_${field.id}`}
        label={field.label}
        type={mapFieldType(field.type)}
        required={!!field.isRequired}
        className={fieldClassName}
    />
);

export const MauticAutoForm = ({
    formId,
    mauticBaseUrl,
    definition: definitionProp,
    onFormLoaded,
    renderField,
    successCallback,
    errorCallback,
    className,
    fieldClassName,
    submitClassName,
    submitLabel,
}: MauticAutoFormProps) => {
    const [fetchedDef, setFetchedDef] = useState<MauticFormDefinition | null>(null);
    const [fetchError, setFetchError] = useState<Error | null>(null);
    const [fetching, setFetching] = useState(!definitionProp);

    const definition = definitionProp || fetchedDef;

    useEffect(() => {
        if (definitionProp) {
            onFormLoaded?.(definitionProp);
            return;
        }
        let cancelled = false;
        setFetching(true);
        fetchPublicFormDefinition(mauticBaseUrl, formId)
            .then((def) => {
                if (cancelled) return;
                setFetchedDef(def);
                onFormLoaded?.(def);
            })
            .catch((err) => {
                if (cancelled) return;
                setFetchError(err instanceof Error ? err : new Error("Unknown error"));
            })
            .finally(() => {
                if (!cancelled) setFetching(false);
            });
        return () => {
            cancelled = true;
        };
    }, [formId, mauticBaseUrl, definitionProp, onFormLoaded]);

    if (fetching) return <div className="mauticform-loading">Loading form…</div>;
    if (fetchError)
        return <div className="mauticform-error">{`Failed to load form: ${fetchError.message}`}</div>;
    if (!definition) return null;

    const form = definition;
    const formName = form.alias || `form_${form.id}`;
    const action = `${mauticBaseUrl}/form/submit`;

    const fields = form.fields ?? [];

    return (
        <MauticForm
            formId={`${form.id}`}
            formName={formName}
            action={action}
            successCallback={successCallback}
            errorCallback={errorCallback}
            className={className}
        >
            {fields.map((field) =>
                renderField
                    ? renderField(field, formName)
                    : defaultRenderField(field, formName, fieldClassName),
            )}
            <MauticSubmitButton formName={formName} className={submitClassName}>
                {submitLabel || form.actions?.submit?.label || "Submit"}
            </MauticSubmitButton>
        </MauticForm>
    );
};
