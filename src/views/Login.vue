<template>
    <div>
        <input type="text" v-model="password" />
        <button @click="submit">Login</button>
    </div>
</template>

<script>
import { login } from '../api';
export default {
  data() {
    return { password: null };
  },
  methods: {
    submit() {
      login({ password: this.password })
        .then(token => {
          localStorage.setItem('token', token);
          this.$router.push({ name: 'home' });
        })
    }
  }
};
</script>

<style>
</style>
