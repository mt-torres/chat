import socket from "./chat.js";

const userList = document.querySelector("#user-list");

if (userList) {
	socket.on("roomUsers", (users) => {
		document.querySelectorAll("#user-card").forEach((i) =>
			i.remove()
		);

		users.forEach((i) => {
			const html = `
            <div class="user-list__card" id="user-card">
                <img class="user-list__card-img" src="../img/person-circle.svg" , alt=""></img>
                <span class="user-list__name">${i.userName}</span>
            </div>`;
			userList.insertAdjacentHTML("beforeend", html);
		});
	});
}
