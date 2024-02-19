<script>
import { getRandomNum } from "./utils/helpers.js"
import sound_1 from "./assets/sounds/1.mp3"
import sound_2 from "./assets/sounds/2.mp3"
import sound_3 from "./assets/sounds/3.mp3"
import sound_4 from "./assets/sounds/4.mp3"

export default {
  data() {
    return {
      round: 0,
      currentBtn: null,
      gameArray: [],
      isDisable: false,
      userArray: [],
      isLoser: false,
      level: "easy",
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
      this.userArray.push(num)
      const userArrayLength = this.userArray.length
      const gameArrayLength = this.gameArray.length

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
        <button
          :disabled="isDisable"
          class="btn btn-1"
          :class="{ highlight: currentBtn === 1 }"
          @click="
            () => {
              highlightBtn(1)
              addAnswer(1)
            }
          "
        ></button>
        <button
          :disabled="isDisable"
          class="btn btn-2"
          :class="{ highlight: currentBtn === 2 }"
          @click="
            () => {
              highlightBtn(2)
              addAnswer(2)
            }
          "
        ></button>
      </div>
      <div class="info">
        <button class="start_btn" :disabled="isDisable" @click="startGame()">
          start game
        </button>
        <span>ROUND: {{ round }}</span>
        <div class="levels">
          <label class="label">
            <span>Junior</span>
            <input
              @input="setLevel('easy')"
              name="level"
              type="radio"
              value="easy"
              checked
            />
          </label>
          <label class="label">
            <span>Middle</span>
            <input
              @input="setLevel('middle')"
              name="level"
              type="radio"
              value="middle"
            />
          </label>
          <label class="label">
            <span>Senior</span>
            <input
              @input="setLevel('hard')"
              name="level"
              type="radio"
              value="hard"
            />
          </label>
        </div>
      </div>
      <div class="row">
        <button
          :disabled="isDisable"
          class="btn btn-3"
          :class="{ highlight: currentBtn === 3 }"
          @click="
            () => {
              highlightBtn(3)
              addAnswer(3)
            }
          "
        ></button>
        <button
          :disabled="isDisable"
          class="btn btn-4"
          :class="{ highlight: currentBtn === 4 }"
          @click="
            () => {
              highlightBtn(4)
              addAnswer(4)
            }
          "
        ></button>
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
  background-color: #737373;
  border-radius: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 50px;
}

.row {
  display: flex;
  justify-content: space-between;
}

.info {
  color: white;
  font-weight: 600;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.start_btn {
  padding: 4px;
  border-radius: 5px;
  cursor: pointer;
}

.levels {
  display: flex;
  gap: 10px;
}
.label {
  display: flex;
  gap: 2px;
}

.btn {
  width: 180px;
  height: 180px;
  cursor: pointer;
}

.btn-1 {
  border-radius: 100% 10px 10px 10px;
  background: #991b1b;
}

.btn-2 {
  border-radius: 10px 100% 10px 10px;
  background: #eab308;
}

.btn-3 {
  border-radius: 10px 10px 10px 100%;
  background: #166534;
}

.btn-4 {
  border-radius: 10px 10px 100% 10px;
  background: #1e40af;
}

.highlight {
  filter: brightness(150%);
}
.lose_status {
  font-size: 1.6rem;
  left: 0;
  position: absolute;
  top: 105%;
  width: 100%;
  text-align: center;
}
</style>
