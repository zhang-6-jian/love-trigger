<script setup>
import { nextTick, onMounted, ref } from 'vue'
import { closeModal } from '../lib/store'

defineProps({
  label: { type: String, default: '弹窗' },
  wide: { type: Boolean, default: false }
})

const cardRef = ref(null)

onMounted(async () => {
  await nextTick()
  cardRef.value
    ?.querySelector('.modal-card button, .modal-card input, .modal-card textarea')
    ?.focus({ preventScroll: true })
})
</script>

<template>
  <div class="modal-backdrop" role="presentation" @click.self="closeModal">
    <div
      ref="cardRef"
      class="modal-card"
      :class="{ 'is-wide': wide }"
      role="dialog"
      aria-modal="true"
      :aria-label="label"
    >
      <slot />
    </div>
  </div>
</template>
