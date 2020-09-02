export function createMixinClass(mixinClassInstance, mixinConstructor)
{
    return {
        /**
         * Creates an eventable object.
         * 
         * @param {...any} [args] Any additional arguments passed to the constructor.
         * @returns {object} The created eventable object.
         */
        create(...args)
        {
            const result = Object.create(mixinClassInstance);
            if (mixinConstructor) mixinConstructor.apply(result, args);
            return result;
        },
        /**
         * Assigns the passed-in object with eventable properties.
         * 
         * @param {object} dst The object to assign with eventable properties.
         * @param {...any} [args] Any additional arguments passed to the constructor.
         * @returns {object} The resultant eventable object.
         */
        assign(dst, ...args)
        {
            const result = Object.assign(dst, mixinClassInstance);
            if (mixinConstructor) mixinConstructor.apply(result, args);
            return result;
        },
        /**
         * Mixins eventable properties into the passed-in class.
         * 
         * @param {Function} targetClass The class to mixin eventable properties.
         * @param {...any} [args] Any additional arguments passed to the constructor.
         * @returns {Function} The resultant eventable-mixed-in class.
         */
        mixin(targetClass, ...args)
        {
            const targetPrototype = targetClass.prototype;
            Object.assign(targetPrototype, mixinClassInstance);
            if (mixinConstructor) mixinConstructor.apply(targetPrototype, args);
            return targetPrototype;
        }
    };
}
