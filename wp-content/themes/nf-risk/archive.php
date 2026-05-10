<?php
get_header();
?>
<section class="l-section l-container">
    <h1><?php the_archive_title(); ?></h1>
    <div class="c-grid">
        <?php if (have_posts()) : while (have_posts()) : the_post(); ?>
            <article class="c-card">
                <h2><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h2>
                <p><?php echo esc_html(get_the_date()); ?></p>
                <p><?php echo esc_html(get_the_excerpt()); ?></p>
            </article>
        <?php endwhile; endif; ?>
    </div>
    <?php the_posts_pagination(); ?>
</section>
<?php get_footer();
