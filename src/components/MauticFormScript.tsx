import React, { useEffect, useState } from "react";

export const MauticFormScript = ({
  mauticDomain,
  mauticFormURL,
}: {
  mauticDomain: string;
  mauticFormURL: string;
}) => {
  const [NextScript, setNextScript] = useState<React.ComponentType<any> | null>(
    null
  );

  useEffect(() => {
    // Try to load Next.js Script component dynamically
    import("next/script")
      .then((mod) => {
        setNextScript(() => mod.default || mod);
      })
      .catch(() => {
        setNextScript(null);
      });

    if (typeof window !== "undefined") {
      window.MauticSDKLoaded = false;
      window.MauticLang = {
        submittingMessage: "Loading...",
      };

      const initMautic = () => {
        if (window.MauticSDK !== undefined) {
          window.MauticSDK.onLoad();
        }
      };

      initMautic();
    }

    return () => {
      if (typeof window !== "undefined") {
        delete window.MauticSDKLoaded;
        delete window.MauticLang;
      }
    };
  }, []);

  const fullMauticFormURL =
    mauticFormURL || `${mauticDomain}/media/js/mautic-form.js`;

  const handleScriptLoad = () => {
    if (typeof window !== "undefined" && !window.MauticSDKLoaded) {
      window.MauticSDKLoaded = true;
      window.MauticDomain = mauticDomain;
      if (window.MauticSDK !== undefined) {
        window.MauticSDK.onLoad();
      }
    }
  };

  if (NextScript) {
    return (
      <NextScript
        id="mautic-form-script"
        src={fullMauticFormURL}
        strategy="afterInteractive"
        onLoad={handleScriptLoad}
        async
      />
    );
  }

  return (
    <script
      id="mautic-form-script"
      src={fullMauticFormURL}
      async
      onLoad={handleScriptLoad}
    />
  );
};
