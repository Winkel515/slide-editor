<template>
  <div id="template">
    <Zone v-for="zone in template.zones" :key="zone.zone" :zone="zone"> </Zone>
  </div>
</template>

<script>
import template from '../templates/template.json';
import Zone from './Zone.vue';

export default {
  data() {
    return {
      template,
    };
  },
  components: {
    Zone,
  },
};
</script>

<style scoped>
#template {
  width: 1920px;
  height: 1080px;
  background-color: gray;
}
</style>
