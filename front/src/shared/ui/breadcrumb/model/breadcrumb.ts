import { defineStore } from 'pinia';
import { RouteParamsRaw } from 'vue-router';

export interface IBreadcrumb {
  name: string;
  is_current: boolean;
  to?: string;
  params?: RouteParamsRaw;
}

interface IState {
  breadcrumbs: IBreadcrumb[];
}

export const useBreadcrumbModel = defineStore({
  id: 'breadcrumbModel',
  state: (): IState => ({
    breadcrumbs: [],
  }),
  actions: {
    set(breadcrumbs: IBreadcrumb[]) {
      this.breadcrumbs = breadcrumbs;
    },
  },
});
