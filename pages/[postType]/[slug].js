import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";

import { getPostBySlug } from "@api/post";
import { smoothScrollTo } from "@utils/smoothScroll";

import Header from "@compositions/Header";
import NeuralBackground from "@compositions/NeuralBackground";

const TYPE_LABELS = { articulo: "Artículo", tutorial: "Tutorial" };

const DEFAULT_HERO_CONFIG = { logo: "#d6f31f", title: "#ffffff", meta: "#ffffff", anchor: "#d6f31f" };

function parseHeroConfig(raw) {
  try { return { ...DEFAULT_HERO_CONFIG, ...JSON.parse(raw) }; } catch { return DEFAULT_HERO_CONFIG; }
}

function formatDate(dateStr) {
  if (!dateStr) return null;
  try {
    return new Date(dateStr).toLocaleDateString("es-ES", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  } catch {
    return dateStr;
  }
}

const Post = () => {
  const router = useRouter();
  const { slug } = router.query;

  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;

    async function fetchPost() {
      try {
        const response = await getPostBySlug(slug);
        if (response.post && response.post.length > 0) {
          setPost(response.post[0]);
        }
      } catch {
        // silent fail, post remains null
      } finally {
        setLoading(false);
      }
    }

    fetchPost();
  }, [slug]);

  if (loading) {
    return (
      <>
        <NeuralBackground />
        <Header />
        <section className="article-page article-page--loading">
          <div className="wrapper">
            <p className="article-page__loading">Cargando artículo...</p>
          </div>
        </section>
      </>
    );
  }

  if (!post) {
    return (
      <>
        <NeuralBackground />
        <Header />
        <section className="article-page article-page--loading">
          <div className="wrapper">
            <p className="article-page__loading">Artículo no encontrado.</p>
          </div>
        </section>
      </>
    );
  }

  const typeLabel = TYPE_LABELS[post.post_type] || post.post_type || "Artículo";
  const date = formatDate(post.date_published);
  const isExtended = post.hero_style === "extended";
  const heroConfig = parseHeroConfig(post.hero_config);

  if (isExtended) {
    return (
      <>
        <NeuralBackground />
        <div className="article-extended">
          {post.img && (
            <img className="article-extended__bg" src={post.img} alt={post.title} />
          )}
          <div className="article-extended__overlay" />
          <Header
            heroMode={true}
            heroBorderColor={heroConfig.logo}
            heroLogoColor={heroConfig.logo}
          />
          <div className="article-extended__content">
            <div className="wrapper">
              <div className="article-extended__meta" style={{ color: heroConfig.meta }}>
                <span className="article-extended__tag">{typeLabel}</span>
                {date && <span className="article-extended__date">{date}</span>}
              </div>
              <h1 className="article-extended__title" style={{ color: heroConfig.title }}>
                {post.title}
              </h1>
              {post.excerpt && (
                <p className="article-extended__excerpt" style={{ color: heroConfig.meta }}>
                  {post.excerpt}
                </p>
              )}
              <a
                href="#article-body"
                className="article-extended__anchor"
                aria-label="Ir al artículo"
                style={{ color: heroConfig.anchor }}
                onClick={(e) => { e.preventDefault(); smoothScrollTo("article-body"); }}
              >
                <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <line x1="12" y1="5" x2="12" y2="19" />
                  <polyline points="19 12 12 19 5 12" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        <section className="article-page" id="article-body">
          <div className="wrapper">
            <div className="article-page__body article-page__body--md">
              {post.content ? (
                <ReactMarkdown rehypePlugins={[rehypeRaw]} remarkPlugins={[remarkGfm]}>
                  {post.content}
                </ReactMarkdown>
              ) : (
                <p>{post.excerpt}</p>
              )}
            </div>
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      <NeuralBackground />
      <Header />
      <section className="article-page">
        {post.img && (
          <img className="article-page__hero" src={post.img} alt={post.title} />
        )}
        <div className="wrapper">
          <div className="article-page__header">
            <div className="article-page__meta">
              <span className="article-page__tag">{typeLabel}</span>
              {date && <span className="article-page__date">{date}</span>}
            </div>
            <h1 className="article-page__title">{post.title}</h1>
            {post.excerpt && <p className="article-page__excerpt">{post.excerpt}</p>}
          </div>
          <div className="article-page__body article-page__body--md">
            {post.content ? (
              <ReactMarkdown rehypePlugins={[rehypeRaw]} remarkPlugins={[remarkGfm]}>
                {post.content}
              </ReactMarkdown>
            ) : (
              <p>{post.excerpt}</p>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default Post;
