<script setup>
import { computed, nextTick, onMounted, ref, watch } from 'vue'
import html2canvas from 'html2canvas'
import QRCode from 'qrcode'
import { RESULTS, resultMeta } from '../data'
import { closeModal, serialNo, shareUrl, showToast, state } from '../lib/store'
import { shareBlobFile, posterFilename } from '../lib/poster'
import ModalShell from './ModalShell.vue'
import Poster from './Poster.vue'
import PosterSquare from './PosterSquare.vue'
import Icon from './Icon.vue'

const posterRoot = ref(null)
const posterRef = ref(null)
const squareRef = ref(null)
const mode = ref('long')
const qr = ref('')
const dataUrl = ref('')
const blob = ref(null)
const failed = ref(false)
const isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent)

const result = computed(() => resultMeta(state.result.primary, state.gender))
const secondary = computed(() => RESULTS[state.result.secondary])
const serial = computed(() => serialNo())
const filename = computed(() => {
  const base = posterFilename(result.value.name, serial.value)
  return mode.value === 'square' ? base.replace(/\.png$/i, '-3x4.png') : base
})
const hint = computed(() =>
  isIOS
    ? 'iPhone：点“保存到相册”走系统分享，或长按图片选择“存储到照片”。'
    : '安卓：点“保存到相册”下载图片；分享时可发给朋友。'
)

function waitForImages(root) {
  const images = [...root.querySelectorAll('img')]
  return Promise.all(
    images.map((image) =>
      image.complete
        ? Promise.resolve()
        : new Promise((resolve) => {
            image.onload = resolve
            image.onerror = resolve
          })
    )
  )
}

function nextFrame() {
  return new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)))
}

async function generate() {
  dataUrl.value = ''
  blob.value = null
  failed.value = false
  try {
    if (!qr.value) {
      qr.value = await QRCode.toDataURL(shareUrl(), {
        width: 180,
        margin: 1,
        color: { dark: '#2a211d', light: '#fffdf9' }
      })
    }
    await nextTick()
    if (document.fonts?.ready) await document.fonts.ready
    await waitForImages(posterRoot.value)
    await nextFrame()

    const element = mode.value === 'long' ? posterRef.value?.$el : squareRef.value?.$el
    if (!element) throw new Error('海报节点未就绪')

    const canvas = await html2canvas(element, {
      scale: 2,
      backgroundColor: '#fbf7f2',
      useCORS: true,
      logging: false,
      width: 750,
      height: mode.value === 'long' ? element.scrollHeight : 1000,
      windowWidth: 750
    })
    blob.value = await new Promise((resolve, reject) => {
      canvas.toBlob((value) => (value ? resolve(value) : reject(new Error('生成图片失败'))), 'image/png')
    })
    dataUrl.value = canvas.toDataURL('image/png')
  } catch (error) {
    console.error(error)
    failed.value = true
    showToast('图片生成失败，请重试')
  }
}

async function saveToAlbum() {
  if (!blob.value) return
  const status = await shareBlobFile(
    blob.value,
    filename.value,
    '我的恋爱上头触发器',
    '看看你的心动开关是哪一种？'
  )
  if (status === 'downloaded') showToast('图片已开始下载')
}

async function sharePoster() {
  if (!blob.value) return
  const status = await shareBlobFile(
    blob.value,
    filename.value,
    '我的恋爱上头触发器',
    '看看你的心动开关是哪一种？'
  )
  if (status === 'downloaded') showToast('图片已下载，可手动分享')
}

watch(mode, () => generate())
onMounted(generate)
</script>

<template>
  <ModalShell label="保存图片" wide>
    <div class="modal-head">
      <span>保存图片</span>
      <button class="icon-btn" aria-label="关闭" @click="closeModal"><Icon name="close" /></button>
    </div>
    <h2 class="modal-title">你的心动诊断书</h2>
    <p class="modal-desc">
      {{ mode === 'long' ? '长图按结果页内容生成，适合发朋友圈或聊天。' : '竖版 3:4 卡图，适合发小红书 / 朋友圈九宫格。' }}
    </p>

    <div class="poster-tabs">
      <button type="button" :class="{ 'is-on': mode === 'long' }" @click="mode = 'long'">长图</button>
      <button type="button" :class="{ 'is-on': mode === 'square' }" @click="mode = 'square'">
        小红书 3:4
      </button>
    </div>

    <div class="poster-preview">
      <img v-if="dataUrl" :src="dataUrl" alt="你的恋爱上头触发器图片" />
      <div v-else-if="failed" class="poster-error">图片生成失败，请关闭后重试。</div>
      <div v-else class="poster-loading"><span class="spinner"></span>正在生成图片...</div>
    </div>

    <div v-if="dataUrl" class="poster-actions">
      <button class="btn btn--primary" @click="saveToAlbum">保存到相册</button>
      <button class="btn btn--ghost" @click="sharePoster">分享图片</button>
    </div>
    <p class="modal-hint">{{ hint }}</p>

    <div id="poster-root" ref="posterRoot" aria-hidden="true">
      <Poster
        v-if="mode === 'long'"
        ref="posterRef"
        :result="result"
        :secondary="secondary"
        :qr="qr"
        :serial="serial"
      />
      <PosterSquare
        v-else
        ref="squareRef"
        :result="result"
        :secondary="secondary"
        :qr="qr"
        :serial="serial"
      />
    </div>
  </ModalShell>
</template>

<style scoped>
.poster-tabs {
  display: inline-flex;
  gap: 4px;
  margin: 4px 0 14px;
  padding: 3px;
  border-radius: 999px;
  background: rgba(0, 0, 0, 0.05);
}

.poster-tabs button {
  padding: 6px 16px;
  border: 0;
  border-radius: 999px;
  background: transparent;
  color: var(--muted);
  font-size: 13px;
  cursor: pointer;
  transition:
    background 0.2s ease,
    color 0.2s ease;
}

.poster-tabs button.is-on {
  background: var(--paper);
  color: var(--ink);
  font-weight: 600;
  box-shadow: 0 1px 4px rgba(64, 40, 28, 0.12);
}
</style>
