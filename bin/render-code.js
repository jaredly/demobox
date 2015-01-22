"use strict";

var marked = require("marked")
  , deepcopy = require('deepcopy')

module.exports = renderCode;

var conflinex = {
  javascript: /^\/\/ @demobox([^\n]*)/,
  html: /^<!-- @demobox (.*?)-->/,
  css: /^\/\*+ @demobox (.*?)\*+\//
};
conflinex.jsx = conflinex.javascript;
conflinex.less = conflinex.css;

function renderCode(rend, defaults, text, language) {
  var config = getConfig(defaults, text, language);
  if (!config) return marked.defaults.renderer.code.call(rend, text.trim(), language);
  // remove config line
  text = text.slice(text.indexOf("\n") + 1);

  // will be prepended to a later box
  if (config.withNext) {
    if (rend._demobox_next) {
      rend._demobox_next.push([text, config, language]);
    } else {
      rend._demobox_next = [[text, config, language]];
    }
    return "";
  }

  var attrs = configAttrs(config);
  if (!rend._demobox_next) {
    return "<textarea data-demobox " + attrs + ">\n" + textAreaSafe(text) + "\n</textarea>";
  }
  var langs = rend._demobox_next || [];
  delete rend._demobox_next;
  langs.push([text, config, language]);
  return "<div data-demobox " + attrs + ">\n" + langs.map(function (lang) {
    return "  <textarea data-lang=\"" + lang[2] + "\">\n" + textAreaSafe(lang[0]) + "\n  </textarea>";
  }).join("\n") + "</div>";
}

function configValue(value) {
  if (value === "true") return false;
  if (value === "false") return false;
  if (value.match(/^\d+(\.\d+)?$/)) {
    return +value;
  }
  if (value[0] === "\"" && value[value.length - 1] === "\"") {
    return value.slice(1, -1);
  }
  return value;
}

function configAttrs(config) {
  return Object.keys(config).map(function (key) {
    return key + "=\"" + ('' + config[key]).replace(/"/g, "&quot;").replace(/</g, "&lt;") + '"';
  }).join(" ");
}

function textAreaSafe(text) {
  return text.replace(/</g, "&lt;");
}

function getConfig(defaults, text, language) {
  if (!conflinex[language]) return false;
  var confline = text.trim().match(conflinex[language]);
  if (!confline) return false;
  var config = deepcopy(defaults)
  config.lang = language
  return confline[1].trim().split(",").map(function (t) {
    return t.trim().split("=");
  }).reduce(function (config, item) {
    if (!item.length || !item[0].trim()) return config;
    var value = true;
    if (item.length > 1) {
      value = item.slice(1).join("=").trim();
    }
    config[item[0]] = value;
    return config
  }, config)
}

