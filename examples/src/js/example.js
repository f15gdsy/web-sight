import WebSight from './web-sight';

const el = document.querySelector('#target');
const ws = new WebSight(el, {
  partially: true,
});

ws.on('appear-from-top', () => {
  console.log('appear from top');
}).on('appear-from-bottom', () => {
  console.log('appear from bottom');
}).on('visible', () => {
  console.log('visible');
}).on('invisible', () => {
  console.log('invisible');
}).on('appear', () => {
  console.log('appear');
}).on('disappear', () => {
  console.log('disappear');
}).on('disappear-from-top', () => {
  console.log('disappear from top');
}).on('disappear-from-bottom', () => {
  console.log('disappear from bottom');
});
