<script setup lang="ts">
import json5 from 'json5'
import { themeIcons } from '../../utils/theme'

const appConfig = useAppConfig()

const icons = computed(() => themeIcons[appConfig.theme.icons as keyof typeof themeIcons || 'lucide'])

const { data: ast } = await useAsyncData(`icons-theme`, async () => {
  const md = `
::code-collapse

\`\`\`ts [app.config.ts]
export default defineAppConfig(${json5.stringify({
  ui: {
    icons: icons.value
  }
}, null, 2).replace(/,([ |\t\n]+[}|\])])/g, '$1')})
\`\`\`\

::
`
  return parseMarkdown(md, { })
}, { watch: [icons] })
</script>

<template>
  <MDCRenderer
    v-if="ast"
    :body="ast.body"
    :data="ast.data"
  />
</template>
