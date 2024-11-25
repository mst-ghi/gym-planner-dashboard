import { cleanUrl } from './helpers';

export const Envs = {
  app: {
    type: 'dashboard',
    workKey: '919f8041-8cfb-4cc3-bc2d-9b75119b9bf7',
    name: 'Gym Planner',
    desc: [
      'The gym training program system is a place to receive personalized workout plans, track progress,',
      'and access exercise guides and professional advice. Achieve your fitness goals with us.',
    ].join(' '),
  },

  api: {
    url: process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:3000',
  },
};

export const API_URL = (() => {
  return cleanUrl(Envs.api.url);
})();
