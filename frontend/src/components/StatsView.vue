<script setup>
import { computed, onMounted, ref } from 'vue'
import { RESULTS, TYPE_ORDER } from '../data'
import { ageGroupLabel, goHome, loadStats, state } from '../lib/store'

const loading = ref(true)

const total = computed(() => state.stats.totalAssessments || 0)
const reviews = computed(() => state.stats.totalReviews || 0)

const rows = computed(() =>
  TYPE_ORDER.map((type) => {
    const count = Number(state.stats.typeCounts?.[type]) || 0
    return {
      type,
      name: RESULTS[type].name,
      color: RESULTS[type].color,
      soft: RESULTS[type].soft,
      count,
      percent: total.value ? Math.round((count / total.value) * 100) : 0
    }
  }).sort((a, b) => b.count - a.count)
)

const recent = computed(() => state.stats.recent || [])

function formatTime(value) {
  if (!value) return ''
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return value
  return date.toLocaleString('zh-CN', {
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  })
}

onMounted(async () => {
  await loadStats()
  loading.value = false
})
</script>

<template>
  <main class="stats-shell">
    <header class="stats-nav">
      <button class="brand-mini" @click="goHome">← 首页</button>
      <span class="stats-nav__tag">数据汇总 · 仅自己可见入口</span>
    </header>

    <section class="stats-head">
      <p class="eyebrow">DASHBOARD</p>
      <h1>测试结果汇总</h1>
      <p class="stats-sub">这里只统计类型，不展示任何人的具体答案和个人信息。</p>
    </section>

    <div class="stats-cards">
      <article class="stats-card">
        <span>累计测试</span>
        <strong>{{ total }}</strong>
        <small>份</small>
      </article>
      <article class="stats-card">
        <span>累计好评</span>
        <strong>{{ reviews }}</strong>
        <small>条</small>
      </article>
    </div>

    <section class="stats-block">
      <div class="stats-block__head">
        <h2>类型分布</h2>
        <span v-if="total">占全部结果的百分比</span>
      </div>
      <div v-if="loading" class="stats-empty">正在读取云端数据...</div>
      <div v-else-if="!total" class="stats-empty">还没有人提交结果。把测试发出去，这里就会有数据。</div>
      <div v-else class="dist-list">
        <div v-for="row in rows" :key="row.type" class="dist-row" :style="{ '--tc': row.color, '--ts': row.soft }">
          <span class="dist-row__name">{{ row.name }}</span>
          <div class="dist-row__bar"><i :style="{ width: `${row.percent}%` }"></i></div>
          <span class="dist-row__count">{{ row.count }} · {{ row.percent }}%</span>
        </div>
      </div>
    </section>

    <section class="stats-block">
      <div class="stats-block__head">
        <h2>最近结果</h2>
        <span>最新 30 条</span>
      </div>
      <div v-if="loading" class="stats-empty">正在读取云端数据...</div>
      <div v-else-if="!recent.length" class="stats-empty">暂无提交记录。</div>
      <div v-else class="recent-list">
        <div v-for="item in recent" :key="item.id" class="recent-row">
          <span class="recent-row__dot" :style="{ background: RESULTS[item.primary].color }"></span>
          <div class="recent-row__main">
            <strong>{{ RESULTS[item.primary].name }}</strong>
            <small>副类型：{{ RESULTS[item.secondary].name }}<template v-if="item.ageGroup"> · {{ ageGroupLabel(item.ageGroup) }}</template></small>
          </div>
          <span class="recent-row__time">{{ formatTime(item.createdAt) }}</span>
        </div>
      </div>
    </section>

    <p class="stats-note">此页面地址为站点域名 + <code>/#stats</code>，没有公开入口。</p>
  </main>
</template>

<style scoped>
.stats-shell {
  width: min(860px, calc(100% - 40px));
  margin: 0 auto;
  padding: 28px 0 80px;
}

.stats-nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 48px;
}

.stats-nav__tag {
  color: var(--muted);
  font-size: 12px;
}

.stats-head h1 {
  margin: 0 0 12px;
  font-family: var(--serif);
  font-size: clamp(30px, 6vw, 46px);
  line-height: 1.2;
}

.stats-sub {
  margin: 0 0 34px;
  color: var(--muted);
  font-size: 14px;
  line-height: 1.8;
}

.stats-cards {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 14px;
  margin-bottom: 34px;
}

.stats-card {
  padding: 22px;
  border: 1px solid var(--line);
  border-radius: 18px;
  background: var(--paper);
  box-shadow: var(--shadow);
}

.stats-card span {
  display: block;
  margin-bottom: 8px;
  color: var(--muted);
  font-size: 13px;
}

.stats-card strong {
  font-family: var(--serif);
  font-size: 42px;
  line-height: 1;
}

.stats-card small {
  margin-left: 4px;
  color: var(--muted);
}

.stats-block {
  margin-bottom: 30px;
  padding: 22px;
  border: 1px solid var(--line);
  border-radius: 18px;
  background: var(--paper);
}

.stats-block__head {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 18px;
}

.stats-block__head h2 {
  margin: 0;
  font-family: var(--serif);
  font-size: 22px;
}

.stats-block__head span {
  color: var(--muted);
  font-size: 12px;
}

.stats-empty {
  padding: 18px 0;
  color: var(--muted);
  font-size: 14px;
  text-align: center;
}

.dist-list,
.recent-list {
  display: grid;
  gap: 14px;
}

.dist-row {
  display: grid;
  grid-template-columns: 96px minmax(0, 1fr) 82px;
  align-items: center;
  gap: 12px;
}

.dist-row__name {
  font-size: 13px;
  font-weight: 600;
}

.dist-row__bar {
  height: 10px;
  overflow: hidden;
  border-radius: 999px;
  background: var(--ts);
}

.dist-row__bar i {
  display: block;
  height: 100%;
  border-radius: inherit;
  background: var(--tc);
  transition: width 0.4s ease;
}

.dist-row__count {
  color: var(--muted);
  font-size: 12px;
  text-align: right;
}

.recent-row {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 0;
  border-top: 1px solid var(--line);
}

.recent-row:first-child {
  border-top: 0;
}

.recent-row__dot {
  width: 9px;
  height: 9px;
  flex: none;
  border-radius: 50%;
}

.recent-row__main {
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 3px;
}

.recent-row__main strong {
  font-size: 14px;
}

.recent-row__main small {
  color: var(--muted);
  font-size: 12px;
}

.recent-row__time {
  color: var(--muted);
  font-size: 12px;
  white-space: nowrap;
}

.stats-note {
  margin-top: 28px;
  color: var(--muted);
  font-size: 12px;
  text-align: center;
}

.stats-note code {
  padding: 2px 5px;
  border-radius: 4px;
  background: rgba(0, 0, 0, 0.05);
}

@media (max-width: 560px) {
  .stats-cards {
    gap: 10px;
  }

  .stats-card {
    padding: 16px;
  }

  .stats-card strong {
    font-size: 32px;
  }

  .dist-row {
    grid-template-columns: 80px minmax(0, 1fr) 70px;
    gap: 8px;
  }

  .stats-nav__tag {
    display: none;
  }
}
</style>
