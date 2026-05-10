<?php
/* Template Name: サービスページ */
get_header();
?>
<section class="l-section l-container">
    <h1><?php the_title(); ?></h1>
    <?php while (have_posts()) : the_post(); ?>
        <div class="c-entry"><?php the_content(); ?></div>
    <?php endwhile; ?>
</section>
<?php get_template_part('template-parts/cta'); ?>
<?php get_footer();
