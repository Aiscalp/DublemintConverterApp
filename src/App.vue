<template>
  <div class="app">
    <suspense>
      <router-view />
    </suspense>
  </div>
</template>

<script></script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.app {
  padding: 20px;
}
</style>
