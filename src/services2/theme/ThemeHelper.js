const ROOT_ELEMENT = document.body;

export function setVariable(name, value)
{
    ROOT_ELEMENT.style.setProperty('--' + name, value);
}

export function getVariable(name)
{
    ROOT_ELEMENT.style.getPropertyValue('--' + name);
}

const DEFAULT_THEME = {
    primary: '',
    secondary: '',
    success: '',
    danger: '',
    warning: '',
    info: '',
};

export function createTheme(primary, secondary, opts = {})
{
    return {
        primary,
        secondary,
        success: opts.success || DEFAULT_THEME.success,
        danger: opts.danger || DEFAULT_THEME.danger,
        warning: opts.warning || DEFAULT_THEME.warning,
        info: opts.info || DEFAULT_THEME.info,
    };
}

export function applyTheme(theme)
{
    const style = ROOT_ELEMENT.style;
    style.setProperty('--primary', theme.primary);
    style.setProperty('--secondary', theme.secondary);
    style.setProperty('--success', theme.success);
    style.setProperty('--danger', theme.danger);
    style.setProperty('--warning', theme.warning);
    style.setProperty('--info', theme.info);
}
