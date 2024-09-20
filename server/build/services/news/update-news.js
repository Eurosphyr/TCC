"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/services/news/update-news.ts
var update_news_exports = {};
__export(update_news_exports, {
  updateAllUniversities: () => updateAllUniversities
});
module.exports = __toCommonJS(update_news_exports);
var import_client = require("@prisma/client");
var import_rss_parser = __toESM(require("rss-parser"));
var prisma = new import_client.PrismaClient();
var parser = new import_rss_parser.default();
async function updateNewsForUniversity(universityId, rssUrl) {
  try {
    const feed = await parser.parseURL(rssUrl);
    const newsItems = feed.items.map((item) => ({
      title: item.title || "",
      description: item.contentSnippet || "",
      url: item.link || "",
      image: item.enclosure?.url || "",
      content: item.content || "",
      author: item.creator || "",
      universityId
    }));
    await Promise.all(
      newsItems.map(async (newsItem) => {
        await prisma.news.upsert({
          where: { url: newsItem.url },
          update: newsItem,
          create: newsItem
        });
      })
    );
    console.log(`Updated news for university ${universityId}`);
  } catch (error) {
    console.error(`Failed to update news for university ${universityId}:`, error);
  }
}
async function updateAllUniversities() {
  const universities = await prisma.university.findMany();
  await Promise.all(
    universities.map(async (university) => {
      await updateNewsForUniversity(university.id, university.url);
    })
  );
  console.log("News update completed for all universities.");
}
updateAllUniversities().catch((e) => console.error(e)).finally(async () => {
  await prisma.$disconnect();
});
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  updateAllUniversities
});
