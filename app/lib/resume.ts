export type ResumeContact = {
  name: string;
  phone: string;
  email: string;
  location: string;
};

export type ResumeEducation = {
  school: string;
  degree: string;
  dates: string;
  location: string;
  courses: string;
};

export type ResumeExperience = {
  company: string;
  role: string;
  department: string;
  dates: string;
  location: string;
  bullets: string[];
};

export type ResumeProject = {
  name: string;
  url?: string;
  role: string;
  dates: string;
  stack?: string;
  description?: string;
  bullets: string[];
};

export type ResumeData = {
  contact: ResumeContact;
  title: string;
  summary: string;
  highlights: string[];
  education: ResumeEducation[];
  skills: string[];
  experience: ResumeExperience[];
  projects: ResumeProject[];
  selfEvaluation: string[];
  pdfPath: string;
};

export const RESUME: ResumeData = {
  contact: {
    name: "梁炯新",
    phone: "15889666941",
    email: "15889666941@163.com",
    location: "现居北京",
  },
  title: "AI 全栈 / 后端工程师",
  summary:
    "对 AI 赋能下的全栈构建感兴趣，也关注增长。早期基于 GPT 开发过私有文档知识库问答 Web 服务，并独立上线过多个出海相关网站，其中一个网站曾通过 SEO 做到月访问量 100w。",
  highlights: [
    "百度商业广告平台后端开发",
    "Redis / Kafka / Spark / Storm 实战",
    "Next.js + Better Auth + Supabase + Stripe 全栈上线经验",
    "AI 应用、知识库与 SEO 增长实践",
  ],
  education: [
    {
      school: "香港大学",
      degree: "商业分析 硕士 · 全日制",
      dates: "2020年09月 - 2022年11月",
      location: "香港",
      courses: "Python 编程(A)、深度学习(A-)、统计学习(A)、社交媒体分析",
    },
    {
      school: "深圳大学",
      degree: "数学与应用数学 本科 · 数学与统计学院 · 全日制",
      dates: "2016年06月 - 2020年06月",
      location: "深圳",
      courses:
        "程序设计概论、数据库系统概论、数据结构、概率论与数理统计、线性代数",
    },
  ],
  skills: [
    "了解 CSS、HTML、JavaScript，熟悉 React 以及基于 Next.js 的开发。",
    "熟悉常见数据结构及算法，如栈、队列、二叉树、链表以及基本排序算法。",
    "熟悉 Redis 数据结构、线程模型、持久化、分布式锁机制。",
    "熟悉消息队列常见场景：消息有序性、可靠性、幂等性、消息积压解决方案。",
    "熟悉 Linux、Git 常用命令。",
  ],
  experience: [
    {
      company: "百度科技有限公司",
      role: "后端开发工程师",
      department: "商业广告平台部",
      dates: "2023年02月 - 2026年01月",
      location: "北京",
      bullets: [
        "异步 API 项目：针对耗时任务进行异步处理，基于 Redis ZSet、Hash、List 设计任务生命周期管理模型，支持任务入队、任务元信息存储、执行进度统计和任务详情查询。",
        "实现基于请求入参 MD5 的幂等去重机制，结合 Redis TTL 防止短时间内重复提交相同任务。",
        "设计任务心跳与超时兜底机制，分片完成后自动续期，长时间无进度任务自动 finish / timeout，避免异常任务长期挂起。",
        "针对任务详情 List 可能产生 Redis 大 Key 的问题，设计失败明细保留、List 分片、阈值落库和异步删除等优化方案。",
        "API 限流服务：基于 AOP 实现限流逻辑无侵入接入，在接口入口统一完成规则匹配、限流 Key 构建和请求放行判断。",
        "使用“接口全限定类名 + 账户 ID”设计限流 Key，实现接口级、账户级精细化限流，避免单账户热点请求影响其他正常账户。",
        "通过定时任务从配置中心拉取限流规则并更新本地缓存，实现限流规则动态生效，减少业务发布和服务重启成本。",
        "基于 Redis 计数、TTL 和原子操作实现限流判断，降低高并发场景下的计数并发问题。",
      ],
    },
    {
      company: "北京京东科技有限公司",
      role: "大数据研发工程师",
      department: "广告架构部",
      dates: "2022年06月 - 2022年09月",
      location: "北京",
      bullets: [
        "标签数据接入：通过 Spark 编写数据批处理运行脚本，完成数据读入、清洗、处理、写回 HDFS，并通过配置文件调度任务。",
        "任务异步处理：对于耗时长的任务利用消息队列进行解耦，写入 Kafka 队列供消费端消费，保证低延迟。",
        "任务实时流计算：通过 Storm 配置 bolt / spout，对特定任务进行实时计算，为下游业务方提供实时更新的标签数据。",
      ],
    },
    {
      company: "北京快手科技有限公司",
      role: "数据分析",
      department: "电商事业部",
      dates: "2021年07月 - 2022年01月",
      location: "北京",
      bullets: [
        "SQL 优化：针对查询量大以及耗时长的 SQL 进行优化，提高查询效率。",
        "Python 模板支持：针对流程化和需求明确的部分，通过 Python 自动化输出周报和图表分析，给业务分析人员及时的数据支持。",
      ],
    },
  ],
  projects: [
    {
      name: "AI 视频/图像生成",
      url: "https://viw.ai/",
      role: "全栈工程师",
      dates: "2024年04月 - 2024年04月",
      stack: "Next.js, Better Auth, shadcn/ui, Supabase, Stripe, Redis",
      description: "基于 Next.js 实现前后端同构的网站，部署在 Vercel 服务器上。",
      bullets: [
        "支付：基于 Stripe webhook 机制，实现一次性付费 + 付费订阅功能。",
        "限流：基于 Redis 实现滑动窗口功能，实现 API 限流。",
        "异步回调生成图片：处理图片时先提交任务生成任务 id，webhook 基于任务 id 更新数据库 imgsrc，前端轮询查询 db 实现异步回调。",
      ],
    },
    {
      name: "基于 GPT-API 的知识库开发",
      role: "全栈工程师",
      dates: "2023年04月 - 2023年06月",
      stack: "Python, FastAPI, MySQL, ChromaDB, LangChain, Vue, Element Plus UI",
      description:
        "私有文档知识库问答 Web 服务，支持文件上传、向量索引、GPT API 调用和流式返回。",
      bullets: [
        "前端：通过 Vue 搭建基本对话框架、文件上传支持、流式输出和用户管理后台界面。",
        "后端：通过 FastAPI 搭建 Web 服务框架，使用 ChromaDB 与 OpenAI Embedding 将上传文本转化成 Embedding，并持久化到文件系统。",
        "文本对话：通过 LangChain 服务框架支持 GPT API 调用，并流式返回到前端。",
        "服务部署：通过 nginx + gunicorn + SSL 证书保护后端服务不直接暴露在公网。",
      ],
    },
    {
      name: "基于 Spring + Netty + ZooKeeper 实现分布式 RPC",
      role: "后台研发",
      dates: "2022年03月 - 2022年05月",
      stack: "Spring, Netty, ZooKeeper, JSON",
      description:
        "基于 Netty 做高性能网络通信，基于 Spring 做对象管理和动态代理，利用 ZooKeeper 实现服务节点创建与监听。",
      bullets: [
        "利用 Netty 解决短连接问题，通过心跳机制检测长连接，通过异步调用和不同解码器处理 TCP 粘包半包问题。",
        "基于 JSON 序列化对 JDK 自带序列化进行改进。",
        "基于 Spring 动态代理：通过 BeanPostProcessor 和 ApplicationListener 实现基于注解的服务调用。",
        "基于 ZooKeeper 实现服务注册中心，提供客户端服务发现以及服务节点监听。",
      ],
    },
    {
      name: "AcCommunity 社区系统",
      role: "全栈开发",
      dates: "2022年03月 - 2022年05月",
      stack: "SpringBoot, Redis, MyBatis, MySQL, Kafka",
      description: "实现发布帖子、点赞、私信、关注、系统通知等社区功能。",
      bullets: [
        "使用 Session 存储用户登录凭证，利用 ThreadLocal 存储登录信息，避免多线程访问问题以及频繁数据库读取用户信息的问题。",
        "使用 Redis 对点赞、登录等热点模块进行优化，利用 Redis 作为缓存并统计在线人数，替代从数据库中获取数据，降低响应时间。",
        "通过 Kafka 进行流量削峰平谷，实现松耦合的异步数据传递。",
      ],
    },
  ],
  selfEvaluation: [
    "喜欢做构建和增长：最近 3-4 个月做过一些小网站，都有一些流量，并希望研究竞对策略，让自己的网站进行有机增长。",
    "动手能力强：GPT API 开放后，迅速基于现有 API 能力构建知识库应用，独立实现前后端并完成部署上线，也独立开发多个基于 GPT-4 API 的应用。",
    "学习能力强：平常会阅读英文技术博客以及相关 GitHub 项目，对于技术实现有热情。",
    "英语能力尚可：大学时期雅思 7.5（阅读 8 / 听力 8.5），对外语教学视频和阅读基本适应。",
  ],
  pdfPath: "/resume/liang-jiongxin-ai-fullstack.pdf",
};
