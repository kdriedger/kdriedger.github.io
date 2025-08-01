---
---
async function playHomeAnimation(typewriter) {
	await typewriter.type("{{ site.title_mistake }}");
	await delay(1000);
	await typewriter.type("{{ site.title }}");
}
