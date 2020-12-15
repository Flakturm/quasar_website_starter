<template>
  <q-page padding>
    <q-form
      @submit="onSubmit"
      class="row justify-center"
    >
      <div class="col col-md-4 q-gutter-md">
        <p class="text-h5">Login</p>

        <validation-errors
          v-if="Object.keys(errors).length"
          :errors="errors"
        />

        <q-input
          filled
          v-model="formData.email"
          label="Email address"
          lazy-rules
          no-error-icon
          :rules="[val => !!val || 'Required', isValidEmail]"
        />

        <q-input
          filled
          v-model="formData.password"
          :type="passwordVisible ? 'text' : 'password'"
          label="Password"
          maxlength="12"
          lazy-rules
          no-error-icon
          :rules="[
            val => (val !== null && val !== '') || 'Required'
          ]"
        >
          <template v-slot:append>
            <q-icon
              :name="passwordVisible ? 'visibility_off' : 'visibility'"
              class="cursor-pointer"
              @click="passwordVisible = !passwordVisible"
            />
          </template>
        </q-input>

        <div class="column">
          <div class="col">
            <q-btn
              color="primary"
              type="submit"
              label="Login"
              no-caps
              class="full-width"
              :disable="loading"
              :loading="loading"
            />
          </div>

          <div class="col q-mt-md">
            Don't have an account?
            <router-link
              :to="{ name: 'register'}"
              class="q-ml-sm"
            >
              Sign Up
            </router-link>
          </div>

        </div>
      </div>
    </q-form>
  </q-page>
</template>

<script>
import { mapActions } from 'vuex'
import mixins from '../mixins'
import ValidationErrors from '../components/ValidationErrors'

export default {
  name: 'Login',

  mixins: [mixins],

  components: { ValidationErrors },

  data () {
    return {
      formData: {
        email: 'test@test.com',
        password: 'P@ssw0rd'
      },
      passwordVisible: false,
      loading: false,
      errors: {}
    }
  },

  methods: {
    ...mapActions('auth', ['login']),

    onSubmit () {
      this.loading = true
      this.login(this.formData)
        .catch((error) => {
          this.loading = false
          this.errors = error.response.data.errors
        })
    }
  }
};
</script>
