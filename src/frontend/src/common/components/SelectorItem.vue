<template>
  <span :class="dinamickClass"></span>
</template>

<script>
export default {
  name: "SelectorItem",

  props: {
    dinamickClass: {
      type: [String],
      default: "",
      required: true,
    },
  },
};
</script>

<style scoped></style>
