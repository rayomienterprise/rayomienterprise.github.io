document.addEventListener("DOMContentLoaded", function () {

    const form = document.getElementById("contactForm");
    const formMessage = document.getElementById("formMessage");
    const submitButton = form ? form.querySelector(".btn-submit") : null;


    // ==========================================
    // MENÚ RESPONSIVO
    // ==========================================

    const menuToggle = document.getElementById("menuToggle");
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
    // MENSAJE DE CONFIRMACIÓN DESPUÉS DEL ENVÍO
    // ==========================================

    const params = new URLSearchParams(window.location.search);

    if (params.get("enviado") === "1" && formMessage) {

        formMessage.textContent =
            "¡Mensaje enviado correctamente! Gracias por contactarnos. Nos comunicaremos contigo lo antes posible.";

        formMessage.className = "form-message success";


        // Mostrar el mensaje claramente al usuario
        formMessage.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });


        // Limpiar el parámetro ?enviado=1 de la URL
        // sin recargar la página
        window.history.replaceState(
            {},
            document.title,
            window.location.pathname
        );

    }


    // ==========================================
    // VALIDACIÓN Y ENVÍO DEL FORMULARIO
    // ==========================================

    if (form && submitButton) {

        form.addEventListener("submit", function (event) {

            // HTML5 realiza la validación automáticamente
            if (!form.checkValidity()) {

                event.preventDefault();

                form.reportValidity();

                return;

            }


            // Evitar doble envío
            submitButton.disabled = true;


            const buttonText = submitButton.querySelector("span");
            const buttonIcon = submitButton.querySelector("i");


            if (buttonText) {

                buttonText.textContent = "Enviando...";

            }


            if (buttonIcon) {

                buttonIcon.className =
                    "fa-solid fa-spinner fa-spin";

            }


            // Mostrar mensaje mientras se procesa el envío
            if (formMessage) {

                formMessage.textContent =
                    "Enviando su mensaje...";

                formMessage.className =
                    "form-message loading";

            }


            /*
             * IMPORTANTE:
             * No utilizamos event.preventDefault().
             *
             * El formulario continúa enviándose a FormSubmit.
             * Después del envío, FormSubmit redirige a:
             *
             * contacto.html?enviado=1
             *
             * Al cargar nuevamente la página,
             * el código anterior detecta ?enviado=1
             * y muestra el mensaje de confirmación.
             */

        });

    }

});