const mobileMenu = () => {
	const menu = document.querySelector('header nav')

	if (!menu.classList.contains('active')) {
		menu.classList.add('active')
	} else {
		menu.classList.remove('active')
	}
}