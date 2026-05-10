<!doctype html>
<html <?php language_attributes(); ?>>
<head>
    <meta charset="<?php bloginfo('charset'); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>
<?php wp_body_open(); ?>
<header class="l-header">
    <div class="l-container l-header__inner">
        <a class="l-header__logo" href="<?php echo esc_url(home_url('/')); ?>"><?php bloginfo('name'); ?></a>
        <nav aria-label="グローバルナビゲーション">
            <?php wp_nav_menu(['theme_location' => 'global', 'container' => false, 'menu_class' => 'l-header__nav']); ?>
        </nav>
    </div>
</header>
<main>
<?php nf_risk_breadcrumb(); ?>
