'use client';

import { createContext, useContext, useEffect, useState } from 'react';

export type Lang = 'ja' | 'en';

/** All translatable site copy. Japanese is the default display language. */
export const MESSAGES = {
  ja: {
    nav: {
      pharma: 'Pharmaceuticals',
      about: '会社概要',
      capabilities: '製造対応',
      therapeutic: '治療領域',
      rnd: '研究開発',
      quality: '品質',
      why: 'ASLEの理由',
      partner: 'パートナーになる',
      menu: 'メニュー',
    },
    hero: {
      badge: 'スクロールでASLEを知る',
      title1: 'より良い医薬品を。',
      title2: 'より良い人生を。',
      sub: '健やかな明日のために——第三者製造・OEM製造による医薬品を、確かな品質で世界へお届けします。',
      cta: 'パートナーになる',
      explore: 'ASLEの世界を見る →',
      scroll: 'スクロール',
    },
    capsule: {
      eyebrow: '02 — カプセルの内側',
      title: '内側から生まれる精度',
      desc: 'すべての製剤は顆粒の一粒から設計されます。信頼できる、効果的な医薬品を支える科学です。',
    },
    ingredients: {
      eyebrow: '03 — 成分',
      title: '有効成分の科学',
      lead: '厳格な製剤設計と分析管理により、有効成分を確かに機能する医薬品へ——ロットごとに、安定して。',
      c1: '最先端の製剤技術',
      c2: '各工程での厳格な品質管理',
      c3: '一貫性のある再現可能な結果',
    },
    human: {
      eyebrow: '04 — 身体へ',
      title: '科学から医療へ',
      lead: '吸収され、働く医薬品——健康を支え、人生をより良くする。私たちが製造するすべての目的です。',
    },
    therapeutic: {
      eyebrow: '05 — 治療領域',
      title: '幅広い治療領域をカバー',
      hint: 'スクロールで横に移動 →',
      areas: [
        { title: '神経内科', sub: 'Neurology', desc: '中枢神経系の治療。' },
        { title: '循環器', sub: 'Cardiology', desc: '循環器ケアの製剤。' },
        { title: '呼吸器', sub: 'Respiratory', desc: '気道・肺のサポート。' },
        { title: '消化器', sub: 'Gastro', desc: '消化器・胃腸の健康。' },
        { title: '糖尿病', sub: 'Diabetes', desc: '代謝・血糖の管理。' },
        { title: '皮膚科', sub: 'Dermatology', desc: '皮膚・外用の治療。' },
      ],
    },
    products: {
      eyebrow: '06 — 製造対応',
      title: 'お客様のためにつくれるもの',
      lead: '第三者製造・OEM製造で、あらゆる剤形に対応——最小発注数量（MOQ）なし。',
      caps: [
        { title: '錠剤', desc: 'コーティング／素錠、徐放性。' },
        { title: 'カプセル', desc: 'ハード／ソフトゲル製剤。' },
        { title: 'シロップ・液剤', desc: '経口懸濁液・溶液。' },
        { title: '注射剤', desc: '無菌の非経口製剤。' },
        { title: '軟膏・クリーム', desc: '外用・皮膚科向け。' },
        { title: 'カスタムOEM', desc: '処方・包装・ブランド化まで。' },
      ],
    },
    quality: {
      eyebrow: '07 — 品質',
      title: '端から端まで、品質保証',
      lead: '受入原料から完成品まで、厳格な品質管理がすべてのロットを支えます——医薬品製造における信頼の基盤です。',
      pillars: [
        { title: 'WHO-GMP', desc: '医薬品適正製造基準。' },
        { title: '品質管理', desc: '工程内・最終試験。' },
        { title: '安定性試験', desc: '有効期間の保証。' },
        { title: 'トレーサビリティ', desc: 'ロット単位の追跡性。' },
      ],
    },
    rnd: {
      eyebrow: '08 — 研究開発',
      title: '次に来るものへの投資',
      desc: '実地研究とデジタルサイエンスを橋渡し——明日の医薬品のために、処方・工程・技術を前進させます。',
      lab: '研究室にて',
    },
    global: {
      eyebrow: '09 — グローバルパートナーシップ',
      title: '世界へ広がるネットワーク',
      lead: 'インド・ジャイプールを拠点に、ASLEは国際的な協業を構築——グローバル輸出とドロップシッピングで世界中のパートナーへ供給します。',
    },
    manufacturing: {
      eyebrow: '10 — 製造',
      title: '工場の中を巡る',
      stages: [
        { title: '入口', desc: '衛生管理された入場。' },
        { title: '生産', desc: '自動化された製造ライン。' },
        { title: '品質管理', desc: 'ライン内での検査・試験。' },
        { title: '包装', desc: '精密な梱包・ラベリング。' },
        { title: '倉庫', desc: '温度管理された保管。' },
      ],
    },
    delivery: {
      eyebrow: '11 — グローバル配送',
      title1: '健康を届ける。',
      title2: '希望を届ける。',
      lead: '医薬品を世界中のパートナーと患者のもとへ——健康と希望のメッセージを、行く先々へ運びます。',
      steps: [
        { label: '梱包' },
        { label: '輸送' },
        { label: '輸出' },
        { label: '世界へ' },
      ],
      cta: 'お問い合わせ',
    },
    why: {
      eyebrow: 'ASLE Pharmaceuticalsが選ばれる理由',
      title: '私たちの仕事を支える原則',
      values: [
        { title: '患者中心', sub: 'Patient Centric' },
        { title: '品質最優先', sub: 'Quality First' },
        { title: '手頃で価値ある医療', sub: 'Affordable Healthcare' },
        { title: '世界への展開', sub: 'Global Presence' },
        { title: '持続可能な未来', sub: 'Sustainable Future' },
      ],
    },
    footer: {
      title1: 'より良い医薬品を、',
      title2: '共につくりましょう。',
      desc: '第三者製造・OEM製造、ドロップシッピング、グローバル輸出——最小発注数量（MOQ）なしで、ASLE Pharmaceuticalsとパートナーに。',
      location: 'インド・ジャイプール',
      partner: 'パートナーになる',
      offer: '対応サービス',
      services: [
        '第三者製造',
        'OEM製造',
        'ドロップシッピング',
        'グローバル輸出',
      ],
      tags: ['GMP-WHO', 'US-FDA準拠', 'MOQなし', '国際協業'],
      rights: 'ASLE Pharmaceuticals. All rights reserved.',
      tagline: 'より良い医薬品を。より良い人生を。',
    },
  },
  en: {
    nav: {
      pharma: 'Pharmaceuticals',
      about: 'About Us',
      capabilities: 'Capabilities',
      therapeutic: 'Therapeutic Areas',
      rnd: 'R&D',
      quality: 'Quality',
      why: 'Why ASLE',
      partner: 'Partner With Us',
      menu: 'Menu',
    },
    hero: {
      badge: 'Scroll to discover ASLE',
      title1: 'Better Medicines.',
      title2: 'Better Lives.',
      sub: 'Innovating for a healthier tomorrow — third-party & OEM pharmaceutical manufacturing, quality-assured and delivered across the globe.',
      cta: 'Partner With Us',
      explore: 'Explore our world →',
      scroll: 'Scroll Down',
    },
    capsule: {
      eyebrow: '02 — Inside every capsule',
      title: 'Precision from the inside out',
      desc: 'Every formulation is engineered granule by granule — the science that sits behind dependable, effective medicine.',
    },
    ingredients: {
      eyebrow: '03 — Ingredients',
      title: 'The science of the active molecule',
      lead: 'Rigorous formulation and analytical control turn active ingredients into medicines that perform — reliably, batch after batch.',
      c1: 'Cutting-edge formulation technologies',
      c2: 'Rigorous quality control at every stage',
      c3: 'Consistent, reproducible results',
    },
    human: {
      eyebrow: '04 — To the human body',
      title: 'From science to healthcare',
      lead: 'Medicine, absorbed and at work — supporting health and improving lives. This is the purpose behind everything we manufacture.',
    },
    therapeutic: {
      eyebrow: '05 — Therapeutic Areas',
      title: 'Broad therapeutic coverage',
      hint: 'Scroll to move sideways →',
      areas: [
        { title: 'Neurology', sub: '神経', desc: 'Central nervous system therapies.' },
        { title: 'Cardiology', sub: '循環器', desc: 'Cardiovascular care formulations.' },
        { title: 'Respiratory', sub: '呼吸器', desc: 'Airway and pulmonary support.' },
        { title: 'Gastro', sub: '消化器', desc: 'Digestive and gastro health.' },
        { title: 'Diabetes', sub: '糖尿病', desc: 'Metabolic and glucose management.' },
        { title: 'Dermatology', sub: '皮膚科', desc: 'Skin and topical treatments.' },
      ],
    },
    products: {
      eyebrow: '06 — Manufacturing Capabilities',
      title: 'What we can make for you',
      lead: 'Third-party & OEM manufacturing across a full range of dosage forms — with no minimum order quantity.',
      caps: [
        { title: 'Tablets', desc: 'Coated, uncoated & sustained-release.' },
        { title: 'Capsules', desc: 'Hard & soft-gel formulations.' },
        { title: 'Syrups & Liquids', desc: 'Oral suspensions and solutions.' },
        { title: 'Injectables', desc: 'Sterile parenteral preparations.' },
        { title: 'Ointments & Creams', desc: 'Topical & dermatological.' },
        { title: 'Custom OEM', desc: 'Formulate, pack & brand to spec.' },
      ],
    },
    quality: {
      eyebrow: '07 — Quality',
      title: 'Quality assured, end to end',
      lead: 'From incoming materials to finished packs, rigorous quality control underpins every batch — the foundation of trust in pharmaceutical manufacturing.',
      pillars: [
        { title: 'WHO-GMP', desc: 'Good Manufacturing Practice.' },
        { title: 'Quality Control', desc: 'In-process & final testing.' },
        { title: 'Stability Testing', desc: 'Shelf-life assurance.' },
        { title: 'Traceability', desc: 'Batch-level accountability.' },
      ],
    },
    rnd: {
      eyebrow: '08 — Research & Development',
      title: 'Investing in what comes next',
      desc: 'Bridging hands-on research with digital science — advancing formulations, processes and technology for the medicines of tomorrow.',
      lab: 'In the laboratory',
    },
    global: {
      eyebrow: '09 — Global Partnership',
      title: 'A network that reaches the world',
      lead: 'From our base in Jaipur, India, ASLE builds international collaborations — supplying partners worldwide through global export and drop-shipping.',
    },
    manufacturing: {
      eyebrow: '10 — Manufacturing',
      title: 'Travel through our facility',
      stages: [
        { title: 'Entrance', desc: 'Controlled, hygienic entry.' },
        { title: 'Production', desc: 'Automated manufacturing lines.' },
        { title: 'Quality Control', desc: 'In-line inspection & testing.' },
        { title: 'Packaging', desc: 'Precision packing & labelling.' },
        { title: 'Warehouse', desc: 'Climate-controlled storage.' },
      ],
    },
    delivery: {
      eyebrow: '11 — Global Delivery',
      title1: 'Delivering Health.',
      title2: 'Delivering Hope.',
      lead: 'Medicines reaching partners and patients across the world — the message of health and hope, carried everywhere we go.',
      steps: [
        { label: 'Package' },
        { label: 'Transport' },
        { label: 'Export' },
        { label: 'World' },
      ],
      cta: 'Contact Us',
    },
    why: {
      eyebrow: 'Why ASLE Pharmaceuticals?',
      title: 'The principles behind our work',
      values: [
        { title: 'Patient Centric', sub: '患者中心の考え方' },
        { title: 'Quality First', sub: '品質を最優先' },
        { title: 'Affordable Healthcare', sub: '手頃で価値ある医療' },
        { title: 'Global Presence', sub: '世界への展開' },
        { title: 'Sustainable Future', sub: '持続可能な未来へ' },
      ],
    },
    footer: {
      title1: "Let's build better",
      title2: 'medicines together.',
      desc: 'Partner with ASLE Pharmaceuticals for third-party & OEM manufacturing, drop shipping and global export — with no minimum order quantity.',
      location: 'Jaipur, India',
      partner: 'Partner With Us',
      offer: 'What we offer',
      services: [
        'Third Party Manufacturing',
        'OEM Manufacturing',
        'Drop Shipping',
        'Global Export',
      ],
      tags: ['GMP-WHO', 'US-FDA aligned', 'No MOQ', 'International Collaboration'],
      rights: 'ASLE Pharmaceuticals. All rights reserved.',
      tagline: 'Better Medicines. Better Lives.',
    },
  },
};

export type Messages = (typeof MESSAGES)['ja'];

type I18nValue = {
  lang: Lang;
  setLang: (l: Lang) => void;
  toggle: () => void;
  m: Messages;
};

const I18nContext = createContext<I18nValue | null>(null);

const STORAGE_KEY = 'asle-lang';

export function I18nProvider({ children }: { children: React.ReactNode }) {
  // Japanese is the default display language.
  const [lang, setLangState] = useState<Lang>('ja');

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      if (saved === 'ja' || saved === 'en') setLangState(saved);
    } catch {
      /* localStorage unavailable — keep default */
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
    try {
      window.localStorage.setItem(STORAGE_KEY, lang);
    } catch {
      /* ignore */
    }
  }, [lang]);

  const setLang = (l: Lang) => setLangState(l);
  const toggle = () => setLangState((prev) => (prev === 'ja' ? 'en' : 'ja'));

  return (
    <I18nContext.Provider value={{ lang, setLang, toggle, m: MESSAGES[lang] }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n(): I18nValue {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error('useI18n must be used within I18nProvider');
  return ctx;
}
