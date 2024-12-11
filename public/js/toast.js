let cloneToast;

export default function toast(el, msg, title="") {
	if(cloneToast !=undefined){
		el.innerHTML = "";
		el.insertAdjacentHTML("afterBegin", cloneToast);
		el.querySelectorAll(".c-toast").forEach(i => i.classList.remove("c-toast--change-position-first-leave",
			"c-toast--change-position-second-leave", "c-toast--change-position-third-leave"));
		cloneToast = undefined;
	} 

	const html = `
        <div class="c-toast c-toast--show">
            <header class="c-toast__header">
                <div class="c-toast__img"></div>
                <strong class="c-toast__title">BacoChat</strong>
                <small class="c-toast__timestamp">${title}</small>
            </header>
            <div class="c-toast__body">
                <span class="c-toast__message">${msg}</span>
            </div>
        </div>
    `;



	el.insertAdjacentHTML("afterBegin", html);
	let toastElements = document.querySelectorAll(".c-toast");
	
	// document.querySelectorAll(".c-toast").forEach(i =>{
	// 	i.addEventListener('transitionend', e => {
	// 		console.log(e.propertyName )
	// 	})	
	// })
	runClassesProperties()
	
	// handle Hover
	
	// toastElements.forEach( i => i.addEventListener("mouseenter", function(e){
	// 	const elements = e.target.closest(".container-toast").querySelectorAll(".c-toast")
	// 	cloneToast = Array.from(document.querySelector(".container-toast").cloneNode(true).querySelectorAll(".c-toast")).map(el => el.outerHTML).join("");
	
	// 	elements.forEach((j,i) => {
	// 		j.classList.remove("c-toast--change-position-first-leave","c-toast--change-position-second","c-toast--show", "c-toast--change-position-third","c-toast--change-position-second-leave","c-toast--change-position-third-leave")
	// 		if(i == 0) j.classList.add("c-toast--change-position-first-hover");
	// 		if(i == 1) j.classList.add("c-toast--change-position-second-hover")
	// 		if (i == 2) j.classList.add("c-toast--change-position-third-hover");

	// 	})
		
	// }))
	
	// toastElements.forEach( i => i.addEventListener("mouseleave", function(e){
	// 	const elements = e.target.closest(".container-toast").querySelectorAll(".c-toast")

	// 	elements.forEach((j,i) => {
	// 		j.classList.remove("c-toast--change-position-first-hover","c-toast--change-position-second-hover", "c-toast--change-position-third-hover")
	// 		if(i==0) j.classList.add("c-toast--change-position-first-leave")
	// 		if(i == 1) j.classList.add("c-toast--change-position-second-leave")
	// 		if (i == 2) j.classList.add("c-toast--change-position-third-leave");

	// 	})
		
	// 	setTimeout( ()=> {
	// 		e.target.closest(".container-toast").innerHTML = "";
	// 		cloneToast = undefined;
	// 	},5000)

	// }))

	//funções auxiliares
	function runClassesProperties(){
		if(toastElements.length == 2){
			updateClasses(1,["c-toast--show","c-toast--change-position-second"]);
	
		}else if(toastElements.length == 3){
			updateClasses(2,["c-toast--change-position-second","c-toast--change-position-third"]);
			updateClasses(1,["c-toast--show","c-toast--change-position-second"]);
	
		}else if (toastElements.length > 3){
			toastElements[3].remove()
			updateClasses(2,["c-toast--change-position-second","c-toast--change-position-third"]);
			updateClasses(1,["c-toast--show","c-toast--change-position-second"]);
		}
	
	}

	function updateClasses(el, classes){
		toastElements[el].classList.remove(classes[0]);
		toastElements[el].classList.add(classes[1]);
	}
	
}

