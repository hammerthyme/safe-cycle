const MapLatLngDirections = coordsArr => {
  let mappedLatLng = coordsArr.map(latlng => {
    let [lat, lng] = [latlng.lat(), latlng.lng()];
    return [lat, lng];
  });
  return mappedLatLng;
};

export default MapLatLngDirections;
