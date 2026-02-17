

## Add localization support for your component

Kaannos provides a built-in locale infrastructure to add localization support to your component.

Components register their message keys by extending the `Messages` type in `runtime/types/locale.ts`.  
Locale files in `runtime/locale/*` then provide the actual translations for those keys, keeping translations typed and consistent.

For illustration, consider the following simple component:
```vue [MyButton.vue]
<template>
  <button aria-label="This button is awesome">
    Click me
  </button>
</template>
```

Let's localize both the button text and its `aria-label`.

::steps{level="4"}

#### Define your messages
```typescript [runtime/types/locale.ts]
export type Messages = {
  // ...
  myButton?: {
    buttonText?: string
    ariaLabel?: string
  }
  // ...
}
```
::warning
The component key in `locale.ts` must match your component name in camelCase. For Example, `MyButton.vue` -> `myButton:`
::

::warning
All entries must be optional by using the `?` TypeScript annotation - i.e: `myButton?: {`, `buttonText?: string`, `ariaLabel?: string` Otherwise, you'll be required to provide translations for every supported locale.
::

::tip
You can pick any name you like for your messages. For example: `buttonText` can be `mainText` and `ariaLabel` can be `ariaText` or anything that makes sense for your component
::

#### Add translations to your messages
Translations files are located in `runtime/locale` - Add the locales you want to support for your component:
```typescript [runtime/locale/en.ts]
import type { Messages } from '../types'
import { defineLocale } from '../composables/defineLocale'

export default defineLocale<Messages>({
  name: 'English',
  code: 'en',
  messages: {
    //...
    myButton: {
      buttonText: 'Click me',
      ariaLabel: 'This button is awesome'
    }
    //...
  }
})
```

::warning
You must at minimum add support for English for your component at: `runtime/locale/en.ts`
::

#### Finally use the newly created translations in your component file
```vue [MyButton.vue]
<script setup lang="ts">
import { useLocale } from '../composables/useLocale'

const { t } = useLocale()
</script>

<template>
  <button :aria-label="t('myButton.ariaLabel')">
    {{ t('myButton.buttonText') }}
  </button>
</template>
```
::
