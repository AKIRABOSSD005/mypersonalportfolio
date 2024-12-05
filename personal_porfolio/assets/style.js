// Select all navbar links
const navLinks = document.querySelectorAll('.navbar-nav .nav-link');

// Function to remove 'active' class and 'aria-current="page"' from all links
function removeActiveClass() {
    navLinks.forEach(link => {
        link.classList.remove('active');
        link.setAttribute('aria-current', 'false'); // Remove the aria-current attribute
    });
}

// Function to add 'active' class and 'aria-current="page"' to the link based on the container in view
function setActiveLink() {
    const containers = document.querySelectorAll('[id]'); // Select all elements with an id (your containers)
    let currentContainer = '';

    // Loop through all containers to find the one in view
    containers.forEach(container => {
        const rect = container.getBoundingClientRect();
        
        // Check if the container is in the viewport (e.g., center of the viewport)
        if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
            currentContainer = container.getAttribute('id');
        }
    });

    // Update the active class and aria-current for the corresponding link
    navLinks.forEach(link => {
        // Check if the link's href matches the container ID in the viewport
        if (link.getAttribute('href').includes(currentContainer)) {
            removeActiveClass(); // First, remove active class and aria-current from all links
            link.classList.add('active'); // Add active class to the current link
            link.setAttribute('aria-current', 'page'); // Set aria-current="page" for the active link
        }
    });
}

// Debounce function to limit the frequency of the scroll event
let debounceTimeout;
function debounceSetActiveLink() {
    clearTimeout(debounceTimeout);
    debounceTimeout = setTimeout(setActiveLink, 100); // Adjust the delay time as needed (100ms)
}

// Listen for scroll event to update the active link
window.addEventListener('scroll', debounceSetActiveLink);

// Set the active class and aria-current on page load based on the current URL (optional for initial page state)
document.addEventListener('DOMContentLoaded', setActiveLink);

// Ensure the active link is set when a nav link is clicked
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        removeActiveClass();
        link.classList.add('active');
        link.setAttribute('aria-current', 'page');
    });
});