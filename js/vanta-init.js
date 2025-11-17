document.addEventListener('DOMContentLoaded', () => {
    VANTA.NET({
        el: "#vanta-bg", // 1. Targets the ID we added to the <body>
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        minHeight: 200.00,
        minWidth: 200.00,
        scale: 1.00,
        scaleMobile: 1.00,
        color: 0x7c3aed, // 2. Changed to your purple theme color
        backgroundColor: 0x0f0f0f // 3. Changed to your dark background color

    });
});