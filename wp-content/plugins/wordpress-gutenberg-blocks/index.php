<?php

/**
 * Plugin Name: AimHigher Custom Gutenberg Blocks
 * Version: 1.0.0
 * Author: AimHigher Web Design
 *
 */


	require_once(__DIR__ . '/src/blocks/colour_container/index.php');

	add_action( 'enqueue_block_editor_assets', 'aimhigher_gutenberg_styles' );

	function aimhigher_gutenberg_styles() {
		// Load the theme styles within Gutenberg.
		wp_enqueue_style( 'aimhigher-gutenberg', plugins_url( '/build/css/styles.css', __FILE__ ), false );
	}

?>