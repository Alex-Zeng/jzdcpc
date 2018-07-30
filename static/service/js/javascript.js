$(function () {
  $('.product ul li img').click(function () {
    if ($(this).attr('src') == './img/product-btn-1.png') {
      $(this).attr('src', './img/product-btn-2.png')
    } else {
      $(this).attr('src', './img/product-btn-1.png')
    }
    $(this).parent().next().toggleClass('product-info-hide')
  })
  $('.main-form button[type="button"]').click(function () {
    $('.main-form button[type="button"]').removeClass('active')
    $(this).addClass('active')
  })
  $('.carousel-btn a:first-child').click(function () {
    $('.carousel').animate({'left': '0px'})
    return false
  })
  $('.carousel-btn a:last-child').click(function () {
    $('.carousel').animate({'left': '-1300px'})
    return false
  })
  function submit (val) {
    var name = $('#name').val()
    var sex = $('#sex').find('.active').text()
    var phone = $('#phone').val()
    $.ajax({
      type: 'post',
      url: '/papi/service/finance',
      data: {
        'name': name,
        'sex': sex,
        'phone': phone,
        'type': val
      },
      success (data) {
        console.log('success')
        if (data.status === 0) {
          layer.msg('提交成功')
        } else {
          layer.msg(data.msg)
        }
      },
      error (data) {
        layer.msg(data.msg)
      }
    })
  }
  $('.submit').each(function () {
    $(this).click(function () {
      submit($(this).attr('id'))
      return false
    })
  })
})
