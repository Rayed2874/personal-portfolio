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
        <div class="article-not-found">

            <span class="article-error-code">
                404
            </span>

            <h1>
                Article Not Found
            </h1>

            <p>
                The article you're looking for doesn't exist
                or may have been moved.
            </p>

            <a
                href="index.html#blog"
                class="btn btn-primary"
            >
                Back to Blog
            </a>

        </div>
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
