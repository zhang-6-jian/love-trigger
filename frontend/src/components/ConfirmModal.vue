<script setup>
import { computed } from 'vue'
import { closeModal, goHome, resetProgress, startQuiz } from '../lib/store'
import ModalShell from './ModalShell.vue'
import Icon from './Icon.vue'

const props = defineProps({
  kind: { type: String, required: true }
})

const content = computed(() => {
  if (props.kind === 'restart') {
    return {
      head: '重新开始',
      title: '要重新测一次吗？',
      desc: '当前答题进度会被清空，已生成的结果也会消失。',
      confirm: '重新开始',
      cancel: '取消'
    }
  }
  return {
    head: '先休息一下',
    title: '要退出测试吗？',
    desc: '你的进度已经保存在本地，下次打开可以继续。',
    confirm: '退出',
    cancel: '继续答题'
  }
})

function confirm() {
  closeModal()
  if (props.kind === 'restart') {
    resetProgress()
    startQuiz(true)
  } else {
    goHome()
  }
}
</script>

<template>
  <ModalShell :label="content.head">
    <div class="modal-head">
      <span>{{ content.head }}</span>
      <button class="icon-btn" aria-label="关闭" @click="closeModal"><Icon name="close" /></button>
    </div>
    <h2 class="modal-title">{{ content.title }}</h2>
    <p class="modal-desc">{{ content.desc }}</p>
    <div class="modal-actions">
      <button class="btn btn--ghost" @click="closeModal">{{ content.cancel }}</button>
      <button class="btn btn--primary" @click="confirm">{{ content.confirm }}</button>
    </div>
  </ModalShell>
</template>
