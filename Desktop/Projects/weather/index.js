#!/usr/bin/env node
import { getWeatherForCity } from './weather.js';

async function main() {
  const args = process.argv.slice(2);
  if (args.length === 0) {
    console.error('Usage: node index.js "City Name"');
    process.exit(1);
  }
  const city = args.join(' ');
  try {
    const weather = await getWeatherForCity(city);
    console.log(`Weather in ${weather.name}: ${weather.temperature}°C, ${weather.description}${weather.wind ? `, Wind ${weather.wind} m/s` : ''}`);
  } catch (err) {
    console.error('Error:', err.message);
    process.exit(2);
  }
}

main();
