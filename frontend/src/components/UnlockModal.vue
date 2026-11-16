<script setup>
import { computed, ref } from 'vue'
import { PASS_PLAN } from '../lib/plans'
import { afterUnlock, closeModal, copyText, showToast } from '../lib/store'
import { cloud, cloudEnabled } from '../lib/cloud'
import ModalShell from './ModalShell.vue'
import Icon from './Icon.vue'

const base = import.meta.env.BASE_URL
const PAY_QR = {
  wechat: { label: '微信支付', src: `${base}pay-wechat.jpg`, fixed: true },
  alipay: { label: '支付宝', src: `${base}pay-alipay.jpg`, fixed: false }
}

const payChannel = ref('wechat')
const qrFailed = ref(false)
const currentQr = computed(() => PAY_QR[payChannel.value])
const payHint = computed(() =>
  currentQr.value.fixed
    ? `长按二维码识别 · 直接付款 ¥${PASS_PLAN.price}`
    : `长按二维码识别 · 请手动输入 ¥${PASS_PLAN.price}`
)

function switchChannel(channel) {
  payChannel.value = channel
  qrFailed.value = false
}

// 收款码加载失败时的兜底：微信号（可用 VITE_CONTACT_WECHAT 覆盖）
const CONTACT_WECHAT = import.meta.env.VITE_CONTACT_WECHAT || 'love-trigger-lab'

async function copyWechat() {
  const ok = await copyText(CONTACT_WECHAT)
  showToast(ok ? '微信号已复制，去微信付款吧' : '复制失败，请手动记录微信号')
}

/* 兑换码核销 */
const code = ref('')
const submitting = ref(false)
const errorMsg = ref('')

async function redeem() {
  const value = code.value.trim().toUpperCase()
  if (!value) {
    errorMsg.value = '请输入兑换码'
    return
  }
  if (!cloudEnabled) {
    errorMsg.value = '云端暂不可用，请联系管理员'
    return
  }
  submitting.value = true
  errorMsg.value = ''
  try {
    const ok = await cloud.redeemCode(value)
    if (ok) {
      afterUnlock()
    } else {
      errorMsg.value = '兑换码无效或已被使用'
    }
  } catch (error) {
    errorMsg.value = error?.message || '核销失败，请检查网络后重试'
  } finally {
    submitting.value = false
  }
}
</script>

<template>
  <ModalShell label="解锁完整测试">
    <div class="modal-head">
      <span>解锁完整测试</span>
      <button class="icon-btn" aria-label="关闭" @click="closeModal"><Icon name="close" /></button>
    </div>

    <h2 class="modal-title">¥{{ PASS_PLAN.price }}，解锁完整测试</h2>
    <p class="modal-desc">{{ PASS_PLAN.desc }}。一次付费，不订阅、不自动续费。</p>

    <div class="unlock-price">
      <span>¥</span><strong>{{ PASS_PLAN.price }}</strong><small>{{ PASS_PLAN.unit }}</small>
      <s class="unlock-was">¥9.9</s>
    </div>

    <ul class="unlock-list">
      <li v-for="feature in PASS_PLAN.features" :key="feature">
        <Icon name="check" /><span>{{ feature }}</span>
      </li>
    </ul>

    <div class="unlock-box">
      <p class="unlock-box__title">第 1 步 · 扫码付款 ¥{{ PASS_PLAN.price }}</p>

      <div v-if="!qrFailed" class="pay-qr">
        <div class="pay-tabs">
          <button
            v-for="(item, key) in PAY_QR"
            :key="key"
            type="button"
            class="pay-tab"
            :class="{ 'is-on': payChannel === key }"
            @click="switchChannel(key)"
          >
            {{ item.label }}
          </button>
        </div>
        <img :src="currentQr.src" :alt="`${currentQr.label}收款码`" @error="qrFailed = true" />
        <p class="pay-qr__hint">{{ payHint }}</p>
      </div>

      <div v-else class="unlock-wechat">
        <span class="unlock-wechat__label">微信号</span>
        <code>{{ CONTACT_WECHAT }}</code>
        <button type="button" class="btn btn--small btn--ghost" @click="copyWechat">复制</button>
      </div>

      <p class="unlock-box__title unlock-box__title--step">第 2 步 · 输入兑换码</p>
      <p class="unlock-box__text">
        付款后微信联系管理员，说明「恋爱上头触发器」，会收到一个一次性兑换码，填进来即可解锁。
      </p>
      <input
        v-model="code"
        class="code-input"
        type="text"
        inputmode="text"
        autocapitalize="characters"
        autocomplete="off"
        spellcheck="false"
        maxlength="10"
        placeholder="LTXXXXXXXX"
        @keyup.enter="redeem"
      />
      <p v-if="errorMsg" class="code-error">{{ errorMsg }}</p>
    </div>

    <div class="modal-actions">
      <button type="button" class="btn btn--ghost" @click="closeModal">稍后再说</button>
      <button type="button" class="btn btn--primary" :disabled="submitting" @click="redeem">
        {{ submitting ? '核销中…' : '核销并解锁' }}
      </button>
    </div>
  </ModalShell>
</template>

<style scoped>
.unlock-price {
  display: flex;
  align-items: baseline;
  gap: 3px;
  margin: 6px 0 18px;
  color: var(--accent);
}

.unlock-price span {
  font-size: 16px;
  font-weight: 600;
}

.unlock-price strong {
  font-family: var(--serif);
  font-size: 42px;
  line-height: 1;
}

.unlock-price small {
  margin-left: 5px;
  color: var(--muted);
  font-size: 12px;
}

.unlock-was {
  margin-left: 10px;
  color: #b8a89f;
  font-size: 13px;
}

.unlock-list {
  display: grid;
  gap: 9px;
  margin: 0 0 20px;
  padding: 0;
  list-style: none;
}

.unlock-list li {
  display: flex;
  gap: 8px;
  align-items: flex-start;
  font-size: 13.5px;
  line-height: 1.6;
}

.unlock-list :deep(svg) {
  width: 15px;
  height: 15px;
  flex: none;
  margin-top: 3px;
  color: var(--accent);
}

.unlock-box {
  padding: 16px;
  border: 1px dashed var(--line);
  border-radius: 14px;
  background: rgba(243, 216, 210, 0.28);
}

.unlock-box__title {
  margin: 0 0 6px;
  font-size: 13px;
  font-weight: 600;
}

.unlock-box__title--step {
  margin-top: 14px;
}

.unlock-box__text {
  margin: 0 0 12px;
  color: var(--muted);
  font-size: 12.5px;
  line-height: 1.7;
}

.pay-qr {
  display: grid;
  justify-items: center;
  gap: 10px;
  margin-bottom: 4px;
}

.pay-tabs {
  display: inline-flex;
  gap: 4px;
  padding: 3px;
  border-radius: 999px;
  background: rgba(0, 0, 0, 0.05);
}

.pay-tab {
  padding: 5px 14px;
  border: 0;
  border-radius: 999px;
  background: transparent;
  color: var(--muted);
  font-size: 12.5px;
  cursor: pointer;
  transition:
    background 0.2s ease,
    color 0.2s ease;
}

.pay-tab.is-on {
  background: var(--paper);
  color: var(--ink);
  font-weight: 600;
  box-shadow: 0 1px 4px rgba(64, 40, 28, 0.12);
}

.pay-qr img {
  width: 100%;
  max-width: 240px;
  height: auto;
  border: 1px solid var(--line);
  border-radius: 12px;
  background: #fff;
}

.pay-qr__hint {
  margin: 0;
  color: var(--muted);
  font-size: 12px;
  line-height: 1.6;
  text-align: center;
}

.unlock-wechat {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 12px;
  border: 1px solid var(--line);
  border-radius: 10px;
  background: var(--paper);
}

.unlock-wechat__label {
  color: var(--muted);
  font-size: 12px;
  white-space: nowrap;
}

.unlock-wechat code {
  flex: 1;
  font-family: var(--sans);
  font-size: 14px;
  font-weight: 600;
  letter-spacing: 0.02em;
  word-break: break-all;
}

.code-input {
  width: 100%;
  padding: 12px 14px;
  border: 1px solid var(--line);
  border-radius: 10px;
  background: var(--paper);
  color: var(--ink);
  font-family: var(--sans);
  font-size: 16px;
  font-weight: 600;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  outline: none;
  transition:
    border-color 0.2s ease,
    box-shadow 0.2s ease;
}

.code-input::placeholder {
  color: #c3b3aa;
  font-weight: 400;
  letter-spacing: 0.08em;
}

.code-input:focus {
  border-color: var(--accent);
  box-shadow: 0 0 0 3px rgba(214, 92, 72, 0.12);
}

.code-error {
  margin: 8px 0 0;
  color: #c0392b;
  font-size: 12.5px;
  line-height: 1.6;
}
</style>
