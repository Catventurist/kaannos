<template>
  <div class="flex items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
    <div
      class="flex w-full max-w-md flex-col gap-4 rounded-lg border p-8 shadow-md"
    >
      <div class="flex flex-col items-center gap-2 pb-2">
        <div
          class="flex size-11 shrink-0 items-center justify-center rounded-full border"
          aria-hidden="true"
        >
          <Icon name="lucide-mail" />
        </div>
        <div class="flex flex-col gap-y-1.5 text-center sm:text-left">
          <h1 class="text-lg leading-none font-semibold tracking-tight sm:text-center">
            Thanks for signing up!
          </h1>
          <p class="text-muted text-center text-sm">
            Please verify your email address before continuing.
          </p>
        </div>
      </div>
      <form class="flex flex-col gap-4">
        <p class="text-muted text-sm/relaxed">
          We've sent a verification link to
          <NuxtLink
            to="/"
            class="font-semibold"
          >
            example@email.com.
          </NuxtLink>
          Please click the link to verify your email address.
        </p>
        <p class="text-muted text-sm/relaxed">
          Didn't receive the email? Click the button below to resend the
          verification link.
        </p>
        <div class="flex w-full items-center justify-between gap-4">
          <UButton
            label="Resend verification email"
            variant="subtle"
          />
          <UButton
            label="Log out"
            variant="soft"
          />
        </div>
      </form>
    </div>
  </div>
</template>
