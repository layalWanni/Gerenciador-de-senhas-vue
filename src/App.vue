<template>
  <div class="column">
    <div class="columns is-12 menu-top">
      Gerenciador de Senhas
    </div>
  </div>

  <div class="columns">
    <div class="column is-3">
      <nav>
        <aside class="menu">
          <p class="menu-label"> Menu </p>
          <ul class="menu-list">
            <li><router-link to="/password/listar">Passwords</router-link></li>
          </ul>
        </aside>
      </nav>
    </div>
    <div class="column is-9 conteudo">
      <router-view> </router-view>
    </div>
  </div>
</template>

<style lang="scss">
  @import "~bulma/bulma.sass";

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

.conteudo {
  margin-top: 30px;
}

.menu-top{
  background: hsl(0, 0%, 29%);
  padding: 15px;
  color: white;
}
</style>
