<template>
  <body class="app-layout">
    <HeaderLayout></HeaderLayout>
    <main class="content">
      <index></index>
    </main>
  </body>
</template>

<script>
import HeaderLayout from "./HeaderLayout";
import Index from "@/views/Index";

export default {
  components: {
    HeaderLayout,
    Index,
  },

  name: "AppLayout",
};
</script>
