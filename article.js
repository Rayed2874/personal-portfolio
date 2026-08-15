// =========================
// Get Article ID
// =========================

function getArticleId() {
  const urlParams = new URLSearchParams(window.location.search);

  return urlParams.get("id");
}

// =========================
// Display Article
// =========================

function displayArticle() {
  const articleId = getArticleId();

  const articleContainer = document.querySelector("#blog-article");

  const article = blogPosts.find(findArticle);

  function findArticle(post) {
    return post.id === articleId;
  }

  if (article === undefined) {
    articleContainer.innerHTML = `
            <h1>Article not found</h1>

            <p>
                The article you're looking for doesn't exist.
            </p>
        `;

    return;
  }

  articleContainer.innerHTML = `
        <div class="article-header">

            <span class="blog-date">
                ${article.date}
            </span>

            <h1>
                ${article.title}
            </h1>

        </div>


        <div class="article-content">

            ${article.content}

        </div>
    `;
}

displayArticle();
