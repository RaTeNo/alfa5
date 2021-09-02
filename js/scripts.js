$(() => {
	// Основной слайдер на главной

	$('.block_box .slider').owlCarousel({
		items: 1,
		margin: 0,
		nav: true,
		dots: true,
		loop: true,
		smartSpeed: 750,
		autoplay: true,
		autoplayTimeout: 5000,
		onTranslate: (event) => {
			$(event.target).trigger('stop.owl.autoplay')
		},
		onTranslated: (event) => {
			$(event.target).trigger('play.owl.autoplay', [4250, 0])
		}
	})


	$('.main_slider .slider').owlCarousel({
		items: 1,
		margin: 0,
		nav: true,
		dots: true,
		loop: true,
		smartSpeed: 750,
		autoplay: true,
		autoplayTimeout: 5000,
		onTranslate: (event) => {
			$(event.target).trigger('stop.owl.autoplay')
		},
		onTranslated: (event) => {
			$(event.target).trigger('play.owl.autoplay', [4250, 0])
		}
	})


	// Слайдер в предпросмотре рекламы
	$('.ad_preview .slider').owlCarousel({
		items: 1,
		margin: 0,
		nav: true,
		dots: true,
		loop: true,
		smartSpeed: 500,
		autoplay: true,
		autoplayTimeout: 3000,
		onTranslate: (event) => {
			$(event.target).trigger('stop.owl.autoplay')
		},
		onTranslated: (event) => {
			$(event.target).trigger('play.owl.autoplay', [2500, 0])
		}
	})


	// Насктройки
	$('.settings .save_btn').click(function (e) {
		e.preventDefault()

		// Данные формы для отправки на сервер
		let formData = $('.settings .form').serialize()

		// Показать сообщение success
		showNoti('success')

		// Показать сообщение error
		// showNoti('error')
	})


	// Уведомления
	$('.notifications .notification .close').click(function (e) {
		e.preventDefault()

		$('.notifications .notification').removeClass('active')
		$('.notifications').fadeOut(200)
	})


	// Удаление файла
	$('.form .file .selected .remove').click(function (e) {
		e.preventDefault()

		let parent = $(this).closest('.file')

		$(this).closest('div').remove()
		parent.find('input[type=file]').val('')
	})


	// Спойлер в тексте
	$('.text_block .spoler_btn').click(function (e) {
		e.preventDefault()

		const $parent = $(this).closest('.text_block')

		if ($(this).hasClass('active')) {
			$(this).removeClass('active')

			$parent.find('.hide').slideUp(500)
		} else {
			$(this).addClass('active')

			$parent.find('.hide').slideDown(500)
		}
	})


	// Перезагрузка страницы
	$('.refresh_page_btn').click(e => {
		e.preventDefault()

		document.location.reload()
	})


	// График
	// http://gionkunz.github.io/chartist-js/index.html
	if ($('#chart1_1').length) {
		new Chartist.Line('#chart1_1', {
			labels: [01, 02, 03, 04, 05, 06, 07, 08, 09, 10],
			series: [
				[6, 6, 6.5, 4, 1.25, 2, 3, 4.5, 4, 1]
			]
		}, {
			high: 12,
			low: 1,
			seriesBarDistance: 0.25,
			showArea: true
		})
	}

	if ($('#chart2_1').length) {
		new Chartist.Line('#chart2_1', {
			labels: [01, 02, 03, 04, 05, 06, 07, 08, 09, 10],
			series: [
				[6, 6, 6.5, 4, 1.25, 2, 3, 4.5, 4, 1]
			]
		}, {
			high: 12,
			low: 1,
			seriesBarDistance: 0.25,
			showArea: true
		})
	}

	$(".disabled").click(function (e) {
		e.preventDefault()
	});


	// Галерея картинок
	/*if ($('.gallery').length) {
		rowGrid(document.getElementsByClassName('gallery')[0], {
			itemSelector: '.item',
			minMargin: 10,
			maxMargin: 20,
			minWidth: 134
		})

		rowGrid(document.getElementsByClassName('gallery')[1], {
			itemSelector: '.item',
			minMargin: 10,
			maxMargin: 20,
			minWidth: 134
		})

		rowGrid(document.getElementsByClassName('gallery')[2], {
			itemSelector: '.item',
			minMargin: 10,
			maxMargin: 20,
			minWidth: 134
		})
	}	*/
	
})


const showNoti = status => {
	$('.notifications .notification').removeClass('active')

	switch (status) {
		case 'success':
			$('.notifications .notification.success').addClass('active')
			break;

		default:
			$('.notifications .notification.error').addClass('active')
			break;
	}

	$('.notifications').fadeIn(300)
}