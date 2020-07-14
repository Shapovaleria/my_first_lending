$(".regular").slick({
    dots: true,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 2,
    // autoplay: true,
    // autoplaySpeed: 2000
  });

  $(".lazy").slick({
    lazyLoad: 'ondemand', // ondemand progressive anticipated
    infinite: true
});

$(".vertical-center").slick({
    dots: true,
    vertical: true,
    centerMode: true,
    slidesToShow: 4,
    slidesToScroll: 2,
  });