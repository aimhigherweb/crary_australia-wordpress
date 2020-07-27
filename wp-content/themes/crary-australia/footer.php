<?php
/**
 * The footer template
 *
 *
 * @package AimHigher
 * @version 1.0
 */
?>

		</main><!-- #content -->

		<footer>

		<div class="logo">
            <?php
				$footer_logo = get_theme_mod('custom_light_logo');

				if(preg_match('/\.svg$/', $footer_logo)) {
					echo file_get_contents($footer_logo);
				}
				else {
					echo '<img src="' . $footer_logo . '" />';
				}
            
            ?>
        </div>

			<nav class="footer">
				<?php wp_nav_menu(array(
					'theme_location' => 'footer_menu',
					'container' => '',
					'container_class' => '',
				)); ?>
			</nav>

			<div class="contact">

				<?php
				
				if(is_active_sidebar('footer-contact')): 
				
					dynamic_sidebar('footer-contact');
				
				endif;
				
				?>
			</div>
			
		</footer>

		<script type="text/javascript" src="<?php echo get_template_directory_uri(); ?>/src/js/main.js" ></script>
		<?php wp_footer(); ?>
		<script id="__bs_script__">//<![CDATA[
			document.write("<script async src='http://HOST:3000/browser-sync/browser-sync-client.js?v=2.26.7'><\/script>".replace("HOST", location.hostname));
		//]]></script>
    </body>
</html>
