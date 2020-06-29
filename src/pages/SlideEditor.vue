<template>
  <div id="slide-editor">
    <div class="row">
      <div id="slide-content">
        <Template></Template>
      </div>
      <Widgets></Widgets>
    </div>
  </div>
</template>

<script>
import Template from '../components/Template.vue';
import Widgets from '../components/Widgets.vue';

export default {
  data() {
    return {};
  },
  components: { Template, Widgets },
};
</script>

<style>
#slide-editor {
  zoom: 0.6;
}
</style>
