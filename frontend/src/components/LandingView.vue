<script setup>
import { computed } from 'vue'
import { RESULTS, TYPE_ORDER } from '../data'
import {
  TOTAL,
  ageGroupLabel,
  answeredCount,
  goHome,
  openAgeModal,
  openModal,
  startQuiz,
  state,
  viewResult
} from '../lib/store'
import Icon from './Icon.vue'
import ReviewList from './ReviewList.vue'

const answered = computed(() => answeredCount())
const allDone = computed(() => answered.value === TOTAL)
const hasProgress = computed(() => answered.value > 0 && !allDone.value)
const primaryAction = computed(() => {
  if (allDone.value) return 'view-result'
  if (hasProgress.value) return 'resume'
  return 'start'
})
const primaryLabel = computed(() => {
  if (allDone.value) return '查看上次结果'
  if (hasProgress.value) return `继续上次测试 · ${answered.value}/${TOTAL}`
  return '开始测试'
})
const totalText = computed(() => {
  const total = state.stats.totalAssessments
  return total > 0 ? total.toLocaleString('zh-CN') : '0'
})

function runPrimary() {
  if (primaryAction.value === 'view-result') {
    viewResult()
    return
  }
  startQuiz(false)
}

function startFresh() {
  startQuiz(answeredCount() === TOTAL)
}

function scrollTo(selector) {
  document.querySelector(selector)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}
</script>

<template>
  <div class="site">
    <header class="landing-header">
      <a class="brand" href="#" aria-label="返回首页" @click.prevent="goHome">
        <span class="brand__mark">上</span>
        <span class="brand__text"><b>上头研究所</b><small>LOVE TRIGGER LAB</small></span>
      </a>
      <nav class="landing-nav">
        <button class="nav-link" @click="scrollTo('#types')">6 种类型</button>
        <button class="nav-link" @click="scrollTo('#reviews')">好评有底</button>
        <button class="btn btn--small btn--primary" @click="runPrimary">
          {{ allDone ? '看结果' : '开始测试' }}
        </button>
      </nav>
    </header>

    <main>
      <section class="hero">
        <div class="hero__copy">
          <p class="eyebrow"><span class="eyebrow__dot"></span>恋爱人格 · 按年龄段出题 · 约 4 分钟</p>
          <h1>你不是恋爱脑，<br /><em>你只是被某个瞬间</em><br />拿捏了。</h1>
          <p class="hero__lead">
            18 道贴近你所在年龄段的情境题，拆出你在恋爱里最容易上头的那个瞬间。不是给你贴标签，是让你看清自己的“心动开关”。
          </p>
          <div class="hero__actions">
            <button class="btn btn--primary btn--large" @click="runPrimary">
              {{ primaryLabel }}<Icon name="arrow" />
            </button>
            <button
              v-if="allDone || hasProgress"
              class="btn btn--ghost btn--large"
              @click="openModal('restart')"
            >
              重新开始
            </button>
          </div>
          <div class="hero__age">
            <template v-if="state.ageGroup">
              当前年龄段：<b>{{ ageGroupLabel() }}</b>
              <button type="button" @click="openAgeModal">更换</button>
            </template>
            <template v-else>开始前先选年龄段，题目会按阶段变化。</template>
          </div>
          <div class="hero__meta">
            <span>6 种触发器</span><i></i><span>18 个真实瞬间</span><i></i><span>结果可存长图</span>
          </div>
        </div>

        <div class="hero__visual" aria-hidden="true">
          <div class="hero-card hero-card--back"></div>
          <div class="hero-card hero-card--mid"></div>
          <article class="hero-card hero-card--main">
            <div class="hero-card__top"><span>恋爱上头触发器</span><span>内测版</span></div>
            <div class="hero-card__seal">6<small>种触发器</small></div>
            <p class="hero-card__kicker">YOUR TRIGGER</p>
            <h2>你会被<br />哪个瞬间<br /><em>击中？</em></h2>
            <div class="hero-card__list">
              <div v-for="(type, index) in TYPE_ORDER" :key="type">
                <span :style="{ '--dot': RESULTS[type].color }"></span>{{ RESULTS[type].short }}<b>0{{ index + 1 }}</b>
              </div>
            </div>
            <div class="hero-card__foot">18 QUESTIONS · 4 MIN</div>
          </article>
          <div class="float-chip float-chip--a">心动不是玄学<br /><b>是有开关的</b></div>
          <div class="float-chip float-chip--b">已生成 {{ totalText }} 份<br /><b>心动诊断书</b></div>
        </div>
      </section>

      <section id="types" class="section">
        <div class="section-head section-head--center">
          <p class="eyebrow">THE 6 TRIGGERS</p>
          <h2>你会被哪种瞬间击中？</h2>
          <p class="section-sub">没有好坏，只有你更容易在哪一类瞬间里沦陷。</p>
        </div>
        <div class="type-grid">
          <article
            v-for="(type, index) in TYPE_ORDER"
            :key="type"
            class="type-card"
            :style="{ '--tc': RESULTS[type].color, '--ts': RESULTS[type].soft }"
          >
            <div class="type-card__top"><span>0{{ index + 1 }}</span><span>{{ RESULTS[type].english }}</span></div>
            <div class="type-card__symbol">{{ RESULTS[type].symbol }}</div>
            <h3>{{ RESULTS[type].name }}</h3>
            <p>{{ RESULTS[type].tagline }}</p>
            <div class="type-card__tags">
              <span v-for="keyword in RESULTS[type].keywords" :key="keyword">{{ keyword }}</span>
            </div>
            <button class="type-card__cta" @click="startFresh">测测我是不是 <span>→</span></button>
          </article>
        </div>
      </section>

      <section class="section how">
        <div class="section-head">
          <p class="eyebrow">HOW IT WORKS</p>
          <h2>5 分钟，完成一次心动体检</h2>
        </div>
        <div class="step-grid">
          <article class="step-card">
            <span class="step-card__no">01</span>
            <h3>凭第一反应选</h3>
            <p>18 道贴近你年龄段的情境题，没有标准答案，也别想太久。</p>
          </article>
          <article class="step-card">
            <span class="step-card__no">02</span>
            <h3>拆出你的触发器</h3>
            <p>6 种类型，主类型 + 副类型，看清你最容易在哪类瞬间里沦陷。</p>
          </article>
          <article class="step-card">
            <span class="step-card__no">03</span>
            <h3>拿走你的诊断书</h3>
            <p>结果可保存长图、复制、分享，也可以发给那个总让你上头的人。</p>
          </article>
        </div>
      </section>

      <section id="reviews" class="section reviews-preview">
        <ReviewList :limit="3" :interactive="false" />
        <div class="reviews-preview__cta">
          <button class="btn btn--primary" @click="runPrimary">
            {{ allDone ? '查看我的结果' : '我也要测' }}
          </button>
        </div>
      </section>

      <section class="section faq">
        <div class="section-head">
          <p class="eyebrow">FAQ</p>
          <h2>测之前，你可能想问</h2>
        </div>
        <div class="faq-list">
          <details>
            <summary>这个测试准吗？</summary>
            <p>它不负责诊断你，只负责把你熟悉的瞬间说清楚。结果基于 6 种常见的心动触发器，适合自我观察和聊天，不构成心理诊断。</p>
          </details>
          <details>
            <summary>要答多久？</summary>
            <p>18 题，大约 4 分钟。开始前先选年龄段，题目会对应你的阶段；选择后自动进入下一题，也可以随时返回修改。</p>
          </details>
          <details>
            <summary>结果能保存吗？</summary>
            <p>可以生成一张完整长图，保存到手机相册；也支持复制结果文字和一键分享。</p>
          </details>
          <details>
            <summary>会收集我的信息吗？</summary>
            <p>不需要登录。答题进度保存在当前浏览器，好评和点赞会同步到服务器。</p>
          </details>
        </div>
      </section>

      <section class="final-cta">
        <p class="eyebrow">READY?</p>
        <h2>现在，去看看你的心动开关。</h2>
        <button class="btn btn--primary btn--large" @click="runPrimary">
          {{ primaryLabel }}<Icon name="arrow" />
        </button>
      </section>
    </main>

    <footer class="site-footer">
      <div class="site-footer__brand">恋爱上头触发器 <span>·</span> 上头研究所</div>
      <p>本测试仅供娱乐与自我观察，不构成心理诊断或恋爱建议。</p>
      <p class="site-footer__meta">© 2026 LOVE TRIGGER LAB · 内测版</p>
    </footer>
  </div>
</template>
