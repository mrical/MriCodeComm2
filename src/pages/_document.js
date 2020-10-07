import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html>
        <Head>
          <meta charSet="utf-8" />
          <meta content="IE=edge" httpEquiv="X-UA-Compatible" />
          <meta
            content="Hey, lets have a look at ecomm web app build by MriCode"
            name="description"
          />
          <meta content="follow, index" name="robots" />
          <meta content="#FFD22E" name="theme-color" />
          <meta content="#ffffff" name="msapplication-TileColor" />
          <meta
            content="/favicons/browserconfig.xml"
            name="msapplication-config"
          />
          <link
            href="/favicons/apple-touch-icon.png"
            rel="apple-touch-icon"
            sizes="180x180"
          />
          <link
            href="/favicons/favicon-32x32.png"
            rel="icon"
            sizes="32x32"
            type="image/png"
          />
          <link
            href="/favicons/favicon-16x16.png"
            rel="icon"
            sizes="16x16"
            type="image/png"
          />
          <link href="/manifest.json" rel="manifest" />
          <link
            color="#5bbad5"
            href="/favicons/safari-pinned-tab.svg"
            rel="mask-icon"
          />
          <link href="/favicons/favicon.ico" rel="shortcut icon" />
          <link
            crossOrigin=""
            href="https://fonts.gstatic.com/"
            rel="preconnect"
          />
          <link
            crossOrigin=""
            href="https://cdn.usefathom.com"
            rel="preconnect"
          />
          <link
            as="style"
            href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;700;800&display=swap"
            rel="preload"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;700;800&display=swap"
            media="print"
            onLoad="this.media='all'"
            rel="stylesheet"
          />
          <meta content="en_US" property="og:locale" />
          <meta content="MriCodecomm" property="og:title" />
          <meta
            content="Hey, lets have a look at ecomm web app build by MriCode"
            property="og:description"
          />
          <meta content="5e41b2275db646a5" name="yandex-verification" />
          <meta
            content="t28Kl2fGmZjIEgh6q3mGsf-7gGb8115VMQm1qbMMIKc"
            name="google-site-verification"
          />

          <meta content="summary_large_image" name="twitter:card" />
          <meta content="@MricalSinghal" name="twitter:site" />
          <meta content="@MricalSinghal" name="twitter:creator" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
