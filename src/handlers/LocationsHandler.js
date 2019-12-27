import googleMaps from "@google/maps"
import countriesTimezones from "countries-and-timezones"

const googleMapsClient = googleMaps.createClient({
  key: 'AIzaSyCqXEule4NLl0RTe7x51zvswqb-hPDSZYA',
  Promise: Promise
});

const onPost = async (req, res) => {
  const { start, end, units } = req.body;

  try {
    // Get timezone for start location
    const startTimezone = await googleMapsClient.timezone({ location: start.lat + ',' + start.lng }).asPromise();
    const { timeZoneId: startTimeZoneId } = startTimezone.json;
    const startUtcOffset = countriesTimezones.getTimezone(startTimeZoneId).utcOffset;
    const startCountry = countriesTimezones.getCountryForTimezone(startTimeZoneId).name;
    const startPayload = {
      country: startCountry,
      timezone: (Math.sign(startUtcOffset) > 0 ? 'GMT+' : 'GMT') + startUtcOffset / 60,
      location: start
    };

    // Get timezone for end location
    const endTimezone = await googleMapsClient.timezone({ location: end.lat + ',' + end.lng }).asPromise();
    const { timeZoneId: endTimeZoneId } = endTimezone.json;
    const endUtcOffset = countriesTimezones.getTimezone(endTimeZoneId).utcOffset;
    const endCountry = countriesTimezones.getCountryForTimezone(endTimeZoneId).name;

    const endPayload = {
      country: endCountry,
      timezone: (Math.sign(endUtcOffset) > 0 ? 'GMT+' : 'GMT') + endUtcOffset / 60,
      location: end
    };

    // Calculate time difference
    const time_diff = {
      value: Math.abs(startUtcOffset - endUtcOffset) / 60,
      units: "hours"
    };

    // Calculate distance
    const distanceMatrix = await googleMapsClient.distanceMatrix({
      origins: start.lat + ',' + start.lng,
      destinations: end.lat + ',' + end.lng,
      units: units,
      mode: 'walking'
    }
    ).asPromise();

    const { rows } = distanceMatrix.json;
    let distancePayload = {}
    if (rows.length) {
      const { elements } = rows[0];
      if (elements.length) {
        const { distance } = elements[0];
        distancePayload = {
          value: (distance.value / 1000).toFixed(1),
          units: 'km',
        };
      }
    }

    return res.json({
      start: startPayload,
      end: endPayload,
      distance: distancePayload,
      time_diff
    })

  } catch (error) {
    return res.json(
      {
        status: error.status,
        detail: error.json
      }
    )
  }
}

const LocationsHandler = { onPost }
export default LocationsHandler
