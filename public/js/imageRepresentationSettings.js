$(document).ready(function() {
  for(let i = 0; i < 9; i+= 1) {
    let imageUploadFormName = `replace-image-representation-form-${i}`;
    let imageUploadForm = document.getElementById(imageUploadFormName);

    let fileUploadBox = document.getElementById(`upload-box-${i}`);
    let $fileUploadBox = $(`#upload-box-${i}`);

    imageUploadForm.addEventListener('submit', function(event) {
      event.preventDefault();




      if (fileUploadBox.value != "") {
        let form = document.getElementById(imageUploadFormName);
        let fileSelect = fileUploadBox;
        let uploadButton = document.getElementById(`upload-submit-button-${i}`);

        console.log(uploadButton);
        $(uploadButton).val('Uploading...!');
        $(uploadButton).prop('disabled', true);

        var files = fileSelect.files;
        var formData = new FormData();

        for (var j = 0; j < files.length; j++) {
          var file = files[j];

          // Check the file type.
          if (!file.type.match('image.*')) {
            continue;
          }

          formData.append('uploadedPicture', file, file.name);
        }

        var xhr = new XMLHttpRequest();

        xhr.open('POST', `/api/storeImageAssociations?number=${i}`, true);
        xhr.onload = function () {
          if (xhr.status === 200) {

            console.log(xhr.responseText);
            let image = `number-representation-image-${i}`;
            let $image = $(`#${image}`);

            $image.prop('src', xhr.responseText);

            fileUploadBox.value = "";

            $(uploadButton).val('Use a different image');
            $(uploadButton).prop('disabled', false);
          } else {
            alert('An error occurred!');
          }
        };
        xhr.send(formData);

        $fileUploadBox.css({
          color: 'black'
        });
      } else {
        $fileUploadBox.css({
          color: 'red'
        });
      }

    });

  }

});
