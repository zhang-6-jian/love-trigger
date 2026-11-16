const BASE = import.meta.env.VITE_API_BASE || ''

async function request(path, options = {}) {
  const response = await fetch(`${BASE}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options
  })
  if (!response.ok) {
    let message = `请求失败（${response.status}）`
    try {
      const body = await response.json()
      if (body?.message) message = body.message
    } catch {
      /* 忽略非 JSON 响应 */
    }
    throw new Error(message)
  }
  return response.json()
}

export const api = {
  health() {
    return request('/api/health')
  },
  fetchReviews(visitorId) {
    const query = visitorId ? `?visitorId=${encodeURIComponent(visitorId)}` : ''
    return request(`/api/reviews${query}`)
  },
  createReview(payload) {
    return request('/api/reviews', { method: 'POST', body: JSON.stringify(payload) })
  },
  toggleLike(id, visitorId, liked) {
    return request(`/api/reviews/${id}/like`, {
      method: 'POST',
      body: JSON.stringify({ visitorId, liked })
    })
  },
  saveResult(payload) {
    return request('/api/results', { method: 'POST', body: JSON.stringify(payload) })
  },
  stats() {
    return request('/api/stats')
  }
}
