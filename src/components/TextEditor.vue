<template>
  <div
    class="editor"
    ref="editor"
  >
  </div>
</template>

<script>

import Quill from 'quill';

export default {
  props: {
    value: {
      type: String,
      default: '',
    },
    eventname: String,
  },

  data () {
    return {
      editor: null,
      text: '',
    };
  },
  mounted () {
    this.editor = new Quill(this.$refs.editor, {
      modules: {
        toolbar: [
          [{ header: [1, 2, 3, 4, 5, 6, false] }],
          ['bold', 'italic', 'underline', 'strike'], // toggled buttons
          [{ list: 'ordered' }, { list: 'bullet' }],
          [{ indent: '-1' }, { indent: '+1' }], // outdent/indent
          [{ direction: 'rtl' }], // text direction
          [{ color: [] }, { background: [] }], // dropdown with defaults from theme
          [{ align: [] }],

          ['clean'], // remove formatting button
        ],
      },
      theme: 'snow',
    });

    this.editor.root.innerHTML = this.value;

    this.editor.on('text-change', () => this.update());
  },

  methods: {
    update () {
      this.text = this.editor.getText() ? this.editor.root.innerHTML : '';
    },
    removeElementsByClass (className) {
      const elements = document.getElementsByClassName(className);
      while (elements.length > 0) {
        elements[0].parentNode.removeChild(elements[0]);
      }
    },
  },
  destroyed () {
    this.removeElementsByClass('ql-toolbar'); // Vue not deleting toolbar when quill is destroyed
  },
};
</script>

<style>
.editor {
  min-height: 30vh;
}
</style>
