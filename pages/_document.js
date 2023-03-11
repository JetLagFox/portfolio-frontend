import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  seoGoogleTags() {
    return {
      __html: `window.dataLayer = window.dataLayer || [];
			function gtag(){dataLayer.push(arguments);}
			gtag('js', new Date());
		
			gtag('config', '${process.env.GOOGLE_ANALYTICS_ID}');`,
    };
  }

  render() {
    return (
      <Html lang="es">
        <Head>
          <meta charSet="utf-8" />
          <meta name="theme-color" content="#000000" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link
            href="https://fonts.googleapis.com/css2?family=Archivo:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
            rel="stylesheet"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Secular+One&display=swap"
            rel="stylesheet"
          />
          <link href="/styles.css" rel="stylesheet" />
          <link
            rel="icon"
            type="image/vnd.microsoft.icon"
            href="/laxtore_ico.ico"
            sizes="16x16 24x24 36x36 48x48"
          />
          <script
            async
            src={`https://www.googletagmanager.com/gtag/js?id=${process.env.GOOGLE_ANALYTICS_ID}`}
          ></script>
          <script dangerouslySetInnerHTML={this.seoGoogleTags()}></script>
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
