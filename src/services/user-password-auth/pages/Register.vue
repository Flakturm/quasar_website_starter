<template>
  <q-page padding>
    <q-form
      @submit="onSubmit"
      class="row justify-center"
    >
      <div class="col col-md-4 q-gutter-md">
        <p class="text-h5">Register</p>

        <validation-errors
          v-if="Object.keys(errors).length"
          :errors="errors"
        />

        <q-input
          filled
          v-model="formData.name"
          label="Name"
          lazy-rules
          no-error-icon
          :rules="[isRequired]"
        />

        <q-input
          filled
          v-model="formData.email"
          label="Email address"
          lazy-rules
          no-error-icon
          :rules="[isRequired, isValidEmail]"
        />

        <q-input
          filled
          v-model="formData.password"
          :type="passwordVisible ? 'text' : 'password'"
          label="Password"
          maxlength="12"
          lazy-rules
          no-error-icon
          :rules="[isRequired, isValidPassword]"
        >
          <template v-slot:append>
            <q-icon
              :name="passwordVisible ? 'visibility_off' : 'visibility'"
              class="cursor-pointer"
              @click="passwordVisible = !passwordVisible"
            />
          </template>
        </q-input>

        <q-input
          filled
          v-model="formData.password_confirmation"
          :type="passwordConfirmationVisible ? 'text' : 'password'"
          label="Password confirmation"
          maxlength="12"
          lazy-rules
          no-error-icon
          :rules="[isRequired, val => val === formData.password || 'Password does not match']"
        >
          <template v-slot:append>
            <q-icon
              :name="passwordConfirmationVisible ? 'visibility_off' : 'visibility'"
              class="cursor-pointer"
              @click="passwordConfirmationVisible = !passwordConfirmationVisible"
            />
          </template>
        </q-input>

        <div class="column">
          <div class="col">
            <q-btn
              color="primary"
              type="submit"
              label="Register"
              no-caps
              class="full-width"
              :disable="loading"
              :loading="loading"
            />
          </div>
          <div class="col q-mt-md">
            Already have an account?
            <router-link
              :to="{ name: 'login'}"
              class="q-ml-sm"
            >
              Sign In
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
  name: 'Register',

  mixins: [mixins],

  components: { ValidationErrors },

  data () {
    return {
      formData: {
        name: '',
        email: '',
        password: ''
      },
      passwordVisible: false,
      passwordConfirmationVisible: false,
      loading: false,
      errors: {}
    }
  },

  methods: {
    ...mapActions('auth', ['register']),

    onSubmit () {
      this.loading = true
      this.register(this.formData)
        .catch((error) => {
          this.loading = false
          this.errors = error.response.data.errors
        })
    }
  },
}
</script>
