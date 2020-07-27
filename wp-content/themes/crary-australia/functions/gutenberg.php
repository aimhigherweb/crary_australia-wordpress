<?php

// Add Colour Palette to Gutenberg
function disable_gutenberg_custom_colour_picker() {
	add_theme_support( 'disable-custom-colors' );
}
add_action( 'after_setup_theme', 'disable_gutenberg_custom_colour_picker' );

function disable_gutenberg_custom_font_sizes() {
	add_theme_support('disable-custom-font-sizes');
}
add_action( 'after_setup_theme', 'disable_gutenberg_custom_font_sizes' );

function aimhigher_add_custom_gutenberg_color_palette() {
	add_theme_support(
		'editor-color-palette',
		[
			[
				'name'  => 'Primary',
				'slug'  => 'primary',
				'color' => '#ffd600',
			],
			[
				'name'  => 'Neutral',
				'slug'  => 'neutral',
				'color' => '#000000',
			],
			[
				'name'  => 'White',
				'slug'  => 'white',
				'color' => '#ffffff',
			],
		]
	);
}
add_action( 'after_setup_theme', 'aimhigher_add_custom_gutenberg_color_palette' );

?>