$('.login-btn').click(function (e) {
  e.preventDefault();

  $('input').removeClass('error');

  let login = $('input[name="login"]').val();
  let password = $('input[name="password"]').val();

  $.ajax({
    url: 'vendor/signin.php',
    type: 'POST',
    dataType: 'json',
    data: {
      login: login,
      password: password
    },
    success (data) {

      if (data.status === true) {
        document.location.href = '/profile.php';
      } else {
          if (data.type === 1) {
            data.fields.forEach(function (field) {
              $(`input[name="${field}"]`).addClass('error');
            });
          }
        $('.msg').removeClass('none').text(data.message);
      }

    }
  });

});

let avatar = false;
$('input[name="avatar"]').change(function (e) {
  avatar = e.target.files[0];
});


$('.register-btn').click(function (e) {
  e.preventDefault();

  $('input').removeClass('error');

  let full_name = $('input[name="full_name"]').val();
  let login = $('input[name="login"]').val();
  let password = $('input[name="password"]').val();
  let email = $('input[name="email"]').val();
  let password_confirm = $('input[name="password_confirm"]').val();

  let formData = new FormData();
  formData.append('full_name', full_name);
  formData.append('login', login);
  formData.append('password', password);
  formData.append('password_confirm', password_confirm);
  formData.append('email', email);
  formData.append('avatar', avatar);

  $.ajax({
    url: 'vendor/singup.php',
    type: 'POST',
    dataType: 'json',
    processData: false,
    contentType: false,
    cache: false,
    data: formData,
    success (data) {

      if (data.status === true) {
        document.location.href = '/index.php';
      } else {
          if (data.type === 1) {
            data.fields.forEach(function (field) {
              $(`input[name="${field}"]`).addClass('error');
            });
          }
        $('.msg').removeClass('none').text(data.message);
      }

    }
  });

});
