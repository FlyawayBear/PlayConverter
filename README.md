# PlayConverter

This is a tool to convert Esign / Scarlet / Other IPA repos to be compatible with PlayCover

## Installation

You can either try our demo [here](https://repo.cutie.host/) or set up PlayConverter locally by following these steps

```bash
git clone https://github.com/FlyawayBear/PlayConverter
cd PlayConverter
npm install
```

## Usage

PlayConverter can either run as a webserver to serve the repos or as a simple script to scrape and export the repo links in ``settings.json``

#### Start the webserver locally on port 3000
```bash
npm start
```

#### Fetch and convert all the sources in ``settings.json``
```bash
npm run fetch
```

## Configuration

PlayConverter is configured using the `settings.json` file. Below is an example configuration:

#### Example Configuration:
```json
[
    {
        "url": "https://example.com/repo.json",   // URL of the IPA Library
        "file": "data/example.json",               // Path where the converted data will be exported
        "endpoint": "/example",                    // Endpoint when running as a web server
        "updateInterval": 3600000                  // Time in milliseconds for how often the source should update
    }
]
```

### Configuration Fields:

- **`url`**: The URL of the IPA library repository you want to convert.
- **`file`**: The file path where the converted data will be saved.
- **`endpoint`**: The endpoint path to access the data when running PlayConverter as a web server.
- **`updateInterval`**: The interval (in milliseconds) at which the source data should be updated. For example, `3600000` ms equals 1 hour.

## Contributing

Any contributions are welcome!

## License

[MIT](https://choosealicense.com/licenses/mit/)