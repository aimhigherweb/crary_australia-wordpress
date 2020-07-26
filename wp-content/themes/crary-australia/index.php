<?php
/**
 * The main template file
 *
 *
 * @package AimHigher
 * @version 1.0
 */

    

    get_header(); 

    if(is_front_page()) {
        get_template_part('layouts/home');
    }
    else if (is_blog()) {
        get_template_part('layouts/blog');
    }
    else {
        get_template_part('layouts/default');
    }

    get_footer();

?>