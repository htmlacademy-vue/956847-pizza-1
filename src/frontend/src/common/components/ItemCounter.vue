<template>
  <div class="counter counter--orange ingredients__counter" ref="test">
    <button
      type="button"
      class="counter__button counter__button--minus"
      :disabled="counterVal < 1"
      @click="$emit('deductCounterVal')"
    >
      <span class="visually-hidden">Меньше</span>
    </button>
    <input
      placeholder="0"
      type="number"
      name="counter"
      class="counter__input"
      :value="counterVal"
      @input="$emit('valueChanged', $event.target.value)"
    />
    <button
      ййй
      type="button"
      class="counter__button counter__button--plus"
      @click="$emit('addCounterVal')"
    >
      <span class="visually-hidden">Больше</span>
    </button>
  </div>
</template>

<script>
export default {
  name: "ItemCounter",

  model: {
    prop: "counterVal",
    event: "valueChanged",
  },

  props: {
    counterVal: {
      type: [String, Number],
      required: true,
    },
  },
};
</script>

<style scoped>
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
}
input[type="number"] {
  -moz-appearance: textfield;
}
</style>
