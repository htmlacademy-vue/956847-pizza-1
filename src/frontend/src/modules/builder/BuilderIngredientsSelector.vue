<template>
  <li @dragstart="onDragstart">
    <SelectorItem
      class="filling type-of-transfer"
      :dinamickClass="`filling--${ingredientNamesId}`"
      v-text="item.name"
      draggable="true"
    ></SelectorItem>
    <ItemCounter
      @valueChanged="selectedIngredientAmount"
      @addCounterVal="addCounterVal"
      @deductCounterVal="deductCounterVal"
      v-model="counterVal"
    ></ItemCounter>
  </li>
</template>

<script>
import { EventBus } from "../../eventBus.js";
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
      counterVal: 0,
    };
  },

  methods: {
    addCounterVal() {
      this.counterVal++;
      this.selectedIngredientAmount();
    },

    deductCounterVal() {
      this.counterVal--;
      this.selectedIngredientAmount();
    },

    onDragstart() {
      EventBus.$emit("onDragstart", [this.ingredientNamesId, this.item.price]);
    },

    selectedIngredientAmount() {
      this.$emit("selectedIngredientAmount", [this.counterVal, this.item.id]);
    },
  },

  created() {
    EventBus.$on("dropOn", (data) => {
      if (data[0] === this.ingredientNamesId) {
        this.addCounterVal();
      }
    });
  },
};
</script>

<style lang="scss" scoped>
.type-of-transfer {
  cursor: grab;

  &:active {
    cursor: grabbing;
  }
}
</style>
