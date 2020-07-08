<template>
  <div id="Opening">
    <template v-if="mode !== 'preview'">
      <h1 id="title">{{ opening_en.business_hours }}</h1>
      <div id="availabilities">
        <div id="label_list">
          <div
            v-for="op in opening_hours.availabilities"
            :key="op.label"
            class="label"
          >
            {{ opening_en[op.label] || op.label }}
          </div>
        </div>
        <div id="time_list">
          <div
            v-for="op in opening_hours.availabilities"
            :key="op.label"
            class="time"
          >
            <div v-if="op.closed" class="closed hours block">
              {{ opening_en.closed }}
            </div>
            <template v-else>
              <div class="block time_block">
                {{ convertTime(op.from1).hour }}:{{ convertTime(op.from1).min }}
              </div>
              <span class="between">-</span>
              <div class="block time_block">
                {{ convertTime(op.to1).hour }}:{{ convertTime(op.to1).min }}
              </div>
              <span class="between" :class="{ hide: op.from2 === null }"
                >&amp;</span
              >
              <div
                class="block time_block"
                :class="{ hide: op.from2 === null }"
              >
                {{ convertTime(op.from2).hour }}:{{ convertTime(op.from2).min }}
              </div>
              <span class="between" :class="{ hide: op.from2 === null }"
                >-</span
              >
              <div
                class="block time_block"
                :class="{ hide: op.from2 === null }"
              >
                {{ convertTime(op.to2).hour }}:{{ convertTime(op.to2).min }}
              </div>
            </template>
          </div>
        </div>
      </div>
    </template>
    <div class="center-children" v-else>
      <h1>Opening</h1>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import en from '../i18n/en.json';
import opening_hours from '../opening/opening.json';

export default {
  props: {
    mode: String,
  },
  data() {
    return {
      opening_en: en.opening,
      opening_hours,
    };
  },
  methods: {
    convertTime(seconds) {
      let hour = Math.floor(seconds / 60 / 60);
      let min = Math.floor((seconds % (60 * 60)) / 60);
      if (min < 10) min = '0' + min;
      return {
        hour,
        min,
      };
    },
  },
};
</script>

<style scoped>
#Opening {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  background-color: red;
  font-family: Arial, Helvetica, sans-serif;
  color: white;
}

#label_list {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: space-between;
}

#time_list {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex: 1;
  margin-left: 20px;
}

#availabilities {
  display: flex;
  padding: 0 20px;
  height: 100%;
}

.block {
  background-color: white;
  color: black;
  text-align: center;
  padding: 6px;
  font-weight: bold;
  font-size: 1.5rem;
}

.label {
  flex: 1;
  font-weight: bold;
  font-size: 1.5rem;
  padding: 5px;
}

.time_block {
  display: inline-block;
  width: 22.75%;
}

.time {
  flex: 1;
}

.between {
  display: inline-block;
  width: 3%;
  text-align: center;
  font-size: 1.5rem;
}

.hide {
  visibility: hidden;
}

#title {
  text-align: center;
  font-size: 3.5rem;
  margin: 20px 0;
}
</style>
