<template>
    <div>
        <router-link class="write-link" v-if="isLogin"  :to="{name: 'new'}">
          write
        </router-link>
        <div class="list-section">
          <h5 v-for="post in posts" :key="post.path" class="post">
              <router-link :to="{ name: 'detail', params: { id: encodeURIComponent(post._id) }}">
                  {{ post.title }}
              </router-link>
              <span class="post-time">{{ post.createTime | formatTime }}</span>
              <span v-if="isLogin" class="post-action">
                <button @click="editPost(post._id)">edit</button>
                <button @click="deletePost(post._id)">delete</button>
              </span>
          </h5>
        </div>
    </div>
</template>

<script>
import format from 'date-fns/format';
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
  filters: {
    formatTime(time) {
      return format(new Date(time), 'YYYY/MM/DD')
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
.write-link
  text-align right
  display block
.list-section
  margin auto
  width 1080px
a
  text-decoration none
.post
  height 2em
  display flex
  align-items center
  justify-content space-between
  position relative
  padding-right 16em
.post:hover>.post-action
  display inline
.post-action
  position absolute
  right 0
  display none
  margin-left 1em
  button 
    margin-left .5em
</style>