import http from 'k6/http';
import { test, vu } from 'k6/execution';
import { check } from 'k6';

const stages = [];
for (let i = 1; i <= 1000; i++) {
  stages.push({ duration: '1s', target: i }); // a cada 1s +1 usuário
}

export const options = {
  scenarios: {
    ruptura: {
      executor: 'ramping-vus',
      startVUs: 1,
      stages: stages,
      gracefulStop: '10s',
    },
  },
};

export default function () {
  const res = http.get('https://httpbin.org/get');
  

  const ok = check(res, {
    'status é 200': (r) => r.status === 200,
  });

  if (!ok) {
    console.error(`Falha detectada pelo VU ${vu.idInTest}`);
    test.abort('Encerrando o teste devido à falha!');
  }
}
