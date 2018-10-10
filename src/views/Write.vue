<template>
  <div class="write">
    <div class="title-section">
      <label>标题：</label>
      <input class="title-input" type="text" v-model="title" />
    </div>
    <div class="tool">
      <input type="file" @change="fileChangeHandler" />
    </div>
    <button @click="toggleEdit">{{ isEditing ? '预览' : '编辑' }}</button>
    <div class="content">
      <textarea v-if="isEditing" v-model="content"></textarea>
      <div v-else class="preview" v-html="previewContent"></div>
    </div>
    <button class="save-btn" @click="save">保存</button>
  </div>
</template>

<script>
import showdown from 'showdown';
import User from '../util/user.js';
import { upload } from '../api/index.js';

const converter = new showdown.Converter();
export default {
  data() {
    return {
      title: '',
      content: '',
      id: '',
      isEditing: true
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
      const files = e.target.files;
      if (files && files.length > 0) {
        const file = files[0];
        upload({ file }).then(url => {
          console.log('url', url);
          this.content += `![](${url})`;
        });
      }
    },
    toggleEdit() {
      this.isEditing = !this.isEditing
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
  .title-section
    display flex
    .title-input
      width calc(100% - 5em)
      font-size 16px
      font-weight bold
  .content
    margin-top 2em
    display flex
    margin auto
    textarea, .preview
      min-height 60vh
      width 1080px
      max-width 1080px
      border 1px solid #DDD
      border 1px solid #DDD
      padding 1em
    .preview
      >>> img
        max-width 100%
  .save-btn
    margin-top 1em
</style>
