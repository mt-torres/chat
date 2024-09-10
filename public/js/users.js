const userList = document.querySelector("#user-list");

if (userList) {
	socket.on("roomUsers", (users) => {
		document.querySelectorAll("#user-card").forEach((i) =>
			i.remove()
		);

		users.forEach((i) => {
			const html = `
            <div class="user-list__card" id="user-card">
                <img class="card__img" src="../img/person-circle.svg" , alt=""></img>
                <span class="card__user-name ml-2">${i.userName}</span>
            </div>`;
			userList.insertAdjacentHTML("beforeend", html);
		});
	});
}
