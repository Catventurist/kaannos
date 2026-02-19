
## Zod Schemas


## Job

```ts
import { z } from 'zod/v4'

const jobListingSchema = z.object({
  title: z.string().min(1, { message: 'Job title is required' }),
  company: z.string().min(1, { message: 'Company name is required' }),
  location: z.string().min(1, { message: 'Location is required' }),
  description: z.string().min(10, { message: 'Description must be at least 10 characters long' }),
  salary: z.number().optional(),
  jobType: z.enum(['Full-time', 'Part-time', 'Contract', 'Temporary'], { message: 'Invalid job type' }),
  postedAt: z.date().optional().default(() => new Date()),
  requirements: z.array(z.string()).min(1, { message: 'At least one requirement is needed' }).optional(),
  benefits: z.array(z.string()).optional(),
  isRemote: z.boolean().optional(),
  companyWebsite: z.url({ message: 'Invalid URL format' }).optional()
})

export default jobListingSchema
```

## Problems

- **InboxList.vue** ref type

## Updates

```vue {2}
- throw createError({ statusCode: 404, statusMessage: 'Not Found' })
+ throw createError({ status: 404, statusText: 'Not Found' })
```

```ts
const bookmarkSchema = z.object({
  id: z.string(),
  parentId: z.string(),
  index: z.number(),
  title: z.string(),
  url: z.string()
})
const userSchema = z.object({
  id: z.number(),
  username: z.string(),
  email: z.string().email(),
  password: z.string(),
  role: z.enum(['CATMIN', 'USER', 'GUEST']),
  createdAt: z.date(),
  updatedAt: z.date()
})

const State = z.enum(['TODO', 'IN_PROGRESS', 'DONE', 'ARCHIVED'])

const Todo = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  completed: z.boolean(),
  dueDate: z.date(),
  createdAt: z.date(),
  updatedAt: z.date(),
  state: State
})

const Habit = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  streak: z.number(),
  startDate: z.date(),
  endDate: z.date(),
  createdAt: z.date(),
  updatedAt: z.date(),
  user: User
})

const Image = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  url: z.string(),
  width: z.number(),
  height: z.number(),
  createdAt: z.date(),
  updatedAt: z.date(),
  user: User
})

const Message = z.object({
  id: z.string(),
  content: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
  user: User,
})

const Chat = z.object({
  id: z.string(),
  title: z.string(),
  messages: z.array(Message),
  createdAt: z.date(),
  updatedAt: z.date(),
  users: z.array(User)
})

const nuxtComponentSchema = z.object({
  name: z.string(),
  description: z.string(),
  props: z.record(z.string()),
  slots: z.record(z.string()),
  template: z.string(),
  script: z.string(),
  style: z.string(),
  usage: z.string(),
  behavior: z.string(),
  examples: z.array(z.string()),
  dependencies: z.array(z.string())
})

const githubUserSchema = z.object({
  login: z.string(),
  id: z.number(),
  node_id: z.string(),
  avatar_url: z.string(),
  gravatar_id: z.string(),
  url: z.string(),
  html_url: z.string(),
  followers_url: z.string(),
  following_url: z.string(),
  gists_url: z.string(),
  starred_url: z.string(),
  subscriptions_url: z.string(),
  organizations_url: z.string(),
  repos_url: z.string(),
  events_url: z.string(),
  received_events_url: z.string(),
  type: z.string(),
  site_admin: z.boolean(),
  name: z.string(),
  company: z.string(),
  blog: z.string(),
  location: z.string(),
  email: z.string(),
  hireable: z.boolean(),
  bio: z.string(),
  twitter_username: z.string(),
  public_repos: z.number(),
  public_gists: z.number(),
  followers: z.number(),
  following: z.number(),
  created_at: z.string(),
  updated_at: z.string(),
})

const chakraEnum = z.enum([
  'crown',
  'heart',
  'throat',
  'base',
  'sacrum',
  'spine',
  'nasion',
])

const weekdayEnum = z.enum(['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'])
const chakraScheduleSchema = z.object({
  start: z.instanceof(Date),
  end: z.instanceof(Date),
  weekday: weekdayEnum,
  chakra: chakraEnum,
  todo: z.string(),
  description: z.string(),
  location: z.string()
})

const livingAsAHermitSchema = z.object({
  name: z.string(),
  age: z.number(),
  location: z.string(),
  hermitStatus: z.boolean(),
  hermitAffiliations: z.array(z.string()),
  hermitLife: z.object({
    hermitType: z.enum(['Monk', 'Hermit', 'Bhikkhu', 'Acolyte']),
    hermitDuty: z.string(),
    hermitRules: z.array(z.string()),
  }),
  hermitHabits: z.object({
    diet: z.enum(['Vegetarian', 'Vegan', 'Pescatarian', 'Gluten-free', 'No-restrictions']),
    sleepSchedule: z.enum(['7-9 hours', '8-10 hours', '9-11 hours', '10-12 hours']),
    exerciseFrequency: z.enum(['Never', 'Rarely', 'Occasionally', 'Regularly', 'Daily']),
  }),
  hermitGoals: z.object({
    spiritual: z.array(z.string()),
    practical: z.array(z.string()),
    personal: z.array(z.string()),
    social: z.array(z.string())
  })
})

export const ExchangeSchema = z.object({
  title: z.string().min(3).max(100),
  description: z.string().min(10).max(1000),
  location: z.string().min(5).max(255),
  date: z.string().refine((value) => !isNaN(Date.parse(value))),
  time: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/),
  contactInfo: z.object({
    email: z.string().email(),
    phone: z.string().optional().min(7).max(20),
    name: z.string().min(3).max(100),
    address: z.string().optional().max(255),
  }),
  items: z.array(
    z.object({
      name: z.string().min(3).max(100),
      description: z.string().optional().min(10).max(500),
      quantity: z.number().min(1).int(),
      category: z.enum(['electronics', 'books', 'clothing', 'toys', 'other']),
      condition: z.enum(['new', 'used', 'like new']),
      brand: z.string().optional().min(3).max(100),
      model: z.string().optional().min(3).max(100),
      serialNumber: z.string().optional().min(3).max(100),
      price: z.number().optional().min(0),
      imageUrl: z.string().optional().url(),
    })
  ).min(1),
  rules: z.string().optional().max(500),
  capacity: z.number().optional().min(1).int(),
  isPublic: z.boolean(),
  tags: z.array(z.string().min(3).max(20)).optional(),
  imageUrl: z.string().optional().url(),
})

// Wokepedia
const SectionSchema = z.object({
  title: z.string(),
  content: z.string(),
  subsections: z.array(z.lazy(() => SectionSchema)).optional(),
})

const InfoboxSchema = z.object({
  title: z.string(),
  properties: z.record(z.string(), z.string()),
})

const ReferenceSchema = z.object({
  id: z.string(),
  text: z.string(),
  url: z.string().optional(),
})

const ExternalLinkSchema = z.object({
  title: z.string(),
  url: z.string(),
})

const CategorySchema = z.object({
  name: z.string(),
})

const TableOfContentsEntrySchema = z.object({
  level: z.number(),
  title: z.string(),
  anchor: z.string(),
})

const EditHistoryEntrySchema = z.object({
  revisionId: z.string(),
  timestamp: z.string(),
  user: z.string(),
  comment: z.string().optional(),
})

const WokepediaArticleSchema = z.object({
  title: z.string(),
  namespace: z.string().optional(),
  language: z.string().optional(),
  url: z.string().optional(),
  introduction: z.string().optional(),
  sections: z.array(SectionSchema),
  tableOfContents: z.array(TableOfContentsEntrySchema).optional(),
  references: z.array(ReferenceSchema).optional(),
  externalLinks: z.array(ExternalLinkSchema).optional(),
  categories: z.array(CategorySchema).optional(),
  infobox: InfoboxSchema.optional(),
  images: z.array(z.string()).optional(),
  coordinates: z.object({
    latitude: z.number(),
    longitude: z.number(),
  }).optional(),
  redirects: z.array(z.string()).optional(),
  disambiguation: z.array(z.string()).optional(),
  sidebar: z.string().optional(),
  footnotes: z.array(z.string()).optional(),
  license: z.string().optional(),
  contributors: z.array(z.string()),
   editHistory: z.object({
    lastEdited: z.string().optional(),
    created: z.string().optional(),
    revisions: z.array(EditHistoryEntrySchema).optional(),
  }).optional(),
  relatedTopics: z.array(z.string()).optional(),
  seeAlso: z.array(z.string()).optional(),
  furtherReading: z.array(z.string()).optional(),
  navigation: z.array(z.string()).optional(),
  multimedia: z.array(z.string()).optional(),
  citations: z.array(z.string()).optional(),
  notes: z.array(z.string()).optional(),
  acknowledgments: z.array(z.string()).optional(),
  bibliography: z.array(z.string()).optional(),
  glossary: z.array(z.string()).optional(),
  index: z.array(z.string()).optional()
})
```
