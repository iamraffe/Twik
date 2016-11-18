


/*

EDIT PAYMENT METHOD

 */
$(document).on('click', '.edit-payment-method', function(e){
  
  $("#update-card-form #stripeCard").val($(this).attr('data-pid'))
  // Open Checkout with further options:
  editPaymentMethodHadler.open({
    name: 'Twik',
    description: 'Edit Credit Card',
  });
  e.preventDefault();
});

// Close Checkout on page navigation:
window.addEventListener('popstate', function() {
  editPaymentMethodHadler.close();
});


/*

DELETE PAYMENT METHOD

 */
$(document).on('click', '.delete-payment-method', function(e){
  // console.log(e)
  $("#delete-card-form #stripeCard").val($(this).attr('data-pid'))
  // Open Checkout with further options:
  $("#delete-card-form").submit()
  e.preventDefault();
});