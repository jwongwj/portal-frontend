<!-- Credits to: https://dev.to/casualcoder/tiptap-with-vuetify-1lmi -->
<!-- Alsoo: https://tiptap.scrumpy.io/ -->
<template>
  <div class="editor">
    <editor-menu-bar
      :editor="editor"
      v-slot="{ commands, isActive }"
    >
      <div class="menubar">
        <v-btn
          text
          icon
          :class="{ 'is-active': isActive.bold() }"
          @click="commands.bold"
        >
          <v-icon>mdi-format-bold</v-icon>
        </v-btn>

        <v-btn
          text
          icon
          :class="{ 'is-active': isActive.italic() }"
          @click="commands.italic"
        >
          <v-icon>mdi-format-italic</v-icon>
        </v-btn>

        <v-btn
          text
          icon
          :class="{ 'is-active': isActive.underline() }"
          @click="commands.underline"
        >
          <v-icon>mdi-format-underline</v-icon>
        </v-btn>

        <v-btn
          text
          icon
          :class="{ 'is-active': isActive.bullet_list() }"
          @click="commands.bullet_list"
        >
          <v-icon>mdi-format-list-bulleted</v-icon>
        </v-btn>

        <v-btn
          text
          icon
          :class="{ 'is-active': isActive.ordered_list() }"
          @click="commands.ordered_list"
        >
          <v-icon>mdi-format-list-numbered</v-icon>
        </v-btn>

        <v-btn
          text
          icon
          @click="commands.undo"
        >
          <v-icon>mdi-undo</v-icon>
        </v-btn>

        <v-btn
          text
          icon
          @click="commands.redo"
        >
          <v-icon>mdi-redo</v-icon>
        </v-btn>

      </div>
    </editor-menu-bar>

    <editor-content
      class=" thickBorder"
      :editor="editor"
    />
  </div>
</template>

<script>
import { Editor, EditorContent, EditorMenuBar } from 'tiptap';
import {

  HardBreak,

  OrderedList,
  BulletList,
  ListItem,
  TodoItem,
  TodoList,
  Bold,

  Italic,

  Strike,
  Underline,
  History,
} from 'tiptap-extensions';

export default {
  components: {
    EditorContent,
    EditorMenuBar,
  },
  data () {
    return {
      editor: new Editor({
        extensions: [
          new BulletList(),
          new HardBreak(),
          new ListItem(),
          new OrderedList(),
          new TodoItem(),
          new TodoList(),
          new Bold(),
          new Italic(),
          new Strike(),
          new Underline(),
          new History(),
        ],
        content: '',
      }),
    };
  },
  beforeDestroy () {
    this.editor.destroy();
  },
};
</script>

<style>
.ProseMirror {
  border: black solid 1px;
  border-radius: 5px;
  min-height: 30vh;
  padding-left: 10px;
  padding-top: 10px;
  padding-bottom: 10px;
  padding-right: 10px;
}
</style>
