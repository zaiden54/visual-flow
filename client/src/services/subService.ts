import type { SubType } from '../types/subTypes';
import apiService from './config';

const subGetAllService = (offset: number): Promise<SubType> =>
  apiService
    .get<SubType>(`/videos/subs/channels/${offset}`)
    .then(({ data }) => data)
    .catch((err) => Promise.reject(err));

export default subGetAllService;


