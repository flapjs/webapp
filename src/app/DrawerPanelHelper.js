export function getTabFromPanelClass(panelClass)
{
    if (typeof panelClass !== 'function') return 'Tab?';
    return 'Tab' in panelClass ? panelClass.Tab : 'Tab?';
}

export function getPanelFromPanelClass(panelClass)
{
    return panelClass;
}
