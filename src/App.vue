
<template>
  <div id="app">
    <h1 class="logo-b">B</h1><h1 class="logo-lu">lu.</h1>
    <div class="sidenav">
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import Home from './views/Home.vue';

export default {
  components: {
    Home
  },
  name: 'App',
}; 
</script>

<style>
#navprofile{
  z-index: 2;
  position: relative;
  left: 500px;
}
.logo-b{
  position: fixed;
  z-index: 2;
  top: 1px;
  left: 45px;
  color: #ffffff;
  font-size: 90px;
}
.logo-lu{
  position: fixed;
  z-index: 2;
  top: 10px;
  left: 100px;
  color: #00ABE7;
  font-size: 80px;
}
.sidenav {
  height: 100%;
  width: 100px;
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  background-color: #00ABE7;
  overflow-x: hidden;
  padding-top: 20px;
}
#app {
  
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  
}


.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}


.btn:focus,.btn:active{
  text-decoration: none;
}
.btn-primary {
    color: #fff;
    background-color: #00ABE7;
    border-color: #fff0;
}

.btn-secondary {
    color: #fff;
    background-color: #00ABE7;
    border-color: #ffffff00;
}
.btn-primary:hover {
    color: #fff;
    background-color: #00ABE7;
    border-color: #ffffff00;
}

.btn-secondary.focus, .btn-secondary:focus {
    box-shadow: none;
}

.btn-primary:not(:disabled):not(.disabled).active, .btn-primary:not(:disabled):not(.disabled):active, .show>.btn-primary.dropdown-toggle {
    color: #fff;
    background-color: #00ABE7;
    border-color: #ffffff00;
}


.btn-secondary:not(:disabled):not(.disabled).active, .btn-secondary:not(:disabled):not(.disabled):active, .show>.btn-secondary.dropdown-toggle {
    color: #fff;
    background-color: #00ABE7;
    border-color: #ffffff00;
}


.margin-xs {
  margin-top: 3%;
}

.margin-sm {
  margin-top: 7%;
}

.border-style {
  border: 1px solid #ced4da;
}
.border-secondary {
    border-color: #ffffff!important;
    border: 0px;
    box-shadow: 0px 8px 20px 0px #ededed;
}
</style>
