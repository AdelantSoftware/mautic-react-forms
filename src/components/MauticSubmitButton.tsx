import type { MauticSubmitButtonProps } from "../types";

export const MauticSubmitButton = ({
  className = "",
  children = "Submit",
  formName,
  ...props
}: MauticSubmitButtonProps) => (
  <button
    id={`mauticform_${formName}_submit`}
    className={`${className}`}
    name="mauticform[submit]"
    type="submit"
    value="1"
    {...props}
  >
    {children}
  </button>
);
