<template>
  <!-- <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/login">Login</router-link>
  </nav> -->
  <router-view />
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
  
  a {
    font-weight: bold;
    color: #2c3e50;
    background-color: white;
    border: 1px solid #0b5ed7;
    padding: 10px;
    text-decoration: none;

    &.router-link-exact-active {
      color: white;
      background-color: #0b5ed7;
      border: 1px solid #0b5ed7;
    }
  }

  a:hover {
    // color: black;
  }

}

</style>
