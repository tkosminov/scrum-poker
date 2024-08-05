import 'charts.css';
import '@mdi/font/css/materialdesignicons.css';
import 'vuetify/styles';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';

export const vuetify = createVuetify({
  components,
  directives,
  theme: {
    defaultTheme: 'light',
    themes: {
      light: {
        dark: false,
        colors: {
          background: '#ffffff',
          surface: '#f4f4f4',
          primary: '#4682b4',
          secondary: '#b78bc7',
          success: '#4caf50',
          info: '#2196f3',
          warning: '#ffc107',
          error: '#ff5252',
        },
      },
    },
  },
});
