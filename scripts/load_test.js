import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
  vus: 20, // 20 usuários simultâneos
  duration: '2m', // duração do teste
};

export default function () {
  http.get('https://quickpizza.grafana.com');
  sleep(1);
}
