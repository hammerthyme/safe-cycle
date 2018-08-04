import axios from "axios";

const AccidentData = async latlngArr => {
  const apiURL = "https://data.cityofnewyork.us/resource/qiz3-axqb.json?";
  const appToken = "&$$app_token=3Ar5xAFNG5NV39cgZQlF9cZ6y";
  let dataStore = [];

  for (let i = 0; i < latlngArr.length; i++) {
    let latlng = latlngArr[i];
    const [lat, lng] = [latlng[0], latlng[1]];
    const latlngParam = `$where=within_circle(location,${lat},${lng},10)`;
    const url = `${apiURL}${latlngParam}${appToken}`;
    const res = await axios.get(url);
    const accidentData = res.data;
    const currDataMap = new Map();
    currDataMap.set({ lat, lng }, accidentData);
    dataStore.push(currDataMap);
  }
  return dataStore;
};

export default AccidentData;
