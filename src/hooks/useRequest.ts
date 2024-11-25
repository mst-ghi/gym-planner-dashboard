import { useState } from 'react';
import { showNotification } from '@mantine/notifications';
import { API_URL, Envs, getCookie, urlQueryString } from '@/utils';

const useRequest = () => {
  const [calling, setCalling] = useState(false);

  const getAuthHeaders = (headers: any = {}) => {
    const accTkn = getCookie('acc-tkn');
    if (accTkn) {
      headers['Authorization'] = `Bearer ${accTkn}`;
    }

    const workKey = getCookie('work-key') || Envs.app.workKey;
    if (workKey) {
      headers['x-work-key'] = workKey;
    }

    headers['x-app-type'] = Envs.app.type;
    headers['x-timezone'] = Intl.DateTimeFormat().resolvedOptions().timeZone;

    return headers;
  };

  const getBaseHeaders = (init?: any) => {
    let headers = init || {};

    if (!headers['Content-Type']) {
      headers['Content-Type'] = 'application/json';
    }

    if (!headers['accept']) {
      headers['accept'] = 'application/json';
    }

    return getAuthHeaders(headers);
  };

  const callRequest = async <T>(
    method: TMakeRequestMethods = 'GET',
    path: string,
    init?: {
      body?: any;
      params?: any;
      headers?: any;
      tags?: string[];
    },
  ): Promise<ICallRequestResponse & T> => {
    setCalling(true);

    const headers = getBaseHeaders(init?.headers);
    let body = undefined;

    if (init?.body) {
      body = JSON.stringify(init?.body);
    }

    let url = `${API_URL}${path}`;

    if (init?.params) {
      url += '?' + urlQueryString(init.params);
    }

    return fetch(url, {
      method,
      body,
      headers,
      redirect: 'manual',
      next: {
        revalidate: 360, // 6 minutes
        tags: init?.tags,
      },
    })
      .then(async (res) => {
        let success;
        let unprocessable;
        let internalError = !res.ok;
        let message;
        let data: any = {};
        let errors: any = {};
        let meta: any = {};

        internalError = res.status >= 500 && res.status < 600;
        success = res.status === 200;
        unprocessable = res.status === 422;

        try {
          let response = await res.json();

          data = response || {};
          message = response.message;
          errors = response.errors || {};
          meta = response.meta || {};
        } catch (err) {
          console.error('err', err);
        }

        return {
          ...data,
          errors,
          meta,
          message,
          success,
          unprocessable,
          internalError,
        };
      })
      .catch(() => {
        showNotification({
          color: 'red',
          title: 'Internal Server Error',
          message: 'Please contact the relevant support team',
        });
      })
      .finally(() => {
        setCalling(false);
      });
  };

  const fetchUser = async () => {
    let user;
    setCalling(true);

    try {
      const response = await callRequest<{ user: IUser }>('GET', '/api/v1/auth/user');

      if (response.success) {
        user = response.user;
      }
    } catch (error) {
      console.log('fetch user', error);
    }

    setCalling(false);
    return user;
  };

  return {
    apiUrl: API_URL,
    calling,
    getAuthHeaders,
    getBaseHeaders,
    callRequest,
    fetchUser,
  };
};

export default useRequest;
