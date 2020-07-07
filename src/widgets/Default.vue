<template>
  <div id="Default">
    <h1 class="center">Zone: {{ zone }}</h1>
  </div>
</template>

<script>
export default {
  props: ['zone'],
};
</script>

<style scoped>
#Default {
  width: 100%;
  height: 100%;
  background-color: grey;
  border: 5px dotted black;
}
</style>
