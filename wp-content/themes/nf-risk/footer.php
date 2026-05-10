</main>
<footer class="l-footer">
    <div class="l-container">
        <nav aria-label="フッターナビゲーション">
            <?php wp_nav_menu(['theme_location' => 'footer', 'container' => false, 'menu_class' => 'l-footer__nav']); ?>
        </nav>
        <p class="l-footer__copy">© <?php echo esc_html(date('Y')); ?> <?php bloginfo('name'); ?></p>
    </div>
</footer>
<?php wp_footer(); ?>
</body>
</html>
