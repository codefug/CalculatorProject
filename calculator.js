let isHistoryClicked = true;
let history = document.querySelector('#history');
let content = `Result<br>`;
let screen = document.querySelector('#screen');
let isfloat = -1;
const operator = {
    "divide": '/',
    "multiply": '*',
    "minus": '-',
    "plus": '+'
}
//br치면 줄바꿈이 일어남 html에서는 줄바꿈할려면 이것만 됨.

// screen function
// 이거 꼭 적어라 ㅅㅂ script defer 안해서 시간 존나 걸림.

function calculateInfixWithoutParentheses(expression) {
    // 연산자 우선순위 정의
    var operators = {
      '+': 1,
      '-': 1,
      '*': 2,
      '/': 2
    };
  
    // 연산자와 피연산자를 저장할 스택
    var operatorsStack = [];
    var operandsStack = [];
  
    // 각 토큰에 대해 처리
    for (var i = 0; i < expression.length; i++) {
      var token = expression[i];
  
      if (!isNaN(token)) {
        // 피연산자일 경우 스택에 추가
        operandsStack.push(parseFloat(token));
      } else if (token in operators) {
        // 연산자일 경우 우선순위를 고려하여 스택 조정
        while (
          operatorsStack.length > 0 &&
          operators[operatorsStack[operatorsStack.length - 1]] >= operators[token]
        ) {
          var operator = operatorsStack.pop();
          var operand2 = operandsStack.pop();
          var operand1 = operandsStack.pop();
  
          // 연산 수행 후 결과를 스택에 추가
          switch (operator) {
            case '+':
              operandsStack.push(operand1 + operand2);
              break;
            case '-':
              operandsStack.push(operand1 - operand2);
              break;
            case '*':
              operandsStack.push(operand1 * operand2);
              break;
            case '/':
              operandsStack.push(operand1 / operand2);
              break;
            default:
              throw new Error('지원하지 않는 연산자: ' + operator);
          }
        }
  
        // 현재 연산자를 스택에 추가
        operatorsStack.push(token);
      }
    }
  
    // 스택에 남아 있는 모든 연산자를 처리
    while (operatorsStack.length > 0) {
      var operator = operatorsStack.pop();
      var operand2 = operandsStack.pop();
      var operand1 = operandsStack.pop();
  
      // 연산 수행 후 결과를 스택에 추가
      switch (operator) {
        case '+':
          operandsStack.push(operand1 + operand2);
          break;
        case '-':
          operandsStack.push(operand1 - operand2);
          break;
        case '*':
          operandsStack.push(operand1 * operand2);
          break;
        case '/':
          operandsStack.push(operand1 / operand2);
          break;
        default:
          throw new Error('지원하지 않는 연산자: ' + operator);
      }
    }
    // 최종 결과 반환
    return operandsStack.pop();
  }
  
//popup
history.addEventListener('click', () => {
    if (isHistoryClicked) {
        openPopup();
        isHistoryClicked = !isHistoryClicked;
    } else {
        popup.style.display = 'none';
        isHistoryClicked = !isHistoryClicked;
    }
});
function openPopup() {
    let popup = document.querySelector('#popup')

    // 팝업에 내용 추가
    popup.innerHTML = content;

    // 팝업 보이기
    popup.style.display = 'block';
}

// history
let result = document.querySelector('#result');

let mutresult=new MutationObserver(() => {
    content+=result.textContent+' = '+screen.textContent+`<br>`;
    console.log(content);
})

mutresult.observe(result,{childList:true, attributes:true}) 

// keyboard function

function clickOperator(op) {
    let pattern = /(?:\d*\.\d+|\b\d+\b|\D+)/g;
    // (?:...) 그룹들끼리 겹치지 않고 독립적으로 매칭
    // /d*\.\d+ : 0회 이상의 숫자, . , 1회 이상의 숫자
    // \b\d+\b : 정확히 1회 이상의 숫자 패턴 그대로 만 b는 단어 경계
    // \D+ : 비숫자 1회 이상
    // g : global

    let screentext=screen.textContent.match(pattern);
    console.log(screentext);
    if (isNaN(Number(screen.textContent[screen.textContent.length-1]))) {
        return;
    } else {
        isfloat=-1;
        if (op == 'unaryminus' && (screentext.length==1 || (screentext.length==2 && screentext[0]=='-'))) {
            if (Number(screen.textContent) > 0) {
                screen.textContent = '-' + screen.textContent;
            }
            else {
                screen.textContent = screen.textContent.slice(1);
            }
        }
        else if (op in operator) {
            screen.textContent += operator[op]
        }else if (op == 'equal'){
            result.textContent=screen.textContent;
            if (screentext.length<=2){
                screen.textContent=screentext.toString();
            }
            // 중위표기식            
            if (screentext[0]=='-'){
                screentext.splice(0,0,'0');
            }
            screen.textContent=calculateInfixWithoutParentheses(screentext)
        }
    }
}

function clickDelete() {
    screen.textContent = screen.textContent.slice(0, -1);
    if (screen.textContent.length == 0) {
        screen.textContent = '0';
    }
    if (isfloat != -1) {
        isfloat -= 1;
    }
}

function clickClear() {
    screen.textContent = '0';
    isfloat = -1;
}

function clickNumber(number) {
    if (screen.textContent == '0') {
        screen.textContent = number;
    } else {
        if (isfloat == -1) {
            screen.textContent += number;
        }
        else if (0 <= isfloat && isfloat < 2) {
            isfloat += 1;
            screen.textContent += number;
        }
    }
}

function clickDot() {
    //연산자 객체에 없으면 dot을 찍자.
    if (Number(screen.textContent[screen.textContent.length - 1]) == NaN) {
        return;
    } else {
        screen.textContent += '.';
        isfloat += 1;
        return;
    }
    //연산자 함수는 isfloat을 없애자.
    //소수점 2자리까지 하도록 처리
}

// keyboard delegate
let button = document.querySelector('#keyboard');

button.addEventListener('click', (event) => {
    let target = event.target;

    switch (target.id) {
        //clear
        case "clear":
            clickClear();
            break;
        case "delete":
            clickDelete();
            break;

        // operator
        case "unaryminus":
        case "divide":
        case "multiply":
        case "minus":
        case "plus":
        case "equal":
            clickOperator(target.id);
            break;

        // dot
        case "dot":
            if (isfloat == -1) {
                clickDot();
            }
            break;

        // click number
        case "seven":
        case "eight":
        case "nine":
        case "four":
        case "five":
        case "six":
        case "one":
        case "two":
        case "three":
        case "zero":
            clickNumber(target.textContent);
            break;
    }
}
)