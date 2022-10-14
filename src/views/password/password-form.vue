<template>
  <div class="columns">
    <div class="column is-12 is-size-3">
      {{ visualizar }}
    </div>
  </div>
  <hr />
  <div class="columns" v-if="notification.ativo">
    <div class="column is-12">
      <div :class="notification.classe">
        <button @click="onClickFecharNotificacao()" class="delete"></button>
        {{ notification.mensagem }}
      </div>
    </div>
  </div>

  <div class="columns">
    <div class="column is-12 is-size-3">
      <label class="label">Descrição</label>
      <div class="control">
        <input class="input is-black" type="text" v-model="password.descricao"
               :readonly="visualizar === 'detalhar'" placeholder="Descrição">
      </div>
    </div>
  </div>

  <div class="columns">
    <div class="column is-12 is-size-3">
      <label class="label">URL</label>
      <div class="control">
        <input class="input is-black" type="text" v-model="password.url"
               :readonly="visualizar === 'detalhar'" placeholder="URL da senha">
      </div>
    </div>
  </div>

  <div class="columns">
    <div class="column is-12 is-size-3">
      <label class="label">Senha</label>
      <div class="control">
        <input class="input is-black" type="text" v-model="password.senha"
               :readonly="visualizar === 'detalhar'" placeholder="Senha">
      </div>
    </div>
  </div>

  <hr />

  <div class="columns" v-if="visualizar === 'detalhar'">
    <div class="column is-6"></div>
    <div class="column is-2">
      <router-link to="/password/listar">
        <button class="button is-fullwidth is-light">Voltar</button>
      </router-link>
    </div>
    <div class="column is-2">
      <button class="button is-fullwidth is-info " @click="onClickSairModoDetalhar()">Editar</button>
    </div>
    <div class="column is-2">
      <button class="button is-fullwidth is-danger" @click="onClickDeletar()">Excluir</button>
    </div>
  </div>

  <div class="columns" v-if="visualizar === 'editar'">
    <div class="column is-6"></div>
    <div class="column is-2">
      <router-link to="/password/listar">
        <button class="button is-fullwidth is-light">Voltar</button>
      </router-link>
    </div>
    <div class="column is-2">
      <button class="button is-fullwidth is-info " @click="onClickEditar()">Salvar as Alterações</button>
    </div>
    <div class="column is-2">
      <button class="button is-fullwidth is-danger" @click="onClickDeletar()">Excluir</button>
    </div>
  </div>

  <div class="columns" v-if="visualizar === 'Cadastrar'">
    <div class="column is-8"></div>
    <div class="column is-2">
      <router-link to="/password/listar">
        <button class="button is-fullwidth is-light">Voltar</button>
      </router-link>
    </div>
    <div class="column is-2">
      <button class="button is-fullwidth is-info" @click="onClickCadastrar()">Cadastrar Senha</button>
    </div>
  </div>
</template>

<script lang="ts">

import { Vue } from 'vue-class-component';
import { Password } from "@/model/password.model";
import { Prop } from "vue-property-decorator";
import { Notification } from '@/model/notification';
import { PasswordClient } from '@/client/password.client';


export default class PasswordForm extends Vue {

  private passwordClient!: PasswordClient
  password: Password = new Password()
  notification: Notification = new Notification()
  visualizar = 'detalhar'

  @Prop({ type: Number, required: false })
  private readonly id!: number

  @Prop({ type: String, default: false })
  private readonly model!: string

  public mounted(): void {
    this.passwordClient = new PasswordClient()
    this.carregarPassword()
  }

  onClickSairModoDetalhar(): void {
    this.visualizar = 'editar'
  }

  onClickCadastrar(): void {
    this.passwordClient.cadastrar(this.password).then(
        success => {
          this.notification = this.notification.new(true, 'notification is-success',
              'A senha foi Cadastrado com sucesso')
          console.log(this.password)
          this.onClickLimpar()
        }, error => {
          this.notification = this.notification.new(true, 'notification is-danger',
              'Error: ' + error)
          console.log(this.password)
          this.onClickLimpar()
        })
  }

  private carregarPassword(): void {
    if (this.model === 'detalhar') {
      this.passwordClient.findById(this.id).then(value => {
        this.password = value
      }).catch(reason => {
        this.notification = reason
        console.log(this.notification)
      })
    } else {
      this.visualizar = 'Cadastrar'
    }
  }

  onClickEditar(): void {
    this.passwordClient.editar(this.password).then(sucess => {
      this.notification = this.notification.new(true, 'notification is-success',
          'A senha foi editada com sucesso')
    }, error => {
      this.notification = this.notification.new(true, 'notification is-danger', 'Error: ' + error)
    })
  }

  onClickDeletar(): void {
    this.passwordClient.deletar(this.password).then(sucess => {
      this.notification = this.notification.new(true, 'notification is-success',
          'A senha foi excluida com sucesso')
    }, error => {
      this.notification = this.notification.new(true, 'notification is-danger',
          'Error: ' + error)
    })
  }

  onClickFecharNotificacao(): void {
    this.notification = new Notification()
  }
  private onClickLimpar(): void {
    this.password = new Password()
  }
}

</script>