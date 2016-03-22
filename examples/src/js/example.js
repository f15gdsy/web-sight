import WebSight from './web-sight';

const el = document.querySelector('#target');
const ws = new WebSight(el, {
  partially: true,
});

ws.on('come-out-from-top', () => {
  console.log('come out from top');
}).on('come-out-from-bottom', () => {
  console.log('come out from bottom');
}).on('visible', () => {
  console.log('visible');
}).on('invisible', () => {
  console.log('invisible');
});
