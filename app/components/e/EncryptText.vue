<template>
  <div class="space-y-4">
    <h1 class="text-4xl font-bold">
      <MEncryptedText
        text="Creating for freedom"
        :reveal-delay-ms="80"
      />
    </h1>

    <p class="text-muted">
      <MEncryptedText
        text="Secure, animated, and highly performant text rendering."
        :reveal-delay-ms="30"
        encrypted-class="text-info blur-sm opacity-50"
      />
    </p>
  </div>
</template>
