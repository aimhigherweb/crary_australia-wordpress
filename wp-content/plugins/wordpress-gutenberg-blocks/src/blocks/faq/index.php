<?php
/**
 * FAQ Block
 *
 */
// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}
 
function faq_register_block() {
    // Enqueue block editor JS
    wp_register_script(
        'faq/editor-scripts',
        plugins_url( '/../../../build/index.js', __FILE__ ),
        [ 'wp-blocks', 'wp-element', 'wp-editor', 'wp-components']
    );

    register_block_type('mingjohanson/faq', array(
        'editor_script' => 'faq/editor-scripts', 
    ));
}

// Hook the enqueue functions into the editor
add_action( 'init', 'faq_register_block' );