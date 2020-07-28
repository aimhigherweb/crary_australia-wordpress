<?php
/**
 * Icon Blocks
 *
 */
// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}
 
function icon_blocks_register_block() {
    // Enqueue block editor JS
    wp_register_script(
        'icon_blocks/editor-scripts',
        plugins_url( '/../../../build/index.js', __FILE__ ),
        [ 'wp-blocks', 'wp-element', 'wp-editor', 'wp-components']
    );

    register_block_type('aimhigher/icon-blocks', array(
        'editor_script' => 'icon_blocks/editor-scripts', 
    ));
}

// Hook the enqueue functions into the editor
add_action( 'init', 'icon_blocks_register_block' );