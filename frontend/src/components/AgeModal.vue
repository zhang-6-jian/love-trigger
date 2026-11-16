<script setup>
import { ref } from 'vue'
import { AGE_OPTIONS, GENDER_OPTIONS, closeModal, startWithChoices, state } from '../lib/store'
import ModalShell from './ModalShell.vue'
import Icon from './Icon.vue'

const selectedGender = ref(state.gender || '')
const selectedAge = ref(state.ageGroup || '')

function confirm() {
  if (!selectedGender.value || !selectedAge.value) return
  startWithChoices(selectedAge.value, selectedGender.value)
}
</script>

<template>
  <ModalShell label="选择基本信息">
    <div class="modal-head">
      <span>先选你的性别和年龄段</span>
      <button class="icon-btn" aria-label="关闭" @click="closeModal"><Icon name="close" /></button>
    </div>
    <h2 class="modal-title">先告诉我们你是谁</h2>
    <p class="modal-desc">不同性别、不同年龄段的心动场景不一样，题目会对应调整，让你更有共鸣。</p>

    <!-- 性别选择 -->
    <div class="gender-row">
      <button
        v-for="g in GENDER_OPTIONS"
        :key="g.id"
        type="button"
        class="gender-option"
        :class="{ 'is-on': selectedGender === g.id }"
        @click="selectedGender = g.id"
      >
        <span class="gender-option__icon">{{ g.id === 'female' ? '♀' : '♂' }}</span>
        <b>{{ g.label }}</b>
      </button>
    </div>

    <!-- 年龄选择 -->
    <div class="age-grid">
      <button
        v-for="group in AGE_OPTIONS"
        :key="group.id"
        type="button"
        class="age-option"
        :class="{ 'is-on': selectedAge === group.id }"
        @click="selectedAge = group.id"
      >
        <b>{{ group.label }}</b>
        <small>{{ group.hint }}</small>
      </button>
    </div>

    <p v-if="state.ageGroup && state.gender" class="age-warn">更换会清空当前进度，重新开始答题。</p>

    <div class="modal-actions">
      <button type="button" class="btn btn--ghost" @click="closeModal">取消</button>
      <button
        type="button"
        class="btn btn--primary"
        :disabled="!selectedGender || !selectedAge"
        @click="confirm"
      >
        开始答题
      </button>
    </div>
  </ModalShell>
</template>

<style scoped>
.gender-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  margin: 20px 0 8px;
}

.gender-option {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 14px 16px;
  border: 1px solid var(--line);
  border-radius: 14px;
  background: rgba(255, 253, 249, 0.7);
  text-align: center;
  transition:
    border-color 0.2s ease,
    background 0.2s ease,
    transform 0.2s ease;
}

.gender-option:hover {
  border-color: #c9b3a4;
  transform: translateY(-1px);
}

.gender-option.is-on {
  border-color: var(--accent);
  background: var(--rose);
}

.gender-option__icon {
  font-size: 20px;
  font-family: serif;
}

.age-grid {
  display: grid;
  gap: 10px;
  margin: 14px 0 8px;
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
