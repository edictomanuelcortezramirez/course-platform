import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Google+Sans+Mono&display=swap"
          rel="stylesheet"
        />
        <style>{`
          :root {
            --font-google-sans-code: 'Google Sans Mono', monospace;
          }
        `}</style>
      </Head>
      <body style={{ fontFamily: 'var(--font-google-sans-code)' }}>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
