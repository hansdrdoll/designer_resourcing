console.log('make-assignments connected!')

const allInputFields = document.querySelectorAll('.hours');

const HourInputs = [];

const pushValue = (evt) => {
  const value = evt.target.value;
  const index = evt.target.id;
  HourInputs[index].hours = value;
};

const transmuteIds = (element, index) => {
  const infoString = element.id;
  const infoArr = infoString.split(',');
  HourInputs.push({
    resource_id: infoArr[1],
    project_id: infoArr[2],
    day: infoArr[0],
    hours: '',
  });
  element.id = index;
  element.addEventListener('blur', pushValue);
};

allInputFields.forEach(transmuteIds);

const gatherAllValues = (element, index) => {
  let value = element.value;
  if (value === '') {
    value = '0';
  }
  HourInputs[index].hours = value;
};

// fun times getting this promise to resolve holy shit
const sendIt = (data) => fetch('/assign-resources', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(data),
  }).then(function(response) {
  return response;
});

const sendRequest = (evt) => {
  evt.preventDefault();
  allInputFields.forEach(gatherAllValues);
  sendIt(HourInputs)
    .then(response => window.location.href = "/assign-resources");
};

const form = document.querySelector('.js-form');

form.addEventListener('submit', sendRequest);
