<template>
    <div>
        <h5 v-for="post in posts" :key="post.path">
            <router-link :to="`/detail/${encodeURIComponent(post.path)}`">
                {{ post.title }}
            </router-link>
        </h5>
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
