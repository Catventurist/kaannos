import { defineCollection, property } from '@nuxt/content'
import { z } from 'zod/v4'

const variantEnum = z.enum(['solid', 'outline', 'subtle', 'soft', 'ghost', 'link'])
const colorEnum = z.enum(['primary', 'secondary', 'neutral', 'error', 'warning', 'success', 'info'])
const sizeEnum = z.enum(['xs', 'sm', 'md', 'lg', 'xl'])
const orientationEnum = z.enum(['vertical', 'horizontal'])

const Base = () => z.object({
  title: z.string().nonempty(),
  description: z.string().nonempty()
})

const FeatureItem = () => Base().extend({
  icon: property(z.string()).editor({ input: 'icon' })
})

const Link = () => z.object({
  label: z.string().nonempty(),
  to: z.string().nonempty(),
  icon: property(z.string()).editor({ input: 'icon' }),
  size: sizeEnum.optional(),
  trailing: z.boolean().optional(),
  target: z.string().optional(),
  color: colorEnum.optional(),
  variant: variantEnum.optional()
})

const Image = () => z.object({
  src: property(z.string()).editor({ input: 'media' }),
  alt: z.string().optional(),
  loading: z.enum(['lazy', 'eager']).optional(),
  srcset: z.string().optional()
})

const Author = () => z.object({
  name: z.string(),
  description: z.string().optional(),
  username: z.string().optional(),
  twitter: z.string().optional(),
  to: z.string().optional(),
  avatar: Image().optional()
})

const Authors = () => z.object({
  name: z.string(),
  avatar: Avatar(),
  to: z.string(),
  username: z.string(),
  description: property(z.string()).editor({ input: 'textarea' }),
  role: z.enum(['creator', 'maintainer', 'contributor']).default('contributor'),
  order: z.number().default(0),
  birthDate: z.date(),
  lastCommitAt: z.date(),
  icon: property(z.string()).editor({ input: 'icon', iconLibraries: ['lucide', 'tabler'] }),
  isOpenSourceLover: z.boolean().default(true),
  modules: z.array(z.string())
})

const Testimonial = () => z.object({
  quote: z.string(),
  author: Author()
})

const PageHero = () => z.object({
  title: z.string(),
  description: z.string(),
  links: z.array(Link()).optional()
})

const Page = () => z.object({
  title: z.string(),
  description: z.string(),
  hero: PageHero()
})

const Avatar = () => z.object({
  src: property(z.string()).editor({ input: 'media' }),
  alt: z.string().optional()
})

export const collections = {
  landing_en: defineCollection({
    source: 'en/0.index.yml',
    type: 'page',
    schema: z.object({
      hero: z.object(({
        links: z.array(Link())
      })),
      sections: z.array(
        Base().extend({
          id: z.string().nonempty(),
          orientation: orientationEnum.optional(),
          reverse: z.boolean().optional(),
          features: z.array(FeatureItem())
        })
      ),
      features: Base().extend({
        items: z.array(FeatureItem())
      }),
      testimonials: Base().extend({
        headline: z.string().optional(),
        items: z.array(
          z.object({
            quote: z.string().nonempty(),
            user: z.object({
              name: z.string().nonempty(),
              description: z.string().nonempty(),
              to: z.string().nonempty(),
              target: z.string().nonempty(),
              avatar: Image()
            })
          })
        )
      }),
      cta: Base().extend({
        links: z.array(Link())
      })
    })
  }),
  docs_en: defineCollection({
    source: 'en/1.docs/**/*',
    type: 'page'
  }),
  pricing_en: defineCollection({
    source: 'en/2.pricing.yml',
    type: 'page',
    schema: z.object({
      plans: z.array(
        z.object({
          title: z.string().nonempty(),
          description: z.string().nonempty(),
          price: z.object({
            month: z.string().nonempty(),
            year: z.string().nonempty()
          }),
          billing_period: z.string().nonempty(),
          billing_cycle: z.string().nonempty(),
          button: Link(),
          features: z.array(z.string().nonempty()),
          highlight: z.boolean().optional()
        })
      ),
      logos: z.object({
        title: z.string().nonempty(),
        icons: z.array(z.string())
      }),
      faq: Base().extend({
        items: z.array(
          z.object({
            label: z.string().nonempty(),
            content: z.string().nonempty()
          })
        )
      })
    })
  }),
  blog_en: defineCollection({
    source: 'en/3.blog.yml',
    type: 'page'
  }),
  posts_en: defineCollection({
    source: 'en/3.blog/**/*',
    type: 'page',
    schema: z.object({
      image: z.object({ src: property(z.string()).editor({ input: 'media' }) }),
      authors: z.array(
        z.object({
          name: z.string().nonempty(),
          to: z.string().nonempty(),
          avatar: z.object({ src: property(z.string()).editor({ input: 'media' }) })
        })
      ),
      date: z.date(),
      badge: z.object({ label: z.string().nonempty() })
    })
  }),
  changelog_en: defineCollection({
    source: 'en/4.changelog.yml',
    type: 'page'
  }),
  versions_en: defineCollection({
    source: 'en/4.changelog/**/*',
    type: 'page',
    schema: z.object({
      title: z.string().nonempty(),
      description: z.string(),
      date: z.date(),
      image: Image()
    })
  }),
  about_en: defineCollection({
    type: 'page',
    source: 'en/5.about.yml',
    schema: z.object({
      hero: z.object({
        links: z.array(Link()),
        images: z.array(Image())
      }),
      about: Base(),
      experience: Base().extend({
        items: z.array(z.object({
          date: z.date(),
          position: z.string(),
          company: z.object({
            name: z.string(),
            url: z.string(),
            logo: property(z.string()).editor({ input: 'icon' }),
            color: z.string()
          })
        }))
      }),
      testimonials: z.array(Testimonial()),
      blog: Base(),
      faq: Base().extend({
        categories: z.array(
          z.object({
            title: z.string().nonempty(),
            questions: z.array(
              z.object({
                label: z.string().nonempty(),
                content: z.string().nonempty()
              })
            )
          }))
      })
    })
  }),
  guide_en: defineCollection({
    type: 'page',
    source: 'en/6.guides.yml',
    schema: Page()
  }),
  guides_en: defineCollection({
    type: 'page',
    source: [{
      include: 'en/6.guides/**/*'
    }],
    schema: z.object({
      image: property(z.string()).editor({ input: 'media' }),
      date: z.date(),
      authors: z.array(z.object({
        name: z.string(),
        avatar: Avatar().optional(),
        to: z.string().optional()
      })).optional()
    })
  }),
  aut_en: defineCollection({
    source: {
      include: 'en/7.authors.yml'
    },
    type: 'page',
    schema: Page()
  }),
  authors_en: defineCollection({
    type: 'page',
    source: {
      include: 'en/7.authors/**/*'
    },
    schema: Authors()
  }),
  landing_fi: defineCollection({
    source: 'fi/0.index.yml',
    type: 'page',
    schema: z.object({
      hero: z.object(({
        links: z.array(Link())
      })),
      sections: z.array(
        Base().extend({
          id: z.string().nonempty(),
          orientation: orientationEnum.optional(),
          reverse: z.boolean().optional(),
          features: z.array(FeatureItem())
        })
      ),
      features: Base().extend({
        items: z.array(FeatureItem())
      }),
      testimonials: Base().extend({
        headline: z.string().optional(),
        items: z.array(
          z.object({
            quote: z.string().nonempty(),
            user: z.object({
              name: z.string().nonempty(),
              description: z.string().nonempty(),
              to: z.string().nonempty(),
              target: z.string().nonempty(),
              avatar: Image()
            })
          })
        )
      }),
      cta: Base().extend({
        links: z.array(Link())
      })
    })
  }),
  docs_fi: defineCollection({
    source: 'fi/1.docs/**/*',
    type: 'page'
  }),
  pricing_fi: defineCollection({
    source: 'fi/2.pricing.yml',
    type: 'page',
    schema: z.object({
      plans: z.array(
        z.object({
          title: z.string().nonempty(),
          description: z.string().nonempty(),
          price: z.object({
            month: z.string().nonempty(),
            year: z.string().nonempty()
          }),
          billing_period: z.string().nonempty(),
          billing_cycle: z.string().nonempty(),
          button: Link(),
          features: z.array(z.string().nonempty()),
          highlight: z.boolean().optional()
        })
      ),
      logos: z.object({
        title: z.string().nonempty(),
        icons: z.array(z.string())
      }),
      faq: Base().extend({
        items: z.array(
          z.object({
            label: z.string().nonempty(),
            content: z.string().nonempty()
          })
        )
      })
    })
  }),
  blog_fi: defineCollection({
    source: 'fi/3.blog.yml',
    type: 'page'
  }),
  posts_fi: defineCollection({
    source: 'fi/3.blog/**/*',
    type: 'page',
    schema: z.object({
      image: z.object({ src: property(z.string()).editor({ input: 'media' }) }),
      authors: z.array(
        z.object({
          name: z.string().nonempty(),
          to: z.string().nonempty(),
          avatar: z.object({ src: property(z.string()).editor({ input: 'media' }) })
        })
      ),
      date: z.date(),
      badge: z.object({ label: z.string().nonempty() })
    })
  }),
  changelog_fi: defineCollection({
    source: 'fi/4.changelog.yml',
    type: 'page'
  }),
  versions_fi: defineCollection({
    source: 'fi/4.changelog/**/*',
    type: 'page',
    schema: z.object({
      title: z.string().nonempty(),
      description: z.string(),
      date: z.date(),
      image: Image()
    })
  }),
  about_fi: defineCollection({
    type: 'page',
    source: 'fi/5.about.yml',
    schema: z.object({
      hero: z.object({
        links: z.array(Link()),
        images: z.array(Image())
      }),
      about: Base(),
      experience: Base().extend({
        items: z.array(z.object({
          date: z.date(),
          position: z.string(),
          company: z.object({
            name: z.string(),
            url: z.string(),
            logo: property(z.string()).editor({ input: 'icon' }),
            color: z.string()
          })
        }))
      }),
      testimonials: z.array(Testimonial()),
      blog: Base(),
      faq: Base().extend({
        categories: z.array(
          z.object({
            title: z.string().nonempty(),
            questions: z.array(
              z.object({
                label: z.string().nonempty(),
                content: z.string().nonempty()
              })
            )
          }))
      })
    })
  }),
  guide_fi: defineCollection({
    type: 'page',
    source: 'fi/6.guides.yml',
    schema: Page()
  }),
  guides_fi: defineCollection({
    type: 'page',
    source: [{
      include: 'fi/6.guides/**/*'
    }],
    schema: z.object({
      image: property(z.string()).editor({ input: 'media' }),
      date: z.date(),
      authors: z.array(z.object({
        name: z.string(),
        avatar: Avatar().optional(),
        to: z.string().optional()
      })).optional()
    })
  }),
  aut_fi: defineCollection({
    source: {
      include: 'fi/7.authors.yml'
    },
    type: 'page',
    schema: Page()
  }),
  authors_fi: defineCollection({
    type: 'page',
    source: {
      include: 'fi/7.authors/**/*'
    },
    schema: Authors()
  })
}
