$(document).on('click', '#upload-user-avatar', function(e){
  console.log(e)
  $('#avatar-update-form input[type="file"]').focus().trigger('click')
})

$(document).on('click', '#update-avatar-trigger', function(e){
  console.log(e)
  $('#avatar-update-form').submit()
})

$(document).on('change', '#avatar-update-form input[type="file"]', function(e){
  console.log(e.target.value, e, e.target, e.target.files[0], URL.createObjectURL(e.target.files[0]) )
  $('#upload-user-avatar').html('<img src="'+URL.createObjectURL(e.target.files[0])+'" class="user-avatar" />')
  $('#update-avatar-trigger').removeClass('hide')
  // $('#avatar-update-form').submit()
})

$(document).on('click', '.js-user-edit-trigger.ion-ios-compose-outline', function(e){
  console.log(e)
  $(this).removeClass('ion-ios-compose-outline').addClass('ion-ios-checkmark-outline')
  $(this).siblings('input').removeAttr('readonly').focus()
})

$(document).on('click', '.js-user-edit-trigger.ion-ios-checkmark-outline', function(e){
  console.log(e)
  $('#user-update-form').submit()
})