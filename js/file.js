//jQuery plugin
(function($) {

    $.fn.uploader = function(options) {
        var settings = $.extend({
            MessageAreaText: "",
            MessageAreaTextWithFiles: "",
            DefaultErrorMessage: "Unable to open this file.",
            BadTypeErrorMessage: "Не поддерживаемый формат файла.",
            acceptedFileTypes: ['pdf', 'jpg', 'gif', 'jpeg', 'bmp', 'tif', 'tiff', 'png', 'xps', 'doc', 'docx',
                'fax', 'wmp', 'ico', 'txt', 'cs', 'rtf', 'xls', 'xlsx'
            ]
        }, options);

        var uploadId = 1;
        //update the messaging 
        $('.file-uploader__message-area p').text(options.MessageAreaText || settings.MessageAreaText);

        //create and add the file list and the hidden input list
        var fileList = $('<ul class="file-list selected "></ul>');
        var hiddenInputs = $('<div class="hidden-inputs hidden"></div>');
        $('.file-uploader__message-area').after(fileList);
        $('.file-list').after(hiddenInputs);

        //when choosing a file, add the name to the list and copy the file input into the hidden inputs
        $('.file-chooser__input').on('change', function() {
            var file = $('.file-chooser__input').val();
            var fileName = (file.match(/([^\\\/]+)$/)[0]);

            //clear any error condition
            $('.file-chooser').removeClass('error');
            $('.error-message').remove();

            //validate the file
            var check = checkFile(fileName);
            if (check === "valid") {

                // move the 'real' one to hidden list 
                $('.hidden-inputs').append($('.file-chooser__input'));

                //insert a clone after the hiddens (copy the event handlers too)
                $('.file-chooser').append($('.file-chooser__input').clone({ withDataAndEvents: true }));

                //add the name and a remove button to the file-list
                $('.file-list').append('<li style="display: none;"><svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 11 22" id="ic_file"><path d="M9 6v10.399c0 1.67-1.129 3.19-2.765 3.525A3.506 3.506 0 0 1 2 16.5V4.113c0-.996.678-1.922 1.661-2.085A2.003 2.003 0 0 1 6 4v10.5a.5.5 0 0 1-1 0V6a1 1 0 0 0-2 0v8.353c0 1.308.939 2.502 2.24 2.634A2.503 2.503 0 0 0 8 14.5V4.178C8 2.09 6.477.222 4.399.02A4.004 4.004 0 0 0 0 4v12.255c0 2.871 2.093 5.439 4.949 5.718A5.506 5.506 0 0 0 11 16.5V6a1 1 0 0 0-2 0z"></path></svg><div class="file-list__name name">' + fileName + '</div><button class="removal-button remove" data-uploadid="' + uploadId + '">удалить</button></li>');
               
                $('.file-list').find("li:last").show();

                //removal button handler
                $('.removal-button').on('click', function(e) {
                    e.preventDefault();

                    //remove the corresponding hidden input
                    $('.hidden-inputs input[data-uploadid="' + $(this).data('uploadid') + '"]').remove();

                    //remove the name from file-list that corresponds to the button clicked
                    $(this).parent().hide().queue(function() { $(this).remove(); });

                    //if the list is now empty, change the text back 
                    if ($('.file-list li').length === 0) {
                        $('.file-uploader__message-area').text(options.MessageAreaText || settings.MessageAreaText);
                    }
                });

                //so the event handler works on the new "real" one
                $('.hidden-inputs .file-chooser__input').removeClass('file-chooser__input').attr('data-uploadId', uploadId);

                //update the message area
                $('.file-uploader__message-area').text(options.MessageAreaTextWithFiles || settings.MessageAreaTextWithFiles);

                uploadId++;

            } else {
                //indicate that the file is not ok
                $('.file-chooser').addClass("error");
                var errorText = options.DefaultErrorMessage || settings.DefaultErrorMessage;

                if (check === "badFileName") {
                    errorText = options.BadTypeErrorMessage || settings.BadTypeErrorMessage;
                }

                $('.file-chooser__input').after('<p class="error-message">' + errorText + '</p>');
            }
        });

        var checkFile = function(fileName) {
            var accepted = "invalid",
                acceptedFileTypes = this.acceptedFileTypes || settings.acceptedFileTypes,
                regex;

            for (var i = 0; i < acceptedFileTypes.length; i++) {
                regex = new RegExp("\\." + acceptedFileTypes[i] + "$", "i");

                if (regex.test(fileName)) {
                    accepted = "valid";
                    break;
                } else {
                    accepted = "badFileName";
                }
            }

            return accepted;
        };
    };
}(jQuery));

//init 
$(document).ready(function() {
    $('.fileUploader').uploader({
        MessageAreaText: "Файлы не выбраны."
    });
});