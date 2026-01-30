export async function getCoordinates(city) {
  const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}`;

  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to fetch location");

  const data = await res.json();
  if (!data.results || data.results.length === 0) {
    throw new Error("City not found");
  }

  return data.results[0];
}

export async function getWeather(lat, lon) {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`;

  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to fetch weather");

  const data = await res.json();
  return data.current_weather;
}