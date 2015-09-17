// Scriptol.js
// (c) 2014-2015 Scriptol.com - License: Apache 2.0
// Compatibility: ES Harmony.  IE 9.


var scriptol = function() { 
  this.isHTML = true;
}  

/* Scriptol extensions */


scriptol.display = function(str) {
   document.write(str)
}

scriptol.notInBrowser=function(str) {
  document.write("Function not available in a browser...");
}

/* Math */

scriptol.sign=function(n) {
  return (n = +n) ? n < 0 ? -1 : 1 : n;
}

scriptol.fmod = function (a,b) { 
  return Number((a - (Math.floor(a / b) * b)).toPrecision(8)); 
};

/* String */

scriptol.capitalize = function(t) 
{
  return t.charAt(0).toUpperCase() + t.slice(1);
}

scriptol.dup = function(t, n) {
  return Array(n + 1).join(t);
}

scriptol.fill = function(f, n) {
  return Array(n + 1).join(f);
}

scriptol.findLex = function(t, tsea, pos)
{
   return t.toLowerCase().indexOf(tsea.toLowerCase(), pos)
}

scriptol.insert = function(t, pos, t2)
{
  return t.slice(0, pos) + t2 + t.slice(pos)
}

scriptol.ltrim = function(t) 
{
	return t.replace(/^\s+/,"");
}

scriptol.rtrim = function(t) 
{
	return t.replace(/\s+$/,"");
}

scriptol.isNumber = function(t)
{
  return Number(t) != false;
}

scriptol.reserve = function(t, size)
{
  return Array(size + 1).join(' ');
}

scriptol.setCharAt = function(s, i, c) {
  if(i > s.length) return s + c;
  return s.substr(0, i) + c + s.substr(i + 1);
}

scriptol.strcmp = function(s1, s2) {
  if(s1 < s2) return -1;
  if(s1 > s2) return 1;
  return 0;
}

/* Arrays */

scriptol.sum = function(a)
{
  var sum = 0; 
  for(var i=0;i<a.length;i++) if(a[i])sum += a[i];
  return sum;
}

scriptol.arrayMin = function(a)
{
  if(a.length < 0) return 0;
  var m = Number.MAX_VALUE;
  for(var i=0;i<a.length;i++) 
    if(a[i] && a[i]<m) m=a[i];
  return m;
} 

scriptol.arrayMax = function(a)
{
  var m = 0;
  for(var i=0;i<a.length;i++) 
    if(a[i] && a[i] > m) m = a[i];
  return m;
}

scriptol.arrayRand = function(a) {
  return a[Math.floor(Math.random()*a.length)];
}

scriptol.empty = function(a) {
  if(a == undefined) return true;
  return a.length == 0;
}

scriptol.key = function(a, x) {
  for(var i in a)
    if(a[i]==x) return i;
  return false;  
}

scriptol.arrayLoad = function(a, name) {
  notInBrowser(); 
}

var SORT_REGULAR = 0;  // alpha
var SORT_NUMERIC = 1;  // num
 
scriptol.sort = function(a, o) {
  if(o == undefined || o == SORT_REGULAR) {
    a.sort();
    return;
  }    
  a = a.sort(function(x, y) { return x - y});
  return;
}

scriptol.rsort = function(a, o) {
  if(o == undefined || o == SORT_REGULAR) {
    a.sort();
    a.reverse();
    return;
  }    
  a = a.sort(function(x, y) { return y - x});
  return;
}  

scriptol.diff = function(a, b) {
  return a.filter(function(x) {return b.indexOf(x) < 0;});
}

scriptol.intersect = function(a, b) {
  return a.filter(function(x) {return b.indexOf(x) >= 0;});
}

scriptol.pack = function(a) {
  var b = a.filter(Boolean);
  a.splice.apply(a, [0, a.length].concat(b));
}

scriptol.unique = function(a) {
  return  a.filter( function(item, pos, x) { return x.indexOf(item) === pos; } ); 
}

scriptol.splice = function(a, low, up, inserted) {
  b = a.slice();
  return b.splice.apply(a,[low,up].concat(inserted));
}

scriptol.fileToArray = function(fname) {
  notInBrowser();
}

scriptol.range = function(a, b) {
  var arr = [];
  for(var i = a; i <= b; i++)
    arr.push(i);
  return arr;
}

scriptol.aCompare = function(a, b, code) {
  switch(code) {
    case "=": 
      if(a.length != b.length) return false;
      return a.join() == b.join();
    case "!":
    case "<":  
      if(a.length != b.length) return true;
      return a.join() != b.join();
    default:    
      break;
  }  

  return false;
}



// Dictionary

scriptol.dSize = function(d) {
  return Object.keys(d).length; 
}

scriptol.aksort = function(d, o) {
  return;  // put keys in order, does nothing, for compatibility with PHP
}

scriptol.ksort = function(d, o) {
  var k = scriptol.keys(d);
  var cl = scriptol.clone(d);
  for(var i = 0;i < k.length; i++) {
    delete d[ k[i] ]; 
  }
  k.sort()
  for(var i = 0;i < k.length; i++) {
    d[ k[i] ] = cl[ k[i] ]; 
  }
}

scriptol.vsort = function(d, o) {
  var c = {};
  var k = Object.keys(d);
  k.sort(function(a,b) {   
      if(d[a] < d[b]) return -1;
      if(d[a] > d[b]) return 1;
      return 0;  
  });
 
  for(var x in d) {
    c[x] = d[x]; 
    delete d[x];
  }  
  for(var i = 0;i < k.length; i++) {
    d[ k[i] ] = c[ k[i] ]; 
  } 
}

scriptol.keys = function(d) {  // keys of a dict
  return Object.keys(d);
}

scriptol.values = function(d) {  // values of a dict
  return Object.keys(d).map(function (k) { return d[k];});
}

scriptol.hasKey = function(d, k) {   // checks if the key/property exists
  return(k in d);
}

scriptol.clone = function(ob) {
   var cl = {}
   for(var i in ob) {
      if(typeof(ob[i])=="object" && ob[i] != null)
            cl[i] = scriptol.clone(ob[i]);
        else
            cl[i] = ob[i];
   }
   return cl;
}

scriptol.dFind = function(d, val) {
  for(var k in d) {
    if(d[k] == val) return;
  }
  return "";
}

scriptol.dSlice = function(ob, st, en) {
   var cl = {};
   var ctr = 0;
   var size = Object.keys(ob).length;
   if(st < 0) st+= size;
   if(en==undefined) en = size;
   if(en < 0) en+= size; 
   for(var k in ob)
   {
      ctr++;
      if(ctr <= st) continue;
      if(ctr > en) break;
      if(typeof(ob[k])=="object" && ob[k] != null) {
        cl[k] = scriptol.clone(ob[k]);
        continue;
      }      
      cl[k] = ob[k];
   }
   return cl;
}

scriptol.dSplice = function(d, low, up, inserted) {
   var left = scriptol.dSlice(d, 0, low);
   if(up == undefined)
    return left;
   var right = scriptol.dSlice(d, up);
   var x = scriptol.dCat(left, inserted);
   x = scriptol.dCat(x, right);
   return x;
}


scriptol.dShift = function(d) {
  var val;
  for(var k in d) {
     val = d[k]
     delete d[k] 
     return val
  }
  return "";
}

scriptol.dUnshift = function(d, newkey, newval) {
  var cl={};
  for(var i in d) {
    cl[i]=d[i]; 
    delete d[i];
  }  
  d[newkey]=newval;
  for(var i in cl) {
    if(i == newkey) continue;
    d[i]=cl[i];
  }  
}

scriptol.dPop = function(d) {
  var k
  for(k in d) { ;}
  var val = d[k]
  delete d[k] 
  return val
}

// concat two objects: already existing properties values changed from added objects
scriptol.dCat = function(d1, d2) {
  var x = scriptol.clone(d1)
  for(var k in d2) {
    x[k] = d2[k];
  }
  return x;
}

// return a dict of entries in d1 but not in d2
scriptol.dDiff = function(d1, d2) {
  var x = {};
  for(k in d1) { 
    if(!(k in d2)) 
      x[k] = d1[k]; 
  }
  return x;
}

scriptol.dUnique = function(d) {
  var nd = {};
  var temp = []
  for(var x in d) {
    if(temp.indexOf(x) != -1) continue;
    nd[x] = d[x];
    temp.push(x);
  }
  return  nd; 
}

scriptol.dLoad = function (d, fname) {
  notInBrowser();
}

scriptol.dStore = function (d, fname) {
  notInBrowser();
}

scriptol.dScan=function(d, fun)
{
  for(var k in d) fun(d[k]);
}

// XML file

function byNameSub(d, name, tlist) {
  for(var k in d) {
    if(k == name) tlist.push(d);
    if(typeof d[k] === "object") byNameSub(d[k], name, tlist)
  }
  return;
}

scriptol.getByName = function(d, name) {
  var tlist = [];
  byNameSub(d, name, tlist)
  return tlist  
}

function byTagSub(d, tagname, tlist) {
  for(var k in d) {
      if(typeof d[k] === "object") {
          if(d[k]["tag"] == tagname) tlist[k] = d[k];
          byTagSub(d[k], tagname, tlist)
      }
  }
  return;
}

scriptol.getByTag = function(d, tagname) {
  var tlist = {};
  byTagSub(d, tagname, tlist)
  return tlist  
}

scriptol.getById = function(d, idval) {
  for(var k in d) {
    if(k == idval) return d[k];  
    if(typeof d[k] === "object") {
      var dret = this.getById(d[k], idval)
      if(dret !== false) return dret;
    }
  }
  return false
}


scriptol.setById = function(d, idval, subdict) {
  for(var k in d) {
    if(k == idval) {
        d[k] = subdict;
        return true;
    }
    if(typeof d[k] === "object") {
      if (this.setById(d[k], idval, subdict)) return true;
    }
  }
  return false
}


var XMLStorage = "";

// Virtual dom to XML output
function domSub(d, flag) 
{
    for(var x in d)
    {
      if(d[x] instanceof Object || typeof d[x] == "object")  continue;
      if(x=="tag") continue;
      if(x.slice(0,2) === "_0") continue;
      if(x == "data") continue;  
      XMLStorage += " " + x + "=\""+ d[x] + "\"";
      flag=true;
    }
    for(var x in d)
    {
      if(d[x] instanceof Object || typeof d[x] == "object") {
        var tagKey = d[x]["tag"]
        if(flag) XMLStorage += ">\n";
        XMLStorage += "<" + tagKey;
        if(x.slice(0,2) != "_0") XMLStorage += " id=\"" + x + "\"";
        if( domSub(d[x], true) )
            XMLStorage += ">";
        XMLStorage += "</" + tagKey + ">\n";
        flag = false;
        continue;
      }
      if(x == "data") { 
        XMLStorage += ">" + d[x];
        flag = false;
        continue;  
      }        
    }
  return flag;    
}


scriptol.toXML=function(d) {
  if(d["tag"] == "xml") 
      XMLStorage = '<?xml version="1.0"?>\n';
  else 
      XMLStorage = "";    
  var d2 = {}
  var id = d["_00"];
  if(id==undefined) d2=Object.create(d);
  else {
    d2["_000"] = Object.create(d);
    d2["_000"]["id"] = id;
  }
  //alert(id)
  if( domSub(d2, false) ) 
      XMLStorage += ">\n";        
  
  return XMLStorage;
}

// Dynamic variable

scriptol.isArray = function(x) {
  return typeof x === "array" || x instanceof Array;
}

scriptol.isObject = function(x) {
  return typeof x === "object" || x instanceof Object;
}

scriptol.isText = function(x) {
  return typeof x === "string" || x instanceof String;
}

scriptol.isNumber = function(x) {
  return typeof x === "number" || x instanceof Number;
}

scriptol.isBoolean = function(x) {
  return typeof x === "boolean" || x instanceof Boolean;
}



// Iterator

scriptol.$it = new function(data) 
{
  var index = 0;
  var nxt = function() {
    var x = data[index];
    index++;
    return x;
  }
  var pre = function() {
    var x = data[index];
    index--;
    return x;
  }
  var end = function() { index = data.length - 1; }
  var cur = function() { return data[index]; }
}


// Text

scriptol.STR_PAD_LEFT = 0;
scriptol.STR_PAD_RIGHT = 1;
scriptol.STR_PAD_BOTH = 2;

scriptol.pad=function(input, finalsize, padding, type) 
{
  if (typeof(padding) == "undefined") { var padding = ' '; }
  if (typeof(type) == "undefined") { var type = scriptol.STR_PAD_RIGHT; }
  var left, right;  
  var padlen = finalsize - input.length;
  var multi = Math.ceil((padlen) / padding.length) + padding.length; 

  if (padlen > 0) {  
    padding = Array(multi).join(padding).slice(0, padlen);
    switch(type){
      case scriptol.STR_PAD_LEFT:
        input = padding + input;
        break;
      case scriptol.STR_PAD_BOTH:
        right = Math.ceil(padlen / 2);
        left = padlen - right;
        input = padding.slice(0, left) + input + padding.slice(0, right);
        break;      
      default: // right
        input = input + padding;
    }    
  }
  return input;
}

// File

scriptol.fopen = function(path, mode) 
{
  notInBrowser();
}

scriptol.fclose = function(handle) 
{    
  notInBrowser();
}

scriptol.fgets = function(handle)
{    
  notInBrowser();      
}

scriptol.fputs = function(handle, data) 
{
  notInBrowser();  
}

scriptol.die=function(message) {
  console.log(message)
  process.exit(1)
}

scriptol.eof = function(handle) {
  notInBrowser();   
}

scriptol.filetype = function(name) {
  notInBrowser(); 
}

scriptol.filetime = function(name) {
  notInBrowser(); 
}

scriptol.filemtime = function(name) {
  notInBrowser(); 
}

scriptol.filesize = function(name) {
  notInBrowser(); 
}

scriptol.isDir = function(name) {
  notInBrowser(); 
}

scriptol.isFile = function(name) {
  notInBrowser(); 
}

scriptol.dummy = function(x) {
  return;
}


// Reactive programming

scriptol.Reactol = (function()
{
  Reactol.prototype.add = function(x) {
    this.depend.push(x)  
  }
  Reactol.prototype.change = function(x) {
    for(var i in this.depend)
    {
      if(x != undefined) this.value = x;
      var d = this.depend[i]; 
      d.action();
      d.change();
      if('output' in d) d.output();    
    } 
  }
  function Reactol() { 
    this.depend=[]
    this.value=0
  }
  return Reactol;
})();

// goal-oriented async
scriptol.goal = function(condi, dur, actio, itv) { 
    itv = itv || 0;
    var iter = setInterval(function() {
      if(condi()) {
        clearInterval(iter); 
        clearTimeout(limiter);
        return;
      }
      actio();
    }, itv);
    if(dur == "&") dur = 2147483647;
    var limiter=setTimeout(function() { clearInterval(iter); }, dur);
}

// sync
scriptol.goalSync=function(condi, dur, actio) { 
    var stopFlag = false;
    if(dur == "&") dur = 2147483647;
    var limiter=setTimeout(function() { stopFlag=true; }, dur);
    while(stopFlag == false) {
      if(condi()) {
        clearTimeout(limiter);
        stopFlag=true;
        return;
      }
      actio();
    }
}

// System
// Temporary, waiting execSync

scriptol.exec = function(command) {
  notInBrowser();
};


/* $_extends comes from TypeScript */

scriptol.extends = scriptol.$_extends || function (d, b) 
{
    for (var p in b) 
      if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { 
      this.constructor = d; 
    }
    __.prototype = b.prototype;
    d.prototype = new __();
};
