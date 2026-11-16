<script setup>
import { computed, nextTick, onMounted, ref } from 'vue'
import html2canvas from 'html2canvas'
import QRCode from 'qrcode'
import { RESULTS, resultMeta } from '../data'
import { closeModal, serialNo, shareUrl, showToast, state } from '../lib/store'
import { downloadBlob, posterFilename, shareBlobFile } from '../lib/poster'
import ModalShell from './ModalShell.vue'
import Poster from './Poster.vue'
import Icon from './Icon.vue'

const posterRoot = ref(null)
const posterRef = ref(null)
const qr = ref('')
const dataUrl = ref('')
const blob = ref(null)
const failed = ref(false)
const isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent)

const result = computed(() => resultMeta(state.result.primary, state.gender))
const secondary = computed(() => RESULTS[state.result.secondary])
const serial = computed(() => serialNo())
const filename = computed(() => posterFilename(result.value.name, serial.value))
const hint = computed(() =>
  isIOS
    ? 'iPhone：点“保存到相册”走系统分享，或长按图片选择“存储到照片”。'
    : '安卓：点“保存到相册”下载长图；分享时可发给朋友。'
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
  try {
    qr.value = await QRCode.toDataURL(shareUrl(), {
      width: 180,
      margin: 1,
      color: { dark: '#2a211d', light: '#fffdf9' }
    })
    await nextTick()
    if (document.fonts?.ready) await document.fonts.ready
    await waitForImages(posterRoot.value)
    await nextFrame()

    const element = posterRef.value?.$el
    if (!element) throw new Error('海报节点未就绪')

    const canvas = await html2canvas(element, {
      scale: 2,
      backgroundColor: '#fbf7f2',
      useCORS: true,
      logging: false,
      width: 750,
      height: element.scrollHeight,
      windowWidth: 750
    })
    blob.value = await new Promise((resolve, reject) => {
      canvas.toBlob((value) => (value ? resolve(value) : reject(new Error('生成图片失败'))), 'image/png')
    })
    dataUrl.value = canvas.toDataURL('image/png')
  } catch (error) {
    console.error(error)
    failed.value = true
    showToast('长图生成失败，请重试')
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
  if (status === 'downloaded') showToast('长图已开始下载')
}

async function sharePoster() {
  if (!blob.value) return
  const status = await shareBlobFile(
    blob.value,
    filename.value,
    '我的恋爱上头触发器',
    '看看你的心动开关是哪一种？'
  )
  if (status === 'downloaded') showToast('长图已下载，可手动分享')
}

onMounted(generate)
</script>

<template>
  <ModalShell label="保存长图" wide>
    <div class="modal-head">
      <span>保存长图</span>
      <button class="icon-btn" aria-label="关闭" @click="closeModal"><Icon name="close" /></button>
    </div>
    <h2 class="modal-title">你的心动诊断书</h2>
    <p class="modal-desc">长图已按结果页内容生成，保存到相册后可直接发朋友圈。</p>

    <div class="poster-preview">
      <img v-if="dataUrl" :src="dataUrl" alt="你的恋爱上头触发器长图" />
      <div v-else-if="failed" class="poster-error">长图生成失败，请关闭后重试。</div>
      <div v-else class="poster-loading"><span class="spinner"></span>正在生成长图...</div>
    </div>

    <div v-if="dataUrl" class="poster-actions">
      <button class="btn btn--primary" @click="saveToAlbum">保存到相册</button>
      <button class="btn btn--ghost" @click="sharePoster">分享长图</button>
    </div>
    <p class="modal-hint">{{ hint }}</p>

    <div id="poster-root" ref="posterRoot" aria-hidden="true">
      <Poster ref="posterRef" :result="result" :secondary="secondary" :qr="qr" :serial="serial" />
    </div>
  </ModalShell>
</template>
