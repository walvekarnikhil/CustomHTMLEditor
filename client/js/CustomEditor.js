var CustomEditor = (function (tinymce) {
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
      editor.addButton('customMenu' + i,customMenu(editor,menu.name,menu.list, menu.style));
    }
    // editor.addButton('mybutton',customMenu(editor,'Text Styles',textStyleArr));
    // editor.addButton('orgVariableButton',customMenu(editor,'Org Variables',orgVariables, addPreset));
  };

  var selectPreset = function() {
    var ed = tinyMCE.activeEditor;
    var new_selection_content = '<span contenteditable="false" class="preset ' + this.name() +'">' + this.name() + '</span>';
    ed.insertContent(new_selection_content);
  };

  var selectTextStyle = function() {
    var ed = tinyMCE.activeEditor;
    var content = ed.selection.getContent({'format':'html'});
    var new_selection_content = '<span class="' + this.name() +'">' + content + '</span>';
    // todo remove any other text styles from child elements.
    ed.execCommand('insertHTML', false, new_selection_content);
  };

  var customMenu = function(editor, menuLabel, customStyleArr, clickHandler) {
    var menuArr = [];
    for (var i=0; i< customStyleArr.length; i++) {
      menuArr.push({
        name: customStyleArr[i],
        text: customStyleArr[i],
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

  return _api;
}(tinymce));
