<script setup>
import { RESULTS, TYPE_ORDER } from '../data'
import Icon from './Icon.vue'
</script>

<template>
  <main class="analyze-shell">
    <div class="analyze-orb" aria-hidden="true">
      <span v-for="(type, index) in TYPE_ORDER" :key="type" :style="{ '--i': index }">
        {{ RESULTS[type].symbol }}
      </span>
      <div class="analyze-orb__core"><Icon name="heart" /></div>
    </div>
    <p class="eyebrow">ANALYSING YOUR TRIGGER</p>
    <h2>18 个瞬间，<br />正在拼成你的答案。</h2>
    <div class="analyze-steps">
      <span>拆解情境</span><i></i><span>匹配触发器</span><i></i><span>生成诊断书</span>
    </div>
  </main>
</template>
