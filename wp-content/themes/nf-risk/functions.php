<?php
/**
 * nf-risk functions.
 */

if (!defined('ABSPATH')) {
    exit;
}

function nf_risk_setup(): void
{
    add_theme_support('title-tag');
    add_theme_support('post-thumbnails');
    add_theme_support('html5', ['search-form', 'comment-form', 'comment-list', 'gallery', 'caption', 'style', 'script']);
    add_theme_support('custom-logo');

    register_nav_menus([
        'global' => 'グローバルメニュー',
        'footer' => 'フッターメニュー',
    ]);
}
add_action('after_setup_theme', 'nf_risk_setup');

function nf_risk_enqueue_assets(): void
{
    $theme = wp_get_theme();
    wp_enqueue_style('nf-risk-main', get_template_directory_uri() . '/assets/css/main.css', [], $theme->get('Version'));
    wp_enqueue_script('nf-risk-main', get_template_directory_uri() . '/assets/js/main.js', [], $theme->get('Version'), true);
}
add_action('wp_enqueue_scripts', 'nf_risk_enqueue_assets');

function nf_risk_register_case_cpt(): void
{
    register_post_type('case', [
        'label' => '解決事例',
        'public' => true,
        'show_in_rest' => true,
        'menu_position' => 5,
        'menu_icon' => 'dashicons-analytics',
        'supports' => ['title', 'editor', 'excerpt', 'thumbnail', 'revisions'],
        'has_archive' => true,
        'rewrite' => ['slug' => 'case'],
        'labels' => [
            'name' => '解決事例',
            'singular_name' => '解決事例',
            'add_new_item' => '解決事例を追加',
            'edit_item' => '解決事例を編集',
        ],
    ]);
}
add_action('init', 'nf_risk_register_case_cpt');

function nf_risk_breadcrumb(): void
{
    if (is_front_page()) {
        return;
    }

    echo '<nav class="c-breadcrumb" aria-label="パンくず"><ol>';
    echo '<li><a href="' . esc_url(home_url('/')) . '">ホーム</a></li>';

    if (is_singular('post')) {
        echo '<li><a href="' . esc_url(get_permalink(get_option('page_for_posts'))) . '">コラム</a></li>';
        echo '<li aria-current="page">' . esc_html(get_the_title()) . '</li>';
    } elseif (is_singular('case')) {
        echo '<li><a href="' . esc_url(get_post_type_archive_link('case')) . '">解決事例</a></li>';
        echo '<li aria-current="page">' . esc_html(get_the_title()) . '</li>';
    } elseif (is_page()) {
        echo '<li aria-current="page">' . esc_html(get_the_title()) . '</li>';
    } elseif (is_archive()) {
        echo '<li aria-current="page">' . esc_html(post_type_archive_title('', false)) . '</li>';
    }

    echo '</ol></nav>';
}

function nf_risk_output_faq_schema(array $faqs): void
{
    if (empty($faqs)) {
        return;
    }

    $schema = [
        '@context' => 'https://schema.org',
        '@type' => 'FAQPage',
        'mainEntity' => array_map(
            static function ($faq) {
                return [
                    '@type' => 'Question',
                    'name' => wp_strip_all_tags($faq['question'] ?? ''),
                    'acceptedAnswer' => [
                        '@type' => 'Answer',
                        'text' => wp_kses_post($faq['answer'] ?? ''),
                    ],
                ];
            },
            $faqs
        ),
    ];

    echo '<script type="application/ld+json">' . wp_json_encode($schema, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES) . '</script>';
}

function nf_risk_output_service_schema(): void
{
    if (!is_front_page() && !is_page('service')) {
        return;
    }

    $schema = [
        '@context' => 'https://schema.org',
        '@type' => 'Service',
        'name' => 'ネット風評被害対策サービス',
        'provider' => [
            '@type' => 'Organization',
            'name' => get_bloginfo('name'),
            'url' => home_url('/'),
        ],
        'areaServed' => 'JP',
        'serviceType' => 'AI監視・逆SEO・サジェスト対策',
    ];

    echo '<script type="application/ld+json">' . wp_json_encode($schema, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES) . '</script>';
}
add_action('wp_head', 'nf_risk_output_service_schema');

function nf_risk_output_article_schema(): void
{
    if (!is_single()) {
        return;
    }

    $schema = [
        '@context' => 'https://schema.org',
        '@type' => 'Article',
        'headline' => get_the_title(),
        'datePublished' => get_the_date(DATE_W3C),
        'dateModified' => get_the_modified_date(DATE_W3C),
        'author' => [
            '@type' => 'Person',
            'name' => get_the_author(),
        ],
        'publisher' => [
            '@type' => 'Organization',
            'name' => get_bloginfo('name'),
        ],
        'mainEntityOfPage' => get_permalink(),
    ];

    echo '<script type="application/ld+json">' . wp_json_encode($schema, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES) . '</script>';
}
add_action('wp_head', 'nf_risk_output_article_schema');
