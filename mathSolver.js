export class MathSolver {
    symbols = ['*', '/', '+', '-'];

    constructor() {}

    doMath(first, second, operator) {
        first = parseFloat(first);
        second = parseFloat(second);
        
        switch(operator) {
            case '+':
                return first + second
            case '-':
                return first - second
            case '/':
                return first / second
            case '*':
                return first * second
            default:
                return 0
        }
    }
    
    solveExpression(expression) {
        const solveSymbol = (expression, symbol) => {
            if (expression.lastIndexOf(symbol) >= 0) {
                while (expression.lastIndexOf(symbol) >= 0) {
                    const lastIndexOf = expression.lastIndexOf(symbol);
                    let firstIndex;
                    let secIndex;
            
                    for (var i = lastIndexOf - 1; i >= 0; i--) {
                        firstIndex = this.symbols.includes(expression[i]) ? i : undefined;
                        if (firstIndex) break;
                    }
            
                    for (var i = lastIndexOf + 1; i <= expression.length; i++) {
                        secIndex = this.symbols.includes(expression[i]) ? i : undefined;
                        if (secIndex) break;
                    }
                    
                    const firstVal = parseFloat(firstIndex ? expression.substring(firstIndex + 1, lastIndexOf) : expression.substring(0, lastIndexOf));
                    const secVal = parseFloat(secIndex ? (lastIndexOf + 1 === secIndex - 1 ? expression[lastIndexOf + 1] : expression.substring(lastIndexOf + 1, secIndex)) : expression.substring(lastIndexOf + 1));
                    const value = this.doMath(firstVal, secVal, expression[lastIndexOf]);
                    expression = `${firstIndex ? expression.substring(0, firstIndex + 1) : ""}${value}${secIndex ? expression.substring(secIndex) : ""}`;
                }
    
            }
        
            return expression;
        }
    
        this.symbols.forEach(symbol => {
            expression = solveSymbol(expression, symbol);
        });
    
        return expression;
    }
    
    removeWhitespaces(expression) {
        return expression.replace(/\s+/g, '')
    }
    
    validateExpression(expression) {
        const pattern = new RegExp('[()-+*//., 0-9]+$');
        return pattern.test(expression)
    }
    
    addSymbolToParenthesys(expression) {
        for (var i = 0; i < expression.length; i++) {
            if (expression[i] === '(') {
                if (i > 0) {
                    if (!this.symbols.includes(expression[i - 1])) {
                        return this.addSymbolToParenthesys(`${expression.substring(0, i)}*${expression.substring(i)}`)
                    }
                }
            } 
        }
    
        return expression;
    }
    
    solveParenthesis(expression) {
        while (expression.indexOf('(') >= 0) {
            const indexOpenPar = expression.lastIndexOf('(')
            const indexClosePar = expression.substring(indexOpenPar).indexOf(')')
            const expressionToParse = expression.substring(indexOpenPar + 1, indexClosePar + indexOpenPar);
            const resultOfExpression = solveExpression(expressionToParse)
            expression = `${expression.substring(0, indexOpenPar)}${resultOfExpression}${expression.substring(indexOpenPar + indexClosePar + 1)}`
        }
    
        return expression
    }
    
    resolveExpression(expression) {
        expression = this.removeWhitespaces(expression)
        if (this.validateExpression(expression)) {
            expression = this.addSymbolToParenthesys(expression)
            expression = this.solveParenthesis(expression);
            return this.solveExpression(expression)
        } else {
            throw new Error('Error: the expression can only contains: numbers, arithmetic operators and parenthesis');
        }
    }
}

export default MathSolver;
