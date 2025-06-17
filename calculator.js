const display=document.getElementById("display");
const button=document.querySelectorAll("button");

button.forEach(button=>{
    button.addEventListener("click",()=>{
        handleInput(button.getAttribute("data-value"),button.getAttribute("data-action"));
    });
});

// document.addEventListener("keydown", (event) => {
//   const key = event.key;
//   if (/\d/.test(key) || ['+', '-', '*', '/', '.'].includes(key)) {
//     console.log("Key Pressed:", key);
//     display.value += key;
//   } 
//   else if (key === "Enter") {
//     event.preventDefault();
//     console.log("Evaluating Expression:", display.value);
//     calculate();
//   } 
//   else if (key === "Backspace") {
//     display.value = display.value.slice(0, -1);
//   } 
//   else if (key === "Escape") {
//     display.value = "";
//   }
// });

function handleInput(value, action) {
  if (action === "clear") {
    display.value = "";
    console.log("Display cleared");
  } 
  else if (action === "delete") {
    display.value = display.value.slice(0, -1);
    console.log("Deleted last character");
  } 
  else if (action === "calculate") {
    console.log("Evaluating Expression:", display.value);
    calculate();
  } 
  else if (value !== null) {
    display.value += value;
    console.log("Button Clicked:", value);
  }
}

function calculate(){
    try{
        const tokens=tokenize(display.value); 
        console.log(tokens);
        const postfix=infixToPostfix(tokens);
        const result=evaluatePostfix(postfix);
        console.log("result:",result);
        display.value=result;
    }
    catch(error){
        console.log("calculation error:",error);
        display.value=error;
    }
}

function tokenize(expression) {
  return expression.match(/\d+(\.\d+)?|[+\-*/]/g);
} 

// function calculate() {
//   try {
//     const expression = display.value;
//     if (/^[\d+\-*/.() ]+$/.test(expression)) {
//       const result = eval(expression);
//       console.log("result:", result);
//       display.value = result;
//     } else {
//       throw Error("Invalid input");
//     }
//   } catch (error) {
//     console.log("calculation error:", error.message);
//     display.value = "Error";
//   }
// }

function infixToPostfix(tokens){
    const precedence={ '+':1 , '-':1, '*': 2, '/':2};
    const output=[];
    const stack=[];
    for (const token of tokens){
        if(!isNaN(token)){
            output.push(token);
        }    
        else{
            while(stack.length && precedence [stack[stack.length-1]]>=precedence[tokens]){
                output.push(stack.pop());
            }
            stack.push(token);
        }
    }
    while(stack.length){
        output.push(stack.pop());
    }
    return output;
}

function evaluatePostfix(postfix){
    const stack=[];
    for(const token of postfix){
        if(!isNaN(token)){
            stack.push(parseFloat(token));
        }
        else{
            const b=stack.pop();
            const a=stack.pop();
            let res=0;
            switch(token){
               case '+': res = a+b;
               break;
               case '-': res = a-b;
               break;
               case '*': res = a*b;
               break;
               case '/': res = a/b;
               break;
            }
            stack.push(res);
        }
    }
    return stack[0].toString();
}