<script>
import AppInput from "./AppInput.vue"

export default {
  components: {
    AppInput,
  },
  props: {
    round: Number,
    disabled: Boolean,
  },
  emits: ["start", "set-level"],
}
</script>

<template>
  <div class="info">
    <button @click="$emit('start')" :disabled="disabled" class="start_btn">
      start game
    </button>
    <span>ROUND: {{ round }}</span>
    <div class="levels">
      <label class="label">
        <span>Junior</span>
        <AppInput
          @set-level="$emit('set-level', 'easy')"
          :disabled="disabled"
          :checked="true"
        />
      </label>
      <label class="label">
        <span>Middle</span>
        <AppInput
          @set-level="$emit('set-level', 'middle')"
          :disabled="disabled"
          :checked="false"
        />
      </label>
      <label class="label">
        <span>Senior</span>
        <AppInput
          @set-level="$emit('set-level', 'hard')"
          :disabled="disabled"
          :checked="false"
        />
      </label>
    </div>
  </div>
</template>

<style scoped>
.info {
  display: flex;
  justify-content: space-between;
  align-items: center;

  color: white;
  font-weight: 600;
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
</style>
