import { Component } from '@angular/core';

@Component({
  selector: 'app-calculator',
  standalone: true,
  imports: [],
  templateUrl: './calculator.component.html',
  styleUrl: './calculator.component.css'
})
export class CalculatorComponent {
  currentNumber = '0';
  firstOperand: number | null = null;
  operator: string | null = null;
  waitForSecondOperand = false;

  public getNumber(v: string) {
    if (this.waitForSecondOperand) {
      this.currentNumber = v;
      this.waitForSecondOperand = false;
    } else {
      this.currentNumber === '0' ? this.currentNumber = v : this.currentNumber += v;
    }
  }

  public getDecimal() {
    if (!this.currentNumber.includes('.')) {
      this.currentNumber += '.';
    }
  }

  private doCalculation(op: string, secondOp: number): number {
    switch (op) {
      case '+': return this.firstOperand! + secondOp;
      case '-': return this.firstOperand! - secondOp;
      case '*': return this.firstOperand! * secondOp;
      case '/': return this.firstOperand! / secondOp;
      case '=': return secondOp;
      default: return this.firstOperand ?? 0;  // fallback to a valid number
    }
  }

  public getOperation(op: string) {
    if (this.firstOperand === null) {
      this.firstOperand = Number(this.currentNumber);
    } else if (this.operator) {
      const result = this.doCalculation(this.operator, Number(this.currentNumber));
      this.currentNumber = String(result);
      this.firstOperand = result;
    }

    this.operator = op;
    this.waitForSecondOperand = true;
  }

  public clear() {
    this.currentNumber = '0';
    this.firstOperand = null;
    this.operator = null;
    this.waitForSecondOperand = false;
  }
}
