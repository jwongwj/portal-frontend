<template>

  <v-menu offset-y>
    <template
      v-slot:activator="on"
      style="display: none;"
    >
      <v-btn
        icon
        :color="getColor()"
        dark
        v-on="on.on"
      >
        <v-icon>{{ getIcon() }}</v-icon>
      </v-btn>
    </template>
    <v-list style="display: inline-block;">
      <v-list-item
        v-for="(item, index) in menuAction"
        :key="index"
        @click="executeMenuAction(item.event, actionItem)"
        style="display: block;"
      >
        <v-list-item-title>
          <v-list-item-icon>
            <v-icon :color="getIconColor(item.iconColor)">
              {{item.icon}}
            </v-icon>
          </v-list-item-icon>
          {{item.buttonName}}
        </v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>

</template>

<script>
export default {
  name: 'Navbar',
  props: {
    menuAction: Array,
    actionItem: Object,
    menuOption: Object,
    eventBus: Object,
  },
  methods: {
    executeMenuAction (event, item) {
      this.eventBus.$emit(event, item);
    },
    getIcon () {
      if (!this.checkExist(this.menuOption) || !this.checkExist(this.menuOption.icon)) {
        return 'mdi-dots-vertical';
      }
      return this.menuOption.icon;
    },
    getColor () {
      if (!this.checkExist(this.menuOption) || !this.checkExist(this.menuOption.color)) {
        return 'black';
      }
      return this.menuOption.color;
    },
    getIconColor (color) {
      if (!this.checkExist(color)) {
        return 'black';
      }
      return color;
    },
  },
};
</script>

<style>
</style>
