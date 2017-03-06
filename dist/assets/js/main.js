$(document).ready(function(){

  $('.loader').fadeOut();

  setTimeout(function (){
    $('#particles-js').css('border-radius', '0px').addClass('border-transition');
  },4500);

  $.fn.uncomment = function () {
        for (var i = 0, l = this.length; i < l; i++) {
            for (var j = 0, len = this[i].childNodes.length; j < len; j++) {
                if (this[i].childNodes[j].nodeType === 8) {
                    var content = this[i].childNodes[j].nodeValue;
                    $(this[i].childNodes[j]).replaceWith(content);
                }
            }
        }
    };
  $.fn.outerHTML = function(){
    return (!this.length) ? this : (this[0].outerHTML || (
      function(el){
          var div = document.createElement('div');
          div.appendChild(el.cloneNode(true));
          var contents = div.innerHTML;
          div = null;
          return contents;
    })(this[0]));
  };

  $('#pre-home').find('.access').click(function(){
    var preHome = $('#pre-home'), postHome = $('#post-home'), loader = $('.loader'), video = $('#intro-video');

    preHome.fadeOut(3000);
    loader.toggle();
    postHome.toggle();
    $('.loader').fadeOut(3010);
    video[0].play();

    setTimeout(function (){
      preHome.wrap('<!--'+"pre-home"+' -->');
    },3010);
  });

  $(".menu-list a").hover(function() {
    $(this).siblings().stop().fadeTo(300, 0.6);
   $(this).parent().siblings().stop().fadeTo(300, 0.3);
 }, function() { // Mouse out
   $(this).siblings().stop().fadeTo(300, 1);
   $(this).parent().siblings().stop().fadeTo(300, 1);
 });



});
