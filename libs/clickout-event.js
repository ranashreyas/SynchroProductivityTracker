/**
 * clickout-event v1.0.2
 * (c) 2020 Mu-Tsun Tsai
 * Released under the MIT License.
 */
!(function () {
  "use strict";
  const t = "on",
    e = "out",
    n = "target",
    s = "stopList",
    o = "addEventListener",
    i = "setAttribute",
    a = "prototype",
    p = Symbol(e),
    c = Object,
    u = document,
    d = MouseEvent,
    h = HTMLElement,
    l = h[a],
    r = Event[a],
    m = ["click", "dblclick", "mousedown", "mouseup", "touchstart", "touchend"],
    y = new Set(m),
    f = new Set(m.map((t) => t + e)),
    b = new Set(m.map((n) => t + n + e)),
    v = (t, e) => t instanceof e,
    w = (t, e) => t.contains(e),
    E = (t, e) => {
      for (let n of t) e(n);
    },
    g = (n) => {
      v(n, h) &&
        (n[p]
          ? S(n)
          : E(y, (s) => {
              let o = t + s + e,
                a = n.getAttribute(o);
              a && !L(n)[o] && n[i](o, a);
            }),
        E(n.childNodes, g));
    },
    L = (t) => (t[p] = t[p] || {}),
    S = (t) => {
      L(t), k.includes(t) || (k.push(t), (A = !0));
    },
    M = (t, e) => (w(e, t) ? 1 : w(t, e) ? -1 : 0),
    N = (t) => {
      A && (k.sort(M), (A = !1));
      let o = t[n];
      ((t = v(t, d)
        ? new d(t.type + e, c.assign({}, t, { relatedTarget: o }))
        : new TouchEvent(t.type + e, t))[s] = []),
        E(k, (e) => {
          w(e, o) || t[s].some((t) => w(t, e)) || e.dispatchEvent(t);
        });
    },
    P = (t) =>
      function () {
        let e = this,
          o = e.type;
        t.apply(e), y.has(o) && N(e), f.has(o) && e[s].push(e[n]);
      },
    T = (t, e, n) => (t[e] = n(t[e]));
  function j(e) {
    let n = this[p][t + e.type];
    n && n.apply(this, [e]);
  }
  let k = [],
    A = !1;
  E(y, (n) => {
    u[o](n, N);
    let s = t + n + e;
    c.defineProperty(l, s, {
      get() {
        return this[p][s];
      },
      set(t) {
        this[o](n + e, j),
          (this[p][s] = "object" == typeof t ? t.handleEvent : t);
      },
    });
  }),
    T(
      l,
      o,
      (t) =>
        function (...e) {
          f.has(e[0]) && S(this), t.apply(this, e);
        }
    ),
    T(
      l,
      i,
      (t) =>
        function (...e) {
          b.has(e[0]) ? (this[e[0]] = new Function(e[1])) : t.apply(this, e);
        }
    ),
    T(r, "stopPropagation", P),
    T(r, "stopImmediatePropagation", P),
    new MutationObserver((t) => {
      E(t, (t) => {
        E(t.addedNodes, g),
          E(t.removedNodes, (t) => {
            v(t, h) && (k = k.filter((e) => !w(t, e)));
          });
      });
    }).observe(u.documentElement, { childList: !0, subtree: !0 }),
    g(u.body);
})();
