import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
  stages: [
    { duration: '2m', target: 10 }, // sobe para 10 usuários durante 2m
    { duration: '5m', target: 10 }, // mantém 10 usuários durante 5m
    { duration: '2m', target: 0 }, // reduz para 0 usuários durante 2m
  ],
  thresholds: { // para caso atinga os alvos
    http_req_duration: ['p(95)<500'], // 95% das requisições < 500ms
    http_req_failed: ['rate<0.01'],   // taxa de falhas < 1%
  },
};

export default function () {
  http.get('https://quickpizza.grafana.com');
  sleep(1);
}
