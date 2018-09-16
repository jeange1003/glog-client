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
      content: ''
    };
  },
  computed: {
      previewContent() {
          return converter.makeHtml(this.content)
      }
  },
  methods: {
    save() {
      this.$store
        .dispatch('CREATE_POST', { title: this.title, content: this.content })
        .then(() => {
          this.$router.push({ name: 'home' });
        });
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
