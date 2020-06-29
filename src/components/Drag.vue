<template>
  <div
    :id="id"
    :draggable="true"
    @dragstart="dragStart"
    @dragover.stop
    class="widget"
  >
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: ['id'],
  methods: {
    dragStart(e) {
      const { target } = e;
      e.dataTransfer.setData('card_id', target.id);
    },
  },
};
</script>
