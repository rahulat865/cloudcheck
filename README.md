# Weather App

A lightweight weather lookup website built with HTML, CSS, and JavaScript. Users can search for a city and view its current temperature, conditions, humidity, and wind speed.

## Features

- Landing page with navigation to the forecast screen
- City search using the Open-Meteo geocoding API
- Current weather lookup using the Open-Meteo forecast API
- Displays:
  - Temperature
  - Weather conditions
  - Relative humidity
  - Wind speed
- User-friendly status and error messages
- No API key required

## Project structure

```text
Weather-App/
├── index.html              # Home page
├── forecast.html           # City search and weather results page
├── style.css               # Shared page styles
├── src/
│   ├── weather.js          # Weather search, API requests, and rendering
│   └── main.js             # Reserved application entry point
├── test/
│   └── weather.test.js     # Reserved test file
└── .github/
    └── workflows/
        └── ci-deploy.yml  # CI/deployment workflow configuration
```

## Running locally

Because the forecast page loads a JavaScript module, open the project through a local web server rather than directly from the file system.

### Using Python

From the project directory, run:

```bash
python -m http.server 8000
```

Then open [http://localhost:8000](http://localhost:8000) in a browser.

### Using another static server

Any static file server can be used. For example, if `live-server` is installed:

```bash
live-server .
```

## How it works

1. Open `forecast.html` and enter a city name.
2. The app sends the city name to the Open-Meteo geocoding endpoint.
3. The first matching location supplies latitude and longitude coordinates.
4. Those coordinates are sent to the Open-Meteo forecast endpoint.
5. The current weather data is rendered on the page.

The app uses these public endpoints:

- [Open-Meteo Geocoding API](https://open-meteo.com/en/docs/geocoding-api)
- [Open-Meteo Forecast API](https://open-meteo.com/en/docs)

## Testing

The repository includes a placeholder test file at `test/weather.test.js`. No package manager configuration or test runner is currently defined, so tests are not yet runnable through an npm script.

## Browser support

Use a modern browser with support for ES modules, `fetch`, and the DOM APIs used by the application.

## License

No license has been specified for this project.
