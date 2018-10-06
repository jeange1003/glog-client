<template>
    <div>
        <router-link class="write" v-if="isLogin"  :to="{name: 'new'}">
          write
        </router-link>
        <h5 v-for="post in posts" :key="post.path" class="post">
            <router-link :to="{ name: 'detail', params: { id: encodeURIComponent(post._id) }}">
                {{ post.title }}
            </router-link>
            <span v-if="isLogin" class="post-action">
              <button @click="editPost(post._id)">edit</button>
              <button @click="deletePost(post._id)">delete</button>
            </span>
        </h5>
    </div>
</template>

<script>
import { deletePost } from '../api';
import User from '../util/user.js';

export default {
  data() {
    return {
      isLogin: false,
      hoverId: ''
    };
  },
  computed: {
    posts() {
      return this.$store.state.posts;
    }
  },
  methods: {
    deletePost(id) {
      deletePost({ id }).then(() => this.$store.dispatch('FETCH_POST_LIST'));
    },
    editPost(id) {
      this.$router.push({
        name: 'write',
        params: {
          id
        }
      });
    }
  },
  asyncData({ store }) {
    return store.dispatch('FETCH_POST_LIST');
  },
  mounted() {
    this.isLogin = User.isLogin();
  }
};
</script>
<style lang="stylus" scoped>
.write
  text-align right
  display block
a
  text-decoration none
.post:hover>.post-action
  display inline
.post-action
  display none
</style>