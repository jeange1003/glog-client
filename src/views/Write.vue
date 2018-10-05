<template>
  <div class="write">
    <label>标题：</label>
    <input class="title-input" type="text" v-model="title" />
    <div class="tool">
      <input type="file" @change="fileChangeHandler" />
    </div>
    <div class="content">
      <label>内容：</label>
      <textarea v-model="content" rows="50"></textarea>
      <label>预览：</label>
      <div class="preview" v-html="previewContent"></div>
    </div>
    <button @click="save">保存</button>
  </div>
</template>

<script>
import showdown from 'showdown';
import User from '../util/user.js';
import { upload } from '../api/index.js'

const converter = new showdown.Converter();
export default {
  data() {
    return {
      title: '',
      content: '',
      id: ''
    };
  },
  computed: {
    previewContent() {
      return converter.makeHtml(this.content);
    }
  },
  methods: {
    save() {
      if (this.id) {
        this.$store.dispatch('UPDATE_POST', {
          id: this.id,
          title: this.title,
          content: this.content
        });
      } else {
        this.$store
          .dispatch('CREATE_POST', { title: this.title, content: this.content })
          .then(() => {
            this.$router.push({ name: 'home' });
          });
      }
    },
    fileChangeHandler(e) {
      const files = e.target.files
      if (files && files.length > 0) {
        const file = files[0]
        upload({file}).then(url => {
          console.log('url', url)
          this.content += `![](${url})`
        })
      }
    }
  },
  asyncData({ store, route }) {
    if (route.params.id) {
      return store.dispatch('FETCH_POST', route.params.id);
    }
  },
  created() {
    const currentPost = this.$store.state.currentPost;
    if (currentPost) {
      this.id = currentPost._id;
      this.title = currentPost.title;
      this.content = currentPost.content;
    }
  }
};
</script>

<style lang="stylus" scoped>
.write
  display flex
  flex-direction column
  width 1024px
  margin auto
  .content
    margin-top 2em
    display flex
    > label
      width 4em
    textarea, .preview
      width 40%
      border 1px solid #DDD
      border 1px solid #DDD
</style>
