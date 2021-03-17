export const OPEN = '(';
export const CLOSE = ')';
export const UNION = '\u222A';
export const CONCAT = '\u25E6';
export const KLEENE = '*';
export const PLUS = '\u207A';

export const EMPTY = '\u03B5';
export const SIGMA = '\u03A3';
export const EMPTY_SET = '\u2205';

const SCOPE_SYMBOLS = new Set([
    OPEN,
    CLOSE,
]);
const OPERATOR_SYMBOLS = new Set([
    UNION,
    CONCAT,
    KLEENE,
    PLUS,
]);
const TERMINAL_SYMBOLS = new Set([
    EMPTY,
    SIGMA,
    EMPTY_SET,
]);

function isValidTerminal(symbol)
{
    return !SCOPE_SYMBOLS.has(symbol) && !OPERATOR_SYMBOLS.has(symbol);
}

function areParenthesisBalanced(expressionString)
{
    let count = 0;
    for (let i = 0; i < expressionString.length; i++)
    {
        let symbol = expressionString.charAt(i);

        if (symbol == OPEN) count++;
        else if (symbol == CLOSE) count--;

        if (count < 0) return false;
    }
    return count == 0;
}

function injectConcatSymbols(expressionString)
{
    let result = '';
    for (let i = 0; i < expressionString.length; i++)
    {
        let currChar = expressionString.charAt(i);
        result += currChar;
        if (i + 1 < expressionString.length)
        {
            let nextChar = expressionString.charAt(i + 1);
            if (currChar != OPEN && currChar != UNION
                && currChar != CONCAT && nextChar != CLOSE
                && nextChar != UNION && nextChar != KLEENE
                && nextChar != PLUS && nextChar != CONCAT)
            {
                result += CONCAT;
            }
        }
    }
    return result;
}

function makeParentOf(child, newParent)
{
    let oldParent = child.parent;
    newParent.setParent(oldParent);
    child.setParent(newParent);
}

function createScopeNode(node, symbol, index)
{
    if (!node)
    {
        return new ScopeNode(symbol, index);
    }
    else
    {
        return new ScopeNode(symbol, index).setParent(node);
    }
}

function createUnaryOpNode(node, symbol, index)
{
    let newNode = new UnaryOpNode(symbol, index);
    makeParentOf(node, newNode);
    return newNode;
}

function createBinaryOpNode(node, symbol, index)
{
    if (!node.parent)
    {
        let newNode = new BinaryOpNode(symbol, index);
        makeParentOf(node, newNode);
        return newNode;
    }
    else
    {
        // Special cases where the newly created node should be the parent of
        // the PARENT of the currNode are based off of symbol, so whenever
        // we add a new binary operator, this is something you should MODIFY.
        let makeParentOfParent = 0;
        const oldParent = node.parent;
        const parentSymbol = oldParent.symbol;
        switch(symbol)
        {
            case CONCAT:
                if (parentSymbol === CONCAT) makeParentOfParent = 1;
                break;
            case UNION:
                if (parentSymbol !== OPEN) makeParentOfParent = 1;
                break;
        }

        if (makeParentOfParent)
        {
            let oldGrandParent = oldParent.parent;
            let newNode = new BinaryOpNode(symbol, index).setParent(oldGrandParent);
            makeParentOf(oldParent, newNode);
            return newNode;
        }
        else
        {
            let newNode = new BinaryOpNode(symbol, index).setParent(oldParent);
            makeParentOf(node, newNode);
            return newNode;
        }
    }
}

function createTerminalNode(node, symbol, index)
{
    if (!node)
    {
        return new TerminalNode(symbol, index);
    }
    else
    {
        return new TerminalNode(symbol, index).setParent(node);
    }
}

export class RegularExpression
{
    static parse(expressionString) 
    {
        let validationResult = this.validate(expressionString);
        let expression = injectConcatSymbols(expressionString);

        if (validationResult.errors.length <= 0 && validationResult.warnings.length <= 0)
        {
            let nodes = [];
            let terminals = [];
            //let terminals = new Set();

            let openScopeStack = [];
            let current = null;
            let index = -1;
            for(let symbol of expression)
            {
                ++index;

                switch(symbol)
                {
                    case OPEN:
                        current = createScopeNode(current, OPEN, index);
                        openScopeStack.push(current);
                        break;
                    case CLOSE:
                        current = openScopeStack.pop();
                        // @ts-ignore
                        current.endIndex = index;
                        break;
                    case KLEENE:
                        current = createUnaryOpNode(current, KLEENE, index);
                        break;
                    case PLUS:
                        current = createUnaryOpNode(current, PLUS, index);
                        break;
                    case CONCAT:
                        current = createBinaryOpNode(current, CONCAT, index);
                        break;
                    case UNION:
                        current = createBinaryOpNode(current, UNION, index);
                        break;
                    case ' ':
                        // Ignore spaces
                        break;
                    default:
                    {
                        // For terminals
                        current = createTerminalNode(current, symbol, index);

                        // Add only NON-RESERVED TERMINALS to the regex's terminal set
                        if (!TERMINAL_SYMBOLS.has(symbol))
                        {
                            terminals.push(symbol);
                        }
                    }
                }

                nodes.push(current);
            }

            // Find the root node.
            let root = null;
            for(let node of nodes)
            {
                if (!node.parent)
                {
                    root = node;
                    break;
                }
            }
            
            return new RegularExpression(expressionString, root, nodes, terminals);
        }

        let result = new RegularExpression(expressionString, null, [], []);
        result.errors = validationResult.errors;
        result.warnings = validationResult.warnings;
        return result;
    }

    static validate(expressionString) 
    {
        let errors = [];
        let warnings = [];
        let result = { errors, warnings };

        expressionString = stripWhitespace(expressionString);

        // Empty string is valid.
        if (!expressionString) return result;

        // Only '(' or a terminal can be the first character
        let firstSymbol = expressionString.charAt(0);
        if (!isValidTerminal(firstSymbol) && firstSymbol !== OPEN)
        {
            errors.push('Operators are poorly formatted.');
        }

        // Check scope balance.
        if (!areParenthesisBalanced(expressionString))
        {
            errors.push('The parentheses are unbalanced!');
        }

        // Wrap expression in scope (for out-of-bounds reasons).
        expressionString = `(${expressionString})`;

        let current = firstSymbol;
        let previous;
        for(let i = 1; i < expressionString.length; ++i)
        {
            previous = current;
            current = expressionString.charAt(i);

            switch(current)
            {
                case UNION:
                case CONCAT:
                    // UNION and CONCAT can't be the last character
                    if (i == expressionString.length - 1)
                    {
                        errors.push('Operators are poorly formatted.');
                    }
                    break;
                case CLOSE:
                case KLEENE:
                case PLUS:
                    // Must be preceded with a symbol
                    if (previous == OPEN || previous == UNION || previous == CONCAT)
                    {
                        errors.push('Operators are poorly formatted.');
                    }
                    // Kleene and Plus cannot be applied to empty set
                    if ((current == KLEENE || current == PLUS) && previous == EMPTY_SET)
                    {
                        errors.push('Empty set can only be part of a union or concatenation');
                    }
                    break;
            }
        }

        // We validated everything :)
        return result;
    }

    static stringify(re)
    {
        return re.string;
    }

    constructor(expressionString, root, nodes, terminals)
    {
        this.string = expressionString;
        this.root = root;
        this.nodes = nodes;
        this.terminals = terminals;

        this.errors = [];
        this.warnings = [];
    }
    getTerminals() {return this.terminals;}
    
}

function stripWhitespace(string)
{
    return string.replace(/\s/, '');
}

class RegularExpressionNode
{
    static isValidChild(childNode)
    {
        return Boolean(childNode);
    }

    constructor(symbol)
    {
        this.symbol = symbol;
        
        this._parent = null;
        this._children = [];
    }

    get parent() { return this._parent; }
    get children() { return this._children; }

    /**
     * Sets this node as the child of the passed-in node. If the node
     * already has a parent, it will be replaced.
     * 
     * There is intentionally no addChild(), since it's use can easily
     * lead to cyclic dependencies if used improperly. It's for your
     * own good.
     * 
     * @param {RegularExpressionNode} parentNode The new parent node.
     * @returns {RegularExpressionNode} Self for method-chaining.
     */
    setParent(parentNode)
    {
        let oldParent = this._parent;
        if (oldParent)
        {
            let oldChildren = oldParent._children;
            let i = oldChildren.indexOf(this);
            oldChildren.splice(i, 1);
        }

        if (parentNode)
        {
            // @ts-ignore
            if (!parentNode.constructor.isValidChild(this))
            {
                throw new Error('Cannot set node as a child of this node.');
            }

            let newChildren = parentNode._children;
            newChildren.push(this);
        }

        this._parent = parentNode;
        return this;
    }
}

export class TerminalNode extends RegularExpressionNode
{
    /** @override */
    static isValidChild(childNode)
    {
        return false;
    }

    constructor(symbol, index)
    {
        super(symbol);

        this.index = index;
    }
}

export class BinaryOpNode extends RegularExpressionNode
{
    constructor(symbol, index)
    {
        super(symbol);

        this.index = index;
    }
}

export class UnaryOpNode extends RegularExpressionNode
{
    constructor(symbol, index)
    {
        super(symbol);

        this.index = index;
    }
}

export class ScopeNode extends RegularExpressionNode
{
    constructor(symbol, index)
    {
        super(symbol);

        this.startIndex = index;
        this.endIndex = -1;
    }
}
