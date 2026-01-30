# node-weather-cli

Simple command-line weather application that fetches current weather for a given city using the free Open-Meteo APIs (no API key required).

## Requirements

- Node.js 18 or newer (uses global fetch)

## Usage

Install (optional):

```bash
npm install
```

Run:

```bash
node index.js "New York"
```

Example output:

```
Weather in New York, United States: 15°C, Clear sky, Wind 3.5 m/s
```

## How it works

- Uses Open-Meteo's geocoding API to convert the city name into coordinates.
- Calls Open-Meteo's forecast API to retrieve the current weather.

## Notes

- No API key required. If your Node version is older than 18, either upgrade Node or install a fetch polyfill.
