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


	/* Social Buttons */
	const fbButton = document.getElementById('fb');
	const igButton = document.getElementById('ig');
	const lkiButton = document.getElementById('lki');
	const gitButton = document.getElementById('git');
	const cfButton = document.getElementById('cf');

	fbButton.onclick = function () {
		window.open("https://www.facebook.com/nicu.ducal");
	}
	igButton.onclick = function () {
		window.open("https://www.instagram.com/nicu_ducal/");
	}
	lkiButton.onclick = function () {
		window.open("https://www.linkedin.com/in/nicolae-ducal-3547591a3/");
	}
	gitButton.onclick = function () {
		window.open("https://www.github.com/nicu-ducal/");
	}
	cfButton.onclick = function () {
		window.open("https://codeforces.com/profile/Catalyst259");
	}


	// For email sending
	function createAlert() {
		let form = this.document.getElementById('email-form')
		let alert = this.document.createElement("DIV")
		alert.className += "alert alert-success";
		alert.innerHTML = 'Your message has been sent <i class="alert-close fas fa-times"></i>'
		console.log(alert);
		form.before(alert);
	}

	function closeAlert() {
		let removeAlert = this.parentNode;
		removeAlert.style.opacity = '0';
		setTimeout(function () { removeAlert.parentNode.removeChild(removeAlert); }, 300);
	}

	this.document.getElementById('email-form').addEventListener('submit', (e) => {
		e.preventDefault();

		const name = this.document.getElementById('name').value.trim();
		const email = this.document.getElementById('email').value.trim();
		const subject = this.document.getElementById('subject').value.trim();
		const text = this.document.getElementById('text').value.trim();

		const data = {
			name,
			email,
			subject,
			text
		}

		this.fetch('/email', {
			method: "POST",
			body: this.JSON.stringify(data),
			headers: {
				'Content-Type': 'application/json'
			}
		})
			.then(res => {
				console.log('Server received the send mail request');
				createAlert();
				let alert = document.getElementsByClassName('alert-close')[0];
				alert.addEventListener('click', closeAlert);
			})
			.catch(err => console.log(err));
	});
}