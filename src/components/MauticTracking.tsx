let NextScript: any;
try {
  // Dynamically try to import Next.js Script component
  NextScript = require("next/script").default;
} catch (e) {
  // Next.js is not available, will use regular script tag
  NextScript = null;
}

export const MauticTracking = ({
  mauticURL,
  tags,
}: {
  mauticURL: string;
  tags: string;
}) => {
  // Check if we're in development
  const isDev = process.env.NODE_ENV === "development";
  if (isDev) return null;

  const scriptContent = `
    (function(w,d,t,u,n,a,m){w['MauticTrackingObject']=n;
        w[n]=w[n]||function(){(w[n].q=w[n].q||[]).push(arguments)},a=d.createElement(t),
        m=d.getElementsByTagName(t)[0];a.async=1;a.src=u;m.parentNode.insertBefore(a,m)
    })(window,document,'script','${mauticURL}','mt');
    mt('send', 'pageview', { "tags": "${tags}" });
  `;

  // Use Next.js Script if available, otherwise use standard script
  if (NextScript) {
    return (
      <NextScript
        id="mautic-tracking"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: scriptContent }}
      />
    );
  }

  // Standard React approach
  return (
    <script
      id="mautic-tracking"
      dangerouslySetInnerHTML={{ __html: scriptContent }}
    />
  );
};
