<?php
$nf_risk_faqs = [
  ['question' => 'どのくらいで効果が出ますか？', 'answer' => '状況により異なりますが、初期診断後に3〜6か月の改善計画を提示します。'],
  ['question' => '地方企業でも依頼できますか？', 'answer' => 'はい。オンライン完結で全国対応しています。'],
];
nf_risk_output_faq_schema($nf_risk_faqs);
?>
<section class="l-section l-container">
  <h2>FAQ</h2>
  <?php foreach ($nf_risk_faqs as $faq) : ?>
    <details class="c-faq">
      <summary><?php echo esc_html($faq['question']); ?></summary>
      <p><?php echo esc_html($faq['answer']); ?></p>
    </details>
  <?php endforeach; ?>
</section>
