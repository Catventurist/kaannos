<!-- eslint-disable @typescript-eslint/no-explicit-any -->
<script setup lang="ts">
const name = ref('')

const handleStepChange = (step: any) => {
  console.log('Step changed to:', step)
}

const handleFinalStepCompleted = () => {
  console.log('Stepper completed!')
}
</script>

<template>
  <MStepper
    :initial-step="1"
    :on-step-change="handleStepChange"
    :on-final-step-completed="handleFinalStepCompleted"
    back-button-text="Previous"
    next-button-text="Next"
  >
    <div>
      <h2>Welcome to the stepper!</h2>
      <p>Check out the next step!</p>
    </div>
    <div>
      <h2>Step 2</h2>
      <NuxtImg
        style="height: 100px; width: 100%; object-fit: cover; border-radius: 15px; margin-top: 1em;"
        src="/catbirchdark.webp"
        alt="Example"
      />
      <p>Custom step content!</p>
    </div>
    <div>
      <h2>How about an input?</h2>
      <UInput
        v-model="name"
        class="mt-2 px-3 py-2 border border-muted rounded-md w-full"
        placeholder="Your name?"
      />
    </div>
    <div>
      <h2>Final Step</h2>
      <p>You made it!</p>
    </div>
  </MStepper>
</template>
