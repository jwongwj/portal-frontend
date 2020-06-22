<template>
  <v-app>

    <v-app-bar
      app
      class="headercolor"
    >

      <v-spacer></v-spacer>
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

      <v-spacer></v-spacer>
      <v-spacer></v-spacer>

      <v-spacer></v-spacer>

      <v-spacer></v-spacer>

      <v-spacer></v-spacer>

    </v-app-bar>

    <v-content>
      <router-view></router-view>
      <Alert />
    </v-content>
  </v-app>
</template>

<script>
import Alert from '@/components/Alert.vue';

export default {
  name: 'App',
  components: {
    Alert,
  },
  data: () => ({
    //
  }),
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
</style>
