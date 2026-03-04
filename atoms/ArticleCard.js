const TYPE_LABELS = {
  articulo: "Artículo",
  tutorial: "Tutorial",
};

function formatDate(dateStr) {
  if (!dateStr) return null;
  try {
    return new Date(dateStr).toLocaleDateString("es-ES", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  } catch {
    return null;
  }
}

const ArticleCard = ({ title, excerpt, img, date_published, post_type, slug }) => {
  const href = `/${post_type || "articulo"}/${slug}`;
  const date = formatDate(date_published);
  const typeLabel = TYPE_LABELS[post_type] || post_type || "Artículo";

  return (
    <article className="article-card">
      <a href={href} className="article-card__link" aria-label={title} />
      {img && (
        <div className="article-card__image-wrap">
          <img src={img} alt={title} className="article-card__image" />
        </div>
      )}
      <div className="article-card__body">
        <div className="article-card__meta">
          <span className="article-card__type">{typeLabel}</span>
          {date && <span className="article-card__date">{date}</span>}
        </div>
        <h3 className="article-card__title">{title}</h3>
        <p className="article-card__excerpt">{excerpt}</p>
      </div>
    </article>
  );
};

export default ArticleCard;
