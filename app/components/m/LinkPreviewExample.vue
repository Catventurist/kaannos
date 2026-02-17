<template>
  <div class="flex h-160 flex-col items-center justify-center px-4">
    <p class="mx-auto mb-10 max-w-3xl text-xl text-muted md:text-3xl">
      <MLinkPreview
        url="https://tailwindcss.com"
        class="font-bold"
      >
        Tailwind CSS
      </MLinkPreview>
      and
      <MLinkPreview
        url="https://motion.unovue.com/"
        class="font-bold"
      >
        motion-v
      </MLinkPreview>
      are a great way to build modern websites.
    </p>
    <p class="mx-auto max-w-3xl text-xl text-muted md:text-3xl">
      Visit
      <MLinkPreview
        url="https://inspira-ui.com"
        :width="400"
        :height="200"
      >
        <span
          class="bg-linear-to-br from-primary to-warning bg-clip-text font-bold text-transparent"
        >
          Inspira UI
        </span>
      </MLinkPreview>
      for more cool components
    </p>
  </div>
</template>
