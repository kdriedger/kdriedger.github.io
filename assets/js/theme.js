const toggleButton = document.getElementById("theme-toggle");
const body = document.body;

// Update theme to storage if possible
const savedTheme = localStorage.getItem("theme");
if (savedTheme) {
	body.setAttribute("theme", savedTheme);
}

function updateIcon(hovering) {
	const theme = body.getAttribute("theme") || "light";
	switch(theme) {
		case "light":
			toggleButton.innerHTML = hovering ? "<i class='bi bi-moon-fill'></i>" : "<i class='bi bi-moon'></i>";
			break;
		case "dark":
			toggleButton.innerHTML = hovering ? "<i class='bi bi-sun-fill'></i>" : "<i class='bi bi-sun'></i>";
			break;
	}
}


toggleButton.addEventListener("click", () => {
	const theme = body.getAttribute("theme") || "light";
	const next = theme === "light" ? "dark" : "light";
	body.setAttribute("theme", next);
	localStorage.setItem("theme", next);
	updateIcon(true);
});

toggleButton.addEventListener("mouseenter", () => {
	updateIcon(true);
});

toggleButton.addEventListener("mouseleave", () => {
	updateIcon(false);
});

updateIcon(false);
