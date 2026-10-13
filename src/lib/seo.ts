import { useEffect } from "react";

/** What a page tells search engines and link previews about itself. */
export interface PageMeta {
  /** Unique to the page: what it is + the brand, about 60 characters. */
  title: string;
  /** One specific sentence about this page, about 155 characters. */
  description?: string;
  /** Social preview image: a root path like "/assets/og.jpg" or a full URL. */
  image?: string;
  /** Keep this page out of search results (thank-you pages, drafts). */
  noIndex?: boolean;
}

function upsertMeta(attr: "name" | "property", key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(
    `meta[${attr}="${key}"]`,
  );
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function upsertCanonical(href: string) {
  let el = document.head.querySelector<HTMLLinkElement>(
    'link[rel="canonical"]',
  );
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", "canonical");
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}

/**
 * Set this page's title, description, social tags and canonical URL.
 *
 * Call it once at the top of every page component in `src/pages/`, with a
 * title and description unique to that page. `index.html` keeps the home
 * page's tags for crawlers that don't run JavaScript; this updates them as
 * the visitor moves between routes.
 */
export function usePageMeta({
  title,
  description,
  image,
  noIndex = false,
}: PageMeta): void {
  useEffect(() => {
    const url = `${window.location.origin}${window.location.pathname}`;
    document.title = title;
    upsertMeta("property", "og:title", title);
    upsertMeta("name", "twitter:title", title);
    upsertMeta("property", "og:url", url);
    upsertCanonical(url);
    if (description) {
      upsertMeta("name", "description", description);
      upsertMeta("property", "og:description", description);
      upsertMeta("name", "twitter:description", description);
    }
    if (image) {
      // Relative to the site's base, so it also works under a sub-path.
      const base = `${window.location.origin}${import.meta.env.BASE_URL}`;
      const absolute = new URL(image.replace(/^\/+/, ""), base).href;
      upsertMeta("property", "og:image", absolute);
      upsertMeta("name", "twitter:image", absolute);
    }
    const robots = document.head.querySelector<HTMLMetaElement>(
      'meta[name="robots"]',
    );
    if (noIndex) {
      upsertMeta("name", "robots", "noindex");
    } else if (robots?.getAttribute("content") === "noindex") {
      // Left behind by a noIndex page the visitor came from.
      robots.remove();
    }
  }, [title, description, image, noIndex]);
}
