<template>
  <div class="flex items-center justify-center p-8">
    <div class="relative">
      <h1 class="bg-clip-text text-transparent text-center bg-linear-to-b from-primary to-muted text-2xl select-none md:text-4xl font-bold leading-tight">
        Knowledge at
        <br>
        Your Fingertip
      </h1>
      <div class="absolute -top-17.5 -left-17.5">
        <MDragAvatar
          image="/logo-dark.webp"
          border-color="#60A5FA"
          :range="200"
          :size="100"
        />
      </div>
    </div>
  </div>
</template>
