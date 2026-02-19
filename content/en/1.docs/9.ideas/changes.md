
## Beginning

### Nuxt i18n

+ `npx nuxi@latest module add @nuxtjs/i18n`
+ **nuxt.config.ts**
+ _/i18n/locales/_ **en.yml**, **fi.yml**
+ _/app/composables/_ **useCatI18n.ts**
+ _/app/components/_ **LanguageSelect.vue**
  - `localeItem.code` type

### Fonts

+ **nuxt.config.ts**
+ **main.css**

### Icons

+ **nuxt.config.ts**
+ _/app/_ **app.config.ts**

### Theme

+ _/app/composables/_ **useTheme.ts**
+ _/app/plugins/_
  + **theme.ts**
+ _/app/utils/_
  + **shiki-transformer-icon-highlight**
  + **theme.ts**
+ _/app/components/_ 
  + **ThemePicker.vue**
  + **ThemePickerButton.vue**


### Components

_/app/components/_

+ **DocsPageHeaderLinks.vue**
  - slop

### Scripts

_/app/_

+ **router.options.ts**

### **app.vue**

+ Locales
+ Icons
+ Fonts