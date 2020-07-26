<?php
    require_once(__DIR__ . '/functions/acf.php');
    require_once(__DIR__ . '/functions/wordpress.php');
    require_once(__DIR__ . '/functions/gutenberg.php');

    // Define Nav Menus
    function aimhigher_nav_menus() {
        register_nav_menus(array (
            'main_menu' => 'Main Menu',
            'social_menu' => 'Social Menu',
            'footer_menu' => 'Footer Menu',
        ));
    };

    add_action('init', 'aimhigher_nav_menus');

    //Add Social Icons to Nav Menu
    add_filter('wp_nav_menu_objects', 'social_menu_icons', 10, 2);

    function social_menu_icons($items, $args) {
        if($args->theme_location == 'social_menu') {
            foreach($items as &$item) {
                $icon = file_get_contents(get_field('icon', $item));

                if($icon) {
                    $item->title = $icon . '<span>' . $item->title . '</span>';
                }
            }

            return $items;
        }
        else {
            return $items;
        }
    }   
    
    // Add new custom image sizes
    add_image_size( 'med-thumb', 300, 300, true );
?>