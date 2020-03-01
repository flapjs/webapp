export function transformPanelToDrawerTab(panel)
{
    // May need to reach into the panel class slot object to find the tab...
    if (typeof panel === 'object' && 'component' in panel)
    {
        panel = panel.component;
    }
    
    if (typeof panel !== 'function') return 'Tab?';
    return 'Tab' in panel ? panel.Tab : 'Tab?';
}

export function transformPanelToDrawerPanel(panel)
{
    return panel;
}
