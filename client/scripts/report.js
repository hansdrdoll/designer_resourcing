console.log('make-assignments connected!')

const allInputFields = document.querySelectorAll('.hours');

const HourInputs = [];

const pushValue = (evt) => {
  const value = evt.target.value;
  const index = evt.target.id;
  HourInputs[index].hours = value;
};

const transmuteIds = (element, index) => {
  const elementId = element.id;
  HourInputs.push({
    id: elementId,
    hours: element.value,
  });
  element.id = index;
  element.addEventListener('blur', pushValue);
};

allInputFields.forEach(transmuteIds);

const gatherAllValues = (element, index) => {
  let value = element.value;
  if (value === '') {
    value = '0';
    allInputFields[index].value = '0';
  }
  HourInputs[index].hours = value;
};

const sendIt = (data) => fetch('/report?_method=put', {
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
    .then(response => console.log(response));
};
// window.location.href = "/report"
const form = document.querySelector('.js-form');

form.addEventListener('submit', sendRequest);
