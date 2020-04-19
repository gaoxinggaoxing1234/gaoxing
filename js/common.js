$(function () {
    // mui初始化
  /*  $("body").on("tap", "a", function () {
        mui.openWindow({
            url: this.href
        })
    })*/

   /* if(getIsAPPLE()){
        FastClick.attach(document.body);
    }*/

    // 底部tab点击
    $('nav ul').on('tap', 'li', function () {
        var src = $(this).find('img').attr('data-active') //选中
        $('nav img').each(function (index, item) {
            $(item).attr('src', $(item).attr('data-normal')) //未选中
        })
        $(this).find('img').attr('src', src)
        $('nav ul span').removeClass('current-color')
        $(this).find('span').addClass('current-color')
    })

})