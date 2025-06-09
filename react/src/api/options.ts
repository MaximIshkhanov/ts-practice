import { request } from './request';

export const getFirstOptions = async () => request('/first');

type SecondPayload = { id: 1 | 2 | 3 };

export const getSecondOptions = async (payload: SecondPayload) => request('/second', payload);