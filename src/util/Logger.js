/* eslint-disable no-console */

// Log levels
const TRACE = 5;
const DEBUG = 4;
const INFO = 3;
const WARN = 2;
const ERROR = 1;
const OFF = 0;

const LOG_LEVEL_STYLES = {
    [TRACE]: styledLogLevel('#7F8C8D'), // Gray
    [DEBUG]: styledLogLevel('#2ECC71'), // Green
    [INFO]: styledLogLevel('#4794C8'), // Blue
    [WARN]: styledLogLevel('#F39C12'), // Yellow
    [ERROR]: styledLogLevel('#C0392B'), // Red
    [OFF]: [''],
};

function compareLogLevel(a, b)
{
    return a - b;
}

function styledLogLevel(color)
{
    return [
        `background: ${color}`,
        'border-radius: 0.5em',
        'color: white',
        'font-weight: bold',
        'padding: 2px 0.5em',
    ];
}

// Useful functions
function noop() { /** Do nothing. */ }

function getStyledMessage(message, styles)
{
    return [
        `%c${message}`,
        styles.join(';'),
    ];
}

function getConsoleFunction(level)
{
    switch(level)
    {
        case TRACE:
            return console.trace;
        case DEBUG:
            return console.log;
        case INFO:
            return console.log;
        case WARN:
            return console.warn;
        case ERROR:
            return console.error;
        case OFF:
            return noop;
        default:
            return console.log;
    }
}

function prependMessageTags(out, name, domain, level)
{
    if (name)
    {
        out.unshift(`[${name}]`);
    }

    if (domain)
    {
        let tag = getStyledMessage(domain, LOG_LEVEL_STYLES[level]);
        out.unshift(tag[0], tag[1]);
    }

    return out;
}

const LEVEL = Symbol('level');
const DOMAIN = Symbol('domain');
const LOGGERS = { /** To be populated by logger instances. */ };
let DEFAULT_LEVEL = WARN;
let DEFAULT_DOMAIN = 'app';
export class Logger
{
    static get TRACE() { return TRACE; }
    static get DEBUG() { return DEBUG; }
    static get INFO() { return INFO; }
    static get WARN() { return WARN; }
    static get ERROR() { return ERROR; }
    static get OFF() { return OFF; }

    /**
     * Creates or gets the logger for the given unique name.
     * @param {String} name 
     * @returns {Logger} The logger with the name.
     */
    static getLogger(name)
    {
        if (name in LOGGERS)
        {
            return LOGGERS[name];
        }
        else
        {
            return LOGGERS[name] = new Logger(name);
        }
    }

    static useDefaultLevel(level)
    {
        DEFAULT_LEVEL = level;
        return this;
    }

    static useDefaultDomain(domain)
    {
        DEFAULT_DOMAIN = domain;
        return this;
    }

    constructor(name)
    {
        this.name = name;
        this[LEVEL] = DEFAULT_LEVEL;
        this[DOMAIN] = DEFAULT_DOMAIN;
    }

    setLevel(level)
    {
        this[LEVEL] = level;
        return this;
    }
    
    getLevel()
    {
        return this[LEVEL];
    }

    setDomain(domain)
    {
        this[DOMAIN] = domain;
        return this;
    }

    getDomain()
    {
        return this[DOMAIN];
    }

    log(level, ...messages)
    {
        if (compareLogLevel(this[LEVEL], level) < 0) return this;
        prependMessageTags(messages, this.name, this[DOMAIN], level);
        getConsoleFunction(level)(...messages);
    }

    trace(...messages)
    {
        if (compareLogLevel(this[LEVEL], TRACE) < 0) return this;
        prependMessageTags(messages, this.name, this[DOMAIN], TRACE);
        getConsoleFunction(TRACE)(...messages);
    }

    debug(...messages)
    {
        if (compareLogLevel(this[LEVEL], DEBUG) < 0) return this;
        prependMessageTags(messages, this.name, this[DOMAIN], DEBUG);
        getConsoleFunction(DEBUG)(...messages);
    }

    info(...messages)
    {
        if (compareLogLevel(this[LEVEL], INFO) < 0) return this;
        prependMessageTags(messages, this.name, this[DOMAIN], INFO);
        getConsoleFunction(INFO)(...messages);
    }

    warn(...messages)
    {
        if (compareLogLevel(this[LEVEL], WARN) < 0) return this;
        prependMessageTags(messages, this.name, this[DOMAIN], WARN);
        getConsoleFunction(WARN)(...messages);
    }

    error(...messages)
    {
        if (compareLogLevel(this[LEVEL], ERROR) < 0) return this;
        prependMessageTags(messages, this.name, this[DOMAIN], ERROR);
        getConsoleFunction(ERROR)(...messages);
    }
}
