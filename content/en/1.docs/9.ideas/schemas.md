
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