export const LEFT = 'left';
export const RIGHT = 'right';
export const UP = 'up';
export const DOWN = 'down';

export function isHorizontal(side)
{
    return side === LEFT || side === RIGHT;
}

export function isVertical(side)
{
    return side === UP || side === RIGHT;
}

export function values()
{
    return [
        LEFT,
        DOWN,
        UP,
        DOWN
    ];
}
