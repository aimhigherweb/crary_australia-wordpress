const mobileMenu = () => {
	const menu = document.querySelector('header nav')

	if (!menu.classList.contains('active')) {
		menu.classList.add('active')
	} else {
		menu.classList.remove('active')
	}
}

document
	.querySelectorAll(
		'.wpforms-field-email input, .wpforms-field-text input, .wpforms-field-textarea textarea',
	)
	.forEach(i => {
		i.addEventListener('input', e => {
			console.log(e.target.value)

			if (e.target.value !== '') {
				e.target.parentElement.querySelector('label').classList.add('filled')
			}
		})
	})
