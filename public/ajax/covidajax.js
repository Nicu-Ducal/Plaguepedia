/* Main */
window.onload = function(){
	var summary = document.getElementById('summary');
	var symptoms = document.getElementById('symptoms');
	var cause = document.getElementById('cause');
	var history = document.getElementById('history');
	var research = document.getElementById('research');

	summary.addEventListener('click', loadSummary);
	symptoms.addEventListener('click', loadSymptoms);
	cause.addEventListener('click', loadCause);
	history.addEventListener('click', loadHistory);
	research.addEventListener('click', loadResearch);

	function loadSummary(){
		var xhr = new XMLHttpRequest();
		// Open file 
		xhr.open('GET', 'ajax/summary.txt', true);

		xhr.onload = function(){
			if (this.status == 200){
				document.getElementById('coviddiv2').innerHTML = this.responseText;
			} else if (this.status == 404){
				document.getElementById('coviddiv2').innerHTML = "Not found";
			}
		}

		xhr.onerror = function(){
			console.log('An error has occured while requesting content');
			alert('An error has occured while requesting content')
		}

		xhr.send();
		changeActive(summary);
	}

	function loadSymptoms(){
		var xhr = new XMLHttpRequest();
		// Open file 
		xhr.open('GET', 'ajax/symptoms.txt', true);

		xhr.onload = function(){
			if (this.status == 200){
				document.getElementById('coviddiv2').innerHTML = this.responseText;
			} else if (this.status == 404){
				document.getElementById('coviddiv2').innerHTML = "Not found";
			}
		}

		xhr.onerror = function(){
			console.log('An error has occured while requesting content');
			alert('An error has occured while requesting content')
		}

		xhr.send();
		changeActive(symptoms);
	}

	function loadCause(){
		var xhr = new XMLHttpRequest();
		// Open file 
		xhr.open('GET', 'ajax/cause.txt', true);

		xhr.onload = function(){
			if (this.status == 200){
				document.getElementById('coviddiv2').innerHTML = this.responseText;
			} else if (this.status == 404){
				document.getElementById('coviddiv2').innerHTML = "Not found";
			}
		}

		xhr.onerror = function(){
			console.log('An error has occured while requesting content');
			alert('An error has occured while requesting content')
		}

		xhr.send();
		changeActive(cause);
	}

	function loadHistory(){
		var xhr = new XMLHttpRequest();
		// Open file 
		xhr.open('GET', 'ajax/history.txt', true);

		xhr.onload = function(){
			if (this.status == 200){
				document.getElementById('coviddiv2').innerHTML = this.responseText;
			} else if (this.status == 404){
				document.getElementById('coviddiv2').innerHTML = "Not found";
			}
		}

		xhr.onerror = function(){
			console.log('An error has occured while requesting content');
			alert('An error has occured while requesting content')
		}

		xhr.send();
		changeActive(history);
	}

	function loadResearch(){
		var xhr = new XMLHttpRequest();
		// Open file 
		xhr.open('GET', 'ajax/research.txt', true);

		xhr.onload = function(){
			if (this.status == 200){
				document.getElementById('coviddiv2').innerHTML = this.responseText;
			} else if (this.status == 404){
				document.getElementById('coviddiv2').innerHTML = "Not found";
			}
		}

		xhr.onerror = function(){
			console.log('An error has occured while requesting content');
			alert('An error has occured while requesting content')
		}

		xhr.send();
		changeActive(research);
	}

	function changeActive(newActive){
		document.getElementsByClassName('active')[0].classList.remove('active');
		newActive.classList.add('active');
	}
}


// Ready state values:
// 0: request not initialized
// 1: server connection estabilished
// 2: request received
// 3: processing request
// 4: request finished and response is ready

// HTTP Statuses
// 200: OK
// 403: Forbidden
// 404: Not found 