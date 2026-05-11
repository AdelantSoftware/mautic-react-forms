import type { MauticFieldDefinition, MauticFormDefinition } from "../types";

/**
 * Parses the public Mautic form HTML (from GET /form/{id}) into a MauticFormDefinition.
 */
export const parseFormHtml = (html: string, formId: number): MauticFormDefinition => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, "text/html");
  const formEl = doc.querySelector("form[data-mautic-form]");
  if (!formEl) throw new Error("No Mautic form found in HTML");

  const formName = formEl.getAttribute("data-mautic-form") || `form_${formId}`;
  const submitButton = formEl.querySelector(
    'button[name="mauticform[submit]"], input[type="submit"]',
  );
  const submitLabel = submitButton?.textContent?.trim() || undefined;

  const fieldRows = formEl.querySelectorAll(".mauticform-row");
  const fields: MauticFieldDefinition[] = [];
  let fieldIdx = 0;

  for (const row of Array.from(fieldRows)) {
    const input = row.querySelector("input, textarea, select") as HTMLElement | null;
    if (!input) continue;

    const nameAttr = input.getAttribute("name") || input.getAttribute("id") || "";
    const m = nameAttr.match(/mauticform\[(.+?)\]/);
    const alias = m ? m[1] : nameAttr;

    const labelEl = row.querySelector("label");
    const label = labelEl?.textContent?.trim() || alias;

    const type =
      input instanceof HTMLSelectElement
        ? "select"
        : input instanceof HTMLTextAreaElement
          ? "textarea"
          : (input as HTMLInputElement).type || "text";

    const isRequired =
      input.hasAttribute("required") || row.classList.contains("mauticform-required");

    const validate = row.getAttribute("data-validate") || undefined;
    const validationType = row.getAttribute("data-validation-type") || undefined;

    fields.push({
      id: fieldIdx++,
      label,
      type,
      alias,
      isRequired,
    });
  }

  return {
    id: formId,
    name: formName,
    alias: formName,
    fields,
    actions: submitLabel ? { submit: { label: submitLabel } } : undefined,
  };
};

/**
 * Fetches and parses a form definition from the public Mautic form URL.
 */
export const fetchPublicFormDefinition = async (
  mauticBaseUrl: string,
  formId: number,
): Promise<MauticFormDefinition> => {
  const url = `${mauticBaseUrl}/form/${formId}`;
  const res = await fetch(url, { headers: { Accept: "text/html" } });
  if (!res.ok) throw new Error(`Failed to fetch form: HTTP ${res.status}`);
  const html = await res.text();
  return parseFormHtml(html, formId);
};
