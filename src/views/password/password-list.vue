<template>
  <article class="panel is-info">
    <p class="panel-heading">
      LISTA DE SENHAS
    </p>
    <div class="panel-block">
      <p class="control has-icons-left">
        <input class="input is-info" type="text" placeholder="Search">
        <span class="icon is-left">
          <i class="fas fa-search" aria-hidden="true"></i>
        </span>
      </p>
    </div>
  </article>

  <div class="buttonCadastrar">
    <router-link to="/password/form">
      <button class="button is-responsive is-rounded is-info is-light">
        Cadastrar novo Password
      </button>
    </router-link>
  </div>

  <table class="table is-hoverable">
    <thead>
    <tr>
      <th>ID</th>
      <th>Descrição</th>
      <th>Url</th>
      <th>Senha</th>
      <th>Opções</th>
    </tr>
    </thead>

    <tbody>
    <tr v-for="item in passwordsList" :key="item.id">
      <th>{{ item.id }}</th>
      <th>{{ item.descricao }}</th>
      <th>{{ item.url }}</th>
      <th>{{ item.senha }}</th>
      <th>
        <button @click="onClickPaginaDetalhar(item.id)" class="button is-small is-info is-outlined">
          Detalhar
        </button>
      </th>
    </tr>
    </tbody>

  </table>

</template>

<script lang="ts">

import { Vue } from 'vue-class-component'
import { Password } from '@/model/password.model'
import { PasswordClient } from '@/client/password.client'
import { PageRequest } from '@/model/page/page-request'
import { PageResponse } from '@/model/page/page-response'

export default class PasswordList extends Vue {

  pageRequest: PageRequest = new PageRequest()
  pageResponse: PageResponse<Password> = new PageResponse()

  passwordsList: Password[] = []


  passwordClient!: PasswordClient

  public mounted(): void {
    this.passwordClient = new PasswordClient()
    this.listarPasswords()
  }

  private listarPasswords(): void {
    this.passwordClient.findByFiltrosPaginado(this.pageRequest)
        .then(
            success => {
              this.pageResponse = success
              this.passwordsList = this.pageResponse.content
            },
            error => console.log(error)
        )
  }
  onClickPaginaDetalhar(idPassword: number) {
    this.$router.push({ name: 'password-detalhar', params: { id: idPassword, model: 'detalhar' } })
  }
}

</script>


<style>
.buttonCadastrar {
  margin-bottom: 20px;
}
</style>