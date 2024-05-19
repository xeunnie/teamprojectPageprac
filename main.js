 (function($){
	 $(document).ready(function(){
		 /*카테고리 이동*/
		 if ($('.MainCategoryTab').length > 0) {
			function MainCategoryTabScroll() {
				var url_param = $(location).attr('href').split("?");
				var param = url_param[1];
				var headerHeight = $('.site-header').outerHeight();
				var offset = $('.MainCategoryTab').offset().top;
				var offsetTop =  offset - headerHeight;
				if (param) {
				  if (param.indexOf('category=') != -1) {
					$('html, body').scrollTop(offsetTop);
				  }
				  
				  if (param.indexOf('n=allLetter') != -1) {
					$('html, body').scrollTop(offsetTop);
				  }
				}
			}
			
			MainCategoryTabScroll();
			
			$(window).on('resize', function(){
				MainCategoryTabScroll();        
			});
		}
	 });

	/**
	 * CardNewsSlide
	 */
	 var CardNewsSlide = new Swiper(".CardNewsSlide-container", {
		observer: true,
		observeParents: true,
		watchOverflow: true,
		slidesPerView: "auto",
        navigation: {
          nextEl: ".CardNewsSlideArrow-next",
          prevEl: ".CardNewsSlideArrow-prev",
        },
		breakpoints: {
			767: {
				scrollbar: {
				  el: ".CardNewsSlide-scrollbar",
				  hide: true,
				},
			  },
		}
	});
	
	/**
	 * KeywordPostSlide
	 */
	 var KeywordPostSlide = new Swiper(".KeywordPostSlide-container", {
		observer: true,
		observeParents: true,
		watchOverflow: true,
		slidesPerView: 1,
		loop: true,
        navigation: {
          nextEl: ".KeywordPostSlide-next",
          prevEl: ".KeywordPostSlide-prev",
        },
		breakpoints: {
			767: {
				slidesPerView: 'auto',
				scrollbar: {
				  el: ".KeywordPostSlide-scrollbar",
				  hide: true,
				},
				loop: false,
			  },
		}
	});
	
	/**
	 * MainCategoryTabSlide
	 */
	 var MainCategoryTabSlide = new Swiper(".MainCategoryTab-container", {
		observer: true,
		observeParents: true,
		watchOverflow: true,
		slidesPerView: 'auto',
        freeMode: true,
	});
	
	 // LoginAccountCont
	//==================================================*
	function MainSubscribeBtn() {
		if($('.MainVisualLeft').hasClass('Subscribed')){
			$('.MainVisualLeft').removeClass('Subscribed');
		}else{
			$('.MainVisualLeft').addClass('Subscribed');
		}
	}
	
	$(document).on('click', '.SubscribeFormInput-btn', MainSubscribeBtn);
	
	
	/**
	 * MainTalk
	 */
	 var MainTalkSlide = new Swiper(".MainTalk-container", {
		slidesPerView: 1,
        navigation: {
          nextEl: ".MainTalkSlideArrow-next",
          prevEl: ".MainTalkSlideArrow-prev",
		}
	});

	
})(jQuery);

//톡톡 리셋버튼 액션
function main_comment_reload(tok_ID, pagePerList) {
	if(tok_ID == undefined || tok_ID == "" || pagePerList == undefined || pagePerList == "") {
		alert("필수 항목이 누락 되었습니다.");
		return false;
	} else{
		var data    =   {
			"action"			:	"toktok_reload",
			"tok_id"			:	tok_ID,
			"pagePerList"	:	pagePerList,
		};
		jQuery.post(mbc_dev.ajax_url, data, function(response) {
			var result_arr	=	response.split("|");
			var result_cnt	=	result_arr.length;
			// console.log(result_arr);
			// console.log(result_cnt);
			if(result_cnt == "5") {
				document.getElementById("TOKTOK_LIKE_COUNT").innerHTML				=	result_arr[1];
				document.getElementById("TOKTOK_DISLIKE_COUNT").innerHTML			=	result_arr[2];
				document.getElementById("TOKTOK_TOTAL_COUNT").innerHTML			=	result_arr[4];
				document.getElementById("MAIN_TOKTOK_LIST_SECTION").innerHTML	=	result_arr[3];
			} else{
				document.location.href	=	"/";
			}
		});
	}
}

//톡톡 투표 버튼
var prev_g_status	=	"";
var prev_s_status	=	"";
function vote_toktok(tok_ID,current_user_id, vote_state) {
	if(tok_ID == undefined || tok_ID == "" || vote_state == undefined || vote_state == "") {
		alert("필수 항목이 누락 되었습니다.");
		return false;
	} else{
		//기존 투표 플래그 확인
		var prev_good_flag	=	jQuery("#prev_vote_good_flag").val();
		var prev_soso_flag	=	jQuery("#prev_vote_soso_flag").val();

		var data    =   {
			"action"		:	"toktok_vote_action",
			"tok_id"		:	tok_ID,
			"user_id"		:	current_user_id,
			"vote_flag"		:	vote_state,
			"prev_good_flag":	prev_good_flag,
			"prev_soso_flag":	prev_soso_flag,
		};
		jQuery.post(mbc_dev.ajax_url, data, function(response) {
			//console.log(response);
			jQuery("#MAIN_TOKTOK_REF_BTN").trigger("click");
			jQuery("#GOOD_VOTE_BTN").css({'cursor': 'pointer'});
			jQuery("#SOSO_VOTE_BTN").css({'cursor': 'pointer'});
			
			if(response == "ALREADY_LIKED") {
				alert("투표는 한번만 할 수 있습니다.");
				return false;
			} else if(response == "ALREADY_SOSO") {
				alert("투표는 한번만 할 수 있습니다.");
				return false;
			} else if(response == "GOOD_ADD_OK") {
				//비회원 투표인 경우 쿠키 저장
				if(current_user_id == "0") {
					setCookie("the14f_toktok_vode_G_"+tok_ID, tok_ID, 30);
					$.removeCookie("the14f_toktok_vode_S_"+tok_ID);
				}
				location.reload();
				return false;
			} else if(response == "GOOD_DEL_OK") {
				//비회원 투표인 경우 쿠키 삭제
				if(current_user_id == "0") {
					$.removeCookie("the14f_toktok_vode_G_"+tok_ID);
				}
				location.reload();
				return false;
			} else if(response == "NOT_LIKED_DATA") {
				alert("투표 정보가 존재하지 않습니다.");
				return false;
			} else if(response == "SOSO_ADD_OK") {
				//비회원 투표인 경우 쿠키 저장
				//비회원 투표인 경우 쿠키 저장
				if(current_user_id == "0") {
					setCookie("the14f_toktok_vode_S_"+tok_ID, tok_ID, 30);
					$.removeCookie("the14f_toktok_vode_G_"+tok_ID);
				}
				location.reload();
				return false;
			} else if(response == "SOSO_DEL_OK") {
				if(current_user_id == "0") {
					$.removeCookie("the14f_toktok_vode_S_"+tok_ID);
				}
				location.reload();
				return false;
			} else if(response == "NOT_SOSO_DATA") {
				alert("투표 정보가 존재하지 않습니다.");
				return false;
			} else{
				alert("사용할 수 없는 기능입니다.");
				return false;
			}
		});
	}
}

function setCookie(cookie_name, value, days) {
  var exdate = new Date();
  exdate.setDate(exdate.getDate() + days);
  // 설정 일수만큼 현재시간에 만료값으로 지정

  var cookie_value = escape(value) + ((days == null) ? '' : '; expires=' + exdate.toUTCString());
  document.cookie = cookie_name + '=' + cookie_value;
}

function getCookie(cookie_name) {
  var x, y;
  var val = document.cookie.split(';');

  for (var i = 0; i < val.length; i++) {
    x = val[i].substr(0, val[i].indexOf('='));
    y = val[i].substr(val[i].indexOf('=') + 1);
    x = x.replace(/^\s+|\s+$/g, ''); // 앞과 뒤의 공백 제거하기
    if (x == cookie_name) {
      return unescape(y); // unescape로 디코딩 후 값 리턴
    }
  }
}

