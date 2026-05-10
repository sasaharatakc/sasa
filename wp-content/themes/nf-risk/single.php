<?php
get_header();
?>
<article class="l-section l-container c-entry">
    <?php while (have_posts()) : the_post(); ?>
        <h1><?php the_title(); ?></h1>
        <p class="c-meta"><?php echo esc_html(get_the_date()); ?></p>
        <?php the_content(); ?>
    <?php endwhile; ?>
</article>
<?php get_template_part('template-parts/cta'); ?>
<?php get_footer();
