<template>
    <div class="write">
        标题：<input type="text" v-model="title" />
        <div class="content">
        内容：<textarea v-model="content" rows="50"></textarea>
        预览：<div class="preview" v-html="previewContent"></div>
        </div>
        <button @click="save">保存</button>
    </div>
</template>

<script>
import showdown from 'showdown';
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
  .content
    display flex
    > *
      width 45%
      padding 2em
    textarea
      border 1px solid #DDD
    .preview
      border 1px solid #DDD
</style>
