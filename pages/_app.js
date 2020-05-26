import '~/public/css/bootstrap.min.css'
import '@fortawesome/fontawesome-free/css/all.css'

export default function Blog({ Component, pageProps }) {
  return (
      <>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Roboto&display=swap" as="style" />
        <Component {...pageProps} />
        <style jsx global>{`
          body {
            color: #214a70;
            padding: 5%;
          }

          h1, h2, h3 {
            font-family: 'Roboto', sans-serif;
            font-weight: 600;
            color: #214a70;
          }
        `}</style>
      </>
  )
}
