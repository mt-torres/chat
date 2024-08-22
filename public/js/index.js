const joinForm = document.querySelector("#join-form");

joinForm.addEventListener("submit", async (e) => {
	e.preventDefault();
	const name = document.querySelector("#inputName").value;
	const room = document.querySelector("#inputRoom").value;

	try {
		const response = await fetch("http://localhost:8000/chat", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				name,
				room,
			}),
		});

		const data = await response.json();
		console.log(data);
	} catch (err) {
		console.log(err);
	}
});
