
export function menuHamburguer(el) {
	el.addEventListener("click", function () {
		document.querySelector(".chat-users").classList.toggle(
			"chat-messages__hambuguer--fadein"
		);
		el.classList.toggle(
			"chat-messages__hambuguer-menu--click"
		);
	});
}
