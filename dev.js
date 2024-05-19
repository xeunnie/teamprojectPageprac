(function ($) {
    //click reset input search

    $("#mailster-email-4").attr("placeholder", "이메일");
    $("#mailster-your-name-4").attr("placeholder", "닉네임");
    $('.j-SelectAllBtn').on('click', function () {
        var type = $(this).attr('datatype');
        if (type == 'check') {
            $(this).attr('datatype', 'uncheck');
            $(':checkbox').each(function () {
                this.checked = true;
            });
        } else {
            $(this).attr('datatype', 'check');
            $(':checkbox').each(function () {
                this.checked = false;
            });
        }
    });

    $('.BasicPopupClosed').on('click', function () {
        location.reload();
    });

    // $('.BasicPopupLink').on('click', function () {
        // location.reload();
    // });

    $('.show-popup-register').click(function(){
        $('.UnregisterPopup').show();
        $('.Unregister02').hide();
    });

    $('.btn-close-pop1, .close-popup-un, .btn-close-pop2').click(function(){
        $('.UnregisterPopup').hide();
    });
    $('.close-popup-un').click(function(){
        let url = $(this).data('urlhonme');
        window.location.replace(url);
    });

    $('.j-DeleteBtn').on('click', function () {
        var type_val = $(this).attr('type_val');
        var val = [];
        $(':checkbox:checked').each(function (i) {
            val[i] = $(this).val();
        });
        if (confirm('삭제 하시겠습니까?')) {
            if (val.length == 0) {
                alert('삭제할 데이터를 선택하지 않았습니다');
            } else {
                data = {
                    'action': 'delete_list_resent',
                    'val': val,
                    'type_val': type_val,
                };
                $.ajax({ // Hàm ajax
                    type: "POST", //Phương thức truyền post hoặc get
                    async: false,
                    url: mbc_dev.ajax_url, // Nơi xử lý dữ liệu
                    data: data,
                    beforeSend: function () {
                        // Có thể thực hiện công việc load hình ảnh quay quay trước khi đổ dữ liệu ra
                    },
                    success: function (response) {
                        $('.MyContentsList').append(response);
                        location.reload();
                    },
                    error: function () {
                        //Làm gì đó khi có lỗi xảy ra
                        console.log('The following error occured');
                    }
                });
            }
        }
    });

    $('.not-login-user').on('click', function () {
        alert('로그인하지 않았습니다.');
    });

    $('.NavySmallButton, .AlertBoxClosed').click(function(){
        $('.LoginPopup').removeClass('show');
    })



    $('.onclick-reset').on('click', function () {
        $('.input-reset').attr('value', '');
    });

    // them hoac xoa bai viet khoi danh sach yeu thich
    // $('body').on('click', '.count-like-vn', function () {
        // let count_like = $(this).text();
        // let number_like = Number(count_like);
        // let id_post = $(this).attr('id_post');
        // let check_like = $(this).attr('check_like');
        // if (check_like == 1) {
            // $(this).attr('check_like', 0);
            // $(this).text(number_like - 1);
            // $(this).removeClass( "icon-love");
        // } else {
            // $(this).attr('check_like', 1);
            // $(this).text(number_like + 1);
            // $(this).addClass( "icon-love");
        // }

        // data = {
            // 'action': 'check_like_post',
            // 'id_post': id_post,
            // 'check_like': check_like,
        // };
        // $.ajax({ // Hàm ajax
            // type: "POST", //Phương thức truyền post hoặc get
            // async: false,
            // url: mbc_dev.ajax_url, // Nơi xử lý dữ liệu
            // data: data,
            // beforeSend: function () {
                // // Có thể thực hiện công việc load hình ảnh quay quay trước khi đổ dữ liệu ra
            // },
            // success: function (response) {
                // $('.count-like-vn').append(response);
            // },
            // error: function () {
                // //Làm gì đó khi có lỗi xảy ra
                // console.log('The following error occured');
            // }
        // });
    // });




    $('body').on('click', '.load-more-cardnews', function () {
        var button = $(this);
        let cat_card_new = button.attr('cat_cardnew');
        let data_page = button.attr('data_page');
        let max_page = button.attr('max_page');
        data = {
            'action': 'card_new_load_more',
            'cat_card_new': cat_card_new,
            'page': data_page,
            'max_page': max_page,

        };
        //console.log(data);
        $.ajax({
            url: mbc_dev.ajax_url,
            data: data,
            type: 'POST',
            beforeSend: function (xhr) {
                 button.css({'cursor': 'wait'});
            },
            success: function (data) {
                button.css({'cursor': 'pointer'});
                if (data) {

                    data_page++;
                    button.remove();
                    $('.bottonLoadMoreWrap').remove();
                    $('body').find('.PostCardNews-list').append(data)
                    //console.log(data);
                    if (data_page == max_page)
                        button.remove();
                } else {
                    button.remove();
                }
            }
        });
    });


    //
    var className_check = $('body').attr('class');
    var check_singlepost = className_check.indexOf("postid-");
    var check_toktok = className_check.indexOf("single-toktok");
    if( check_singlepost != -1 && check_toktok == -1){
        function greet_add_id_post(){
            let stringnew = className_check.slice(check_singlepost+7);
            let check_tab = stringnew.indexOf(" ");
            var id_post_add = stringnew.slice(0, check_tab);
            data = {
                'action': 'add_list_post_new',
                'id_post_add': id_post_add,
            };
            $.ajax({ // Hàm ajax
                type: "POST", //Phương thức truyền post hoặc get
                async: false,
                url: mbc_dev.ajax_url, // Nơi xử lý dữ liệu
                data: data,
                beforeSend: function () {
                    // Có thể thực hiện công việc load hình ảnh quay quay trước khi đổ dữ liệu ra
                },
                success: function (response) {
                    $('#content').append(response);

                },
                error: function () {
                    //Làm gì đó khi có lỗi xảy ra
                    console.log('The following error occured');
                }
            });
        }
        setTimeout(greet_add_id_post, 30000);
    }

// them hoac xoa bai viet khoi danh sach Newsletter
    $('body').on('click', '.add-list-custom-vn', function () {
        let text = $(this).attr('check_add_list');
        let id_post = $(this).attr('id_post');
        let post_type = $(this).attr('post_type');
        if (text == 'Add list') {
            $(this).attr("check_add_list","Cancel list");
            $(this).addClass( "is-Active");
        } else {
            $(this).attr("check_add_list","Add list");
            $(this).removeClass( "is-Active");
        }
        data = {
            'action': 'list-custom-vn',
            'text': text,
            'id_post': id_post,
            'post_type': post_type,
        };
        $.ajax({ // Hàm ajax
            type: "POST", //Phương thức truyền post hoặc get
            async: false,
            url: mbc_dev.ajax_url, // Nơi xử lý dữ liệu
            data: data,
            beforeSend: function () {
                // Có thể thực hiện công việc load hình ảnh quay quay trước khi đổ dữ liệu ra
            },
            success: function (response) {
                $('.SingleHeaderInfoMeta').append(response);
                if(text == 'Add list'){
                    alert('마이페이지에 스크랩되었습니다');
                }else {
                    alert('스크랩을 취소하였습니다');
                }
            },
            error: function () {
                //Làm gì đó khi có lỗi xảy ra
                console.log('The following error occured');
            }
        });
    });

    // them hoac xoa bai viet khoi danh sach Cardnew
    $('body').on('click', '.add-list-custom-vn-cardnew', function () {
        let text = $(this).text();
        let id_post = $(this).attr('id_post');
        if (text == 'Add list') {
            $(this).text('Cancel list');
        } else {
            $(this).text('Add list');
        }
        data = {
            'action': 'list-custom-vn-cardnew',
            'text': text,
            'id_post': id_post,
        };
        $.ajax({ // Hàm ajax
            type: "POST", //Phương thức truyền post hoặc get
            async: false,
            url: mbc_dev.ajax_url, // Nơi xử lý dữ liệu
            data: data,
            beforeSend: function () {
                // Có thể thực hiện công việc load hình ảnh quay quay trước khi đổ dữ liệu ra
            },
            success: function (response) {
                $('.SingleHeaderInfoMeta').append(response);
                if(text == 'Add list'){
                    alert('you have successfully added to the list');
                }else {
                    alert('you have unsubscribed from the list');
                }
            },
            error: function () {
                //Làm gì đó khi có lỗi xảy ra
                console.log('The following error occured');
            }
        });
    });

    //ajax delete keyword session
    $('body').on('click', '.RecentSearchItem-delete', function () {
        var button = $(this);
        let keyword = button.data('keyword');
        let link = button.data('link');
        let data = {
            'action': 'delete_keyword_search_session',
            'keyword': keyword,
            'link'  : link,
        };
        $.ajax({
            url: mbc_dev.ajax_url,
            data: data,
            type: 'POST',
            beforeSend: function (xhr) {
                button.css({'cursor': 'wait'});
                //$('.RecentSearchCont-list').empty();
            },
            success: function (data) {
                $html = '';
                if(data) {
                    let keys = JSON.parse(data);
                    if(typeof keys === 'object') {
                        keys = Object.keys(keys)
                            .map(function(key) {
                                return keys[key];
                            });
                    }
                    let dd = 0;
                    for (let i = keys.length -1 ;i >= 0;i--) {
                        dd++;
                        if(dd<4) {
                            $html +='<li class="RecentSearchCont-item">';
                            $html +='<div class="RecentSearchItem">';
                            $html +='<a href="'+link+'/?s='+keys[i]+'&submit-search-form=search'+'" class="RecentSearchItem-text">'+keys[i]+'</a>';
                            $html +='<a href="#" data-keyword="'+keys[i]+'" data-link="'+link+'" class="RecentSearchItem-delete"><span class="ab-text">delete</span></a>';
                            $html +='</div>';
                            $html +='</li>';
                        }

                    }

                    $('.RecentSearchCont-list').html($html)
                }
            }
        });
    });

    $('.load-more-newsletter').click(function (event) {
		var offset  = $('.load-more-newsletter').attr('offset');
		//var offset  = $('#NEWS_M_BTN').attr('offset');
        let total = $(this).attr('total');
        let posts_per_page = $(this).attr('posts_per_page');
        let category = $(this).attr('category');
		
        $.ajax({ // Hàm ajax
            type: "POST", //Phương thức truyền post hoặc get
            async: false,
            url: mbc_dev.ajax_url, // Nơi xử lý dữ liệu
            data: {
                action: "newsletter_load_more", //Tên action, dữ liệu gởi lên cho server
                //offset: posts_per_page, // gởi số lượng bài viết đã hiển thị cho server
				offset: offset, // gởi số lượng bài viết đã hiển thị cho server
                category: category,
            },
            beforeSend: function () {
                // Có thể thực hiện công việc load hình ảnh quay quay trước khi đổ dữ liệu ra
            },
            success: function (response) {
                $('.PostNewsletter-list').append(response);
				// console.log(offset);
				// console.log(posts_per_page);
				var next_page	=	Number(offset)+1;
                offset = Number(offset) * Number(posts_per_page) ;
				// console.log(offset);
				// console.log(total);
				$('.load-more-newsletter').attr('offset', next_page);
                if(offset >= total){
                    $("#NEWS_M_BTN").addClass( "none-button" );
					//console.log("AA");
                }
            },
            error: function () {
                //Làm gì đó khi có lỗi xảy ra
                console.log('The following error occured');
            }
        });
    });
    
    $('.load-more-list-post').click(function (event) {
		var offset  = $('.load-more-list-post').attr('offset');
        let total = $(this).attr('total');
        let posts_per_page = $(this).attr('posts_per_page');
        $.ajax({ // Hàm ajax
            type: "POST", //Phương thức truyền post hoặc get
            async: false,
            url: mbc_dev.ajax_url, // Nơi xử lý dữ liệu
            data: {
                action: "list_post_load_more", //Tên action, dữ liệu gởi lên cho server
                offset: offset, // gởi số lượng bài viết đã hiển thị cho server
            },
            beforeSend: function () {
                // Có thể thực hiện công việc load hình ảnh quay quay trước khi đổ dữ liệu ra
            },
            success: function (response) {
                $('.NoticePostList-list').append(response);
                offset = Number(offset) + Number(posts_per_page) ;
                if(offset >= total){
                    $('.load-more-list-post').addClass( "none-button" );
                }
            },
            error: function () {
                //Làm gì đó khi có lỗi xảy ra
                console.log('The following error occured');
            }
        });
    });
    
    $('.load-more-toktok').click(function (event) {
		var offset_toktok  = $('.load-more-toktok').attr('offset_toktok');
        let total = $(this).attr('total');
        let posts_per_page = $(this).attr('posts_per_page');
        let category = $(this).attr('category1');
		
        $.ajax({ // Hàm ajax
            type: "POST", //Phương thức truyền post hoặc get
            async: false,
            url: mbc_dev.ajax_url, // Nơi xử lý dữ liệu
            data: {
                action: "toktok_load_more", //Tên action, dữ liệu gởi lên cho server
                offset: offset_toktok, // gởi số lượng bài viết đã hiển thị cho server
                category: category,
            },
            beforeSend: function () {
                $('body').addClass("loading");
            },
            success: function (response) {
                $('body').removeClass("loading");
                $('.PostCommunity-list').append(response);
                offset_toktok = Number(offset_toktok) + Number(posts_per_page) ;
				document.getElementById('tok_more_btn').setAttribute('offset_toktok', offset_toktok);
                if(offset_toktok >= total){
                    $('.load-more-toktok').addClass( "none-button" );
                }
            },
            error: function () {
                //Làm gì đó khi có lỗi xảy ra
                console.log('The following error occured');
            }
        });
    });

    //tab search
    $('.SearchPostContTab-list .search-tab-1').click(function(){
        $(this).addClass('is-Current');
        $('.search-tab-2, .search-tab-3').removeClass('is-Current');
        $('.result-postype1').addClass('is-Current');
        $('.result-postype2, .result-postype3').removeClass('is-Current');
    });

    $('.SearchPostContTab-list .search-tab-2').click(function(){
        $(this).addClass('is-Current');
        $('.search-tab-1, .search-tab-3').removeClass('is-Current');
        $('.result-postype2').addClass('is-Current');
        $('.result-postype1, .result-postype3').removeClass('is-Current');
    });

    $('.SearchPostContTab-list .search-tab-3').click(function(){
        $(this).addClass('is-Current');
        $('.search-tab-1, .search-tab-2').removeClass('is-Current');
        $('.result-postype3').addClass('is-Current');
        $('.result-postype2, .result-postype1').removeClass('is-Current');
    });

    $('.SearchPostContTab-link').click(function (event) {
        event.preventDefault();
    })


})(jQuery);

(function($) {
    $('body').on('click', '.user-submit', function(e) {
        e.preventDefault();
        var datas = $('.wp_user_form_login').serializeArray().reduce(function(obj, item) {
			//console.log("BBB");
            obj[item.name] = item.value;
            return obj;
        }, {});
		
		// $('.GrayInput-text.username').addClass('GrayInput-input');
		// $('.GrayInput-text.password').addClass('GrayInput-input');
		jQuery("#login_username_box").attr("class", "GrayInput");
		$('.username_error').text("");
        $('.username_error').removeClass('ErrorText');
		jQuery("#login_passwrod_box").attr("class", "GrayInput IconPassword");
		$('.password_error').text("");
        $('.password_error').removeClass('ErrorText');

        $.ajax({
            type : "post",
            dataType : "json",
            url : mbc_dev.ajax_url,
            data : {
                action: "cct_validate_login",
                datas
            },
            context: this,
            beforeSend: function(){
                $('.user-submit').css({'cursor': 'wait'});
            },
            success: function(response) {
                // $('.user-submit').css({'cursor': 'default'});
                let username_error = '';
                let password_error = '';
                let errors = response.errors || ''
                if (errors.length !== 0) {
                    if (errors.username) {
                        username_error = errors.username;
                        $('.username_error').text(username_error);
                        $('.username_error').addClass('ErrorText');
						$('.username_error').parent('.LoginForm-item').children('.GrayInput').addClass('error');
                        $('.GrayInput-text.username').addClass('GrayInput-input');
                    }
                    if (errors.password) {
                        password_error = errors.password;
                        $('.password_error').text(password_error);
                        $('.password_error').addClass('ErrorText');
                        $('.password_error').parent('.LoginForm-item').children('.GrayInput').addClass('error');
                        $('.GrayInput-text.password').addClass('GrayInput-input');
                    }
					$('.user-submit').css({'cursor': 'pointer'});
                }else {
                    window.location.href=datas.redirect_to;
                }
            },
            error: function( jqXHR, textStatus, errorThrown ){
                console.log( 'The following error occured: ' + textStatus, errorThrown );
            },
        })
        return false;
    })

    $('#avatar').change(function (){
        $("#form-avatar-change").submit();
    })

    $("#form-avatar-change").submit(function (e){
        e.preventDefault();

        setTimeout(function (){
            var datas = $('#form-avatar-change').serializeArray().reduce(function(obj, item) {
                obj[item.name] = item.value;
                return obj;
            }, {});
            $.ajax({
                type : "post",
                dataType : "json",
                url : mbc_dev.ajax_url,
                data : {
                    action: "mbc_upload_avatar",
                    image
                },
                context: this,
                beforeSend: function(){

                },
                success: function(response) {
                    console.log(response)
                },
                error: function( jqXHR, textStatus, errorThrown ){
                    console.log( 'The following error occured: ' + textStatus, errorThrown );
                },
            })
            return false;
        }, 1000)
    })
}(jQuery));

(function($) {
    $('body').on('click', '.mbc-update-user', function(e) {
        e.preventDefault();
        var datas2 = $('.mbc-update-user-form').serializeArray().reduce(function(obj, item) {
            obj[item.name] = item.value;
            return obj;
        }, {});
        let url = $('#mbc-update-user').attr('data-url');
        let check_agree = $('#agree').is(':checked');
		var old_user_nickname	=	$("#old_nickname").val();
		var check_pass_flag	=	$("#pass_ch_flag").val();
        $.ajax({
            type : "post",
            dataType : "json",
            url : mbc_dev.ajax_url,
            data : {
                action: "mbc_validate_update_user",
                datas2,
                subscriber: check_agree,
				old_user_nickname: old_user_nickname,
				check_pass_flag: check_pass_flag,
            },
            context: this,
            beforeSend: function(){
                $('.mbc-update-user').css({'cursor': 'wait'});
            },
            success: function(response) {
                $('.mbc-update-user').css({'cursor': 'pointer'});
                let username_error = '';
                let password_error = '';
                let usermail_error = '';
                let confirm_password_error = '';
                let errors = response.errors || ''
                if (errors.length !== 0) {
                    if (errors.username) {
                        username_error = errors.username;
                        $('.username_error').text(username_error);
                        $('.username_error').addClass('ErrorText');
                        $('.username_error').closest('.ProfileItemCont-item').find('.GrayInput').addClass('error');
                        $('.GrayInput-text.username').addClass('GrayInput-input');
                    }
                    if (errors.password) {
                        password_error = errors.password;
                        $('.password_error').text(password_error);
                        $('.password_error').addClass('ErrorText');
                        $('.password_error').closest('.ProfileItemCont-item').find('.GrayInput').addClass('error');
                        $('.GrayInput-text.password').addClass('GrayInput-input');
                    }
                    if(errors.usermail){
                        usermail_error = errors.usermail;
                        $('.usermail_error').text(usermail_error);
                        $('.usermail_error').addClass('ErrorText');
                        $('.GrayInput-text.usermail').addClass('GrayInput-input');
                    }
                    if(errors.confirm_password){
                        confirm_password_error = errors.confirm_password;
                        $('.confirm_password_error').text(confirm_password_error);
                        $('.confirm_password_error').addClass('ErrorText');
                        $('.confirm_password_error').closest('.ProfileItemCont-item').find('.GrayInput').addClass('error');
                        $('.GrayInput-text.confirm-password').addClass('GrayInput-input');
                    }
                }else {
                    window.location.href = url;
                }
            },
            error: function( jqXHR, textStatus, errorThrown ){
                console.log( 'The following error occured: ' + textStatus, errorThrown );
            },
        })
        return false;
    })

}(jQuery));

(function($) {

    function validateForm() {
        var email = $.trim($('input.usermail').val());
        if(email === "") {
            return false;
        }
        var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        return regex.test(email);
    }

    $('body').on('click', '.verify-email', function(e) {
        e.preventDefault();
        // var datas = $('.form-verify-mail').serializeArray().reduce(function(obj, item) {
        //     obj[item.name] = item.value;
        //     return obj;
        // }, {});
        if(validateForm()) {
            let email = $.trim($('input.usermail').val());
            if(email == ''){
                $('.usermail_error').html('유효한 이메일 형식이 아닙니다.');
                $('.usermail_error').addClass('ErrorText');
				$('.usermail_error_mail').closest('.LoginForm-item').find('.GrayInput').addClass('error');
            } else {
                $('.usermail_error').html('');
                $('.usermail_error').removeClass('ErrorText');
				$('.usermail_error_mail').closest('.LoginForm-item').find('.GrayInput').removeClass('error');
                $.ajax({
                    type : "post",
                    dataType : "json",
                    url : mbc_dev.ajax_url,
                    data : {
                        action: "validate_verify_mail",
                        email: email
                    },
                    context: this,
                    beforeSend: function(){
                        $('.verify-email').css({'cursor': 'wait'});
                    },
                    success: function(response) {
                        $('.verify-email').css({'cursor': 'pointer'});
                        $('.register-acc-btn').css("pointer-events", "auto");
                        $('.custom-vld-submit a').addClass('cannotclick').removeClass('register-acc-btn');
                        let usermail_error = '';
                        let errors = response.errors || '';
                        if (errors.length !== 0) {
                            if(errors.unique_mail){
                                usermail_error = errors.unique_mail;
                                $('.usermail_error_mail').text(usermail_error);
                                $('.usermail_error_mail').addClass('ErrorText');
								$('.usermail_error_mail').closest('.LoginForm-item').find('.GrayInput').addClass('error');
                                $('.GrayInput-text.usermail').addClass('GrayInput-input');
                            }
                        }else {
                            $('.LoginPopup').addClass('show');
                            $('.usermail_error_mail').removeClass('ErrorText');
                            $('.usermail_error_mail').text('');
							$('.usermail_error_mail').closest('.LoginForm-item').find('.GrayInput').removeClass('error');
                            $('.GrayInput-text.usermail').removeClass('GrayInput-input');
                        }
                    },
                    error: function( jqXHR, textStatus, errorThrown ){
                        console.log( 'The following error occured: ' + textStatus, errorThrown );
                    },
                })
                return false;
            }
        } else {
            $('.usermail_error_mail').text('유효한 이메일 형식이 아닙니다.');
            $('.usermail_error_mail').addClass('ErrorText');
            $('.usermail_error_mail').closest('.LoginForm-item').find('.GrayInput').addClass('error');
            $('.GrayInput-text.usermail').addClass('GrayInput-input');
        }
    })

$('body').on('click','.cannotclick',function(e){
    $( ".show-error-notmail" ).text( "[이메일 인증 하기] 버튼을 누르면 해당 이메일로 인증 기능이 발송됩니다. 인증 후 아래 정보를 작성하면 가입이 완료됩니다." );
})

    //submit create acc

    // $('body').on('click', '.register-acc-btn', function(e) {
        // e.preventDefault();
        // let pass = $.trim($('.item-pass input').val());
        // let re_pass = $.trim($('.item-pass-re input').val());
        // let nicename = $.trim($('.item-nicename input').val());
        // let idUser = $('input.usermail_step').data('iduser');
        // let check_agree1 = $('#agree01').is(':checked');
        // let check_agree2 = $('#agree02').is(':checked');
        // let check_agree3 = $('#agree03').is(':checked');
        // let check_agree = $('#agree').is(':checked');
        // $.ajax({
            // type : "post",
            // dataType : "json",
            // url : mbc_dev.ajax_url,
            // data : {
                // action: "create_acc_login",
                // pass: pass,
                // re_pass: re_pass,
                // nicename: nicename,
                // idUser: idUser,
                // check_agree1: check_agree1,
                // check_agree2: check_agree2,
                // check_agree3: check_agree3,
                // check_agree: check_agree
            // },
            // context: this,
            // beforeSend: function(){
                // $('.register-acc-btn').css({'cursor': 'wait'});
            // },
            // success: function(response) {
                // $('.register-acc-btn').css({'cursor': 'pointer'});
                // // console.log(response);
                // var url = mbc_dev.urlhomejs + '/register?&step=2';
                // let errors = response.errors || '';
                // if (errors.length !== 0) {
                    // if(errors.validate_pass){
                        // $('.item-pass .error_pass').addClass('ErrorText').text(errors.validate_pass);
                        // $('.item-pass').find('.GrayInput').addClass('error');
                    // } else {
                        // $('.item-pass .error_pass').removeClass('ErrorText').text('');
						// $('.item-pass').find('.GrayInput').removeClass('error');
                    // }
                    // if(errors.validate_re_pass){
						// $('.item-pass-re').find('.GrayInput').addClass('error');
                        // $('.item-pass-re .error_pass_re').addClass('ErrorText').text(errors.validate_re_pass);
                    // } else {
						// $('.item-pass-re').find('.GrayInput').removeClass('error');
                        // $('.item-pass-re .error_pass_re').removeClass('ErrorText').text('');
                    // }
                    // if(errors.username){
                        // $('.item-nicename .error_nicename_space').addClass('ErrorText').text(errors.username);
                    // } else {
                        // $('.item-nicename .error_nicename_space').removeClass('ErrorText').text('');
                    // }
                    // if(errors.username){
                        // $('.item-nicename .error_nicename').addClass('ErrorText').text(errors.nicename_unique);
                    // } else {
                        // $('.item-nicename .error_nicename').removeClass('ErrorText').text('');
                    // }
                    // if(errors.checked1){
                        // // $('.err_check1').text(errors.checked1);
						// $('#agree01').siblings('.LoginCheckbox-label').addClass('error');
                    // } else {
                        // // $('.err_check1').text('');
						// $('#agree01').siblings('.LoginCheckbox-label').removeClass('error');
                    // }

                    // if(errors.checked2){
                        // // $('.err_check2').text(errors.checked2);
						// $('#agree02').siblings('.LoginCheckbox-label').addClass('error');
                    // } else {
                        // // $('.err_check2').text('');
						// $('#agree02').siblings('.LoginCheckbox-label').removeClass('error');
                    // }

                    // if(errors.checked3){
                        // // $('.err_check3').text(errors.checked3);
						// $('#agree03').siblings('.LoginCheckbox-label').addClass('error');
                    // } else {
                        // // $('.err_check3').text('');
						// $('#agree03').siblings('.LoginCheckbox-label').removeClass('error');
                    // }
                // }else {
                    // // $('.LoginPopup').addClass('show');
                    // $('.item-pass .error_pass').removeClass('ErrorText').text('');
                    // $('.item-pass-re .error_pass_re').removeClass('ErrorText').text('');
                    // $('.item-nicename .error_nicename').removeClass('ErrorText').text('');
                    // $('.item-nicename .error_nicename_space').removeClass('ErrorText').text('');
                    // // $('.Login-inner .login-done').show();
                    // // $('.Login-inner .about-list').empty();

                    // window.location.replace(url);
                // }
            // },
            // error: function( jqXHR, textStatus, errorThrown ){
                // console.log( 'The following error occured: ' + textStatus, errorThrown );
            // },
        // })
        // return false;
    // })

    $('.item-check-box').on('click', function(){
        if ($(this).is(':checked')) {
            $(this).parents('.item-add-checked').addClass('li-checked');
            $(this).attr('checked',true); //This line
        }else{
            $(this).parents('.item-add-checked').removeClass('li-checked');
            $(this).removeAttr('checked');
        }
    });

    $('#agree').click(function(){
        $(this).attr('checked',true); //This line
        $('#disagree').removeAttr('checked');
    });
    $('#disagree').click(function(){
        $(this).attr('checked',true); //This line
        $('#agree').removeAttr('checked');
    });

}(jQuery));

//unregister acc
(function($) {
    $('body').on('click', '.submit-unregister', function(e) {
        e.preventDefault();
        var url = mbc_dev.urlhomejs;
        var id = $(this).data('id');
		let option_email	=	$('#opinion-email').val();
        let opinion_k = $('#opinion-k').is(':checked');
        let etcunregister = $('#etc-unregister').val();
        let listUnr = [];
        $('.UnregisterContList-list li.li-checked').each(function(){
            let vl = $(this).find('.item-check-box').val();
            listUnr.push(vl);
        });
        $.ajax({
            type : "post",
            dataType : "json",
            url : mbc_dev.ajax_url,
            data : {
                action: "mbc_unregister_account",
                id:id,
				email:option_email,
                listUnr,
                opinion_k,
                etcunregister
            },
            context: this,
            beforeSend: function(){
                $('.button-forgot-password').css({'cursor': 'wait'});
            },
            success: function(response) {
                $('.button-forgot-password').css({'cursor': 'pointer'});
                $('.Unregister01').hide();
                $('.Unregister02').show();
                //window.location.replace(url);
            },
            error: function( jqXHR, textStatus, errorThrown ){
				$('.button-forgot-password').css({'cursor': 'pointer'});
                console.log( 'The following error occured: ' + textStatus, errorThrown );
            },
        })
        return false;
    });
}(jQuery));


(function($) {
    $('body').on('click', '.button-forgot-password', function(e) {
        e.preventDefault();
        var datas = $('.forgot-password-form').serializeArray().reduce(function(obj, item) {
            obj[item.name] = item.value;
            return obj;
        }, {});
		//console.log("Start");
		//console.log(datas);
        $.ajax({
            type : "post",
            dataType : "json",
            url : mbc_dev.ajax_url,
            data : {
                action: "find_mail_and_forgot_password",
                datas
            },
            context: this,
            beforeSend: function(){
                $('.button-forgot-password').css({'cursor': 'wait'});
            },
            success: function(response) {
				//console.log(response);
                $('.button-forgot-password').css({'cursor': 'pointer'});
                let user_email_error = '';
                let errors = response.errors || '';
                if (errors.length !== 0) {
                    if(errors.user_email){
                        user_email_error = errors.user_email;
                        $('.usermail_error').text(user_email_error);
                        $('.usermail_error').addClass('ErrorText');
                        $('.usermail_error').closest('.LoginAccountCont-item').find('.GrayInput').addClass('error');
                        $('.GrayInput-text.usermail').addClass('GrayInput-input');
                    }
                    if(errors.email_no){
                        $('.popup-emailno').addClass('show');
                        $('.popup-emailno').removeClass('notshow');
                        $('.popup-forgot-password').addClass('notshow');
                        $('.popup-forgot-password').removeClass('show');
                        $('.popup-emailno.popup-forgot-password').addClass('show');
                    }
                }else {
                    $('.popup-emailno').addClass('notshow');
                    $('.popup-emailno').removeClass('show');
                    $('.popup-forgot-password').addClass('show');
                    $('.popup-forgot-password').removeClass('notshow');
                    $('.popup-emailno.popup-forgot-password').addClass('show');
                }
            },
            error: function( jqXHR, textStatus, errorThrown ){
				
				console.log(textStatus);
				console.log(errorThrown);
				
                console.log( 'The following error occured: ' + textStatus, errorThrown );
            },
        })
        return false;
    });

    $('body').on('click', '.btn-find-email', function(e) {
        let findemail = $.trim($('input.find-email').val());
        if(findemail == ''){
            $('.findmail_error').html('유효한 이메일 형식이 아닙니다');
            $('.findmail_error').addClass('ErrorText');
            $('.findmail_error').closest('.LoginAccountCont-item').find('.GrayInput').addClass('error');
        }else{
            $.ajax({
                type : "post",
                dataType : "json",
                url : mbc_dev.ajax_url,
                data : {
                    action: "mbc_find_email",
                    email: findemail
                },
                beforeSend: function () {
                    $('.btn-find-email').css({'cursor': 'wait'});
                },
                success: function (response) {
                    $('.btn-find-email').css({'cursor': 'pointer'});
                    let errors = response.errors || '';
                    let user_email_arr= '';
                    if (errors.length !== 0) {
                        $('.popup-find-emailno').addClass('show');
                        $('.popup-find-emailno').removeClass('notshow');
                        $('.popup-find-email').addClass('notshow');
                        $('.popup-find-email').removeClass('show');
                        $('.popup-find-emailno.popup-find-email').addClass('show');
                    }else {
                        var i = 0;
                        for (; i < (response.mbc).length ; i++) {
                            user_email_arr += response.mbc[i] + '</br>';
							var ret_email	=	response.mbc[i];
                        }
						var ret_email2	=	ret_email.replace(/ /g,"");
						document.getElementById("S_LOGON_BTN").innerHTML	=	"<a href='/login/?remember_email="+ret_email2+"' class='NavySmallButton'><span class='NavySmallButton-text'>로그인</span></a>";
                        $('.AlertBoxContEmail-text').html(user_email_arr);
                        $('.popup-find-emailno').addClass('notshow');
                        $('.popup-find-email').addClass('show');
                        $('.popup-find-email').removeClass('notshow');
                        $('.popup-find-emailno').removeClass('show');
                        $('.popup-find-emailno.popup-find-email').addClass('show');
                        $('.MintSmallButton').click(function () {
                            $('.AlertBox').removeClass('show');
                            $('.AlertBox').addClass('notshow');
                            $('.LoginAccountCont-item:last-child').addClass('is-Current');
                            $('.LoginAccountCont-item:first-child').removeClass('is-Current');
                            $('.LoginAccountTab-item:last-child').addClass('is-Current');
                            $('.LoginAccountTab-item:first-child').removeClass('is-Current');
                        });
                    }

                },
                error: function( jqXHR, textStatus, errorThrown ){
                    console.log( 'The following error occured: ' + textStatus, errorThrown );
                },
            })
            return false;
        }
    });
    $('body').on('click', '.btn-email-sub', function(e) {
        let emailsub = $.trim($('input.email-sub').val());
        if(emailsub == ''){
            $('.email-sub-error').html('유효한 이메일 형식이 아닙니다');
            $('.email-sub-error').addClass('ErrorText');
            $('.SubscriptionForm-item').find('.GrayInput').addClass('error');
        }else{
            $.ajax({
                type: "post",
                dataType: "json",
                url: mbc_dev.ajax_url,
                data: {
                    action: "mbc_email_subscription",
                    email: emailsub
                },
                beforeSend: function () {
                    $('.btn-email-sub').css({'cursor': 'wait'});
                },
                success: function (response) {
                    $('.btn-email-sub').css({'cursor': 'pointer'});
                    let errors = response.errors || '';
                    if(errors.length !== 0){
                        if(errors.email_verify !== 0){
                            $('.email-sub-error').text(errors.email_verify);
                            $('.email-sub-error').addClass('ErrorText');
                            $('.SubscriptionForm-item').find('.GrayInput').addClass('error');
                        }
                        if(errors.email_error_space !== 0){
                            $('.email-sub-error').text(errors.email_error_space);
                            $('.email-sub-error').addClass('ErrorText');
                        }
                        if(errors.email_error !== 0){
                            $('.email-sub-error').text(errors.email_error);
                            $('.email-sub-error').addClass('ErrorText');
                        }
                    }else {
                        $('.SubscriptionPopup').addClass('show');
                    }
                },
            error: function( jqXHR, textStatus, errorThrown ){
                console.log( 'The following error occured: ' + textStatus, errorThrown );
            },
        })
        return false;
        }
    });
    $('body').on('click', '.btn-edit-user-sub', function(e) {
        let emailsub = $.trim($('input.user-email-sub').val());
        let nicknamesub = $.trim($('input.user-nickname-sub').val());
        let check_agree1 = $('#keep01').is(':checked');
        let check_agree2 = $('#keep02').is(':checked');
        var user_id = $('.btn-edit-user-sub').attr('data-user');
        if(emailsub == ''){
            $('.user-email-sub-error').html('필드는 비워둘 수 없습니다');
            $('.user-email-sub-error').addClass('ErrorText');
        }
        if(nicknamesub == ''){
            $('.user-nickname-sub-error').html('필드는 비워둘 수 없습니다');
            $('.user-nickname-sub-error').addClass('ErrorText');
        }
        if(check_agree1 == ''){
            $('.input1-check').html('동의가 꼭 필요합니다.');
            $('.input1-check').addClass('ErrorText');
        }else {
            $('.input1-check').remove();
        }
        if(check_agree2 == ''){
            $('.input2-check').html('동의가 꼭 필요합니다.');
            $('.input2-check').addClass('ErrorText');
        }else {
            $('.input2-check').remove();
        }
        if(emailsub != '' && nicknamesub != '' && check_agree1 != '' && check_agree2 != ''){
            $.ajax({
                type: "post",
                dataType: "json",
                url: mbc_dev.ajax_url,
                data: {
                    action: "mbc_change_user_sub",
                    email: emailsub,
                    nickname : nicknamesub,
                    ID: user_id,
                },
                beforeSend: function () {
                    $('.btn-edit-user-sub').css({'cursor': 'wait'});
                },
                success: function (response) {
                    $('.btn-edit-user-sub').css({'cursor': 'pointer'});
                    let errors = response.errors || '';
                    if(errors.length !== 0){
                        if(errors.email_error){
                            $('.user-email-sub-error').text(errors.email_error);
                            $('.user-email-sub-error').addClass('ErrorText');
                        }
                        if(errors.nickname_error){
                            $('.user-nickname-sub-error').text(errors.nickname_error);
                            $('.user-nickname-sub-error').addClass('ErrorText');
                        }
                    }else {
                        $('.user-nickname-sub-error').remove();
                        $('.user-email-sub-error').remove();
                        $('.SubscriptionPopup').addClass('show');
                        $('.show-email-new').text(emailsub);
                    }
                },
                error: function( jqXHR, textStatus, errorThrown ){
                    console.log( 'The following error occured: ' + textStatus, errorThrown );
                },
            })
            return false;
        }

    });
    $('body').on('click', '.unsubscription-button', function(e) {
        var user_email = $('.unsubscription-button').attr('data-user');
        let url = $('.unsubscription-button').attr('data-url');
        $.ajax({
            type: "post",
            dataType: "json",
            url: mbc_dev.ajax_url,
            data: {
                action: "mbc_btn_unsubscription",
                email: user_email,
            },
            beforeSend: function () {
                $('.unsubscription-button').css({'cursor': 'wait'});
            },
            success: function (response) {
                $('.unsubscription-button').css({'cursor': 'pointer'});
                  window.location.href = url;
            },
            error: function( jqXHR, textStatus, errorThrown ){
                console.log( 'The following error occured: ' + textStatus, errorThrown );
            },
        })
    });
    $('body').on('click', '.unsubscription-button2', function(e) {
        var user_email = $('#user-email-sub').val();
		
		if(user_email == ''){
            $('.user-email-sub-error').html('필드는 비워둘 수 없습니다');
            $('.user-email-sub-error').addClass('ErrorText');
        } else{
			
			$.ajax({
				type: "post",
				dataType: "json",
				url: mbc_dev.ajax_url,
				data: {
					action: "mbc_btn_unsubscription",
					email: user_email,
				},
				beforeSend: function () {
					$('.unsubscription-button2').css({'cursor': 'wait'});
				},
				success: function (response) {
					$('.unsubscription-button2').css({'cursor': 'pointer'});
					  window.location.href = "/";
				},
				error: function( jqXHR, textStatus, errorThrown ){
					console.log( 'The following error occured: ' + textStatus, errorThrown );
				},
			})
			
			
		}
    });
	$('body').on('click', '.subscription-button', function(e) {
        var user_email = $('.subscription-button').attr('data-user');
        let url = $('.subscription-button').attr('data-url');
        $.ajax({
            type: "post",
            dataType: "json",
            url: mbc_dev.ajax_url,
            data: {
                action: "mbc_btn_subscription",
                email: user_email,
            },
            beforeSend: function () {
                $('.subscription-button').css({'cursor': 'wait'});
            },
            success: function (response) {
                $('.subscription-button').css({'cursor': 'pointer'});
                 window.location.href = url;
            },
            error: function( jqXHR, textStatus, errorThrown ){
                console.log( 'The following error occured: ' + textStatus, errorThrown );
            },
        })
    });

}(jQuery));
// jQuery(function($) {
    // $('.AlertBoxClosed').click(function(){
        // $('.AlertBox').removeClass('show');
        // $('.AlertBox').addClass('notshow');
    // });
// });
jQuery(function($) {
    $('.button-tab1').click(function(){
        $(this).addClass('border-link');
        $('.tab2').removeClass('show');
        $('.tab1').addClass('show');
        $('.button-tab2').removeClass('border-link');
    });
    $('.button-tab2').click(function(){
        $(this).addClass('border-link');
        $('.tab1').removeClass('show');
        $('.tab2').addClass('show');
        $('.button-tab1').removeClass('border-link');
    });
});
jQuery(function($) {
    $('body').on('click', '.addnew-password', function(e) {
        e.preventDefault();
        var datas = $('.form-addnew-password').serializeArray().reduce(function(obj, item) {
            obj[item.name] = item.value;
            return obj;
        }, {});
        var user_id = $('.form-addnew-password').attr('data-user');
        $.ajax({
            type : "post",
            dataType : "json",
            url : mbc_dev.ajax_url,
            data : {
                action: "add_new_password",
                datas,
                user_id
            },
            context: this,
            beforeSend: function(){
                $('.addnew-password').css({'cursor': 'wait'});
            },
            success: function(response) {
                $('.addnew-password').css({'cursor': 'pointer'});
                let password_error = '';
                let confirm_password_error = '';
                let errors = response.errors || '';
                if (errors.length !== 0) {
                    if(errors.password){
                        password_error = errors.password;
                        $('.password_error').text(password_error);
                        $('.password_error').addClass('ErrorText');
                        $('.GrayInput-text.password').addClass('GrayInput-input');
						jQuery("#reset_passwords_box").attr("class", "GrayInput IconPassword error");
                    }
                    if(errors.confirm_password){
                        confirm_password_error = errors.confirm_password;
                        $('.confirm_password_error').text(confirm_password_error);
                        $('.confirm_password_error').addClass('ErrorText');
                        $('.GrayInput-text.confirm-password').addClass('GrayInput-input');
						jQuery("#reset_passwords_re_box").attr("class", "GrayInput IconPassword error");
                    }
                }else {
                    $('.LoginPopup').addClass('show');
                }
            },
            error: function( jqXHR, textStatus, errorThrown ){
                console.log( 'The following error occured: ' + textStatus, errorThrown );
            },
        })
        return false;
    });
});

jQuery(function($){

    // Set all variables to be used in scope
    var frame,
        addImgLink = $('.upload-custom-img'),
        delImgLink = $( '.delete-custom-img'),
        imgContainer = $( '.custom-img-container'),
        imgIdInput = $( '.custom-img-id' );

    // ADD IMAGE LINK
    // addImgLink.on( 'click', function( event ){

        // event.preventDefault();

        // // If the media frame already exists, reopen it.
        // if ( frame ) {
            // frame.open();
            // return;
        // }

        // // Create a new media frame
        // frame = wp.media({
            // title: 'Upload',
            // button: {
                // text: 'Use this media'
            // },
            // multiple: false  // Set to true to allow multiple files to be selected
        // });


        // // When an image is selected in the media frame...
        // frame.on( 'select', function() {

            // // Get media attachment details from the frame state
            // var attachment = frame.state().get('selection').first().toJSON();

            // // Send the attachment URL to our custom image input field.
            // if( imgContainer.find('img').length > 0 ) {
                // imgContainer.find('img').attr('src',attachment.url);
            // }else {
                // imgContainer.append( '<img src="'+attachment.url+'" alt="" style="max-width:100%;"/>' );
            // }

            // // Send the attachment id to our hidden input
            // imgIdInput.val( attachment.id );

            // // Hide the add image link
            // addImgLink.addClass( 'hidden' );

            // // Unhide the remove image link
            // delImgLink.removeClass( 'hidden' );

            // $.ajax({
                // type: "POST",
                // async: false,
                // url: mbc_dev.ajax_url,
                // data: {
                    // action: "update_avatar",
                    // attach_id: attachment.id,
                // },
                // beforeSend: function () {
                // },
                // success: function (response) {
                    // let src = JSON.parse(response).image
                    // $('.MemberProfileThumb img').attr('src',src);
                // },
                // error: function () {
                    // console.log('The following error occured');
                // }
            // });
        // });

        // // Finally, open the modal on click
        // frame.open();
    // });

    // DELETE IMAGE LINK
    delImgLink.on( 'click', function( event ){

        event.preventDefault();

        // Clear out the preview image
        imgContainer.html( '' );

        // Un-hide the add image link
        addImgLink.removeClass( 'hidden' );

        // Hide the delete image link
        delImgLink.addClass( 'hidden' );

        // Delete the image id from the hidden input
        imgIdInput.val( '' );

    });

});

(function($) {

    // var list_btn_click = document.getElementsByClassName("FaqItemTitle");
    // var list_item_accor = document.getElementsByClassName("FaqItem");

    // for (i = 0; i < list_btn_click.length; i++) {
        // list_btn_click[i].addEventListener('click', addClassAccor, false);
    // }

    // function addClassAccor() {
        // var itemClass = this.parentNode.className;
        // for (i = 0; i < list_item_accor.length; i++) {
            // list_item_accor[i].className = 'FaqItem';
        // }
        // if (itemClass == 'FaqItem') {
            // this.parentNode.className = 'FaqItem active';
        // }
    // }
	
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
}(jQuery));

(function ($) {
    $('body').on('click', '.NavyMidButton', function (e) {
        e.preventDefault()
        let idNewLetter = $(this).attr('id-new-letter');
        let feedbackContent = $('#feedback-content').val();
		let parent_newsletters_title	=	$("#newsletters_title").val();
		// console.log(parent_newsletters_title);
		// console.log(idNewLetter);

        if(!idNewLetter || !feedbackContent || !parent_newsletters_title) {
            $('.Popup').fadeOut(100);
            $('html').removeClass('is-Hidden');
            return;
        }
        $.ajax({
            type: "POST",
            url: mbc_dev.ajax_url,
            dataType: 'json',
            data: {
                action: "feedback",
                id: idNewLetter,
				title: parent_newsletters_title,
                content: feedbackContent,
            },
            beforeSend: function (xhr) {
                $(this).css({'cursor': 'wait'});

            },

            success: function (response) {
                $(this).css({'cursor': 'pointer'});
                if(response && response.message === 'OK' ){
                    $('.Popup').fadeOut(100);
                    $('html').removeClass('is-Hidden');
                    $('#feedback-content').val('');
                }
            },
            error: function () {

            }
        });

    });

}(jQuery));

function setOpenPopup( cUrl, cOpenName, nWidth, nHeight ){
	// 팝업 위치 자동 조정
	LeftPosition = (screen.width) ? (screen.width-nWidth)/2 : 0;
	TopPosition = (screen.height) ? (screen.height-nHeight)/2 : 0;

	var windowprops = "width="+ nWidth+", height="+ nHeight+", toolbar=0, location=0, status=0, menubar=0, scrollbars=0, resizable=0, top="+ TopPosition +", left="+ LeftPosition +"  ";
	window.open(cUrl, cOpenName, windowprops);
}

//일반 회원가입 컨펌메일 발송
function validateForm(email_str) {
	var email = email_str;
	if(email === "") {
		return false;
	}
	var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
	return regex.test(email);
}

function send_certi_mail() {
	var tmp_user_mail	=	"";
	
	jQuery("#EMAIL_CERTI_BTN").css({'cursor': 'wait'});
	jQuery("#reg_step1_email_box").attr("class", "GrayInput");
	
	document.getElementById("register_err_msg").style.display	=	"none";
	
	tmp_user_mail	=	jQuery("#reg_user_email").val();
	if(tmp_user_mail == undefined || tmp_user_mail == "") {
		document.getElementById("register_err_msg").innerHTML		=	"이메일 주소를 입력해 주세요.";
		jQuery("#reg_step1_email_box").attr("class", "GrayInput error");
		document.getElementById("register_err_msg").style.display	=	"block";
		jQuery("#reg_user_email").focus();
		jQuery("#EMAIL_CERTI_BTN").css({'cursor': 'pointer'});
		return false;
	}
	
	if(validateForm(tmp_user_mail) === true) {
		var data    =   {
			"action"		:	"mbc_reg_certi_mail",
			"to_mail"		:	tmp_user_mail,
		};
		jQuery.post(mbc_dev.ajax_url, data, function(response) {
			//console.log(response);
			jQuery("#EMAIL_CERTI_BTN").css({'cursor': 'pointer'});
			
			if(response == "SEND_OK") {
				document.getElementById("register_err_msg").style.display	=	"none";
				document.getElementById("MAIL_SEND_COMPLETE").style.display	=	"block";
				return;
			} else if(response == "NO_PARAMETERS") {
				document.getElementById("register_err_msg").innerHTML		=	"필수 항목이 누락 되었습니다.";
				jQuery("#reg_step1_email_box").attr("class", "GrayInput error");
				document.getElementById("register_err_msg").style.display	=	"block";
				return false;
			} else if(response == "NOT_EMAIL_VALID") {
				document.getElementById("register_err_msg").innerHTML		=	"이메일 형식이 올바르지 않습니다.";
				jQuery("#reg_step1_email_box").attr("class", "GrayInput error");
				document.getElementById("register_err_msg").style.display	=	"block";
				return false;
			} else if(response == "ALREADY_EMAIL_USE") {
				document.getElementById("register_err_msg").innerHTML		=	"이미 사용중인 이메일 주소 입니다.";
				jQuery("#reg_step1_email_box").attr("class", "GrayInput error");
				document.getElementById("register_err_msg").style.display	=	"block";
				return false;
			} else{
				document.getElementById("register_err_msg").innerHTML		=	"사용할 수 없는 기능입니다.";
				document.getElementById("register_err_msg").style.display	=	"block";
				return false;
			}
		});
	} else{
		jQuery("#EMAIL_CERTI_BTN").css({'cursor': 'pointer'});
		document.getElementById("register_err_msg").innerHTML		=	"이메일 형식이 올바르지 않습니다.";
		jQuery("#reg_step1_email_box").attr("class", "GrayInput error");
		document.getElementById("register_err_msg").style.display	=	"block";
		return false;
	}
}

//회원가입 추가정보 입력 후 가입완료 처리
function mbc_user_reg_complete() {
	var imsi_user_id, imsi_user_email, imsi_user_pass, imsi_user_pass_re, imsi_user_nickname, check_privacy_use_flag;
	var imsi_user_sns_flag, imsi_user_sns_token, imsi_user_name, imsi_user_login;

	var check_adult					=	"";		//14세 이상 확인(필수)
	var check_terms_agree			=	"";		//이용약관 동의 여부(필수)
	var check_privacy_agree		=	"";		//개인정보처리방침 동의 여부(필수)
	var check_privacy_use_agree	=	"";		//개인정보 이용 동의 여부
	var check_newsletter_confirm	=	"";		//뉴스레터 가입 동의 여부
	
	jQuery("#REG_INFO_BTN").css({'cursor': 'wait'});
	
	jQuery("#reg_step2_nickname_box").attr("class", "GrayInput");
	jQuery("#reg_step2_pass_box").attr("class", "GrayInput IconPassword");
	jQuery("#reg_step2_pass_re_box").attr("class", "GrayInput IconPassword");
	
	
	imsi_user_id			=	jQuery("#imsi_user_id").val();
	imsi_user_email		=	jQuery("#imsi_user_email").val();
	imsi_user_nickname	=	jQuery("#imsi_user_nickname").val();
	imsi_user_pass			=	"";
	imsi_user_pass_re		=	"";
	//SNS 회원가입 정보 추가
	imsi_user_sns_flag	=	jQuery("#imsi_user_sns_flag").val();
	imsi_user_sns_token	=	jQuery("#imsi_user_sns_token").val();
	imsi_user_name		=	jQuery("#imsi_user_name").val();
	imsi_user_login		=	jQuery("#imsi_user_login").val();
	
	document.getElementById("register_info_pass_err_msg").style.display		=	"none";
	document.getElementById("register_info_pass_re_err_msg").style.display	=	"none";
	document.getElementById("register_info_pass_re_err_msg").style.display	=	"none";
	document.getElementById("register_info_nickname_err_msg").style.display=	"none";
	
	//일반, SNS 가입에 따른 필수 항목 체크
	if(imsi_user_sns_flag == "") {
		if(imsi_user_id == undefined || imsi_user_email == undefined || imsi_user_id == "" || imsi_user_email == "") {
			var required_param_check	=	"NO";
		} else{
			var required_param_check	=	"OK";
		}
	} else{
		if(imsi_user_email == undefined || imsi_user_email == "") {
			var required_param_check	=	"NO";
		} else{
			var required_param_check	=	"OK";
		}
	}
	//console.log(required_param_check);
	if(required_param_check == "OK") {
		console.log(imsi_user_name);
		
		//공통//닉네임 확인
		if(imsi_user_nickname == undefined || imsi_user_nickname == "") {
			jQuery("#REG_INFO_BTN").css({'cursor': 'pointer'});
			document.getElementById("register_info_nickname_err_msg").innerHTML	=	"닉네임을 입력해 주세요.";
			jQuery("#reg_step2_nickname_box").attr("class", "GrayInput error");
			document.getElementById("register_info_nickname_err_msg").style.display	=	"block";
			jQuery("#imsi_user_nickname").focus();
			return false;
		}
		
		//일반가입인 경우에만 비밀번호 확인
		if(imsi_user_sns_flag == "") {
			imsi_user_pass			=	jQuery("#imsi_user_pass").val();
			imsi_user_pass_re		=	jQuery("#imsi_user_pass_re").val();
			
			if(imsi_user_pass == undefined || imsi_user_pass == "") {
				jQuery("#REG_INFO_BTN").css({'cursor': 'pointer'});
				document.getElementById("register_info_pass_err_msg").innerHTML	=	"비밀번호를 입력해 주세요.";
				jQuery("#reg_step2_pass_box").attr("class", "GrayInput IconPassword error");
				document.getElementById("register_info_pass_err_msg").style.display	=	"block";
				jQuery("#imsi_user_pass").focus();
				return false;
			}
			if(imsi_user_pass_re == undefined || imsi_user_pass_re == "") {
				jQuery("#REG_INFO_BTN").css({'cursor': 'pointer'});
				document.getElementById("register_info_pass_re_err_msg").innerHTML	=	"비밀번호 확인을 입력해 주세요.";
				jQuery("#reg_step2_pass_re_box").attr("class", "GrayInput IconPassword error");
				document.getElementById("register_info_pass_re_err_msg").style.display	=	"block";
				jQuery("#imsi_user_pass_re").focus();
				return false;
			}
			if(imsi_user_pass != imsi_user_pass_re) {
				jQuery("#REG_INFO_BTN").css({'cursor': 'pointer'});
				document.getElementById("register_info_pass_re_err_msg").innerHTML	=	"비밀번호가 일치하지 않습니다.";
				jQuery("#reg_step2_pass_re_box").attr("class", "GrayInput IconPassword error");
				document.getElementById("register_info_pass_re_err_msg").style.display	=	"block";
				jQuery("#imsi_user_pass_re").focus();
				return false;
			}
		}

		check_adult					=	jQuery("#agree01").is(":checked");
		check_terms_agree			=	jQuery("#agree02").is(":checked");
		check_privacy_agree		=	jQuery("#agree03").is(":checked");
		check_privacy_use_agree	=	jQuery("#agree04").is(":checked");
		check_newsletter_confirm	=	jQuery("input:radio[name='imsi_newsletter_confirm']:checked").val();
		if(check_adult == false) {
			jQuery("#REG_INFO_BTN").css({'cursor': 'pointer'});
			alert("만 14세 이상만 가입할 수 있습니다.");
			return false;
		}
		if(check_terms_agree == false) {
			jQuery("#REG_INFO_BTN").css({'cursor': 'pointer'});
			alert("이용약관 동의는 필수 입니다.");
			return false;
		}
		if(check_privacy_agree == false) {
			jQuery("#REG_INFO_BTN").css({'cursor': 'pointer'});
			alert("개인정보 수집 및 이용에 대한 동의는 필수 입니다.");
			return false;
		}
		if(check_privacy_use_agree == false) {
			jQuery("#REG_INFO_BTN").css({'cursor': 'pointer'});
			alert("뉴스레터 및 이벤트 정보 수신 동의는 필수 입니다.");
			return false;
		} 
		//console.log(imsi_user_sns_flag);
		var data    =   {
			"action"							:	"mbc_user_reg_complete",
			"imsi_user_id"					:	imsi_user_id,
			"imsi_user_email"				:	imsi_user_email,
			"imsi_user_pass"				:	imsi_user_pass,
			"imsi_user_pass_re"			:	imsi_user_pass_re,
			"imsi_user_nickname"		:	imsi_user_nickname,
			"check_privacy_use_flag"	:	check_privacy_use_flag,
			"check_newsletter_confirm"	:	check_newsletter_confirm,
			"imsi_user_sns_flag"			:	imsi_user_sns_flag,
			"imsi_user_sns_token"		:	imsi_user_sns_token,
			"imsi_user_name"				:	imsi_user_name,
			"imsi_user_login"				:	imsi_user_login,
			
		};
		jQuery.post(mbc_dev.ajax_url, data, function(response) {
			//console.log(response);
			jQuery("#REG_INFO_BTN").css({'cursor': 'pointer'});
			
			if(response == "COMPLETE") {
				document.location.href="/register-complete/";
			} else if(response == "ALREADY_EMAIL") {
				alert("이미 사용중인 이메일 주소 입니다.");
				document.location.href="/";
			} else if(response == "INVALID_PASS_PATTERN") {
				document.getElementById("register_info_pass_err_msg").innerHTML	=	"비밀번호는 영문+숫자+특수문자 조합 8자 이상입니다.";
				jQuery("#reg_step2_pass_box").attr("class", "GrayInput IconPassword error");
				jQuery("#reg_step2_pass_re_box").attr("class", "GrayInput IconPassword error");
				document.getElementById("register_info_pass_err_msg").style.display	=	"block";
				return false;
			} else if(response == "NO_MATCH_PASSWORD") {
				document.getElementById("register_info_pass_re_err_msg").innerHTML	=	"비밀번호가 일치하지 않습니다.";
				jQuery("#reg_step2_pass_re_box").attr("class", "GrayInput IconPassword error");
				document.getElementById("register_info_pass_re_err_msg").style.display	=	"block";
				return false;
			} else if(response == "ALREADY_NICKNAME") {
				document.getElementById("register_info_nickname_err_msg").innerHTML		=	"이미 사용중인 닉네임 입니다.";
				jQuery("#reg_step2_nickname_box").attr("class", "GrayInput error");
				document.getElementById("register_info_nickname_err_msg").style.display	=	"block";
				return false;
			} else if(response == "NO_BLANK_NICKNAME") {
				document.getElementById("register_info_nickname_err_msg").innerHTML		=	"닉네임에는 공백을 사용할 수 없습니다.";
				jQuery("#reg_step2_nickname_box").attr("class", "GrayInput error");
				document.getElementById("register_info_nickname_err_msg").style.display	=	"block";
				return false;
			} else{
				alert("사용할 수 없는 기능입니다.");
				document.location.href="/";
			}
		});

	} else{
		alert("필수 항목이 누락 되었습니다.");
		document.location.href="/";
	}
}

function close_pop_layer(pop_id) {
	if(pop_id == undefined || pop_id == "") {
		alert("사용할 수 없는 기능입니다.");
		return false;
	} else{
		document.getElementById(pop_id).style.display	=	"none";
	}
}

//비밀번호 보이기
function view_my_password(el_id) {
	var this_type;
	
	if(el_id == undefined || el_id == "") {
		alert("사용할 수 없는 기능입니다.");
		return false;
	} else{
		this_type	=	document.getElementById(el_id).type;

		if(this_type == "password") {
			document.getElementById(el_id).type	=	"text";
		} else{
			document.getElementById(el_id).type	=	"password";
		}
	}
	return false;
}

//프로필 이미지 변경
function change_profile_img() {
	var new_profile_url	=	"";
	//console.log("AAAAA");
	new_profile_url	=	jQuery("#new_profile_img").val();
	if(new_profile_url == undefined || new_profile_url == "") {
		alert("업로드할 이미지 정보가 없습니다.");
		return false;
	} else{
		var data    =   {
			"action"				:	"change_profile_image",
			"new_profile_img"	:	new_profile_url,
		};
		jQuery.post(mbc_dev.ajax_url, data, function(response) {
			//console.log(response);
			if(response == "OK") {
				alert("프로필 이미지 변경이 완료 되었습니다.");
				return false;
			} else if(response == "PLEASE_LOGIN") {
				alert("로그인 후 다시 이용해 주세요.");
				document.location.href="/login/";
			} else{
				alert("사용할 수 없는 기능입니다.");
				return false;
			}
		});
	}
}

//클립보드 복사
function copy_clipboard() {
	var copyText = document.getElementById("14f_clipboard_url");
	copyText.select();
	copyText.setSelectionRange(0, 99999); /*For mobile devices*/
	document.execCommand("copy");
	alert("클립보드에 "+copyText.value+" 주소가 복사 되었습니다.");
}

//스크랩 처리
function scrap_post(target_post, post_type) {
	if(target_post == undefined || target_post == "" || post_type == undefined || post_type == "") {
		alert("사용할 수 없는 기능입니다.");
		return false;
	} else{
		var data    =   {
			"action"			:	"scrap_post_proc",
			"target_post"	:	target_post,
			"post_type"		:	post_type,
		};
		jQuery.post(mbc_dev.ajax_url, data, function(response) {
			if(response == "SCRAP_OK") {
				alert("스크랩 저장이 완료 되었습니다.");
				if(post_type == "newsletter") {
					jQuery("#BTN_SCRAP").attr("class", "TodayLetterHeaderMeta-item Scrap is-Active");
				} else {
					jQuery("#BTN_SCRAP").attr("class", "SingleHeaderInfoMeta-item Scrap is-Active");
				}
			} else if(response == "SCRAP_CANCLE") {
				alert("스크랩 취소가 완료 되었습니다.");
				if(post_type == "newsletter") {
					jQuery("#BTN_SCRAP").attr("class", "TodayLetterHeaderMeta-item Scrap");
				} else {
					jQuery("#BTN_SCRAP").attr("class", "SingleHeaderInfoMeta-item Scrap");
				}
			} else if(response == "PLEASE_LOGIN") {
				alert("로그인 후 다시 이용해 주세요.");
				document.location.href="/login/";
			} else if(response == "ALREADY_SCRAP") {
				alert("이미 스크랩이 완료 되었습니다..");
				return false;
			} else{
				alert("사용할 수 없는 기능입니다.");
				return false;
			}
		});
	}
}

//좋아요 처리
function like_post(target_post, post_type) {
	if(target_post == undefined || target_post == "" || post_type == undefined || post_type == "") {
		alert("사용할 수 없는 기능입니다.");
		return false;
	} else{
		var data    =   {
			"action"			:	"like_post_proc",
			"target_post"	:	target_post,
			"post_type"		:	post_type,
		};
		jQuery.post(mbc_dev.ajax_url, data, function(response) {
			var result_str	=	response.split("^");
			if(result_str[0] == "LIKE_OK") {
				if(post_type == "newsletter") {
					jQuery("#BTN_LIKE").attr("class", "TodayLetterHeaderMeta-item Like is-Active");
				} else {
					jQuery("#BTN_LIKE").attr("class", "SingleHeaderInfoMeta-item Like count-like-vn icon-love");
				}
				document.getElementById("POST_LIKE_COUNT").innerHTML	=	result_str[1];
			} else if(result_str[0] == "LIKE_CANCLE") {
				if(post_type == "newsletter") {
					jQuery("#BTN_LIKE").attr("class", "TodayLetterHeaderMeta-item Like");
				} else {
					jQuery("#BTN_LIKE").attr("class", "SingleHeaderInfoMeta-item Like count-like-vn");
				}
				document.getElementById("POST_LIKE_COUNT").innerHTML	=	result_str[1];
			} else if(result_str[0] == "PLEASE_LOGIN") {
				alert("로그인 후 다시 이용해 주세요.");
				document.location.href="/login/";
			} else{
				alert("사용할 수 없는 기능입니다.");
				return false;
			}
		});
	}
}

//최근본 컨텐츠 삭제
function recent_list_del(flag) {
	if(flag == undefined || flag == "") {
		alert("사용할 수 없는 기능입니다.");
		return;
	} else{
		document.getElementById("RECENT_LAYER_POPUP").style.display	=	"block";
		jQuery("#scrap_del_flag").val(flag);
	}
}

function recent_list_del_action() {
	var flag = jQuery("#scrap_del_flag").val();
	console.log(flag);
	document.getElementById("RECENT_LAYER_POPUP").style.display	=	"none";
	let check_val = [];
	jQuery("input:checkbox[name=resent_news]:checked").each(function() {
		var checkVal	=	jQuery(this).val();
	   check_val.push(checkVal);
	});
	var check_count	=	check_val.length;
	
	console.log(check_count);
	
	if(check_count <= 0) {
		alert("삭제 대상을 선택해 주세요.");
		return false;
	} else{
		var check_list	=	check_val.join(",");  //배열을 문자열로
		var data    =   {
			"action"		:	"recent_delete_proc",
			"target_list"	:	check_list,
			"post_type"	:	flag,
		};
		jQuery.post(mbc_dev.ajax_url, data, function(response) {
			//console.log(response);
			if(response == "PLEASE_LOGIN") {
				alert("로그인 후 다시 이용해 주세요.");
				document.location.href="/login/";
			} else if(response == "NO_TARGET_LIST") {
				alert("삭제 대상을 선택해 주세요.");
				return false;
			} else if(response == "DELETE_OK") {
				alert("삭제가 완료 되었습니다.");
				if(flag == "newsletter") {
					document.location.href="/newsletters-viewed/";
				} else if(flag == "cardnew") {
					document.location.href="/cardnews-viewed/";
				}
			}
			else{
				alert("사용할 수 없는 기능입니다.");
				return false;
			}
		});
	}
	
}

//마이페이지 스크랩 컨텐츠 삭제
function scrap_list_del(flag) {
	if(flag == undefined || flag == "") {
		alert("사용할 수 없는 기능입니다.");
		return;
	} else{
		document.getElementById("SCRAP_LAYER_POPUP").style.display	=	"block";
		jQuery("#scrap_del_flag").val(flag);
	}
}

function scrap_list_del_action() {
	var flag = jQuery("#scrap_del_flag").val();
	let check_val = [];
	
	document.getElementById("SCRAP_LAYER_POPUP").style.display	=	"none";

	jQuery("input:checkbox[name=scrap_news]:checked").each(function() {
		var checkVal	=	jQuery(this).val();
	   check_val.push(checkVal);
	});
	var check_count	=	check_val.length;
	if(check_count <= 0) {
		alert("삭제 대상을 선택해 주세요.");
		return false;
	} else{
		var check_list	=	check_val.join(",");  //배열을 문자열로
		var data    =   {
			"action"		:	"scrap_delete_proc",
			"target_list"	:	check_list,
			"post_type"	:	flag,
		};
		jQuery.post(mbc_dev.ajax_url, data, function(response) {
			//console.log(response);
			if(response == "PLEASE_LOGIN") {
				alert("로그인 후 다시 이용해 주세요.");
				document.location.href="/login/";
			} else if(response == "NO_TARGET_LIST") {
				alert("삭제 대상을 선택해 주세요.");
				return false;
			} else if(response == "DELETE_OK") {
				alert("삭제가 완료 되었습니다.");
				if(flag == "newsletter") {
					document.location.href="/scraped-newsletters-viewed/";
				} else if(flag == "cardnew") {
					document.location.href="/scraped-cardnew-viewed/";
				}
			} else{
				alert("사용할 수 없는 기능입니다.");
				return false;
			}
		});
	}
	
}