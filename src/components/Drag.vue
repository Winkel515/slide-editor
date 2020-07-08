<template>
  <div id="drag" :draggable="true" @dragstart="dragStart" class="widget">
    <slot></slot>
  </div>
</template>

<script>
// Direct child of Drag must have an ID matching the component name
export default {
  props: {
    id: String,
    onDrag: Function,
  },
  methods: {
    dragStart(e) {
      const { target } = e;
      e.dataTransfer.setData('widget_id', target.children[0].id);
      if (this.onDrag) this.onDrag();
    },
  },
};
</script>

<style scoped>
#drag {
  height: 100%;
  width: 100%;
}
</style>
