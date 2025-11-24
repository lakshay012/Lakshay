document.addEventListener('DOMContentLoaded', () => {
    // --- 1. LOADER ---
    const preloader = document.getElementById('preloader');
    if (preloader) {
        window.addEventListener('load', () => {
            setTimeout(() => {
                preloader.classList.add('fade-out');
                setTimeout(() => { preloader.style.display = 'none'; }, 500);
            }, 2000);
        });
    }

    // --- 2. NAVIGATION ---
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.page-section');
    const observerElements = document.querySelectorAll('.reveal');

    function showPage(pageId) {
        sections.forEach(sec => sec.classList.remove('active'));
        navLinks.forEach(link => link.classList.remove('active'));

        const activeSection = document.getElementById(pageId);
        const activeLink = document.querySelector(`.nav-link[data-page="${pageId}"]`);

        if (activeSection) activeSection.classList.add('active');
        if (activeLink) activeLink.classList.add('active');
    }
    // =========================================
    window.scrollTo(0, 0);
    if ('scrollRestoration' in history) {
        history.scrollRestoration = 'manual';
    }
    let initialPage = 'about';
    history.replaceState(null, null, ' ');
    showPage(initialPage);
    // ==========================================
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const pageId = e.target.getAttribute('data-page');
            window.location.hash = pageId; 
            showPage(pageId);
        });
    });

    // --- 3. SCROLL ANIMATION ---
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => { entry.target.classList.add('active'); }, index * 100);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    observerElements.forEach(el => observer.observe(el));

    // --- 4. PROJECT FILTERING ---
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectItems = document.querySelectorAll('.project-item');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const filterValue = btn.getAttribute('data-filter');

            projectItems.forEach(item => {
                const category = item.getAttribute('data-category');
                if (filterValue === 'all' || (category && category.includes(filterValue))) {
                    item.style.display = 'block';
                    item.classList.add('animate-pop');
                    setTimeout(() => item.classList.remove('animate-pop'), 400);
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
});

// =============================================================
//  MODAL FUNCTIONS (GLOBAL SCOPE)
// =============================================================

window.openModal = function(element) {
    console.log("Open Modal Clicked!"); // DEBUG CHECK

    // Get the elements dynamically when clicked
    const modal = document.getElementById('projectModal');
    const modalImg = document.getElementById('modalImage');
    const modalTitle = document.getElementById('modalTitle');
    const modalDesc = document.getElementById('modalDesc');
    const modalTech = document.getElementById('modalTech');
    const modalLink = document.getElementById('modalLink');

    // Safety Check: Does the modal exist in HTML?
    if (!modal) {
        alert("Error: Modal HTML not found!");
        return;
    }

    // 1. Get data from button
    const img = element.getAttribute('data-image');
    const title = element.getAttribute('data-title');
    const desc = element.getAttribute('data-desc');
    const tech = element.getAttribute('data-tech');
    const link = element.getAttribute('data-link');

    // 2. Fill Content
    if(modalImg) modalImg.src = img;
    if(modalTitle) modalTitle.innerText = title;
    if(modalDesc) modalDesc.innerText = desc;
    if(modalLink) modalLink.href = link;

    // 3. Create Tech Tags
    if(modalTech) {
        modalTech.innerHTML = ''; 
        if(tech) {
            const techArray = tech.split(',');
            techArray.forEach(t => {
                const span = document.createElement('span');
                span.className = 'px-3 py-1 text-xs font-medium bg-purple-500/20 text-purple-300 rounded-full border border-purple-500/30';
                span.innerText = t.trim();
                modalTech.appendChild(span);
            });
        }
    }

    // 4. Show Modal
    modal.classList.remove('hidden');
    setTimeout(() => {
        modal.classList.add('active');
    }, 10);
    document.body.style.overflow = 'hidden'; // Stop background scrolling
}

window.closeModal = function() {
    const modal = document.getElementById('projectModal');
    if(modal) {
        modal.classList.remove('active');
        setTimeout(() => {
            modal.classList.add('hidden');
            document.body.style.overflow = 'auto';
        }, 300);
    }
}

// Close on Outside Click
window.addEventListener('click', (e) => {
    const modal = document.getElementById('projectModal');
    if (modal && e.target === modal && !modal.classList.contains('hidden')) {
        window.closeModal();
    }
});

// Close on Escape Key
document.addEventListener('keydown', (e) => {
    const modal = document.getElementById('projectModal');
    if (e.key === 'Escape' && modal && !modal.classList.contains('hidden')) {
        window.closeModal();
    }
});