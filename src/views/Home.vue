<template>
    <div>
        <h5 v-for="post in posts" :key="post.path">
            <router-link :to="{ name: 'detail', params: { id: encodeURIComponent(post._id) }}">
                {{ post.title }}
            </router-link>
        </h5>
        <router-link :to="{name: 'write'}">
          write
        </router-link>
    </div>
</template>

<script>
import { getPostList } from '../api';

export default {
  computed: {
    posts() {
      return this.$store.state.posts;
    }
  },
  asyncData({ store }) {
    return store.dispatch('FETCH_POST_LIST');
  }
};
</script>
<style lang="stylus">
a
  text-decoration none
</style>