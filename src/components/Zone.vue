<template>
  <div
    class="zone"
    :style="{
      position: 'absolute',
      top: `${zone.topLeftY}px`,
      left: `${zone.topLeftX}px`,
      width: `${zone.width}px`,
      height: `${zone.height}px`,
    }"
    @drop.prevent="drop"
    @dragover.prevent
  >
    <Default v-if="widget === 'Default'" :zone="zone.zone" />
    <Drag :onDrag="setDefault" v-else>
      <component :is="widget" :zone="zone.zone" />
    </Drag>
  </div>
</template>

<script>
import Drag from './Drag.vue';

export default {
  data() {
    return {
      widget: 'Default',
    };
  },
  props: ['zone'],
  methods: {
    drop(e) {
      const cardId = e.dataTransfer.getData('widget_id');
      this.widget = cardId;
    },
    setDefault() {
      setTimeout(() => {
        this.widget = 'Default';
      }, 0);
    },
  },
  components: { Drag },
};
</script>
