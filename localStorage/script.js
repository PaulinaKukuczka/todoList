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
	let task = document.getElementById('item').value;

	//tworzenie li
	let li = document.createElement('li');
	//dodawanie klasy
	li.className = 'list-group-item d-block';

	//dodawanie do li tekstu z inputa
	li.appendChild(document.createTextNode(task));

	//dodawanie button!
	//tworzenie buttona
	let button = document.createElement('button');
	//dodawanie klasy
	button.className = 'btn btn-danger btn-sm float-end delete';
	//dodawanie napisu
	button.appendChild(document.createTextNode('X'));

	//dodawanie do li buttona
	li.appendChild(button);

	//dodawanie do listy całego elementu, który ma pobraną nazwę i button
	itemList.appendChild(li)


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
