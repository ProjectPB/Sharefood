/* eslint-disable max-len */
const functions = require("firebase-functions");
const admin = require("firebase-admin");
const fs = require("fs");
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


exports.preRender = functions.https.onRequest(async (request, response) => {
  const error404 = false;
  const path = request.path ? request.path.split("/") : request.path;
  let index = fs.readFileSync("./web/index.html").toString();

  const setMetas = (title, description, thumbnail) => {
    index = index.replace(/__TITLE__/g, title);
    index = index.replace(/__DESCRIPTION__/g, description);
    index = index.replace(/__THUMB__/g, thumbnail);
  };

  if (path[1] === "all") setMetas("All recipes | Sharefood", "All recipes");
  else if (path[1] === "auth") setMetas("Authentication | Sharefood", "Create a new account or sign in");
  else if (path[1] === "reset") setMetas("Reset password | Sharefood", "Reset passwords");
  else if (path[1] === "recipe" && path[2]) {
    await admin.firestore().collection("recipes").doc(path[2]).get().then((queryResult) => {
      if (queryResult.data()) {
        setMetas(queryResult.data().title, "", queryResult.data().imageLow);
      } else {
        setMetas("Sharefood", "Sharefood");
      }
    });
  } else if (path[1] === "collection" && path[2]) {
    await admin.firestore().collection("collections").doc(path[2]).get().then((queryResult) => {
      if (queryResult.data()) {
        setMetas(queryResult.data().eng_title, "", queryResult.data().img);
      } else {
        setMetas("Sharefood", "Sharefood");
      }
    });
  } else setMetas("Sharefood", "Sharefood");

  error404 ?
  response.status(400).send(index) :
  response.status(200).send(index);
});
