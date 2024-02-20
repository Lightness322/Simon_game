<script>
export default {
  props: {
    disabled: Boolean,
    currentBtn: [Number, Object],
    btnNum: Number,
  },
  emits: ["click"],
}
</script>

<template>
  <button
    @click="$emit('click')"
    :disabled="disabled"
    class="btn"
    :class="{
      highlight: currentBtn === btnNum,
      'btn-1': btnNum === 1,
      'btn-2': btnNum === 2,
      'btn-3': btnNum === 3,
      'btn-4': btnNum === 4,
    }"
  ></button>
</template>

<style scoped>
.btn {
  width: 180px;
  height: 180px;

  cursor: pointer;
}

.highlight {
  filter: brightness(150%);
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
</style>
