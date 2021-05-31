

export const utils = {};

utils.createDOMFromHTML = function (htmlString) {
  let div = document.createElement('div');
  div.innerHTML = htmlString.trim();
  return div.firstChild;
};

utils.eachNewLine = function (str, options) {
  var accum = '';
  var data = Handlebars.createFrame(options, options.hash);
  var arr = str.split(/\r?\n/);
}