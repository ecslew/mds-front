$(function() {
  // qq ,微信
  $(".qq").on('mouseover', function() {
    $(this).children('.qq-code').stop().show();
  })
  $(".qq").on('mouseout', function() {
      $(this).children('.qq-code').stop().hide();
    })
    // 折叠导航
  $('.navbar-toggle').on('click', function() {
    $(document.documentElement).addClass('wh100');
    $(document.body).addClass('wh100');
  })
  $('#mds-nav li').on('click', function() {
    $('#mds-nav').removeClass('in');
    $(document.documentElement).removeClass('wh100');
    $(document.body).removeClass('wh100');
  })
  $('#mds-nav .dropdown-menu li').on('click', function() {
    $('#mds-nav').removeClass('in');
    $(document.documentElement).removeClass('wh100');
    $(document.body).removeClass('wh100');
  })
  $('.collapse-close').on('click', function() {
      $('#mds-nav').removeClass('in');
      $(document.documentElement).removeClass('wh100');
      $(document.body).removeClass('wh100');
    })
    // 导航固定
  navFix();
  $(window).scroll(function() {
      navFix();
    })
    // 导航固定公共函数
  function navFix() {
    if ($(window).scrollTop() >= ($('.mds-top').outerHeight() - $('.header-nav').outerHeight())) {
      $('.header-nav').addClass('scroll-nav');
    } else {
      $('.header-nav').removeClass('scroll-nav');
    }
  }
})