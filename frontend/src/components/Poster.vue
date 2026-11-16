<script setup>
import { computed } from 'vue'

const props = defineProps({
  result: { type: Object, required: true },
  secondary: { type: Object, required: true },
  qr: { type: String, default: '' },
  serial: { type: String, required: true }
})

const date = computed(() =>
  new Date().toLocaleDateString('zh-CN', { year: 'numeric', month: '2-digit', day: '2-digit' })
)
</script>

<template>
  <div class="poster" :style="{ '--tc': result.color, '--ts': result.soft }">
    <header class="poster__head">
      <div>
        <span class="poster__brand">恋爱上头触发器</span>
        <span class="poster__sub">LOVE TRIGGER REPORT</span>
      </div>
      <div class="poster__serial">NO. {{ serial }}<br />{{ date }}</div>
    </header>

    <div class="poster__hero">
      <div class="poster__seal">
        <span>{{ result.symbol }}</span>
        <small>{{ result.english }}</small>
      </div>
      <p class="poster__kicker">你的主触发器</p>
      <h1>{{ result.name }}</h1>
      <p class="poster__tagline">{{ result.tagline }}</p>
      <div class="poster__keywords">
        <span v-for="keyword in result.keywords" :key="keyword">{{ keyword }}</span>
      </div>
    </div>

    <blockquote class="poster__quote">“{{ result.quote }}”</blockquote>

    <section class="poster__block">
      <h2><span>01</span> 你的心动现场</h2>
      <div v-for="(scene, index) in result.scenes" :key="scene" class="poster__scene">
        <b>0{{ index + 1 }}</b><p>{{ scene }}</p>
      </div>
    </section>

    <section class="poster__block">
      <h2><span>02</span> 心理学解释</h2>
      <h3 class="poster__theory-title">{{ result.theoryTitle }}</h3>
      <p class="poster__body">{{ result.theoryText }}</p>
      <small class="poster__source">{{ result.theorySource }}</small>
    </section>

    <section class="poster__block">
      <h2><span>03</span> 防上头指南</h2>
      <div v-for="(tip, index) in result.tips" :key="tip" class="poster__tip">
        <b>0{{ index + 1 }}</b><p>{{ tip }}</p>
      </div>
    </section>

    <section class="poster__block">
      <h2><span>04</span> 你的优势与高危时刻</h2>
      <div class="poster__two">
        <div><b>你的优势</b><p>{{ result.strengths }}</p></div>
        <div><b>高危时刻</b><p>{{ result.risks }}</p></div>
      </div>
    </section>

    <section class="poster__block">
      <h2><span>05</span> 适合与小心</h2>
      <div class="poster__two">
        <div><b>适合你的人</b><p>{{ result.match }}</p></div>
        <div><b>要小心的人</b><p>{{ result.avoid }}</p></div>
      </div>
    </section>

    <div class="poster__secondary">
      <span>你的第二触发器</span>
      <strong>{{ secondary.name }}</strong>
      <p>{{ secondary.quote }}</p>
    </div>

    <footer class="poster__footer">
      <div class="poster__qr">
        <img v-if="qr" :src="qr" alt="扫码测同款" />
      </div>
      <div>
        <strong>你是被哪个瞬间拿捏的？</strong>
        <p>19 道情境题 · 按性别+年龄段出题<br />扫码或搜索「恋爱上头触发器」</p>
      </div>
    </footer>
    <p class="poster__disclaimer">本测试仅供娱乐与自我观察，不构成心理诊断或恋爱建议。</p>
  </div>
</template>
