const blogEntries = [
  {
    title: "Modeling Attention as a Design Material",
    dateISO: "2024-02-11",
    displayDate: "February 11, 2024",
    cta: "Read Essay",
    asset: "assets/blog/modeling-attention.txt"
  },
  {
    title: "Margins, Annotations, and the Quiet Politics of Notes",
    dateISO: "2023-11-04",
    displayDate: "November 4, 2023",
    cta: "Read Prose",
    asset: "assets/blog/margins-annotations.txt"
  }
];

const truncateExcerpt = (text, limit = 260) => {
  const normalized = text.replace(/\r/g, "").split("\n\n").find((block) => block.trim().length) || text;
  const clean = normalized.replace(/\s+/g, " ").trim();
  if (clean.length <= limit) {
    return clean;
  }
  const truncated = clean.slice(0, limit);
  return `${truncated.replace(/[\s,;.:!-]*$/, "")}…`;
};

const loadBlogEntries = () => {
  const list = document.getElementById("blog-list");
  if (!list) {
    return;
  }

  blogEntries.forEach((entry) => {
    const article = document.createElement("article");
    article.className = "blog-card";

    article.innerHTML = `
      <header>
        <time datetime="${entry.dateISO}">${entry.displayDate}</time>
        <h3>${entry.title}</h3>
      </header>
      <p class="blog-excerpt">Loading preview…</p>
      <a class="card-link" href="${entry.asset}" target="_blank" rel="noopener">${entry.cta} →</a>
    `;

    list.appendChild(article);

    const excerptEl = article.querySelector(".blog-excerpt");

    fetch(entry.asset)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Failed to load ${entry.asset}`);
        }
        return response.text();
      })
      .then((text) => {
        excerptEl.textContent = truncateExcerpt(text);
      })
      .catch(() => {
        excerptEl.textContent = "Preview unavailable. Open the full text to read the post.";
      });
  });
};

document.addEventListener("DOMContentLoaded", () => {
  const yearElement = document.getElementById("current-year");
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear().toString();
  }

  loadBlogEntries();
});
