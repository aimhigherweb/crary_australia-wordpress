<?php
/**
 * The template for a blog post
 *
 *
 * @package AimHigher
 * @version 1.0
 */


get_header(); ?>

<div class="container main blog">
    <h1><?php the_title(); ?></h1>
    <div class="content">
        <?php  
            while ( have_posts() ) : the_post();
                the_content();
            endwhile;
        ?>
    </div>
</div>

<?php get_footer();