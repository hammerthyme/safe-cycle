import axios from "axios";

let coordsMemo = {};
const AccidentData = async latlngArr => {
  const apiURL = "https://data.cityofnewyork.us/resource/qiz3-axqb.json?";
  const appToken = "&$$app_token=3Ar5xAFNG5NV39cgZQlF9cZ6y";
  let dataStore = [];

  for (let i = 0; i < latlngArr.length; i++) {
    let latlng = latlngArr[i];
    const [lat, lng] = [latlng[0], latlng[1]];
    const currCoords = { lat, lng }; //store coords in object
    const stringifiedCoords = JSON.stringify(currCoords);
    const currDataMap = new Map();
    //check if data already exists
    if (coordsMemo[stringifiedCoords]) {
      currDataMap.set(currCoords, coordsMemo[stringifiedCoords]);
    } else {
      const latlngParam = `$where=within_circle(location,${lat},${lng},10)`;
      const url = `${apiURL}${latlngParam}${appToken}`;
      const res = await axios.get(url);
      const accidentData = res.data;
      currDataMap.set(currCoords, accidentData);
      coordsMemo[stringifiedCoords] = accidentData;
    }
    dataStore.push(currDataMap);
  }
  return dataStore;
};

export default AccidentData;
