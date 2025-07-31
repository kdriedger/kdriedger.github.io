function variableSpeed(min, max) {
	return (Math.floor(Math.random() * (max - min + 1))+ min);
}

function createTypewriter(
	el, 
	typeSpeedSlow,
	typeSpeedFast,
	deleteSpeedSlow,
	deleteSpeedFast,
	deleteDelay,
	cursorFlashDelay,
) {
	let cancelled = false;
	let timeoutId = null;

	function type(newText) {
		const oldText = el.textContent;
		let prefixLen = 0;
		
		while (
			prefixLen < oldText.length &&
			prefixLen < newText.length &&
			oldText[prefixLen] === newText[prefixLen]
		) prefixLen++;

		let charsToDelete = oldText.length - prefixLen;
		const charsToType = newText.slice(prefixLen);
		let typeIndex = 0;
		let deleting = true;
		
		el.classList.add("typing");

		return new Promise(resolve => {
			function animate() {
				if (cancelled) return;

				// Deleting
				if (charsToDelete > 0) {
					el.textContent = el.textContent.slice(0, -1);
					charsToDelete--;
					timeoutId = 
						setTimeout(animate, variableSpeed(deleteSpeedSlow, deleteSpeedFast));
					return;
				}

				// Typing
				if (typeIndex < charsToType.length) {
					if (deleting === true) {
						deleting = false;
						timeoutId = 
							setTimeout(animate, deleteDelay);
						return;
					}
					el.textContent += charsToType.charAt(typeIndex++);
					timeoutId=
						setTimeout(animate, variableSpeed(typeSpeedSlow, typeSpeedFast));
				}
				// Done Typing
				else {
					el.classList.remove("typing");
					el.classList.add("flash");

					setTimeout(() => {
						el.classList.remove("flash");
					}, cursorFlashDelay);
					
					resolve();
					return;
				}
			}

			animate();
		});
	}

	return {
		type: (text) => {
			cancelled = false;
			clearTimeout(timeoutId);
			return type(text);
		},
		cancel: () => {
			cancelled = true;
			clearTimeout(timeoutId);
		},
		setDeleteDelay: (delay) => {
			deleteDelay = delay;
		}
	};
}
