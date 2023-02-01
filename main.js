let input = document.querySelector('.input-form');
let form = document.querySelector('form');
let btn = document.querySelector('.btn-added');
let ul = document.querySelector('.list');
let filterList = document.querySelector('.filter');
let filterListTwo = document.querySelector('.filterTwo');
let items = [];

form.addEventListener('submit', addItem)

function addItem(e) {
  e.preventDefault()
  if (input.value !== "") {
    let item = {
      task: input.value,
      done: false,
      id: Date.now()
    }
  
    items.push(item)
  
    let li = document.createElement(`li`);
    li.classList = 'item';
    li.id = item.id
    li.innerHTML = `<p >${items[items.length - 1].task}  </p>
              <div class="icon">
              <button class="check" data-action="done">
                <img src="check.png" alt="check">
              </button>
            <button data-action="delete" class="trash"> 
              <img src="trash.png" alt="delete">
            </button>
            </div>
              `
    ul.appendChild(li)
    input.value = ''
  }

  if (filterList.style.display === 'none' && filterListTwo.style.display === 'block') {
    filter()
  } else if ( filterList.style.display === 'block' && filterListTwo.style.display === 'none') {
    filterTwo()
  }
}

ul.addEventListener('click', done)

function done(event) {
  if (event.target.dataset.action === 'done') {
    let parenNode = event.target.closest('.item')
    parenNode.children[0].classList.toggle('text')
    event.target.classList.toggle('checkTwo')
    let id = Number(parenNode.id);
    let index = items.findIndex((index) => index.id === id)
    if (items[index].done === false) {
      items[index].done = true
    } else {
      items[index].done = false
    }
  }

}

ul.addEventListener('click', deletTask)

function deletTask(event) {
  if (event.target.dataset.action === 'delete') {
    let parenNode = event.target.closest('.item')
    let id = Number(parenNode.id);
    let index = items.findIndex((index) => index.id === id)
    items.splice(index, 1)
    parenNode.remove()
  }
}

filterList.addEventListener('click', filter)

function filter() {
  filterList.children[0].style.transform = 'translate(100%)';
  filterList.children[0].style.background = '#f85959';
  filterList.style.display = 'none'
  filterListTwo.style.display = 'block'

  let truthy = items.filter((truthy) => truthy.done === true)
  let falsy = items.filter((falsy) => falsy.done === false)
  let sortList = [...falsy, ...truthy];
  ul.innerHTML = '';

  for (let i = 0; i < sortList.length; i++) {
    let li = document.createElement('li');
    li.classList = 'item';
    li.id = sortList[i].id;
    li.innerHTML = `
    <p >${sortList[i].task}  </p>
    <div class="icon">
    <button class="check" data-action="done">
      <img src="check.png" alt="check">
    </button>
  <button data-action="delete" class="trash"> 
    <img src="trash.png" alt="icon">
  </button>
  </div>
    `
    ul.appendChild(li)
  }

  let ayru = sortList.length - truthy.length;
  let child = ul.children;
  for (let i = ayru; i < child.length; i++) {
    child[i].children[0].classList.toggle('text');
    child[i].children[1].children[0].classList.toggle('checkTwo')

  }
}

filterListTwo.addEventListener('click', filterTwo)

function filterTwo() {
  filterList.children[0].style.transform = 'translate(0%)';
  filterList.children[0].style.background = '#FF7676';
  filterList.style.display = 'block'
  filterListTwo.style.display = 'none'
  ul.innerHTML = '';
  for (let i = 0; i < items.length; i++) {
    let li = document.createElement(`li`);
    li.classList = 'item';
    li.id = items[i].id
    li.innerHTML = `<p >${items[i].task}  </p>
            <div class="icon">
            <button class="check" data-action="done">
              <img src="check.png" alt="check">
            </button>
          <button data-action="delete" class="trash"> 
            <img src="trash.png" alt="icon">
          </button>
          </div>
            `
    ul.appendChild(li)
  }
  for (let i = 0; i < items.length; i++) {
    if (items[i].done === true) {
      ul.children[i].children[0].classList.toggle('text');
      ul.children[i].children[1].children[0].classList.toggle('checkTwo')
    }
  }
  input.value = ''

}