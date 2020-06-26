/* For changing images */
var images = new Array();
images[0] = "/public/images/authentication.svg";
images[1] = "/public/images/two_factor_authentication.svg";
images[2] = "/public/images/mobile_login.svg";
images[3] = "/public/images/profile_screen.svg"

var i = 0;
const nextImage = function () {
	let img = document.getElementById('loginimg');
	img.classList.add('toggle');

	setTimeout(() => {
		img.style.visibility = 'hidden';
		img.src = images[i];
		if (i < 3) {
			i++;
		} else {
			i = 0;
		}

		setTimeout(() => {
			img.style.visibility = '';
			img.classList.remove('toggle');
		}, 200)
	}, 500)

	setTimeout(nextImage, 5500);
}


/* Main */
window.onload = function () {
	/* Return button */
	var retbut = document.getElementsByClassName('button');
	retbut[0].onclick = function () {
		window.history.back();
	}
	retbut[1].onclick = function () {
		window.history.back();
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

	/* Photo changing */
	setTimeout(nextImage, 5500);


	// Alerts closing
	let alerts = document.querySelectorAll('.alert-close');

	function closeAlert() {
		let removeAlert = this.parentNode;
		removeAlert.style.opacity = '0';
		setTimeout(function () { removeAlert.parentNode.removeChild(removeAlert); }, 300);
	}

	for (let i = 0; i < alerts.length; i++) {
		alerts[i].addEventListener('click', closeAlert);
	}


	/* For login screen */
	const inp = document.querySelectorAll('.input');

	inp.forEach(input => {
		let parent = input.parentNode.parentNode;
		if (input.value != '') {
			parent.classList.add('focus');
		}
	});

	function focusFunction() {
		let parent = this.parentNode.parentNode;
		parent.classList.add('focus');
	}

	function blurFunction() {
		let parent = this.parentNode.parentNode;
		if (this.value == '') {
			parent.classList.remove('focus');
		}
	}

	inp.forEach(input => {
		input.addEventListener('focus', focusFunction);
		input.addEventListener('blur', blurFunction);
	});

	var signUpButton = document.getElementById('signup');
	signUpButton.onclick = function () {
		window.location.href = "register";
	}

	/* Getting IP */
	let ipify = 'http://api.ipify.org/?format=json';
	fetch(ipify)
		.then(res => res.json())
		.then((data) => {
			console.log(data.ip);
			this.document.getElementById('ip-keeper').value = data.ip;
		});
}
