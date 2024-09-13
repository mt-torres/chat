const menuHamburguer = document.querySelector("#hambuguer-menu");

if (menuHamburguer) {
	menuHamburguer.addEventListener("click", function () {
		document.querySelector(".chat-users").classList.toggle(
			"chat-messages__hambuguer--fadein"
		);
		menuHamburguer.classList.toggle(
			"chat-messages__hambuguer-menu--click"
		);
	});
}
