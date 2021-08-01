import axios from 'axios';
import { API_KEY } from '../../entities/env';

/* eslint-disable camelcase */
interface FnResponse {
  formatted_address: string;
  place_id: string;
}
interface FnResponse {
  formatted_address: string;
  place_id: string;
}

type FnData = { results: FnResponse[] };

export const searchMap = async (inputAddress: string): Promise<FnData> => {
  const url = `https://maps.googleapis.com/maps/api/js`;
  const parameters = {
    params: {
      address: inputAddress,
      key: API_KEY,
      language: 'ja',
    },
  };
  const res = await axios.get<FnData>(url, parameters);

  return res.data;
};
