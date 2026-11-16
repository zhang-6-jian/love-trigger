<script setup>
import { ref } from 'vue'
import { AGE_OPTIONS, closeModal, startWithAge, state } from '../lib/store'
import ModalShell from './ModalShell.vue'
import Icon from './Icon.vue'

const selected = ref(state.ageGroup || '')

function confirm() {
  if (!selected.value) return
  startWithAge(selected.value)
}
</script>

<template>
  <ModalShell label="选择年龄段">
    <div class="modal-head">
      <span>按年龄段出题</span>
      <button class="icon-btn" aria-label="关闭" @click="closeModal"><Icon name="close" /></button>
    </div>
    <h2 class="modal-title">先选你的年龄段</h2>
    <p class="modal-desc">不同阶段的心动场景不一样。选一个最接近的，题目会对应调整。</p>

    <div class="age-grid">
      <button
        v-for="group in AGE_OPTIONS"
        :key="group.id"
        type="button"
        class="age-option"
        :class="{ 'is-on': selected === group.id }"
        @click="selected = group.id"
      >
        <b>{{ group.label }}</b>
        <small>{{ group.hint }}</small>
      </button>
    </div>

    <p v-if="state.ageGroup" class="age-warn">更换年龄段会清空当前进度，重新开始答题。</p>

    <div class="modal-actions">
      <button type="button" class="btn btn--ghost" @click="closeModal">取消</button>
      <button type="button" class="btn btn--primary" :disabled="!selected" @click="confirm">
        开始答题
      </button>
    </div>
  </ModalShell>
</template>

<style scoped>
.age-grid {
  display: grid;
  gap: 10px;
  margin: 20px 0 8px;
}

.age-option {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 14px 16px;
  border: 1px solid var(--line);
  border-radius: 14px;
  background: rgba(255, 253, 249, 0.7);
  text-align: left;
  transition:
    border-color 0.2s ease,
    background 0.2s ease,
    transform 0.2s ease;
}

.age-option:hover {
  border-color: #c9b3a4;
  transform: translateY(-1px);
}

.age-option.is-on {
  border-color: var(--accent);
  background: var(--rose);
}

.age-option b {
  font-size: 15px;
}

.age-option small {
  color: var(--muted);
  font-size: 12px;
}

.age-warn {
  margin: 8px 0 0;
  color: var(--muted);
  font-size: 12px;
}
</style>
