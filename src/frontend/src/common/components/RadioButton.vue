<template>
  <input
    class="visually-hidden"
    type="radio"
    :value="value"
    :name="name"
    :checked="isChecked"
    @change="$emit('change', $event.target.value)"
  />
</template>

<script>
export default {
  name: "RadioButton",
  model: {
    prop: "modelValue",
    event: "change",
  },

  props: {
    value: {
      type: [String, Number],
      required: true,
    },
    modelValue: {
      type: [String, Number],
      default: "",
    },
    name: {
      type: [String, Number],
      default: "",
      required: true,
    },
  },

  computed: {
    isChecked() {
      return this.modelValue === this.value;
    },
  },
};
</script>
