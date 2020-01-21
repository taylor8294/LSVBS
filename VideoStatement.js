//import "@babel/polyfill";
import "core-js/stable";
import "regenerator-runtime/runtime";
import VideoStatementFactory from './src/factory';

(function(window, document, $, undefined) {
    window.VideoStatement = VideoStatementFactory()
})(window, window.document, window.jQuery);
