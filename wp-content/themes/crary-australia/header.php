<?php
/**
 * The header template
 *
 *
 * @package AimHigher
 * @version 1.0
 */
?>
<html>
    <head>
        <meta charset="<?php bloginfo('charset'); ?>" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="profile" href="http://gmpg.org/xfn/11" />

        <!-- Google Tag Manager -->
        <script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer','GTM-TGMC69P');</script>
        <!-- End Google Tag Manager -->

        <link href="<?php echo get_template_directory_uri(); ?>/style.css" rel="stylesheet" />
        

        <?php wp_head(); ?>
    </head>

<body class="<?php if (is_front_page()) {echo 'home';} ?>">
    <!-- Google Tag Manager -->
    <script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
    new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
    j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
    'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
    })(window,document,'script','dataLayer','GTM-TGMC69P');</script>
    <!-- End Google Tag Manager -->
    <header>
        <a href="/" class="logo">
            <?php
            $logo = wp_get_attachment_image_src(get_theme_mod('custom_logo'), 'full')[0];

            if(preg_match('/\.svg$/', $logo)) {
                echo file_get_contents($logo);
            }
            else {
                echo '<img src="' . $logo . '" />';
            }
            
            ?>
        </a>



        <?php
        $hamburger = get_template_directory_uri() . './src/img/hamburger.svg';
        $menu_toggle =
        	'<button class="hamburger" onClick="mobileMenu()">' .
        	file_get_contents($hamburger) .
        	'<span>Open Menu</span></button>';

        wp_nav_menu(array(
        	'theme_location' => 'main_menu',
        	'container' => 'nav',
        	'container_class' => 'menu main',
        	'items_wrap' => $menu_toggle . '<ul id="%1$s" data-test="true" class="%2$\">%3$s</ul>',
        ));
        ?>
    </header>

    <main  class="<?php if (is_front_page()) {echo 'home';} ?>">
