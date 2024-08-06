const fs = require('fs');
const path = require('path');
const settings = require('../settings.json');
const { fetchExport } = require('./fetch');

async function fetchSave() {
  try {
    const allDataPromises = settings.map(config => fetchExport(config));
    const allDataArray = await Promise.all(allDataPromises);
    const combinedData = allDataArray.flat().filter(data => data !== null);
    fs.writeFileSync('data/all.json', JSON.stringify(combinedData, null, 2));
    console.log('Data saved to data/all.json');
  } catch (error) {
    console.error('Error during fetch and save:', error);
  }
}

fetchSave();
