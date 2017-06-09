/*

USER INVITES

 */

$(document).on('click', '.invite-user-trigger', function(e){
  $('.invite-user-form-wrapper').toggleClass('hide')
  $('.invite-user-form').toggleClass('hide')
})

/*

USER PROFILE

 */

$(document).on('click', '#upload-user-avatar', function(e){
  // console.log(e)
  $('#avatar-update-form input[type="file"]').focus().trigger('click')
})

// $(document).on('click', '#update-avatar-trigger', function(e){
//   // console.log(e)
//   $('#avatar-update-form').submit()
// })

$(document).on('change', '#avatar-update-form input[type="file"]', function(e){
  // console.log(e.target.value, e, e.target, e.target.files[0], URL.createObjectURL(e.target.files[0]) )
  $('#upload-user-avatar').html('<img src="'+URL.createObjectURL(e.target.files[0])+'" class="user-avatar" />')
  // $('#update-avatar-trigger').removeClass('hide').addClass('animated infinite flash text-success')
  $('#avatar-update-form').submit()
})

// $(document).on('click', '.js-user-edit-trigger.ion-ios-compose-outline', function(e){
//   // console.log(e)
//   // $(this).removeClass('ion-ios-compose-outline').addClass('ion-ios-checkmark-outline animated infinite flash text-success')
//   $('.js-user-edit-trigger.ion-ios-compose-outline').addClass('hide')
//   $(this).siblings('input').removeAttr('readonly').focus()
// })

// $(document).on('click', '.js-user-edit-trigger.ion-ios-checkmark-outline', function(e){
//   // console.log(e)
//   $('#user-update-form').submit()
// })

// $(document).on('change', '.user-update-form', function(e){
//   $('#user-update-form').submit()
//   // console.log(e, e.target.value)
// })


$(document).on('click', '.js-user-edit-trigger', function(e){
  $(this).addClass('hide')
  $('.js-user-update-trigger, .js-user-edit-cancel-trigger').removeClass('hide')
  $('#user-update-form input').removeAttr('readonly')
  $('input[name="user[name]"]').focus()
})

$(document).on('click', '.js-user-edit-cancel-trigger', function(e){
  $('.js-user-update-trigger, .js-user-edit-cancel-trigger').addClass('hide')
  $('.js-user-edit-trigger').removeClass('hide')
  $('#user-update-form input').prop('readonly', true)
})

$(document).on('click', '.js-user-update-trigger', function(e){
  $('#user-update-form').submit()
})

