console.log('make-assignments connected!')

const allInputFields = document.querySelectorAll('.hours');
const monday = document.querySelector('#monday').value;

const HourInputs = [];

const rows = document.querySelectorAll('.row-identifier');

const rowIds = [];
const rowsToIds = rows.forEach(row => rowIds.push(Number(row.value)));

// https://stackoverflow.com/questions/9229645/remove-duplicate-values-from-js-array
const reduceResourses = rowIds.filter((item, pos) => rowIds.indexOf(item) === pos);

const sumRows = () => {
  reduceResourses.forEach((resource) => {
    const cells = document.querySelectorAll(`.row${resource}`);
    const totalFields = document.querySelectorAll(`.total${resource}`)

    const values = [];
    cells.forEach((cell) => {
      values.push(Number(cell.value));
    });
    const sum = values.reduce((a, b) => a + b);

    totalFields.forEach(total => total.value = sum);

    if (sum > 40) {
      totalFields.forEach((total) => {
        total.classList.remove('uk-form-success');
        total.classList.add('uk-form-danger');
      });
    } else if (sum < 40) {
      totalFields.forEach((total) => {
        total.classList.remove('uk-form-danger');
        total.classList.add('uk-form-success');
      });
    } else if (sum === 40) {
      totalFields.forEach((total) => {
        total.classList.remove('uk-form-danger');
        total.classList.remove('uk-form-success');
      });
    }
  });
};


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
  element.addEventListener('input', sumRows);
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

const sendIt = data => fetch('/report?_method=put', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(data),
}).then(response => response);

const sendRequest = (evt) => {
  evt.preventDefault();
  allInputFields.forEach(gatherAllValues);
  sendIt(HourInputs)
    .then(response => console.log(response));
};

const form = document.querySelector('.js-form');

form.addEventListener('submit', sendRequest);

const makeLinksForNextAndLastWeek = () => {
  const lastWeek = moment(monday).subtract(1, 'weeks').format('YYYY-MM-DD');
  const lastWeekLink = document.querySelector('#lastWeek');
  lastWeekLink.href = `/report/${lastWeek}`;

  const nextWeek = moment(monday).add(1, 'weeks').format('YYYY-MM-DD');
  const nextWeekLink = document.querySelector('#nextWeek');
  nextWeekLink.href = `/report/${nextWeek}`;
};

sumRows();
makeLinksForNextAndLastWeek();
