export function transformScreenToView(element, clientX, clientY)
{
    if (!(element instanceof SVGGraphicsElement)) return [clientX, clientY];
    const ctm = element.getScreenCTM();
    return [
        (clientX - ctm.e) / ctm.a,
        (clientY - ctm.f) / ctm.d,
    ];
}

export function transformViewToScreen(svg, x, y)
{
    const ctm = svg.getScreenCTM();
    return [
        (x * ctm.a) + ctm.e,
        (y * ctm.d) + ctm.f,
    ];
}
