$('.form').find('input, textarea').on('keyup blur focus', function (e) {

  var $this = $(this),
    label = $this.prev('label');

  if (e.type === 'keyup') {
    if ($this.val() === '') {
      label.removeClass('active highlight');
    } else {
      label.addClass('active highlight');
    }
  } else if (e.type === 'blur') {
    if ($this.val() === '') {
      label.removeClass('active highlight');
    } else {
      label.removeClass('highlight');
    }
  } else if (e.type === 'focus') {

    if ($this.val() === '') {
      label.removeClass('highlight');
    }
    else if ($this.val() !== '') {
      label.addClass('active highlight');
    }
  }

});

$('.tab a').on('click', function (e) {

  e.preventDefault();

  $(this).parent().addClass('active');
  $(this).parent().siblings().removeClass('active');

  target = $(this).attr('href');

  $('.tab-content > div').not(target).hide();

  $(target).fadeIn(600);

});


String.prototype.replaceAt = function (index, character) {
  if (index > this.length - 1) return this;
  return this.substr(0, index) + character + this.substr(index + character.length);
};

function generateKey(licenseName) {
  licenseKey = "";
  chars = "123456789ABCDEFGHJKLMNPQRSTUVWXYZ";

  for (i = 0; i <= 31; i++) {
    licenseKey += chars[Math.floor((Math.random() * (chars.length - 1)))];
  }

  zeroChars = chars[4] + chars[9] + chars[14] + chars[19] + chars[24] + chars[29];
  licenseKey = licenseKey.replaceAt(0, zeroChars[Math.floor((Math.random() * (zeroChars.length - 1)))]);
  licenseKey = licenseKey.replaceAt(3, chars.substr(((licenseName.length + chars.indexOf(licenseKey[1])) * 9 % (2 << 4)), 1));
  licenseKey = licenseKey.replaceAt(12, chars[(chars.indexOf(licenseKey[11]) + chars.indexOf(licenseKey[8])) * 9 % (chars.length - 1)]);
  twentyFiveChars = chars[7] + chars[15] + chars[23] + chars[31];
  licenseKey = licenseKey.replaceAt(25, twentyFiveChars[Math.floor((Math.random() * (twentyFiveChars.length - 1)))]);

  return licenseKey;
}

document.getElementById("generateBtn").onclick = function (event) {
  event.preventDefault();
  licenseName = document.getElementById('licenseName').value.trim();
  if (licenseName == "") alert("Please enter License Name!");
  else document.getElementById('licenseKey').value = generateKey(licenseName);
};
