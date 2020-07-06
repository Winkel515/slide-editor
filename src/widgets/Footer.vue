<template>
  <div id="Footer" class="tile">
    <img :draggable="false" src="../assets/seetrus-logo.svg" />
    <div v-if="mode !== 'preview'">
      <p>
        <span id="text-footer_link_prefix">{{ footer_link_prefix }}</span>
        &nbsp;
        <a href="https://seetrus.com">Seetrus.com</a>
      </p>
    </div>
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
      footer_link_prefix: en.footer_link_prefix,
    };
  },
};
</script>

<style scoped>
#Footer {
  height: 100%;
  background-color: #ffcc00;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
}

#Footer > img {
  height: 70px;
  filter: drop-shadow(2px 2px 4px rgba(0, 0, 0, 0.3));
}

#Footer > div {
  font-weight: 700;
  height: 100%;
  padding-left: 2%;
  display: flex;
  align-items: center;
  justify-content: center;
}

p,
a {
  font-size: 3.57rem;
  color: white;
  text-decoration: none;
}

.tile {
  border-radius: 20px;
  font-weight: 700;
  text-transform: uppercase;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
}

span.whitespace {
  white-space: pre;
}
</style>
