document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.page-section');
    const observerElements = document.querySelectorAll('.reveal');

    // --- Tab Navigation ---
    function showPage(pageId) {
        sections.forEach(section => {
            section.classList.remove('active');
        });
        navLinks.forEach(link => {
            link.classList.remove('active');
        });

        const activeSection = document.getElementById(pageId);
        const activeLink = document.querySelector(`.nav-link[data-page="${pageId}"]`);

        if (activeSection) {
            activeSection.classList.add('active');
        }
        if (activeLink) {
            activeLink.classList.add('active');
        }
    }

    // Set default page
    let initialPage = 'about';
    // Check hash on load
    if (window.location.hash) {
        const pageId = window.location.hash.substring(1);
        // Check if the element exists before setting it
        if (document.getElementById(pageId)) {
            initialPage = pageId;
        }
    }
    showPage(initialPage);
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const pageId = e.target.getAttribute('data-page');
            window.location.hash = pageId; // Set hash for bookmarking
            showPage(pageId);
        });
    });

    // --- Scroll Animations ---
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Add a staggered delay
                setTimeout(() => {
                    entry.target.classList.add('active');
                }, index * 100); 
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });

    observerElements.forEach(el => {
        observer.observe(el);
    });


// /-------------------------sort by---------------------
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectItems = document.querySelectorAll('.project-item');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // 1. Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            // 2. Add active class to clicked button
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            projectItems.forEach(item => {
                // Get the categories for this item (e.g. "python-ml sql")
                const category = item.getAttribute('data-category');

                // Check if we should show this item
                if (filterValue === 'all' || (category && category.includes(filterValue))) {
                    item.style.display = 'block';
                    // Add animation for smooth appearance
                    item.classList.add('animate-pop');
                    // Remove animation class after it plays so it can replay later
                    setTimeout(() => item.classList.remove('animate-pop'), 400);
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });

});