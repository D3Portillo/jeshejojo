import { NextSeo } from "next-seo"

const URL = "https://jeshejojo.vercel.app"
export const DEFAULT_CONFIG = {
  title: "Jeshejojo",
  url: URL,
  seoURL: `${URL}/seo.png`,
  description: "Instagram-ish DApp to share your top level dad jokes 🦔",
}

function DefaultSeo(config: typeof DEFAULT_CONFIG) {
  const SEO = config || DEFAULT_CONFIG
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
            url: SEO.seoURL,
            alt: SEO.seoURL,
            width: 1200,
            height: 630,
          },
        ],
      }}
      description={SEO.description}
    />
  )
}

export default DefaultSeo
