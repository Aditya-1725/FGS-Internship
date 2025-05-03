document.addEventListener("DOMContentLoaded", function () {
    var typed = new Typed('#typed', {
        strings: ['Web Designer', 'Web Developer', 'Programmer'],
        typeSpeed: 100,
        backSpeed: 50,
        loop: true
    });

    const menuBtn = document.querySelector(".menu-btn");
    const navigation = document.querySelector(".navigation");
    const navigationItems = document.querySelectorAll(".navigation a");

    menuBtn.addEventListener("click", () => {
        menuBtn.classList.toggle("active");
        navigation.classList.toggle("active");
    });

    // Navigation Effects
    window.addEventListener("scroll", function () {
        const header = document.querySelector("header");
        header.classList.toggle("sticky", window.scrollY > 0);
    });

    navigationItems.forEach((navigationItem) => {
        navigationItem.addEventListener("click", (e) => {
            e.preventDefault(); // prevent default anchor jump
            menuBtn.classList.remove("active");
            navigation.classList.remove("active");
    
            const targetId = navigationItem.getAttribute("href");
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: "smooth"
                });
            }
        });
    });
    
    // Project Data
    const projects = {
        "weather": {
            name: "Weather App",
            description: "A simple weather application that fetches live weather data Using a open weather API. It fetch Temperature,Wind Speed, Humidity, Air Speed, with Weather Icon such as Sunny,Cloudy, Rainy weather images which are also fetch using that API only.",
            codeLink: "https://github.com/your-repo/weather-app",
            images: ["./Images/w1.png", "./Images/w2.png","./Images/w3.png","./Images/w4.png"],
            languages: ["HTML", "CSS", "JavaScript", "API (fetch using OpenWeather)"]
        },
        "genius_website": {
            name: "Genius Classes Website",
            description: "A personal Website for Genius Class with user requirements like Login page, Student Profile, Fees Structure, Gallery Section, Enquiry for New Addmission. It is a Complete website with Front-end and Back-end also have a MySql Database to Store and Fetch Data.",
            codeLink: "https://github.com/your-repo/portfolio",
            images: ["./Images/Login.png","./Images/Home.png", "./Images/Fees_Structure.png","./Images/Enquiry.png","./Images/Contact_us.png"],
            languages: ["HTML", "CSS", "JavaScript","PHP","Mysql Database"]
        },
        "task manager": {
            name: "Task Manager App",
            description: "An Android app to manage running applications without root access. It is a very basic project made with Operation System logic and Algorithm. It check background App and list in this Task manager and automatically Remove it after the app Get close. This App is complete made my using Prompt Engineering and some basic knowledge that I know about Android Studio.",
            images: ["./Images/OS1.jpg", "./Images/OS2.jpg", "./Images/OS3.jpg"],
            languages: ["Java", "Android Studio Application"]
        }
    };

    let currentSlide = 0;
    let slideImages = [];

    window.showProject = function (projectKey) {
        const modal = document.getElementById("project-modal");
        const title = document.getElementById("modal-title");
        const description = document.getElementById("modal-description");
        const link = document.getElementById("modal-link");
        const languagesContainer = document.getElementById("modal-languages");
        const carouselSlide = document.getElementById("carousel-slide");

        const project = projects[projectKey];

        if (project) {
            title.innerText = project.name;
            description.innerText = project.description;
            link.href = project.codeLink || "#";
            languagesContainer.innerText = project.languages.join(", ");

            // Show or hide "View Code" button
        if (project.codeLink) {
            link.href = project.codeLink;
            link.style.display = "inline-block";
        } else {
            link.style.display = "none";
        }
        
            // Reset and load new images
            carouselSlide.innerHTML = "";
            slideImages = project.images || [];
            currentSlide = 0;

            slideImages.forEach((src, index) => {
                const img = document.createElement("img");
                img.src = src;
                img.classList.add("slide");
                if (index !== 0) img.style.display = "none";
                carouselSlide.appendChild(img);
            });

            modal.style.display = "flex";
        }
    };

    window.changeSlide = function (direction) {
        const slides = document.querySelectorAll(".slide");
        slides[currentSlide].style.display = "none";
        currentSlide = (currentSlide + direction + slides.length) % slides.length;
        slides[currentSlide].style.display = "block";
    };

    window.closeModal = function () {
        document.getElementById("project-modal").style.display = "none";
    };

    document.getElementById("project-modal").addEventListener("click", function (event) {
        if (event.target === this) {
            closeModal();
        }
    });

    // Dark Mode Toggle
    const toggleButton = document.getElementById('darkModeToggle');

    if (localStorage.getItem('darkMode') === 'enabled') {
        document.body.classList.add('dark-mode');
        toggleButton.innerHTML = '<i class="fa-solid fa-sun"></i>';
    } else {
        toggleButton.innerHTML = '<i class="fa-solid fa-moon"></i>';
    }

    toggleButton.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        if (document.body.classList.contains('dark-mode')) {
            localStorage.setItem('darkMode', 'enabled');
            toggleButton.innerHTML = '<i class="fa-solid fa-sun"></i>';
        } else {
            localStorage.setItem('darkMode', 'disabled');
            toggleButton.innerHTML = '<i class="fa-solid fa-moon"></i>';
        }
    });
}); 
