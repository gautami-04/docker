import { getCoordinates, getWeather } from "./weatherService.js";

const city = process.argv.slice(2).join(" ");

if (!city) {
  console.error("Please provide a city name");
  process.exit(1);
}

async function main() {
  try {
    const location = await getCoordinates(city);
    const weather = await getWeather(
      location.latitude,
      location.longitude
    );

    console.log(`Weather in ${location.name}`);
    console.log(`Temperature: ${weather.temperature}°C`);
  } catch (err) {
    console.error("Error:", err.message);
  }
}

main();
