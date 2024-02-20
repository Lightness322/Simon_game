<script>
export default {
  props: { disabled: Boolean, checked: Boolean },
  emits: ["set-level"],
}
</script>

<template>
  <input
    @input="$emit('set-level')"
    :disabled="disabled"
    :checked="checked"
    name="level"
    type="radio"
  />
</template>

<style></style>
