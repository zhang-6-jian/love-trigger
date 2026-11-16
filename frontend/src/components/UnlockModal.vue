<script setup>
import { computed } from 'vue'
import { closeModal, copyText, showToast, state } from '../lib/store'
import ModalShell from './ModalShell.vue'
import Icon from './Icon.vue'

// 把这里换成你自己的微信号（或用 VITE_CONTACT_WECHAT 环境变量注入）
const CONTACT_WECHAT = import.meta.env.VITE_CONTACT_WECHAT || 'love-trigger-lab'

const plan = computed(() => state.unlockPlan || null)

async function copyWechat() {
  const ok = await copyText(CONTACT_WECHAT)
  showToast(ok ? '微信号已复制，去微信添加吧' : '复制失败，请手动记录微信号')
}
</script>

<template>
  <ModalShell label="解锁套餐">
    <div class="modal-head">
      <span>解锁套餐</span>
      <button class="icon-btn" aria-label="关闭" @click="closeModal"><Icon name="close" /></button>
    </div>

    <template v-if="plan">
      <h2 class="modal-title">解锁「{{ plan.name }}」</h2>
      <div class="unlock-price">
        <span>¥</span><strong>{{ plan.price }}</strong><small>{{ plan.unit }}</small>
      </div>

      <ul class="unlock-list">
        <li v-for="feature in plan.features" :key="feature">
          <Icon name="check" /><span>{{ feature }}</span>
        </li>
      </ul>

      <div class="unlock-box">
        <p class="unlock-box__title">内测阶段 · 人工开通</p>
        <p class="unlock-box__text">
          暂不支持在线支付。添加管理员微信，备注你要的套餐，付款后 24 小时内把完整报告发给你。
        </p>
        <div class="unlock-wechat">
          <span class="unlock-wechat__label">微信号</span>
          <code>{{ CONTACT_WECHAT }}</code>
          <button type="button" class="btn btn--small btn--ghost" @click="copyWechat">复制</button>
        </div>
      </div>

      <div class="modal-actions">
        <button type="button" class="btn btn--ghost" @click="closeModal">先看看免费版</button>
        <button type="button" class="btn btn--primary" @click="copyWechat">复制微信号去添加</button>
      </div>
    </template>

    <template v-else>
      <h2 class="modal-title">套餐信息已失效</h2>
      <p class="modal-desc">请关闭后重新选择套餐。</p>
      <div class="modal-actions">
        <button type="button" class="btn btn--primary" @click="closeModal">知道了</button>
      </div>
    </template>
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
  font-size: 40px;
  line-height: 1;
}

.unlock-price small {
  margin-left: 5px;
  color: var(--muted);
  font-size: 12px;
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

.unlock-box__text {
  margin: 0 0 12px;
  color: var(--muted);
  font-size: 12.5px;
  line-height: 1.7;
}

.unlock-wechat {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 12px;
  border-radius: 10px;
  background: var(--paper);
  border: 1px solid var(--line);
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
</style>
