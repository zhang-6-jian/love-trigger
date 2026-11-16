// 单一付费通行证：¥0.99 解锁完整测试 + 保存结果
export const PASS_PRICE = '0.99'

export const PASS_PLAN = {
  id: 'pass',
  name: '完整测试通行证',
  price: PASS_PRICE,
  unit: '元 / 次',
  desc: '一次付费，解锁完整测试与结果保存',
  features: [
    '19 道情境题（按性别 + 年龄段出题）',
    '8 种触发器完整结果 + 心理学解释',
    '防上头指南 & 适合 / 小心的人',
    '保存高清结果长图到相册',
    '生成专属分享海报'
  ],
  cta: `¥${PASS_PRICE} 解锁完整测试`
}

export const PLANS = [PASS_PLAN]

export function getPlan(id) {
  return PLANS.find((plan) => plan.id === id) || null
}
