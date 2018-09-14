<template>
    <div>
        标题：<input type="text" v-model="title" />
        内容：<textarea v-model="content"></textarea>
        <button @click="save">保存</button>
    </div>
</template>

<script>
export default {
  data() {
    return {
      title: '',
      content: ''
    };
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

<style>
</style>
