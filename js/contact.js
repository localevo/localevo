document.addEventListener("DOMContentLoaded", () => {

    const form = document.getElementById("contactForm");
    const successMessage = document.getElementById("successMessage");

    if (!form) return;

    form.addEventListener("submit", async function (e) {

        e.preventDefault();

        const data = new FormData(form);

        try {

            const response = await fetch(form.action, {
                method: "POST",
                body: data,
                headers: {
                    "Accept": "application/json"
                }
            });

            if (response.ok) {
                form.reset();
                successMessage.classList.remove("d-none");
            } else {
                alert("A apărut o eroare. Te rugăm să încerci din nou.");
            }

        } catch (err) {
            alert("Nu s-a putut trimite mesajul.");
        }

    });

});