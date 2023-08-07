
function alermMessage(warnVar, warnStress)
{
    var txt ="";

    //호우경보 발령 호우주의보 발령 경보 : 주의보 :
    if(warnVar=="1" && warnStress=="1") txt = "계곡, 강가, 바닷가 등 침수 위험지역에 접근하지 마세요!";
    else if(warnVar=="1" && warnStress=="0") txt = "계곡, 강가, 바닷가 등 침수 위험지역 접근에 주의하세요!";
    //풍랑경보 발령 풍랑주의보 발령 경보 :
    else if(warnVar=="2" && warnStress=="1") txt = "파도에 휩쓸릴 위험이 있는 방파제 등 바닷가에 접근하지 마세요!";
    else if(warnVar=="2" && warnStress=="0") txt = "파도에 휩쓸릴 위험이 있는 방파제 등 바닷가 접근에 주의하세요!";
    //태풍경보 발령 태풍주의보 발령 경보 :
    else if(warnVar=="3" && warnStress=="1") txt = "농촌에서는 논둑이나 물꼬를 보러 나가지 마세요!";
    else if(warnVar=="3" && warnStress=="0") txt = "산과 계곡, 비탈면 가까이 가지 않고 안전한 곳으로 대피하세요!";
    //강풍경보 발령 강풍주의보 발령 경보 :
    else if(warnVar=="4" && warnStress=="1") txt = "쓰러질 위험이 있는 나무 밑이나 전신주 밑을 피하고 안전한 건물로 대피하세요!";
    else if(warnVar=="4" && warnStress=="0") txt = "문과 창문을 잘 닫아 움직이지 않도록 하고 외출을 삼가하세요!";
    //산불경보 발령 산불주의보 발령 경보 :
    else if(warnVar=="5" && warnStress=="1") txt = "등산로 폐쇄 여부를 확인하고 산불 위험이 높은 통제지역에는 산행을 하지 않습니다!";
    else if(warnVar=="5" && warnStress=="0") txt = "지정된 장소가 아닌 곳에서는 취사 및 야영, 모닥불을 피우거나 흡연을 하지 않습니다!";
    //폭염경보 발령 폭염주의보 발령 경보 :
    else if(warnVar=="6" && warnStress=="1") txt = "농작업 시 12시 ~ 17시에는 작업을 중단하세요!";
    else if(warnVar=="6" && warnStress=="0") txt = "농작업 시 2인 이상이 함께 일하며 시간당 10분 ~ 15분씩 휴식하세요!";
    //가뭄경보 발령 가뭄주의보 발령 경보 :
    else if(warnVar=="7" && warnStress=="1") txt = "관정개발, 논물 가두기 등 농업용수를 확보하여 주세요!";
    else if(warnVar=="7" && warnStress=="0") txt = "논두렁 바르기, 비닐 깔기 등 농업용수 손실을 방지하여 주세요!";
    //대설경보 발령 대설주의보 발령 경보 :
    else if(warnVar=="8" && warnStress=="1") txt = "농촌에서는 가족이나 이웃과 함께 작물을 재배하지 않는 곳은 비닐을 걷어내 주세요!";
    else if(warnVar=="8" && warnStress=="0") txt = "외출 시에는 바닥면이 넓은 운동화를 착용하고, 보온 장갑 등을 착용하세요!";
    //한파경보 발령 한파주의보 발령 경보 :
    else if(warnVar=="9" && warnStress=="1") txt = "비닐하우스 등 동해 피해 방지를 위해 난방, 온실커튼, 축열 주머니 등 조치를 취하세요!";
    else if(warnVar=="9" && warnStress=="0") txt = "외출 시에는 내복, 목도리, 모자, 장갑 등으로 보온에 유의 하세요!";
    //미세먼지경보 발령 미세먼지주의보 발령 경보 :
    else if(warnVar=="10" && (warnStress=="0"|| warnStress=="")) txt = "점검중";
    else if(warnVar=="10" && (warnStress=="9" || warnStress=="점검중" || warnStress=="-")) txt = "측정데이타 없음";
    else if(warnVar=="10" && (warnStress=="1" || warnStress=="좋음")) txt = "발효된 특보가 없습니다";
    else if(warnVar=="10" && (warnStress=="2" || warnStress=="보통")) txt = "발효된 특보가 없습니다";
    else if(warnVar=="10" && (warnStress=="3" || warnStress=="나쁨")) txt = "기침, 목 및 눈 통증이 있는 사람은 실외활동을 피하고 외출 시 마스크를 착용해주세요!";
    else if(warnVar=="10" && (warnStress=="4" || warnStress=="매우나쁨" || warnStress=="매우 나쁨")) txt = "실외 활동량을 줄이고 외출 시 대기오염이 심한 곳에서는 가급적 마스크를 착용해주세요!";

    return txt;
}


function alermImg(warnVar, warnStress)
{
    var txt ="";

    //호우경보 발령 호우주의보 발령 경보 : 주의보 :
    if(warnVar=="1" && warnStress=="1") txt = "ico-heavyrain.png";
    else if(warnVar=="1" && warnStress=="0") txt = "ico-heavyrain.png";
    //풍랑경보 발령 풍랑주의보 발령 경보 :
    else if(warnVar=="2" && warnStress=="1") txt = "ico-highseas.png";
    else if(warnVar=="2" && warnStress=="0") txt = "ico-highseas.png";
    //태풍경보 발령 태풍주의보 발령 경보 :
    else if(warnVar=="3" && warnStress=="1") txt = "ico-typhoon.png";
    else if(warnVar=="3" && warnStress=="0") txt = "ico-typhoon.png";
    //강풍경보 발령 강풍주의보 발령 경보 :
    else if(warnVar=="4" && warnStress=="1") txt = "ico-strongwind.png";
    else if(warnVar=="4" && warnStress=="0") txt = "ico-strongwind.png";
    //산불경보 발령 산불주의보 발령 경보 :
    else if(warnVar=="5" && warnStress=="1") txt = "ico-forestfire.png";
    else if(warnVar=="5" && warnStress=="0") txt = "ico-forestfire.png";
    //폭염경보 발령 폭염주의보 발령 경보 :
    else if(warnVar=="6" && warnStress=="1") txt = "ico-intenseheat.png";
    else if(warnVar=="6" && warnStress=="0") txt = "ico-intenseheat.png";
    //가뭄경보 발령 가뭄주의보 발령 경보 :
    else if(warnVar=="7" && warnStress=="1") txt = "ico-drought.png";
    else if(warnVar=="7" && warnStress=="0") txt = "ico-drought.png";
    //대설경보 발령 대설주의보 발령 경보 :
    else if(warnVar=="8" && warnStress=="1") txt = "ico-heavysnow.png";
    else if(warnVar=="8" && warnStress=="0") txt = "ico-heavysnow.png";
    //한파경보 발령 한파주의보 발령 경보 :
    else if(warnVar=="9" && warnStress=="1") txt = "ico-coldwave.png";
    else if(warnVar=="9" && warnStress=="0") txt = "ico-coldwave.png";
    //미세먼지경보 발령 미세먼지주의보 발령 경보 :
    else if(warnVar=="10" && (warnStress=="0" || warnStress=="")) txt = "ico-blank.png";
    else if(warnVar=="10" && (warnStress=="9" || warnStress=="점검중" || warnStress=="-")) txt = "ico-blank.png";
    else if(warnVar=="10" && (warnStress=="1" || warnStress=="좋음")) txt = "ico-good.png";//미세먼지 좋음
    else if(warnVar=="10" && (warnStress=="2" || warnStress=="보통")) txt = "ico-normal.png"; //미세먼지 보통
    else if(warnVar=="10" && (warnStress=="3" || warnStress=="나쁨")) txt = "ico-watch.png";
    else if(warnVar=="10" && (warnStress=="4" || warnStress=="매우나쁨" || warnStress=="매우 나쁨")) txt = "ico-warning.png";

    return txt;
}


function alermColor(warnVar, warnStress)
{
    var txt ="";
    // blue 보통 평상시, blue:좋음 , yellow:나쁨 주의보  , red:매우나쁨 경보
    //호우경보 발령 호우주의보 발령 경보 : 주의보 :
    if(warnVar=="1" && warnStress=="1") txt = "red";
    else if(warnVar=="1" && warnStress=="0") txt = "yellow";
    //풍랑경보 발령 풍랑주의보 발령 경보 :
    else if(warnVar=="2" && warnStress=="1") txt = "red";
    else if(warnVar=="2" && warnStress=="0") txt = "yellow";
    //태풍경보 발령 태풍주의보 발령 경보 :
    else if(warnVar=="3" && warnStress=="1") txt = "red";
    else if(warnVar=="3" && warnStress=="0") txt = "yellow";
    //강풍경보 발령 강풍주의보 발령 경보 :
    else if(warnVar=="4" && warnStress=="1") txt = "red";
    else if(warnVar=="4" && warnStress=="0") txt = "yellow";
    //산불경보 발령 산불주의보 발령 경보 :
    else if(warnVar=="5" && warnStress=="1") txt = "red";
    else if(warnVar=="5" && warnStress=="0") txt = "yellow";
    //폭염경보 발령 폭염주의보 발령 경보 :
    else if(warnVar=="6" && warnStress=="1") txt = "red";
    else if(warnVar=="6" && warnStress=="0") txt = "yellow";
    //가뭄경보 발령 가뭄주의보 발령 경보 :
    else if(warnVar=="7" && warnStress=="1") txt = "red";
    else if(warnVar=="7" && warnStress=="0") txt = "yellow";
    //대설경보 발령 대설주의보 발령 경보 :
    else if(warnVar=="8" && warnStress=="1") txt = "red";
    else if(warnVar=="8" && warnStress=="0") txt = "yellow";
    //한파경보 발령 한파주의보 발령 경보 :
    else if(warnVar=="9" && warnStress=="1") txt = "red";
    else if(warnVar=="9" && warnStress=="0") txt = "yellow";
    //미세먼지경보 발령 미세먼지주의보 발령 경보 :
    else if(warnVar=="10" && (warnStress=="0" || warnStress=="")) txt = "green";
    else if(warnVar=="10" && (warnStress=="9" || warnStress=="점검중" || warnStress=="-")) txt = "green";
    else if(warnVar=="10" && (warnStress=="1" || warnStress=="좋음")) txt = "blue";
    else if(warnVar=="10" && (warnStress=="2" || warnStress=="보통")) txt = "green";
    else if(warnVar=="10" && (warnStress=="3" || warnStress=="나쁨")) txt = "yellow";
    else if(warnVar=="10" && (warnStress=="4" || warnStress=="매우나쁨" || warnStress=="매우 나쁨")) txt = "red";

    return txt;
}


//등급으로 addClass 이름찾기
function alermGradeToClass(grade)
{
    var txt ="";
    if(grade=="1") txt='good';
    else if(grade=="2") txt='usual';
    else if(grade=="3") txt='bad';
    else if(grade=="4") txt='seriousbad';
    else if(grade=="5") txt='seriousbad';
    else txt='blank';
    return txt;
}



function alermTitle(warnVar, warnStress)
{
    var txt ="";

    //호우경보 발령 호우주의보 발령 경보 : 주의보 :
    if(warnVar=="1" && warnStress=="1") txt = "호우 경보 발령";
    else if(warnVar=="1" && warnStress=="0") txt = "호우 주의보 발령";
    //풍랑경보 발령 풍랑주의보 발령 경보 :
    else if(warnVar=="2" && warnStress=="1") txt = "풍랑 경보 발령";
    else if(warnVar=="2" && warnStress=="0") txt = "풍랑 주의보 발령";
    //태풍경보 발령 태풍주의보 발령 경보 :
    else if(warnVar=="3" && warnStress=="1") txt = "태풍 경보 발령";
    else if(warnVar=="3" && warnStress=="0") txt = "태풍 주의보 발령";
    //강풍경보 발령 강풍주의보 발령 경보 :
    else if(warnVar=="4" && warnStress=="1") txt = "강풍 경보 발령";
    else if(warnVar=="4" && warnStress=="0") txt = "강풍 주의보 발령";
    //산불경보 발령 산불주의보 발령 경보 :
    else if(warnVar=="5" && warnStress=="1") txt = "산불 경보 발령";
    else if(warnVar=="5" && warnStress=="0") txt = "산불 주의보 발령";
    //폭염경보 발령 폭염주의보 발령 경보 :
    else if(warnVar=="6" && warnStress=="1") txt = "폭염 경보 발령";
    else if(warnVar=="6" && warnStress=="0") txt = "폭염 주의보 발령";
    //가뭄경보 발령 가뭄주의보 발령 경보 :
    else if(warnVar=="7" && warnStress=="1") txt = "가뭄 경보 발령";
    else if(warnVar=="7" && warnStress=="0") txt = "가뭄 주의보 발령";
    //대설경보 발령 대설주의보 발령 경보 :
    else if(warnVar=="8" && warnStress=="1") txt = "대설 경보 발령";
    else if(warnVar=="8" && warnStress=="0") txt = "대설 주의보 발령";
    //한파경보 발령 한파주의보 발령 경보 :
    else if(warnVar=="9" && warnStress=="1") txt = "한파 경보 발령";
    else if(warnVar=="9" && warnStress=="0") txt = "한파 주의보 발령";
    //미세먼지경보 발령 미세먼지주의보 발령 경보 :
    else if(warnVar=="10" && (warnStress=="0" || warnStress=="")) txt = "점검중";
    else if(warnVar=="10" && (warnStress=="9" || warnStress=="점검중" || warnStress=="-")) txt = "점검중";
    else if(warnVar=="10" && (warnStress=="1" || warnStress=="좋음")) txt = "미세먼지 좋음";
    else if(warnVar=="10" && (warnStress=="2" || warnStress=="보통")) txt = "미세먼지 보통";
    else if(warnVar=="10" && (warnStress=="3" || warnStress=="나쁨")) txt = "미세먼지 주의보 발령";
    else if(warnVar=="10" && (warnStress=="4" || warnStress=="매우나쁨" || warnStress=="매우 나쁨")) txt = "미세먼지 경보 발령";

    return txt;
}