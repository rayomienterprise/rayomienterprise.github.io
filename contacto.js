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

            if (icon) {

                if (navMenu.classList.contains("active")) {

                    icon.classList.remove("fa-bars");
                    icon.classList.add("fa-xmark");

                } else {

                    icon.classList.remove("fa-xmark");
                    icon.classList.add("fa-bars");

                }

            }

        });

    }


    // ==========================================
    // CONFIRMACIÓN DESPUÉS DEL ENVÍO
    // ==========================================

    const params = new URLSearchParams(
        window.location.search
    );

    const enviadoPorURL = params.get("enviado") === "1";

    const enviadoPorSesion =
        sessionStorage.getItem("contactoEnviado") === "1";


    if (enviadoPorURL || enviadoPorSesion) {

        // Eliminamos la marca de sesión
        sessionStorage.removeItem("contactoEnviado");


        // Mostrar mensaje de confirmación
        if (formMessage) {

            formMessage.innerHTML = `
                <div class="success-content">

                    <i class="fa-solid fa-circle-check"></i>

                    <div>

                        <strong>
                            ¡Mensaje enviado correctamente!
                        </strong>

                        <p>
                            Gracias por contactarnos.
                            Hemos recibido tu solicitud y
                            nos comunicaremos contigo lo antes posible.
                        </p>

                    </div>

                </div>
            `;

            formMessage.className =
                "form-message success";

        }


        // Limpiar formulario
        if (form) {
            form.reset();
        }


        // Llevar al usuario hasta el mensaje
        if (formMessage) {

            setTimeout(function () {

                formMessage.scrollIntoView({
                    behavior: "smooth",
                    block: "center"
                });

            }, 150);

        }


        // Eliminar ?enviado=1 de la URL
        if (enviadoPorURL) {

            window.history.replaceState(
                {},
                document.title,
                window.location.pathname
            );

        }

    }


    // ==========================================
    // VALIDACIÓN Y ENVÍO
    // ==========================================

    if (form) {

        form.addEventListener("submit", function (event) {

            // Validación HTML5
            if (!form.checkValidity()) {

                event.preventDefault();

                form.reportValidity();

                return;

            }


            // ==========================================
            // GUARDAR ESTADO DEL ENVÍO
            // ==========================================

            sessionStorage.setItem(
                "contactoEnviado",
                "1"
            );


            // ==========================================
            // CAMBIAR BOTÓN
            // ==========================================

            if (submitButton) {

                submitButton.disabled = true;


                const span =
                    submitButton.querySelector("span");

                const icon =
                    submitButton.querySelector("i");


                if (span) {

                    span.textContent =
                        "Enviando...";

                }


                if (icon) {

                    icon.className =
                        "fa-solid fa-spinner fa-spin";

                }

            }


            // ==========================================
            // MENSAJE DE PROCESAMIENTO
            // ==========================================

            if (formMessage) {

                formMessage.textContent =
                    "Enviando su mensaje...";

                formMessage.className =
                    "form-message loading";

            }

        });

    }

});