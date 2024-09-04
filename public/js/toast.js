const containerToast = document.querySelector(".container-toast");

//mgs do arquivo server.js  socket.broadcast.emit("msg", user + " entrou na sala!");
socket.on("joinRoom", function (msg) {
	const html = `
        <div class="c-toast">
            <header class="c-toast__header">
                <div class="c-toast__img"></div>
                <strong class="c-toast__title">BacoChat</strong>
                <small class="c-toast__timestamp">Agora</small>
            </header>
            <div class="c-toast__body">
                <span class="c-toast__message">${msg}</span>
            </div>
        </div>
    `;
	containerToast.insertAdjacentHTML("afterbegin", html);

	setTimeout(() => {
		containerToast
			.querySelectorAll(".c-toast")
			[
				containerToast.querySelectorAll(".c-toast")
					.length - 1
			].classList.add("c-toast--remove");

		// containerToast.children[
		// 	containerToast.children.length - 1
		// ].classList.add("c-toast--remove");
	}, 2000);

	setTimeout(() => {
		containerToast
			.querySelectorAll(".c-toast")
			[
				containerToast.querySelectorAll(".c-toast")
					.length - 1
			].remove();
		// containerToast.children[
		// 	containerToast.children.length - 1
		// ].remove();
	}, 2500);
});

socket.on("leftRoom", function (msg) {
	const html = `
        <div class="c-toast">
            <header class="c-toast__header">
                <div class="c-toast__img"></div>
                <strong class="c-toast__title">BacoChat</strong>
                <small class="c-toast__timestamp">Agora</small>
            </header>
            <div class="c-toast__body">
                <span class="c-toast__message">${msg}</span>
            </div>
        </div>
    `;
	containerToast.insertAdjacentHTML("afterbegin", html);

	setTimeout(() => {
		containerToast
			.querySelectorAll(".c-toast")
			[
				containerToast.querySelectorAll(".c-toast")
					.length - 1
			].classList.add("c-toast--remove");

		// containerToast.children[
		// 	containerToast.children.length - 1
		// ].classList.add("c-toast--remove");
	}, 2000);

	setTimeout(() => {
		containerToast
			.querySelectorAll(".c-toast")
			[
				containerToast.querySelectorAll(".c-toast")
					.length - 1
			].remove();
		// containerToast.children[
		// 	containerToast.children.length - 1
		// ].remove();
	}, 2500);
});
