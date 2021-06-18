var EVAN_URL = 'https://evan.ugent.be/api/v1/events/icoopma-eurodim/';


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
        if (res.data.custom_data.dates) {
          res.data.dates = res.data.custom_data.dates.map(function (d) {
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
        } else res.data.dates = [];

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
  template: '#v-index',
  computed: Vuex.mapState(['event']),
};

var IcoopmaView = {
  data: function () {
    return {
      tab: 'about'
    }
  },
  template: '#v-icoopma',
  computed: Vuex.mapState(['event', 'contents'])
};

var EurodimView = {
  data: function () {
    return {
      tab: 'about'
    }
  },
  template: '#v-eurodim',
  computed: Vuex.mapState(['event', 'contents'])
};

var AbstractsView = {
  template: '#v-abstracts',
  computed: Vuex.mapState(['event', 'contents'])
};

var RegistrationView = {
  template: '#v-registration',
  computed: Vuex.mapState(['event', 'contents'])
};

var VenueView = {
  template: '#v-venue',
  computed: Vuex.mapState(['event'])
};

var VenueAccommodationView = {
  template: '#v-venue-accommodation',
  computed: Vuex.mapState(['contents'])
};

var VenueTransportationView = {
  template: '#v-venue-transportation',
  computed: Vuex.mapState(['contents'])
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
      name: 'icoopma',
      path: '/icoopma/',
      pathToRegexpOptions: {strict: true},
      component: IcoopmaView
    },
    {
      name: 'eurodim',
      path: '/eurodim/',
      pathToRegexpOptions: {strict: true},
      component: EurodimView
    },
    {
      name: 'abstracts',
      path: '/abstract-submission/',
      pathToRegexpOptions: {strict: true},
      component: AbstractsView
    },
    {
      name: 'registration',
      path: '/registration/',
      pathToRegexpOptions: {strict: true},
      component: RegistrationView
    },
    {
      name: 'venue',
      path: '/venue/',
      pathToRegexpOptions: {strict: true},
      component: VenueView
    },
    {
      name: 'venue-accommodation',
      path: '/accommodation/',
      pathToRegexpOptions: {strict: true},
      component: VenueAccommodationView
    },
    {
      name: 'venue-transportation',
      path: '/transportation/',
      pathToRegexpOptions: {strict: true},
      component: VenueTransportationView
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
  computed: Vuex.mapState(['event']),
  created: function () {
    this.$store.commit('getEvent');
    this.$store.commit('getContents');
    this.$q.loading.show({
      delay: 1000
    });
  }
});
