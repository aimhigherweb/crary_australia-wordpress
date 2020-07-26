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

			<nav class="footer">
				<?php wp_nav_menu(array(
					'theme_location' => 'footer_menu',
					'container' => '',
					'container_class' => '',
				)); ?>
			</nav>

			<nav class="social icons">
				<div class="gradient"></div>
				<?php wp_nav_menu(array(
					'theme_location' => 'social_menu',
					'container' => '',
					'container_class' => '',
				)); ?>
			</nav>

			<div class="aimhigher logo">
				<a href="https://aimhigherweb.design" target="_blank" rel="nofollow">
					<?php
						$logo_aimhigher = get_template_directory_uri() . './src/img/aimhigher.svg';
						echo file_get_contents($logo_aimhigher);
					?>
				</a>
				<p class="copyright">© Copyright <?php echo date("Y"); ?> AimHigher</p>
			</div>
		</footer>

		<script type="text/javascript" src="<?php echo get_template_directory_uri(); ?>/srcoo/js/main.js" ></script>
		<?php wp_footer(); ?>
		<script id="__bs_script__">//<![CDATA[
			document.write("<script async src='http://HOST:3000/browser-sync/browser-sync-client.js?v=2.26.7'><\/script>".replace("HOST", location.hostname));
		//]]></script>
    </body>
</html>
