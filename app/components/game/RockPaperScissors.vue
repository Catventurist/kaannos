<script setup lang="ts">
type Choice = '🪨' | '📃' | '✂️'

const playerScore = ref<number>(0)
const computerScore = ref<number>(0)

const playerChoiceDisplay = ref<string>('')
const computerChoiceDisplay = ref<string>('')

const resultText = ref<string>('')

const choices: Choice[] = ['🪨', '📃', '✂️']

function capitalize(word: string): string {
  return word.charAt(0).toUpperCase() + word.slice(1)
}

function playRound(playerChoice: Choice, computerChoice: Choice): string {
  if (playerChoice === computerChoice) {
    return '🤝 It is a tie!'
  } else if (
    (playerChoice === '🪨' && computerChoice === '✂️')
    || (playerChoice === '📃' && computerChoice === '🪨')
    || (playerChoice === '✂️' && computerChoice === '📃')
  ) {
    playerScore.value++
    return '🟢 You win!'
  } else {
    computerScore.value++
    return '🔴Computer wins!'
  }
}

function handleClick(playerChoice: Choice): void {
  const computerChoice = choices[Math.floor(Math.random() * choices.length)]

  playerChoiceDisplay.value = capitalize(playerChoice)
  computerChoiceDisplay.value = capitalize(computerChoice as Choice)

  resultText.value = playRound(playerChoice, computerChoice as Choice)
}
</script>

<template>
  <div class="p-4 flex flex-row border-muted text-center justify-around">
    <div class="gap-4">
      <div>
        🧍:
        <span id="playerScore">
          {{ playerScore }}
        </span>
      </div>
      <div>
        🖥️:
        <span id="computerScore">
          {{ computerScore }}
        </span>
      </div>
    </div>

    <div class="choices">
      <div class="labels">
        You:
        <span id="playerChoice">
          {{ playerChoiceDisplay }}
        </span>
      </div>
      <div class="labels">
        Computer:
        <span id="computerChoice">
          {{ computerChoiceDisplay }}
        </span>
      </div>
    </div>

    <div class="buttons">
      <button
        v-for="choice in choices"
        :id="choice"
        :key="choice"
        class="btn text-4xl"
        @click="handleClick(choice)"
      >
        {{ choice.charAt(0).toUpperCase() + choice.slice(1) }}
      </button>
    </div>

    <div id="result" class="result mt-4 w-1/4">
      {{ resultText }}
    </div>
  </div>
</template>

<style scoped>
.rps-game {
  display: inline-block;
  padding: 12px;
}
.scores {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
  margin-bottom: 8px;
}
.choices .labels {
  margin-bottom: 6px;
}
.buttons {
  display: flex;
  gap: 8px;
  margin: 8px 0;
}
.btn {
  padding: 8px 12px;
  cursor: pointer;
}
.result {
  font-weight: bold;
  margin-top: 6px;
}
</style>
