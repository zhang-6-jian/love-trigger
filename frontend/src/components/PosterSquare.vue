<script setup>
const props = defineProps({
  result: { type: Object, required: true },
  secondary: { type: Object, required: true },
  qr: { type: String, default: '' },
  serial: { type: String, required: true },
  showQr: { type: Boolean, default: true }
})

const keywords = (props.result.keywords || []).slice(0, 3)
const scenes = (props.result.scenes || []).slice(0, 2)
</script>

<template>
  <div class="card" :style="{ '--tc': result.color, '--ts': result.soft }">
    <header class="card__head">
      <span class="card__brand">恋爱上头触发器</span>
      <span class="card__serial">NO. {{ serial }}</span>
    </header>

    <div class="card__hero">
      <div class="card__seal">
        <span>{{ result.symbol }}</span>
        <small>{{ result.english }}</small>
      </div>
      <p class="card__kicker">我的主触发器</p>
      <h1>{{ result.name }}</h1>
      <p class="card__tagline">{{ result.tagline }}</p>
    </div>

    <blockquote class="card__quote">“{{ result.quote }}”</blockquote>

    <div class="card__keywords">
      <span v-for="keyword in keywords" :key="keyword">{{ keyword }}</span>
    </div>

    <ul class="card__scenes">
      <li v-for="(scene, index) in scenes" :key="scene">
        <b>0{{ index + 1 }}</b><span>{{ scene }}</span>
      </li>
    </ul>

    <div class="card__second">
      <span>第二触发器</span>
      <strong>{{ secondary.name }}</strong>
    </div>

    <footer class="card__foot" :class="{ 'is-noqr': !showQr }">
      <div v-if="showQr" class="card__qr">
        <img v-if="qr" :src="qr" alt="扫码测同款" />
      </div>
      <div class="card__cta">
        <strong>你是被哪个瞬间拿捏的？</strong>
        <p>19 道情境题 · 按性别+年龄段出题</p>
        <p>{{ showQr ? '扫码测你的上头触发器' : '搜索「恋爱上头触发器」测同款' }}</p>
      </div>
    </footer>

    <p class="card__note">仅供娱乐与自我了解参考，不构成心理诊断、医疗建议或心理治疗。</p>
  </div>
</template>

<style scoped>
.card {
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  width: 750px;
  height: 1000px;
  padding: 44px 48px 30px;
  background:
    radial-gradient(120% 70% at 50% -10%, var(--ts) 0%, transparent 62%),
    #fbf7f2;
  color: #2a211d;
  font-family: var(--sans);
  overflow: hidden;
}

.card__head {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  padding-bottom: 16px;
  border-bottom: 1px solid rgba(42, 33, 29, 0.12);
}

.card__brand {
  font-family: var(--serif);
  font-size: 22px;
  letter-spacing: 0.04em;
}

.card__serial {
  color: #8d7f76;
  font-size: 14px;
  letter-spacing: 0.1em;
}

.card__hero {
  padding-top: 30px;
  text-align: center;
}

.card__seal {
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 96px;
  height: 96px;
  margin-bottom: 16px;
  border: 1px solid var(--tc);
  border-radius: 50%;
  color: var(--tc);
}

.card__seal span {
  font-family: var(--serif);
  font-size: 38px;
  line-height: 1;
}

.card__seal small {
  margin-top: 2px;
  font-size: 9px;
  letter-spacing: 0.14em;
  opacity: 0.8;
}

.card__kicker {
  margin: 0 0 6px;
  color: #8d7f76;
  font-size: 14px;
  letter-spacing: 0.16em;
}

.card__hero h1 {
  margin: 0 0 10px;
  font-family: var(--serif);
  font-size: 54px;
  line-height: 1.1;
  letter-spacing: 0.02em;
}

.card__tagline {
  margin: 0;
  color: #5d5049;
  font-size: 19px;
  line-height: 1.6;
}

.card__quote {
  margin: 24px 0 0;
  padding: 18px 22px;
  border-left: 3px solid var(--tc);
  border-radius: 0 12px 12px 0;
  background: rgba(255, 255, 255, 0.55);
  color: #4a3f39;
  font-family: var(--serif);
  font-size: 19px;
  line-height: 1.75;
}

.card__keywords {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: center;
  margin-top: 18px;
}

.card__keywords span {
  padding: 6px 16px;
  border: 1px solid var(--tc);
  border-radius: 999px;
  color: var(--tc);
  font-size: 14px;
}

.card__scenes {
  display: grid;
  gap: 10px;
  margin: 22px 0 0;
  padding: 0;
  list-style: none;
}

.card__scenes li {
  display: flex;
  gap: 12px;
  align-items: baseline;
  padding: 12px 16px;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.6);
}

.card__scenes b {
  flex: none;
  color: var(--tc);
  font-family: var(--serif);
  font-size: 15px;
}

.card__scenes span {
  font-size: 16px;
  line-height: 1.65;
}

.card__second {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: auto;
  padding: 14px 0 0;
}

.card__second span {
  color: #8d7f76;
  font-size: 13px;
}

.card__second strong {
  font-family: var(--serif);
  font-size: 20px;
  color: var(--tc);
}

.card__foot {
  display: flex;
  align-items: center;
  gap: 18px;
  margin-top: 16px;
  padding-top: 18px;
  border-top: 1px solid rgba(42, 33, 29, 0.12);
}

.card__foot.is-noqr {
  justify-content: center;
}

.card__qr {
  flex: none;
  width: 112px;
  height: 112px;
  padding: 7px;
  border-radius: 12px;
  background: #fffdf9;
  border: 1px solid rgba(42, 33, 29, 0.1);
}

.card__qr img {
  display: block;
  width: 100%;
  height: 100%;
}

.card__cta strong {
  display: block;
  margin-bottom: 6px;
  font-family: var(--serif);
  font-size: 20px;
}

.card__cta p {
  margin: 0;
  color: #7b6d65;
  font-size: 13.5px;
  line-height: 1.7;
}

.card__note {
  margin: 10px 0 0;
  color: #a89a91;
  font-size: 11px;
  text-align: center;
}
</style>
