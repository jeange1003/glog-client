import Vue from 'vue';
export default class User {
  static isLogin() {
    if (typeof window !== 'undefined') {
      return !!window.localStorage.getItem('token');
    }
    throw new Error('isLogin cannot execute in server side.');
  }
  static getToken() {
    if (typeof window !== 'undefined') {
      return window.localStorage.getItem('token');
    }
    throw new Error('getToken cannot execute in server side.');
  }
}
