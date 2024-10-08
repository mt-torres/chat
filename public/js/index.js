const joinForm = document.querySelector("#join-form");

if (joinForm) {
	joinForm.addEventListener("submit", async (e) => {
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

			console.log(response);

			if (response.redirected) {
				window.location.href = response.url;
			} else {
				const data = await response.json();
				console.log(data);
			}
		} catch (err) {
			console.log(err);
		}
	});
}
