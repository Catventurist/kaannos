<script setup lang="ts">
type Player = 'X' | 'O' | ''

const currentPlayer = ref<Player>('X')
const board = ref<string[]>(Array(9).fill(''))
const gameActive = ref<boolean>(true)
const status = ref<string>(`Current turn: ${currentPlayer.value}`)

const winningConditions: number[][] = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
]

function handleClick(index: number): void {
  if (gameActive.value && board.value[index] === '') {
    board.value[index] = currentPlayer.value
    checkWinner()
    if (gameActive.value) {
      togglePlayer()
      status.value = `Current turn: ${currentPlayer.value}`
    }
  }
}

function checkWinner(): void {
  for (const [a, b, c] of winningConditions) {
    if (
      board.value[Number(a)]
      && board.value[Number(a)] === board.value[Number(b)]
      && board.value[Number(a)] === board.value[Number(c)]
    ) {
      gameActive.value = false
      status.value = `${board.value[Number(a)]} wins!`
      return
    }
  }
  if (!board.value.includes('')) {
    gameActive.value = false
    status.value = `It is a draw!`
  }
}

function togglePlayer(): void {
  currentPlayer.value = currentPlayer.value === 'X' ? 'O' : 'X'
}

function restartGame(): void {
  currentPlayer.value = 'X'
  board.value = Array(9).fill('')
  gameActive.value = true
  status.value = `Current turn: ${currentPlayer.value}`
}
</script>

<template>
  <div class="flex flex-col justify-center items-center gap-4">
    <div class="mb-[8px]">
      {{ status }}
    </div>
    <div class="grid grid-cols-3 gap-4 text-center border border-muted rounded-md">
      <button
        v-for="(cell, index) in board"
        :key="index"
        class="square size-10 border border-primary/20"
        @click="handleClick(index)"
      >
        {{ cell }}
      </button>
    </div>
    <button
      class="py-2 px-4 rounded-md hover:bg-primary/20 focus:outline-none focus:ring-2 focus:ring-info focus:ring-offset-2 transition duration-300 ease-in-out transform hover:scale-105"
      @click="restartGame"
    >
      Restart
    </button>
  </div>
</template>
