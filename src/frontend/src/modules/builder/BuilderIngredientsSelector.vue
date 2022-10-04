<template>
  <li>
    <SelectorItem
      class="filling"
      :dinamickClass="ingredientNamesId"
      v-text="item.name"
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
    item: {
      type: Object,
      required: true,
    },

    ingredientNamesId: {
      type: [String],
      required: true,
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

    selectedIngredientAmount() {
      this.$emit("selectedIngredientAmount", [this.value, this.item.id]);
    },

    dataToNextComponent(val) {
      this.valueChanged(val);
      this.selectedIngredientAmount();
    },
  },
};
</script>

<style scoped></style>
