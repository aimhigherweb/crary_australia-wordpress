<?php
/**
 * Template Name: Default Content Page
 * 
 *
 *
 * @package AimHigher
 * @version 1.0
 */

?>

<div class="container main">
    <h1><?php the_title(); ?></h1>
    <div class="content">
        <?php  
            while ( have_posts() ) : the_post();
                the_content();
            endwhile;
        ?>
    </div>
</div>
