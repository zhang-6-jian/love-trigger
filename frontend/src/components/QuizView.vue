<script setup>
import { computed, nextTick, ref, watch } from 'vue'
import { QUESTIONS } from '../data'
import { TOTAL, answeredCount, chooseAnswer, goBack, openModal, state } from '../lib/store'
import Icon from './Icon.vue'

const titleRef = ref(null)

const question = computed(() => QUESTIONS[state.index])
const selected = computed(() => state.answers[state.index])
const progress = computed(() => Math.max(2, Math.round((answeredCount() / TOTAL) * 100)))

watch(
  () => state.index,
  async () => {
    await nextTick()
    titleRef.value?.focus({ preventScroll: true })
  }
)

nextTick(() => titleRef.value?.focus({ preventScroll: true }))
</script>

<template>
  <main class="quiz-shell">
    <header class="quiz-top">
      <button class="icon-btn" aria-label="退出测试" @click="openModal('exit')"><Icon name="close" /></button>
      <div class="quiz-progress">
        <div class="quiz-progress__meta">
          <span>第 {{ String(state.index + 1).padStart(2, '0') }} 题</span>
          <span>{{ progress }}%</span>
        </div>
        <div class="quiz-progress__bar"><span :style="{ width: `${progress}%` }"></span></div>
      </div>
      <span class="quiz-count">{{ String(state.index + 1).padStart(2, '0') }} / {{ TOTAL }}</span>
    </header>

    <section class="quiz-card" aria-live="polite">
      <div class="quiz-card__tag">{{ question.group }}</div>
      <h2 ref="titleRef" class="question-title" tabindex="-1">{{ question.text }}</h2>
      <div class="options">
        <button
          v-for="(option, index) in question.options"
          :key="`${question.id}-${option.type}`"
          class="option"
          :class="{ 'is-selected': selected === option.type }"
          :style="{ '--delay': `${index * 55}ms` }"
          @click="chooseAnswer(option.type)"
        >
          <span class="option__index">{{ String.fromCharCode(65 + index) }}</span>
          <span class="option__text">{{ option.text }}</span>
          <span class="option__check">✓</span>
        </button>
      </div>
      <p class="quiz-hint">选择后自动进入下一题 · 也可以按 1 / 2 / 3</p>
    </section>

    <footer class="quiz-foot">
      <button class="text-btn" :disabled="state.index === 0" @click="goBack">← 上一题</button>
      <span>凭第一反应选，别想太久</span>
    </footer>
  </main>
</template>
