<template>
  <label>
    <RadioButton
      v-model="doughType"
      name="dought"
      :value="item.name"
      @change="selectedDoughPrice"
    >
    </RadioButton>
    <b>{{ item.name }}</b>
    <selector-item v-text="item.description"></selector-item>
  </label>
</template>

<script>
import pizza from "@/static/pizza.json";
import RadioButton from "@/common/components/RadioButton";
import SelectorItem from "@/common/components/SelectorItem";

export default {
  components: {
    RadioButton,
    SelectorItem,
  },

  name: "BuilderDoughSelector",

  props: {
    item: {
      type: Object,
      required: true,
    },
  },

  data() {
    return {
      doughType: pizza.dough[1].name,
    };
  },

  methods: {
    selectedDoughPrice() {
      this.$emit("selectedDoughPrice", {
        prise: this.item.price,
        doughType: this.doughType,
      });
    },
  },
};
</script>

<style scoped></style>
