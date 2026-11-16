import { reactive } from 'vue'
import { RESULTS, TYPE_ORDER, SEED_REVIEWS } from '../data'
import { AGE_GROUPS, QUESTION_SETS } from '../questions'
import { cloud, cloudEnabled } from './cloud'

export const TOTAL = 18
export const AGE_OPTIONS = AGE_GROUPS

const PROGRESS_KEY = 'love-trigger-progress-v2'
const LIKES_KEY = 'love-trigger-likes-v2'
const VISITOR_KEY = 'love-trigger-visitor-id'
const SERIAL_KEY = 'love-trigger-serial-v1'
const REVIEWS_KEY = 'love-trigger-reviews-v2'

// 配置了 Supabase 就走云端；否则降级为浏览器本地存储
const CLOUD_MODE = cloudEnabled

export const state = reactive({
  screen: 'landing',
  index: 0,
  answers: Array(TOTAL).fill(null),
  ageGroup: '',
  questions: [],
  result: null,
  animating: false,
  reviews: [...SEED_REVIEWS],
  reviewsRemote: false,
  likes: [],
  reviewRating: 5,
  modal: '',
  toast: '',
  toastVisible: false,
  stats: { totalAssessments: 0, typeCounts: {}, totalReviews: 0, recent: [] },
  serial: '',
  savedResultId: null
})

/* ------------------------------------------------------------------ */
/*  基础工具                                                            */
/* ------------------------------------------------------------------ */

export function getVisitorId() {
  try {
    let id = localStorage.getItem(VISITOR_KEY)
    if (!id) {
      id = crypto.randomUUID
        ? crypto.randomUUID()
        : `v-${Date.now()}-${Math.random().toString(36).slice(2)}`
      localStorage.setItem(VISITOR_KEY, id)
    }
    return id
  } catch {
    return `v-${Date.now()}-${Math.random().toString(36).slice(2)}`
  }
}

export function scrollToTop() {
  window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
}

export function vibrate(pattern = 8) {
  if (navigator.vibrate) navigator.vibrate(pattern)
}

let toastTimer = null
export function showToast(message) {
  state.toast = message
  state.toastVisible = true
  clearTimeout(toastTimer)
  toastTimer = setTimeout(() => {
    state.toastVisible = false
  }, 2400)
}

function setHash(hash = '') {
  const base = location.pathname + location.search
  try {
    history.replaceState(null, '', hash ? `${base}${hash}` : base)
  } catch {
    /* noop */
  }
}

export function shareUrl() {
  return location.origin + location.pathname
}

export function ageGroupLabel(id = state.ageGroup) {
  return AGE_GROUPS.find((group) => group.id === id)?.label || ''
}

/* ------------------------------------------------------------------ */
/*  答题进度                                                            */
/* ------------------------------------------------------------------ */

export function answeredCount() {
  return state.answers.filter(Boolean).length
}

export function firstUnanswered() {
  const index = state.answers.findIndex((answer) => !answer)
  return index === -1 ? TOTAL - 1 : index
}

function saveProgress() {
  try {
    localStorage.setItem(
      PROGRESS_KEY,
      JSON.stringify({
        ageGroup: state.ageGroup,
        answers: state.answers,
        index: state.index,
        updatedAt: Date.now()
      })
    )
  } catch {
    /* 隐私模式下忽略 */
  }
}

function loadProgress() {
  try {
    const raw = localStorage.getItem(PROGRESS_KEY)
    if (!raw) return
    const saved = JSON.parse(raw)
    if (!QUESTION_SETS[saved.ageGroup]) return
    state.ageGroup = saved.ageGroup
    state.questions = QUESTION_SETS[saved.ageGroup]
    if (Array.isArray(saved.answers) && saved.answers.length === TOTAL) {
      state.answers = saved.answers.map((answer) => (TYPE_ORDER.includes(answer) ? answer : null))
      state.index = Math.min(Math.max(Number(saved.index) || 0, 0), TOTAL - 1)
    }
  } catch {
    /* 忽略损坏的本地进度 */
  }
}

export function resetProgress() {
  state.answers = Array(TOTAL).fill(null)
  state.index = 0
  state.result = null
  state.serial = ''
  state.animating = false
  try {
    localStorage.removeItem(PROGRESS_KEY)
    localStorage.removeItem(SERIAL_KEY)
  } catch {
    /* noop */
  }
}

export function calcResult() {
  const scores = Object.fromEntries(TYPE_ORDER.map((type) => [type, 0]))
  state.answers.forEach((type) => {
    if (scores[type] !== undefined) scores[type] += 1
  })
  const ranked = TYPE_ORDER.map((type) => ({ type, score: scores[type] })).sort((a, b) => {
    return b.score - a.score || TYPE_ORDER.indexOf(a.type) - TYPE_ORDER.indexOf(b.type)
  })
  return {
    scores,
    primary: ranked[0].type,
    secondary: ranked[1].type,
    primaryScore: ranked[0].score,
    secondaryScore: ranked[1].score,
    dual: ranked[0].score - ranked[1].score <= 1
  }
}

export function serialNo() {
  if (state.serial) return state.serial
  const seed = `${state.answers.join('')}${state.result?.primary || ''}`
  let hash = 0
  for (const char of seed) hash = (hash * 31 + char.charCodeAt(0)) % 9000
  return String(1000 + hash)
}

/* ------------------------------------------------------------------ */
/*  页面切换                                                            */
/* ------------------------------------------------------------------ */

export function startQuiz(fresh = false) {
  if (!state.ageGroup || !state.questions.length) {
    state.modal = 'age'
    return
  }
  if (fresh) resetProgress()
  state.screen = 'quiz'
  state.index = firstUnanswered()
  setHash('#quiz')
  scrollToTop()
}

export function startWithAge(ageId) {
  if (!QUESTION_SETS[ageId]) return
  state.ageGroup = ageId
  state.questions = QUESTION_SETS[ageId]
  resetProgress()
  state.modal = ''
  state.screen = 'quiz'
  state.index = 0
  setHash('#quiz')
  scrollToTop()
  saveProgress()
}

export function openAgeModal() {
  state.modal = 'age'
}

export function goBack() {
  if (state.animating || state.screen !== 'quiz' || state.index === 0) return
  state.index -= 1
  saveProgress()
}

export function chooseAnswer(type) {
  if (state.animating || state.screen !== 'quiz') return
  const question = state.questions[state.index]
  if (!question || !question.options.some((option) => option.type === type)) return

  state.answers[state.index] = type
  saveProgress()
  vibrate(8)
  state.animating = true

  setTimeout(() => {
    state.animating = false
    if (state.index >= TOTAL - 1) {
      finishQuiz()
      return
    }
    state.index += 1
    saveProgress()
  }, 330)
}

export function finishQuiz() {
  state.screen = 'analyzing'
  setHash('#analyzing')
  scrollToTop()
  setTimeout(() => {
    state.result = calcResult()
    state.screen = 'result'
    setHash('#result')
    scrollToTop()
    persistResult()
  }, 1500)
}

export function viewResult() {
  state.result = calcResult()
  state.screen = 'result'
  setHash('#result')
  scrollToTop()
  persistResult()
}

export function goHome() {
  state.screen = 'landing'
  setHash('')
  scrollToTop()
}

async function persistResult() {
  if (!state.result || !CLOUD_MODE) return
  try {
    await cloud.saveResult({
      primary: state.result.primary,
      secondary: state.result.secondary,
      dual: state.result.dual,
      ageGroup: state.ageGroup,
      visitorId: getVisitorId()
    })
  } catch (error) {
    console.warn('结果同步失败，已保留本地结果：', error.message)
  }
}

/* ------------------------------------------------------------------ */
/*  弹窗                                                                */
/* ------------------------------------------------------------------ */

export function openModal(name) {
  state.modal = name
  document.body.classList.add('modal-open')
}

export function closeModal() {
  state.modal = ''
  document.body.classList.remove('modal-open')
}

/* ------------------------------------------------------------------ */
/*  好评                                                               */
/* ------------------------------------------------------------------ */

function loadLocalLikes() {
  try {
    const raw = JSON.parse(localStorage.getItem(LIKES_KEY) || '[]')
    state.likes = Array.isArray(raw) ? raw.map(String) : []
  } catch {
    state.likes = []
  }
}

function saveLikes() {
  try {
    localStorage.setItem(LIKES_KEY, JSON.stringify(state.likes))
  } catch {
    /* noop */
  }
}

function loadLocalReviews() {
  try {
    const raw = JSON.parse(localStorage.getItem(REVIEWS_KEY) || '[]')
    return Array.isArray(raw) ? raw : []
  } catch {
    return []
  }
}

function saveLocalReviews(reviews) {
  try {
    localStorage.setItem(REVIEWS_KEY, JSON.stringify(reviews))
  } catch {
    /* noop */
  }
}

function localReview(payload) {
  return {
    id: `local-${Date.now()}`,
    name: payload.name,
    rating: payload.rating,
    text: payload.text,
    tag: payload.tag,
    likes: 0,
    date: new Date().toISOString().slice(0, 10)
  }
}

export async function loadReviews() {
  loadLocalLikes()
  if (!CLOUD_MODE) {
    state.reviews = [...loadLocalReviews(), ...SEED_REVIEWS]
    state.reviewsRemote = false
    return
  }
  try {
    const rows = await cloud.fetchReviews(getVisitorId())
    if (Array.isArray(rows)) {
      state.reviews = rows
      state.reviewsRemote = true
      state.likes = rows.filter((review) => review.liked).map((review) => String(review.id))
      saveLikes()
    }
  } catch (error) {
    console.warn('云端好评加载失败，使用本地数据：', error.message)
    state.reviews = [...loadLocalReviews(), ...SEED_REVIEWS]
    state.reviewsRemote = false
    state.likes = loadLocalLikes()
  }
}

export function displayLikes(review) {
  const base = Number(review.likes) || 0
  if (state.reviewsRemote) return base
  return base + (state.likes.includes(String(review.id)) ? 1 : 0)
}

export async function toggleLike(id) {
  const key = String(id)
  const nextLiked = !state.likes.includes(key)
  if (nextLiked) state.likes.push(key)
  else state.likes = state.likes.filter((item) => item !== key)
  saveLikes()
  vibrate(6)

  if (!state.reviewsRemote) return

  const review = state.reviews.find((item) => String(item.id) === key)
  if (review) review.likes = Math.max(0, review.likes + (nextLiked ? 1 : -1))
  try {
    const response = await cloud.toggleLike(id, getVisitorId(), nextLiked)
    if (review && typeof response.likes === 'number') review.likes = response.likes
  } catch (error) {
    if (nextLiked) state.likes = state.likes.filter((item) => item !== key)
    else state.likes.push(key)
    saveLikes()
    if (review) review.likes = Math.max(0, review.likes + (nextLiked ? -1 : 1))
    showToast('点赞失败，请稍后再试')
  }
}

export async function submitReview(payload) {
  if (!CLOUD_MODE) {
    const review = localReview(payload)
    const locals = loadLocalReviews()
    locals.unshift(review)
    saveLocalReviews(locals)
    state.reviews.unshift(review)
    return review
  }
  try {
    await cloud.createReview(payload)
    const rows = await cloud.fetchReviews(getVisitorId())
    state.reviews = rows
    state.reviewsRemote = true
    return rows[0] || localReview(payload)
  } catch (error) {
    console.warn('好评提交失败，已暂存本地：', error.message)
    const review = localReview(payload)
    const locals = loadLocalReviews()
    locals.unshift(review)
    saveLocalReviews(locals)
    state.reviews.unshift(review)
    state.reviewsRemote = false
    return review
  }
}

export async function loadStats() {
  if (!CLOUD_MODE) return
  try {
    state.stats = await cloud.fetchStats()
  } catch (error) {
    console.warn('统计加载失败：', error.message)
  }
}

/* ------------------------------------------------------------------ */
/*  分享与复制                                                          */
/* ------------------------------------------------------------------ */

export async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text)
    return true
  } catch {
    const textarea = document.createElement('textarea')
    textarea.value = text
    textarea.style.position = 'fixed'
    textarea.style.opacity = '0'
    document.body.appendChild(textarea)
    textarea.select()
    const ok = document.execCommand('copy')
    textarea.remove()
    return ok
  }
}

export function resultShareText() {
  const result = RESULTS[state.result.primary]
  const secondary = RESULTS[state.result.secondary]
  return [
    `我的恋爱上头触发器是「${result.name}」`,
    result.tagline,
    `第二触发器：${secondary.name}`,
    result.quote,
    '',
    `你是哪一种？${shareUrl()}`
  ].join('\n')
}

export async function copyResult() {
  const ok = await copyText(resultShareText())
  showToast(ok ? '结果已复制，去粘贴给朋友吧' : '复制失败，请手动选择文字')
}

export async function shareResult() {
  const result = RESULTS[state.result.primary]
  const data = {
    title: '恋爱上头触发器',
    text: `我是「${result.name}」：${result.tagline}`,
    url: shareUrl()
  }
  if (navigator.share) {
    try {
      await navigator.share(data)
      return
    } catch (error) {
      if (error?.name === 'AbortError') return
    }
  }
  openModal('share')
}

/* ------------------------------------------------------------------ */
/*  启动                                                               */
/* ------------------------------------------------------------------ */

export function boot() {
  loadProgress()

  if (location.hash === '#stats') {
    state.screen = 'stats'
  } else if (location.hash === '#result' && answeredCount() === TOTAL) {
    state.result = calcResult()
    try {
      state.serial = localStorage.getItem(SERIAL_KEY) || ''
    } catch {
      state.serial = ''
    }
    state.screen = 'result'
  } else if (location.hash === '#quiz' && answeredCount() < TOTAL) {
    state.screen = 'quiz'
    state.index = firstUnanswered()
  } else {
    state.screen = 'landing'
  }

  loadReviews()
  loadStats()
}
