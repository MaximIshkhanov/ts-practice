import { request } from './request';

export const getFirstOptions = async () => request('/first');

export const getSecondOptions = async (payload) => request('/second', payload);
