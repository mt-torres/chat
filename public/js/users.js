import { socket } from "./chat.js";

export function userList(element) {
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
			element.insertAdjacentHTML("beforeend", html);
		});
	});
}
