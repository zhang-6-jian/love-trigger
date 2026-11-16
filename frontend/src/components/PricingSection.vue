<script setup>
import { PASS_PLAN } from '../lib/plans'
import { openUnlock, state } from '../lib/store'
import Icon from './Icon.vue'

const emit = defineEmits(['start'])

function choose() {
  if (state.unlocked) {
    emit('start')
    return
  }
  openUnlock(PASS_PLAN)
}
</script>

<template>
  <section id="pricing" class="section pricing">
    <div class="section-head section-head--center">
      <p class="eyebrow">ONE PASS</p>
      <h2>¥{{ PASS_PLAN.price }}，把这次测试做完</h2>
      <p class="section-sub">一次付费，不订阅、不自动续费。解锁后可完整答题，并把结果长图存进相册。</p>
    </div>

    <article class="pass-card">
      <span class="pass-card__tag">内测价</span>
      <header class="pass-card__head">
        <h3>{{ PASS_PLAN.name }}</h3>
        <p>{{ PASS_PLAN.desc }}</p>
      </header>

      <div class="pass-card__price">
        <span class="cur">¥</span>
        <strong>{{ PASS_PLAN.price }}</strong>
        <small>{{ PASS_PLAN.unit }}</small>
        <s class="was">¥9.9</s>
      </div>

      <ul class="pass-card__list">
        <li v-for="feature in PASS_PLAN.features" :key="feature">
          <Icon name="check" /><span>{{ feature }}</span>
        </li>
      </ul>

      <button type="button" class="btn btn--primary btn--large pass-card__cta" @click="choose">
        {{ PASS_PLAN.cta }}
      </button>
      <p class="pass-card__hint">
        <template v-if="state.unlocked">你已解锁，可直接开始答题。</template>
        <template v-else>付款后联系管理员领取兑换码，填码即解锁。</template>
      </p>
    </article>
  </section>
</template>

<style scoped>
.pricing {
  padding-top: 8px;
}

.pass-card {
  position: relative;
  width: min(440px, 100%);
  margin: 34px auto 0;
  padding: 28px 26px 24px;
  border: 1px solid var(--accent);
  border-radius: 22px;
  background: linear-gradient(180deg, #fff6f3 0%, var(--paper) 38%);
  box-shadow: 0 24px 60px rgba(64, 40, 28, 0.13);
}

.pass-card__tag {
  position: absolute;
  top: -11px;
  left: 50%;
  transform: translateX(-50%);
  padding: 4px 13px;
  border-radius: 999px;
  background: var(--accent);
  color: #fff;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.06em;
  white-space: nowrap;
}

.pass-card__head h3 {
  margin: 0 0 6px;
  font-family: var(--serif);
  font-size: 23px;
  text-align: center;
}

.pass-card__head p {
  margin: 0;
  color: var(--muted);
  font-size: 13px;
  text-align: center;
}

.pass-card__price {
  display: flex;
  align-items: baseline;
  justify-content: center;
  gap: 3px;
  margin: 20px 0 18px;
  padding-bottom: 18px;
  border-bottom: 1px solid var(--line);
}

.pass-card__price .cur {
  font-size: 17px;
  font-weight: 600;
}

.pass-card__price strong {
  font-family: var(--serif);
  font-size: 46px;
  line-height: 1;
}

.pass-card__price small {
  margin-left: 5px;
  color: var(--muted);
  font-size: 12px;
}

.pass-card__price .was {
  margin-left: 10px;
  color: #b8a89f;
  font-size: 13px;
}

.pass-card__list {
  display: grid;
  gap: 11px;
  margin: 0 0 22px;
  padding: 0;
  list-style: none;
}

.pass-card__list li {
  display: flex;
  gap: 9px;
  align-items: flex-start;
  font-size: 13.5px;
  line-height: 1.6;
}

.pass-card__list :deep(svg) {
  width: 16px;
  height: 16px;
  flex: none;
  margin-top: 3px;
  color: var(--accent);
}

.pass-card__cta {
  width: 100%;
  justify-content: center;
}

.pass-card__hint {
  margin: 12px 0 0;
  color: var(--muted);
  font-size: 12px;
  text-align: center;
}
</style>
