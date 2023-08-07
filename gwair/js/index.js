$(function() {
    var mainSlickOption = {
        autoplay: true,
        arrows: true,
        accessibility: false,
        dots:false,
        draggable: true,
        infinite: false,
        slidesToShow: 1,
        slidesToScroll: 1,
        pauseOnHover: false,
        speed: 350,
        autoplaySpeed: 5500,
        responsive: [
            {
                breakpoint: 992,
                settings: {
                }
            }
        ]
    };

    initSlick($('#data-wrap .slick'), mainSlickOption);

    var mainSlickOption2 = {
        autoplay: true,
        arrows: true,
        accessibility: false,
        dots:false,
        draggable: true,
        infinite: false,
        slidesToShow: 1,
        slidesToScroll: 1,
        pauseOnHover: false,
        speed: 350,
        autoplaySpeed: 5500,
        responsive: [
            {
                breakpoint: 992,
                settings: {
                }
            }
        ]
    };

    initSlick($('#noti-wrap .slick'), mainSlickOption2);
});

ObjDoc.on({
    'click': function(e) { // 좌측 대기오염물질 선택
        e.preventDefault();
        var idx = $(this).index();
        var item = $(this).attr('id');
        //alert(item);
        $("#set_item").val(item);
        totalGrade(item);

        $('#data-wrap .tab a').removeClass('active');
        $(this).addClass('active');
        $('#data-wrap .nowair tbody tr').removeClass('active');
        $('#data-wrap .nowair tbody tr').eq(idx).addClass('active');
        $('#data-wrap .notes img').hide();
        $('#data-wrap .notes img').eq(idx).show();
        $('#data-wrap .tab').toggleClass('active');
    }
}, '#data-wrap .tab a')


    .on({
        'click': function(e) {
            var checkedCity = $('#city').is(':checked');
            if(checkedCity){
                //alert('도시대기 체크');
                $(".DOSI").show();
            }else{
                $(".DOSI").hide();
            }
            var checkedRoad = $('#road').is(':checked');
            if(checkedRoad){
                //alert('도로변 체크');
                $(".DORO").show();
            }else{
                $(".DORO").hide();
            }


        }
    }, '.dust-bx .check ')


    .on({
        'click': function(e) {
            e.preventDefault();
            var idx = $(this).index();
            $(this).toggleClass('active');
        }
    }, '#data-wrap .select .open')

    .on({
        'click': function(e) { //측정소 지역 select box선택
            e.preventDefault();
            var Name = $(this).text();
            var idx = $(this).index();
            var val = $(this).attr('id');
            //alert(val);
            $("#set_area").val(val)
            $('#data-wrap .select .open').text(Name).removeClass('active');
            $('#data-wrap .spot-bx a').removeClass('active');
            $('#data-wrap .spot-bx a').eq(idx).addClass('active');

            airInfo(val,""); //대기질 정보 추출
            apiWeather(val); //날씨 API추출
        }
    }, '#data-wrap .select .view a')


    .on({
        'click': function(e) { //지도 스팟 선택
            e.preventDefault();
            var Name = $(this).text();
            var val = $(this).attr('id').toString().replace(/SPOT_/g, '');

            $('#data-wrap .select .open').text(Name).removeClass('active');
            $('#data-wrap .spot-bx a').removeClass('active');
            $(this).addClass('active');

            airInfo(val,""); //대기질 정보 추출
            apiWeather(val); //날씨 API추출
        }
    }, '#data-wrap .spot-bx a');



