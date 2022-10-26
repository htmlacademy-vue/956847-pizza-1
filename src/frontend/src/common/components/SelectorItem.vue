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
    },
  },
};
</script>

<style scoped></style>
