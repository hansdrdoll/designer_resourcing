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
    date: infoArr[0],
    hours: '',
  });
  element.id = index;
  element.addEventListener('blur', pushValue);
};

allInputFields.forEach(transmuteIds);

const sendRequest = (evt) => {
  evt.preventDefault();

}

const form = document.querySelector('.js-form');

form.addEventListener('submit', sendRequest);


