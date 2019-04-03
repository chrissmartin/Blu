<template>
  <div id="app">
    <!--<div id="screenMask"></div>-->
    <router-view />
  </div>
  
</template>



<style>
body {
    position: relative;
    margin: 0;
}

#screenMask {
    position: absolute;
    left: 0; right: 0;
    top: 0; bottom: 0;
    z-index: 1000;
    background-color: #000;
    opacity: 0.7;
    filter: alpha(opacity=70);
    visibility: hidden;
}

#app {
  height: 100%;
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