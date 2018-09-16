<template>
    <div>
        <h5 v-for="post in posts" :key="post.path" class="post">
            <router-link :to="{ name: 'detail', params: { id: encodeURIComponent(post._id) }}">
                {{ post.title }}
            </router-link>
            <button v-if="isLogin" class="post-delete" @click="deletePost(post._id)">delete</button>
        </h5>
        <router-link v-if="isLogin"  :to="{name: 'write'}">
          write
        </router-link>
    </div>
</template>

<script>
import { deletePost } from '../api';
import User from '../util/user.js'

export default {
  data() {
    return {
      isLogin: false,
      hoverId: ''
    }
  },
  computed: {
    posts() {
      return this.$store.state.posts;
    }
  },
  methods: {
    deletePost(id) {
      deletePost({id}).then(() => this.$store.dispatch('FETCH_POST_LIST'))
    }
  },
  asyncData({ store }) {
    return store.dispatch('FETCH_POST_LIST');
  },
  mounted() {
    this.isLogin = User.isLogin()
  }
};
</script>
<style lang="stylus">
a
  text-decoration none
.post:hover>.post-delete
  display inline
.post-delete
  display none
</style>