<template>
  <div id="main-content-fram3works">
    <div class="container">
      <router-view />
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomePage'
};
</script>

<style scoped>
.container {
  height: 100vh;
  width: 100%;
  background: linear-gradient(
    to bottom,
    rgba(65, 66, 65, 0.8),
    rgba(46, 50, 52, 0.85),
    rgba(39, 44, 47, 0.9)
  );
}
</style>
