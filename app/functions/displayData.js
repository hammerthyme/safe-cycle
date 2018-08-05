const displayData = accidentMap => {
  let cyclistsInjured = 0;
  let cyclistsKilled = 0;
  const latlngAccidentsArr = accidentMap.values().next().value;
  latlngAccidentsArr.forEach(accident => {
    cyclistsInjured += Number(accident.number_of_cyclist_injured);
    cyclistsKilled += Number(accident.number_of_cyclist_killed);
  });
  const totalAffected = cyclistsInjured + cyclistsKilled;
  const percentageTotal = totalAffected
    ? (totalAffected / latlngAccidentsArr.length).toLocaleString(undefined, {
        style: "percent",
        minimumFractionDigits: 0
      })
    : 0;

  return [cyclistsInjured, cyclistsKilled, percentageTotal];
};

export default displayData;
