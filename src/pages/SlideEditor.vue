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
/* eslint-disable */
import Template from '../components/Template.vue';
import Widgets from '../components/Widgets.vue';
import Opening from '../widgets/Opening.vue';

export default {
  components: {
    Template,
    Widgets,
    Opening,
  },
};
</script>

<style>
#slide-editor {
  zoom: 0.6;
}
</style>
