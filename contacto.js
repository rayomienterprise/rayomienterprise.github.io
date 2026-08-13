document.addEventListener("DOMContentLoaded", function () {

    const form = document.getElementById("contactForm");
    const formMessage = document.getElementById("formMessage");
    const submitButton = form.querySelector(".btn-submit");

    // ==========================================
    // MENÚ RESPONSIVO
    // ==========================================

    const menuToggle = document.getElementById("menuToggle");
    //const navMenu = document.getElementById("navMenu");
    const navMenu = document.getElementById("mainNav");

    if (menuToggle && navMenu) {

        menuToggle.addEventListener("click", function () {

            navMenu.classList.toggle("active");

            const icon = menuToggle.querySelector("i");

            if (navMenu.classList.contains("active")) {

                icon.classList.remove("fa-bars");
                icon.classList.add("fa-xmark");

            } else {

                icon.classList.remove("fa-xmark");
                icon.classList.add("fa-bars");

            }

        });

    }


    // ==========================================
    // VALIDACIÓN DEL FORMULARIO
    // ==========================================

    if (form) {

        form.addEventListener("submit", function (event) {

            // HTML5 realiza la validación automáticamente.
            if (!form.checkValidity()) {

                event.preventDefault();

                form.reportValidity();

                return;

            }


            // Cambiar apariencia del botón
            submitButton.disabled = true;

            submitButton.querySelector("span").textContent =
                "Enviando...";

            submitButton.querySelector("i").className =
                "fa-solid fa-spinner fa-spin";


            formMessage.textContent =
                "Enviando su mensaje...";

            formMessage.className =
                "form-message loading";

        });

    }


    // ==========================================
    // MENSAJE DESPUÉS DEL ENVÍO
    // ==========================================

    const params = new URLSearchParams(
        window.location.search
    );

    if (params.get("enviado") === "1") {

        formMessage.textContent =
            "¡Mensaje enviado correctamente! Gracias por contactarnos. Nos comunicaremos contigo lo antes posible.";

        formMessage.className =
            "form-message success";

        form.reset();

        // Limpiar parámetro de la URL
        window.history.replaceState(
            {},
            document.title,
            window.location.pathname
        );

    }

});
