import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

import SearchIcon from "@svg/Search";
import CrossIcon from "@svg/Cross";
import { searchPublished } from "@api/post";
import { smoothScrollTo } from "@utils/smoothScroll";

const TYPE_LABELS = { articulo: "Artículo", tutorial: "Tutorial" };

function formatDate(dateStr) {
  if (!dateStr) return null;
  try {
    return new Date(dateStr).toLocaleDateString("es-ES", { day: "numeric", month: "short", year: "numeric" });
  } catch { return null; }
}

const Header = ({ heroMode = false, heroBorderColor = null, heroLogoColor = null }) => {
  const router = useRouter();
  const isHome = router.pathname === "/";

  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [searching, setSearching] = useState(false);
  const inputRef = useRef(null);
  const debounceRef = useRef(null);

  const openModal = () => { setIsOpen(true); setQuery(""); setResults([]); };
  const closeModal = () => { setIsOpen(false); setQuery(""); setResults([]); };

  useEffect(() => {
    if (!query.trim()) { setResults([]); return; }

    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(async () => {
      setSearching(true);
      try {
        const res = await searchPublished(query);
        setResults((res.posts?.docs || []).slice(0, 6));
      } catch {
        setResults([]);
      } finally {
        setSearching(false);
      }
    }, 350);

    return () => clearTimeout(debounceRef.current);
  }, [query]);

  useEffect(() => {
    if (isOpen && inputRef.current) inputRef.current.focus();
    const onKey = (e) => { if (e.key === "Escape") closeModal(); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [isOpen]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  const heroStyle = heroMode
    ? {
        "--hero-border-color": heroBorderColor || "#d6f31f",
        "--hero-logo-color": heroLogoColor || "#ffffff",
      }
    : undefined;

  return (
    <>
      <header
        className={`header${heroMode ? " header--hero" : ""}`}
        style={heroStyle}
      >
        <div className="wrapper">
          <Link href="/">
            <a className="header__logo">
              <svg
                className="header__logo-mark"
                viewBox="0 0 22 30"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                {/* Top bar */}
                <polygon className="logo-tri" points="0,0 22,0 22,7" fill="#f26177" />
                <polygon className="logo-tri" points="0,0 22,7 0,7" fill="#c73d55" />
                {/* Left bar - upper gap */}
                <polygon className="logo-tri" points="0,7 5,7 5,12" fill="#c73d55" />
                <polygon className="logo-tri" points="0,7 5,12 0,12" fill="#a8293e" />
                {/* Mid bar */}
                <polygon className="logo-tri" points="0,12 17,12 17,18" fill="#e94560" />
                <polygon className="logo-tri" points="0,12 17,18 0,18" fill="#c73d55" />
                {/* Left bar - lower gap */}
                <polygon className="logo-tri" points="0,18 5,18 5,23" fill="#c73d55" />
                <polygon className="logo-tri" points="0,18 5,23 0,23" fill="#a8293e" />
                {/* Bottom bar */}
                <polygon className="logo-tri" points="0,23 22,23 22,30" fill="#e94560" />
                <polygon className="logo-tri" points="0,23 22,30 0,30" fill="#c73d55" />
              </svg>
              <span className="header__logo-sep">|</span>
              <span className="header__logo-name">Egoi Cantero</span>
            </a>
          </Link>

          <div className="header__menu">
            {isHome && (
              <>
                <a href="#experiencia" onClick={(e) => { e.preventDefault(); smoothScrollTo("experiencia"); }}>Experiencia</a>
                <a href="#articulos" onClick={(e) => { e.preventDefault(); smoothScrollTo("articulos"); }}>Artículos</a>
                <a href="#contacto" onClick={(e) => { e.preventDefault(); smoothScrollTo("contacto"); }}>Contacto</a>
              </>
            )}
            <button
              className="header__search-btn"
              onClick={openModal}
              aria-label="Buscar artículos"
            >
              <SearchIcon />
            </button>
          </div>
        </div>
      </header>

      {isOpen && (
        <div className="search-modal" onClick={closeModal}>
          <button className="search-modal__close" onClick={closeModal} aria-label="Cerrar búsqueda">
            <CrossIcon />
          </button>
          <div className="search-modal__content" onClick={(e) => e.stopPropagation()}>
            <div className="search-modal__input-wrap">
              <span className="search-modal__icon"><SearchIcon /></span>
              <input
                ref={inputRef}
                type="text"
                placeholder="Buscar artículos..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="search-modal__input"
              />
            </div>

            {searching && <p className="search-modal__empty">Buscando...</p>}

            {!searching && results.length > 0 && (
              <ul className="search-modal__results">
                {results.map((post) => (
                  <li key={post.id} className="search-result">
                    <a
                      href={`/${post.post_type || "articulo"}/${post.slug}`}
                      onClick={closeModal}
                      className="search-result__link"
                    >
                      {post.img && (
                        <img src={post.img} alt={post.title} className="search-result__thumb" />
                      )}
                      <div className="search-result__info">
                        <span className="search-result__title">{post.title}</span>
                        {post.date_published && (
                          <span className="search-result__meta">{formatDate(post.date_published)}</span>
                        )}
                      </div>
                      <span className="search-result__tag">
                        {TYPE_LABELS[post.post_type] || post.post_type}
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            )}

            {!searching && query.trim() && results.length === 0 && (
              <p className="search-modal__empty">
                No se encontraron artículos para &ldquo;{query}&rdquo;
              </p>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
