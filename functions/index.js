const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();

exports.buildSitemap = functions.https.onRequest(async (request, response) => {
  const sitemapHeader = "<?xml version=\"1.0\" encoding=\"UTF-8\"?><urlset xmlns=\"http://www.sitemaps.org/schemas/sitemap/0.9\">";

  const baseURL = `<url><loc>https://sharefood.pl</loc><lastmod>${new Date().toISOString()}</lastmod><changefreq>weekly</changefreq><priority>1</priority></url>`;
  const allURL = `<url><loc>https://sharefood.pl/all</loc><lastmod>${new Date().toISOString()}</lastmod><changefreq>daily</changefreq><priority>0.9</priority></url>`;
  const authURL = `<url><loc>https://sharefood.pl/auth</loc><lastmod>${new Date().toISOString()}</lastmod><changefreq>yearly</changefreq><priority>0.8</priority></url>`;
  const resetURL = `<url><loc>https://sharefood.pl/reset</loc><lastmod>${new Date().toISOString()}</lastmod><changefreq>yearly</changefreq><priority>0.6</priority></url>`;

  const recipesURLs = [];
  const usersURLs = [];
  const collectionsURLs = [];

  const recipeSnapshot = await admin
      .firestore()
      .collection("recipes")
      .select()
      .get();
  for (const docSnapshot of recipeSnapshot.docs) {
    recipesURLs.push(
        `<url><loc>https://sharefood.pl/recipe/${
          docSnapshot.id
        }</loc><lastmod>${new Date().toISOString()}</lastmod>
        <changefreq>daily</changefreq><priority>0.7</priority></url>`,
    );
  }

  const usersSnapshot = await admin
      .firestore()
      .collection("users")
      .select()
      .get();
  for (const docSnapshot of usersSnapshot.docs) {
    recipesURLs.push(
        `<url><loc>https://sharefood.pl/user/${
          docSnapshot.id
        }</loc><lastmod>${new Date().toISOString()}</lastmod>
        <changefreq>weekly</changefreq><priority>0.5</priority></url>`,
    );
  }

  const collectionsSnapshot = await admin
      .firestore()
      .collection("collections")
      .select()
      .get();
  for (const docSnapshot of collectionsSnapshot.docs) {
    collectionsURLs.push(
        `<url><loc>https://sharefood.pl/collection/${
          docSnapshot.id
        }</loc><lastmod>${new Date().toISOString()}</lastmod>
        <changefreq>monthly</changefreq><priority>0.5</priority></url>`,
    );
  }

  const sitemapFooter = "</urlset>";

  const sitemapString =
    sitemapHeader +
    baseURL +
    allURL +
    authURL +
    resetURL +
    recipesURLs +
    usersURLs +
    collectionsURLs +
    sitemapFooter;

  response.set("Content-Type", "text/xml");
  response.status(200).send(sitemapString);
});
