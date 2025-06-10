import {createApp} from 'vue'
import './style.css'
import App from './app.vue'
import PrimeVue from 'primevue/config';
import 'primeflex/primeflex.css';
import 'primeicons/primeicons.css';
import Aura from '@primeuix/themes/aura';
import { definePreset } from '@primevue/themes';

const MyPreset = definePreset(Aura, {
    semantic: {
        primary: {
            50: '#111111',
            100: '#1a1a1a',
            200: '#222222',
            300: '#2a2a2a',
            400: '#333333',
            500: '#000000',  // negro puro
            600: '#111111',
            700: '#1a1a1a',
            800: '#2a2a2a',
            900: '#ffffff',  // texto blanco de contraste
            950: '#000000',
        }
    },
    colorScheme: {
        light: {
            formField: {
                hoverHoverColor: '{primary.color}'
            }
        },
        dark: {
            formField: {
                hoverHoverColor: '{primary.color}'
            }
        }
    }
});

import {
    Button,
    Card,
    Checkbox,
    Column,
    ConfirmationService,
    ConfirmDialog,
    DataTable,
    Dialog,
    DialogService,
    Drawer,
    FileUpload,
    FloatLabel,
    IconField,
    InputIcon,
    InputNumber,
    InputText,
    Menu,
    Rating,
    Row,
    Select,
    SelectButton,
    RadioButton,
    Tag,
    Textarea,
    Toast,
    ToastService,
    Toolbar,
    DatePicker
} from "primevue";
import i18n from "./i18n/index.js";
import router from "./router/index.js";

createApp(App)
    .use(PrimeVue, {
        theme: {
            preset: MyPreset,
            options: {
                prefix: 'p',
                darkModeSelector: 'system',
                cssLayer: false
            }
        }
    })
    .use(ConfirmationService)
    .use(DialogService)
    .use(ToastService)
    .component('pv-expiration-date', DatePicker)
    .component('pv-button', Button)
    .component('pv-card', Card)
    .component('pv-column', Column)
    .component('pv-confirm-dialog', ConfirmDialog)
    .component('pv-checkbox', Checkbox)
    .component('pv-data-table', DataTable)
    .component('pv-dialog', Dialog)
    .component('pv-select', Select)
    .component('pv-select-button', SelectButton)
    .component('pv-radio-button', RadioButton)
    .component('pv-file-upload', FileUpload)
    .component('pv-float-label', FloatLabel)
    .component('pv-icon-field', IconField)
    .component('pv-input-icon', InputIcon)
    .component('pv-input-text', InputText)
    .component('pv-input-number', InputNumber)
    .component('pv-menu', Menu)
    .component('pv-rating', Rating)
    .component('pv-row', Row)
    .component('pv-drawer', Drawer)
    .component('pv-tag', Tag)
    .component('pv-textarea', Textarea)
    .component('pv-toolbar', Toolbar)
    .component('pv-toast', Toast)
    .use(i18n)
    .use(router)
    .mount('#app')
