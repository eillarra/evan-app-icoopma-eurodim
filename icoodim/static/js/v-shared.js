var CommonMarkReader = new commonmark.Parser({safe: true, smart: true});
var CommonMarkWriter = new commonmark.HtmlRenderer();


Vue.filter('moment', function (date, format) {
  return moment(date).format(format || 'll');
});

Vue.filter('markdown', function (text) {
  return CommonMarkWriter.render(CommonMarkReader.parse(text));
});

Vue.component('marked', {
  props: {
    text: {
      type: String,
      default: ''
    }
  },
  template: '<div class="marked" v-html="compiledMarkdown"></div>',
  computed: {
    compiledMarkdown: function () {
      if (!this.text || this.text == '') return this.text;
      return CommonMarkWriter.render(CommonMarkReader.parse(this.text));
    }
  }
});
