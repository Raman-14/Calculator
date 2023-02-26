(function(){
    let screen = document.querySelector('.screen');
    let buttons = document.querySelectorAll('.btn');
    let clear = document.querySelector('.btn-clear');
    let equal = document.querySelector('.btn-equal');

    buttons.forEach(function(button){
        button.addEventListener('click',function(e){
            let value = e.target.dataset.num;
            console.log(typeof value)
            screen.value += value;
        })
    });

    equal.addEventListener('click',function(){
        if(screen.value === ''){
            screen.value = "Please enter";
        }else{
            let answer = eval(screen.value);
            let answer_custom = custom_eval(screen.value);
            screen.value = answer;

            if (answer_custom === answer)
                alert(`Success, Custom_eval() ${answer_custom} & eval()${answer} are Equal`)
            else
                alert(`Wrong, Custom_eval() ${answer_custom} & eval()${answer} are NOT Equal`)
            console.log(screen.value)
        }
    })

    clear.addEventListener('click',function(e){
        screen.value = "";
    })

})();


function custom_eval(value){
    console.log(value)
    let currentValue = '';
    let total = 0;
    let previousSign = "+"
    for(let i = 0; i<value.length; i++){
        // i - number
        if(value[i] !== '+' && value[i]!=="-" && value[i]!=='*' && value[i]!=='/'){
            currentValue += value[i]; 
        }
        else{ // i - sign
            let currentSign = value[i];
            total = signValue(previousSign, currentValue, total, currentSign)
            currentValue= "";
            previousSign=currentSign;
        }

        if(i==value.length-1) // last number
            total = signValue(previousSign, currentValue, total)
    }
    console.log(total);

    return total
}

function signValue(previousSign, currentValue, total){
    if(previousSign === "*")
        total *= parseInt(currentValue);
    else if(previousSign === "/")
        total = total/parseInt(currentValue);
    else if(previousSign === "+")
        total += parseInt(currentValue)
    else if(previousSign === "-")
        total-= parseInt(currentValue)

    return total;
}
// let answer = custom_eval("8*2/4")
// // let answer = custom_eval("8*12+15")
// console.log(answer)

// answer = custom_eval("8+12-15")
// console.log(answer)