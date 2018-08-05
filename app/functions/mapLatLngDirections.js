const MapLatLngDirections = coordsArr => {
  return coordsArr.map(latlng => {
    let [lat, lng] = [latlng.lat(), latlng.lng()];
    return [lat, lng];
  });
};

export default MapLatLngDirections;
