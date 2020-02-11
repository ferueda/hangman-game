const getPuzzle = async wordCount => {
  const response = await fetch(`//puzzle.mead.io/puzzle?wordCount=${wordCount}`);

  if (response.status === 200) {
    const data = await response.json();
    return data.puzzle;
  } else {
    throw new Error('Unable to fetch puzzle');
  }
};

const getCurrentCountry = async () => {
  const location = await getLocation();
  return getCountry(location.country);
};

const getCountry = async code => {
  const response = await fetch('http://restcountries.eu/rest/v2/all', {});

  if (response.status === 200) {
    const data = await response.json();
    return data.find(obj => obj.alpha2Code === code);
  } else {
    throw new Error('Unable to fetch country');
  }
};

const getLocation = async () => {
  const response = await fetch('//ipinfo.io/json?token=20955db71599e8', {});

  if (response.status === 200) {
    return await response.json();
  } else {
    throw new Error('Unable to fetch data');
  }
};

export { getPuzzle as default }