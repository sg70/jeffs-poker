<template>
  <q-layout view="hHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-toolbar-title class="absolute-center">
          Jeff’s Planning Poker
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-footer elevated>
      <q-tabs>
        <q-route-tab v-for="nav in navs" v-bind:key="nav.to" :to="nav.to" :icon="nav.icon" :label="nav.label" exact />
        <span v-if="hasNames === true" class="row">
          <q-separator dark vertical inset />
          <q-btn push :color="(chickenMode === true) ? 'accent' : 'secondary'" :label="chickenToggleLabel" @click="setChickenMode(chickenMode === false)" class="q-ma-md" />
        </span>
      </q-tabs>
    </q-footer>

    <q-drawer
      v-model="leftDrawerOpen"
      :breakpoint="767"
      :width="250"
      bordered
      content-class="bg-secondary col"
    >
      <q-list>
        <q-item v-for="nav in navs" v-bind:key="nav.to" clickable v-ripple exact :to="nav.to">
          <q-item-section avatar>
            <q-icon :name="nav.icon" />
          </q-item-section>
          <q-item-section>
            <q-item-label>{{ nav.label }}</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
      <span v-if="hasNames === true">
        <q-separator />
        <q-toggle v-model="chickenToggle" :label="chickenToggleLabel" color="accent" class="text-black" />
      </span>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'Layout',
  computed: {
    chickenToggle: {
      set (payload) {
        this.setChickenMode(payload)
      },
      get () {
        return this.chickenMode
      }
    },
    ...mapGetters('poker', ['chickenMode', 'chickenToggleLabel', 'reEstimateLabel', 'hasNames'])
  },
  methods: {
    ...mapActions('poker', ['setChickenMode', 'resetEstimation'])
  },
  data () {
    return {
      leftDrawerOpen: this.$q.platform.is.desktop,
      navs: [
        {
          to: '/',
          icon: 'mdi-cards',
          label: 'Poker'
        },
        {
          to: '/about',
          icon: 'mdi-information',
          label: 'About'
        },
        {
          to: '/invite',
          icon: 'mdi-account-plus',
          label: 'Invite Player'
        }
      ]
    }
  }
}
</script>

<style lang="scss">
@media screen and (min-width:768px) {
  .q-footer {
    display: none;
  }
}

.q-drawer {
  .q-item--clickable {
    border-left: 2px solid #5f6366;
  }
  .q-router-link--exact-active {
    color: white !important;
    border-left: 2px solid white;
  }
}
</style>
