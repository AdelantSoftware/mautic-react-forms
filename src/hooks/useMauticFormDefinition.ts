import { useEffect, useState } from "react";
import type { MauticFormDefinition } from "../types";

interface UseMauticFormDefinitionProps {
  formId: number;
  mauticBaseUrl: string;
  mauticUsername?: string;
  mauticPassword?: string;
}

export const useMauticFormDefinition = ({
  formId,
  mauticBaseUrl,
  mauticUsername,
  mauticPassword,
}: UseMauticFormDefinitionProps) => {
  const [definition, setDefinition] = useState<MauticFormDefinition | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);

    const headers: Record<string, string> = {
      Accept: "application/json",
    };

    if (mauticUsername && mauticPassword) {
      const basic = btoa(`${mauticUsername}:${mauticPassword}`);
      headers.Authorization = `Basic ${basic}`;
    }

    fetch(`${mauticBaseUrl}/api/forms/${formId}`, { headers })
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((data) => {
        if (cancelled) return;
        const form = data?.form;
        if (!form) throw new Error("No form definition in Mautic response");
        setDefinition(form);
      })
      .catch((err) => {
        if (cancelled) return;
        setError(err instanceof Error ? err : new Error("Unknown error"));
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [formId, mauticBaseUrl, mauticUsername, mauticPassword]);

  return { definition, loading, error };
};
