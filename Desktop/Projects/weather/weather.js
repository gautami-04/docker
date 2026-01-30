// Simple weather module using Open-Meteo (no API key required)

export async function getWeatherForCity(city) {
  if (!city) throw new Error('City name is required');

  const geocodeUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=en&format=json`;
  let geodata;
  try {
    const gres = await fetch(geocodeUrl);
    if (!gres.ok) throw new Error(`Geocoding service returned ${gres.status}`);
    geodata = await gres.json();
  } catch (err) {
    throw new Error(`Failed to query geocoding service: ${err.message}`);
  }

  if (!geodata.results || geodata.results.length === 0) {
    throw new Error(`City not found: ${city}`);
  }

  const loc = geodata.results[0];
  const { latitude, longitude, name, country } = loc;

  const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&timezone=auto`;
  let wdata;
  try {
    const wres = await fetch(weatherUrl);
    if (!wres.ok) throw new Error(`Weather service returned ${wres.status}`);
    wdata = await wres.json();
  } catch (err) {
    throw new Error(`Failed to fetch weather data: ${err.message}`);
  }

  if (!wdata.current_weather) throw new Error('No current weather data available');

  const { temperature, windspeed, weathercode } = wdata.current_weather;

  return {
    name: `${name}${country ? ', ' + country : ''}`,
    temperature: temperature,
    wind: windspeed,
    weathercode,
    description: weatherCodeToDescription(weathercode)
  };
}

function weatherCodeToDescription(code) {
  // Map Open-Meteo weather codes to human-friendly descriptions (based on Open-Meteo documentation)
  const map = {
    0: 'Clear sky',
    1: 'Mainly clear',
    2: 'Partly cloudy',
    3: 'Overcast',
    45: 'Fog',
    48: 'Depositing rime fog',
    51: 'Light drizzle',
    53: 'Moderate drizzle',
    55: 'Dense drizzle',
    56: 'Light freezing drizzle',
    57: 'Dense freezing drizzle',
    61: 'Slight rain',
    63: 'Moderate rain',
    65: 'Heavy rain',
    66: 'Light freezing rain',
    67: 'Heavy freezing rain',
    71: 'Slight snow fall',
    73: 'Moderate snow fall',
    75: 'Heavy snow fall',
    77: 'Snow grains',
    80: 'Slight rain showers',
    81: 'Moderate rain showers',
    82: 'Violent rain showers',
    85: 'Slight snow showers',
    86: 'Heavy snow showers',
    95: 'Thunderstorm',
    96: 'Thunderstorm with slight hail',
    99: 'Thunderstorm with heavy hail'
  };
  return map[code] ?? `Weather code ${code}`;
}
