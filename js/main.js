
//class
class Calculator{
    constructor(previousOperandTextElement,currentOperandTextElement){        
        this.previousOperandTextElement = previousOperandTextElement
        this.currentOperandTextElement = currentOperandTextElement
        this.clear()
    }

    delete(){
        this.currentOperand = this.currentOperand.toString().slice(0,-1)

    }
    clear(){
        this.currentOperand = ""
        this.previousOperand =""
        this.operation = undefined

    }
    

    appendNumber(number){
        if(number=="." && this.currentOperand.includes(".")) return 
        this.currentOperand = this.currentOperand.toString() + number.toString()

    }
    // chooseOperation(operation){
    //     if(this.currentOperand=="") return 
    //     if(this.previousOperand !== ""){
    //         this.compute()
    //     }
    //     this.operation = operation
    //     this.previousOperand = this.currentOperand
    //     this.currentOperand =""
    // }
    chooseOperation(operation) {
        if (operation === "%") {
          if (this.currentOperand === "") return;
          const percentage = parseFloat(this.currentOperand) / 100;
          this.currentOperand = percentage.toString();
          this.updateDisplay();
          return;
        }
        
        if (this.currentOperand === "") return;
        if (this.previousOperand !== "") {
          this.compute();
        }
        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = "";
      }
    
    compute(){
        let computation
        const previous = parseFloat(this.previousOperand)
        const current = parseFloat(this.currentOperand)

        if(isNaN(previous)||isNaN(current)) return
        
        

        switch(this.operation){
            case "+":
                computation = previous + current
                break
            case "-":
                computation = previous - current
                break
            case"x":
                computation = previous * current
                break
            case "/":
                computation = previous / current
                break
            //add %
            // case "%":
            //     computation = 
            //     break
            
            default:
                return

        }

        this.currentOperand = computation
        this.operation = undefined
        this.previousOperand = ""
    }
    getDisplayNumber(number) {
        const stringNumber = number.toString()
        const integerDigits = parseFloat(stringNumber.split('.')[0])
        const decimalDigits = stringNumber.split('.')[1]
        let integerDisplay
        if (isNaN(integerDigits)) {
          integerDisplay = ''
        } else {
          integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 })
        }
        if (decimalDigits != null) {
          return `${integerDisplay}.${decimalDigits}`
        } else {
          return integerDisplay
        }
      }
    updateDisplay(){
        this.currentOperandTextElement.innerText = this.getDisplayNumber(this.currentOperand)

        if(this.operation != null){
            this.previousOperandTextElement.innerText = `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`

        }else{
            this.previousOperandTextElement.innerText = ''
        }
    }
}



// variables

const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')

const clearButton = document.querySelector('[data-all-clear]')
const deleteButton = document.querySelector('[data-delete]')
const equalsButton = document.querySelector('[data-equals]')

const currentOperandTextElement = document.querySelector('[data-current-operand]')
const previousOperandTextElement = document.querySelector('[data-previous-operand]')

const calculator = new Calculator(previousOperandTextElement,currentOperandTextElement)


//event listener
numberButtons.forEach(button=>{
    button.addEventListener('click',()=>{
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
        console.log(button.innerText)
    })
})

operationButtons.forEach(button=>{
    button.addEventListener('click',()=>{
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay()
        console.log(button.innerText)
    })
})

equalsButton.addEventListener('click',()=>{
    calculator.compute()
    calculator.updateDisplay()
})

clearButton.addEventListener('click',()=>{
    calculator.clear()
    calculator.updateDisplay()
})

deleteButton.addEventListener('click',()=>{
    calculator.delete()
    calculator.updateDisplay()
})