import React, { useEffect, useState } from "react";

export const MauticTracking = ({
  mauticURL,
  tags,
}: {
  mauticURL: string;
  tags: string;
}) => {
  const [NextScript, setNextScript] = useState<React.ComponentType<any> | null>(
    null
  );

  useEffect(() => {
    import("next/script")
      .then((mod) => setNextScript(() => mod.default || mod))
      .catch(() => setNextScript(null));
  }, []);

  if (process.env.NODE_ENV === "development") return null;

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
        id="mautic-tracking"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: scriptContent }}
        async
      />
    );
  }

  return (
    <script
      id="mautic-tracking"
      dangerouslySetInnerHTML={{ __html: scriptContent }}
      async
    />
  );
};
