jQuery.extend(jQuery.fn, {
    /*
     * check if field value lenth more than 3 symbols ( for name and comment )
     */
    validate: function () {
        if (jQuery(this).val().length < 3) {jQuery(this).addClass('error');return false} else {jQuery(this).removeClass('error');return true}
    },
    /*
     * check if email is correct
     * add to your CSS the styles of .error field, for example border-color:red;
     */
    validateEmail: function () {
        var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/,
            emailToValidate = jQuery(this).val();
        if (!emailReg.test( emailToValidate ) || emailToValidate == "") {
            jQuery(this).addClass('error');return false
        } else {
            jQuery(this).removeClass('error');return true
        }
    },
});

jQuery(function($){

    // define some vars
    var button = $('#submit'), // submit button
        respond = $('#respond'), // comment form container
        commentlist = $('.LiveTalkBtm-list'), // comment list container
        cancelreplylink = $('#cancel-comment-reply-link');

    function loadtotalcount() {
        $.ajax({
            type : 'POST',
            url : community_script.ajax_url, // admin-ajax.php URL
            data: $('#commentform').serialize() + '&action=countcomment', // send form data + action parameter
            beforeSend: function(xhr){
                $('body').addClass("loading");
                $('.LiveTalkBtm-list').css({'cursor': 'wait'});
            },
            error: function (request, status, error) {
                if( status == 500 ){
                    alert( 'Error while adding comment' );
                } else if( status == 'timeout' ){
                    alert('Error: Server doesn\'t respond.');
                } else {
                    // process WordPress errors
                    var wpErrorHtml = request.responseText.split("<p>"),
                        wpErrorStr = wpErrorHtml[1].split("</p>");

                    alert( wpErrorStr[0] );
                }
            },
            success: function ( res ) {
                $('body').removeClass("loading");
                $('.LiveTalkBtm-list').css({'cursor': 'default'});
                if(res) {
                    let data = JSON.parse(res);
                    $('.LiveTalkTop-num').text(data.total);
                }
            },
            complete: function() {
                button.removeClass('loadingform').attr("disabled", false);
            }
        });
    }

    function loadNewComment() {

        if(!$('body').hasClass('edit-click')){
            offset_comments  = $('.LiveTalkTop-reset').attr('comments_per_page');
            $.ajax({
                type : 'POST',
                url : community_script.ajax_url, // admin-ajax.php URL
                data: $('#commentform').serialize()  + '&action=resetcomments' + '&offset_comments=' +offset_comments,
                dataType: "json",

                beforeSend: function() {
                    $('body').addClass("loading");
                    $('.LiveTalkBtm-list').css({'cursor': 'wait'});
                },

                success: function(myResult) {
                    $('.loadmore_comments').attr('page', '1');
                    $('body').removeClass("loading");
                    $('.LiveTalkBtm-list').css({'cursor': 'default'});
                    $('.LiveTalkBtm-list li').remove();
                    $('.LiveTalkBtm-list').append(myResult.message);
                    if(myResult.countcomment > offset_comments ){
                        $('.loadmore_comments').removeClass('hidden');
                    }
                },
                error: function(error) {
                    console.log(error)

                }
            });

        }

    }

    var offset_comments  = $('.LiveTalkTop-reset').attr('comments_per_page');
    $('body').on('click', '.loadmore_comments',function(){
     
        let total = $(this).attr('totalcomments');
        let id_post = $(this).data('id');
        let page = $(this).attr('page');
        $.ajax({ // Hàm ajax
            type: "POST", //Phương thức truyền post hoặc get
            async: false,
            url: community_script.ajax_url, // Nơi xử lý dữ liệu
            data: {
                action: "load_more_comments", //Tên action, dữ liệu gởi lên cho server
                offset_comments: offset_comments, // gởi số lượng bài viết đã hiển thị cho server
                id_post: id_post,
                page : page,

            },

            beforeSend: function () {
                $('.LiveTalkBtm-list').css({'cursor': 'wait'});
                $('body').addClass("loading");
            },
            success: function (response) {
                $('.loadmore_comments').attr('page', parseInt(page) + 1);
                $('body').removeClass("loading");
                $('.LiveTalkBtm-list').css({'cursor': 'default'});
                $('.LiveTalkBtm-list').append(response);
                if(offset_comments*(parseInt(page) + 1) >= total){
                    $('.loadmore_comments').addClass( "hidden" );
                }


            },
            error: function () {
                //Làm gì đó khi có lỗi xảy ra
                console.log('The following error occured');
            }
        });
    });

    // reset community  home and single
    $(".LiveTalkTop-reset").on('click', function(event) {
        event.preventDefault();
        loadtotalcount();
        loadNewComment();
    });

    /*
     * On comment form submit
     */
    $( '#commentform' ).on('submit', function(e){
        e.preventDefault();
        let classthis = $(this);
        // if user is logged in, do not validate author and email fields
        if( $( '#author' ).length )
            $( '#author' ).validate();

        if( $( '#email' ).length )
            $( '#email' ).validateEmail();

        // validate comment in any case
        $( '#comment' ).validate();


        //console.log($('#comment').val().trim());
        if($('#comment').val().trim() != ''){
            // if comment form isn't in process, submit it
            if ( !button.hasClass( 'loadingform' ) && !$( '#author' ).hasClass( 'error' ) && !$( '#email' ).hasClass( 'error' ) && !$( '#comment' ).hasClass( 'error' ) ){
                // ajax request
                $.ajax({
                    type : 'POST',
                    dataType: 'json',
                    url : community_script.ajax_url, // admin-ajax.php URL
                    data: $(this).serialize() + '&action=ajaxcomments', // send form data + action parameter
                    beforeSend: function(xhr){
                        // what to do just after the form has been submitted
                        $('body').addClass("loading");
                        $('.LiveTalkMidBtn').attr("disabled", true);
                        button.addClass('loadingform');
                    },
                    error: function (request, status, error) {
                        if( status == 500 ){
                            alert( 'Error while adding comment' );
                        } else if( status == 'timeout' ){
                            alert('Error: Server doesn\'t respond.');
                        } else {
                            return;
                        }
                    },
                    success: function ( addedCommentHTML ) {
                        // console.log(addedCommentHTML.message)
                        $('body').removeClass("loading");
                        // if this post already has comments
                        if( commentlist.length > 0 ){

                            // if in reply to another comment
                            if( respond.parent().hasClass( 'comment' ) ){

                                // if the other replies exist
                                if( respond.parent().children( '.children' ).length ){
                                    respond.parent().children( '.children' ).append( addedCommentHTML.message );
                                } else {
                                    // if no replies, add <ol class="children">
                                    addedCommentHTML.message = '<ol class="children">' + addedCommentHTML.message + '</ol>';
                                    respond.parent().append( addedCommentHTML.message );
                                }
                                // close respond form
                                cancelreplylink.trigger("click");
                            } else {
                                // simple comment
                                commentlist.prepend( addedCommentHTML.message );
                            }
                        }else{
                            // if no comments yet
                            addedCommentHTML.message = '<ol class="comment-list">' + addedCommentHTML.message + '</ol>';
                            respond.before( $(addedCommentHTML.message) );
                        }
                        if(addedCommentHTML.countcmt > offset_comments){
                            $('.loadmore_comments').removeClass('hidden');
                        }
                        else {
                            $('.loadmore_comments').addClass('hidden');
                        }
                        // clear textarea field
                        $('#comment').val('');
                    },
                    complete: function(){
                        // what to do after a comment has been added
                        button.removeClass( 'loadingform' ).val( '등록' );
                        loadtotalcount();
                    }
                });
                loadNewComment();
            }
        } else {
            if($('.Member').length > 0){
				$('.popup-comment-validate').addClass('is_view');
			}
        }
        return false;
    });

    // realtime community  home and single
    $(document).on( 'heartbeat-tick', function(e, data) {
        // If our response is not included in Heartbeat, stop
		var link = document.location.href;
		var link_arr	=	link.split("?");
		var link_url	=	link_arr[0];
		
		if(link_url == "http://the14f.com/" || link_url == "https://the14f.com/" || link_url == "http://www.the14f.com/" || link_url == "https://www.the14f.com/") {
			jQuery("#MAIN_TOKTOK_REF_BTN").trigger("click");
		} else{
			// if ( !data ) return;
			// // load count by voting
			// if( data.likeCount >= 0 ){
				// $('.VoteGoodCount .VoteGoodCount-num').html(data.likeCount);
				// $('.VoteGoodCount .VoteGoodCount-btn').attr("data-like", data.existQuery) //
				// $('.VoteSosoCount .VoteSosoCount-btn').attr("data-like", data.existQuery)
			// }
			// if( data.dislikeCount >= 0){
				// $('.VoteSosoCount .VoteSosoCount-num').html(data.dislikeCount)
				// $('.VoteGoodCount .VoteGoodCount-btn').attr("data-dislike", data.existDislikeQuery) //
				// $('.VoteSosoCount .VoteSosoCount-btn').attr("data-dislike", data.existDislikeQuery)
			// }
			// $('.VoteGoodCount .VoteGoodCount-btn').attr('data-exists', data.existStatus);
			// $('.VoteSosoCount .VoteSosoCount-btn').attr('data-exists', data.existStatus);

			// // load total count comment
			// loadtotalcount();
			// // load New Comment comment
			// loadNewComment();
		}
    });

    //delete comment community  home and single
    $('body').on('click', '.delete-comment',function(e) {
        e.preventDefault();
        let idComment = $(this).attr('data-id');
        let idUserComment = $(this).attr('data-user-id');
        let idpost = $(this).attr('data-idpost');
        $.ajax({ // Hàm ajax
            type: "POST",
            async: false,
            url: community_script.ajax_url,
            dataType: 'json',
            data: {
                action: "deletecomments",
                idComment: idComment,
                idUserComment : idUserComment,
                idpost: idpost
            },
            beforeSend: function () {
                $('body').addClass("loading");
            },
            success: function (response) {
                $('body').removeClass("loading");
                loadtotalcount();
                if(response.message) {
                    $('.LiveTalkBtm-item-'+idComment).remove();
                    if(response.totalcomments - 1 <= offset_comments){
                        $('.loadmore_comments').addClass('hidden');
                    }
                }else {
                    alert('Try again please');
                }
                loadNewComment();

            },
            error: function () {
                //Làm gì đó khi có lỗi xảy ra
                console.log('The following error occured');
            }
        });
    });

    //update comment community  home and single
    $('body').on('click', '.updateCommentBtn',function(e) {
        e.preventDefault();
        var datas = $(this).closest('form').serializeArray().reduce(function(obj, item) {
            obj[item.name] = item.value;
            return obj;
        }, {});
        let contentReply = $(this).siblings().find('.LiveTalkMidInput-input').val().trim();
        if(contentReply != ''){
            $.ajax({
                type: "POST",
                async: false,
                url: community_script.ajax_url,
                dataType: 'json',
                data: {
                    action: "updatecomment",
                    datas
                },
                beforeSend: function () {
                    $('.MainTalkCont').addClass("loading");
                },
                success: function (response) {
                    $('body').removeClass('edit-click');
                    if(response.message) {

                        loadNewComment();

                    }else {
                        $('.editComment').removeClass('active');
                    }
                },
                complete: function(){
                    $('.MainTalkCont').removeClass("loading");
                },
                error: function () {

                }
            });
        } else {
            $('.popup-comment-validate').addClass('is_view');
        }
    })

    $('body').on('click', '.edit-comment',function() {
        const id = $(this).attr('data-id');
        if(parseInt(id) > 0 ) {
            $('.editComment-'+id).toggleClass('active');
            $('body').addClass('edit-click');
        }
    })
    function ReportPopup() {
        $('[data-popup="ReportPopup"]').fadeIn(100);
        $('html').addClass('is-Hidden');
    }


    // function ReportData(idUser,idComment,idUserReported,idToktok,idurl) {

        // if($('html').hasClass('is-Hidden')){
            // var datas = [];
            // $('.ReportCheckbox-input').on('click', function () {
                // datas = $(this).closest('#ReportComment').serializeArray().reduce(function(obj, item) {
                    // obj[item.name] = item.name;
                    // return obj;
                // }, {});

            // });
            // $('body').on('click', '.BasicPopupLink',function(e) {
                // e.preventDefault();
                // let url = idurl;
                // $.ajax({
                    // type: "POST",
                    // async: false,
                    // url: community_script.ajax_url,
                    // dataType: 'json',
                    // data: {
                        // action: "reportcomment",
                        // idUser:idUser,
                        // idComment:idComment,
                        // datas: datas,
                        // idUserReported:idUserReported,
                        // idToktok :idToktok

                    // },

                    // beforeSend: function () {
                        // $('body').addClass("loading");
                    // },
                    // success: function (response) {
                        // $('body').removeClass("loading");
                        // $('.ReportPopupReason-list li input.ReportCheckbox-input').prop('checked', false);
                        // if(response.message ) {
                            // // loadNewComment();
                            // window.location.replace(url);
                        // }else {
                            // alert('Try again please');
                        // }
                    // },
                    // error: function () {

                    // }
                // });
            // });

        // }
    // }

    $('body').on('click', '.ReplyItemHeaderReport',function() {
        let idUser =  $(this).attr('data-id');
        let idComment =  $(this).attr('data-comment')
        let idUserReported =  $(this).attr('data-user_reported');
        let idToktok = $('.LiveTalk').attr('data-id');
        let idurl = $(this).attr('data-url');


        if (confirm('Are you sure you want to report this talk?')) {
            // Save it!
            ReportPopup()
            ReportData(idUser,idComment,idUserReported,idToktok,idurl)
        }
    });

    $('body').on('click', '.Submit-reply',function(e) {
        e.preventDefault();
        let data_id = $(this).attr('data-id');
        let user_id = $(this).attr('user-id');
        let comment_author = $(this).attr('comment-author');
        let idPost = $(this).attr('id-post');
        let content_rep = $(this).parent().siblings().find('input').val();
        if(content_rep != ''){
            $.ajax({
                type: "POST",
                async: false,
                url: community_script.ajax_url,
                dataType: 'json',
                data: {
                    action: "reply_comment",
                    data_id: data_id,
                    content_rep: content_rep,
                    user_id: user_id,
                    comment_author: comment_author,
                    idPost: idPost,
                },
                beforeSend: function () {

                },
                success: function (response) {

                    if(response.message) {

                        loadNewComment();

                    }else {
                        $('.editComment').removeClass('active');
                    }
                },
                complete: function(){
                    $('.MainTalkCont').removeClass("loading");
                },
                error: function () {

                }
            });
        } else {
			if($('.Member').length > 0){
				$('.popup-comment-validate').addClass('is_view');
			}
        }

    })

    $('.cancel-reply').click(function(){
        $('.ReplyItemContInput').removeClass('is-View');
    });

    $('.class_none_login').click(function () {
		if($('.Nonmember').length > 0){
			$('.popup-comment').addClass('is_view');
		}
    });
	

    $('.AlertBoxClosed-cmt, .AlertBoxClosed-cmt-val, .js-AlertClosed').click(function(){
        $('.popup-comment-validate').removeClass('is_view');
		$('.popup-comment').removeClass('is_view');
        $('.popup-comment-validate .AlertBox').removeClass('notshow');
	});
});

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
				//document.getElementById("MAIN_TOKTOK_LIST_SECTION").innerHTML	=	result_arr[3];
			} else{
				document.location.href	=	"/";
			}
		});
	}
}

function getCookie_14f(cookie_name) {
  var cookieValue=null;
    if(document.cookie){
        var array=document.cookie.split((escape(cookie_name)+'='));
        if(array.length >= 2){
            var arraySub=array[1].split(';');
            cookieValue=unescape(arraySub[0]);
        }
    }
    return cookieValue;
}


//톡톡 투표 버튼
var prev_g_status	=	"";
var prev_s_status	=	"";
function vote_toktok(tok_ID,current_user_id, vote_state) {
	
	var current_link	=  document.location.href;
	var share_flag		=	current_link.indexOf("?g=share");
	
	if(share_flag > -1) {
		var new_link	=	current_link.substring(0, share_flag);
	} else{
		var new_link	=	current_link;
	}
	
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
			//console.log(vote_state);
			jQuery("#MAIN_TOKTOK_REF_BTN").trigger("click");
			jQuery("#GOOD_VOTE_BTN").css({'cursor': 'pointer'});
			jQuery("#SOSO_VOTE_BTN").css({'cursor': 'pointer'});
			//console.log(response);
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
				document.location.href	=	new_link;
				return false;
			} else if(response == "GOOD_DEL_OK") {
				//비회원 투표인 경우 쿠키 삭제
				if(current_user_id == "0") {
					$.removeCookie("the14f_toktok_vode_G_"+tok_ID);
				}
				document.location.href	=	new_link;
				return false;
			} else if(response == "NOT_LIKED_DATA") {
				alert("투표 정보가 존재하지 않습니다.");
				return false;
			} else if(response == "SOSO_ADD_OK") {
				//비회원 투표인 경우 쿠키 저장
				if(current_user_id == "0") {
					setCookie("the14f_toktok_vode_S_"+tok_ID, tok_ID, 30);
					$.removeCookie("the14f_toktok_vode_G_"+tok_ID);
				}
				document.location.href	=	new_link;
				return false;
			} else if(response == "SOSO_DEL_OK") {
				if(current_user_id == "0") {
					$.removeCookie("the14f_toktok_vode_S_"+tok_ID);
				}
				document.location.href	=	new_link;
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

//톡톡 투표 새로고침
function toktok_vote_reload(current_user_id, current_toktok_id, good_ck, soso_ck) {
	// var current_user_id	=	"<?php echo $tmp_current_user_id;?>";
	// var current_toktok_id	=	"<?php echo $tmp_this_post_id;?>";
	// var good_vote_good_cookie	=	getCookie("the14f_toktok_vode_G_"+current_toktok_id);
	// var good_vote_soso_cookie	=	getCookie("the14f_toktok_vode_S_"+current_toktok_id);
	
	// if(current_user_id == 0 || current_user_id == "") {
		// if(good_vote_good_cookie != undefined && good_vote_good_cookie != "") {
			// if(good_vote_good_cookie == current_toktok_id) {
				// jQuery("#GOOD_VOTE_BTN").attr("class", "VoteGoodMain is-Active");
			// } else{
				// jQuery("#GOOD_VOTE_BTN").attr("class", "VoteGoodMain");
			// }
		// }
		
		// if(good_vote_soso_cookie != undefined && good_vote_soso_cookie != "") {
			// if(good_vote_soso_cookie == current_toktok_id) {
				// jQuery("#SOSO_VOTE_BTN").attr("class", "VoteSosoMain is-Active");
			// } else{
				// jQuery("#SOSO_VOTE_BTN").attr("class", "VoteSosoMain");
			// }
		// }
	// }
}

//톡톡 댓글 등록
function reg_comment(toktok_id, user_id) {
	var toktok_msg	=	"";
	
	if(toktok_id == undefined || toktok_id == "" || user_id == undefined || user_id == "") {
		jQuery("#POP_LAYER_LOGINMSG").attr("class", "popup-comment is_view");
		return false;
	} else{
		toktok_msg	=	jQuery("#toktok_msg").val();
		if(toktok_msg == undefined || toktok_msg == "") {
			jQuery("#POP_LAYER_MSG").attr("class", "popup-comment-validate is_view");
			return false;
		} else{
			var data    =   {
				"action"			:	"toktok_comment_register",
				"toktok_id"		:	toktok_id,
				"user_id"			:	user_id,
				"toktok_msg"	:	toktok_msg,
			};
			jQuery.post(mbc_dev.ajax_url, data, function(response) {
				//console.log(response);
				jQuery("#toktok_msg").val('');
				single_comment_reload(toktok_id, '8');
				if(response == "NOT_TOKID_PARAMETER") {
					alert("톡크 정보가 정확하지 않습니다.");
					return false;
				} else if(response == "PLEASE_LOGIN") {
					jQuery("#POP_LAYER_LOGINMSG").attr("class", "popup-comment is_view");
					return false;
				} else if(response == "PLEASE_MSG") {
					jQuery("#POP_LAYER_MSG").attr("class", "popup-comment-validate is_view");
					return false;
				} else if(response == "REGISTER_OK") {
					//jQuery("#POP_LAYER_TOK_COMPLETE").attr("class", "popup-comment is_view");
					return false;
				} else{
					alert("사용할 수 없는 기능입니다.");
					return false;
				}
			});
		}
	}
}

//톡톡대댓글 등록
function reg_tok_reply(toktok_id, tok_id) {
	var tok_reply_msg	=	"";
	
	if(tok_id == undefined || tok_id == "" | toktok_id == undefined || toktok_id == "") {
		alert("톡크 정보가 정확하지 않습니다.");
		return false;
	} else{
		tok_reply_msg	=	jQuery("#tok_reply_"+tok_id).val();
		if(tok_reply_msg == undefined || tok_reply_msg == "") {
			jQuery("#POP_LAYER_MSG").attr("class", "popup-comment-validate is_view");
			return false;
		} else{
			var data    =   {
				"action"		:	"toktok_reply_register",
				"toktok_id"	:	toktok_id,
				"tok_id"		:	tok_id,
				"reply_msg"	:	tok_reply_msg,
			};
			jQuery.post(mbc_dev.ajax_url, data, function(response) {
				single_comment_reload(toktok_id, '8');
				if(response == "PLEASE_LOGIN") {
					jQuery("#POP_LAYER_LOGINMSG").attr("class", "popup-comment is_view");
					return false;
				} else if(response == "REGISTER_OK") {
					//jQuery("#POP_LAYER_TOK_COMPLETE").attr("class", "popup-comment is_view");
					return false;
				} else{
					alert("사용할 수 없는 기능입니다.");
					return false;
				}
			});
		}
	}
}

//톡톡 페이징(더보기)
function next_page_view(totalPage, page_per_list, current_page, toktok_id) {
	var next_page	=	"";
	
	if(totalPage == undefined || page_per_list == undefined || current_page == undefined || totalPage == "" || page_per_list == "" || current_page == "" || toktok_id == "" || toktok_id == "") {
		alert("사용할 수 없는 기능입니다.");
		return;
	} else{
		if(Number(totalPage) <= Number(current_page)) {
			alert("마지막 페이지 입니다.");
			return;
		} else{
			next_page	=	Number(current_page)+1;

			var data    =   {
				"action"		:	"toktok_next_paging",
				"toktok_id"	:	toktok_id,
				"var_page"	:	next_page,
				"comments_per_page"	:	page_per_list,
			};
			jQuery.post(mbc_dev.ajax_url, data, function(response) {
				//console.log(response);
				var search_result	=	response.split("/^/");
				var search_all_total_cnt	=	search_result[0];
				var search_total_cnt		=	search_result[1];
				var search_total_page	=	search_result[2];
				var search_list				=	search_result[3];
				// console.log(search_all_total_cnt);
				// console.log(search_total_cnt);
				// console.log(search_total_page);
				// console.log(search_list);
				if(search_total_cnt > 0) {
					document.getElementById("TOKTOK_TOTAL_COUNT").innerHTML	=	search_all_total_cnt;
					jQuery("#TOKTOK_SINGLE_LIST_SECTION").append(search_list);
					if(Number(search_total_page) == Number(next_page)) {
						document.getElementById("SHOW_MORE_PAGING").style.display	=	"none";
					} else{
						document.getElementById("SHOW_MORE_PAGING").style.display	=	"block";
						document.getElementById("SHOW_MORE_PAGING").innerHTML	=	"<button class='PostCategoryContBtn loadmore_btn loadmore_comments' data-id='"+toktok_id+"' onclick=\"next_page_view('"+search_total_page+"',  '"+page_per_list+"', '"+next_page+"', '"+toktok_id+"');\"><span class='PostCategoryContBtn-text'>더보기</span></button>";
					}
				}
			});
		}
	}
}

//톡톡 리셋버튼 액션
function single_comment_reload(tok_ID, pagePerList) {
	if(tok_ID == undefined || tok_ID == "" || pagePerList == undefined || pagePerList == "") {
		alert("필수 항목이 누락 되었습니다.");
		return false;
	} else{
		var data    =   {
			"action"			:	"toktok_single_reload",
			"tok_id"			:	tok_ID,
			"pagePerList"	:	pagePerList,
		};
		jQuery.post(mbc_dev.ajax_url, data, function(response) {
			//console.log(response);
			var search_result	=	response.split("/^/");
			var search_all_total_cnt	=	search_result[0];
			var search_total_cnt		=	search_result[1];
			var search_total_page	=	search_result[2];
			var search_list				=	search_result[3];
			// console.log(search_total_cnt);
			// console.log(search_total_page);
			//console.log(search_list);
			if(search_total_cnt > 0) {
				document.getElementById("TOKTOK_TOTAL_COUNT").innerHTML	=	search_all_total_cnt;
				document.getElementById("TOKTOK_SINGLE_LIST_SECTION").innerHTML	=	search_list;
				//jQuery("#TOKTOK_SINGLE_LIST_SECTION").html(search_list);
				if(Number(search_total_page) == 1) {
					document.getElementById("SHOW_MORE_PAGING").style.display	=	"none";
				} else{
					document.getElementById("SHOW_MORE_PAGING").style.display	=	"block";
					document.getElementById("SHOW_MORE_PAGING").innerHTML	=	"<button class='PostCategoryContBtn loadmore_btn loadmore_comments' data-id='"+tok_ID+"' onclick=\"next_page_view('"+search_total_page+"',  '"+pagePerList+"', '1', '"+tok_ID+"');\"><span class='PostCategoryContBtn-text'>더보기</span></button>";
				}
			}
		});
	}
}

//톡댓글 수정
function edit_my_tok(toktok_id, tok_id) {
	var old_msg	=	"";
	if(tok_id == undefined || tok_id == "") {
		alert("사용할 수 없는 기능입니다.");
		return false;
	} else{
		//이전 메세지 확인
		old_msg	=	jQuery("#tok_reply_old_"+tok_id).val();
		//수정박스 활성화
		document.getElementById("REPLY_SECTION_"+tok_id).style.display	=	"block";
		jQuery("#REPLY_INPUT_SECTION_"+tok_id).attr("class", "ReplyItemContInput is-View");
		//입력박스에 이전 메세지 전송
		jQuery("#tok_reply_"+tok_id).val(old_msg);
		//버튼 변경
		document.getElementById("REPLY_ACC_BTN_"+tok_id).innerHTML	=	"<a href='javascript:void(0);' class='ReplyItemContInput-link' onclick=\"edit_my_tok_proc('"+toktok_id+"', '"+tok_id+"');\">수정</a><a href='javascript:void(0);' class='ReplyItemContInput-link ReplyCancelBtn' onclick=\"close_reply_section('"+tok_id+"');\">취소</a>";
	}
}

//톡댓글 수정 처리
function edit_my_tok_proc(toktok_id, tok_id) {
	var new_msg	=	"";
	if(tok_id == undefined || tok_id == "") {
		alert("사용할 수 없는 기능입니다.");
		return false;
	} else{
		new_msg	=	jQuery("#tok_reply_"+tok_id).val();
		if(new_msg == undefined || new_msg == "") {
			jQuery("#POP_LAYER_MSG").attr("class", "popup-comment-validate is_view");
			return false;
		} else{
			var data    =   {
				"action"			:	"toktok_comment_edit_proc",
				"toktok_id"		:	tok_id,
				"toktok_msg"	:	new_msg,
			};
			jQuery.post(mbc_dev.ajax_url, data, function(response) {
				//console.log(response);
				jQuery("#tok_reply_"+tok_id).val('');
				single_comment_reload(toktok_id, '8');
				if(response == "NOT_TOKID_PARAMETER") {
					alert("톡크 정보가 정확하지 않습니다.");
					return false;
				} else if(response == "PLEASE_LOGIN") {
					jQuery("#POP_LAYER_LOGINMSG").attr("class", "popup-comment is_view");
					return false;
				} else if(response == "PLEASE_MSG") {
					jQuery("#POP_LAYER_MSG").attr("class", "popup-comment-validate is_view");
					return false;
				} else if(response == "UPDATE_OK") {
					jQuery("#POP_LAYER_TOK_COMPLETE_EDIT").attr("class", "popup-comment is_view");
					return false;
				} else{
					alert("사용할 수 없는 기능입니다.");
					return false;
				}
			});
		}
	}
}

//톡댓글 삭제
function del_my_tok(toktok_id, tok_id) {
	var new_msg	=	"";
	if(tok_id == undefined || tok_id == "") {
		alert("사용할 수 없는 기능입니다.");
		return false;
	} else{
		var data    =   {
			"action"			:	"toktok_comment_del_proc",
			"toktok_id"		:	tok_id,
		};
		jQuery.post(mbc_dev.ajax_url, data, function(response) {
			//console.log(response);
			single_comment_reload(toktok_id, '8');
			if(response == "NOT_TOKID_PARAMETER") {
				alert("톡크 정보가 정확하지 않습니다.");
				return false;
			} else if(response == "PLEASE_LOGIN") {
				jQuery("#POP_LAYER_LOGINMSG").attr("class", "popup-comment is_view");
				return false;
			} else if(response == "DELETE_OK") {
				jQuery("#POP_LAYER_TOK_COMPLETE_DELETE").attr("class", "popup-comment is_view");
				return false;
			} else{
				alert("사용할 수 없는 기능입니다.");
				return false;
			}
		});
	}
}

//댓글 신고하기 레이어 오픈
function open_report_section(tok_id) {
	if(tok_id == undefined || tok_id == "") {
		alert("사용할 수 없는 기능입니다.");
		return;
	} else{
		var data    =   {
			"action"			:	"toktok_report_oprn",
			"toktok_id"		:	tok_id,
		};
		jQuery.post(mbc_dev.ajax_url, data, function(response) {
			//console.log(response);
			var result_arr	=	response.split("/^/");
			var result_cnt	=	result_arr.length;
			 
			if(result_arr[0] == "NOT_TOKID_PARAMETER") {
				alert("톡크 정보가 정확하지 않습니다.");
				return false;
			} else if(result_arr[0] == "PLEASE_LOGIN") {
				jQuery("#POP_LAYER_LOGINMSG").attr("class", "popup-comment is_view");
				return false;
			} else if(result_arr[0] == "OK") {
				var tmp_writer_length	=	result_arr[1].length;
				var slice_length	=	Math.ceil(tmp_writer_length/2);
				var print_writer_name	=	result_arr[1].substr(0,slice_length);
				jQuery("#report_tok_id").val(tok_id);
				document.getElementById("TOKTOK_REPORT_TOK_WRITER").innerHTML		=	print_writer_name+"****";
				document.getElementById("TOKTOK_REPORT_TOK_CONTENT").innerHTML	=	result_arr[2];
				document.getElementById("POP_LAYER_TOK_REPORT_FORM").style.display	=	"block";
			} else{
				alert("사용할 수 없는 기능입니다.");
				return false;
			}
		});
	}
}

//톡톡 신고 처리
function submit_tok_report() {
	var target_tok_id	=	"";
	var report_desc	=	[];
	var report_desc_str	=	"";
	
	target_tok_id	=	jQuery("#report_tok_id").val();
	jQuery("input:checkbox[name=tok_report]:checked").each(function() {
		var checkVal	=	jQuery(this).val();
       report_desc.push(checkVal);
    });
	report_desc_str	=	report_desc.join(",");
	
	if(report_desc_str == undefined || report_desc_str == "") {
		alert("신고사유를 선택해 주세요.");
		return false;
	} else{
		var data    =   {
			"action"			:	"toktok_report_proc",
			"toktok_id"		:	target_tok_id,
			"report_desc"	:	report_desc_str,
		};
		jQuery.post(mbc_dev.ajax_url, data, function(response) {
			var result_arr	=	response.split("^")
			single_comment_reload(result_arr[1], '8');
			if(result_arr[0] == "NOT_TOKID_PARAMETER" || result_arr[0] == "NO_COMMENT_DATA") {
				alert("톡크 정보가 정확하지 않습니다.");
				return false;
			} else if(result_arr[0] == "PLEASE_LOGIN") {
				jQuery("#POP_LAYER_LOGINMSG").attr("class", "popup-comment is_view");
				return false;
			} else if(result_arr[0] == "NO_REPORT") {
				alert("신고사유를 선택해 주세요.")
				return false;
			} else if(result_arr[0] == "OK") {
				alert("신고가 완료 되었습니다.");
				jQuery("#report_tok_id").val('');
				document.getElementById("TOKTOK_REPORT_TOK_WRITER").innerHTML		=	"";
				document.getElementById("TOKTOK_REPORT_TOK_CONTENT").innerHTML	=	"";
				document.getElementById("POP_LAYER_TOK_REPORT_FORM").style.display	=	"none";
				jQuery("input:checkbox[name='tok_report']").removeAttr("checked");
			} else{
				alert("사용할 수 없는 기능입니다.");
				return false;
			}
		});
	}
}

//톡톡대댓글 등록폼 오픈
function open_reply_section(tok_id) {
	if(tok_id == undefined || tok_id == "") {
		alert("톡크 정보가 정확하지 않습니다.");
		return false;
	} else{
		document.getElementById("REPLY_SECTION_"+tok_id).style.display	=	"block";
		jQuery("#REPLY_INPUT_SECTION_"+tok_id).attr("class", "ReplyItemContInput is-View");
	}
}

//톡톡댓슬 등록폼 닫기
function close_reply_section(tok_id) {
	if(tok_id == undefined || tok_id == "") {
		alert("톡크 정보가 정확하지 않습니다.");
		return false;
	} else{
		document.getElementById("REPLY_SECTION_"+tok_id).style.display	=	"none";
		jQuery("#REPLY_INPUT_SECTION_"+tok_id).attr("class", "ReplyItemContInput");
	}
}

//톡톡댓슬 등록폼 닫기
function close_sub_reply_section(tok_id) {
	if(tok_id == undefined || tok_id == "") {
		alert("톡크 정보가 정확하지 않습니다.");
		return false;
	} else{
		document.getElementById("SUB_REPLY_SECTION_"+tok_id).style.display	=	"none";
		//jQuery("#REPLY_INPUT_SECTION_"+tok_id).attr("class", "ReplyItemContInput");
	}
}

//대댓글 수정폼 오픈
function edit_my_sub_tok(toktok_id, sub_tok_id) {
	var old_msg	=	"";
	if(sub_tok_id == undefined || sub_tok_id == "") {
		alert("사용할 수 없는 기능입니다.");
		return false;
	} else{
		//이전 메세지 확인
		old_msg	=	jQuery("#tok_sub_reply_old_"+sub_tok_id).val();
		//수정박스 활성화
		document.getElementById("SUB_REPLY_SECTION_"+sub_tok_id).style.display	=	"block";
		//입력박스에 이전 메세지 전송
		jQuery("#tok_sub_reply_"+sub_tok_id).val(old_msg);
	}
}

//대댓글 수정 처리
function edit_my_sub_tok_proc(toktok_id, sub_tok_id) {
	var new_msg	=	"";
	if(sub_tok_id == undefined || sub_tok_id == "") {
		alert("사용할 수 없는 기능입니다.");
		return false;
	} else{
		new_msg	=	jQuery("#tok_sub_reply_"+sub_tok_id).val();
		if(new_msg == undefined || new_msg == "") {
			jQuery("#POP_LAYER_MSG").attr("class", "popup-comment-validate is_view");
			return false;
		} else{
			var data    =   {
				"action"			:	"toktok_comment_edit_proc",
				"toktok_id"		:	sub_tok_id,
				"toktok_msg"	:	new_msg,
			};
			jQuery.post(mbc_dev.ajax_url, data, function(response) {
				//console.log(response);
				jQuery("#tok_sub_reply_"+sub_tok_id).val('');
				single_comment_reload(toktok_id, '8');
				if(response == "NOT_TOKID_PARAMETER") {
					alert("톡크 정보가 정확하지 않습니다.");
					return false;
				} else if(response == "PLEASE_LOGIN") {
					jQuery("#POP_LAYER_LOGINMSG").attr("class", "popup-comment is_view");
					return false;
				} else if(response == "PLEASE_MSG") {
					jQuery("#POP_LAYER_MSG").attr("class", "popup-comment-validate is_view");
					return false;
				} else if(response == "UPDATE_OK") {
					jQuery("#POP_LAYER_TOK_COMPLETE_EDIT").attr("class", "popup-comment is_view");
					return false;
				} else{
					alert("사용할 수 없는 기능입니다.");
					return false;
				}
			});
		}
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
  // var x, y;
  // var val = document.cookie.split(';');
	// console.log(val);
  // for (var i = 0; i < val.length; i++) {
    // x = val[i].substr(0, val[i].indexOf('='));
    // y = val[i].substr(val[i].indexOf('=') + 1);
    // x = x.replace(/^\s+|\s+$/g, ''); // 앞과 뒤의 공백 제거하기
    // if (x == cookie_name) {
      // return unescape(y); // unescape로 디코딩 후 값 리턴
    // }
  // }
  var cookieValue=null;
    if(document.cookie){
        var array=document.cookie.split((escape(cookie_name)+'='));
        if(array.length >= 2){
            var arraySub=array[1].split(';');
            cookieValue=unescape(arraySub[0]);
        }
    }
    return cookieValue;
  
}