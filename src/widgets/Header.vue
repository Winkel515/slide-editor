<template>
  <div id="Header" class="tile">
    <p v-if="mode === 'preview'">Header</p>
    <span v-else :class="{ hide }" id="text-header">{{ header_text }}</span>
  </div>
</template>

<script>
import en from '../i18n/en.json';

export default {
  props: {
    mode: String,
  },
  data() {
    return {
      header_text_array: en.header_text,
      header_text_index: 0,
      hide: false,
    };
  },
  computed: {
    header_text() {
      return this.header_text_array[this.header_text_index];
    },
  },
  methods: {
    changeText() {
      this.intervalId = setInterval(() => {
        this.hide = true;
        setTimeout(() => {
          const arrayLength = this.header_text_array.length;
          this.header_text_index = (this.header_text_index + 1) % arrayLength;
          this.hide = false;
        }, 500);
      }, 5000);
    },
  },

  created() {
    if (this.mode !== 'preview') this.changeText();
  },
  destroyed() {
    clearInterval(this.intervalId);
  },
};
</script>

<style scoped>
.tile {
  border-radius: 20px;
  font-weight: 700;
  text-transform: uppercase;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
}

#Header {
  background-color: #ee1d0d;
  width: 100%;
  height: 100%;
  color: white;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
}

#Header > span {
  font-size: 4.52rem;
  opacity: 1;
  transition: opacity 500ms;
}

#Header > span.hide {
  opacity: 0;
}

#Header > span {
  margin: 0 5%;
  text-align: center;
}
</style>
