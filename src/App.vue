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

html {
  font-size: 10px;
}

body {
  font-family: Arial, Helvetica, sans-serif;
}

.center {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.center-children {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
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
