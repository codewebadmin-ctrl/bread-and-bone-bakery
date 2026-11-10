
// =========================================
// BREAD & BONE - GALLERY FUNCTIONALITY
// =========================================

document.addEventListener("DOMContentLoaded", function () {

    const galleryItems = Array.from(
        document.querySelectorAll(".gallery-item")
    );

    const searchInput = document.getElementById("gallery-search");
    const filterButtons = document.querySelectorAll(".filter-btn");
    const galleryCount = document.getElementById("gallery-count");
    const emptyMessage = document.getElementById("gallery-empty");

    const lightbox = document.getElementById("gallery-lightbox");
    const lightboxImage = document.getElementById("lightbox-image");
    const lightboxCaption = document.getElementById("lightbox-caption");

    const closeButton = document.getElementById("lightbox-close");
    const previousButton = document.getElementById("lightbox-prev");
    const nextButton = document.getElementById("lightbox-next");

    let activeFilter = "all";
    let visibleItems = [];
    let currentIndex = 0;
    let lastFocusedElement = null;

    // Get all gallery items matching the selected filter and search.
    function updateGallery() {

        const searchTerm = searchInput.value.toLowerCase().trim();

        visibleItems = [];

        galleryItems.forEach(function (item) {

            const category = item.dataset.category;
            const caption = item.querySelector("figcaption").textContent;
            const imageAlt = item.querySelector("img").alt;

            const matchesCategory =
                activeFilter === "all" || category === activeFilter;

            const matchesSearch =
                caption.toLowerCase().includes(searchTerm) ||
                imageAlt.toLowerCase().includes(searchTerm);

            const shouldShow = matchesCategory && matchesSearch;

            item.hidden = !shouldShow;

            if (shouldShow) {
                visibleItems.push(item);
            }
        });

        galleryCount.textContent =
            "Showing " + visibleItems.length + " of " +
            galleryItems.length + " photos";

        emptyMessage.hidden = visibleItems.length !== 0;
    }

    // Category filter buttons.
    filterButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            activeFilter = button.dataset.filter;

            filterButtons.forEach(function (filterButton) {
                filterButton.classList.remove("active");
                filterButton.setAttribute("aria-pressed", "false");
            });

            button.classList.add("active");
            button.setAttribute("aria-pressed", "true");

            updateGallery();
        });
    });

    // Live search.
    searchInput.addEventListener("input", updateGallery);

    // Open the enlarged image viewer.
    function openLightbox(index) {

        if (visibleItems.length === 0) return;

        currentIndex = index;
        lastFocusedElement = document.activeElement;

        showLightboxImage();

        lightbox.hidden = false;
        document.body.style.overflow = "hidden";

        closeButton.focus();
    }

    // Display the selected image and caption.
    function showLightboxImage() {

        const selectedItem = visibleItems[currentIndex];

        if (!selectedItem) return;

        const image = selectedItem.querySelector("img");
        const caption = selectedItem.querySelector("figcaption");

        lightboxImage.src = image.src;
        lightboxImage.alt = image.alt;
        lightboxCaption.textContent = caption.textContent;
    }

    // Close the lightbox and restore focus.
    function closeLightbox() {

        lightbox.hidden = true;
        document.body.style.overflow = "";

        if (lastFocusedElement) {
            lastFocusedElement.focus();
        }
    }

    // Show the next image.
    function showNextImage() {

        if (visibleItems.length === 0) return;

        currentIndex = (currentIndex + 1) % visibleItems.length;

        showLightboxImage();
    }

    // Show the previous image.
    function showPreviousImage() {

        if (visibleItems.length === 0) return;

        currentIndex =
            (currentIndex - 1 + visibleItems.length) %
            visibleItems.length;

        showLightboxImage();
    }

    // Make every gallery image clickable.
    galleryItems.forEach(function (item) {

        const image = item.querySelector("img");

        image.addEventListener("click", function () {

            const index = visibleItems.indexOf(item);

            if (index !== -1) {
                openLightbox(index);
            }
        });
    });

    // Lightbox controls.
    closeButton.addEventListener("click", closeLightbox);
    nextButton.addEventListener("click", showNextImage);
    previousButton.addEventListener("click", showPreviousImage);

    // Close when clicking the dark background.
    lightbox.addEventListener("click", function (event) {

        if (event.target === lightbox) {
            closeLightbox();
        }
    });

    // Keyboard controls.
    document.addEventListener("keydown", function (event) {

        if (lightbox.hidden) return;

        if (event.key === "Escape") {
            closeLightbox();
        }

        if (event.key === "ArrowRight") {
            showNextImage();
        }

        if (event.key === "ArrowLeft") {
            showPreviousImage();
        }
    });

    // Initial gallery display.
    filterButtons.forEach(function (button) {
        button.setAttribute(
            "aria-pressed",
            button.classList.contains("active") ? "true" : "false"
        );
    });

    updateGallery();

});
