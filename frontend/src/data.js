export const TYPE_ORDER = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H']

export const TYPE_META = {
  A: { name: '颅内高潮型', short: '智性上头', color: '#b23a28', soft: '#f3d8d2', english: 'CEREBRAL CRUSH' },
  B: { name: '人间止疼片型', short: '拯救上头', color: '#8f5a3c', soft: '#f2e2d5', english: 'THE SOOTHER' },
  C: { name: '反差捕手型', short: '例外上头', color: '#9a3f5f', soft: '#f4dbe4', english: 'THE EXCEPTION' },
  D: { name: '长期主义型', short: '安心上头', color: '#4f6b5d', soft: '#dfe9e2', english: 'THE STEADY' },
  E: { name: '老虎机型', short: '不确定上瘾', color: '#6b4a8f', soft: '#e8dff2', english: 'THE SLOT MACHINE' },
  F: { name: '氛围感型', short: '场景上头', color: '#b47a2c', soft: '#f5e6cd', english: 'THE ATMOSPHERE' },
  G: { name: '理性边界型', short: '自我上头', color: '#3a5f7f', soft: '#d4e3ef', english: 'THE BOUNDARY' },
  H: { name: '即兴浪漫型', short: '打破上头', color: '#a14a8a', soft: '#ecd3e3', english: 'THE IMPROV' }
}

export const RESULTS = {
  A: {
    ...TYPE_META.A, id: 'A',
    female: {
      tagline: '别人看脸，你看他讲 PPT 的样子。',
      shareTitle: '我不是颜控，我是脑控',
      shareCopy: '我的心动开关：他讲起热爱的事时，眼睛会发光。'
    },
    male: {
      tagline: '别人看胸肌，你看她能接住你哪个理论。',
      shareTitle: '我不是颜控，我是脑控',
      shareCopy: '我的心动开关：她能接住我讲的东西，还能反问一个好问题。'
    },
    name: '颅内高潮型',
    keywords: ['聪明', '专注', '新世界'],
    quote: '你爱的不是聪明，是聪明带来的新世界。',
    symbol: '颅',
    scenes: [
      '他讲起自己热爱的事，眼睛突然亮起来。',
      '他随手解决了一个你纠结很久的问题。',
      '他在你面前露出"原来你也有不懂的"那一面。'
    ],
    theoryTitle: '光环效应 × 自我扩张',
    theoryText:
      '光环效应（Halo Effect）让我们在发现一个人某个突出优点后，自动给他补上"温柔、可靠、专一"等其他优点；自我扩张模型（Self-Expansion Model）则认为，人会被能带自己进入新世界、扩展自我边界的人吸引。你上头的往往不是他的脸，而是他让你看到一个更大的世界。',
    theorySource: 'Thorndike, 1920 / Aron & Aron, 1986',
    strengths: '你容易被优秀的人带动，恋爱常常也是成长。',
    risks: '把"他很强"误当成"他会爱你"；用仰望代替亲密。',
    tips: [
      '看他怎么对待比他弱的人。',
      '把崇拜翻译成具体需求："我需要你陪我"，而不是"你好厉害"。',
      '在他不懂的领域，也让他看到你的世界。'
    ],
    match: '能平等对话、愿意教你不居高临下的人。',
    avoid: '只会输出、不会倾听的人。'
  },
  B: {
    ...TYPE_META.B, id: 'B',
    female: {
      tagline: '你爱上的不只是他，还有"他需要你"的感觉。',
      shareTitle: '我不是圣母，我只是见不得他难过',
      shareCopy: '我的心动开关：他第一次在我面前示弱。'
    },
    male: {
      tagline: '你爱上的不只是她，还有"她需要你扛事"的感觉。',
      shareTitle: '我不是老好人，我只是见不得她难',
      shareCopy: '我的心动开关：她遇到事第一反应是找我。'
    },
    name: '人间止疼片型',
    keywords: ['脆弱', '被需要', '拯救'],
    quote: '你总想救别人，却忘了自己也在水里。',
    symbol: '疼',
    scenes: [
      '他说"这件事我只跟你说"。',
      '他第一次在你面前哭。',
      '他状态很差，但只有你能把他哄好。'
    ],
    theoryTitle: '强迫性照顾 × 拯救者情结',
    theoryText:
      '强迫性照顾（Compulsive Caregiving）指有些人会通过照顾别人来获得安全感和价值感；卡普曼戏剧三角（Karpman Drama Triangle）则描述了"拯救者—受害者—迫害者"三种角色如何互相吸引。你爱上的可能不是他，而是"被你需要"的感觉。',
    theorySource: 'Bowlby / Karpman, 1968',
    strengths: '共情力强，很会接住别人的情绪。',
    risks: '爱上他的潜力，而不是他的现实；关系变成救助站；他好起来后你反而失落。',
    tips: [
      '先问自己：我是想爱他，还是想证明我有用。',
      '设一条"不替他承担后果"的边界。',
      '练习接受别人的照顾，而不是只做照顾者。'
    ],
    match: '愿意互相照顾、能表达需求的人。',
    avoid: '长期吸血、只在你付出时出现的人。'
  },
  C: {
    ...TYPE_META.C, id: 'C',
    female: {
      tagline: '你对"只对我"没有抵抗力。',
      shareTitle: '他对全世界关门，只给我留了一扇窗',
      shareCopy: '我承认，我对"只对我"没有抵抗力。'
    },
    male: {
      tagline: '你对"她只在你面前卸下铠甲"没有抵抗力。',
      shareTitle: '她对外高冷，只在我面前哭',
      shareCopy: '我承认，我对"她只对我软"没有抵抗力。'
    },
    name: '反差捕手型',
    keywords: ['例外', '破冰', '专属'],
    quote: '你爱的不是反差，是"我是特别的"。',
    symbol: '反',
    scenes: [
      '他对所有人都很冷，只对你笑了一下。',
      '他白天只回"嗯"，晚上突然发来一段很长的语音。',
      '他平时很正经，喝了点酒突然说"其实我很依赖你"。'
    ],
    theoryTitle: '增益效应 × 稀缺性',
    theoryText:
      '增益效应（Gain-Loss Effect）发现，从否定到肯定的态度转变，比一直肯定更能让人心动；稀缺性原理则会让"少见的东西"在脑内自动加价。"他只对我这样"之所以致命，是因为它同时给了你特殊感和不确定性。',
    theorySource: 'Aronson & Linder, 1965 / Brock, 1968',
    strengths: '你很会发现别人藏起来的柔软，也很有耐心。',
    risks: '把"破冰瞬间"当成"日常温度"；把冷暴力误认成反差；用"他为我破例"替代"他尊重我"。',
    tips: [
      '区分"反差"和"冷暴力"：反差是偶尔破例，冷暴力是长期让你猜。',
      '看他稳定时的样子，不要只看他为你破例的那一次。',
      '把"他只对我"换成"他是否稳定地对我好"。'
    ],
    match: '表达一致、愿意让你看到真实面的人。',
    avoid: '用"只对你"当免死金牌的人。'
  },
  D: {
    ...TYPE_META.D, id: 'D',
    female: {
      tagline: '你不追心动，你追心安。',
      shareTitle: '我不追心动，我追心安',
      shareCopy: '我的心动开关：他记得我所有的小习惯。'
    },
    male: {
      tagline: '你不追心跳加速，你追"她不会走"。',
      shareTitle: '我不追心动，我追踏实',
      shareCopy: '我的心动开关：她说"我在"，就真的一直在。'
    },
    name: '长期主义型',
    keywords: ['稳定', '回应', '陪伴'],
    quote: '你不是不浪漫，你把浪漫换成了"一直在"。',
    symbol: '定',
    scenes: [
      '他记得你所有的小习惯。',
      '你难过时，他不需要你说，就知道该做什么。',
      '你们各做各的事，抬头就能看到对方。'
    ],
    theoryTitle: '曝光效应 × 安全型依恋',
    theoryText:
      '曝光效应（Mere Exposure Effect）让熟悉感自动转化为好感；安全型依恋（Secure Attachment）则来自稳定、可预测的回应；相似性吸引（Similarity-Attraction）会因相近的价值观和生活节奏而增强。你不是没激情，你是把激情换成了"一直都在"。',
    theorySource: 'Zajonc, 1968 / Ainsworth / Byrne, 1961',
    strengths: '情绪稳定，适合长期关系，是很多人眼里的"安全基地"。',
    risks: '把习惯当爱；因为安全而忽略新鲜感；在平淡里被"刺激"拐走。',
    tips: [
      '定期一起做新的事，给关系制造"第一次"。',
      '区分"安心"和"将就"。',
      '把需求说出口，不要等对方猜。'
    ],
    match: '稳定、愿意沟通、能一起成长的人。',
    avoid: '把稳定当理所当然、拒绝成长的人。'
  },
  E: {
    ...TYPE_META.E, id: 'E',
    female: {
      tagline: '你爱的不是他，是下一次手机亮起。',
      shareTitle: '我不是恋爱脑，我是赌徒',
      shareCopy: '我的心动开关：他消失半天后突然出现。'
    },
    male: {
      tagline: '你爱的不是她，是"这次能不能成"的那口气。',
      shareTitle: '我不是渣男，我是赌徒',
      shareCopy: '我的心动开关：她忽冷忽热，越得不到越想要。'
    },
    name: '老虎机型',
    keywords: ['忽冷忽热', '猜', '上瘾'],
    quote: '你不是恋爱脑，你是赌徒。',
    symbol: '赌',
    scenes: [
      '他消失半天，突然发来一句"在干嘛"。',
      '他前一天很热络，今天像换了个人。',
      '他偶尔对你好一次，你能回味三天。'
    ],
    theoryTitle: '间歇性强化 × 蔡格尼克效应',
    theoryText:
      '间歇性强化（Intermittent Reinforcement）说明，不确定的奖励最容易让人上瘾，老虎机就是靠这个机制；蔡格尼克效应（Zeigarnik Effect）让未完成的事更容易被记住；沉没成本（Sunk Cost）则让你越付出越难离开。',
    theorySource: 'Skinner / Zeigarnik, 1927 / Arkes & Blumer, 1985',
    strengths: '你很有耐心，也很会捕捉关系里细微的变化。',
    risks: '把焦虑当心动；把他偶尔的回暖当关系变好；长期消耗。',
    tips: [
      '记录"稳定回应"和"消失"的比例，用事实代替感觉。',
      '设"三次规则"：同样的消失或冷淡出现三次，就认真谈一次。',
      '问自己：如果他一辈子都这样，我还要吗？'
    ],
    match: '表达稳定、边界清晰的人。',
    avoid: '用消失操控你情绪的人。'
  },
  F: {
    ...TYPE_META.F, id: 'F',
    female: {
      tagline: '你容易爱上一个瞬间，然后把他补全。',
      shareTitle: '我爱的不是他，是那天晚上的风',
      shareCopy: '我的心动开关：深夜、路灯、他外套上的味道。'
    },
    male: {
      tagline: '你容易爱上一个画面，然后把她放进去。',
      shareTitle: '我爱的不是她，是那个场景里的她',
      shareCopy: '我的心动开关：黄昏、江风、她的侧脸。'
    },
    name: '氛围感型',
    keywords: ['夜色', '风', '场景'],
    quote: '你爱的不是他，是那天晚上的风。',
    symbol: '氛',
    scenes: [
      '深夜、路灯、他外套上的味道。',
      '一起走夜路，他把你拉到马路内侧。',
      '你们一起经历了一件很特别的事，后来你分不清是喜欢那件事，还是喜欢他。'
    ],
    theoryTitle: '吊桥效应 × 投射',
    theoryText:
      '吊桥效应（Misattribution of Arousal）指人在紧张、兴奋、心跳加速时，容易把生理唤醒误读为心动；情境依赖记忆会把音乐、夜色、气味和某个人绑定；投射则让你把理想中的样子加到对方身上。你不是花痴，你是对"感觉"特别敏感。',
    theorySource: 'Dutton & Aron, 1974 / Zillmann, 1971',
    strengths: '你很会感受，也很会制造浪漫，恋爱体验感强。',
    risks: '把场景当人；关系进入日常后迅速下头；被浪漫桥段收割。',
    tips: [
      '在白天、在日常、没打光的时候再见一次。',
      '看他在无聊时刻的样子：排队、堵车、生病。',
      '把"感觉"翻译成"行为"：他具体为你做了什么。'
    ],
    match: '愿意在平淡里创造仪式感的人。',
    avoid: '只会制造氛围、不愿承担日常的人。'
  },
  G: {
    ...TYPE_META.G, id: 'G',
    female: {
      tagline: '你最先爱上的，是和他在一起时的"你自己"。',
      shareTitle: '和他在一起，我终于不像在谈恋爱',
      shareCopy: '我的心动开关：他尊重我的边界，也把自己的活干好。'
    },
    male: {
      tagline: '你最先爱上的，是她"不被情绪拿捏"的样子。',
      shareTitle: '她不是冷淡，她是知道自己要什么',
      shareCopy: '我的心动开关：她有原则，不被我带跑，还能把自己的事做好。'
    },
    name: '理性边界型',
    keywords: ['边界', '自我', '平等'],
    quote: '你不是不想投入，你只是不愿被消耗。',
    symbol: '界',
    scenes: [
      '他直接说"这件事我不想做"，而不是先答应再抱怨。',
      '你们意见不合，他说"我不同意，但我理解你为什么这么想"。',
      '他不会因为你生气就消失，也不会因为你撒娇就无底线迁就。'
    ],
    theoryTitle: '自我决定理论 × 边界感',
    theoryText:
      '自我决定理论（Self-Determination Theory）认为，自主性、胜任感、归属感是人的三大基本心理需求；边界感清晰的人更能带来安全感和稳定的吸引。你爱的不是"特别的人"，而是"让你保持特别的自己"的人。',
    theorySource: 'Deci & Ryan, 1985',
    strengths: '独立、理性、知道自己要什么，恋爱不容易被拉扯消耗。',
    risks: '过度防御，把正常的亲密需求当成"被侵犯"；显得冷淡，错过真正合适的人。',
    tips: [
      '区分"边界"和"防御"：边界是我不要什么，防御是我不敢要什么。',
      '偶尔主动说一次"我需要你"，而不是永远等对方开口。',
      '允许关系里有一点"不讲道理"的时刻。'
    ],
    match: '边界清晰、独立理性、愿意平等对话的人。',
    avoid: '试图让你为关系放弃自我的人。'
  },
  H: {
    ...TYPE_META.H, id: 'H',
    female: {
      tagline: '你要的不是稳定，是"下一秒会发生什么"。',
      shareTitle: '和他在一起，连过马路都像冒险',
      shareCopy: '我的心动开关：他说"别想了，跟我走"。'
    },
    male: {
      tagline: '你要的不是结果，是"她愿不愿意跟你一起疯"。',
      shareTitle: '她愿不愿意陪你凌晨三点去看海',
      shareCopy: '我的心动开关：她说"走"，而不是"明天再说"。'
    },
    name: '即兴浪漫型',
    keywords: ['惊喜', '冒险', '打破'],
    quote: '你爱上的是打破日常的那个瞬间。',
    symbol: '破',
    scenes: [
      '他突然说"别上班了，跟我去趟海边"。',
      '你们本来只是吃饭，他临时开车带你去了山顶看日落。',
      '凌晨两点，他说"我想见你"，然后真的出现在你楼下。'
    ],
    theoryTitle: '寻求刺激 × 新奇偏好',
    theoryText:
      '感觉寻求（Sensation Seeking）是一种稳定的人格特质，高感觉寻求者更容易被打破日常、制造新异感的人吸引；多巴胺驱动的奖赏系统会对"不可预期的愉快事件"产生更强的反应。你不是不稳定，你只是对"活着"的感觉特别敏感。',
    theorySource: 'Zuckerman, 1979 / Berridge, 2007',
    strengths: '有活力、敢冒险，和你在一起的人永远不会无聊。',
    risks: '把"心跳"当"喜欢"；新鲜感过了迅速下头；关系难以落地。',
    tips: [
      '和同一个人制造不同的事，而不是换不同的人做同一件事。',
      '看他在"没灵感"的时候会不会想跑。',
      '承认自己也需要一点稳定，不要全靠"即兴"撑关系。'
    ],
    match: '同样爱冒险、能一起打破日常的人。',
    avoid: '只享受冒险、不愿承担结果的人。'
  }
}

export function resultMeta(type, gender) {
  const r = RESULTS[type]
  if (!r) return null
  return gender && r[gender] ? { ...r, ...r[gender] } : r
}

export const SEED_REVIEWS = [
  { id: 'seed-1', name: '小满', rating: 5, text: '颅内高潮型。"你爱的不是聪明，是聪明带来的新世界"那一下真的被戳中了。', tag: '颅内高潮型', likes: 128, date: '2026-11-12' },
  { id: 'seed-2', name: '阿离', rating: 5, text: '老虎机型本型。"你爱的不是他，是下一次手机亮起"建议直接印在脑门上。', tag: '老虎机型', likes: 96, date: '2026-11-11' },
  { id: 'seed-3', name: '桃子', rating: 4, text: '人间止疼片型。"强迫性照顾"这个词第一次见，但它解释了我为什么总爱上需要我的人。', tag: '人间止疼片型', likes: 74, date: '2026-11-10' },
  { id: 'seed-4', name: '陈见', rating: 5, text: '反差捕手型。"他只对我"这个开关准到想报警。', tag: '反差捕手型', likes: 61, date: '2026-11-09' },
  { id: 'seed-5', name: '小野', rating: 5, text: '理性边界型。原来不是我冷漠，是我确实需要和自己待在一起。', tag: '理性边界型', likes: 58, date: '2026-11-08' },
  { id: 'seed-6', name: '鹿鹿', rating: 4, text: '氛围感型。我爱的是那天晚上的风，不是那个人。', tag: '氛围感型', likes: 47, date: '2026-11-07' },
  { id: 'seed-7', name: '阿海', rating: 5, text: '即兴浪漫型。"她愿不愿意陪你凌晨三点去看海"这句话把我砸懵了。', tag: '即兴浪漫型', likes: 42, date: '2026-11-06' }
]
