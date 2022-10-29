<template>
  <label>
    <RadioButton
      v-model="saucesType"
      name="sauce"
      :value="sauce.name"
      @change="selectedSauce"
    >
    </RadioButton>
    <selector-item v-text="sauce.name"></selector-item>
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

  name: "BuilderSauceSelector",

  props: {
    sauce: {
      type: Object,
      required: true,
    },
  },

  data() {
    return {
      saucesType: pizza.sauces[0].name,
    };
  },

  methods: {
    selectedSauce() {
      this.$emit("selectedSauce", {
        prise: this.sauce.price,
        saucesType: this.saucesType,
      });
    },
  },
};
</script>

<style scoped></style>
