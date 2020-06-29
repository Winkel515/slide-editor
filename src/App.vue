<template>
  <div id="app">
    <SlideEditor></SlideEditor>
  </div>
</template>

<script>
import SlideEditor from './pages/SlideEditor.vue';

export default {
  name: 'App',
  components: {
    SlideEditor,
  },
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.center {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.column {
  display: flex;
  flex-direction: column;
}

.row {
  display: flex;
  flex-direction: row;
}
</style>
