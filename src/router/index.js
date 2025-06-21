/**
 * @fileoverview Router configuration for the VEHIX application.
 * Defines the routing structure, navigation guards, and page title management.
 * @module router
 */

import {createRouter, createWebHistory} from "vue-router";
import LogInManagementComponent from "../IAM/pages/log-in-management.component.vue";

const HomeComponent = () => import('../public/pages/home.component.vue');
const LibraryComponent = () => import('../public/pages/library.component.vue');
const MaintenanceComponent = () => import('../public/pages/maintenance.component.vue');
const ProfileComponent = () => import('../public/pages/profile.component.vue');
const SyncComponent = () => import('../public/pages/sync.component.vue');
const TapScanComponent = () => import('../domain/monitoring/pages/tap-scan.vue');
const MechanicComponent = () => import('../domain/monitoring/pages/mechanic.vue');
const AuditComponent = () => import('../domain/assets-and-resource-management/audit/page/audit-page.vue');
const Useful_life = () => import('../domain/analytics/car-usefull-life/pages/useful_life.vue');
const FailureManagementComponent = () => import('../monitoring/pages/failure-management.component.vue');
const PaymentManagementComponent = () => import('../subscriptions/pages/payment-management.component.vue');
const SubscriptionPlanManagementComponent = () => import('../subscriptions/pages/subscription-plan-management.component.vue');
const vehicleRegistrationManagementComponent = () => import('../ARM/pages/vehicle-registration-management.component.vue');
/**
 * Application routes configuration
 * @type {RouteConfig[]}
 * @description Defines all available routes in the application, including
 * - Home page route (/home)
 * - Library page route (/library)
 * - Maintenance page rout (/maintenance)
 * - Profile page route (/profile)
 * - Sync page route (/sync)
 */
const ResourceView = () => import('../assets-and-resources-management/pages/library.component.vue');

const routes = [
    {path: '/login', name: 'log-in-management', component: LogInManagementComponent, meta: {title: 'Login'}},
    {path: '/home', name: 'home', component: HomeComponent, meta: {title: 'Home'}},
    {path: '/library', name: 'library', component: LibraryComponent, meta: {title: 'Library'},},
    {path: '/maintenance', name: 'maintenance', component: MaintenanceComponent, meta: {title: 'Maintenance'}},
    {path: '/profile', name: 'profile', component: ProfileComponent, meta: {title: 'Profile'}},
    {path: '/sync', name: 'sync', component: SyncComponent, meta: {title: 'Sync'}},
    {path: '/diagnostic/tap-scan', name: 'tap-scan', component: TapScanComponent, meta: {title: 'Tap Scan'}},
    {path: '/mechanic', name: 'mechanic', component: MechanicComponent, meta: {title: 'Mechanic Help'}},
    {path: '/diagnostic/audit-page', name: 'audit-page', component: AuditComponent, meta: {title: 'Audit Page'}},
    {path: '/diagnostic/useful_life', name: 'useful_life', component: Useful_life, meta: {title: 'Useful Life'}},
    {path: '/car-failures', name: 'car_failures', component: FailureManagementComponent, meta: {title: 'Failure Management'}},
    {path: '/payment-management', name: 'payment-management', component: PaymentManagementComponent, meta: {title: 'Payment Management'}},
    {path: '/subscriptions', name: 'subscription-plan-management', component: SubscriptionPlanManagementComponent, meta: {title: 'Subscription Plan Management'}},
    {path: '/vehicle-registration-management', name: 'vehicle-registration-management', component: vehicleRegistrationManagementComponent, meta: {title: 'Vehicle Registration Management'}},
    { path: '/technical', name: 'technical', component: ResourceView, props: { titleKey: 'card.technical' }, meta: { title: 'Technical' } },
    { path: '/news', name: 'news', component: ResourceView, props: { titleKey: 'card.news' }, meta: { title: 'News' } },
    { path: '/advances', name: 'advances', component: ResourceView, props: { titleKey: 'card.advances' }, meta: { title: 'Advances' } },
    { path: '/videos', name: 'videos', component: ResourceView, props: { titleKey: 'card.videos' }, meta: { title: 'Videos' } },
    { path: '/manuals', name: 'manuals', component: ResourceView, props: { titleKey: 'card.manuals' }, meta: { title: 'Manuals' } },
    { path: '/recommendations', name: 'recommendations', component: ResourceView, props: { titleKey: 'card.recommendations' }, meta: { title: 'Recommendations' } },

];

/**
 * Vue Router instance configuration
 * @type {import('vue-router').Router}
 * @description Creates and configures the Vue Router instance with HTML5 history mode
 * and the defined routes. Uses the BASE_URL from environment variables for proper
 * base path configuration.
 */
const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: routes,
});

/**
 * Global navigation guard for route transitions
 * @param {import('vue-router').RouteLocationNormalized} to - Target route being navigated to
 * @param {import('vue-router').RouteLocationNormalized} from - Current route being navigated from
 * @param {import('vue-router').NavigationGuardNext} next - Function to resolve the navigation
 * @description Handles pre-navigation tasks:
 * - Logs navigation events for debugging
 * - Updates the document title with the format "ACME Learning Center | [Page Title]"
 */
router.beforeEach((to, from, next) => {
    console.log(`Navigating from ${from.name} to ${to.name}`);
    // Set the page title
    let baseTitle = 'Vehix';
    document.title = `${baseTitle} | ${to.meta['title']}`;
    next();
});

/**
 * @exports router
 * @description Exports the configured Vue Router instance for use in the main application
 */
export default router;