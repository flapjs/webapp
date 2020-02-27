import { getDirectionalVector, getMidPoint } from '@flapjs/util/MathHelper.js';

const DEFAULT_OPTS = {
    placeholderLength: 10,
    forceLine: false,
    margin: {
        from: 10,
        to: 10,
    },
    quad: {
        radians: 0,
        length: 0,
        coords: { x: 0, y: 0 },
    },
};

const FOURTH_PI = Math.PI / 4;
const HALF_PI = Math.PI / 2;

export function getStartPoint(from, to = null, opts = DEFAULT_OPTS, dst = { x: 0, y: 0 })
{
    if (!from) throw new Error('Source of edge cannot be null.');
    if (!to)
    {
        //Make sure to use quad for placeholder direction
        const radians = opts.quad.radians;
        const px = Math.cos(radians);
        const py = Math.sin(radians);
        const margin = opts.margin.from;
        dst.x = from.x + px * margin;
        dst.y = from.y + py * margin;
        return dst;
    }

    // Get start point for straight edges (or forced lines)...
    if (opts.forceLine || !isQuadratic(from, to, opts))
    {
        getDirectionalVector(from.x, from.y, to.x, to.y, opts.margin.from, 0, dst);
        dst.x += from.x;
        dst.y += from.y;
        return dst;
    }
    // Get start point for quadratics...
    else
    {
        getMidPoint(from.x, from.y, to.x, to.y, dst);
        const qcoords = getQuadraticAsCoords(from, to, opts);
        const qx = dst.x + qcoords.x;
        const qy = dst.y + qcoords.y;
        getDirectionalVector(from.x, from.y, qx, qy, opts.margin.from, isSelfLoop(from, to, opts) ? FOURTH_PI : 0, dst);
        dst.x += from.x;
        dst.y += from.y;
        return dst;
    }
}

export function getCenterPoint(from, to = null, opts = DEFAULT_OPTS, dst = { x: 0, y: 0 })
{
    if (!from) throw new Error('Source of edge cannot be null.');
    if (!to) return getPlaceholderEndPoint(from, opts.placeholderLength / 2, opts, dst);

    getMidPoint(from.x, from.y, to.x, to.y, dst);

    if (opts.forceLine || !isQuadratic(from, to, opts))
    {
        dst.x = from.x + (to.x - from.x) / 2;
        dst.y = from.y + (to.y - from.y) / 2;
    }
    else
    {
        const qcoords = getQuadraticAsCoords(from, to, opts);
        dst.x += qcoords.x;
        dst.y += qcoords.y;
    }
    return dst;
}

export function getEndPoint(from, to = null, opts = DEFAULT_OPTS, dst = { x: 0, y: 0 })
{
    if (!from) throw new Error('Source of edge cannot be null.');
    if (!to) return getPlaceholderEndPoint(from, opts.placeholderLength, opts, dst);

    // Get end point for forced lines...
    if (opts.forceLine)
    {
        // NOTE: It does not compute direction vectors from start point because usually you "move"
        // edges by their end points, which should not have a "margin".
        return to;
    }
    // Get end point for straight edges...
    else if (!isQuadratic(from, to, opts))
    {
        getDirectionalVector(to.x, to.y, from.x, from.y, opts.margin.to, 0, dst);
        dst.x += to.x;
        dst.y += to.y;
        return dst;
    }
    // Get end point for quadratics...
    else
    {
        getMidPoint(from.x, from.y, to.x, to.y, dst);
        const qcoords = getQuadraticAsCoords(from, to, opts);
        const qx = dst.x + qcoords.x;
        const qy = dst.y + qcoords.y;
        getDirectionalVector(to.x, to.y, qx, qy, opts.margin.to, isSelfLoop(from, to, opts) ? -FOURTH_PI : 0, dst);
        dst.x += to.x;
        dst.y += to.y;
        return dst;
    }
}

export function getNormalDirection(from, to = null, opts = DEFAULT_OPTS)
{
    // Get normal direction for lines...
    if (opts.forceLine || !isQuadratic(from, to, opts))
    {
        let result = 0;

        if (isPlaceholder(from, to, opts))
        {
            result = Math.PI / 4;
        }
        else
        {
            const dy = to.y - from.y;
            const dx = to.x - from.x;
            result = Math.atan2(dy, dx);
        }

        if (result > HALF_PI || result < -HALF_PI)
        {
            result += Math.PI;
        }

        return result;
    }
    // Get normal direction for quadratics...
    else
    {
        const coords = getQuadraticAsCoords(from, to, opts);
        return Math.atan2(coords.y, coords.x) + HALF_PI;
    }
}

function getPlaceholderEndPoint(from, length, opts, dst = { x: 0, y: 0 })
{
    // Make sure to use opts.quad.coords for placeholder direction (not magnitude)
    const radians = opts.quad.radians;
    const px = Math.cos(radians);
    const py = Math.sin(radians);
    const placeholderLength = opts.margin.from + length;
    dst.x = from.x + px * placeholderLength;
    dst.y = from.y + py * placeholderLength;
    return dst;
}

function isQuadratic(from, to, opts)
{
    return !isPlaceholder(from, to, opts) && opts.quad && opts.quad.length !== 0;
}

function isPlaceholder(from, to, opts)
{
    return to === null;
}

function isSelfLoop(from, to, opts)
{
    return from === to;
}

function getQuadraticAsCoords(from, to, opts, dst = opts.quad.coords)
{
    if (from === null || to === null)
    {
        dst.x = 0;
        dst.y = 0;
    }
    else
    {
        getDirectionalVector(from.x, from.y, to.x, to.y, opts.quad.length, opts.quad.radians, dst);
    }
    return dst;
}

/**
 * Calculates and sets the quadratic vertex to pass through the position.
 * This will update the radians and length of the curve.
 *
 * @param {number} x The x coordinate.
 * @param {number} y The y coordinate.
 * @param {object} from The from point of the edge.
 * @param {number} from.x The from x coordinate.
 * @param {number} from.y The from y coordinate.
 * @param {object} to The to point of the edge.
 * @param {number} to.x The to x coordinate.
 * @param {number} to.y The to y coordinate.
 * @param {object} opts The edge options.
 * @param {object} [dst=opts.quad] The edge quad options to contain the new quad opts.
 * @returns {object} The modified dst object.
 */
function setQuadraticByCoords(x, y, from, to, opts, dst = opts.quad)
{
    if (!to)
    {
        /*
        Quad is re-used to determine edge angle for placeholder.
        This can be used specifically for quad since regular quad is
        dependent on edge to to NOT be null, which placeholder assumes
        to BE null. Also, quad.length is ignored, because the
        length should always be getPlaceholderLength(). This is
        resolved by getStartPoint(), getEndPoint(), etc.
        */
        const dx = from.x - x;
        const dy = from.y - y;
        const radians = -Math.atan2(dx, dy) - HALF_PI;
        dst.radians = radians;
        return dst;
    }

    const fromx = from.x;
    const fromy = from.y;
    const tox = to.x;
    const toy = to.y;

    let dx = tox - fromx;
    let dy = toy - fromy;
    const midpointx = fromx + dx / 2;
    const midpointy = fromy + dy / 2;

    // Remember: y-axis is flipped because canvas coord-space is -y => +y
    // Therefore, dy needs to be flipped
    const angleOffset = Math.atan2(-dy, dx);
    dx = x - midpointx;
    dy = y - midpointy;

    // 0 rad = to the right
    // Also: angleOffset is the offset from midpoint angle, the orthogonal base vector
    // This is because the from and to could be flipped, and
    // therefore give a negative, or at least a reversed angle.
    let radians = Math.atan2(dy, dx) + angleOffset;
    let length = Math.sqrt(dx * dx + dy * dy);
    if (length < 0) length = 0;

    // -PI / 2 is outward
    const outrad = radians - (-HALF_PI);
    // PI / 2 is inward
    const inrad = radians - (HALF_PI);

    // FIXME: Should be dependent on length, instead of a constant.
    const maxdr = Math.PI / 20;

    if (Math.abs(length) < 8)
    {
        radians = 0;
        length = 0;
    }
    else if (outrad < maxdr && outrad > -maxdr)
    {
        // -PI / 2 is outward
        radians = -HALF_PI;
    }
    else if (-inrad < maxdr && -inrad > -maxdr)
    {
        // PI / 2 is inward
        radians = HALF_PI;
    }

    dst.radians = radians;
    dst.length = length;
    return dst;
}

export function changeEndPoint(point, from, to, opts, dst = opts.quad)
{
    if (!point)
    {
        setQuadraticByCoords(to.x, to.y, from, to, opts, dst);
    }
    else if (point === from)
    {
        dst.length = opts.margin.from + opts.placeholderLength;
    }
    return point;
}

export function changeCenterPoint(point, from, to, opts, dst = opts.quad)
{
    setQuadraticByCoords(point.x, point.y, from, to, opts, dst);
}
