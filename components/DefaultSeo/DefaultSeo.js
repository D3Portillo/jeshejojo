import { NextSeo } from "next-seo"

export const SEO = {
  title: "Jeshejojo",
  url: "https://jeshejojo.vercel.app",
  description: "Instagram-ish DApp to share your top level dad jokes 🦔",
}

function DefaultSeo() {
  return (
    <NextSeo
      title={SEO.title}
      additionalLinkTags={[
        {
          rel: "icon",
          type: "image/png",
          href: "/favicon.png",
        },
      ]}
      twitter={{
        cardType: "summary_large_image",
        handle: "jeshejojo_app",
        site: SEO.url,
      }}
      openGraph={{
        type: "website",
        url: SEO.url,
        title: SEO.title,
        description: SEO.description,
        images: [
          {
            url: `${SEO.url}/seo.png`,
            width: 1200,
            height: 630,
            alt: SEO.url,
          },
        ],
      }}
      description={SEO.description}
    />
  )
}

export default DefaultSeo
