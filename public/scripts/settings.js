/* Main */
window.onload = function () {
    /* Return button */
    var logout = document.getElementsByClassName('button');
    logout[0].onclick = function () {
        window.location.href = '/users/logout';
    }
    logout[1].onclick = function () {
        window.location.href = '/users/logout';
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


    // Task 3 - Captcha
    var captchaCode = "";
    function captcha() {
        captchaCode = "";
        const alfabetAndNumbers = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        var chars = [];
        for (let i = 0; i < 6; i++) {
            chars.push(alfabetAndNumbers[Math.floor(Math.random() * alfabetAndNumbers.length)]);
        }

        var canvas = document.getElementById('canvas');
        var context = canvas.getContext('2d');
        fonts = ["50px Arial", "50px Monospace", "50px Roboto", "50px Times New Roman", "50px Times", "50px Courier New"]
        colors = ["red", "green", "blue", "black", "orange", "purple"]
        weight = ["normal normal normal ", "italic normal normal ", "normal normal bold ", "italic normal bold "];
        angles = [0, -0.05, -0.1, -0.2, 0.05, 0.1, 0.2]


        context.clearRect(0, 0, canvas.width, canvas.height);
        for (let i = 0; i < 6; i++) {
            context.font = weight[Math.floor(Math.random() * weight.length)] + fonts[i];
            context.fillStyle = colors[Math.floor(Math.random() * colors.length)];
            let x = i * 40 + Math.floor(Math.random() * 25);
            let y = Math.floor(Math.random() * (canvas.height / 3)) + canvas.height / 3;
            context.translate(x, y);
            context.rotate(Math.PI * angles[Math.floor(Math.random() * angles.length)]);
            context.fillText(chars[i], 0, 0);
            captchaCode += chars[i];
            context.setTransform(1, 0, 0, 1, 0, 0);
        }

        //Drawing lines
        context.lineWidth = 3;
        context.moveTo(30, 30);
        context.lineTo(90, 90);
        context.moveTo(160, 20);
        context.lineTo(0, 130);
        context.moveTo(130, 130);
        context.lineTo(190, 190);
        context.moveTo(260, 120);
        context.lineTo(100, 230);
        context.stroke();
    }

    function checkCaptcha() {
        var input = document.getElementById('input-captcha').value;
        if (captchaCode == input) {
            return 1;
        } else {
            alert("Wrong Captcha. Try again");
            return 0;
        }
    }


    // Ajax
    var name = document.getElementById('name');
    var email = document.getElementById('email');
    var password = document.getElementById('password');
    var birthday = document.getElementById('birthday');

    var data;
    async function getContent() {
        const response = await fetch('/public/ajax/settings.json');
        data = await response.json();
        console.log(data["name"]);
    }
    getContent();

    //captcha();
    // First name, last name
    function changeName() {
        document.getElementById('content').innerHTML = data["name"];
        var first = document.getElementById('first');
        var last = document.getElementById('last');
        captcha();
        // On reload
        document.getElementById('refresh').onclick = captcha;
        document.getElementById('submit-captcha').addEventListener('click', function () {
            let firstVal = first.value;
            let lastVal = last.value;

            if (firstVal == 'Enter the new First name' && lastVal == 'Enter the new Last name') {
                alert('No changes have been made');
                captcha();
            } else {
                if (checkCaptcha()) {
                    alert('Good');
                } else {
                    captcha();
                }
            }
        });
    }

    name.onclick = changeName;


}
