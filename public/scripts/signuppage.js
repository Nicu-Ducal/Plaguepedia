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


	/* For signup screen */
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
}
