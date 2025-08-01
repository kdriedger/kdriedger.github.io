const toggleButton = document.getElementById("theme-toggle");
const body = document.body;

const savedTheme = localStorage.getItem("theme");
if (savedTheme) {
	body.setAttribute("theme", savedTheme);
}

toggleButton.addEventListener("click", () => {
	const current = body.getAttribute("theme") || "light";
	const next = current === "light" ? "dark" : "light";
	body.setAttribute("theme", next);
	localStorage.setItem("theme", next);
});

