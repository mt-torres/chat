import toast from "./toast.js";

const containerToast = document.querySelector(".container-toast");

export function joinForm(element) {
    element.addEventListener("submit", async (e) => {
        e.preventDefault();
        const userName = document.querySelector("#inputName").value;
        const room = document.querySelector("#inputRoom").value;

        try {
            const response = await fetch("/chat", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    userName,
                    room,
                }),
            });

            localStorage.setItem(
                "userData",
                JSON.stringify({ userName, room })
            );

            if (response.redirected) {
                window.location.href = response.url;
            } else {
                const data = await response.json();
                toast(containerToast, data.message, "Erro");
            }
        } catch (err) {
            console.log(err);
        }
    })
};