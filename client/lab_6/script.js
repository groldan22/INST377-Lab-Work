function getRandomIntInclusive(min, max) {
  newMin = Math.ceil(min);
  newMax = Math.floor(max);
  return Math.floor(
    Math.random() * (newMax - newMin + 1) + min
  );
}

function resotArrayMake(dataArray) {
  console.log('fired dataHandler');
  const range = [...Array(15).keys()];
  const listItems = range.map((item, index) => {
    const restNum = getRandomIntInclusive(0, dataArray.length - 1);
    return dataArray[restNum];
  });
  return listItems;
}

function createHtmlList(collection) {
  console.log('fired HTML creator');
  console.log(collection);
  const targetList = document.querySelector('.resto-list');
  targetList.innerHTML = '';
  collection.forEach((item) => {
    const {name} = item;
    const displayName = name.toLowerCase();
    const injectThisItem = `<li>${displayName}</li>`;
    targetList.innerHTML += injectThisItem;
  });
}

async function mainEvent() { // for API requests
  console.log('script loaded');
  const form = document.querySelector('.food-form');
  const submit = document.querySelector('.submit_button');
  submit.style.display = 'none';

  const results = await fetch('https://data.princegeorgescountymd.gov/resource/umjn-t2iz.json'); // This accesses some data from our API
  const arrayFromJson = await results.json(); // This changes it into data we can use - an object
  console.log(arrayFromJson);

  if (arrayFromJson.length > 0) {
    form.addEventListener('submit', async (submitEvent) => { // async has to be declared all the way to get an await
      submitEvent.preventDefault(); // This prevents your page from refreshing!
      console.log('form submission'); // this is substituting for a "breakpoint"
      submit.style.display = 'block';
      // arrayFromJson.data - we're accessing a key called 'data' on the returned object
      // it contains all 1,000 records we need
      const restoArray = resotArrayMake(arrayFromJson);
      createHtmlList(restoArray);
    });
  }
}

document.addEventListener('DOMContentLoaded', async () => mainEvent()); // the async keyword means we can make API requests