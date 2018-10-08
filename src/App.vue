<template>
  <div id="app">
    <transition name="fade" mode="out-in">
      <router-view class="view"></router-view>
    </transition>
  </div>
</template>
<style lang="stylus">
input[type='text']
  padding 10px
  border 1px solid #ccc
  border-radius 4px
button
  width 6em
  height 2.5em
  background-color rgba(0,0,0,0)
</style>