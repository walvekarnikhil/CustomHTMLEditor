var CustomEditor = (function (tinymce) {
  'use strict';
  var _api = {};
  var _initDone = false;
  var menus = [];
  var _tinymce = tinymce;

  _api.addMenu = function(menuLabel,menuStyle, customMenuList) {
    if (_initDone) {
      //throw exception
      return false;
    }
    var menu = {name: menuLabel,style:menuStyle, list: customMenuList};
    menus.push(menu);
  };

  var addMenusToEditor = function(editor) {
    for (var i=0; i< menus.length; i++) {
      var menu = menus[i];
      editor.addButton('customMenu' + i,addCustomMenu(editor,menu.name,menu.list, menu.style));
    }
  };

  var selectPreset = function() {
    var ed = tinyMCE.activeEditor;
    var dataTag = getDataTag(this);
    var new_selection_content = '<span contenteditable="false" class="preset ' + this.name() +'" data-tag="' + dataTag + '">' + this.name() + '</span>';
    ed.insertContent(new_selection_content);
  };

  var getDataTag = function(menuElement) {
    var dataTag = menuElement.name();
    if (menuElement.data && menuElement.data.tag) {
      dataTag = menuElement.data.tag;
    }
    return dataTag;
  };

  var selectTextStyle = function() {
    var ed = tinyMCE.activeEditor;
    var content = ed.selection.getContent({'format':'html'});
    var dataTag = getDataTag(this);
    var new_selection_content = '<span class="' + this.name() +'" data-tag="' + dataTag + '">' + content + '</span>';
    // todo remove any other text styles from child elements.
    ed.execCommand('insertHTML', false, new_selection_content);
  };

  var addCustomMenu = function(editor, menuLabel, customStyleArr, clickHandler) {
    var menuArr = [];
    for (var i=0; i< customStyleArr.length; i++) {
      menuArr.push({
        name: customStyleArr[i].name,
        text: customStyleArr[i].text,
        tag: customStyleArr[i].tag,
        onclick: clickHandler
      });
    }
    return  {
      type: 'menubutton',
      text: menuLabel,
      icon: false,
      menu: menuArr
    };
  };

  var buildToolbar = function(options) {
    var menuToolbar = '';
    for (var i=0; i< menus.length; i++) {
      menuToolbar += 'customMenu' + i + ' | ';
    }
    return menuToolbar + ' | bold italic ';
  };


  _api.init = function(selector, opts) {
    console.log("Init done");
    opts = opts || {
      height: 500
    };
    var toolbar = buildToolbar(opts);

    _tinymce.init({
      selector: selector,
      content_css : opts.editorCSS ,
      height: opts.height,
      forced_root_block : false,
      menubar: false,

      plugins: [
      'advlist autolink lists',
      'searchreplace visualblocks code fullscreen',
      'paste code'
      ],
      toolbar: toolbar,
      setup: function(editor) {
        addMenusToEditor(editor);
      },
    });
    _initDone = true;
  };
  var menuType = {
    Style : selectTextStyle,
    Preset : selectPreset,
  };

  _api.MenuType = menuType;
  var _convert = function(ele) {
    var nodes = ele.childNodes;
    // var convertedNodes = [];
    var result = '';
    if (ele.nodeType == 3) {
      result = ele.nodeValue;
    } else {
      var tagName = ele.attributes['data-tag'].value;
      result = '[' + tagName + ']';
      for (var i = 0; i < nodes.length; i++) {
        var node = nodes[i];
        result += _convert(node);
      }
      result += '[/' + tagName + ']';
    }
    return result;
  };

  _api.convert = function() {
    var ele = _tinymce.activeEditor.getBody();
    var result = '';
    for (var i = 0; i < ele.childNodes.length; i++) {
      result += _convert(ele.childNodes[i]);
    }
    return result;
  };
  return _api;
}(tinymce));
