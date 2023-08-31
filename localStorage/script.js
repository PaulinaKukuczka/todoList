//pobieranie inputa
const inputForm = document.querySelector('#addForm');
//pobieranie listy itemsów
const itemList = document.querySelector('#items');

inputForm.addEventListener('submit', runEvent);
//usuwanie elementów
itemList.addEventListener('click', removeItem);

function addName() {
  //jeśli nie ma imienia, to wysyłamy prośbę o podanie (tworzymy zmienną)
  //następnie zapisujemy przez setItem klucz i wartość (name - zmienna) 
	if (window.localStorage.getItem('name') == null) {
		let name = window.prompt('Podaj swoje imię: ');
		window.localStorage.setItem('name', name);
	}

  //do miejsca z id= name dodajemy teskt, który jest zapisany w kluczu name/ w local storage
	document.getElementById('name').innerHTML = window.localStorage.getItem('name');
}
addName();

function runEvent(e) {
	e.preventDefault();

	//pobieranie wartości zapisanej w input
	let item = document.getElementById(`item`).value;

	//tworzenie li
	let li = document.createElement('li');
	//dodawanie klasy
	li.className = 'list-group-item d-block';

	//dodawanie do li tekstu z inputa
	li.appendChild(document.createTextNode(item));

	//dodawanie button!
	//tworzenie buttona
	let button = document.createElement('button');
	//dodawanie klasy
	button.className = 'btn btn-danger btn-sm float-end delete';
	//dodawanie napisu
	button.appendChild(document.createTextNode('X'));

	//dodawanie do li buttona
	li.appendChild(button);

	//dodawanie do listy całego elementu
	itemList.appendChild(li);
	initItems()
	addItems()
	showItems()
}

//usuwanie elementów
///tworzymy funkcję, która pobiera przycisk i i usuwa całą zawartość li

function removeItem(e) {
	if (e.target.classList.contains('delete')) {
		//usuwanie rodzica od button, czyli całe LI
		let li = e.target.parentElement;
		itemList.removeChild(li);
	}
}


//zapisywanie w localStorage danych
//tworzysz bazę z danymi. 
//1. nadajesz klucz (JSON.parse aby zapisać w postaci tablicy)/ 
//2. stworzenie pustej tablicy
//3. wsadzenie wartości do tablicy setItem/ JSON.stringify do ustawienia wartości jako string
function initItems() {
	console.log(item.value)
	
	//potrzebujemy tablicy, do zachowywania kilku danych
	//pobieramy klucz!!!
	let itemList = JSON.parse(window.localStorage.getItem('item'))
	// console.log(itemList)

	if(itemList == null) {
		itemList = Array()
		//ustawiamy wartości w localStorage, zapisujemy ja w stringu, jest zapisywana w array
		window.localStorage.setItem('item', JSON.stringify(itemList))
	}
	console.log(itemList)
}

function addItems() {
	//pobieramy wartość z inputa
	let item = document.getElementById(`item`).value;
	//pobieramy klucz!!!, jest on w tablicy JSON.parse
	let itemList = JSON.parse(window.localStorage.getItem('item'))
	//pojedynczą rzecz wpychamy do itemList (czyli wartości klucza 'item')
	itemList.push(item)
	//ustawiamy localStorage: klucz-item = wartość (zmieniona na stringa) listy rzeczy
	window.localStorage.setItem('item', JSON.stringify(itemList))
	document.getElementById('item').value = ''
}

function showItems() {
	//znów pobieramy wartość
	let itemList = document.querySelector('#items');
	//ściagamy całą listę zadań
	let itemArray = JSON.parse(window.localStorage.getItem('item'))
	console.log(itemArray)
let newItems = '';

	for (let i=0; i < itemArray.length; i++) {
		newItems += '<li class=list-group-item d-block>' + itemArray[i] + '<button class="btn btn-danger btn-sm float-end delete">X</button>' + '</li>'
	}
	itemList.innerHTML = newItems;
}