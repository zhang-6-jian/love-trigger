export const TYPE_ORDER = ['A', 'B', 'C', 'D', 'E', 'F']

export const TYPE_META = {
  A: { name: '颅内高潮型', short: '智性上头', color: '#b23a28', soft: '#f3d8d2', english: 'CEREBRAL CRUSH' },
  B: { name: '人间止疼片型', short: '拯救上头', color: '#8f5a3c', soft: '#f2e2d5', english: 'THE SOOTHER' },
  C: { name: '反差捕手型', short: '例外上头', color: '#9a3f5f', soft: '#f4dbe4', english: 'THE EXCEPTION' },
  D: { name: '长期主义型', short: '安心上头', color: '#4f6b5d', soft: '#dfe9e2', english: 'THE STEADY' },
  E: { name: '老虎机型', short: '不确定上瘾', color: '#6b4a8f', soft: '#e8dff2', english: 'THE SLOT MACHINE' },
  F: { name: '氛围感型', short: '场景上头', color: '#b47a2c', soft: '#f5e6cd', english: 'THE ATMOSPHERE' }
}

export const QUESTIONS = [
  {
    id: 1,
    group: '初遇与吸引',
    text: '朋友局上，你最容易对谁产生好感？',
    options: [
      { text: '讲起自己专业时眼睛发光的人', type: 'A' },
      { text: '默默照顾喝醉朋友、最后还把账结了的人', type: 'B' },
      { text: '全场最冷、只在你说话时抬头看你的人', type: 'C' }
    ]
  },
  {
    id: 2,
    group: '初遇与吸引',
    text: '第一次约会，哪里最容易让你上头？',
    options: [
      { text: '安静的咖啡馆，聊到店员开始收椅子', type: 'D' },
      { text: '他临时改期，却在深夜发来“刚忙完，突然很想见你”', type: 'E' },
      { text: '夜景天台，风把他的外套吹到你肩上', type: 'F' }
    ]
  },
  {
    id: 3,
    group: '初遇与吸引',
    text: '加微信后，哪种开场最让你想继续聊？',
    options: [
      { text: '他直接抛来一个你最近正好在思考的问题', type: 'A' },
      { text: '他白天只回了“嗯”，晚上突然发来一段很长的语音', type: 'C' },
      { text: '他每天固定时间出现，问你今天过得怎么样', type: 'D' }
    ]
  },
  {
    id: 4,
    group: '初遇与吸引',
    text: '他第一次让你心跳加速，通常是因为？',
    options: [
      { text: '他说“今天有点撑不住，能陪我说说话吗”', type: 'B' },
      { text: '他前一天还很热络，今天突然一整天没消息', type: 'E' },
      { text: '过马路时，他下意识把你拉到里侧', type: 'F' }
    ]
  },
  {
    id: 5,
    group: '聊天与暧昧',
    text: '哪种消息最让你反复看？',
    options: [
      { text: '一段很长、很有见地的观点，末尾还问你“你怎么看”', type: 'A' },
      { text: '“这件事我只跟你说”', type: 'B' },
      { text: '稳定地每天问你“到家了吗”', type: 'D' }
    ]
  },
  {
    id: 6,
    group: '聊天与暧昧',
    text: '暧昧期最上头的瞬间？',
    options: [
      { text: '他在人群里谁都不看，只看着你', type: 'C' },
      { text: '他忽冷忽热，让你忍不住反复点开对话框', type: 'E' },
      { text: '一起走夜路，他把你拉到马路内侧', type: 'F' }
    ]
  },
  {
    id: 7,
    group: '聊天与暧昧',
    text: '他回消息的速度，哪种最让你在意？',
    options: [
      { text: '不常秒回，但每次回都很长、很认真', type: 'A' },
      { text: '你一回，他立刻回，像一直在等你', type: 'B' },
      { text: '有时秒回，有时消失半天，你开始猜他在干嘛', type: 'E' }
    ]
  },
  {
    id: 8,
    group: '聊天与暧昧',
    text: '你更吃哪种“反差”？',
    options: [
      { text: '平时高冷，私下只对你黏人', type: 'C' },
      { text: '看起来普通，但情绪特别稳定', type: 'D' },
      { text: '看起来不起眼，但和他在一起时时间过得特别快', type: 'F' }
    ]
  },
  {
    id: 9,
    group: '约会与日常',
    text: '约会结束，哪种收尾最让你回味？',
    options: [
      { text: '他发来一条很长的消息，认真说今天哪里开心', type: 'A' },
      { text: '他当朋友面很客气，分开后突然发“今天很好看”', type: 'C' },
      { text: '他送你到家门口，却在你进门后立刻消失', type: 'E' }
    ]
  },
  {
    id: 10,
    group: '约会与日常',
    text: '你理想中的恋爱画面？',
    options: [
      { text: '他把你从糟糕的状态里一点点拉出来', type: 'B' },
      { text: '两个人各做各的事，抬头就能看到对方', type: 'D' },
      { text: '一起去陌生的地方，经历很多第一次', type: 'F' }
    ]
  },
  {
    id: 11,
    group: '约会与日常',
    text: '你发现自己喜欢上一个人，通常是因为？',
    options: [
      { text: '他解决了你搞不定的问题', type: 'A' },
      { text: '他让你觉得自己很重要', type: 'B' },
      { text: '你们一起经历了一件很特别的事', type: 'F' }
    ]
  },
  {
    id: 12,
    group: '约会与日常',
    text: '对方吵架后的处理，哪种最让你离不开？',
    options: [
      { text: '先冷着脸，过一会儿又别扭地来哄你', type: 'C' },
      { text: '冷静沟通，当天解决', type: 'D' },
      { text: '先消失两天，再像没事一样回来', type: 'E' }
    ]
  },
  {
    id: 13,
    group: '冲突与脆弱',
    text: '你最容易在什么时刻上头？',
    options: [
      { text: '他认真做事、完全投入的时候', type: 'A' },
      { text: '他记得你所有的小习惯', type: 'D' },
      { text: '他本来很忙，却突然秒回你', type: 'E' }
    ]
  },
  {
    id: 14,
    group: '冲突与脆弱',
    text: '对方送的礼物，哪种最戳你？',
    options: [
      { text: '他亲手做的东西', type: 'B' },
      { text: '平时很抠，却给你买了他自己舍不得的', type: 'C' },
      { text: '一张你们一起拍的照片', type: 'F' }
    ]
  },
  {
    id: 15,
    group: '冲突与脆弱',
    text: '你会想知道对方的过去吗？',
    options: [
      { text: '会，想知道他读过什么书、走过哪些地方', type: 'A' },
      { text: '会，想知道他以前是不是也这么高冷', type: 'C' },
      { text: '不太在意，过去不重要，重要的是感觉', type: 'F' }
    ]
  },
  {
    id: 16,
    group: '冲突与脆弱',
    text: '你最容易因为什么留在关系里？',
    options: [
      { text: '他需要我', type: 'B' },
      { text: '我们很合适，很安心', type: 'D' },
      { text: '我已经付出太多了', type: 'E' }
    ]
  },
  {
    id: 17,
    group: '付出与边界',
    text: '对方突然冷淡，你会？',
    options: [
      { text: '先分析他最近是不是遇到什么事', type: 'A' },
      { text: '开始反思自己哪里做错了', type: 'B' },
      { text: '表面无所谓，心里已经开始较劲', type: 'C' }
    ]
  },
  {
    id: 18,
    group: '付出与边界',
    text: '你最怕恋爱里的什么？',
    options: [
      { text: '对方不再和我分享日常', type: 'D' },
      { text: '我看不透对方', type: 'E' },
      { text: '再也没有心动的感觉', type: 'F' }
    ]
  },
  {
    id: 19,
    group: '付出与边界',
    text: '朋友说你恋爱时：',
    options: [
      { text: '“你总是被比你厉害的人吸引”', type: 'A' },
      { text: '“你嘴上说不在意，其实最容易被反差拿捏”', type: 'C' },
      { text: '“你很稳定，很少上头”', type: 'D' }
    ]
  },
  {
    id: 20,
    group: '付出与边界',
    text: '如果对方消失一天，你会？',
    options: [
      { text: '担心他是不是出事了', type: 'B' },
      { text: '生气，但更想知道他去了哪', type: 'E' },
      { text: '脑补了一整部电影', type: 'F' }
    ]
  },
  {
    id: 21,
    group: '长期与未来',
    text: '你更容易对谁产生“想靠近”的冲动？',
    options: [
      { text: '某个领域很厉害的人', type: 'A' },
      { text: '最近状态很差、需要人陪的人', type: 'B' },
      { text: '认识很久、一直在身边的朋友', type: 'D' }
    ]
  },
  {
    id: 22,
    group: '长期与未来',
    text: '你最容易被哪种“氛围”击中？',
    options: [
      { text: '他平时很正经，喝了点酒突然说“其实我很依赖你”', type: 'C' },
      { text: '他一会儿很近，一会儿很远', type: 'E' },
      { text: '深夜、路灯、他外套上的味道', type: 'F' }
    ]
  },
  {
    id: 23,
    group: '长期与未来',
    text: '如果给“心动”下定义：',
    options: [
      { text: '是我想成为的样子', type: 'A' },
      { text: '是我终于被一个人需要', type: 'B' },
      { text: '是我猜不透他下一秒会做什么', type: 'E' }
    ]
  },
  {
    id: 24,
    group: '长期与未来',
    text: '你更愿意谈哪种恋爱？',
    options: [
      { text: '有点拉扯，但每次和好都更甜', type: 'C' },
      { text: '平平淡淡，但每天都很安心', type: 'D' },
      { text: '轰轰烈烈，先把回忆装满', type: 'F' }
    ]
  }
]

export const RESULTS = {
  A: {
    ...TYPE_META.A,
    id: 'A',
    name: '颅内高潮型',
    tagline: '别人看脸，你看他讲 PPT 的样子。',
    keywords: ['聪明', '专注', '新世界'],
    quote: '你爱的不是聪明，是聪明带来的新世界。',
    ratio: 18.6,
    symbol: '颅',
    scenes: [
      '他讲起自己热爱的事，眼睛突然亮起来。',
      '他随手解决了一个你纠结很久的问题。',
      '他在你面前露出“原来你也有不懂的”那一面。'
    ],
    theoryTitle: '光环效应 × 自我扩张',
    theoryText:
      '光环效应（Halo Effect）让我们在发现一个人某个突出优点后，自动给他补上“温柔、可靠、专一”等其他优点；自我扩张模型（Self-Expansion Model）则认为，人会被能带自己进入新世界、扩展自我边界的人吸引。你上头的往往不是他的脸，而是他让你看到一个更大的世界。',
    theorySource: 'Thorndike, 1920 / Aron & Aron, 1986',
    strengths: '你容易被优秀的人带动，恋爱常常也是成长。',
    risks: '把“他很强”误当成“他会爱你”；用仰望代替亲密。',
    tips: [
      '看他怎么对待比他弱的人。',
      '把崇拜翻译成具体需求：“我需要你陪我”，而不是“你好厉害”。',
      '在他不懂的领域，也让他看到你的世界。'
    ],
    match: '能平等对话、愿意教你不居高临下的人。',
    avoid: '只会输出、不会倾听的人。',
    shareTitle: '我不是颜控，我是脑控',
    shareCopy: '我的心动开关：他讲起热爱的事时，眼睛会发光。'
  },
  B: {
    ...TYPE_META.B,
    id: 'B',
    name: '人间止疼片型',
    tagline: '你爱上的不只是他，还有“他需要你”的感觉。',
    keywords: ['脆弱', '被需要', '拯救'],
    quote: '你总想救别人，却忘了自己也在水里。',
    ratio: 16.2,
    symbol: '疼',
    scenes: [
      '他说“这件事我只跟你说”。',
      '他第一次在你面前哭。',
      '他状态很差，但只有你能把他哄好。'
    ],
    theoryTitle: '强迫性照顾 × 拯救者情结',
    theoryText:
      '强迫性照顾（Compulsive Caregiving）指有些人会通过照顾别人来获得安全感和价值感；卡普曼戏剧三角（Karpman Drama Triangle）则描述了“拯救者—受害者—迫害者”三种角色如何互相吸引。你爱上的可能不是他，而是“被你需要”的感觉。',
    theorySource: 'Bowlby / Karpman, 1968',
    strengths: '共情力强，很会接住别人的情绪。',
    risks: '爱上他的潜力，而不是他的现实；关系变成救助站；他好起来后你反而失落。',
    tips: [
      '先问自己：我是想爱他，还是想证明我有用。',
      '设一条“不替他承担后果”的边界。',
      '练习接受别人的照顾，而不是只做照顾者。'
    ],
    match: '愿意互相照顾、能表达需求的人。',
    avoid: '长期吸血、只在你付出时出现的人。',
    shareTitle: '我不是圣母，我只是见不得他难过',
    shareCopy: '我的心动开关：他第一次在我面前示弱。'
  },
  C: {
    ...TYPE_META.C,
    id: 'C',
    name: '反差捕手型',
    tagline: '你对“只对我”没有抵抗力。',
    keywords: ['例外', '破冰', '专属'],
    quote: '你爱的不是反差，是“我是特别的”。',
    ratio: 17.3,
    symbol: '反',
    scenes: [
      '他对所有人都很冷，只对你笑了一下。',
      '他白天只回“嗯”，晚上突然发来一段很长的语音。',
      '他平时很正经，喝了点酒突然说“其实我很依赖你”。'
    ],
    theoryTitle: '增益效应 × 稀缺性',
    theoryText:
      '增益效应（Gain-Loss Effect）发现，从否定到肯定的态度转变，比一直肯定更能让人心动；稀缺性原理则会让“少见的东西”在脑内自动加价。“他只对我这样”之所以致命，是因为它同时给了你特殊感和不确定性。',
    theorySource: 'Aronson & Linder, 1965 / Brock, 1968',
    strengths: '你很会发现别人藏起来的柔软，也很有耐心。',
    risks: '把“破冰瞬间”当成“日常温度”；把冷暴力误认成反差；用“他为我破例”替代“他尊重我”。',
    tips: [
      '区分“反差”和“冷暴力”：反差是偶尔破例，冷暴力是长期让你猜。',
      '看他稳定时的样子，不要只看他为你破例的那一次。',
      '把“他只对我”换成“他是否稳定地对我好”。'
    ],
    match: '表达一致、愿意让你看到真实面的人。',
    avoid: '用“只对你”当免死金牌的人。',
    shareTitle: '他对全世界关门，只给我留了一扇窗',
    shareCopy: '我承认，我对“只对我”没有抵抗力。'
  },
  D: {
    ...TYPE_META.D,
    id: 'D',
    name: '长期主义型',
    tagline: '你不追心动，你追心安。',
    keywords: ['稳定', '回应', '陪伴'],
    quote: '你不是不浪漫，你把浪漫换成了“一直在”。',
    ratio: 21.4,
    symbol: '定',
    scenes: [
      '他记得你所有的小习惯。',
      '你难过时，他不需要你说，就知道该做什么。',
      '你们各做各的事，抬头就能看到对方。'
    ],
    theoryTitle: '曝光效应 × 安全型依恋',
    theoryText:
      '曝光效应（Mere Exposure Effect）让熟悉感自动转化为好感；安全型依恋（Secure Attachment）则来自稳定、可预测的回应；相似性吸引（Similarity-Attraction）会因相近的价值观和生活节奏而增强。你不是没激情，你是把激情换成了“一直都在”。',
    theorySource: 'Zajonc, 1968 / Ainsworth / Byrne, 1961',
    strengths: '情绪稳定，适合长期关系，是很多人眼里的“安全基地”。',
    risks: '把习惯当爱；因为安全而忽略新鲜感；在平淡里被“刺激”拐走。',
    tips: [
      '定期一起做新的事，给关系制造“第一次”。',
      '区分“安心”和“将就”。',
      '把需求说出口，不要等对方猜。'
    ],
    match: '稳定、愿意沟通、能一起成长的人。',
    avoid: '把稳定当理所当然、拒绝成长的人。',
    shareTitle: '我不追心动，我追心安',
    shareCopy: '我的心动开关：他记得我所有的小习惯。'
  },
  E: {
    ...TYPE_META.E,
    id: 'E',
    name: '老虎机型',
    tagline: '你爱的不是他，是下一次手机亮起。',
    keywords: ['忽冷忽热', '猜', '上瘾'],
    quote: '你不是恋爱脑，你是赌徒。',
    ratio: 14.8,
    symbol: '赌',
    scenes: [
      '他消失半天，突然发来一句“在干嘛”。',
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
      '记录“稳定回应”和“消失”的比例，用事实代替感觉。',
      '设“三次规则”：同样的消失或冷淡出现三次，就认真谈一次。',
      '问自己：如果他一辈子都这样，我还要吗？'
    ],
    match: '表达稳定、边界清晰的人。',
    avoid: '用消失操控你情绪的人。',
    shareTitle: '我不是恋爱脑，我是赌徒',
    shareCopy: '我的心动开关：他消失半天后突然出现。'
  },
  F: {
    ...TYPE_META.F,
    id: 'F',
    name: '氛围感型',
    tagline: '你容易爱上一个瞬间，然后把他补全。',
    keywords: ['夜色', '风', '场景'],
    quote: '你爱的不是他，是那天晚上的风。',
    ratio: 11.7,
    symbol: '氛',
    scenes: [
      '深夜、路灯、他外套上的味道。',
      '一起走夜路，他把你拉到马路内侧。',
      '你们一起经历了一件很特别的事，后来你分不清是喜欢那件事，还是喜欢他。'
    ],
    theoryTitle: '吊桥效应 × 投射',
    theoryText:
      '吊桥效应（Misattribution of Arousal）指人在紧张、兴奋、心跳加速时，容易把生理唤醒误读为心动；情境依赖记忆会把音乐、夜色、气味和某个人绑定；投射则让你把理想中的样子加到对方身上。你不是花痴，你是对“感觉”特别敏感。',
    theorySource: 'Dutton & Aron, 1974 / Zillmann, 1971',
    strengths: '你很会感受，也很会制造浪漫，恋爱体验感强。',
    risks: '把场景当人；关系进入日常后迅速下头；被浪漫桥段收割。',
    tips: [
      '在白天、在日常、没打光的时候再见一次。',
      '看他在无聊时刻的样子：排队、堵车、生病。',
      '把“感觉”翻译成“行为”：他具体为你做了什么。'
    ],
    match: '愿意在平淡里创造仪式感的人。',
    avoid: '只会制造氛围、不愿承担日常的人。',
    shareTitle: '我爱的不是他，是那天晚上的风',
    shareCopy: '我的心动开关：深夜、路灯、他外套上的味道。'
  }
}

export const SEED_REVIEWS = [
  {
    id: 'seed-1',
    name: '小满',
    rating: 5,
    text: '测出来是颅内高潮型。看到“你爱的不是聪明，是聪明带来的新世界”那一下真的被戳中了。我前任就是那种讲起代码眼睛发光的人。',
    tag: '颅内高潮型',
    likes: 128,
    date: '2026-11-12'
  },
  {
    id: 'seed-2',
    name: '阿离',
    rating: 5,
    text: '老虎机型本型。“你爱的不是他，是下一次手机亮起”这句话建议直接印在我脑门上。',
    tag: '老虎机型',
    likes: 96,
    date: '2026-11-11'
  },
  {
    id: 'seed-3',
    name: '桃子',
    rating: 4,
    text: '我是人间止疼片型。理论部分提到“强迫性照顾”，我第一次听说这个词，但它确实解释了为什么我总爱上需要我的人。',
    tag: '人间止疼片型',
    likes: 74,
    date: '2026-11-10'
  },
  {
    id: 'seed-4',
    name: '陈见',
    rating: 5,
    text: '反差捕手型。“他只对我”这个开关太准了，准到有点想报警。',
    tag: '反差捕手型',
    likes: 61,
    date: '2026-11-09'
  },
  {
    id: 'seed-5',
    name: '小野',
    rating: 5,
    text: '长期主义型。本来觉得自己很无聊，结果被一句“你把浪漫换成了一直在”安慰到了。',
    tag: '长期主义型',
    likes: 53,
    date: '2026-11-08'
  },
  {
    id: 'seed-6',
    name: '鹿鹿',
    rating: 4,
    text: '氛围感型。看完立刻回想了一下，我好像确实爱的是那天晚上的风，不是那个人。',
    tag: '氛围感型',
    likes: 47,
    date: '2026-11-07'
  }
]
