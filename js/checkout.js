$(document).ready(function(){
  $('.radioPayment').on('change', function(){
      $('.collapse').collapse('hide');
      $($(this).data('bs-target')).collapse('show');
  });
});