// 付费套餐定义（展示型，人工开通）
export const PLANS = [
  {
    id: 'free',
    name: '免费体验',
    price: '0',
    unit: '元',
    desc: '先看看你是哪一种上头',
    features: [
      '19 道情境题（按性别 + 年龄段）',
      '8 种触发器结果 + 心理学解释',
      '基础海报长图',
      '云端好评墙'
    ],
    cta: '免费开始',
    highlight: false
  },
  {
    id: 'deep',
    name: '深度报告',
    price: '19.9',
    unit: '元 / 份',
    desc: '把「为什么」讲透',
    features: [
      '完整版深度报告 · 逐题得分拆解',
      '8 维触发器雷达图',
      '专属成长建议清单（可执行版）',
      '高级海报模板 · 去水印'
    ],
    cta: '解锁深度报告',
    highlight: false
  },
  {
    id: 'duo',
    name: '双人合盘',
    price: '39.9',
    unit: '元 / 对',
    desc: '最值得买的一个',
    features: [
      '你和 TA 各测一次',
      '匹配度报告 · 互补点 / 冲突点',
      '双方深度报告 + 雷达图',
      '相处建议 & 高危时刻预警',
      '高级海报模板 · 去水印'
    ],
    cta: '解锁双人合盘',
    highlight: true,
    badge: '最受欢迎'
  }
]

export function getPlan(id) {
  return PLANS.find((plan) => plan.id === id) || null
}
