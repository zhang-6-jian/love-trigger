<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { boot, chooseAnswer, closeModal, goBack, state } from './lib/store'
import LandingView from './components/LandingView.vue'
import QuizView from './components/QuizView.vue'
import AnalyzingView from './components/AnalyzingView.vue'
import ResultView from './components/ResultView.vue'
import StatsView from './components/StatsView.vue'
import ShareModal from './components/ShareModal.vue'
import PosterModal from './components/PosterModal.vue'
import ReviewModal from './components/ReviewModal.vue'
import AgeModal from './components/AgeModal.vue'
import ConfirmModal from './components/ConfirmModal.vue'
import UnlockModal from './components/UnlockModal.vue'
import AdminView from './components/AdminView.vue'

const isAdmin = ref(false)

function syncAdmin() {
  isAdmin.value = location.hash.replace(/^#/, '').toLowerCase() === 'admin'
}

function onKeydown(event) {
  if (event.key === 'Escape') {
    if (state.modal) closeModal()
    return
  }
  if (state.screen !== 'quiz' || state.modal) return

  if (['1', '2', '3'].includes(event.key)) {
    const option = state.questions[state.index]?.options[Number(event.key) - 1]
    if (option) chooseAnswer(option.type)
  }
  if (event.key === 'ArrowLeft') goBack()
}

onMounted(() => {
  boot()
  syncAdmin()
  window.addEventListener('keydown', onKeydown)
  window.addEventListener('hashchange', syncAdmin)
})
onBeforeUnmount(() => {
  window.removeEventListener('keydown', onKeydown)
  window.removeEventListener('hashchange', syncAdmin)
})
</script>

<template>
  <AdminView v-if="isAdmin" />

  <template v-else>
    <LandingView v-if="state.screen === 'landing'" />
    <QuizView v-else-if="state.screen === 'quiz'" />
    <AnalyzingView v-else-if="state.screen === 'analyzing'" />
    <ResultView v-else-if="state.screen === 'result'" />
    <StatsView v-else-if="state.screen === 'stats'" />

    <ShareModal v-if="state.modal === 'share'" />
    <PosterModal v-if="state.modal === 'poster'" />
    <ReviewModal v-if="state.modal === 'review'" />
    <AgeModal v-if="state.modal === 'age'" />
    <UnlockModal v-if="state.modal === 'unlock'" />
    <ConfirmModal v-if="state.modal === 'restart' || state.modal === 'exit'" :kind="state.modal" />

    <div class="toast" :class="{ 'is-show': state.toastVisible }" role="status" aria-live="polite">
      {{ state.toast }}
    </div>
  </template>
</template>
