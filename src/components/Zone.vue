<template>
  <div
    class="zone"
    :style="{
      top: `${zone.topLeftY}px`,
      left: `${zone.topLeftX}px`,
      width: `${zone.width}px`,
      height: `${zone.height}px`,
    }"
    @drop.prevent="drop"
    @dragover.prevent
  >
    <h1 class="center"></h1>
  </div>
</template>

<script>
export default {
  props: ['zone'],
  methods: {
    drop(e) {
      const cardId = e.dataTransfer.getData('card_id');
      const card = document.getElementById(cardId);
      e.target.appendChild(card);
    },
  },
};
</script>
