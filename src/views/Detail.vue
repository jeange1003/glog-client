<template>
    <div v-html="post" class="content">
    </div>
</template>

<script>
import showdown from 'showdown';
const converter = new showdown.Converter();
export default {
  computed: {
    post() {
      const postContent = this.$store.state.currentPost;
      if (postContent) {
        return converter.makeHtml(postContent.content);
      }
      return '';
    }
  },
  asyncData({ store, route }) {
    return store.dispatch('FETCH_POST', route.params.id);
  }
};
</script>
<style lang="stylus" scoped>
.content
  width 1080px
  margin auto
</style>

