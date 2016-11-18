/*

PRINTERS

 */

$(document).on('click', '.js-new-printer-trigger', function(e){
  // console.log(e)
  $('#new-printer-form-wrapper').toggleClass('hide')
  $('#new-printer-form-placeholder').toggleClass('hide')
})

$(document).on('click', '.js-update-printer-trigger', function(e){
  // console.log(e)
  $('#update-printer-form-wrapper').toggleClass('hide')
  $('#update-printer-form-placeholder').toggleClass('hide')
})