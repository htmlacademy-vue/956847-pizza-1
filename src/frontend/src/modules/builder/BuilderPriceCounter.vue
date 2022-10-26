<template>
  <p>Итого: ₽ {{ totalIngredientsPrise }}</p>
</template>

<script>
export default {
  name: "BuilderPriceCounter",

  props: {
    totalIngredientsPrise: {
      type: Number,
      required: true,
    },
  },
};
</script>

<style scoped></style>
