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
// import Flow from '../widgets/Flow.vue';

export default {
  data() {
    return {};
  },
  components: {
    Template,
    Widgets,
    // Flow,
  },
};
</script>

<style>
#slide-editor {
  zoom: 0.6;
}
</style>
