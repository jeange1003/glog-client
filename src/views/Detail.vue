<template>
    <div v-html="post">
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
