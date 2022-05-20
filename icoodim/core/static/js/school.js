var EVAN_URL = 'https://evan.ugent.be/api/v1/events/icoopma-eurodim-school/';


var Store = new Vuex.Store({
  state: {
    event: null,
    contents: null
  },
  mutations: {
    getContents: function (state) {
      var self = this;
      axios.get(EVAN_URL + 'contents/').then(function (res) {
        state.contents = {};
        res.data.forEach(function (obj) {
          state.contents[obj.key] = obj;
        });
        setTimeout(function () {
          self.commit('getContents');
        }, 45000);
      });
    },
    getEvent: function (state) {
      var self = this;
      axios.get(EVAN_URL).then(function (res) {
        res.data.registrationEarlyDeadline = moment(res.data.registration_early_deadline);
        try {
          res.data.abstractSubmissionDeadline = moment(res.data.custom_data.abstracts.submission_deadline);
        } catch (e) {
          res.data.abstractSubmissionDeadline = null;
        }
        res.data.sessions.map(function (obj) {
          obj.startAt = moment(obj.start_at);
          return obj;
        });
        state.event = res.data;
        Quasar.plugins.Loading.hide();

        setTimeout(function () {
          self.commit('getEvent');
        }, 60000);
      });
    }
  }
});

var IndexView = {
  data: function () {
    return {
      tab: 'about'
    }
  },
  template: '#v-index',
  computed: _.extend(
    Vuex.mapState(['event', 'contents']), {
    dates: function () {
      if (!this.event.custom_data.dates || !this.event.custom_data.dates.length) return [];

      return this.event.custom_data.dates.map(function (d) {
        d.startDate = moment(d.start_date);
        if (d.format == 'range' && d.end_date) {
          d.formatted = d.startDate.format('MMM D') + '-' + moment(d.end_date).format('D, Y');
        } else {
          d.formatted = d.startDate.format({
            'date': 'MMM D, Y',
            'month': 'MMM Y'
          }[d.format] || 'MMMM Y');
        }
        return d;
      }).sort(function (a, b) {
        return a.startDate.diff(b.startDate);
      });
    }
  })
};

var AbstractsView = {
  template: '#v-abstracts',
  computed: Vuex.mapState(['event', 'contents'])
};

var CommitteeView = {
  template: '#v-committee',
  computed: Vuex.mapState(['event', 'contents'])
};

var ProgramView = {
  template: '#v-program',
  computed: _.extend(
    Vuex.mapState(['event', 'contents']), {
    program: function () {
      if (!this.event) return null;
      return _.groupBy(this.event.sessions.map(function (obj) {
        obj.day = obj.startAt.format('dddd, MMM D');
        return obj;
      }), 'day');
    }
  })
};

var RegistrationView = {
  template: '#v-registration',
  computed: _.extend(
    Vuex.mapState(['event', 'contents']), {
    fees: function () {
      if (!this.event) return {};
      var fees = _.groupBy(this.event.fees, 'type');
      _.each(fees, function (value, key, data) {
        data[key] = _.groupBy(value, 'is_early');
      });
      return fees;
    },
    earlyFeesExist: function () {
      if (!this.event) return false;
      return _.where(this.event.fees, {is_early: true}).length > 0;
    }
  })
};

var TeachersView = {
  template: '#v-teachers',
  computed: Vuex.mapState(['event', 'contents'])
};

var SponsorsCallView = {
  template: '#v-sponsors-call',
  computed: Vuex.mapState(['event', 'contents'])
};

var VenueView = {
  template: '#v-venue',
  computed: _.extend(
    Vuex.mapState(['event']), {
    venue: function () {
      if (!this.event) return null;
      return _.findWhere(this.event.venues, {is_main: true});
    }
  })
};

var Router = new VueRouter({
  routes: [
    {
      name: 'index',
      path: '/',
      pathToRegexpOptions: {strict: true},
      component: IndexView
    },
    {
      name: 'program',
      path: '/program/',
      pathToRegexpOptions: {strict: true},
      component: ProgramView
    },
    {
      name: 'registration',
      path: '/registration/',
      pathToRegexpOptions: {strict: true},
      component: RegistrationView
    },
    {
      name: 'teachers',
      path: '/teachers/',
      pathToRegexpOptions: {strict: true},
      component: TeachersView
    },
    {
      name: 'venue',
      path: '/venue/',
      pathToRegexpOptions: {strict: true},
      component: VenueView
    }
  ]
});

new Vue({
  el: '#vue',
  store: Store,
  router: Router,
  data: function () {
    return {
      visibleDrawer: true,
    }
  },
  computed: _.extend(
    Vuex.mapState(['event']), {
    sponsors: function () {
      if (!this.event) return [];
      return this.event.sponsors.map(function (obj) {
        obj.logo = (obj.files.length) ? obj.files[0].url : null;
        return obj;
      });
    }
  }),
  created: function () {
    this.$store.commit('getEvent');
    this.$store.commit('getContents');
    this.$q.loading.show({
      delay: 1000
    });
  }
});
