<script setup>
import { computed, ref } from 'vue'
import { RESULTS } from '../data'
import { closeModal, showToast, state, submitReview } from '../lib/store'
import ModalShell from './ModalShell.vue'
import Icon from './Icon.vue'

const rating = ref(5)
const name = ref('')
const text = ref('')
const submitting = ref(false)

const tag = computed(() => (state.result ? RESULTS[state.result.primary].name : '内测体验官'))

async function submit() {
  if (submitting.value) return
  const content = text.value.trim()
  if (content.length < 4) {
    showToast('再多写几个字吧')
    return
  }
  submitting.value = true
  try {
    await submitReview({
      name: name.value.trim().slice(0, 12) || '匿名体验官',
      rating: rating.value,
      text: content.slice(0, 160),
      tag: tag.value
    })
    closeModal()
    showToast('好评已记录，谢谢你')
    requestAnimationFrame(() => {
      document.querySelector('#reviews')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    })
  } catch (error) {
    showToast(error.message || '提交失败，请稍后再试')
    submitting.value = false
  }
}
</script>

<template>
  <ModalShell label="写好评">
    <div class="modal-head">
      <span>好评有底</span>
      <button class="icon-btn" aria-label="关闭" @click="closeModal"><Icon name="close" /></button>
    </div>
    <h2 class="modal-title">写一条真实反馈</h2>
    <p class="modal-desc">你的感受会帮我们把测试做得更准，也会出现在这里。</p>
    <form class="review-form" @submit.prevent="submit">
      <div class="star-input" role="radiogroup" aria-label="评分">
        <button
          v-for="value in [1, 2, 3, 4, 5]"
          :key="value"
          type="button"
          class="star-btn"
          :class="{ 'is-on': value <= rating }"
          :aria-label="`${value} 星`"
          @click="rating = value"
        >
          ★
        </button>
      </div>
      <label>怎么称呼你<input v-model="name" name="name" maxlength="12" placeholder="匿名也可以" autocomplete="nickname" /></label>
      <label>哪一句最戳你？<textarea v-model="text" name="text" maxlength="160" rows="4" placeholder="写下你的真实感受..." required></textarea></label>
      <div class="modal-actions">
        <button type="button" class="btn btn--ghost" @click="closeModal">取消</button>
        <button type="submit" class="btn btn--primary" :disabled="submitting">
          {{ submitting ? '提交中...' : '提交好评' }}
        </button>
      </div>
    </form>
  </ModalShell>
</template>
