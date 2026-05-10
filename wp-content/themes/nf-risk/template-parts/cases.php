<section class="l-section l-container">
  <h2>解決事例</h2>
  <div class="c-grid">
    <?php
    $case_query = new WP_Query(['post_type' => 'case', 'posts_per_page' => 3]);
    if ($case_query->have_posts()) :
      while ($case_query->have_posts()) : $case_query->the_post(); ?>
        <article class="c-card">
          <h3><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h3>
          <p><?php echo esc_html(get_the_excerpt()); ?></p>
        </article>
      <?php endwhile;
      wp_reset_postdata();
    endif;
    ?>
  </div>
</section>
