const onPost = async (req, res, next) => {
  const { start, end, units } = req.body;
  console.log(start);
  console.log(end);
  console.log(units);


  return res.json({
    message: 'Test me'
  })
}

const LocationsHandler = { onPost }
export default LocationsHandler
