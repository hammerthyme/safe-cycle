import axios from "axios";


const filterData = (accidentData, dataStore) => {
  accidentData.forEach((accident, idx) => {
    dataStore[idx].accidents = accident.data
  })
}

const queryCollisionsAPI = latlngArr => {
  const apiURL = "https://data.cityofnewyork.us/resource/qiz3-axqb.json?";
  const promises = []
  const dataStore = []
  for (let i = 0; i < latlngArr.length; i++) {
    const latlng = latlngArr[i];
    const [lat, lng] = [latlng[0], latlng[1]];
    const latlngParam = `$where=within_circle(location,${lat},${lng},10)`;
    const queryURL = `${apiURL}${latlngParam}`;
    const promise = axios.get(queryURL);
    promises.push(promise)
    dataStore.push({ lat, lng })
  }
  return {promises, dataStore}
}

const resolvePromisesOrTryAgain = async (promises, latlngArr) => {
  let allData;
  const timeoutId = setTimeout(() => {
    if (!allData) {
      promises = queryCollisionsAPI(latlngArr).promises;
      return resolvePromisesOrTryAgain(promises, latlngArr);
    }
  }, 5000);
  allData = await Promise.all(promises);
  clearTimeout(timeoutId);
  return allData;
};

const AccidentData = async latlngArr => {
  let allData;
  const { promises, dataStore } = queryCollisionsAPI(latlngArr)
  try {
    allData = await resolvePromisesOrTryAgain(promises, latlngArr)
  } catch (error) {
    console.error('a promise rejected', error)
  }
  filterData(allData, dataStore)
  return dataStore;
};

export default AccidentData;
