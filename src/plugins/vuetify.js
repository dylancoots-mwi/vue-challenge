/**
 * plugins/vuetify.js
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'
import '@vuepic/vue-datepicker/dist/main.css'

// Components
import VueDatePicker from '@vuepic/vue-datepicker';

// Composables
import { createVuetify } from 'vuetify'
import TimeRange from '@/components/TimeRange.vue'

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
  theme: {
    themes: {
      light: {
        colors: {
          primary: '#1867C0',
          secondary: '#5CBBF6',
        },
      },
    },
  },
  components: {
    'v-date-time-picker': VueDatePicker,
    'v-time-range': TimeRange
  }
})
