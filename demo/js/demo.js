(function(CustomEditor){
  'use strict';
  var textStyleArr = [
    { name:'body-md-action-strong', text: 'Body MD Action Strong', tag: 'body-md-action-strong' },
    { name:'body-md-brand-strong', text: 'body-md-brand-strong', tag:'body-md-brand-strong' },
    { name:'body-md-primary', text: 'body-md-primary' },
    { name:'body-md-primary-strong', text: 'body-md-primary-strong' },
    { name:'body-sm-primary-strong', text: 'body-sm-primary-strong' },
    { name:'body-lg-action-strong', text: 'body-lg-action-strong' },
    { name:'subheader-md-inverted-strong', text: 'subheader-md-inverted-strong' },
    { name:'body-sm-inverted', text: 'body-sm-inverted' },
    { name:'body-sm-inverted-strong', text: 'body-sm-inverted-strong' },
    { name:'header-xs-brand-strong', text: 'header-xs-brand-strong' },
    { name:'header-xs-action', text: 'header-xs-action' },
    { name:'body-sm-primary', text: 'body-sm-primary' },
    { name:'body-xl-primary-strong', text: 'body-xl-primary-strong' },
    { name:'footnote-md-default', text: 'footnote-md-default' },
    { name:'body-xs-primary', text: 'body-xs-primary' },
    { name:'header-md-brand-strong', text: 'header-md-brand-strong' },
    { name:'subheader-md-primary', text: 'subheader-md-primary' },
    { name:'footnote-lg-default', text: 'footnote-lg-default' },
    { name:'subheader-sm-primary-strong', text: 'subheader-sm-primary-strong' },
    { name:'body-xl-primary', text: 'body-xl-primary' },
    { name:'body-xl-action-strong', text: 'body-xl-action-strong' },
    { name:'body-xl-brand-strong', text: 'body-xl-brand-strong' },
    { name:'body-md-primary-hindent', text: 'body-md-primary-hindent' },
    { name:'body-md-primary-strong-hindent', text: 'body-md-primary-strong-hindent' },
    { name:'body-sm-primary-strong-hindent', text: 'body-sm-primary-strong-hindent' },
    { name:'webdings-sm-default', text: 'webdings-sm-default' },
    { name:'webdings-sm-primary', text: 'webdings-sm-primary' },
    { name:'wingdings-md-primary', text: 'wingdings-md-primary' }
];

  var presetArr = [
    {name:'support-phone', text: 'Support Phone'}];


  CustomEditor.addMenu('Text Styles',CustomEditor.MenuType.Style,textStyleArr);
  CustomEditor.addMenu('Preset',CustomEditor.MenuType.Preset, presetArr);

  CustomEditor.init('textarea',{editorCSS:'css/editor.css'});

  window.convertToOrg = function() {
    var converted = CustomEditor.convert();
    document.getElementById('converted').innerText =converted;
    console.log(converted);
  };
}(CustomEditor));
