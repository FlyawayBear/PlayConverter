const express = require('express');
const fs = require('fs');
const path = require('path');
const settings = require('./settings.json');
const { fetchExport } = require('./utils/fetch');

const app = express();
const port = 3000;

async function fetchData() {
  await Promise.all(settings.map(async (config) => {
    await fetchExport(config);

    if (config.updateInterval) {
      setInterval(() => fetchExport(config), config.updateInterval);
    }
  }));

  const allData = settings.map(config => {
    const filePath = path.resolve(__dirname, config.file);
    if (fs.existsSync(filePath)) {
      return JSON.parse(fs.readFileSync(filePath, 'utf8'));
    } else {
      return [];
    }
  }).flat();

  fs.writeFileSync('data/all.json', JSON.stringify(allData, null, 2));
  console.log(`Data saved to data/all.json`);
}

fetchData().then(() => {

  app.get('/', (req, res) => {
    const routes = settings.map(config => `<li><a href="${config.endpoint}">${config.endpoint}</a></li>`).join('');
    res.send(`
      <h1>Available Repos</h1>
      <ul>
        <li><a href="/all">/all (all in one)</a></li>
        ${routes}
      </ul>
    `);
  });

  app.get('/all', (req, res) => {
    const allData = settings.map(config => {
      const filePath = path.resolve(__dirname, config.file);
      if (fs.existsSync(filePath)) {
        return JSON.parse(fs.readFileSync(filePath, 'utf8'));
      } else {
        return [];
      }
    }).flat();

    res.json(allData);
  });

  settings.forEach(config => {
    app.get(config.endpoint, (req, res) => {
      const filePath = path.resolve(__dirname, config.file);
      if (fs.existsSync(filePath)) {
        res.sendFile(filePath);
      } else {
        res.status(404).send('File not found');
      }
    });
  });

  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
}).catch(err => {
  console.error('Error during initial data fetch:', err);
});
