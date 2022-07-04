var EVAN_URL = 'https://evan.ugent.be/api/v1/events/icoopma-eurodim/';


var getMoment = function (dt, tz) {
  return moment(dt).tz(tz || 'Europe/Brussels');
};


window.twttr = (function (d, s, id) {
  var js;
  var fjs = d.getElementsByTagName(s)[0];
  var t = window.twttr || {};

  if (d.getElementById(id)) return t;
  js = d.createElement(s);
  js.id = id;
  js.src = 'https://platform.twitter.com/widgets.js';
  fjs.parentNode.insertBefore(js, fjs);

  t._e = [];
  t.ready = function (f) {
    t._e.push(f);
  };

  return t;
}(document, 'script', 'twitter-wjs'));


var Store = new Vuex.Store({
  state: {
    event: null,
    abstracts: null,
    contents: null
  },
  mutations: {
    getAbstracts: function (state) {
      var self = this;
      axios.get(EVAN_URL + 'public_abstracts/').then(function (res) {
        state.abstracts = Object.freeze(res.data.map(function (obj) {
          obj._q = [
            obj.title,
            obj.authors,
            obj.authors.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
          ].join(' ').toLowerCase();
          return obj;
        }));
        setTimeout(function () {
          self.commit('getAbstracts');
        }, 55000);
      });
    },
    getContents: function (state) {
      var self = this;
      axios.get(EVAN_URL + 'contents/').then(function (res) {
        state.contents = {};
        res.data.forEach(function (obj) {
          state.contents[obj.key] = obj;
        });
        setTimeout(function () {
          self.commit('getContents');
        }, 44000);
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
        state.event = res.data;
        Quasar.plugins.Loading.hide();

        setTimeout(function () {
          self.commit('getEvent');
        }, 66000);
      });
    }
  }
});

var IndexView = {
  template: '#v-index',
  computed: _.extend(
    Vuex.mapState(['event']), {
    dates: function () {
      if (!this.event.custom_data.dates || !this.event.custom_data.dates.length) return [];

      return this.event.custom_data.dates.map(function (d) {
        d.startDate = getMoment(d.start_date);
        if (d.format == 'range' && d.end_date) {
          d.formatted = d.startDate.format('MMM D') + '-' + getMoment(d.end_date).format('D, Y');
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
  }),
  methods: {
    loadTwitter: function () {
      if (window.twttr && window.twttr.widgets) {
        window.twttr.widgets.load();
      } else {
        var self = this;
        setTimeout(function () { self.loadTwitter() }, 25);
        return;
      }
    }
  },
  mounted: function () {
    var lt = this.loadTwitter;
    this.$nextTick(function () {
      lt();
    });
  }
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

var CommitteeView = {
  template: '#v-committee',
  computed: Vuex.mapState(['event', 'contents'])
};

var ProceedingsView = {
  template: '#v-proceedings',
  computed: Vuex.mapState(['event', 'contents'])
};

var ProgramView = {
  data: function () {
    return {
      q: '',
      sessions: {
        '41P': {
          start_at: '20220704T092000+0200',
          end_at: '20220704T104000+0200',
          chair: 'Jeroen Beeckman',
          title: 'Plenary session',
          room: 'Refectory'
        },
        '41A': {
          start_at: '20220704T111000+0200',
          end_at: '20220704T123000+0200',
          chair: 'Safa Kasap',
          title: 'Photovoltaics 1 (ICOOPMA)',
          room: 'Refectory'
        },
        '41B': {
          start_at: '20220704T111000+0200',
          end_at: '20220704T123000+0200',
          chair: 'Andries Meijerink',
          title: 'Luminescence (EuroDIM)',
          room: 'Vermeylen'
        },
        '42A': {
          start_at: '20220704T133000+0200',
          end_at: '20220704T165000+0200',
          chair: 'Vincent Rodriguez',
          title: 'Photonics 1: photonic systems (ICOOPMA)',
          room: 'Refectory'
        },
        '42B': {
          start_at: '20220704T133000+0200',
          end_at: '20220704T165000+0200',
          chair: 'Simonpietro Agnello',
          title: 'Wide band-gap materials 1: materials for electronics (EuroDIM)',
          room: 'Vermeylen'
        },
        '51P': {
          start_at: '20220705T090000+0200',
          end_at: '20220705T094000+0200',
          chair: 'Johan Lauwaert',
          title: 'Plenary session',
          room: 'Refectory'
        },
        '51A': {
          start_at: '20220705T094500+0200',
          end_at: '20220705T123000+0200',
          chair: 'Sofie Cambré',
          title: 'Photonics 2 (ICOOPMA)',
          room: 'Refectory'
        },
        '52A': {
          start_at: '20220705T094500+0200',
          end_at: '20220705T115000+0200',
          chair: 'Aleksandr Lushchik',
          title: 'Scattering, spectroscopy and microscopy (EuroDIM)',
          room: 'Vermeylen'
        },
        '52P': {
          start_at: '20220705T133000+0200',
          end_at: '20220705T141000+0200',
          chair: 'Pablo Garcia Fernandez',
          title: 'Plenary session',
          room: 'Refectory'
        },
        '51B': {
          start_at: '20220705T141500+0200',
          end_at: '20220705T170000+0200',
          chair: 'Johan Lauwaert',
          title: 'Photovoltaics 2 (ICOOPMA)',
          room: 'Vermeylen'
        },
        '52B': {
          start_at: '20220705T141500+0200',
          end_at: '20220705T170000+0200',
          chair: 'TBD',
          title: 'Theory and computational modeling (EuroDIM)',
          room: 'Refectory'
        },
        'P1': {
          start_at: '20220705T170000+0200',
          end_at: '20220705T190000+0200',
          chair: null,
          title: 'Poster session 1',
          room: 'Zuidergang'
        },
        '61P': {
          start_at: '20220706T090000+0200',
          end_at: '20220706T094000+0200',
          chair: 'Dirk Poelman',
          title: 'Plenary session',
          room: 'Refectory'
        },
        '61A': {
          start_at: '20220706T094500+0200',
          end_at: '20220706T130000+0200',
          chair: 'Zelia Macedo',
          title: 'Luminescent materials (ICOOPMA)',
          room: 'Refectory'
        },
        '61B': {
          start_at: '20220706T094500+0200',
          end_at: '20220706T125000+0200',
          chair: 'Mario Valerio',
          title: '2D-1D materials and nanocrystals (EuroDIM)',
          room: 'Vermeylen'
        },
        '71P': {
          start_at: '20220707T090000+0200',
          end_at: '20220707T090000+0200',
          chair: '',
          title: 'Plenary session',
          room: 'Refectory'
        },
        '71A': {
          start_at: '20220707T090000+0200',
          end_at: '20220707T124000+0200',
          chair: 'Iwan Moreels',
          title: 'Nanoparticles - nanocrystals - quantumdots (ICOOPMA)',
          room: 'Refectory'
        },
        '71B': {
          start_at: '20220707T090000+0200',
          end_at: '20220707T124000+0200',
          chair: 'Yuriy Zorenko',
          title: 'Scintillators (EuroDIM)',
          room: 'Vermeylen'
        },
        '72P': {
          start_at: '20220707T133000+0200',
          end_at: '20220707T141000+0200',
          chair: 'Dirk Poelman',
          title: 'Plenary session',
          room: 'Refectory'
        },
        '72A': {
          start_at: '20220707T141500+0200',
          end_at: '20220707T170000+0200',
          chair: 'Eduardo Yukihara and Robert Jackson',
          title: 'Radiation detection and dosimetry (EuroDIM)',
          room: 'Vermeylen'
        },
        '72B': {
          start_at: '20220707T141500+0200',
          end_at: '20220707T170000+0200',
          chair: 'Virginie Nazabal',
          title: 'Sensors 1 (ICOOPMA)',
          room: 'Refectory'
        },
        'P2': {
          start_at: '20220707T170000+0200',
          end_at: '20220707T190000+0200',
          chair: null,
          title: 'Poster session 2',
          room: 'Zuidergang'
        },
        '81A': {
          start_at: '20220708T090000+0200',
          end_at: '20220708T122000+0200',
          chair: 'Michele Back',
          title: 'Sensors 2 (ICOOPMA)',
          room: 'Refectory'
        },
        '81B': {
          start_at: '20220708T090000+0200',
          end_at: '20220708T122000+0200',
          chair: 'Lászlo Kovács',
          title: 'Wide band-gap materials 2: oxides - ceramics (EuroDIM)',
          room: 'Vermeylen'
        }
      }
    }
  },
  template: '#v-program',
  computed: _.extend(
    Vuex.mapState(['event', 'contents', 'abstracts']), {
    custom_sessions: function () {
      return _.mapObject(this.sessions, function (val, key) {
        val._start_at = getMoment(val.start_at);
        val._end_at = getMoment(val.end_at);
        return val;
      });
    },
    filtered_abstracts: function () {
      if (!this.abstracts || !this.abstracts.length) return [];
      var q = this.q.toLowerCase();
      return this.abstracts.filter(function (obj) {
        return obj._q.indexOf(q) >= 0;
      });
    },
    abstracts_per_session: function () {
      var self = this;
      var data = _.groupBy(this.filtered_abstracts, function (obj) {
        return obj.custom_data.session;
      });
      _.each(data, function (value, key) {
        data[key] = _.sortBy(value, function (obj) {
          return obj.custom_data.talk;
        });
      });
      return data;
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

var SpeakersView = {
  template: '#v-speakers',
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
      name: 'committee',
      path: '/organizing-committee/',
      pathToRegexpOptions: {strict: true},
      component: CommitteeView
    },
    {
      name: 'proceedings',
      path: '/proceedings/',
      pathToRegexpOptions: {strict: true},
      component: ProceedingsView
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
      name: 'speakers',
      path: '/speakers/',
      pathToRegexpOptions: {strict: true},
      component: SpeakersView
    },
    {
      name: 'sponsors-call',
      path: '/call-for-sponsors/',
      pathToRegexpOptions: {strict: true},
      component: SponsorsCallView
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
    this.$store.commit('getAbstracts');
    this.$q.loading.show({
      delay: 1000
    });
  }
});
