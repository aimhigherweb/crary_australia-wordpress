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
				'color' => '#007cbb',
			],
			[
				'name'  => 'Secondary',
				'slug'  => 'seconday',
				'color' => '#00acbb',
			],
			[
				'name'  => 'Neutral',
				'slug'  => 'neutral',
				'color' => '#4c4d4e',
			],
			[
				'name'  => 'White',
				'slug'  => 'white',
				'color' => '#ffffff',
			],
		]
	);

	add_theme_support(
		'editor-gradient-presets',
		array(
			array(
				'name'     => 'Blue to Aqua',
				'gradient' => 'linear-gradient(90deg, rgb(95,195,228) 0%, rgb(192,121,160) 53%, rgb(229,93,135) 100%)',
				'slug'     => 'blue-to-aqua'
			),
			
		)
	);
}
add_action( 'after_setup_theme', 'aimhigher_add_custom_gutenberg_color_palette' );

?>