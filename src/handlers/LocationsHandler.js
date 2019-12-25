import googleMaps from "@google/maps"

const googleMapsClient = googleMaps.createClient({
  key: 'AIzaSyCqXEule4NLl0RTe7x51zvswqb-hPDSZYA',
  Promise: Promise
});

const onPost = async (req, res, next) => {
  const { start, end, units } = req.body;
  
  googleMapsClient.directions({
    origin: start.lat + ',' + start.lng,
    destination: end.lat + ',' + end.lng,
    units: units
  }).asPromise().then((response) => {
    console.log(response.json);
  })
    .catch((err) => {
      console.log(err);
    });

  return res.json({
    message: 'Test me'
  })
}

const LocationsHandler = { onPost }
export default LocationsHandler
