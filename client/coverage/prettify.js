/* eslint-disable */
window.PR_SHOULD_USE_CONTINUATION = true;
(function () {
  let h = ['break,continue,do,else,for,if,return,while'];
  let u = [
    h,
    'auto,case,char,const,default,double,enum,extern,float,goto,int,long,register,short,signed,sizeof,static,struct,switch,typedef,union,unsigned,void,volatile',
  ];
  let p = [u, 'catch,class,delete,false,import,new,operator,private,protected,public,this,throw,true,try,typeof'];
  let l = [
    p,
    'alignof,align_union,asm,axiom,bool,concept,concept_map,const_cast,constexpr,decltype,dynamic_cast,explicit,export,friend,inline,late_check,mutable,namespace,nullptr,reinterpret_cast,static_assert,static_cast,template,typeid,typename,using,virtual,where',
  ];
  let x = [
    p,
    'abstract,boolean,byte,extends,final,finally,implements,import,instanceof,null,native,package,strictfp,super,synchronized,throws,transient',
  ];
  let R = [
    x,
    'as,base,by,checked,decimal,delegate,descending,dynamic,event,fixed,foreach,from,group,implicit,in,interface,internal,into,is,lock,object,out,override,orderby,params,partial,readonly,ref,sbyte,sealed,stackalloc,string,select,uint,ulong,unchecked,unsafe,ushort,let',
  ];
  let r =
    'all,and,by,catch,class,else,extends,false,finally,for,if,in,is,isnt,loop,new,no,not,null,of,off,on,or,return,super,then,true,try,unless,until,when,while,yes';
  let w = [p, 'debugger,eval,export,function,get,null,set,undefined,let,with,Infinity,NaN'];
  let s =
    'caller,delete,die,do,dump,elsif,eval,exit,foreach,for,goto,if,import,last,local,my,next,no,our,print,package,redo,require,sub,undef,unless,until,use,wantarray,while,BEGIN,END';
  let I = [
    h,
    'and,as,assert,class,def,del,elif,except,exec,finally,from,global,import,in,is,lambda,nonlocal,not,or,pass,print,raise,try,with,yield,False,True,None',
  ];
  let f = [
    h,
    'alias,and,begin,case,class,def,defined,elsif,end,ensure,false,in,module,next,nil,not,or,redo,rescue,retry,self,super,then,true,undef,unless,until,when,yield,BEGIN,END',
  ];
  let H = [h, 'case,done,elif,esac,eval,fi,function,in,local,set,then,until'];
  let A = [l, R, w, s + I, f, H];
  let e =
    /^(DIR|FILE|vector|(de|priority_)?queue|list|stack|(const_)?iterator|(multi)?(set|map)|bitset|u?(int|float)\d*)/;
  let C = 'str';
  let z = 'kwd';
  let j = 'com';
  let O = 'typ';
  let G = 'lit';
  let L = 'pun';
  let F = 'pln';
  let m = 'tag';
  let E = 'dec';
  let J = 'src';
  let P = 'atn';
  let n = 'atv';
  let N = 'nocode';
  let M =
    '(?:^^\\.?|[+-]|\\!|\\!=|\\!==|\\#|\\%|\\%=|&|&&|&&=|&=|\\(|\\*|\\*=|\\+=|\\,|\\-=|\\->|\\/|\\/=|:|::|\\;|<|<<|<<=|<=|=|==|===|>|>=|>>|>>=|>>>|>>>=|\\?|\\@|\\[|\\^|\\^=|\\^\\^|\\^\\^=|\\{|\\||\\|=|\\|\\||\\|\\|=|\\~|break|case|continue|delete|do|else|finally|instanceof|return|throw|try|typeof)\\s*';
  function k(Z) {
    let ad = 0;
    let S = false;
    let ac = false;
    for (let V = 0, U = Z.length; V < U; ++V) {
      let ae = Z[V];
      if (ae.ignoreCase) {
        ac = true;
      } else {
        if (/[a-z]/i.test(ae.source.replace(/\\u[0-9a-f]{4}|\\x[0-9a-f]{2}|\\[^ux]/gi, ''))) {
          S = true;
          ac = false;
          break;
        }
      }
    }
    let Y = { b: 8, t: 9, n: 10, v: 11, f: 12, r: 13 };
    function ab(ah) {
      let ag = ah.charCodeAt(0);
      if (ag !== 92) {
        return ag;
      }
      let af = ah.charAt(1);
      ag = Y[af];
      if (ag) {
        return ag;
      } else {
        if ('0' <= af && af <= '7') {
          return parseInt(ah.substring(1), 8);
        } else {
          if (af === 'u' || af === 'x') {
            return parseInt(ah.substring(2), 16);
          } else {
            return ah.charCodeAt(1);
          }
        }
      }
    }
    function T(af) {
      if (af < 32) {
        return (af < 16 ? '\\x0' : '\\x') + af.toString(16);
      }
      let ag = String.fromCharCode(af);
      if (ag === '\\' || ag === '-' || ag === '[' || ag === ']') {
        ag = '\\' + ag;
      }
      return ag;
    }
    function X(am) {
      let aq = am
        .substring(1, am.length - 1)
        .match(
          new RegExp(
            '\\\\u[0-9A-Fa-f]{4}|\\\\x[0-9A-Fa-f]{2}|\\\\[0-3][0-7]{0,2}|\\\\[0-7]{1,2}|\\\\[\\s\\S]|-|[^-\\\\]',
            'g'
          )
        );
      let ak = [];
      let af = [];
      let ao = aq[0] === '^';
      for (let ar = ao ? 1 : 0, aj = aq.length; ar < aj; ++ar) {
        let ah = aq[ar];
        if (/\\[bdsw]/i.test(ah)) {
          ak.push(ah);
        } else {
          let ag = ab(ah);
          let al;
          if (ar + 2 < aj && '-' === aq[ar + 1]) {
            al = ab(aq[ar + 2]);
            ar += 2;
          } else {
            al = ag;
          }
          af.push([ag, al]);
          if (!(al < 65 || ag > 122)) {
            if (!(al < 65 || ag > 90)) {
              af.push([Math.max(65, ag) | 32, Math.min(al, 90) | 32]);
            }
            if (!(al < 97 || ag > 122)) {
              af.push([Math.max(97, ag) & ~32, Math.min(al, 122) & ~32]);
            }
          }
        }
      }
      af.sort(function (av, au) {
        return av[0] - au[0] || au[1] - av[1];
      });
      let ai = [];
      let ap = [NaN, NaN];
      for (let ar = 0; ar < af.length; ++ar) {
        let at = af[ar];
        if (at[0] <= ap[1] + 1) {
          ap[1] = Math.max(ap[1], at[1]);
        } else {
          ai.push((ap = at));
        }
      }
      let an = ['['];
      if (ao) {
        an.push('^');
      }
      an.push.apply(an, ak);
      for (let ar = 0; ar < ai.length; ++ar) {
        let at = ai[ar];
        an.push(T(at[0]));
        if (at[1] > at[0]) {
          if (at[1] + 1 > at[0]) {
            an.push('-');
          }
          an.push(T(at[1]));
        }
      }
      an.push(']');
      return an.join('');
    }
    function W(al) {
      let aj = al.source.match(
        new RegExp(
          '(?:\\[(?:[^\\x5C\\x5D]|\\\\[\\s\\S])*\\]|\\\\u[A-Fa-f0-9]{4}|\\\\x[A-Fa-f0-9]{2}|\\\\[0-9]+|\\\\[^ux0-9]|\\(\\?[:!=]|[\\(\\)\\^]|[^\\x5B\\x5C\\(\\)\\^]+)',
          'g'
        )
      );
      let ah = aj.length;
      let an = [];
      for (let ak = 0, am = 0; ak < ah; ++ak) {
        let ag = aj[ak];
        if (ag === '(') {
          ++am;
        } else {
          if ('\\' === ag.charAt(0)) {
            let af = +ag.substring(1);
            if (af && af <= am) {
              an[af] = -1;
            }
          }
        }
      }
      for (let ak = 1; ak < an.length; ++ak) {
        if (-1 === an[ak]) {
          an[ak] = ++ad;
        }
      }
      for (let ak = 0, am = 0; ak < ah; ++ak) {
        let ag = aj[ak];
        if (ag === '(') {
          ++am;
          if (an[am] === undefined) {
            aj[ak] = '(?:';
          }
        } else {
          if ('\\' === ag.charAt(0)) {
            let af = +ag.substring(1);
            if (af && af <= am) {
              aj[ak] = '\\' + an[am];
            }
          }
        }
      }
      for (let ak = 0, am = 0; ak < ah; ++ak) {
        if ('^' === aj[ak] && '^' !== aj[ak + 1]) {
          aj[ak] = '';
        }
      }
      if (al.ignoreCase && S) {
        for (let ak = 0; ak < ah; ++ak) {
          let ag = aj[ak];
          let ai = ag.charAt(0);
          if (ag.length >= 2 && ai === '[') {
            aj[ak] = X(ag);
          } else {
            if (ai !== '\\') {
              aj[ak] = ag.replace(/[a-zA-Z]/g, function (ao) {
                let ap = ao.charCodeAt(0);
                return '[' + String.fromCharCode(ap & ~32, ap | 32) + ']';
              });
            }
          }
        }
      }
      return aj.join('');
    }
    let aa = [];
    for (let V = 0, U = Z.length; V < U; ++V) {
      let ae = Z[V];
      if (ae.global || ae.multiline) {
        throw new Error('' + ae);
      }
      aa.push('(?:' + W(ae) + ')');
    }
    return new RegExp(aa.join('|'), ac ? 'gi' : 'g');
  }
  function a(V) {
    let U = /(?:^|\s)nocode(?:\s|$)/;
    let X = [];
    let T = 0;
    let Z = [];
    let W = 0;
    let S;
    if (V.currentStyle) {
      S = V.currentStyle.whiteSpace;
    } else {
      if (window.getComputedStyle) {
        S = document.defaultView.getComputedStyle(V, null).getPropertyValue('white-space');
      }
    }
    let Y = S && 'pre' === S.substring(0, 3);
    function aa(ab) {
      switch (ab.nodeType) {
        case 1:
          if (U.test(ab.className)) {
            return;
          }
          for (let ae = ab.firstChild; ae; ae = ae.nextSibling) {
            aa(ae);
          }
          let ad = ab.nodeName;
          if ('BR' === ad || 'LI' === ad) {
            X[W] = '\n';
            Z[W << 1] = T++;
            Z[(W++ << 1) | 1] = ab;
          }
          break;
        case 3:
        case 4:
          let ac = ab.nodeValue;
          if (ac.length) {
            if (!Y) {
              ac = ac.replace(/[ \t\r\n]+/g, ' ');
            } else {
              ac = ac.replace(/\r\n?/g, '\n');
            }
            X[W] = ac;
            Z[W << 1] = T;
            T += ac.length;
            Z[(W++ << 1) | 1] = ab;
          }
          break;
      }
    }
    aa(V);
    return { sourceCode: X.join('').replace(/\n$/, ''), spans: Z };
  }
  function B(S, U, W, T) {
    if (!U) {
      return;
    }
    let V = { sourceCode: U, basePos: S };
    W(V);
    T.push.apply(T, V.decorations);
  }
  let v = /\S/;
  function o(S) {
    let V = undefined;
    for (let U = S.firstChild; U; U = U.nextSibling) {
      let T = U.nodeType;
      V = T === 1 ? (V ? S : U) : T === 3 ? (v.test(U.nodeValue) ? S : V) : V;
    }
    return V === S ? undefined : V;
  }
  function g(U, T) {
    let S = {};
    let V;
    (function () {
      let ad = U.concat(T);
      let ah = [];
      let ag = {};
      for (let ab = 0, Z = ad.length; ab < Z; ++ab) {
        let Y = ad[ab];
        let ac = Y[3];
        if (ac) {
          for (let ae = ac.length; --ae >= 0; ) {
            S[ac.charAt(ae)] = Y;
          }
        }
        let af = Y[1];
        let aa = '' + af;
        if (!ag.hasOwnProperty(aa)) {
          ah.push(af);
          ag[aa] = null;
        }
      }
      ah.push(/[\0-\uffff]/);
      V = k(ah);
    })();
    let X = T.length;
    let W = function (ah) {
      let Z = ah.sourceCode,
        Y = ah.basePos;
      let ad = [Y, F];
      let af = 0;
      let an = Z.match(V) || [];
      let aj = {};
      for (let ae = 0, aq = an.length; ae < aq; ++ae) {
        let ag = an[ae];
        let ap = aj[ag];
        let ai = void 0;
        let am;
        if (typeof ap === 'string') {
          am = false;
        } else {
          let aa = S[ag.charAt(0)];
          if (aa) {
            ai = ag.match(aa[1]);
            ap = aa[0];
          } else {
            for (let ao = 0; ao < X; ++ao) {
              aa = T[ao];
              ai = ag.match(aa[1]);
              if (ai) {
                ap = aa[0];
                break;
              }
            }
            if (!ai) {
              ap = F;
            }
          }
          am = ap.length >= 5 && 'lang-' === ap.substring(0, 5);
          if (am && !(ai && typeof ai[1] === 'string')) {
            am = false;
            ap = J;
          }
          if (!am) {
            aj[ag] = ap;
          }
        }
        let ab = af;
        af += ag.length;
        if (!am) {
          ad.push(Y + ab, ap);
        } else {
          let al = ai[1];
          let ak = ag.indexOf(al);
          let ac = ak + al.length;
          if (ai[2]) {
            ac = ag.length - ai[2].length;
            ak = ac - al.length;
          }
          let ar = ap.substring(5);
          B(Y + ab, ag.substring(0, ak), W, ad);
          B(Y + ab + ak, al, q(ar, al), ad);
          B(Y + ab + ac, ag.substring(ac), W, ad);
        }
      }
      ah.decorations = ad;
    };
    return W;
  }
  function i(T) {
    let W = [],
      S = [];
    if (T.tripleQuotedStrings) {
      W.push([
        C,
        /^(?:\'\'\'(?:[^\'\\]|\\[\s\S]|\'{1,2}(?=[^\']))*(?:\'\'\'|$)|\"\"\"(?:[^\"\\]|\\[\s\S]|\"{1,2}(?=[^\"]))*(?:\"\"\"|$)|\'(?:[^\\\']|\\[\s\S])*(?:\'|$)|\"(?:[^\\\"]|\\[\s\S])*(?:\"|$))/,
        null,
        '\'"',
      ]);
    } else {
      if (T.multiLineStrings) {
        W.push([
          C,
          /^(?:\'(?:[^\\\']|\\[\s\S])*(?:\'|$)|\"(?:[^\\\"]|\\[\s\S])*(?:\"|$)|\`(?:[^\\\`]|\\[\s\S])*(?:\`|$))/,
          null,
          '\'"`',
        ]);
      } else {
        W.push([C, /^(?:\'(?:[^\\\'\r\n]|\\.)*(?:\'|$)|\"(?:[^\\\"\r\n]|\\.)*(?:\"|$))/, null, '"\'']);
      }
    }
    if (T.verbatimStrings) {
      S.push([C, /^@\"(?:[^\"]|\"\")*(?:\"|$)/, null]);
    }
    let Y = T.hashComments;
    if (Y) {
      if (T.cStyleComments) {
        if (Y > 1) {
          W.push([j, /^#(?:##(?:[^#]|#(?!##))*(?:###|$)|.*)/, null, '#']);
        } else {
          W.push([
            j,
            /^#(?:(?:define|elif|else|endif|error|ifdef|include|ifndef|line|pragma|undef|warning)\b|[^\r\n]*)/,
            null,
            '#',
          ]);
        }
        S.push([C, /^<(?:(?:(?:\.\.\/)*|\/?)(?:[\w-]+(?:\/[\w-]+)+)?[\w-]+\.h|[a-z]\w*)>/, null]);
      } else {
        W.push([j, /^#[^\r\n]*/, null, '#']);
      }
    }
    if (T.cStyleComments) {
      S.push([j, /^\/\/[^\r\n]*/, null]);
      S.push([j, /^\/\*[\s\S]*?(?:\*\/|$)/, null]);
    }
    if (T.regexLiterals) {
      let X = '/(?=[^/*])(?:[^/\\x5B\\x5C]|\\x5C[\\s\\S]|\\x5B(?:[^\\x5C\\x5D]|\\x5C[\\s\\S])*(?:\\x5D|$))+/';
      S.push(['lang-regex', new RegExp('^' + M + '(' + X + ')')]);
    }
    let V = T.types;
    if (V) {
      S.push([O, V]);
    }
    let U = ('' + T.keywords).replace(/^ | $/g, '');
    if (U.length) {
      S.push([z, new RegExp('^(?:' + U.replace(/[\s,]+/g, '|') + ')\\b'), null]);
    }
    W.push([F, /^\s+/, null, ' \r\n\t\xA0']);
    S.push(
      [G, /^@[a-z_$][a-z_$@0-9]*/i, null],
      [O, /^(?:[@_]?[A-Z]+[a-z][A-Za-z_$@0-9]*|\w+_t\b)/, null],
      [F, /^[a-z_$][a-z_$@0-9]*/i, null],
      [
        G,
        new RegExp('^(?:0x[a-f0-9]+|(?:\\d(?:_\\d+)*\\d*(?:\\.\\d*)?|\\.\\d\\+)(?:e[+\\-]?\\d+)?)[a-z]*', 'i'),
        null,
        '0123456789',
      ],
      [F, /^\\[\s\S]?/, null],
      [L, /^.[^\s\w\.$@\'\"\`\/\#\\]*/, null]
    );
    return g(W, S);
  }
  let K = i({ keywords: A, hashComments: true, cStyleComments: true, multiLineStrings: true, regexLiterals: true });
  function Q(V, ag) {
    let U = /(?:^|\s)nocode(?:\s|$)/;
    let ab = /\r\n?|\n/;
    let ac = V.ownerDocument;
    let S;
    if (V.currentStyle) {
      S = V.currentStyle.whiteSpace;
    } else {
      if (window.getComputedStyle) {
        S = ac.defaultView.getComputedStyle(V, null).getPropertyValue('white-space');
      }
    }
    let Z = S && 'pre' === S.substring(0, 3);
    let af = ac.createElement('LI');
    while (V.firstChild) {
      af.appendChild(V.firstChild);
    }
    let W = [af];
    function ae(al) {
      switch (al.nodeType) {
        case 1:
          if (U.test(al.className)) {
            break;
          }
          if ('BR' === al.nodeName) {
            ad(al);
            if (al.parentNode) {
              al.parentNode.removeChild(al);
            }
          } else {
            for (let an = al.firstChild; an; an = an.nextSibling) {
              ae(an);
            }
          }
          break;
        case 3:
        case 4:
          if (Z) {
            let am = al.nodeValue;
            let aj = am.match(ab);
            if (aj) {
              let ai = am.substring(0, aj.index);
              al.nodeValue = ai;
              let ah = am.substring(aj.index + aj[0].length);
              if (ah) {
                let ak = al.parentNode;
                ak.insertBefore(ac.createTextNode(ah), al.nextSibling);
              }
              ad(al);
              if (!ai) {
                al.parentNode.removeChild(al);
              }
            }
          }
          break;
      }
    }
    function ad(ak) {
      while (!ak.nextSibling) {
        ak = ak.parentNode;
        if (!ak) {
          return;
        }
      }
      function ai(al, ar) {
        let aq = ar ? al.cloneNode(false) : al;
        let ao = al.parentNode;
        if (ao) {
          let ap = ai(ao, 1);
          let an = al.nextSibling;
          ap.appendChild(aq);
          for (let am = an; am; am = an) {
            an = am.nextSibling;
            ap.appendChild(am);
          }
        }
        return aq;
      }
      let ah = ai(ak.nextSibling, 0);
      for (let aj; (aj = ah.parentNode) && aj.nodeType === 1; ) {
        ah = aj;
      }
      W.push(ah);
    }
    for (let Y = 0; Y < W.length; ++Y) {
      ae(W[Y]);
    }
    if (ag === (ag | 0)) {
      W[0].setAttribute('value', ag);
    }
    let aa = ac.createElement('OL');
    aa.className = 'linenums';
    let X = Math.max(0, (ag - 1) | 0) || 0;
    for (let Y = 0, T = W.length; Y < T; ++Y) {
      af = W[Y];
      af.className = 'L' + ((Y + X) % 10);
      if (!af.firstChild) {
        af.appendChild(ac.createTextNode('\xA0'));
      }
      aa.appendChild(af);
    }
    V.appendChild(aa);
  }
  function D(ac) {
    let aj = /\bMSIE\b/.test(navigator.userAgent);
    let am = /\n/g;
    let al = ac.sourceCode;
    let an = al.length;
    let V = 0;
    let aa = ac.spans;
    let T = aa.length;
    let ah = 0;
    let X = ac.decorations;
    let Y = X.length;
    let Z = 0;
    X[Y] = an;
    let ar, aq;
    for (aq = ar = 0; aq < Y; ) {
      if (X[aq] !== X[aq + 2]) {
        X[ar++] = X[aq++];
        X[ar++] = X[aq++];
      } else {
        aq += 2;
      }
    }
    Y = ar;
    for (aq = ar = 0; aq < Y; ) {
      let at = X[aq];
      let ab = X[aq + 1];
      let W = aq + 2;
      while (W + 2 <= Y && X[W + 1] === ab) {
        W += 2;
      }
      X[ar++] = at;
      X[ar++] = ab;
      aq = W;
    }
    Y = X.length = ar;
    let ae = null;
    while (ah < T) {
      let af = aa[ah];
      let S = aa[ah + 2] || an;
      let ag = X[Z];
      let ap = X[Z + 2] || an;
      let W = Math.min(S, ap);
      let ak = aa[ah + 1];
      let U;
      if (ak.nodeType !== 1 && (U = al.substring(V, W))) {
        if (aj) {
          U = U.replace(am, '\r');
        }
        ak.nodeValue = U;
        let ai = ak.ownerDocument;
        let ao = ai.createElement('SPAN');
        ao.className = X[Z + 1];
        let ad = ak.parentNode;
        ad.replaceChild(ao, ak);
        ao.appendChild(ak);
        if (V < S) {
          aa[ah + 1] = ak = ai.createTextNode(al.substring(W, S));
          ad.insertBefore(ak, ao.nextSibling);
        }
      }
      V = W;
      if (V >= S) {
        ah += 2;
      }
      if (V >= ap) {
        Z += 2;
      }
    }
  }
  let t = {};
  function c(U, V) {
    for (let S = V.length; --S >= 0; ) {
      let T = V[S];
      if (!t.hasOwnProperty(T)) {
        t[T] = U;
      } else {
        if (window.console) {
          console.warn('cannot override language handler %s', T);
        }
      }
    }
  }
  function q(T, S) {
    if (!(T && t.hasOwnProperty(T))) {
      T = /^\s*</.test(S) ? 'default-markup' : 'default-code';
    }
    return t[T];
  }
  c(K, ['default-code']);
  c(
    g(
      [],
      [
        [F, /^[^<?]+/],
        [E, /^<!\w[^>]*(?:>|$)/],
        [j, /^<\!--[\s\S]*?(?:-\->|$)/],
        ['lang-', /^<\?([\s\S]+?)(?:\?>|$)/],
        ['lang-', /^<%([\s\S]+?)(?:%>|$)/],
        [L, /^(?:<[%?]|[%?]>)/],
        ['lang-', /^<xmp\b[^>]*>([\s\S]+?)<\/xmp\b[^>]*>/i],
        ['lang-js', /^<script\b[^>]*>([\s\S]*?)(<\/script\b[^>]*>)/i],
        ['lang-css', /^<style\b[^>]*>([\s\S]*?)(<\/style\b[^>]*>)/i],
        ['lang-in.tag', /^(<\/?[a-z][^<>]*>)/i],
      ]
    ),
    ['default-markup', 'htm', 'html', 'mxml', 'xhtml', 'xml', 'xsl']
  );
  c(
    g(
      [
        [F, /^[\s]+/, null, ' \t\r\n'],
        [n, /^(?:\"[^\"]*\"?|\'[^\']*\'?)/, null, '"\''],
      ],
      [
        [m, /^^<\/?[a-z](?:[\w.:-]*\w)?|\/?>$/i],
        [P, /^(?!style[\s=]|on)[a-z](?:[\w:-]*\w)?/i],
        ['lang-uq.val', /^=\s*([^>\'\"\s]*(?:[^>\'\"\s\/]|\/(?=\s)))/],
        [L, /^[=<>\/]+/],
        ['lang-js', /^on\w+\s*=\s*\"([^\"]+)\"/i],
        ['lang-js', /^on\w+\s*=\s*\'([^\']+)\'/i],
        ['lang-js', /^on\w+\s*=\s*([^\"\'>\s]+)/i],
        ['lang-css', /^style\s*=\s*\"([^\"]+)\"/i],
        ['lang-css', /^style\s*=\s*\'([^\']+)\'/i],
        ['lang-css', /^style\s*=\s*([^\"\'>\s]+)/i],
      ]
    ),
    ['in.tag']
  );
  c(g([], [[n, /^[\s\S]+/]]), ['uq.val']);
  c(i({ keywords: l, hashComments: true, cStyleComments: true, types: e }), ['c', 'cc', 'cpp', 'cxx', 'cyc', 'm']);
  c(i({ keywords: 'null,true,false' }), ['json']);
  c(i({ keywords: R, hashComments: true, cStyleComments: true, verbatimStrings: true, types: e }), ['cs']);
  c(i({ keywords: x, cStyleComments: true }), ['java']);
  c(i({ keywords: H, hashComments: true, multiLineStrings: true }), ['bsh', 'csh', 'sh']);
  c(i({ keywords: I, hashComments: true, multiLineStrings: true, tripleQuotedStrings: true }), ['cv', 'py']);
  c(i({ keywords: s, hashComments: true, multiLineStrings: true, regexLiterals: true }), ['perl', 'pl', 'pm']);
  c(i({ keywords: f, hashComments: true, multiLineStrings: true, regexLiterals: true }), ['rb']);
  c(i({ keywords: w, cStyleComments: true, regexLiterals: true }), ['js']);
  c(
    i({
      keywords: r,
      hashComments: 3,
      cStyleComments: true,
      multilineStrings: true,
      tripleQuotedStrings: true,
      regexLiterals: true,
    }),
    ['coffee']
  );
  c(g([], [[C, /^[\s\S]+/]]), ['regex']);
  function d(V) {
    let U = V.langExtension;
    try {
      let S = a(V.sourceNode);
      let T = S.sourceCode;
      V.sourceCode = T;
      V.spans = S.spans;
      V.basePos = 0;
      q(U, T)(V);
      D(V);
    } catch (W) {
      if ('console' in window) {
        console.log(W && W.stack ? W.stack : W);
      }
    }
  }
  function y(W, V, U) {
    let S = document.createElement('PRE');
    S.innerHTML = W;
    if (U) {
      Q(S, U);
    }
    let T = { langExtension: V, numberLines: U, sourceNode: S };
    d(T);
    return S.innerHTML;
  }
  function b(ad) {
    function Y(af) {
      return document.getElementsByTagName(af);
    }
    let ac = [Y('pre'), Y('code'), Y('xmp')];
    let T = [];
    for (let aa = 0; aa < ac.length; ++aa) {
      for (let Z = 0, V = ac[aa].length; Z < V; ++Z) {
        T.push(ac[aa][Z]);
      }
    }
    ac = null;
    let W = Date;
    if (!W.now) {
      W = {
        now: function () {
          return +new Date();
        },
      };
    }
    let X = 0;
    let S;
    let ab = /\blang(?:uage)?-([\w.]+)(?!\S)/;
    let ae = /\bprettyprint\b/;
    function U() {
      let ag = window.PR_SHOULD_USE_CONTINUATION ? W.now() + 250 : Infinity;
      for (; X < T.length && W.now() < ag; X++) {
        let aj = T[X];
        let ai = aj.className;
        if (ai.indexOf('prettyprint') >= 0) {
          let ah = ai.match(ab);
          let am;
          if (!ah && (am = o(aj)) && 'CODE' === am.tagName) {
            ah = am.className.match(ab);
          }
          if (ah) {
            ah = ah[1];
          }
          let al = false;
          for (let ak = aj.parentNode; ak; ak = ak.parentNode) {
            if (
              (ak.tagName === 'pre' || ak.tagName === 'code' || ak.tagName === 'xmp') &&
              ak.className &&
              ak.className.indexOf('prettyprint') >= 0
            ) {
              al = true;
              break;
            }
          }
          if (!al) {
            let af = aj.className.match(/\blinenums\b(?::(\d+))?/);
            af = af ? (af[1] && af[1].length ? +af[1] : true) : false;
            if (af) {
              Q(aj, af);
            }
            S = { langExtension: ah, sourceNode: aj, numberLines: af };
            d(S);
          }
        }
      }
      if (X < T.length) {
        setTimeout(U, 250);
      } else {
        if (ad) {
          ad();
        }
      }
    }
    U();
  }
  window.prettyPrintOne = y;
  window.prettyPrint = b;
  window.PR = {
    createSimpleLexer: g,
    registerLangHandler: c,
    sourceDecorator: i,
    PR_ATTRIB_NAME: P,
    PR_ATTRIB_VALUE: n,
    PR_COMMENT: j,
    PR_DECLARATION: E,
    PR_KEYWORD: z,
    PR_LITERAL: G,
    PR_NOCODE: N,
    PR_PLAIN: F,
    PR_PUNCTUATION: L,
    PR_SOURCE: J,
    PR_STRING: C,
    PR_TAG: m,
    PR_TYPE: O,
  };
})();
PR.registerLangHandler(
  PR.createSimpleLexer(
    [],
    [
      [PR.PR_DECLARATION, /^<!\w[^>]*(?:>|$)/],
      [PR.PR_COMMENT, /^<\!--[\s\S]*?(?:-\->|$)/],
      [PR.PR_PUNCTUATION, /^(?:<[%?]|[%?]>)/],
      ['lang-', /^<\?([\s\S]+?)(?:\?>|$)/],
      ['lang-', /^<%([\s\S]+?)(?:%>|$)/],
      ['lang-', /^<xmp\b[^>]*>([\s\S]+?)<\/xmp\b[^>]*>/i],
      [
        'lang-handlebars',
        /^<script\b[^>]*type\s*=\s*['"]?text\/x-handlebars-template['"]?\b[^>]*>([\s\S]*?)(<\/script\b[^>]*>)/i,
      ],
      ['lang-js', /^<script\b[^>]*>([\s\S]*?)(<\/script\b[^>]*>)/i],
      ['lang-css', /^<style\b[^>]*>([\s\S]*?)(<\/style\b[^>]*>)/i],
      ['lang-in.tag', /^(<\/?[a-z][^<>]*>)/i],
      [PR.PR_DECLARATION, /^{{[#^>/]?\s*[\w.][^}]*}}/],
      [PR.PR_DECLARATION, /^{{&?\s*[\w.][^}]*}}/],
      [PR.PR_DECLARATION, /^{{{>?\s*[\w.][^}]*}}}/],
      [PR.PR_COMMENT, /^{{![^}]*}}/],
    ]
  ),
  ['handlebars', 'hbs']
);
PR.registerLangHandler(
  PR.createSimpleLexer(
    [[PR.PR_PLAIN, /^[ \t\r\n\f]+/, null, ' \t\r\n\f']],
    [
      [PR.PR_STRING, /^\"(?:[^\n\r\f\\\"]|\\(?:\r\n?|\n|\f)|\\[\s\S])*\"/, null],
      [PR.PR_STRING, /^\'(?:[^\n\r\f\\\']|\\(?:\r\n?|\n|\f)|\\[\s\S])*\'/, null],
      ['lang-css-str', /^url\(([^\)\"\']*)\)/i],
      [PR.PR_KEYWORD, /^(?:url|rgb|\!important|@import|@page|@media|@charset|inherit)(?=[^\-\w]|$)/i, null],
      ['lang-css-kw', /^(-?(?:[_a-z]|(?:\\[0-9a-f]+ ?))(?:[_a-z0-9\-]|\\(?:\\[0-9a-f]+ ?))*)\s*:/i],
      [PR.PR_COMMENT, /^\/\*[^*]*\*+(?:[^\/*][^*]*\*+)*\//],
      [PR.PR_COMMENT, /^(?:<!--|-->)/],
      [PR.PR_LITERAL, /^(?:\d+|\d*\.\d+)(?:%|[a-z]+)?/i],
      [PR.PR_LITERAL, /^#(?:[0-9a-f]{3}){1,2}/i],
      [PR.PR_PLAIN, /^-?(?:[_a-z]|(?:\\[\da-f]+ ?))(?:[_a-z\d\-]|\\(?:\\[\da-f]+ ?))*/i],
      [PR.PR_PUNCTUATION, /^[^\s\w\'\"]+/],
    ]
  ),
  ['css']
);
PR.registerLangHandler(
  PR.createSimpleLexer([], [[PR.PR_KEYWORD, /^-?(?:[_a-z]|(?:\\[\da-f]+ ?))(?:[_a-z\d\-]|\\(?:\\[\da-f]+ ?))*/i]]),
  ['css-kw']
);
PR.registerLangHandler(PR.createSimpleLexer([], [[PR.PR_STRING, /^[^\)\"\']+/]]), ['css-str']);
