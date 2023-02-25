const table = document.querySelector('#myTable');
const rowTemplate = document.querySelector('#rowTemplate');
const addRowButton = document.querySelector('#addRow');
const saveAllButton = document.querySelector('#saveAll');

let nextId = 1;
const data = [];

addRowButton.addEventListener('click', () => {
  const newRow = rowTemplate.cloneNode(true);
  newRow.style.display = '';
  newRow.id = '';
  newRow.querySelector('.id').textContent = nextId++;
  table.querySelector('tbody').appendChild(newRow);
  data.push({
    id: newRow.querySelector('.id').textContent,
    name: newRow.querySelector('.name').value,
    age: newRow.querySelector('.age').value,
    address: newRow.querySelector('.address').value,
  });
});

table.addEventListener('input', (event) => {
  const target = event.target;
  if (target.classList.contains('name') || target.classList.contains('age') || target.classList.contains('address')) {
    const row = target.closest('tr');
    const id = row.querySelector('.id').textContent;
    const property = target.classList.contains('name') ? 'name' :
      target.classList.contains('age') ? 'age' :
      target.classList.contains('address') ? 'address' :
      null;
    const value = target.value;
    const index = data.findIndex(row => row.id === id);
    if (index !== -1 && property !== null) {
      data[index][property] = value;
      row.querySelector('.saveRow').disabled = false;
    }
  }
});

table.addEventListener('click', (event) => {
  const target = event.target;
  if (target.classList.contains('saveRow')) {
    const row = target.closest('tr');
    const id = row.querySelector('.id').textContent;
    const index = data.findIndex(row => row.id === id);
    if (index !== -1) {
      data[index].name = row.querySelector('.name').value;
      data[index].age = row.querySelector('.age').value;
      data[index].address = row.querySelector('.address').value;
      row.querySelector('.saveRow').disabled = true;
    }
  }
  else if (target.classList.contains('deleteRow')) {
    const row = target.closest('tr');
    const id = row.querySelector('.id').textContent;
    const index = data.findIndex(row => row.id === id);
    if (index !== -1) {
      data.splice(index, 1);
    }
    row.remove();
  }
});

saveAllButton.addEventListener('click', () => {
    console.log(data);
  }
  );