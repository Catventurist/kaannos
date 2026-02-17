import { z } from 'zod/v4'

// common
const IdLike = z.string().min(1).regex(/^[a-z0-9]+$/i)

const DateIsoString = z.string().refine((d) => {
  const t = Date.parse(d)
  return !Number.isNaN(t)
}, { message: 'Invalid ISO date string' })

// Roadmap
const StatusEnum = z.enum(['planned', 'in-progress', 'blocked', 'completed'])
const PriorityEnum = z.enum(['low', 'medium', 'high', 'critical'])
const DependencyBehaviorEnum = z.enum(['finish-to-start', 'start-to-start', 'finish-to-finish', 'start-to-finish'])

const MilestoneSchema = z.object({
  id: IdLike,
  title: z.string().min(1),
  date: DateIsoString,
  notes: z.string().optional(),
  completed: z.boolean().optional().default(false)
})

const FeatureSchema = z.object({
  id: IdLike,
  title: z.string().min(1),
  description: z.string().optional(),
  status: StatusEnum.optional().default('planned'),
  priority: PriorityEnum.optional().default('medium'),
  owner: z.string().min(1).optional(),
  startDate: DateIsoString.optional(),
  endDate: DateIsoString.optional(),
  dependsOn: z.array(IdLike).optional().default([]),
  milestones: z.array(MilestoneSchema).optional().default([]),
  tags: z.array(z.string()).optional().default([])
})

const DependencySchema = z.object({
  from: IdLike,
  to: IdLike,
  relation: DependencyBehaviorEnum.optional().default('finish-to-start')
})

const RoadmapSchema = z.object({
  version: z.string().min(1).optional().default('1.0.0'),
  generatedAt: DateIsoString.optional().default(() => new Date().toISOString()),
  title: z.string().min(1),
  description: z.string().optional(),
  timelineStart: DateIsoString.optional(),
  timelineEnd: DateIsoString.optional(),
  features: z.array(FeatureSchema).min(0).optional().default([]),
  dependencies: z.array(DependencySchema).optional().default([]),
  notes: z.string().optional()
})

export {
  MilestoneSchema,
  FeatureSchema,
  DependencySchema,
  RoadmapSchema
}

// Job
const JobTypeEnum = z.enum(['full-time', 'part-time', 'contract', 'internship', 'temporary'])
const JobStatusEnum = z.enum(['open', 'closed', 'on-hold', 'filled'])
const LocationTypeEnum = z.enum(['remote', 'on-site', 'hybrid'])
const SalaryPeriodEnum = z.enum(['hourly', 'daily', 'monthly', 'yearly'])

const SalarySchema = z.object({
  min: z.number().optional(),
  max: z.number().optional(),
  currency: z.string().min(1).optional(),
  period: SalaryPeriodEnum.optional().default('yearly')
})

const RequirementSchema = z.object({
  id: IdLike,
  text: z.string().min(1),
  level: z.enum(['nice-to-have', 'must-have']).optional().default('must-have')
})

const BenefitSchema = z.object({
  id: IdLike,
  name: z.string().min(1),
  description: z.string().optional()
})

const JobSchema = z.object({
  id: IdLike,
  title: z.string().min(1),
  description: z.string().optional(),
  department: z.string().min(1).optional(),
  type: JobTypeEnum,
  status: JobStatusEnum.optional().default('open'),
  locationType: LocationTypeEnum.optional().default('remote'),
  location: z.string().min(1).optional(),
  company: z.string().min(1).optional(),
  postedAt: DateIsoString.optional(),
  closingAt: DateIsoString.optional(),
  salary: SalarySchema.optional(),
  requirements: z.array(RequirementSchema).optional().default([]),
  responsibilities: z.array(z.string().min(1)).optional().default([]),
  benefits: z.array(BenefitSchema).optional().default([]),
  tags: z.array(z.string()).optional().default([]),
  remoteOk: z.boolean().optional().default(true)
})

export type Job = z.infer<typeof JobSchema>
export { JobSchema, SalarySchema, RequirementSchema, BenefitSchema }

// Help Center
const ArticleSchema = z.object({
  id: IdLike,
  title: z.string().min(1),
  content: z.string().min(1),
  excerpt: z.string().optional(),
  categoryId: IdLike.optional(),
  tags: z.array(z.string()).optional().default([]),
  author: z.string().min(1).optional(),
  createdAt: DateIsoString.optional(),
  updatedAt: DateIsoString.optional(),
  views: z.number().int().optional().default(0),
  published: z.boolean().optional().default(true),
  relatedArticles: z.array(IdLike).optional().default([])
})

const CategorySchema = z.object({
  id: IdLike,
  name: z.string().min(1),
  description: z.string().optional(),
  parentId: IdLike.optional()
})

const FAQSchema = z.object({
  id: IdLike,
  question: z.string().min(1),
  answer: z.string().min(1),
  categoryId: IdLike.optional(),
  relatedArticleId: IdLike.optional(),
  weight: z.number().int().optional().default(0),
  tags: z.array(z.string()).optional().default([])
})

const HelpCenterSchema = z.object({
  version: z.string().min(1).optional().default('1.0.0'),
  title: z.string().min(1).optional(),
  lastUpdated: DateIsoString.optional().default(() => new Date().toISOString()),
  categories: z.array(CategorySchema).optional().default([]),
  articles: z.array(ArticleSchema).optional().default([]),
  faqs: z.array(FAQSchema).optional().default([]),
  searchIndex: z.array(z.string()).optional().default([]),
  notes: z.string().optional()
})

export type Article = z.infer<typeof ArticleSchema>
export type Category = z.infer<typeof CategorySchema>
export type FAQ = z.infer<typeof FAQSchema>
export type HelpCenter = z.infer<typeof HelpCenterSchema>

export { ArticleSchema, CategorySchema, FAQSchema, HelpCenterSchema }

// Portal
const LayoutEnum = z.enum(['single', 'two-column', 'three-column', 'grid'])
const VisibilityEnum = z.enum(['public', 'authenticated', 'private', 'limited'])

const WidgetSchema = z.object({
  id: IdLike,
  type: z.string().min(1),
  config: z.array(z.string()).optional(),
  position: z.number().int().positive().optional()
})

const PortalSectionSchema = z.object({
  id: IdLike,
  slug: z.string().min(1),
  title: z.string().min(1),
  content: z.string().optional(),
  layout: LayoutEnum.optional().default('single'),
  visibility: VisibilityEnum.optional().default('public'),
  owner: z.string().min(1).optional(),
  createdAt: DateIsoString.optional(),
  updatedAt: DateIsoString.optional(),
  widgets: z.array(WidgetSchema).optional().default([])
})

export type Widget = z.infer<typeof WidgetSchema>
export type PortalSection = z.infer<typeof PortalSectionSchema>

export { WidgetSchema, PortalSectionSchema }

// Careers (+jobsEnums)

const PositionSchema = z.object({
  id: IdLike,
  title: z.string().min(1),
  description: z.string().optional(),
  department: z.string().min(1).optional(),
  type: JobTypeEnum,
  status: JobStatusEnum.optional().default('open'),
  locationType: LocationTypeEnum.optional().default('remote'),
  location: z.string().min(1).optional(),
  company: z.string().min(1).optional(),
  postedAt: DateIsoString.optional(),
  closingAt: DateIsoString.optional(),
  salary: SalarySchema.optional(),
  requirements: z.array(RequirementSchema).optional().default([]),
  responsibilities: z.array(z.string().min(1)).optional().default([]),
  benefits: z.array(BenefitSchema).optional().default([]),
  tags: z.array(z.string()).optional().default([]),
  remoteOk: z.boolean().optional().default(true)
})

const TeamMemberSchema = z.object({
  id: IdLike,
  name: z.string().min(1),
  role: z.string().min(1),
  bio: z.string().optional(),
  avatarUrl: z.url().optional(),
  location: z.string().optional(),
  skills: z.array(z.string()).optional().default([])
})

const CareersSchema = z.object({
  version: z.string().min(1).optional().default('1.0.0'),
  title: z.string().min(1).optional(),
  lastUpdated: DateIsoString.optional().default(() => new Date().toISOString()),
  company: z.string().min(1),
  pageSubtitle: z.string().optional(),
  locations: z.array(z.string()).optional().default([]),
  positions: z.array(PositionSchema).optional().default([]),
  team: z.array(TeamMemberSchema).optional().default([]),
  notes: z.string().optional()
})

export type Position = z.infer<typeof PositionSchema>
export type TeamMember = z.infer<typeof TeamMemberSchema>
export type Careers = z.infer<typeof CareersSchema>

export { PositionSchema, TeamMemberSchema, CareersSchema }

// Affiliate

const TierEnum = z.enum(['bronze', 'silver', 'gold', 'platinum'])
const AffiliateStatusEnum = z.enum(['active', 'inactive', 'suspended'])

const CampaignSchema = z.object({
  id: IdLike,
  name: z.string().min(1),
  startAt: DateIsoString.optional(),
  endAt: DateIsoString.optional(),
  url: z.url().optional(),
  description: z.string().optional()
})

const AffiliateSchema = z.object({
  id: IdLike,
  name: z.string().min(1),
  description: z.string().optional(),
  url: z.url().optional(),
  contactEmail: z.email().optional(),
  tier: TierEnum.optional().default('bronze'),
  status: AffiliateStatusEnum.optional().default('active'),
  joinedAt: DateIsoString.optional(),
  commissionRate: z.number().min(0).max(100).optional(),
  campaigns: z.array(CampaignSchema).optional().default([]),
  tags: z.array(z.string()).optional().default([]),
  notes: z.string().optional()
})

const AffiliatesSchema = z.object({
  version: z.string().min(1).optional().default('1.0.0'),
  lastUpdated: DateIsoString.optional().default(() => new Date().toISOString()),
  company: z.string().min(1).optional(),
  affiliates: z.array(AffiliateSchema).optional().default([]),
  notes: z.string().optional()
})

export type Affiliate = z.infer<typeof AffiliateSchema>
export type Campaign = z.infer<typeof CampaignSchema>
export type Affiliates = z.infer<typeof AffiliatesSchema>

export { AffiliateSchema, CampaignSchema, AffiliatesSchema }

// Sponsor (+campaign)

const SponsorStatusEnum = z.enum(['active', 'inactive', 'on-hold'])

const SponsorSchema = z.object({
  id: IdLike,
  name: z.string().min(1),
  description: z.string().optional(),
  website: z.string().url().optional(),
  contactEmail: z.string().email().optional(),
  tier: TierEnum.optional().default('bronze'),
  status: SponsorStatusEnum.optional().default('active'),
  joinedAt: DateIsoString.optional(),
  contributionRate: z.number().min(0).optional(),
  campaigns: z.array(CampaignSchema).optional().default([]),
  tags: z.array(z.string()).optional().default([]),
  notes: z.string().optional()
})

const SponsorsSchema = z.object({
  version: z.string().min(1).optional().default('1.0.0'),
  lastUpdated: DateIsoString.optional().default(() => new Date().toISOString()),
  organization: z.string().min(1).optional(),
  sponsors: z.array(SponsorSchema).optional().default([]),
  notes: z.string().optional()
})

export type Sponsor = z.infer<typeof SponsorSchema>
export type Sponsors = z.infer<typeof SponsorsSchema>

export { SponsorSchema, SponsorsSchema }
