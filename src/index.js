import knot from './knot';

const DEFAULT_OPTS = {
  partially: false,
}

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
    if (this.checkVisible()) {
      this.emit('visible');
    } else {
      this.emit('invisible');
    }

    if (this.checkComeOutFromTop()) {
      this.emit('come-out-from-top');
    }
    if (this.checkComeOutFromBottom()) {
      this.emit('come-out-from-bottom');
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

  checkComeOutFromTop() {
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

  checkComeOutFromBottom() {
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
}

const Decorated = knot(WebSight);

export default Decorated;
