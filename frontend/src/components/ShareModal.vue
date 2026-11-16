<script setup>
import { computed } from 'vue'
import { resultMeta } from '../data'
import { closeModal, copyText, openPoster, shareUrl, showToast, state } from '../lib/store'
import ModalShell from './ModalShell.vue'
import Icon from './Icon.vue'

const result = computed(() => resultMeta(state.result.primary, state.gender))

async function copyLink() {
  const ok = await copyText(shareUrl())
  showToast(ok ? '链接已复制，去粘贴给朋友吧' : '复制失败，请手动复制地址栏')
  if (ok) closeModal()
}

function savePoster() {
  openPoster()
}
</script>

<template>
  <ModalShell label="分享结果">
    <div class="modal-head">
      <span>分享结果</span>
      <button class="icon-btn" aria-label="关闭" @click="closeModal"><Icon name="close" /></button>
    </div>
    <h2 class="modal-title">把这个瞬间，<br />发给懂的人。</h2>
    <p class="modal-desc">{{ result.shareTitle }}</p>
    <div class="share-preview" :style="{ '--tc': result.color, '--ts': result.soft }">
      <span class="share-preview__symbol">{{ result.symbol }}</span>
      <div><strong>{{ result.name }}</strong><small>{{ result.tagline }}</small></div>
    </div>
    <div class="modal-actions modal-actions--stack">
      <button class="btn btn--primary" @click="copyLink">复制链接</button>
      <button class="btn btn--ghost" @click="savePoster">保存长图再分享</button>
    </div>
    <p class="modal-hint">微信 / 朋友圈：复制链接后粘贴；或保存长图直接发图片。</p>
  </ModalShell>
</template>
