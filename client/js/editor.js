tinymce.init({
  selector: 'textarea',
  content_css : 'css/editor.css' ,
  height: 500,
  forced_root_block : false,
  menubar: false,

  plugins: [
  'advlist autolink lists',
  'searchreplace visualblocks code fullscreen',
  'insertdatetime paste code'
  ],
  toolbar: 'mybutton | insert | styleselect | bold italic ',
  setup: function(editor) {
    editor.addButton('mybutton',textStyleMenu(editor));
  },

});

var orgVariables = ['support-phone'];

var textStyleArr = ['body-md-action-strong',
'body-md-brand-strong',
'body-md-primary',
'body-md-primary-strong',
'body-sm-primary-strong',
'body-lg-action-strong',
'subheader-md-inverted-strong',
'body-sm-inverted',
'body-sm-inverted-strong',
'header-xs-brand-strong',
'header-xs-action',
'body-sm-primary',
'body-xl-primary-strong',
'footnote-md-default',
'body-xs-primary',
'header-md-brand-strong',
'subheader-md-primary',
'footnote-lg-default',
'subheader-sm-primary-strong',
'body-xl-primary',
'body-xl-action-strong',
'body-xl-brand-strong',
'body-md-primary-hindent',
'body-md-primary-strong-hindent',
'body-sm-primary-strong-hindent',
'webdings-sm-default',
'webdings-sm-primary',
'wingdings-md-primary'];

var textStyleMenu = function(editor) {
  var menuArr = [];
  for (var i=0; i< textStyleArr.length; i++) {
    menuArr.push({
      name: textStyleArr[i],
      text: textStyleArr[i],
      onclick: selectTextStyle
    });
  }
  return  {
    type: 'menubutton',
    text: 'Text styles',
    icon: false,
    menu: menuArr
  };
}

var selectTextStyle = function() {
  var ed = tinyMCE.activeEditor;
  var content = ed.selection.getContent({'format':'html'});
  var new_selection_content = '<span class="' + this.name() +'">' + content + '</span>';
  // todo remove any other text styles from child elements.
  ed.execCommand('insertHTML', false, new_selection_content);
}

var mapHTHMLTag = function(ele) {
  return ele.className;
}

var convertToOrg = function() {
  var converted = convert(tinyMCE.activeEditor.getBody());
  document.getElementById('converted').innerText =converted;
  console.log(converted);
}

var convert = function(ele) {
  var nodes = ele.childNodes;
  // var convertedNodes = [];
  var result = '';
  if (ele.nodeType == 3) {
    result = ele.nodeValue;
  } else {
    var tagName = mapHTHMLTag(ele);
    var result = '[' + tagName + ']';
    for (var i = 0; i < nodes.length; i++) {
      var node = nodes[i];
      result += convert(node);
    };
    result += '[/' + tagName + ']';
  }
  return result;
}
