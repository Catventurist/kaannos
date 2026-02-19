<script setup lang="ts">
import type { TreeItem } from '@nuxt/ui'

const items = [
  {
    label: 'app/',
    id: 'app',
    children: [{
      label: 'components/',
      id: 'app/components',
      children: [{
        label: 'components/content',
        id: 'app/components/content',
        children: [
          { label: 'ComponentCode.vue', icon: 'i-vscode-icons-file-type-vue' },
          { label: 'PictureAndText.vue', icon: 'i-vscode-icons-file-type-vue' },
          { label: 'Pictures.vue', icon: 'i-vscode-icons-file-type-vue' }
        ]
      }, {
        label: 'components/icon',
        id: 'app/components/icon',
        children: [
          { label: 'Home.vue', icon: 'i-vscode-icons-file-type-vue' }
        ]
      }, {
        label: 'components/OgImage',
        id: 'app/components/og-image',
        children: [
          { label: 'OgImageSaas.vue', icon: 'i-vscode-icons-file-type-vue' }
        ]
      }, {
        label: 'components/u',
        id: 'app/components/u',
        children: [
          { label: 'CircularProgress.vue', icon: 'i-vscode-icons-file-type-vue' },
          { label: 'CountUp.vue', icon: 'i-vscode-icons-file-type-vue' },
          { label: 'DatePicker.vue', icon: 'i-vscode-icons-file-type-vue' },
          { label: 'DialogSheet.vue', icon: 'i-vscode-icons-file-type-vue' },
          { label: 'FileTree.vue', icon: 'i-vscode-icons-file-type-vue' },
          { label: 'HoverCard.vue', icon: 'i-vscode-icons-file-type-vue' },
          { label: 'TextCommand.vue', icon: 'i-vscode-icons-file-type-vue' },
          { label: 'list.ts', icon: 'i-vscode-icons-file-type-typescript' },
          { label: 'utils.ts', icon: 'i-vscode-icons-file-type-typescript' }
        ]
      }, {
        label: 'AppFooter.vue', icon: 'i-vscode-icons-file-type-vue'
      }, {
        label: 'AppHeader.vue', icon: 'i-vscode-icons-file-type-vue'
      }, {
        label: 'ColorModeButton.vue', icon: 'i-vscode-icons-file-type-vue'
      }, {
        label: 'HeroBackground.vue', icon: 'i-vscode-icons-file-type-vue'
      }, {
        label: 'ImagePlaceholder.vue', icon: 'i-vscode-icons-file-type-vue'
      }, {
        label: 'LangSwitcher.vue', icon: 'i-vscode-icons-file-type-vue'
      }, {
        label: 'StarsBg.vue', icon: 'i-vscode-icons-file-type-vue'
      }, {
        label: 'ThemePicker.vue', icon: 'i-vscode-icons-file-type-vue'
      }, {
        label: 'ThemePickerButton.vue', icon: 'i-vscode-icons-file-type-vue'
      }]
    }, {
      label: 'composables/',
      id: 'app/composables',
      children: [
        { label: 'fetchComponentMeta.ts', icon: 'i-vscode-icons-file-type-typescript' }
      ]
    }, {
      label: 'layouts/',
      id: 'app/layouts',
      children: [
        { label: 'auth.vue', icon: 'i-vscode-icons-file-type-vue' },
        { label: 'default.vue', icon: 'i-vscode-icons-file-type-vue' },
        { label: 'docs.vue', icon: 'i-vscode-icons-file-type-vue' }
      ]
    }, {
      label: 'pages/',
      id: 'app/pages',
      children: [
        { label: 'blog', icon: 'lucide:folder' },
        { label: 'changelog', icon: 'lucide:folder' },
        { label: 'docs', icon: 'lucide:folder' },
        { label: 'blog.vue', icon: 'i-vscode-icons-file-type-vue' },
        { label: 'index.vue', icon: 'i-vscode-icons-file-type-vue' },
        { label: 'login.vue', icon: 'i-vscode-icons-file-type-vue' },
        { label: 'pricing.vue', icon: 'i-vscode-icons-file-type-vue' },
        { label: 'signup.vue', icon: 'i-vscode-icons-file-type-vue' }
      ]
    }, {
      label: 'plugins/',
      id: 'app/plugins',
      children: [
        { label: 'prettier.ts', icon: 'i-vscode-icons-file-type-typescript' }
      ]
    }, {
      label: 'workers/',
      id: 'app/workers',
      children: [
        { label: 'prettier.js', icon: 'i-vscode-icons-file-type-js' }
      ]
    }, {
      label: 'app.config.ts', icon: 'i-vscode-icons-file-type-typescript'
    }, {
      label: 'app.vue', id: 'app.vue', icon: 'i-vscode-icons-file-type-vue'
    }, {
      label: 'error.vue', id: 'error.vue', icon: 'i-vscode-icons-file-type-vue'
    }
    ]
  }, {
    label: 'content/',
    id: 'content',
    children: [
      { label: 'markdown', icon: 'i-vscode-icons-file-type-markdown' },
      { label: 'yml', icon: 'i-vscode-icons-file-type-yaml' }
    ]
  }, {
    label: 'i18n/locales/',
    id: 'i18n',
    children: [
      { label: 'en.yml', icon: 'i-vscode-icons-file-type-yaml' },
      { label: 'fi.yml', icon: 'i-vscode-icons-file-type-yaml' }
    ]
  }, {
    label: 'public/',
    id: 'public',
    children: [
      { label: 'cat.png', icon: 'i-vscode-icons-file-type-image' },
      { label: 'catbirch.webp', icon: 'i-vscode-icons-file-type-webp' },
      { label: 'catbirchdark.webp', icon: 'i-vscode-icons-file-type-webp' }
    ]
  },
  { label: 'content.config.ts', id: 'content.config.ts', icon: 'i-vscode-icons-file-type-typescript' },
  { label: 'nuxt.config.ts', id: 'nuxt.config.ts', icon: 'i-vscode-icons-file-type-nuxt' },
  { label: 'package.json', id: 'package.json', icon: 'i-vscode-icons-file-type-json' }
] satisfies TreeItem[]

const expanded = ref(['app', 'app/composables'])
</script>

<template>
  <UTree v-model:expanded="expanded" :items="items" :get-key="i => i.id" />
</template>
