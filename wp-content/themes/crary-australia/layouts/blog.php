<?php
/**
 * Template Name: Blog Page
 * 
 *
 *
 * @package AimHigher
 * @version 1.0
 */

?>

<div class="container main">
    <h1>Blog</h1>
    <div class="content feed">
        <?php 
            if ( have_posts() ) : 
                while ( have_posts() ) : the_post(); ?>
                    <article>
                        <?php echo get_the_post_thumbnail(null, 'med-thumb'); ?>
                        <header>
                            <h2>
                                <a href=""><?php the_title(); ?></a>
                            </h2>
                            <time><?php the_date(); ?></time>
                        </header>
                        <div class="excerpt"><?php the_excerpt(); ?></div>
                    </article>
                <?php endwhile; 
            endif; 
        ?>
    </div>
</div>
