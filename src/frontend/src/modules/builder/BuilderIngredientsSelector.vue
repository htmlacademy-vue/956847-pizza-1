<template>
  <li>
    <SelectorItem
      class="filling"
      :dinamickClass="ingredientNamesId"
      v-text="ingredientName"
    ></SelectorItem>
    <ItemCounter @valueChanged="dataToNextComponent"></ItemCounter>
  </li>
</template>

<script>
import ItemCounter from "@/common/components/ItemCounter";
import SelectorItem from "@/common/components/SelectorItem";

export default {
  components: {
    ItemCounter,
    SelectorItem,
  },
  name: "BuilderIngredientsSelector",

  props: {
    ingredientName: {
      type: String,
      required: true,
    },

    ingredientNamesId: {
      type: [String, Number],
      required: true,
    },

    ingredientPrice: {
      type: Number,
    },
  },

  data() {
    return {
      value: 0,
    };
  },

  methods: {
    valueChanged(counterVal) {
      this.value = counterVal;
    },

    selectedIngredientPrice() {
      let price = this.value * this.ingredientPrice;
      this.$emit("selectedIngredientPrice", price);
    },

    dataToNextComponent(val) {
      this.valueChanged(val);
      this.selectedIngredientPrice();
    },
  },
};
</script>

<style scoped></style>
