export const serverUrl = '/api';
export const localUrl = 'http://localhost:5000';

const MODE = 'production';

export const api_url = MODE === 'production' ? serverUrl : localUrl