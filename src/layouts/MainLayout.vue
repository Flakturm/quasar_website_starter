<template>
  <q-layout class="bg-grey-1">
    <q-header
      elevated
      class="text-white"
      style="background: #24292e"
      height-hint="61.59"
    >
      <q-toolbar class="q-py-sm q-px-md">
        <q-space />

        <q-btn
          v-if="!loggedIn"
          to="/login"
          flat
          icon-right="account_circle"
          size="lg"
        />

        <div
          v-else
          class="q-pl-sm q-gutter-sm row items-center no-wrap"
        >
          <q-btn
            dense
            flat
            no-wrap
          >
            <q-avatar
              rounded
              size="3em"
            >
              <img :src="avatar">
            </q-avatar>
            <q-icon
              name="arrow_drop_down"
              size="16px"
            />

            <q-menu auto-close>
              <q-list dense>
                <q-item class="GL__menu-link-signed-in">
                  <q-item-section>
                    <div>Signed in as <strong>{{ details.name }}</strong></div>
                  </q-item-section>
                </q-item>
                <q-separator />
                <q-item
                  clickable
                  class="GL__menu-link"
                >
                  <q-item-section @click="logout">Sign out</q-item-section>
                </q-item>
              </q-list>
            </q-menu>
          </q-btn>
        </div>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'MyLayout',

  computed: {
    ...mapState('auth', ['loggedIn', 'details']),

    avatar () {
      return this.details.avatar ? this.details.avatar : 'https://avataaars.io/?avatarStyle=Circle&topType=WinterHat3&accessoriesType=Sunglasses&hatColor=Red&facialHairType=BeardMagestic&facialHairColor=Brown&clotheType=Hoodie&clotheColor=Heather&eyeType=Default&eyebrowType=RaisedExcitedNatural&mouthType=Smile&skinColor=Light'
    }
  },

  methods: {
    ...mapActions('auth', ['logout']),
  }
}
</script>

<style lang="sass">
.GL
  &__select-GL__menu-link
    .default-type
      visibility: hidden
    &:hover
      background: #0366d6
      color: white
      .q-item__section--side
        color: white
      .default-type
        visibility: visible
  &__toolbar-link
    a
      color: white
      text-decoration: none
      &:hover
        opacity: 0.7
  &__menu-link:hover
    background: #0366d6
    color: white
  &__menu-link-signed-in
  &__menu-link-status
    &:hover
      & > div
        background: white !important
  &__menu-link-status
    color: $blue-grey-6
    &:hover
      color: $light-blue-9
  &__toolbar-select.q-field--focused
    width: 450px !important
    .q-field__append
      display: none
</style>
