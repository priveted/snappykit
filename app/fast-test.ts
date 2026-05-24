import './app.css';
import { addClass, append, hide, make, on, prepend, show, text } from '@/utils';

const tHeader = make('div', (th) => {
  const testWrap = make('div', (tw) => {
    addClass(tw, 'snp-test-wrap');
  });

  const tBtn = make('button', (btn) => {
    text(btn, 'Show');
    addClass(btn, 'demo-btn');
    on(btn, 'click.s', () => {
      show(testWrap);
    });
  });

  const tBtnH = make('button', (btn) => {
    text(btn, 'Hide');
    addClass(btn, 'demo-btn');
    on(btn, 'click.h', () => {
      hide(testWrap);
    });
  });

  append(th, [testWrap, tBtn, tBtnH]);
});

prepend(document.body, [tHeader]);
