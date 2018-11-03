<template>
  <div class="post">
    <h1>{{ title }}</h1>
    <div v-html="content">
    </div>
  </div>
</template>

<script>
import showdown from 'showdown';
const converter = new showdown.Converter();
export default {
  computed: {
    title() {
      return this.$store.state.currentPost ? this.$store.state.currentPost.title : ''
    },
    content() {
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
.post
  width 1080px
  margin auto
</style>

