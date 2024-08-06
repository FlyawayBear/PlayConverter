const fetch = require('node-fetch');
const fs = require('fs');

async function fetchConvert(url) {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data.apps.map(app => ({
      bundleID: app.bundleIdentifier,
      name: app.name,
      version: app.version,
      itunesLookup: "",
      link: app.downloadURL
    }));
  } catch (error) {
    console.error(`Error fetching and transforming data from ${url}:`, error);
    return [];
  }
}

async function fetchExport(config) {
  try {
    const transformedData = await fetchConvert(config.url);
    fs.writeFileSync(config.file, JSON.stringify(transformedData, null, 2));
    console.log(`Data saved to ${config.file}`);
    return transformedData;
  } catch (error) {
    console.error(`Failed to fetch and transform data from ${config.url}:`, error);
    return [];
  }
}

module.exports = { fetchExport };
