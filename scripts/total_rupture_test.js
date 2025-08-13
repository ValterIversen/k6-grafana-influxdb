import http from 'k6/http';
import { check } from 'k6';

let totalRequests = 0;
let totalFails = 0;

export const options = {
  scenarios: {
    ruptura: {
      executor: 'externally-controlled',
      vus: 1,
      maxVUs: 100000,
      duration: '5m',
    },
  },
};


export default function () {
  totalRequests++;

  const res = http.get('https://seuservico.com/api');

  const ok = check(res, {
    'status é 200': (r) => r.status === 200,
  });

  if (!ok) {
    totalFails++;
  }

  if (totalFails === totalRequests && totalRequests > 0) {
    throw new Error('100% das requisições falharam. Parando o teste!');
  }
}
