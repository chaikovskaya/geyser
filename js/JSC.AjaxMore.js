!function(global) {
  'use strict';

  function AjaxMore(elem, params) {
    this.$element = jQuery(elem);
    this.params = params || {};

    this.onInit = this.params.onInit || null;
    this.classLoad = this.params.classLoad || 'ajaxmore-load';
    this.success = this.params.success || null;
    this.beforeSend = this.params.beforeSend || null;

    this.__construct();
  };

  AjaxMore.prototype.__construct = function __construct() {
    this.$document = jQuery(document);
    this.$more = this.$element.find('.JS-AjaxMore-Link');
    this.$next = this.$element.find('.JS-AjaxMore-Next');
    this.$content = this.$element.find('.JS-AjaxMore-Content');
    this.$pager = this.$element.find('.JS-AjaxMore-Pager');

    this._init();
  };

  AjaxMore.prototype._init = function _init() {
    var _this = this;

    if( jQuery.isFunction(this.onInit) ){
      this.onInit.apply(window, []);
    }

    this.$more.on('click.JS-AjaxMore', function(e, data) {
      e.preventDefault();
      _this._send.apply(_this, []);
    });
  };

  AjaxMore.prototype._getUrl = function _getUrl() {
    var $url = this.$more.data('ajaxmore-url');
    return $url;
  }

  AjaxMore.prototype.beforeSend = function beforeSend() {
  }

  AjaxMore.prototype._done = function _done(data, $url) {
    var $itemNew = $(data).filter('.JS-AjaxMore-Content-New').html() || {},
        $linkNew = $(data).filter('.JS-AjaxMore-Link-New') || {},
        $pagerNew = $(data).filter('.JS-AjaxMore-Pager') || {};

    this.$content.append($itemNew);
    this.$pager.replaceWith($pagerNew);

    //history.pushState(null, null, $url);

    var urlNew = $linkNew.data('ajaxmore-url');

    if (urlNew == undefined) {
      this.$more.remove();
    } else {
      this.$more.data('ajaxmore-url', urlNew);
    }

    this.success();

    this.$more.removeClass(this.classLoad);
  }

  AjaxMore.prototype._fail = function _fail() {
    //console.log("Request failed:" + textStatus);
    this.$more.removeClass(this.classLoad);
  }

  AjaxMore.prototype._send = function _send() {
    var _this = this,
        $url = _this._getUrl();

    _this.beforeSend();
    _this.$more.addClass(_this.classLoad);

    var request = $.ajax({
      url: $url,
      method: "get",
      dataType: "html"
    });
    request.done(function(data) {
      _this._done(data, $url);
    });
    request.fail(function(jqXHR, textStatus) {
      _this._fail();
    });
  };
  /*--/AjaxMore--*/

  global.AjaxMore = AjaxMore;
}(this);
