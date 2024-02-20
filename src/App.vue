<script>
import sound_1 from "./assets/sounds/1.mp3"
import sound_2 from "./assets/sounds/2.mp3"
import sound_3 from "./assets/sounds/3.mp3"
import sound_4 from "./assets/sounds/4.mp3"

import { getRandomNum } from "./utils/helpers.js"

import AppButton from "./components/AppButton.vue"
import AppInfo from "./components/AppInfo.vue"
import AppInput from "./components/AppInput.vue"

export default {
  components: { AppButton, AppInput, AppInfo },
  data() {
    return {
      round: 0,
      gameArray: [],
      userArray: [],
      currentBtn: null,
      level: "easy",
      isLoser: false,
      isDisable: false,
    }
  },
  computed: {
    timeout() {
      if (this.level === "easy") return 1500
      if (this.level === "middle") return 1000
      if (this.level === "hard") return 400
    },
  },
  methods: {
    reset() {
      this.gameArray = []
      this.userArray = []
      this.round = 0
      this.isLoser = false
    },
    setCurrentBtn(num) {
      this.currentBtn = num
    },
    startGame() {
      if (this.isLoser) {
        this.reset()
      }
      this.isDisable = true

      this.gameArray.push(getRandomNum())

      const copy = [...this.gameArray]

      const timer = setInterval(() => {
        this.highlightBtn(copy.shift())

        if (copy.length === 0) {
          clearInterval(timer)

          setTimeout(() => {
            this.currentBtn = null
            this.isDisable = false
          }, this.timeout)
        }
      }, this.timeout)
    },
    addAnswer(num) {
      const gameArrayLength = this.gameArray.length

      if (gameArrayLength < 1 || this.isLoser) return null

      this.userArray.push(num)

      const userArrayLength = this.userArray.length

      if (
        [...this.gameArray].slice(0, userArrayLength).toString() !==
        this.userArray.toString()
      ) {
        this.isLoser = true
        return null
      }

      if (userArrayLength === gameArrayLength) {
        this.round += 1
        this.userArray = []
        this.isDisable = true
        setTimeout(() => {
          this.startGame()
        }, 1500 - this.timeout)
      }
    },
    setLevel(level) {
      this.level = level
      this.reset()
    },
    handleBtnClick(num) {
      this.highlightBtn(num)
      this.addAnswer(num)
    },
    highlightBtn(num) {
      if (num === 1) {
        const audio = new Audio(sound_1)
        audio.play()
      }
      if (num === 2) {
        const audio = new Audio(sound_2)
        audio.play()
      }
      if (num === 3) {
        const audio = new Audio(sound_3)
        audio.play()
      }
      if (num === 4) {
        const audio = new Audio(sound_4)
        audio.play()
      }
      this.currentBtn = num
      setTimeout(() => (this.currentBtn = null), 200)
    },
  },
}
</script>

<template>
  <div class="container">
    <div class="game_wrapper">
      <div class="row">
        <AppButton
          @click="handleBtnClick(1)"
          :btnNum="1"
          :currentBtn="currentBtn"
          :disabled="isDisable"
        />
        <AppButton
          @click="handleBtnClick(2)"
          :btnNum="2"
          :currentBtn="currentBtn"
          :disabled="isDisable"
        />
      </div>
      <AppInfo
        @start="startGame()"
        @set-level="(level) => setLevel(level)"
        :round="round"
        :disabled="isDisable"
      />
      <div class="row">
        <AppButton
          @click="handleBtnClick(3)"
          :btnNum="3"
          :currentBtn="currentBtn"
          :disabled="isDisable"
        />
        <AppButton
          @click="handleBtnClick(4)"
          :btnNum="4"
          :disabled="isDisable"
          :currentBtn="currentBtn"
        />
      </div>
      <div class="lose_status" v-if="isLoser">
        You lose at round {{ round }}
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  height: 100vh;

  background-color: #e5e7eb;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.game_wrapper {
  position: relative;
  width: 500px;
  height: 500px;
  padding: 50px;

  background-color: #737373;
  border-radius: 100%;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.row {
  display: flex;
  justify-content: space-between;
}

.lose_status {
  position: absolute;
  left: 0;
  top: 105%;

  width: 100%;

  font-size: 1.6rem;
  text-align: center;
}
</style>
