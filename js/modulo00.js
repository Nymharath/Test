

var modulo = (function() {

	var _dati = [];
	var _search = '';

	var _load = function(lista) {
		for (var i = 0; i < lista.length; i++) {
			_add(lista[i]);
		}
	};

	var _add = function(elemento) {
		return _dati.push(elemento);
	};

	var _remove = function(id) {
		for (var i = 0; i < _dati.length; i++) {
			if (_dati[i].id == id) {
				_dati.splice(i, 1);
				break;
			}
		}
		return _dati.length;
	};

	var _count = function() {
		return _dati.length;
	};
	var _list = function() {
		return _dati;
	};

	var _renderTable = function(elementId, search) {
		_search = search;

		if (!search) {
			search = '';
		} else {
			search = search.toUpperCase();
		}

		document.getElementById(elementId).innerHTML = '';

		var input = document.createElement('input');
		input.setAttribute('id', 'search');
		input.value = search;
		document.getElementById(elementId).appendChild(input);

		var button = document.createElement('button');
		button.setAttribute('class', 'btn btn-default');
		button.innerHTML = 'Cerca';
		button.addEventListener('click', cerca);
		document.getElementById(elementId).appendChild(button);

		var table = document.createElement('table');
		table.setAttribute('class', 'table table-hover');

		// INTESTAZIONI

		var thead = document.createElement('thead');
		var tr = document.createElement('tr');
		for (x in _dati[0]) {
			var th = document.createElement('th');
			th.innerHTML = x;
			tr.appendChild(th);
		}
		thead.appendChild(tr);
		table.appendChild(thead);

		// DATI

		var tbody = document.createElement('tbody');
		for (var i = 0; i < _dati.length; i++) {
			testo = '';
			for (x in _dati[0]) {
				testo += ',' + (_dati[i][x] + '').toUpperCase();
			}
			if (testo.indexOf(search) == -1) {
				continue;
			}


			var tr = document.createElement('tr');
			for (x in _dati[0]) {
				var td = document.createElement('td');
				td.innerHTML = _dati[i][x] || '---';
				tr.appendChild(td);
			}
			tbody.appendChild(tr);
		}
		table.appendChild(tbody);

		document.getElementById(elementId).appendChild(table);
	};

	return {
		add: _add,
		load: _load,
		remove: _remove,
		count: _count,
		list: _list,
		renderTable: _renderTable 
	};


})();

var cerca = function() {
      modulo.renderTable('tabellaDati', document.getElementById('search').value);
    }