const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || ''
const SUPABASE_KEY =
  import.meta.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_Q-1Kj_5MDsg4yqku29SSfw_-NQvXRya'

export const cloudEnabled = Boolean(SUPABASE_URL && SUPABASE_KEY)

function headers(extra = {}) {
  return {
    apikey: SUPABASE_KEY,
    Authorization: `Bearer ${SUPABASE_KEY}`,
    'Content-Type': 'application/json',
    ...extra
  }
}

async function request(path, options = {}) {
  const response = await fetch(`${SUPABASE_URL}/rest/v1/${path}`, {
    ...options,
    headers: headers(options.headers)
  })
  if (!response.ok) {
    let message = `云端请求失败（${response.status}）`
    try {
      const body = await response.json()
      if (body?.message) message = body.message
      if (body?.hint) message += `：${body.hint}`
    } catch {
      /* 非 JSON 响应 */
    }
    throw new Error(message)
  }
  const text = await response.text()
  return text ? JSON.parse(text) : null
}

function today() {
  return new Date().toLocaleDateString('sv-SE')
}

export const cloud = {
  async fetchReviews(visitorId) {
    const [reviews, likes] = await Promise.all([
      request('reviews_public?select=*&order=created_at.desc'),
      visitorId
        ? request(`review_likes?select=review_id&visitor_id=eq.${encodeURIComponent(visitorId)}`)
        : Promise.resolve([])
    ])
    const liked = new Set((likes || []).map((row) => String(row.review_id)))
    return (reviews || []).map((review) => ({
      ...review,
      id: String(review.id),
      likes: Number(review.likes) || 0,
      liked: liked.has(String(review.id))
    }))
  },

  async createReview(payload) {
    await request('reviews', {
      method: 'POST',
      headers: { Prefer: 'return=minimal' },
      body: JSON.stringify({
        name: payload.name,
        rating: payload.rating,
        text: payload.text,
        tag: payload.tag
      })
    })
    return {
      id: `local-${Date.now()}`,
      name: payload.name,
      rating: payload.rating,
      text: payload.text,
      tag: payload.tag,
      likes: 0,
      date: today()
    }
  },

  async toggleLike(reviewId, visitorId, liked) {
    if (liked) {
      await request('review_likes', {
        method: 'POST',
        headers: { Prefer: 'resolution=ignore-duplicates,return=minimal' },
        body: JSON.stringify({ review_id: Number(reviewId), visitor_id: visitorId })
      })
    } else {
      await request(
        `review_likes?review_id=eq.${reviewId}&visitor_id=eq.${encodeURIComponent(visitorId)}`,
        { method: 'DELETE', headers: { Prefer: 'return=minimal' } }
      )
    }
    const rows = await request(`reviews_public?id=eq.${reviewId}&select=likes`)
    return { likes: Number(rows?.[0]?.likes) || 0 }
  },

  async saveResult(payload) {
    await request('assessments', {
      method: 'POST',
      headers: { Prefer: 'return=minimal' },
      body: JSON.stringify({
        primary_type: payload.primary,
        secondary_type: payload.secondary,
        dual: payload.dual,
        age_group: payload.ageGroup,
        gender: payload.gender || null,
        visitor_id: payload.visitorId
      })
    })
    return { ok: true }
  },

  async fetchStats() {
    const [overview, stats, recent] = await Promise.all([
      request('overview_stats?select=*'),
      request('assessment_stats?select=*'),
      request('assessment_recent?select=*&order=created_at.desc&limit=30')
    ])
    return {
      totalAssessments: Number(overview?.[0]?.total_assessments) || 0,
      totalReviews: Number(overview?.[0]?.total_reviews) || 0,
      typeCounts: Object.fromEntries(
        (stats || []).map((row) => [row.primary_type, Number(row.total) || 0])
      ),
      recent: (recent || []).map((row) => ({
        id: String(row.id),
        primary: row.primary_type,
        secondary: row.secondary_type,
        dual: Boolean(row.dual),
        ageGroup: row.age_group || '',
        gender: row.gender || '',
        createdAt: row.created_at
      }))
    }
  }
}
