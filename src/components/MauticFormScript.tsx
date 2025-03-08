import React, { useEffect } from "react";

let NextScript;
try {
  // Dynamically try to import Next.js Script component
  NextScript = require("next/script").default;
} catch (e) {
  // Next.js is not available, will use regular script tag
  NextScript = null;
}

export const MauticFormScript = ({
  mauticDomain,
  mauticFormURL,
}: {
  mauticDomain: string;
  mauticFormURL: string;
}) => {
  useEffect(() => {
    // Function to initialize Mautic SDK after script loads
    const initMautic = () => {
      if (typeof window.MauticSDK !== "undefined") {
        window.MauticSDK.onLoad();
      }
    };

    initMautic();

    // Add event listener for script load
    if (typeof window !== "undefined") {
      window.MauticSDKLoaded = false;
      window.MauticLang = {
        submittingMessage: "Si prega di attendere...",
      };
    }

    return () => {
      // Cleanup if needed
      if (typeof window !== "undefined") {
        delete window.MauticSDKLoaded;
        delete window.MauticLang;
      }
    };
  }, []);

  const fullMauticFormURL = mauticFormURL
    ? mauticFormURL
    : `${mauticDomain}/media/js/mautic-form.js`;

  if (NextScript) {
    return (
      <NextScript
        src={fullMauticFormURL}
        strategy="lazyOnload"
        onLoad={() => {
          if (typeof window !== "undefined" && !window.MauticSDKLoaded) {
            window.MauticSDKLoaded = true;
            window.MauticDomain = `${mauticDomain}`;
            if (typeof window.MauticSDK !== "undefined") {
              window.MauticSDK.onLoad();
            }
          }
        }}
      />
    );
  }
  return <script id="mautic-tracking" src={fullMauticFormURL} />;
};
