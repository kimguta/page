$(document).ready(function() {
	
	//쿼리 체크
	$('#btn_srch').bind('click', function()
			{
				if ($('#srch_word').val().replace(/^\s+|\s+$/g, "") != '' && $('#query').val() != '검색어를 입력하세요.')
				{
					doSearch(1);
				}
				else{
					alert("검색어를 입력하세요");
					return false;
				}
	});
	
	//엔터키
	$("#srch_word").keydown(function(e){
		if(e.keyCode == 13){
			if ($('#srch_word').val().replace(/^\s+|\s+$/g, "") != '' && $('#query').val() != '검색어를 입력하세요.')
			{
				$('#btn_srch').click();
				return false;
			} else {
				alert("검색어를 입력하세요");
				return false;
			}			
		}
	});
	
	//카테고리 class on
	$('.tit').removeClass("tit_active");
	var cat = $('#category').val();
	$('#cat_' + cat).addClass("tit_active");
	
	//결과 내 재검색 비우기
	$('#resultin_chk').bind('click', function()
	{
		$('#srch_word').val('');
		$('#srch_word').focus();
	});
	
	//기간검색버튼
	$('#date_search_btn').bind('click', function()	{
				if ($('#srch_word').val().replace(/^\s+|\s+$/g, "") != '' && $('#query').val() != '검색어를 입력하세요.')
				{
					doSearch(1);
				}
				else{
					alert("검색어를 입력하세요");
					return false;
				}
	});
	
	//정렬선택
	$('#accuracy').bind('click', function() {
		if ($('#srch_word').val().replace(/^\s+|\s+$/g, "") != '' && $('#query').val() != '검색어를 입력하세요.')
		{
			$('#sortValue').val('accuracy');
			doSearch(1);
		}
		else{
			alert("검색어를 입력하세요");
			return false;
		}	
	});
	$('#latest').bind('click', function() {
		if ($('#srch_word').val().replace(/^\s+|\s+$/g, "") != '' && $('#query').val() != '검색어를 입력하세요.')
		{
			$('#sortValue').val('latest');
			doSearch(1);
		}
		else{
			alert("검색어를 입력하세요");
			return false;
		}		
	});	
	
	//기간선택
	$('#all').bind('click', function() {
		$('#all').addClass("opt_period_on");
		$('#selDate').val('all');
		$("#start_day").val('');
		$("#end_day").val('');
		//doSearch(1);	
	});
	$('#week').bind('click', function() {
		$('#week').addClass("opt_period_on");
		$('#selDate').val('week');
		var today = Date.today();
		var beforeDays = Date.today().addDays(-7);
		$("#start_day").val(beforeDays.toString('yyyy.MM.dd'));
		$("#end_day").val(today.toString('yyyy.MM.dd'));
		//doSearch(1);	
	});
	$('#month').bind('click', function() {
		$('#month').addClass("opt_period_on");
		$('#selDate').val('month');
		var today = Date.today();
		var beforeMonth = Date.today().addMonths(-1).addDays(1);
		$("#start_day").val(beforeMonth.toString('yyyy.MM.dd'));
		$("#end_day").val(today.toString('yyyy.MM.dd'));
		//doSearch(1);	
	});
	$('#year').bind('click', function() {
		$('#year').addClass("opt_period_on");
		$('#selDate').val('year');
		var today = Date.today();
		var beforeYear = Date.today().addYears(-1).addDays(1);
		$("#start_day").val(beforeYear.toString('yyyy.MM.dd'));
		$("#end_day").val(today.toString('yyyy.MM.dd'));
		//doSearch(1);	
	});
	
	//달력 클릭시 기간선택 해제
	$('#start_day').bind('click', function() {
		$('label[name=period_label]').removeClass("opt_period_on");
		$('#selDate').val('none');
	});
	$('#start_btn').bind('click', function() {
		$('label[name=period_label]').removeClass("opt_period_on");
		$('#selDate').val('none');
	});
	$('#end_day').bind('click', function() {
		$('label[name=period_label]').removeClass("opt_period_on");
		$('#selDate').val('none');
	});
	$('#end_btn').bind('click', function() {
		$('label[name=period_label]').removeClass("opt_period_on");
		$('#selDate').val('none');
	});
	
	//날짜 달력
	$('#start_btn').bind('click', function() {
		$('#start_day').datepicker('show')
	});
	$('#end_btn').bind('click', function() {
		$('#end_day').datepicker('show')
	});
	
	$('#start_day').datepicker(
			{
			    showOn : "both",
			    //buttonImage : '/site/pub/images/board/btncalendar-icon.gif',
			    //buttonImageOnly : true,
			    option : $.datepicker.regional['ko'],
			    buttonText : '',
			    dateFormat : 'yy.mm.dd',
			    beforeShow :  function(){
			    	setTimeout(function(){
			    		$('.ui-datepicker').css('z-index', 99999999);
			    	}, 0);
			    },
			    showOtherMonths : true,
			    changeMonth : false,
			    changeYear : false,
			    maxDate : Date.today().toString('yyyy.MM.dd'),
			    onSelect : function(dateText, inst)
			    {
				    var start_day = $('#start_day').val();
				    var end_day = $('#end_day').val();

				    if (end_day != '' && start_day > end_day)
				    {
					    alert('시작일은 종료일보다 늦을 수 없습니다.');
					    $('#fromDate').val('');
						$('#start_day').val('');
				    } else {
				    	$('#fromDate').val(start_day);
				    }
			    }
			});
	$('#end_day').datepicker(
			{
			   showOn : "both",
			   //buttonImage : '/site/pub/images/board/btncalendar-icon.gif',
			   //buttonImageOnly : true,
			   option : $.datepicker.regional['ko'],
			   buttonText : '',
			   dateFormat : 'yy.mm.dd',
			   showOtherMonths : true,
			   beforeShow :  function(){
			    	setTimeout(function(){
			    		$('.ui-datepicker').css('z-index', 99999999);
			    	}, 0);
			    },
			    changeMonth : false,
			    changeYear : false,
			    gotoCurrent : true,
			    maxDate : Date.today().toString('yyyy.MM.dd'),
			    onSelect : function(dateText, inst)
			    {
				    var start_day = $('#start_day').val();
				    var end_day = $('#end_day').val();

				    if (start_day != '' && start_day > end_day)
				    {
					    alert('종료일은 시작일보다 빠를 수 없습니다.');
					    $('#toDate').val('');
						$('#end_day').val('');
				    } else {
				    	$('#toDate').val(end_day);
				    }
			    }
			});
	
	
	// 메뉴검색 버튼 클릭시 
	$('#btn_sch_menu').click(function(e){
		// $('.result_menu').toggle();
		$.ajax({
			url : "/site/common/jsp/ajax_menu_result.jsp",
			data : {'srch_word':$('#srch_word').val()},
			success : function(res) {
				$('#menu_dl > dd').remove();
				if(res.resultCd==0) {
					var row = res.list;
					// console.log(row);					
					if(row.length > 0) {
						var i=0;
						for(i=0; i<row.length && i<31; i++) { // ui상 30건 이하만
							// var tag = '<dd class="locate">게시판 &gt; <span class="marker_yellow">양양</span>-공지사항'+row[i].name+'</dd>';
							var tag = '<dd class="locate">'+row[i].path+'</dd>';
							$('#menu_dl').append(tag);
						} // end of for
						$('#result_cnt').text(i);
						$('.result_menu').show();
					} // end of if
					
					else {
						$('.result_menu').hide();
						alert('검색된 메뉴가 없습니다.');
					}					
				}
				else { // 서버단 오류
					$('.result_menu').hide();
					alert(res.resultMsg);
				}
	        }
		}); // end of ajax
	}); // end of #btn_sch_menu click()
	
	
}); // end of ready

//검색
function doSearch(pageOffset)
{
	$('#pageOffset').val(pageOffset);
	$('#fromDate').val($('#start_day').val());
	$('#toDate').val($('#end_day').val());
	    
	if($('#resultin_chk').is(":checked")) {
		$('#srch_word').val($('#prev_keywords').val()+" AND "+$('#srch_word').val());
	}
	
	var category = $('#category').val();
	if(category.match('staff')) {
		$('#returnField').val(
				"DEPT_NAME/STAFF_NAME/CHARGE/PART/TELNO"
				);
		$('#pagePerNumber').val("10");
	} else {
		$('#returnField').val(
				"TITLE/CONTENTS/PAGE_PATH/DATE/THUMB_URL/BOARD_ID/_id/URL/INDEX_NAME");
		$('#pagePerNumber').val("10");
	}
	$('#searchForm').submit();
}

//카테고리 이동
function selCategory(cat)
{
	$('#category').val(cat);	
	doSearch(1);	
}

//페이징
function paging(docCount, pageOffSet, pagePerNumber)
{	
	var pageNo = pageOffSet;
	var count = pagePerNumber;
	var groupSize = 10;

	var startPage = Math.floor(pageNo / groupSize) * groupSize + 1;
	
	if((pageNo % groupSize) == 0){
		startPage = (Math.floor(pageNo / groupSize)-1) * groupSize + 1;
	}
	else Math.floor(pageNo / groupSize) * groupSize + 1;
	
	var endPage = startPage + groupSize - 1;
	var lastPage;
	
	if (parseInt(docCount)>parseInt(count))
	{
		if ((docCount % count) == 0)
		{
			lastPage = Math.floor(docCount / count);
		} else
		{
			lastPage = Math.floor(docCount / count) + 1;
		}
	} else
	{
		lastPage = 1;
	}
	
	endPage = (endPage - lastPage) > 0 ? lastPage : endPage;

	var innerHTML = '';

	innerHTML += '<ul class="bo_page">';
	if (startPage > groupSize)
	{
		innerHTML += "<li class='btn_first'><a href='javascript:doSearch(1)'><span class='hidden_txt'>맨 처음 페이지 목록 보기</span></a></li>";
		innerHTML += "<li class='btn_prev'><a href='javascript:doSearch(" + (startPage - 1) + ")'><span class='hidden_txt'>이전 페이지 목록 보기</span></a></li>";
	}
	for ( var nowPage = startPage; nowPage <= endPage; nowPage++)
	{
		if ((Number(pageNo)) == nowPage)
		{
			innerHTML += '<li><a href="javascript:doSearch('+"'"+nowPage+"'"+')" title="page" class="on">' + nowPage + "</a></li>";
		} else
		{
			innerHTML += '<li><a href="javascript:doSearch('+"'"+nowPage+"'"+')">' + nowPage + '</a></li>';
		}
	}
	if (endPage < lastPage)
	{
		
		innerHTML += "<li class='btn_next'><a href='javascript:doSearch(" + (endPage + 1) + ")'><span class='hidden_txt'>다음 페이지 목록 보기</span></a></li>";
		innerHTML += "<li class='btn_last'><a href='javascript:doSearch(" + lastPage + ")'><span class='hidden_txt'>마지막 페이지 목록 보기</span></a></li>";
	}	
	innerHTML += '</ul>';
	$('#mainFoot').html(innerHTML);
	$('#mainFoot').show();
}

//검색결과 새창
function resultView(url) {
	window.open(url, '_blank');
}

//세자리 이상 숫자 콤마
function fnCommaNum(num)
{
	if (num == '' || num == undefined || num == null)
	{
		return 0;
	}
	var len, point, str;

	num = num + "";
	point = num.length % 3
	len = num.length;

	str = num.substring(0, point);
	while (point < len)
	{
		if (str != "")
			str += ",";
		str += num.substring(point, point + 3);
		point += 3;
	}
	return str;
}

//인기검색어 검색
function popularKeyword(keyword) {
	
	$('#srch_word').val(keyword);
	$('#pageOffset').val('1');
	$('#fromDate').val('');
	$('#toDate').val('');
	$('#selDate').val('');
	
	$('#category').val('news');
	
	$('#returnField').val("TITLE/CONTENTS/PAGE_PATH/DATE/THUMB_URL/BOARD_ID/_id/URL/INDEX_NAME");
	$('#pagePerNumber').val("10");
	
	$('#searchForm').submit();
}