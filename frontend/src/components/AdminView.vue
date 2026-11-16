<script setup>
import { onMounted, ref } from 'vue'
import { cloud, cloudEnabled } from '../lib/cloud'
import { copyText, showToast } from '../lib/store'
import Icon from './Icon.vue'

const SECRET_KEY = 'love-trigger-admin-secret'

const secret = ref('')
const authed = ref(false)
const busy = ref(false)
const errorMsg = ref('')
const issued = ref([])
const inv = ref(null)
const count = ref(1)

onMounted(() => {
  try {
    const saved = localStorage.getItem(SECRET_KEY)
    if (saved) {
      secret.value = saved
      verify()
    }
  } catch {
    /* 隐私模式 */
  }
})

function friendly(message) {
  if (!message) return '操作失败'
  if (message.includes('unauthorized') || message.includes('42501')) return '密钥不正确'
  return message
}

async function verify() {
  errorMsg.value = ''
  if (!cloudEnabled) {
    errorMsg.value = '云端未配置，无法使用'
    return
  }
  if (!secret.value.trim()) {
    errorMsg.value = '请输入管理密钥'
    return
  }
  busy.value = true
  try {
    inv.value = await cloud.adminInventory(secret.value.trim())
    authed.value = true
    try {
      localStorage.setItem(SECRET_KEY, secret.value.trim())
    } catch {
      /* 隐私模式 */
    }
  } catch (error) {
    authed.value = false
    errorMsg.value = friendly(error?.message)
  } finally {
    busy.value = false
  }
}

async function issue() {
  if (!authed.value) return
  busy.value = true
  errorMsg.value = ''
  issued.value = []
  try {
    const codes = await cloud.adminIssueCode(secret.value.trim(), count.value)
    if (!codes.length) {
      errorMsg.value = '码池已空，请先在 Supabase 生成新码'
    } else {
      issued.value = codes
    }
    inv.value = await cloud.adminInventory(secret.value.trim())
  } catch (error) {
    errorMsg.value = friendly(error?.message)
  } finally {
    busy.value = false
  }
}

async function copyCode(code) {
  const ok = await copyText(code)
  showToast(ok ? `已复制 ${code}` : '复制失败，请长按手动选择')
}

function signOut() {
  try {
    localStorage.removeItem(SECRET_KEY)
  } catch {
    /* noop */
  }
  authed.value = false
  secret.value = ''
  issued.value = []
  inv.value = null
}
</script>

<template>
  <main class="admin">
    <header class="admin__head">
      <p class="eyebrow">ADMIN · 请勿分享此页面</p>
      <h1>兑换码发码台</h1>
      <p class="admin__sub">确认收款后，在这里取一个码发给买家。取出的码会从可用池扣减。</p>
    </header>

    <section v-if="!authed" class="admin__card">
      <label class="admin__label" for="secret">管理密钥</label>
      <input
        id="secret"
        v-model="secret"
        class="code-input"
        type="password"
        autocomplete="off"
        placeholder="输入密钥"
        @keyup.enter="verify"
      />
      <p v-if="errorMsg" class="code-error">{{ errorMsg }}</p>
      <button type="button" class="btn btn--primary admin__wide" :disabled="busy" @click="verify">
        {{ busy ? '验证中…' : '进入' }}
      </button>
    </section>

    <template v-else>
      <section class="admin__stats">
        <div class="stat">
          <strong>{{ inv?.available ?? '-' }}</strong>
          <span>可用</span>
        </div>
        <div class="stat">
          <strong>{{ inv?.issued ?? '-' }}</strong>
          <span>已发出</span>
        </div>
        <div class="stat">
          <strong>{{ inv?.used ?? '-' }}</strong>
          <span>已使用</span>
        </div>
      </section>

      <section class="admin__card">
        <div class="admin__row">
          <span class="admin__label">取几个码</span>
          <div class="count-group">
            <button
              v-for="n in [1, 3, 5]"
              :key="n"
              type="button"
              class="count-btn"
              :class="{ 'is-on': count === n }"
              @click="count = n"
            >
              {{ n }}
            </button>
          </div>
        </div>
        <button type="button" class="btn btn--primary admin__wide" :disabled="busy" @click="issue">
          {{ busy ? '取码中…' : `取 ${count} 个兑换码` }}
        </button>
        <p v-if="errorMsg" class="code-error">{{ errorMsg }}</p>
      </section>

      <section v-if="issued.length" class="admin__card">
        <p class="admin__label">刚取到的码（点击复制）</p>
        <button
          v-for="code in issued"
          :key="code"
          type="button"
          class="issued-code"
          @click="copyCode(code)"
        >
          <span>{{ code }}</span>
          <Icon name="copy" />
        </button>
        <p class="admin__hint">发给买家后，他填进解锁弹窗就生效。一个码只能用一次。</p>
      </section>

      <button type="button" class="admin__signout" @click="signOut">退出并清除密钥</button>
    </template>
  </main>
</template>

<style scoped>
.admin {
  max-width: 520px;
  margin: 0 auto;
  padding: 40px 20px 80px;
}

.admin__head {
  margin-bottom: 24px;
}

.admin__head h1 {
  margin: 6px 0 8px;
  font-family: var(--serif);
  font-size: 26px;
}

.admin__sub {
  margin: 0;
  color: var(--muted);
  font-size: 13px;
  line-height: 1.7;
}

.admin__card {
  margin-bottom: 16px;
  padding: 20px;
  border: 1px solid var(--line);
  border-radius: 16px;
  background: var(--paper);
  box-shadow: var(--shadow);
}

.admin__label {
  display: block;
  margin-bottom: 8px;
  color: var(--muted);
  font-size: 12.5px;
}

.admin__wide {
  width: 100%;
  margin-top: 12px;
  justify-content: center;
}

.admin__row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

.admin__row .admin__label {
  margin-bottom: 0;
}

.count-group {
  display: inline-flex;
  gap: 4px;
  padding: 3px;
  border-radius: 999px;
  background: rgba(0, 0, 0, 0.05);
}

.count-btn {
  width: 40px;
  padding: 6px 0;
  border: 0;
  border-radius: 999px;
  background: transparent;
  color: var(--muted);
  font-size: 13px;
  cursor: pointer;
}

.count-btn.is-on {
  background: var(--paper);
  color: var(--ink);
  font-weight: 600;
  box-shadow: 0 1px 4px rgba(64, 40, 28, 0.12);
}

.admin__stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  margin-bottom: 16px;
}

.stat {
  display: grid;
  gap: 2px;
  padding: 14px 10px;
  border: 1px solid var(--line);
  border-radius: 14px;
  background: var(--paper);
  text-align: center;
}

.stat strong {
  font-family: var(--serif);
  font-size: 26px;
  line-height: 1.1;
}

.stat span {
  color: var(--muted);
  font-size: 11.5px;
}

.issued-code {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 8px;
  padding: 14px 16px;
  border: 1px dashed var(--accent);
  border-radius: 12px;
  background: #fff6f3;
  color: var(--ink);
  font-family: var(--sans);
  font-size: 17px;
  font-weight: 600;
  letter-spacing: 0.1em;
  cursor: pointer;
}

.issued-code :deep(svg) {
  width: 16px;
  height: 16px;
  color: var(--accent);
}

.admin__hint {
  margin: 4px 0 0;
  color: var(--muted);
  font-size: 12px;
  line-height: 1.7;
}

.admin__signout {
  display: block;
  margin: 26px auto 0;
  border: 0;
  background: none;
  color: var(--muted);
  font-size: 12.5px;
  text-decoration: underline;
  cursor: pointer;
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
  outline: none;
  transition:
    border-color 0.2s ease,
    box-shadow 0.2s ease;
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
