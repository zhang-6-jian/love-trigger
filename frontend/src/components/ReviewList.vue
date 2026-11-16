<script setup>
import { computed } from 'vue'
import { displayLikes, state, toggleLike } from '../lib/store'

const props = defineProps({
  limit: { type: Number, default: 0 },
  interactive: { type: Boolean, default: true },
  showWrite: { type: Boolean, default: false }
})

const emit = defineEmits(['write'])

const reviews = computed(() => {
  return props.limit > 0 ? state.reviews.slice(0, props.limit) : state.reviews
})

const average = computed(() => {
  const list = state.reviews
  if (!list.length) return '5.0'
  const sum = list.reduce((total, review) => total + Number(review.rating || 0), 0)
  return (sum / list.length).toFixed(1)
})

function stars(rating) {
  return '★'.repeat(rating) + '☆'.repeat(Math.max(0, 5 - rating))
}

function isLiked(review) {
  return state.likes.includes(String(review.id))
}
</script>

<template>
  <div v-if="!showWrite" class="section-head section-head--center">
    <p class="eyebrow">REVIEWS</p>
    <h2>好评有底</h2>
    <p class="section-sub">内测体验官的真实反馈。好不好测，测过的人说了算。</p>
  </div>

  <template v-else>
    <div class="review-head">
      <div>
        <p class="eyebrow">REVIEWS</p>
        <h2>好评有底</h2>
        <p class="review-sub">内测体验官的真实反馈。好不好测，测过的人说了算。</p>
      </div>
      <div class="review-score">
        <strong>{{ average }}</strong>
        <span>{{ stars(Math.round(Number(average))) }}</span>
        <small>{{ state.reviews.length }} 条内测好评</small>
      </div>
    </div>
  </template>

  <div class="review-grid">
    <article v-for="review in reviews" :key="review.id" class="review-card">
      <div class="review-card__top">
        <span class="avatar">{{ review.name.slice(0, 1) }}</span>
        <div class="review-card__id">
          <strong>{{ review.name }}</strong>
          <small>{{ review.tag || '内测体验官' }}</small>
        </div>
        <span class="stars" :aria-label="`${review.rating} 星`">{{ stars(review.rating) }}</span>
      </div>
      <p>{{ review.text }}</p>
      <div class="review-card__foot">
        <span>{{ review.date }}</span>
        <button
          v-if="interactive"
          class="like-btn"
          :class="{ 'is-liked': isLiked(review) }"
          aria-label="觉得这条好评有帮助"
          @click="toggleLike(review.id)"
        >
          <span>♡</span>{{ displayLikes(review) }}
        </button>
        <span v-else class="like-static">♡ {{ displayLikes(review) }}</span>
      </div>
    </article>
  </div>

  <button v-if="showWrite" class="review-write" @click="emit('write')">
    写一条好评 <span>→</span>
  </button>
</template>
