import type React from "react";
import { useEffect, useState } from "react";

export const MauticTracking = ({
  mauticURL,
  tags,
  enabled,
}: {
  mauticURL: string;
  tags: string;
  enabled?: boolean;
}) => {
  const [NextScript, setNextScript] = useState<React.ComponentType<any> | null>(
    null,
  );

  useEffect(() => {
    import("next/script")
      .then((mod) => setNextScript(() => mod.default || mod))
      .catch(() => setNextScript(null));
  }, []);

  const shouldTrack = enabled !== undefined ? enabled : process.env.NODE_ENV !== "development";

  if (!shouldTrack) return null;

  const scriptContent = `
    (function(w,d,t,u,n,a,m){w['MauticTrackingObject']=n;
        w[n]=w[n]||function(){(w[n].q=w[n].q||[]).push(arguments)},a=d.createElement(t),
        m=d.getElementsByTagName(t)[0];a.async=1;a.src=u;m.parentNode.insertBefore(a,m)
    })(window,document,'script','${mauticURL}','mt');
    mt('send', 'pageview', { "tags": "${tags}" });
  `;

  if (NextScript) {
    return (
      <NextScript
        id={"mautic-tracking"}
        strategy="afterInteractive"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: This is necessary to inject the Mautic tracking script with dynamic content.
        dangerouslySetInnerHTML={{ __html: scriptContent }}
      />
    );
  }

  return (
    <script
      id={"mautic-tracking"}
      // biome-ignore lint/security/noDangerouslySetInnerHtml: This is necessary to inject the Mautic tracking script with dynamic content.
      dangerouslySetInnerHTML={{ __html: scriptContent }}
    />
  );
};
