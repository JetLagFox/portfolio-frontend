import ArticleCard from "@atoms/ArticleCard";

const Articles = ({ posts = [] }) => {
  return (
    <section className="articles-section" id="articulos">
      <div className="wrapper">
        <h2>Últimos artículos</h2>
        {posts.length > 0 ? (
          <div className="articles__grid">
            {posts.map((post) => (
              <ArticleCard key={post.id} {...post} />
            ))}
          </div>
        ) : (
          <p className="articles__empty">Próximamente...</p>
        )}
      </div>
    </section>
  );
};

export default Articles;
