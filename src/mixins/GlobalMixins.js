import EventConstants from '@/constants/EventConstants';

export default {
  methods: {},
  created() {
    const that = this;
    document.addEventListener(EventConstants.KEYUP_EVENT, (evt) => {
      if (evt.keyCode === EventConstants.KEYBOARD_ESCAPE) {
        if (that.escape != null) {
          that.escape();
        }
      }

      if (evt.keyCode === EventConstants.KEYBOARD_ENTER) {
        if (that.enter != null) {
          that.enter();
        }
      }
    });
  },
};
