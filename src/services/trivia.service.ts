import { computed } from 'vue';
import axios, { AxiosPromise } from 'axios';
import { TriviaParams } from '@/types/trivia';

const BASE_URL = 'https://opentdb.com'; // normally store in .env file

export const getToken = (): AxiosPromise => {
    return axios.get(`${BASE_URL}/api_token.php`, {
        params: {
            command: 'request',
        },
    });
};

export const getCategories = (token: string): AxiosPromise => {
    return axios.get(`${BASE_URL}/api_category.php`, {
        params: {
            token,
        },
    });
};

export const getQuestions = (token: string, params: TriviaParams): AxiosPromise => {
    return axios.get(`${BASE_URL}/api.php`, {
        params: {
            token,
            amount: 5,
            type: 'boolean',
            ...params,
        },
    });
};
