
export function menuHamburguer(el) {
	el.addEventListener("click", function () {
		document.querySelector(".chat-users").classList.toggle(
			"chat-messages__hambuguer--fadein"
		);
		menuHamburguer.classList.toggle(
			"chat-messages__hambuguer-menu--click"
		);
	});
}
