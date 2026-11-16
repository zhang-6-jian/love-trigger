<script setup>
import { PLANS } from '../lib/plans'
import { openUnlock } from '../lib/store'
import Icon from './Icon.vue'

const emit = defineEmits(['start'])

function choose(plan) {
  if (plan.id === 'free') {
    emit('start')
    return
  }
  openUnlock(plan)
}
</script>

<template>
  <section id="pricing" class="section pricing">
    <div class="section-head section-head--center">
      <p class="eyebrow">PRICING</p>
      <h2>先免费看结果，<br />想更懂自己再解锁</h2>
      <p class="section-sub">基础测评永久免费。进阶内容为一次性付费，不订阅、不自动续费。</p>
    </div>

    <div class="plan-grid">
      <article
        v-for="plan in PLANS"
        :key="plan.id"
        class="plan-card"
        :class="{ 'is-hot': plan.highlight }"
      >
        <span v-if="plan.badge" class="plan-card__badge">{{ plan.badge }}</span>
        <header class="plan-card__head">
          <h3>{{ plan.name }}</h3>
          <p class="plan-card__desc">{{ plan.desc }}</p>
        </header>
        <div class="plan-card__price">
          <span class="plan-card__cur">¥</span>
          <strong>{{ plan.price }}</strong>
          <small>{{ plan.unit }}</small>
        </div>
        <ul class="plan-card__list">
          <li v-for="feature in plan.features" :key="feature">
            <Icon name="check" />
            <span>{{ feature }}</span>
          </li>
        </ul>
        <button
          type="button"
          class="btn plan-card__cta"
          :class="plan.highlight ? 'btn--primary' : 'btn--ghost'"
          @click="choose(plan)"
        >
          {{ plan.cta }}
        </button>
      </article>
    </div>

    <p class="pricing-note">
      内测阶段由人工开通，暂不支持在线支付。购买后 24 小时内发送完整报告。
    </p>
  </section>
</template>

<style scoped>
.pricing {
  padding-top: 8px;
}

.plan-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 16px;
  margin-top: 40px;
}

.plan-card {
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 26px 22px 22px;
  border: 1px solid var(--line);
  border-radius: 20px;
  background: var(--paper);
  box-shadow: var(--shadow);
  transition:
    transform 0.25s ease,
    box-shadow 0.25s ease,
    border-color 0.25s ease;
}

.plan-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 24px 60px rgba(64, 40, 28, 0.12);
}

.plan-card.is-hot {
  border-color: var(--accent);
  background: linear-gradient(180deg, #fff6f3 0%, var(--paper) 42%);
}

.plan-card__badge {
  position: absolute;
  top: -11px;
  left: 50%;
  transform: translateX(-50%);
  padding: 4px 12px;
  border-radius: 999px;
  background: var(--accent);
  color: #fff;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.06em;
  white-space: nowrap;
}

.plan-card__head h3 {
  margin: 0 0 6px;
  font-family: var(--serif);
  font-size: 21px;
}

.plan-card__desc {
  margin: 0;
  color: var(--muted);
  font-size: 13px;
}

.plan-card__price {
  display: flex;
  align-items: baseline;
  gap: 3px;
  margin: 18px 0 16px;
  padding-bottom: 16px;
  border-bottom: 1px solid var(--line);
}

.plan-card__cur {
  font-size: 15px;
  font-weight: 600;
}

.plan-card__price strong {
  font-family: var(--serif);
  font-size: 38px;
  line-height: 1;
}

.plan-card__price small {
  margin-left: 4px;
  color: var(--muted);
  font-size: 12px;
}

.plan-card__list {
  display: grid;
  flex: 1;
  gap: 10px;
  margin: 0 0 20px;
  padding: 0;
  list-style: none;
}

.plan-card__list li {
  display: flex;
  gap: 8px;
  align-items: flex-start;
  font-size: 13px;
  line-height: 1.6;
}

.plan-card__list :deep(svg) {
  width: 15px;
  height: 15px;
  flex: none;
  margin-top: 3px;
  color: var(--accent);
}

.plan-card__cta {
  width: 100%;
  justify-content: center;
}

.pricing-note {
  margin: 22px 0 0;
  color: var(--muted);
  font-size: 12px;
  text-align: center;
}

@media (max-width: 820px) {
  .plan-grid {
    grid-template-columns: 1fr;
    gap: 22px;
    margin-top: 30px;
  }

  .plan-card {
    padding: 24px 20px 20px;
  }
}
</style>
