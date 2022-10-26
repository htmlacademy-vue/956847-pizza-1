<template>
  <div
    class="pizza"
    :class="`pizza--foundation--${doughCssClass}-${sauceCssClass}`"
  >
    <div
      class="pizza__wrapper"
      @drop="dropOn"
      @dragover.prevent
      @dragenter.prevent
    >
      <div
        v-for="(picture, i) of ingredientsImages"
        :key="i"
        class="pizza__filling"
        :class="`pizza__filling--${picture}`"
      ></div>
    </div>
  </div>
</template>

<script>
import { EventBus } from "../../eventBus.js";

export default {
  name: "BuilderPizzaView",

  props: {
    ingredientsImages: {
      type: Array,
    },
    doughCssClass: {
      type: String,
      required: true,
    },
    sauceCssClass: {
      type: String,
      required: true,
    },
  },

  data() {
    return {
      value: "",
    };
  },

  methods: {
    dropOn() {
      EventBus.$emit("dropOn", this.value);
    },
  },

  created() {
    EventBus.$on("onDragstart", (data) => {
      this.value = data;
    });
  },
};
</script>

<style scoped></style>
