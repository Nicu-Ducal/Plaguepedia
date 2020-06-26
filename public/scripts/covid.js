/* Main */
window.onload = function () {
	/* Login button */
	var logbut = document.getElementsByClassName("button");
	logbut[0].onclick = function () {
		window.location.href = "/users/login";
	}
	logbut[1].onclick = function () {
		window.location.href = "/users/login";
	}

	/* Side bar */
	function toggleSideBar() {
		let getSidebar = document.querySelector(".menu-sidebar");
		let getSidebarUl = document.querySelector(".menu-sidebar ul");
		let getSidebarLinks = document.querySelectorAll(".menu-sidebar ul li");
		let getSidebarClose = document.querySelector(".closeSide");
		let toBlurHeader = document.getElementsByTagName("header");
		let toBlurSections = document.querySelectorAll("aside ~ *");

		toBlurHeader[0].style.filter = "brightness(0.3)";
		for (let i = 0; i < toBlurSections.length; i++) {
			toBlurSections[i].style.filter = "brightness(0.3)";
		}

		getSidebarUl.style.visibility = "visible";
		getSidebar.style.width = "300px";
		/*getSidebar.style.boxShadow = "5px 10px 8px 10px #888888";*/

		getSidebarClose.style.opacity = "1";
		for (let i = 0; i < getSidebarLinks.length; i++) {
			getSidebarLinks[i].style.opacity = "1";
		}

		toggleAsideStatus = true;
	}

	function closeSideBar() {
		let getSidebar = document.querySelector(".menu-sidebar");
		let getSidebarUl = document.querySelector(".menu-sidebar ul");
		let getSidebarLinks = document.querySelectorAll(".menu-sidebar ul li");
		let getSidebarClose = document.querySelector(".closeSide");
		let toBlurHeader = document.getElementsByTagName("header");
		let toBlurSections = document.querySelectorAll("aside ~ *");

		getSidebarClose.style.opacity = "0";
		for (let i = 0; i < getSidebarLinks.length; i++) {
			getSidebarLinks[i].style.opacity = "0";
		}

		/*getSidebar.style.boxShadow = "initial";*/
		getSidebar.style.width = "0px";
		getSidebarUl.style.visibility = "hidden";

		toBlurHeader[0].style.filter = "initial";
		for (let i = 0; i < toBlurSections.length; i++) {
			toBlurSections[i].style.filter = "initial";
		}

		toggleAsideStatus = false;
	}

	var toggleAsideStatus = false;
	var toggleButton = document.querySelector("#toggle i");
	var closeSideBarButton = document.querySelector(".closeSide i");
	var closeSideBarLinks = document.querySelectorAll(".menu-sidebar ul li");
	var closeByTouching = document.querySelectorAll("aside ~ *");


	toggleButton.onclick = toggleSideBar;
	closeSideBarButton.onclick = closeSideBar;
	for (let i = 0; i < closeSideBarLinks.length; i++) {
		closeSideBarLinks[i].addEventListener('click', closeSideBar);
	}
	for (let i = 0; i < closeByTouching.length; i++) {
		closeByTouching[i].addEventListener('click', closeSideBar);
	}


	// Title animation - Task 2.3
	var title = document.getElementById('titlu').innerHTML;
	var newTitle = "";
	for (let i = 0; i < title.length; i++) {
		newTitle += '<span id="t' + i.toString() + '" class="off">' + title[i] + '</span>';
	}
	document.getElementById('titlu').innerHTML = newTitle;

	let i = 0; let j = title.length - 1;
	function animateTitle() {
		if (document.getElementById('t' + i.toString()).innerHTML == " ") i++;
		if (document.getElementById('t' + j.toString()).innerHTML == " ") j--;
		if (i < j) {
			document.getElementById('t' + i.toString()).classList.remove('off');
			document.getElementById('t' + i.toString()).classList.add('on');
			document.getElementById('t' + j.toString()).classList.remove('off');
			document.getElementById('t' + j.toString()).classList.add('on');
			i++, j--;
			setTimeout(animateTitle, 100);
		} else if (i == j) {
			document.getElementById('t' + i.toString()).classList.remove('off');
			document.getElementById('t' + i.toString()).classList.add('on');
		}
	}
	setTimeout(animateTitle, 100);

	/* AJAX */
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

	function loadSummary() {
		var xhr = new XMLHttpRequest();
		// Open file 
		xhr.open('GET', 'ajax/summary.txt', true);

		xhr.onload = function () {
			if (this.status == 200) {
				// Task 2.7
				document.getElementById('coviddiv2').innerHTML = this.responseText;
				const text = document.getElementById('text').innerHTML.split(" ");
				var newText = "";
				var iter = 0;
				for (let i = 0; i < text.length; i++) {
					if (text[i] == '<br><br>' || text[i] == '<b>' || text[i] == '</b>') {
						newText += " " + text[i] + " ";
						continue;
					}
					for (let j = 0; j < text[i].length; j++) {
						newText += '<span id="p' + iter.toString() + '" class="textoff">' + text[i][j] + '</span>';
						iter++;
					}
					newText += " ";
				}
				document.getElementById('text').innerHTML = newText;
				var idx = [];
				for (let i = 0; i < iter; i++)
					idx.push('p' + i.toString());
				var i = Math.floor(Math.random() * (idx.length - 1));

				function animateText() {
					if (idx.length != 0) {
						document.getElementById(idx[i]).classList.remove('textoff');
						document.getElementById(idx[i]).classList.add('texton');
						let del = idx.splice(i, 1);
						i = Math.floor(Math.random() * (idx.length - 1));
						setTimeout(animateText, 40);
					}
				}
				setTimeout(animateText, 40);
				// This is the Task 2.2
				/*var textP = document.getElementById('text');
				const text = textP.innerHTML.split(" ");
				textP.innerHTML = "";
				var i = 0;
				const speed = 100;
				function textWriter() {
					if (i < text.length) {
						textP.innerHTML += text[i] + " ";
						i++;
						setTimeout(textWriter, speed);
					}
				}
				textWriter();*/
			} else if (this.status == 404) {
				document.getElementById('coviddiv2').innerHTML = "Not found";
			}
		}

		xhr.onerror = function () {
			console.log('An error has occured while requesting content');
			alert('An error has occured while requesting content')
		}

		xhr.send();
		changeActive(summary);
	}

	function loadSymptoms() {
		var xhr = new XMLHttpRequest();
		// Open file 
		xhr.open('GET', 'ajax/symptoms.txt', true);

		xhr.onload = function () {
			if (this.status == 200) {
				document.getElementById('coviddiv2').innerHTML = this.responseText;
				const text = document.getElementById('text').innerHTML.split(" ");
				var newText = "";
				var iter = 0;
				for (let i = 0; i < text.length; i++) {
					if (text[i] == '<br><br>') {
						newText += " " + "<br><br>" + " ";
						continue;
					}
					newText += '<span id="s' + iter.toString() + '" class="wordsoff">' + text[i] + " " + '</span>';
					iter++;
				}

				document.getElementById('text').innerHTML = newText;
				var i = 0;
				const speed = 100;
				function textWriter() {
					if (i < iter) {
						document.getElementById("s" + i.toString()).classList.remove('wordsoff');
						document.getElementById("s" + i.toString()).classList.add('wordson');
						i++;
						setTimeout(textWriter, speed);
					}
				}
				textWriter();
			} else if (this.status == 404) {
				document.getElementById('coviddiv2').innerHTML = "Not found";
			}
		}

		xhr.onerror = function () {
			console.log('An error has occured while requesting content');
			alert('An error has occured while requesting content')
		}

		xhr.send();
		changeActive(symptoms);
	}

	function loadCause() {
		var xhr = new XMLHttpRequest();
		// Open file 
		xhr.open('GET', 'ajax/cause.txt', true);

		xhr.onload = function () {
			if (this.status == 200) {
				document.getElementById('coviddiv2').innerHTML = this.responseText;
				var textP = document.getElementById('text');
				const text = textP.innerHTML.split(" ");
				textP.innerHTML = "";
				var i = 0;
				const speed = 100;
				function textWriter() {
					if (i < text.length) {
						textP.innerHTML += text[i] + " ";
						i++;
						setTimeout(textWriter, speed);
					}
				}
				textWriter();
			} else if (this.status == 404) {
				document.getElementById('coviddiv2').innerHTML = "Not found";
			}
		}

		xhr.onerror = function () {
			console.log('An error has occured while requesting content');
			alert('An error has occured while requesting content')
		}

		xhr.send();
		changeActive(cause);
	}

	function loadHistory() {
		var xhr = new XMLHttpRequest();
		// Open file 
		xhr.open('GET', 'ajax/history.txt', true);

		xhr.onload = function () {
			if (this.status == 200) {
				document.getElementById('coviddiv2').innerHTML = this.responseText;
			} else if (this.status == 404) {
				document.getElementById('coviddiv2').innerHTML = "Not found";
			}
		}

		xhr.onerror = function () {
			console.log('An error has occured while requesting content');
			alert('An error has occured while requesting content')
		}

		xhr.send();
		changeActive(history);
	}

	function loadResearch() {
		var xhr = new XMLHttpRequest();
		// Open file 
		xhr.open('GET', 'ajax/research.txt', true);

		xhr.onload = function () {
			if (this.status == 200) {
				document.getElementById('coviddiv2').innerHTML = this.responseText;
			} else if (this.status == 404) {
				document.getElementById('coviddiv2').innerHTML = "Not found";
			}
		}

		xhr.onerror = function () {
			console.log('An error has occured while requesting content');
			alert('An error has occured while requesting content')
		}

		xhr.send();
		changeActive(research);
	}

	function changeActive(newActive) {
		document.getElementsByClassName('active')[0].classList.remove('active');
		newActive.classList.add('active');
	}
}