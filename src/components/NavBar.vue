<template>
  <v-app-bar
    app
    class="headercolor"
  >
    <v-row>
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="@/assets/JobPortalLogo.png"
          width="40"
        />

        <label
          class="noselect largefont"
          draggable="false"
        >JobPortal</label>
      </div>
    </v-row>
    <v-row v-if="status">
      <v-flex class="">Job Listing</v-flex>
      <v-flex>Profile</v-flex>
      <v-flex>Admin</v-flex>

      <v-menu offset-y>
        <template
          v-slot:activator="on"
          style="display: none;"
        >
          <v-btn
            class="mx-2"
            fab
            dark
            small
            color="grey"
            v-on="on.on"
          >
            <v-icon dark>mdi-account</v-icon>
          </v-btn>
        </template>
        <v-list style="display: inline-block;">
          <v-list-item
            style="display: block;"
            @click="logout"
          >
            <v-list-item-title>
              <v-list-item-icon>
                <v-icon>
                  mdi-logout
                </v-icon>
              </v-list-item-icon>
              Logout
            </v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-row>
  </v-app-bar>

</template>

<script>

export default {
  name: 'AppBar',
  components: {

  },
  data: () => ({
    status: false,
  }),
  created () {
    this.$eventHub.$on('logStatus', this.checkLogin);
    this.status = this.$store.getters.isAuthenticated;
  },
  methods: {
    logout () {
      this.$store.dispatch('cleartoken');
      this.$router.push('/');
      this.status = false;
    },
    checkLogin () {
      this.status = true;
    },
  },
};
</script>
<style>
.noselect {
  -webkit-touch-callout: none; /* iOS Safari */
  -webkit-user-select: none; /* Safari */
  -khtml-user-select: none; /* Konqueror HTML */
  -moz-user-select: none; /* Old versions of Firefox */
  -ms-user-select: none; /* Internet Explorer/Edge */
  user-select: none; /* Non-prefixed version, currently
                                  supported by Chrome, Edge, Opera and Firefox */
}

.largefont {
  font-size: 30px;
  line-height: 1em;
}

.headercolor {
  background: rgb(42, 255, 253);
  background: -moz-radial-gradient(
    circle,
    rgba(42, 255, 253, 0.07886904761904767) 0%,
    rgba(234, 237, 255, 1) 100%
  );
  background: -webkit-radial-gradient(
    circle,
    rgba(42, 255, 253, 0.07886904761904767) 0%,
    rgba(234, 237, 255, 1) 100%
  );
  background: radial-gradient(
    circle,
    rgba(42, 255, 253, 0.07886904761904767) 0%,
    rgba(234, 237, 255, 1) 100%
  );
  filter: progid:DXImageTransform.Microsoft.gradient(startColorstr="#2afffd",endColorstr="#eaedff",GradientType=1);
}

/* html,
body {
  margin: 0;
  height: 100%;
  overflow: hidden;
} */
</style>
