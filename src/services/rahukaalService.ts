import SunCalc from "suncalc";

const rahuKaalPeriods: { [key: number]: number } = {
  0: 8, // Sunday
  1: 2, // Monday
  2: 7, // Tuesday
  3: 5, // Wednesday
  4: 6, // Thursday
  5: 4, // Friday
  6: 3, // Saturday
};

/**
 * Calculate Rahu Kaal time for a given date and location.
 * @param lat Latitude of the location
 * @param lon Longitude of the location
 * @returns Rahu Kaal start and end time
 */
export function calculateRahuKaal(lat: number, lon: number) {
  const date = new Date();
  const times = SunCalc.getTimes(date, lat, lon);
  
  // Add logging statements to print the times
  console.log("Sunrise:", times.sunrise);
  console.log("Sunset:", times.sunset);

  if (!times.sunrise || !times.sunset) {
    throw new Error("Unable to calculate sunrise/sunset times.");
  }

  const sunrise = times.sunrise.getTime();
  const sunset = times.sunset.getTime();
  const dayDuration = (sunset - sunrise) / 8; // Divide the daylight into 8 parts

  // Get Rahu Kaal period index for the current weekday
  const weekday = date.getDay(); // 0 = Sunday, 6 = Saturday
  const rahuIndex = rahuKaalPeriods[weekday] - 1; // Convert to zero-based index

  const rahuStart = new Date(sunrise + rahuIndex * dayDuration);
  const rahuEnd = new Date(rahuStart.getTime() + dayDuration);

  return {
    start: rahuStart.toLocaleTimeString(),
    end: rahuEnd.toLocaleTimeString(),
  };
}