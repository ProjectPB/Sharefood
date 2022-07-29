const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();

exports.buildSitemap = functions.https.onRequest(async (request, response) => {
  const sitemapHeader = "<?xml version=\"1.0\" encoding=\"UTF-8\"?><urlset xmlns=\"http://www.sitemaps.org/schemas/sitemap/0.9\">";

  const allURL = `<url><loc>https://pb-sharefood.web.app/all</loc><lastmod>${new Date().toISOString()}</lastmod></url>`;
  const favoriteURL = `<url><loc>https://pb-sharefood.web.app/favorite</loc><lastmod>${new Date().toISOString()}</lastmod></url>`;
  const myURL = `<url><loc>https://pb-sharefood.web.app/my</loc><lastmod>${new Date().toISOString()}</lastmod></url>`;
  const authURL = `<url><loc>https://pb-sharefood.web.app/auth</loc><lastmod>${new Date().toISOString()}</lastmod></url>`;
  const resetURL = `<url><loc>https://pb-sharefood.web.app/reset</loc><lastmod>${new Date().toISOString()}</lastmod></url>`;

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
        `<url><loc>https://pb-sharefood.web.app/recipe/${
          docSnapshot.id
        }</loc><lastmod>${new Date().toISOString()}</lastmod></url>`,
    );
  }

  const usersSnapshot = await admin
      .firestore()
      .collection("users")
      .select()
      .get();
  for (const docSnapshot of usersSnapshot.docs) {
    recipesURLs.push(
        `<url><loc>https://pb-sharefood.web.app/user/${
          docSnapshot.id
        }</loc><lastmod>${new Date().toISOString()}</lastmod></url>`,
    );
  }

  const collectionsSnapshot = await admin
      .firestore()
      .collection("collections")
      .select()
      .get();
  for (const docSnapshot of collectionsSnapshot.docs) {
    collectionsURLs.push(
        `<url><loc>https://pb-sharefood.web.app/collection/${
          docSnapshot.id
        }</loc><lastmod>${new Date().toISOString()}</lastmod></url>`,
    );
  }

  const sitemapFooter = "</urlset>";

  const sitemapString =
    sitemapHeader +
    allURL +
    favoriteURL +
    myURL +
    authURL +
    resetURL +
    recipesURLs +
    usersURLs +
    collectionsURLs +
    sitemapFooter;

  response.set("Content-Type", "text/xml");
  response.status(200).send(sitemapString);
});
