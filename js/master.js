// ******************************* Global Variables *******************************

// Random Background Option
let backgroundOption = true;

// Variable To Control The Background Interval
let backgroundInterval;


// ******************************* Global Functions *******************************

// Handle Active State
function handleActive(ha) {

    // Remove Active Class From All Childrens
    ha.target.parentElement.querySelectorAll(".active").forEach(element => {

        element.classList.remove("active");

    });

    //Add Active Class On Self
    ha.target.classList.add("active");

}


// ******************************* Actions Of Nav Links and Right Bullets *******************************

// Select All Bullets
const allBullets = document.querySelectorAll(".nav-bullets .bullet");

// Select All Links
const alllinks = document.querySelectorAll(".header-links a");

// Clickable Function And Scrolling For Bullets
function navLinksAndBullets(elements) {

    elements.forEach(element => {

        element.addEventListener("click", e => {

            e.preventDefault();

            document.querySelector(e.target.dataset.section).scrollIntoView({

                behavior: "smooth"

            });

        });

    });

}

navLinksAndBullets(allBullets);
navLinksAndBullets(alllinks);


// ******************************* Settings Box *******************************

// +++++++++++++++++++++++ Local Storage +++++++++++++++++++++++

// ---------- Check If There's Local Storage Color Option ----------
let mainColors = localStorage.getItem("color_option");

if (mainColors !== null) {
    document.documentElement.style.setProperty('--main--color', mainColors);

    // Remove Active Class From All Colors List Item
    document.querySelectorAll(".colors-list li").forEach(element => {
        element.classList.remove("active");

        // Add Active Class On Element With Data-Color === Local Storage Item
        if (element.dataset.color === mainColors) {

            // Add Active Class
            element.classList.add("active");

        }
    });
}

// ---------- Check If There's Local Storage Random Background Option ----------
let backgroundLocalItem = localStorage.getItem("background_option");

// Check If Random Background Local Storage Is Not Empty
if (backgroundLocalItem !== null) {

    // Remove Active Class From All Spans
    document.querySelectorAll(".randomBackground-content span").forEach(element => {

        element.classList.remove("active");

    });

    if (backgroundLocalItem === 'true') {

        backgroundOption = true;

        document.querySelector(".randomBackground-content .yes").classList.add("active");

    } else {

        backgroundOption = false;

        document.querySelector(".randomBackground-content .no").classList.add("active");

    }
}

// ---------- Check If There's Local Storage Bullets Option ----------
let bulletLocalStorage = localStorage.getItem("bullets-option");

// Check If Bullets Local Storage Is Not Empty
if (bulletLocalStorage !== null) {

    // Remove Active Class From All Spans
    document.querySelectorAll(".bullets-content span").forEach(spans => {

        spans.classList.remove("active");

    });

    if (bulletLocalStorage === 'block') {

        document.querySelector(".nav-bullets").style.display = 'block';

        document.querySelector(".bullets-content .yes").classList.add("active");

    } else {

        document.querySelector(".nav-bullets").style.display = 'none';

        document.querySelector(".bullets-content .no").classList.add("active");

    }

}

// +++++++++++++++++++++++ Items +++++++++++++++++++++++

// ---------- Toggle Spin Class On Icon ----------
document.querySelector(".settings-icon i").onclick = function() {

    // Toggle Class Fa-spin For Rotation on Self
    this.classList.toggle("fa-spin");

    // Toggle Class Open On Main Settings Box
    document.querySelector(".settings-box").classList.toggle("open");

};


// ---------- Switch Colors ----------
const colorsLi = document.querySelectorAll(".colors-list li");

// Loop On All List Items
colorsLi.forEach(li => {

    // Click On Every List Items
    li.addEventListener("click", (e) => {

        // Set Color On Root
        document.documentElement.style.setProperty('--main--color', e.target.dataset.color);

        // Set Color On Local Storage
        localStorage.setItem("color_option", e.target.dataset.color);

        // Calling Handle Active Function
        handleActive(e);

    });
});


// ---------- Switch Random Background Option ----------
const randomBackElement = document.querySelectorAll(".randomBackground-content span");

// Loop On All List Items
randomBackElement.forEach(span => {

    // Click On Every List Items
    span.addEventListener("click", (e) => {

        // Calling Handle Active Function
        handleActive(e);

        // To Turn On - Off The Random Background
        if (e.target.dataset.background === 'yes') {

            backgroundOption = true;
            randomizeImages();

            // Adding Random Background To Local Storage
            localStorage.setItem("background_option", true);

        } else {

            backgroundOption = false;
            clearInterval(backgroundInterval);

            // Removing Random Background To Local Storage
            localStorage.setItem("background_option", false);

        }
    });
});


// ---------- Switch Bullets Option ----------
let bulletSpan = document.querySelectorAll(".bullets-content span");
let bulletContainer = document.querySelector(".nav-bullets");

// Loop On All Spans
bulletSpan.forEach(span => {

    // Click On Every Spans
    span.addEventListener("click", (e) => {

        // To Show - Hide The Bullets
        if (span.dataset.background === 'show') {

            bulletContainer.style.display = 'block';

            // Adding Bullets To Local Storage
            localStorage.setItem("bullets-option", 'block');

        } else {

            bulletContainer.style.display = 'none';

            // Removing Bullets From Local Storage
            localStorage.setItem("bullets-option", 'none');

        }

        // Calling Handle Active Function
        handleActive(e);

    });

});


// ---------- Reset Option ----------
document.querySelector(".reset-option").onclick = function() {

    // To Clear Local Storage
    // localStorage.clear();
    // OR
    localStorage.removeItem("color_option");
    localStorage.removeItem("background_option");
    localStorage.removeItem("bullets-option");

    // To Reload Window
    window.location.reload();

};


// ******************************* Landing Page *******************************

// Select Landing Page Element
let landingPage = document.querySelector(".landing-page");

// Get Array Of Images
let landimagesArray = ["bg/1.jpg", "bg/2.png", "bg/3.jpg", "bg/4.png", "bg/5.jpg"],
    landimagesArrayLength = landimagesArray.length;

// Fuction To Randomize Images
function randomizeImages() {
    if (backgroundOption === true) {

        backgroundInterval = setInterval(() => {

            // Get Random Number
            let randomNumber = Math.floor(Math.random() * landimagesArrayLength);

            // Change Background Images URL
            landingPage.style.backgroundImage = 'url("images/' + landimagesArray[randomNumber] + '")';

        }, 5000);

    }
}
randomizeImages();


// ******************************* Progress Bar *******************************

// Select Skills Selector
let ourSkills = document.querySelector(".our-skills");

window.onscroll = function() {

    // Skills Offset Top
    let skillsOffsetTop = ourSkills.offsetTop;

    // Skills Outer Height
    let skillsOuterHeight = ourSkills.offsetHeight;

    // Window Height
    let windowHeight = this.innerHeight;

    // Window Scroll Top
    let windowScrollTop = this.pageYOffset;

    if (windowScrollTop > (skillsOffsetTop + skillsOuterHeight - windowHeight)) {

        let allSkills = document.querySelectorAll(".skill-box .skill-progress span");

        allSkills.forEach(skill => {

            skill.style.width = skill.dataset.progress;

        });
    }
};


// ******************************* Popup *******************************

// Create Popup With The Image
let ourGallery = document.querySelectorAll(".gallery img");

ourGallery.forEach(image => {
    image.addEventListener('click', (e) => {

        // Create Overlay Element
        let overlay = document.createElement("div");

        // Add Class To Overlay
        overlay.className = 'popup-overlay';

        // Append Overlay To The Body
        document.body.appendChild(overlay);

        // Create The Popup Box
        let popupBox = document.createElement("div");

        // Add Class To Popup Box
        popupBox.className = 'popup-box';

        // Condition To Add Alt Text If Founded
        if (image.alt !== null) {

            // Create Heading
            let imageHeading = document.createElement("h3");

            // Create Text For Heading
            let imageText = document.createTextNode(image.alt);

            // Append The Text To The Heading
            imageHeading.appendChild(imageText);

            // Append The Heading To The Popup Box
            popupBox.appendChild(imageHeading);
        }

        // Create The Popup Image
        let popupImage = document.createElement("img");

        // Set Image Source
        popupImage.src = image.src;

        // Add Image To Popup Box
        popupBox.appendChild(popupImage);

        // Append The Popup Box To Body
        document.body.appendChild(popupBox);

        // Create The Close Span
        let closeButton = document.createElement("span");

        // Create The Close Button Text
        let closeButtonText = document.createTextNode("X");

        // Append Text To Close Button
        closeButton.appendChild(closeButtonText);

        // Add Class To Close Button
        closeButton.className = 'close-button';

        // Add Close Button To The Popup Box
        popupBox.appendChild(closeButton);

    });
});

// Close Popup
document.addEventListener("click", function(o) {

    if (o.target.className == 'close-button') {

        // Remove The Current Popup
        o.target.parentNode.remove();

        // Remove Overlay
        document.querySelector(".popup-overlay").remove();

    }
});


// ******************************* Toggle Menu *******************************
let togglebtn = document.querySelector(".toggle-menu");
let tlinks = document.querySelector(".header-links");

togglebtn.onclick = function(e) {

    // Stop Propagation On Toggle Button
    e.stopPropagation();

    // Toggle Class "menu-active" On Button
    this.classList.toggle("menu-active");

    // Toggle Class "open" On Links
    tlinks.classList.toggle("open");

};

tlinks.onclick = function(e) {

    // Stop Propagation On Menu
    e.stopPropagation();

};

// Click Anywhere Outside Menu And Toggle Button
document.addEventListener("click", (e) => {

    // Check If Click On Toggle Button Or Container Of Links
    if (e.target !== togglebtn && e.target !== tlinks) {

        // Check If Menu Is Open
        if (tlinks.classList.contains("open")) {
            // Toggle Class "menu-active" On Button
            togglebtn.classList.toggle("menu-active");

            // Toggle Class "open" On Links
            tlinks.classList.toggle("open");

        }

    }
});