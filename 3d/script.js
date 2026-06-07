document.addEventListener('DOMContentLoaded', (e) => {
  addPersonCellData(); // for query select
});

document.addEventListener('keydown', (e) => {
  tryMove(e.key);
  tryClickAtCam(e.key);
});

function addPersonCellData() {
  const people = document.querySelectorAll('.person');

  for (const person of people) {
    const col = getComputedStyle(person).getPropertyValue('--c');
    if (col === '') continue;
    const row = getComputedStyle(person).getPropertyValue('--r');
    if (row === '') continue;

    person.dataset.c = col;
    person.dataset.r = row;
  }
}

function tryMove(key) {
  switch (key) {
    case 'ArrowRight': case 'd':
    case 'ArrowLeft': case 'a':
    case 'ArrowDown': case 's':
    case 'ArrowUp': case 'w':
      break;
    default:
      return;
  }

  const docElem = document.documentElement;
  const camCol = getComputedStyle(docElem).getPropertyValue('--cam-c');
  if (camCol === '') return;
  const camRow = getComputedStyle(docElem).getPropertyValue('--cam-r');
  if (camRow === '') return;

  let newCamCol = Number(camCol);
  let newCamRow = Number(camRow);
  switch (key) {
    case 'ArrowRight': case 'd':
      newCamCol = Number(camCol) + 1;
      break;
    case 'ArrowLeft': case 'a':
      newCamCol = Number(camCol) - 1;
      break;
    case 'ArrowDown': case 's':
      newCamRow = Number(camRow) + 1;
      break;
    case 'ArrowUp': case 'w':
      newCamRow = Number(camRow) - 1;
      break;
  }
  docElem.style.setProperty('--cam-c', newCamCol);
  docElem.style.setProperty('--cam-r', newCamRow);

  // focus person at cam
  const personAtCam = document.querySelector(`.person[data-c='${newCamCol}'][data-r='${newCamRow}']`);
  if (personAtCam === null) {
    // unfocus previous
    const focusPerson = document.querySelector('.person:focus');
    if (focusPerson !== null) {
      focusPerson.blur();
    }
  }
  else {
    personAtCam.focus();
  }
}

function tryClickAtCam(key) {
  switch (key) {
    case 'Enter': case ' ':
      break;
    default:
      return;
  }
  
  const docElem = document.documentElement;
  const camCol = getComputedStyle(docElem).getPropertyValue('--cam-c');
  if (camCol === '') return;
  const camRow = getComputedStyle(docElem).getPropertyValue('--cam-r');
  if (camRow === '') return;

  // don't select if there is an active target
  const personAtCam = document.querySelector(`html:not(:has(:target)) .person[data-c='${camCol}'][data-r='${camRow}']`);
  if (personAtCam === null) return;

  personAtCam.click();
}