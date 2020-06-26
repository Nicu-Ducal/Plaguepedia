/* Main */
window.onload = function () {
    /* Local storage */
    if (localStorage.getItem("loggedIn") === null) {
        localStorage.setItem("loggedIn", "no");
    }

    /* Login button */
    var logbut = document.getElementsByClassName("button");
    logbut[0].onclick = function () {
        window.location.href = "users/login";
    };
    logbut[1].onclick = function () {
        window.location.href = "users/login";
    };

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
        closeSideBarLinks[i].addEventListener("click", closeSideBar, true);
    }
    for (let i = 0; i < closeByTouching.length; i++) {
        closeByTouching[i].addEventListener("click", closeSideBar, true);
    }

    /* Navigating with arrow keys */
    // 38 up, 40 down
    document.addEventListener('keyup', (e) => {
        var active = document.getElementsByClassName('active-section')[0];
        var newActive;
        if (e.which == 38) {
            newActive = active.previousElementSibling;
            if (newActive == null)
                newActive = active;

            active.classList.remove("active-section");
            newActive.classList.add("active-section");
        } else if (e.which == 40) {
            newActive = active.nextElementSibling;
            if (newActive == null)
                newActive = active;

            active.classList.remove("active-section");
            newActive.classList.add("active-section");
        }

        newActive.scrollIntoView();
        e.preventDefault();
    });

    /* Play videos on hover */
    function onYouTubeIframeAPIReady() {
        var videos = document.getElementsByTagName("iframe");
        var openPlayers = [];
        let currentlyPlaying = null;

        for (let i = 0; i < videos.length; i++) {
            let currentVideoId = videos[i].id;
            openPlayers[currentVideoId] = new YT.Player(currentVideoId);

            videos[i].onmouseover = function (event) {
                var currentHoveredElement = event.target;

                if (currentlyPlaying != null) {
                    openPlayers[currentlyPlaying].pauseVideo();
                }
                openPlayers[currentHoveredElement.id].playVideo();
                currentlyPlaying = currentHoveredElement.id;
            };
        }
    }
    onYouTubeIframeAPIReady();

};
