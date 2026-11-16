<script setup>
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { RESULTS, resultMeta } from '../data'
import {
  ageGroupLabel,
  copyResult,
  genderLabel,
  goHome,
  openModal,
  openPoster,
  serialNo,
  shareResult,
  state
} from '../lib/store'
import { PASS_PLAN } from '../lib/plans'
import Icon from './Icon.vue'
import ReviewList from './ReviewList.vue'

const result = computed(() => resultMeta(state.result.primary, state.gender))
const secondary = computed(() => RESULTS[state.result.secondary])
const dual = computed(() => state.result.dual)
const stickyVisible = ref(false)

function onScroll() {
  stickyVisible.value = window.scrollY > 360
}

onMounted(() => {
  window.addEventListener('scroll', onScroll, { passive: true })
  onScroll()
})
onBeforeUnmount(() => window.removeEventListener('scroll', onScroll))
</script>

<template>
  <main class="result-shell">
    <header class="result-nav">
      <button class="brand-mini" @click="goHome">← 首页</button>
      <span class="result-nav__tag">
        <template v-if="state.gender">{{ genderLabel() }} · </template>{{ ageGroupLabel() }} · 结果报告
      </span>
      <button class="icon-btn" aria-label="重新测试" @click="openModal('restart')"><Icon name="refresh" /></button>
    </header>

    <section class="result-hero" :style="{ '--tc': result.color, '--ts': result.soft }">
      <div class="result-hero__top">
        <span class="result-kicker">YOUR TRIGGER / 你的主触发器</span>
        <span class="result-serial">NO. {{ serialNo() }}</span>
      </div>
      <div class="result-hero__main">
        <div class="result-seal">
          <span>{{ result.symbol }}</span>
          <small>{{ result.english }}</small>
        </div>
        <div class="result-title-wrap">
          <p class="result-ratio">
            <template v-if="state.gender">{{ genderLabel() }} · </template>{{ ageGroupLabel() }} · 19 题结果
          </p>
          <h1>{{ result.name }}</h1>
          <p class="result-tagline">{{ result.tagline }}</p>
          <div class="keyword-row">
            <span v-for="keyword in result.keywords" :key="keyword">{{ keyword }}</span>
          </div>
        </div>
      </div>

      <div class="dual-note" :class="{ 'is-dual': dual }">
        <span>{{ dual ? '双拼型 · 你的副触发器' : '你的第二触发器' }}</span>
        <strong>{{ secondary.name }}</strong>
        <p>{{ secondary.quote }}</p>
      </div>

      <blockquote class="result-quote">“{{ result.quote }}”</blockquote>
    </section>

    <section class="result-actions" aria-label="结果操作">
      <button class="action-btn action-btn--primary" @click="openPoster">
        <Icon name="image" />
        <span><b>保存长图</b><small>存进手机相册</small></span>
      </button>
      <button class="action-btn" @click="copyResult">
        <Icon name="copy" />
        <span><b>复制结果</b><small>发给朋友</small></span>
      </button>
      <button class="action-btn" @click="shareResult">
        <Icon name="share" />
        <span><b>分享</b><small>邀请对方测</small></span>
      </button>
      <button class="action-btn" @click="openModal('restart')">
        <Icon name="refresh" />
        <span><b>再测一次</b><small>换个心境</small></span>
      </button>
    </section>

    <section class="result-section">
      <div class="section-head">
        <span class="section-no">01</span>
        <div><p class="eyebrow">SCENES</p><h2>你的心动现场</h2></div>
      </div>
      <div class="scene-list">
        <article v-for="(scene, index) in result.scenes" :key="scene" class="scene">
          <span>0{{ index + 1 }}</span>
          <p>{{ scene }}</p>
        </article>
      </div>
    </section>

    <section class="result-section">
      <div class="section-head">
        <span class="section-no">02</span>
        <div><p class="eyebrow">PSYCHOLOGY</p><h2>你为什么会这样</h2></div>
      </div>
      <div class="theory-card">
        <span class="theory-label">心理学解释</span>
        <h3>{{ result.theoryTitle }}</h3>
        <p>{{ result.theoryText }}</p>
        <small>{{ result.theorySource }}</small>
      </div>
    </section>

    <section class="result-section">
      <div class="split-grid">
        <article class="mini-card">
          <span class="mini-card__label">你的优势</span>
          <p>{{ result.strengths }}</p>
        </article>
        <article class="mini-card mini-card--warn">
          <span class="mini-card__label">高危时刻</span>
          <p>{{ result.risks }}</p>
        </article>
      </div>
    </section>

    <section class="result-section">
      <div class="section-head">
        <span class="section-no">03</span>
        <div><p class="eyebrow">SURVIVAL GUIDE</p><h2>防上头指南</h2></div>
      </div>
      <ol class="tips">
        <li v-for="(tip, index) in result.tips" :key="tip">
          <span>0{{ index + 1 }}</span>
          <p>{{ tip }}</p>
        </li>
      </ol>
    </section>

    <section class="result-section">
      <div class="match-grid">
        <article class="match-card">
          <span class="match-card__label">适合你的人</span>
          <p>{{ result.match }}</p>
        </article>
        <article class="match-card match-card--avoid">
          <span class="match-card__label">要小心的人</span>
          <p>{{ result.avoid }}</p>
        </article>
      </div>
    </section>

    <section id="reviews" class="result-section review-section">
      <ReviewList :interactive="true" :show-write="true" @write="openModal('review')" />
    </section>

    <section class="result-section upsell">
      <div class="section-head">
        <span class="section-no">04</span>
        <div><p class="eyebrow">UNLOCK</p><h2>保存这份结果</h2></div>
      </div>
      <article class="upsell-card">
        <div class="upsell-card__top">
          <h3>{{ PASS_PLAN.name }}</h3>
          <span class="upsell-card__badge">¥{{ PASS_PLAN.price }}</span>
        </div>
        <p class="upsell-card__desc">{{ PASS_PLAN.desc }}</p>
        <ul class="upsell-card__list">
          <li v-for="feature in PASS_PLAN.features" :key="feature">{{ feature }}</li>
        </ul>
        <button type="button" class="btn btn--primary" @click="openPoster">
          {{ state.unlocked ? '保存结果长图' : `¥${PASS_PLAN.price} 解锁并保存长图` }}
        </button>
      </article>
    </section>

    <section class="result-footer-cta">
      <p class="eyebrow">SEND IT TO SOMEONE</p>
      <h2>把这个测试，发给那个总让你上头的人。</h2>
      <div>
        <button class="btn btn--primary" @click="shareResult">分享给对方</button>
        <button class="btn btn--ghost" @click="openPoster">保存长图</button>
      </div>
    </section>

    <footer class="site-footer">
      <div class="site-footer__brand">恋爱上头触发器 <span>·</span> 上头研究所</div>
      <p>本测试仅供娱乐与自我观察，不构成心理诊断或恋爱建议。</p>
      <p class="site-footer__meta">© 2026 LOVE TRIGGER LAB · 内测版</p>
    </footer>

    <div class="sticky-actions" :class="{ 'is-visible': stickyVisible }" aria-label="快捷操作">
      <button @click="openPoster"><Icon name="image" />保存长图</button>
      <button @click="shareResult"><Icon name="share" />分享</button>
    </div>
  </main>
</template>

<style scoped>
.upsell-lead {
  margin: -6px 0 18px;
  color: var(--muted);
  font-size: 13.5px;
  line-height: 1.7;
}

.upsell-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 14px;
}

.upsell-card {
  display: flex;
  flex-direction: column;
  max-width: 520px;
  margin: 0 auto;
  padding: 20px 18px;
  border: 1px solid var(--accent);
  border-radius: 16px;
  background: linear-gradient(180deg, #fff6f3 0%, var(--paper) 40%);
}

.upsell-card.is-hot {
  border-color: var(--accent);
  background: linear-gradient(180deg, #fff6f3 0%, var(--paper) 40%);
}

.upsell-card__top {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 4px;
}

.upsell-card__top h3 {
  margin: 0;
  font-family: var(--serif);
  font-size: 18px;
}

.upsell-card__badge {
  padding: 2px 8px;
  border-radius: 999px;
  background: var(--accent);
  color: #fff;
  font-size: 10px;
  white-space: nowrap;
}

.upsell-card__desc {
  margin: 0 0 10px;
  color: var(--muted);
  font-size: 12.5px;
}

.upsell-card__price {
  margin: 0 0 12px;
  color: var(--accent);
  font-family: var(--serif);
  font-size: 26px;
  line-height: 1;
}

.upsell-card__price span {
  margin-right: 2px;
  font-size: 14px;
}

.upsell-card__price small {
  margin-left: 4px;
  color: var(--muted);
  font-family: var(--sans);
  font-size: 11px;
}

.upsell-card__list {
  display: grid;
  flex: 1;
  gap: 6px;
  margin: 0 0 16px;
  padding: 0;
  list-style: none;
}

.upsell-card__list li {
  position: relative;
  padding-left: 13px;
  color: var(--ink);
  font-size: 12.5px;
  line-height: 1.6;
}

.upsell-card__list li::before {
  position: absolute;
  left: 2px;
  color: var(--accent);
  font-weight: 700;
  content: '·';
}

.upsell-card .btn {
  width: 100%;
  justify-content: center;
}

@media (max-width: 620px) {
  .upsell-grid {
    grid-template-columns: 1fr;
  }
}
</style>
