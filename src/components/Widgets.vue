<template>
  <div id="widgets">
    <div class="column">
      <div class="header">
        <h1>widgets</h1>
      </div>
      <div class="widget-list row wrap">
        <div class="widget">
          <Drag>
            <Footer mode="preview" />
          </Drag>
        </div>
        <div class="widget">
          <Drag>
            <Header mode="preview" />
          </Drag>
        </div>
        <div class="widget">
          <Drag>
            <Capacity mode="preview" />
          </Drag>
        </div>
        <div class="widget">
          <Drag>
            <Flow mode="preview" />
          </Drag>
        </div>
        <div class="widget">
          <Drag>
            <Opening mode="preview" />
          </Drag>
        </div>
        <div class="widget">
          <Drag>
            <Closed mode="preview" />
          </Drag>
        </div>
        <div class="widget">
          <Drag>
            <Open mode="preview" />
          </Drag>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Drag from './Drag.vue';

export default {
  data() {
    return {};
  },
  components: { Drag },
};
</script>

<style scoped>
#widgets {
  border: 1px solid black;
  margin-left: 50px;
  width: 350px;
}

.header {
  background-color: gray;
  text-align: center;
}

.wrap {
  flex-wrap: wrap;
}

.widget {
  width: 150px;
  height: 150px;
  margin-top: 15px;
}

.widget-list {
  justify-content: space-evenly;
}

h1 {
  text-align: center;
}
</style>
