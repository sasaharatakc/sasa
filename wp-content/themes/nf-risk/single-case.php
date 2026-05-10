<?php
get_header();
?>
<article class="l-section l-container c-entry">
    <?php while (have_posts()) : the_post(); ?>
        <h1><?php the_title(); ?></h1>
        <?php if (has_post_thumbnail()) : ?>
            <?php the_post_thumbnail('large'); ?>
        <?php endif; ?>
        <?php the_content(); ?>
    <?php endwhile; ?>
</article>
<?php get_template_part('template-parts/cta'); ?>
<?php get_footer();
