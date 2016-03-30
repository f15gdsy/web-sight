import knot from './knot';

const DEFAULT_OPTS = {
  partially: false,
}

const EVENTS = {
  APPEAR: 'appear',
  APPEAR_FROM_TOP: 'appear-from-top',
  APPEAR_FROM_BOTTOM: 'appear-from-bottom',
  DISAPPEAR: 'disappear',
  DISAPPEAR_FROM_TOP: 'disappear-from-top',
  DISAPPEAR_FROM_BOTTOM: 'disappear-from-bottom',
  VISIBLE: 'visible',
  INVISIBLE: 'invisible',
};

class WebSight {
  constructor(el, opts = {}) {
    this.el = el;
    this.opts = Object.assign({}, DEFAULT_OPTS, opts);
    this.isScrolling = false;

    this._updateGeo();

    this._init();
  }

  _init() {
    addEventListener('scroll', () => {
      this.isScrolling = true;
    });

    setInterval(() => {
      if (!this.isScrolling) return;

      this.isScrolling = false;

      this._updateBrowserGeo();
      this._updateGeo();
      this._update();
    }, 100);
  }

  _update() {
    let appear = false;
    let disappear = false;

    if (this.checkVisible()) {
      this.emit(EVENTS.VISIBLE);
    } else {
      this.emit(EVENTS.INVISIBLE);
    }

    if (this.checkAppeaerFromTop()) {
      this.emit(EVENTS.APPEAR_FROM_TOP);
      appear = true;
    }
    else if (this.checkAppeaerFromBottom()) {
      this.emit(EVENTS.APPEAR_FROM_BOTTOM);
      appear = true;
    } else if (this.checkDisappearFromTop()) {
      this.emit(EVENTS.DISAPPEAR_FROM_TOP);
      disappear = true;
    } else if (this.checkDisappearFromBottom()) {
      this.emit(EVENTS.DISAPPEAR_FROM_BOTTOM);
      disappear = true;
    }

    if (appear) {
      this.emit(EVENTS.APPEAR);
    } else if (disappear) {
      this.emit(EVENTS.DISAPPEAR);
    }
  }

  _updateGeo() {
    const rect = this.el.getBoundingClientRect();
    const scroll = {
      x: pageXOffset,
      y: pageYOffset,
    };

    const newGeo = {
      viewPos: {
        x: rect.left,
        y: rect.top,
      },
      pos: {
        x: rect.left + scroll.x,
        y: rect.top + scroll.y,
      },
      size: {
        w: rect.width,
        h: rect.height,
      },
    };

    this.prevGeo = this.geo || newGeo;  // For init
    this.geo = newGeo;
  }

  _updateBrowserGeo() {
    this.browserGeo = {
      pos: {
        x: window.pageXOffset,
        y: window.pageYOffset,
      },
      size: {
        w: document.body.clientWidth,
        h: document.body.clientHeight,
      },
      viewSize: {
        w: window.innerWidth,
        h: window.innerHeight,
      },
    };
  }

  checkVisible() {
    const geo = this.geo;
    const prevGeo = this.prevGeo;
    const browserGeo = this.browserGeo;

    if (this.opts.partially) {
      return (geo.viewPos.y + geo.size.h > 0) &&
        (geo.viewPos.y < browserGeo.viewSize.h);
    } else {
      return (geo.viewPos.y > 0) &&
        (geo.viewPos.y + geo.size.h < browserGeo.viewSize.h);
    }
  }

  checkAppeaerFromTop() {
    const geo = this.geo;
    const prevGeo = this.prevGeo;

    if (this.opts.partially) {
      return (geo.viewPos.y + geo.size.h > 0) &&
        (prevGeo.viewPos.y + prevGeo.size.h <= 0);
    } else {
      return (geo.viewPos.y > 0) &&
        (prevGeo.viewPos.y <= 0);
    }
  }

  checkAppeaerFromBottom() {
    const geo = this.geo;
    const prevGeo = this.prevGeo;
    const browserGeo = this.browserGeo;

    if (this.opts.partially) {
      return (geo.viewPos.y < browserGeo.viewSize.h) &&
        (prevGeo.viewPos.y >= browserGeo.viewSize.h);
    } else {
      return (geo.viewPos.y + geo.size.h < browserGeo.viewSize.h) &&
        (prevGeo.viewPos.y + prevGeo.size.h >= browserGeo.viewSize.h);
    }
  }

  checkDisappearFromTop() {
    const geo = this.geo;
    const prevGeo = this.prevGeo;

    if (this.opts.partially) {
      return geo.viewPos.y < 0 && prevGeo.viewPos.y >= 0;
    } else {
      return (geo.viewPos.y + geo.size.h < 0) &&
        (prevGeo.viewPos.y + prevGeo.size.h >= 0);
    }
  }

  checkDisappearFromBottom() {
    const geo = this.geo;
    const prevGeo = this.prevGeo;
    const browserGeo = this.browserGeo;

    if (this.opts.partially) {
      return (geo.viewPos.y + geo.size.h > browserGeo.viewSize.h) &&
        (prevGeo.viewPos.y + prevGeo.size.h <= browserGeo.viewSize.h);
    } else {
      return (geo.viewPos.y > browserGeo.viewSize.h) &&
        (prevGeo.viewPos.y <= browserGeo.viewSize.h);
    }
  }
}

const Decorated = knot(WebSight);

export default Decorated;
