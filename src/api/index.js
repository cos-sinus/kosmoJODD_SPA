export const serverUrl = 'api';
export const localUrl = 'localhost:5000';

const MODE = 'noproduction';

export const api_url = MODE === 'production' ? serverUrl : localUrl