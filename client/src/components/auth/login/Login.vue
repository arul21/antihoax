<template>
  <div class="login">
    <h2>{{ $t('auth.welcome') }}</h2>
    <form method="post" name="login">
      <div class="form-group">
        <div class="input-group">
          <input type="text" id="email" v-model="userName" required="required"/>
          <label class="control-label" for="text">
           username
          </label>
          <i class="bar"/>
        </div>
      </div>
      <div class="form-group">
        <div class="input-group">
          <input type="password" id="password" v-model="password" required="required"/>
          <label class="control-label" for="password">
            password
          </label>
          <i class="bar"/>
        </div>
      </div>
      <div class="d-flex align--center justify--space-between">
        <button class="btn btn-primary" @click.prevent="toLogin" type="submit">
          login
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import axios from 'axios'
import { mapActions, mapState } from 'vuex'
export default {
  name: 'login',
  data () {
    return {
      userName: '',
      password: ''
    }
  },
  methods: {
    ...mapActions(['doLogin']),
    toLogin () {
      let data = {
        userName: this.userName,
        password: this.password
      }
      this.doLogin(data)
    }
  },
}
</script>

<style lang="scss">
.login {

  @include media-breakpoint-down(md) {
    width: 100%;
    padding-right: 2rem;
    padding-left: 2rem;
    .down-container {
      display: none;
    }
  }

  h2 {
    text-align: center;
  }
  width: 21.375rem;

  .down-container {
    margin-top: 3.125rem;
  }
}
</style>
