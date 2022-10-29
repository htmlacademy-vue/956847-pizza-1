<template>
  <label>
    <RadioButton
      v-model="sizesType"
      name="diameter"
      :value="sizesName"
      @change="selectedSiseMultiplier"
    />
    <selector-item v-text="size.name"></selector-item>
  </label>
</template>

<script>
import RadioButton from "@/common/components/RadioButton";
import SelectorItem from "@/common/components/SelectorItem";

export default {
  components: {
    RadioButton,
    SelectorItem,
  },

  name: "BuilderSizeSelector",

  props: {
    size: {
      type: Object,
      required: true,
    },
    sizesName: {
      type: String,
      required: true,
    },
  },

  data() {
    return {
      sizesType: "normal",
    };
  },

  methods: {
    selectedSiseMultiplier() {
      this.$emit("selectedSiseMultiplier", this.size.multiplier);
    },
  },
};
</script>

<style scoped></style>
