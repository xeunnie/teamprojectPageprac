(function($){

	/**
	 * Common:ScrollMagic Controller
	 */
	var controller = new ScrollMagic.Controller();

	// Mobile MenuBtn
	//==================================================*
	function HeaderSearch() {
		if($('.HeaderSearch').hasClass('is-View')){
			$('.HeaderSearch').removeClass('is-View');
			$('.Logo').removeClass('is-SearchOn');
			$('html').removeClass('is-SearchHidden');
		}else{
			$('.HeaderSearch').addClass('is-View');
			$('.HeaderSearchBox-input').focus();
			$('.Logo').addClass('is-SearchOn');
			$('.HeaderLogin').removeClass('is-View');
			$('html').addClass('is-SearchHidden');
		}
	}

	$(document).on('click', '.HeaderSearchOpen', HeaderSearch);


	// Mobile MenuBtn Close
	//==================================================*
	function HeaderSearchClose() {
		$('.HeaderSearchClosed').removeClass('is-View');
		$('.HeaderSearch').removeClass('is-View');
		$('.Logo').removeClass('is-SearchOn');
		$('html').removeClass('is-SearchHidden');
	}

	$(document).on('click', '.HeaderSearchClosed', HeaderSearchClose);

	// scroll logo action
	//==================================================*
	jQuery(window).scroll(function() {
		if ($(document).scrollTop() > 1) {
			$('.site-header').addClass('is-Scroll');
		} else {
			$('.site-header').removeClass('is-Scroll');
		}
	});


	// Mobile MenuOpen
	//==================================================*
	function MobileMenuOpen() {
		if($('.HeaderMenuListNav').hasClass('is-View')){
			$('.HeaderMenuListNav').removeClass('is-View');
			$('html').removeClass('is-Hidden');
			$('.MobileMenuBtn').removeClass('is-View');
			$('.site-header').siblings('.HeaderMenuDim').css('display', 'none');
		}else{
			$('.HeaderMenuListNav').addClass('is-View');
			$('html').addClass('is-Hidden');
			$('.MobileMenuBtn').addClass('is-View');
			$('.site-header').siblings('.HeaderMenuDim').css('display', 'block');
		}
	}

	$(document).on('click', '.MobileMenuBtn', MobileMenuOpen);



	//  HeaderLogin
	//==================================================*
	function HeaderLogin() {
		if($('.HeaderLogin').hasClass('is-View')){
			$('.HeaderLogin').removeClass('is-View');


		}else{
			$('.HeaderLogin').addClass('is-View');
			$('.HeaderSearch').removeClass('is-View');
		}
	}

	$(document).on('click', '.HeaderLoginLink', HeaderLogin);




	// HeaderLoginPopup
	//==================================================*
	function HeaderLoginPopup() {
		$('.HeaderLogin').removeClass('is-View');
		$('.SubscriptionPopup').removeClass('is-View');
		$('.UnregisterPopup').removeClass('is-View');
		$('.LoginPopup').removeClass('is-View');
		$('.ReplyDeletePopup').removeClass('is-View');
		$('.DeleteMyContPopup').removeClass('is-View');
	}

	$(document).on('click', '.AlertBoxClosed', HeaderLoginPopup);

	// VoteGood
	//==================================================*
	function VoteGood() {
		if($('.VoteGood').hasClass('is-Active')){
			$('.VoteGood').removeClass('is-Active');
		}else{
			$('.VoteGood').addClass('is-Active');
			$('.VoteSoso').removeClass('is-Active');
		}
	}

	$(document).on('click', '.VoteGood', VoteGood);

	// VoteSoso
	//==================================================*
	function VoteSoso() {
		if($('.VoteSoso').hasClass('is-Active')){
			$('.VoteSoso').removeClass('is-Active');
		}else{
			$('.VoteSoso').addClass('is-Active');
			$('.VoteGood').removeClass('is-Active');
		}
	}

	$(document).on('click', '.VoteSoso', VoteSoso);

	//Cookie
	var getCookie = function(cname){
		var name = cname + "=";
		var ca = document.cookie.split(';');
		for(var i=0; i<ca.length; i++) {
			var c = ca[i];
			while (c.charAt(0)==' ') c = c.substring(1);
			if (c.indexOf(name) != -1) return c.substring(name.length,c.length);
		}
		return "";
	}

	// 24Cookie
	var setCookie = function (cname, cvalue, exdays){
		var todayDate = new Date();
		todayDate.setTime(todayDate.getTime() + (exdays*24*60*60*1000));
		var expires = "expires=" + todayDate.toUTCString();
		document.cookie = cname + "=" + cvalue + "; ";
	}

	var couponClose = function(){
		setCookie("close","Y",1);
		$('.site').removeClass('is-HeadBannerView');
	}

	cookiedata = document.cookie;
	if(cookiedata.indexOf("close=Y")<0){
		$('.site').addClass('is-HeadBannerView');
	}else{
		$('.site').removeClass('is-HeadBannerView');
	}
	$(".HeaderBannerBtn").click(function(){
		couponClose();
	});

	// ReportPopup
	//==================================================*
	function ReportPopup() {
		$('[data-popup="ReportPopup"]').fadeIn(100);
		$('html').addClass('is-Hidden');
		return false;
	}

	$(document).on('click', '.j-ReportBtn', ReportPopup);
	
	
	
	// OpinionPopup
	//==================================================*
	function OpinionPopup() {
		$('[data-popup="OpinionPopup"]').fadeIn(100);
		$('html').addClass('is-Hidden');
		return false;
	}

	$(document).on('click', '.TodayNewsletterLink-title', OpinionPopup);



	// PopupClose
	//==================================================*
	function PopupClose() {
		$('.Popup').fadeOut(100);
		$('html').removeClass('is-Hidden');
	}

	$(document).on('click', '.BasicPopupClosed, .PopupDim', PopupClose);


	// SingleShare
	//==================================================*
	function SingleShare() {
		if($('.SharePopup').hasClass('is-View')){
			$('.SharePopup').removeClass('is-View');
			$(this).removeClass('is-View');
		}else{
			$('.SharePopup').addClass('is-View');
			$(this).addClass('is-View');
		}
	}

	$(document).on('click', '.SingleHeaderShare-btn', SingleShare);
	
	
	// TodayLetterHeaderMetaShare
	//==================================================*
	function SingleShare() {
		if($('.SharePopup').hasClass('is-View')){
			$('.SharePopup').removeClass('is-View');
			$(this).removeClass('is-View');
		}else{
			$('.SharePopup').addClass('is-View');
			$(this).addClass('is-View');
		}
	}

	$(document).on('click', '.TodayLetterHeaderMetaShare-btn', SingleShare);

	// function copyToClipboard_vn() {
		// var $temp = $("<input>");
		// $("body").append($temp);
		// $temp.val($('#url_share_post').text()).select();
		// document.execCommand("copy");
		// $temp.remove();
	// }

	// $(document).on('click', '.SharePopupCopy-btn', copyToClipboard_vn);


	// PostCategoryTab
	//==================================================*
	var PostCategoryTab = new Swiper(".PostCategoryTab-container", {
		observer: true,
		observeParents: true,
		watchOverflow: true,
		slidesPerView: 'auto',
		freeMode: true,
	});


	// LoginAccountCont
	//==================================================*
	function LoginAccountCont() {
		var idx = $(this).closest('.LoginAccountTab-item').index();
		  $(this).closest('.LoginAccountTab-item').addClass('is-Current').siblings('.LoginAccountTab-item').removeClass('is-Current');
		  $('.LoginAccountCont-item').eq(idx).addClass('is-Current').siblings('.LoginAccountCont-item').removeClass('is-Current');
		return false;
	}

	$(document).on('click', '.LoginAccountTab-link', LoginAccountCont);




	// selectEmail
	//==================================================*

	$('#selectEmail').change(function(){ $("#selectEmail option:selected").each(function () {
		if($(this).val()== '1'){ //직접입력일 경우
			$("#str_email02").val(''); //값 초기화
			$("#str_email02").attr("disabled",false);   //활성화
		}else{ $("#str_email02").val($(this).text()); //선택값 입력
			$("#str_email02").attr("disabled",true); //비활성화
		}
	});
	})


	// Progress Indicator
	//==================================================*
	if($('.SiteSingle').length > 0){
		function ProgressIndicator() {
			$(window).scroll(function() {
				var documentHeight = $(document).height();
				var windowScrollTop = $(window).scrollTop();
				var windowHeight = $(window).height();
				var singleContHeight = $('.site-Content').height();
				var siteFooter =  $('.site-footer').outerHeight();
				var scrollPercent = 100 * windowScrollTop / (documentHeight - windowHeight - siteFooter - 70);
				var rotateScrollPercent = scrollPercent * 10;
				$('.SingleContBar-bar').css('width', scrollPercent +"%");
				$('.SingleContBar-Cr').css({'transform':'rotate('+rotateScrollPercent+'deg)'});
			});
		}
		ProgressIndicator();


		$(window).on('resize', function(){
			ProgressIndicator();
		});
	}




	// SingleCardSlide
	//==================================================*
	var SingleCardSlideThumb = new Swiper(".SingleCardSlideThumb", {
		spaceBetween: 20,
		slidesPerView: 5,
		freeMode: true,
		watchSlidesProgress: true,
		breakpoints: {
			1440: {
				spaceBetween: 10,
			  },
			767: {
				spaceBetween: 5,
			  },
		}
	});

	var SingleCardSlideMain = new Swiper(".SingleCardSlideMain", {
        navigation: {
          nextEl: ".SingleCardSlide-next",
          prevEl: ".SingleCardSlide-prev",
        },
        thumbs: {
          swiper: SingleCardSlideThumb,
        },

		breakpoints: {
			767: {
				scrollbar: {
				  el: ".SingleCardSlideThumb-scrollbar",
				  hide: true,
				},
			  },
		   }
    });


	// SingleTalkSlide
	//==================================================*
	 var SingleTalkSlide = new Swiper(".SingleTalkSlide-container", {
		slidesPerView: "auto",
        navigation: {
          nextEl: ".SingleTalkSlideArrow-next",
          prevEl: ".SingleTalkSlideArrow-prev",
		}
	});


	// SingleRelateSlide
	//==================================================*
	 var SingleRelateSlide = new Swiper(".SingleRelateSlide-container", {
		slidesPerView: "auto",
        navigation: {
          nextEl: ".SingleRelateSlideArrow-next",
          prevEl: ".SingleRelateSlideArrow-prev",
		},
	});

	// 앵커 이동
	//==================================================*
	function anchorScroll() {
		$('html, body').animate({
		  scrollTop: $($.attr(this, 'href')).offset().top
		}, 500);
		return false;
	}

	$(document).on('click', '.TodayLetterHeaderText-link', anchorScroll);

	//TopBtn
	//==================================================*
	if($('.TopButton').length > 0){
		$(window).scroll(function () {
			if ($(this).scrollTop() > 200) {
				$('.TopButton').addClass('is-Open');
			} else {
				$('.TopButton').removeClass('is-Open');
			}
		});
	}

	function TopBtn() {
		$('html,body').animate({
			scrollTop:0
		}, 500);
	}

	$(document).on('click', '.TopButton', TopBtn);



	//FAQ
	//==================================================*

	function FAQDropDown() {
		if($(this).closest('.FaqItem').hasClass('is-View')){
			$(this).closest('.FaqItem').removeClass('is-View').find('.FaqItemCont').slideUp(200);
		}else{
			$(this).closest('.FaqItem').addClass('is-View').find('.FaqItemCont').slideDown(200);
		}
	}
	
	$(document).on('click', '.FaqItemTitle-link', FAQDropDown);

	// 리뷰 셀렉트박스
	//==================================================*
	function reviewSelect() {
		var Select = $(this).parent('.ReplyItemHeaderMore');
		if(Select.hasClass('is-Open')){
			Select.removeClass('is-Open');
		}else{
			$('.ReplyItemHeaderMore').removeClass('is-Open')
			Select.addClass('is-Open').closest('.LiveTalkBtm-item');
		}
	}

	$(document).on('click', '.ReplyItemHeaderMoreLink', reviewSelect);


	$(document).mouseup(function (e){
		if(!$('.ReplyItemHeaderMore').is(e.target) && $('.ReplyItemHeaderMore').has(e.target).length === 0){
			$('.ReplyItemHeaderMore').removeClass('is-Open');
		}
	});



	// OtherReplyBtn
	//==================================================*
	function OtherReplyBtn() {
		if($(this).closest('.OtherReply').hasClass('is-View')){
			$(this).closest('.OtherReply').removeClass('is-View');
		}else{
			$(this).closest('.OtherReply').addClass('is-View');
		}
	}

	$(document).on('click', '.OtherReplyBtn', OtherReplyBtn);


	//  ReplyItemContInput
	//==================================================*
	function ReplyItemContInput() {
		if($(this).closest('.ReplyItem').find('.ReplyItemContInput').hasClass('is-View')){
			$(this).closest('.ReplyItem').find('.ReplyItemContInput').removeClass('is-View');

		}else{
			$(this).closest('.ReplyItem').find('.ReplyItemContInput').addClass('is-View');
			if($('.ReplyItemContInput').hasClass('is-View')){
				$(this).closest('.ReplyItem').find('.ReplyItemHeaderMore').removeClass('is-Open');
			}

		}
	}

	$(document).on('click', '.j-ReplyBtn', ReplyItemContInput);




	// ReplyCancelBtn
	//==================================================*
	function ReplyCancelBtn() {
		$('.ReplyItemContInput').removeClass('is-View');
	}

	$(document).on('click', '.cancel-reply', ReplyCancelBtn);




	//  MyContsOpenBtn
	//==================================================*
	function MyContsOpenBtn() {
		$('.SearchPostItemTopList').addClass('is-Open');
		$('.NewsletterItem').addClass('is-View');
		$('.CardNewsItem').addClass('is-View');
	}

	$(document).on('click', '.MyContsOpenBtn', MyContsOpenBtn);
	
	

	//  MyContsClosedBtn
	//==================================================*
	function MyContsClosedBtn() {
		$('.SearchPostItemTopList').removeClass('is-Open');
		$('.NewsletterItem').removeClass('is-View');
		$('.CardNewsItem').removeClass('is-View');
	}

	$(document).on('click', '.MyContsClosedBtn', MyContsClosedBtn);

	//  MainChecked
	//==================================================*
	function mailsterChage() {
		 if($(this).is(":checked")){
			 $(this).parent('label').addClass('is-checked');
        }else{
            $(this).parent('label').removeClass('is-checked');
        }
	}

	$(document).on('change', 'input[id*="mailster-"]', mailsterChage);
	
	
	//  video del
	//==================================================*
	 $('a[href="?category=video"]').parent('.swiper-slide').addClass('is-Del');
	
	
	// 마이페이지 비밀번호 노출
	//==================================================*
	function PasswordCont() {
		if($('.PasswordCont').hasClass('is-View')){
			$('.PasswordCont').removeClass('is-View');
			$("#pass_ch_flag").val('N');
			//console.log("A");
		}else{
			$('.PasswordCont').addClass('is-View');
			$("#pass_ch_flag").val('Y');
			//console.log("B");
		}
	}

	$(document).on('click', '.PasswordViewBtn', PasswordCont);
})(jQuery);

