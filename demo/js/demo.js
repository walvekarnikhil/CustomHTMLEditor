(function(CustomEditor){
  'use strict';
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

  var presetArr = ['support-phone'];


  CustomEditor.addMenu('Text Styles',CustomEditor.MenuType.Style,textStyleArr);
  CustomEditor.addMenu('Preset',CustomEditor.MenuType.Preset, presetArr);

  CustomEditor.init('textarea',{editorCSS:'css/editor.css'});
}(CustomEditor));
