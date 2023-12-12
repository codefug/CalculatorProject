# CalculatorProject
Using HTML, CSS, JavaScript skills that i've learned, make my own calculator with multiple functions

# 계산기 프로젝트

1. HTML
    1-1. popup 설계
        position: fixed를 이용해서 화면 가운데로 팝업을 띄우고 별도의 js가 없으면 display: none으로 보이지 않게 한다.
    1-2. body 설계, flexbox로 레이아웃을 정한다.
    1-3. githubMark를 href url로 가져와서 삽입했다.
    1-4. html symbol을 검색하여 copyright symbol을 foot에 넣었다.

2. CSS
    1-1. flex에서 basis가 0이면 아이템이 0으로 취급하고 flex-grow, flex-shrink의 영향을 받는다.
    1-2. filter는 전체적인 색체를 제어한다.

3. JavaScript
    3-1. script에서 defer를 해야 html load가 끝나고 script를 연결하게 된다.

    3-2. 변수
        3-2-1. operator
            문자열에 맞는 수식을 value로 갖고 있는 객체
        3-2-2. isHistoryClicked
            팝업 띄웠는지 여부 확인
        3-2-3. content
            팝업 안의 내용 정의
        3-2-4. isfloat
            소수점 . 을 찍었을 때 두번째 자리까지만 할 수 있기 때문에 판별하기 위해 존재,
            연산자를 찍었으면 초기화 두번째 자리에서 넘어갔으면 더 올라가지 못한다.

    3-3.  함수
        3-3-1.calculateInfixWithoutParentheses(expression)
            중위 표기식 연산을 이용해서 해결한다. stack을 이용한 연산이다.
            1. 우선순위를 객체로 미리 뽑아놓고 expression을 돌릴 때 연산자스택, 피연산자스택에서 값을 뽑아서 연산한다.
            2. 연산된 것은 그대로 피연산자스택에 넣는다.
            3. 남아있는 연산자를 처리하고 피연산자스택에 넣는다.
            4. 피연산자스택 리턴
        3-3-2. history
            isHistoryClicked를 비교하여 display처리를 한다.
        3-3-3. openPopup
            display를 popup에 내용을 추가하고 display처리하는 함수
        3-3-4. mutresult
            mutationObserver은 DOM트리의 변경을 감지한다. 이후에 obsersve를 통해 result
            의 결과 변화를 감지하는데 사용한다. 
        3-3-5. clickOperator
            1. 정규표현식으로 소수와 정수 모두 포함하도록한다.
                /(?:\d*\.\d+\b\d+\b|\D+)/g
                (?:...) 그룹들끼리 겹치지 않고 독립적으로 매칭
                /d*\.\d+ : 0회 이상의 숫자, . , 1회 이상의 숫자
                \b\d+\b : 정확히 1회 이상의 숫자 패턴 그대로 만 b는 단어 경계
                \D+ : 비숫자 1회 이상
                g : global
            2. .match을 이용해 정규표현식이 screen에 맞는지 확인
            3. unaryminus 처리
                3.1. 양수 음수에 따라서 - 를 slice하거나 +해준다.
            4. =을 제외한 연산자 처리
                4.1. =가 연산을 하기 때문에 screen에 operator처리를 해준다.
            5. = 처리
                5.1. result에 식을 담아주고
                5.2. 중위 표기식 계산 자체에서는 -가 연산자로 취급되기 때문에 음수일 경우 앞에 0을 splice로 더해준다.
                5.3. 중위 표기식 계산해준다.
        3-3-6. clickDelete
            1. slice 이용해서 뒷쪽 하나를 삭제한 상태에서 copy이후 조건식
                1.1. 0이면 0
                1.2. 소수였으면 isfloat-=1
        3-3-7. clickClear
            1. screen을 clear한다.
        3-3-8. clickNumber
            1. 0이면 number를 screen에 넣는다.
            2. 소수면 그대로 +=number
            3. 소수가 아니고 소수 둘째자리라는 범위 안에 있으면 +=number하고 isfloat처리
        3-3-9. clickDot
            1. 연산자가 아니면 .을 찍어주고 isfloat+=1 로 소수임을 알려준다.
        3-3-10. button
            1. 이벤트 버블링을 이용해서 더 높은 수준의 이벤트를 처리하는 event delegate 방식을 이용하여 keyboard에 있는 버튼들을 한번에 처리한다.