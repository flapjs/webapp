# How To Add Icons

## Prerequisite
1. Our icons are all in SVG (stands for Scalable Vector Graphics). We mostly get our icons from [here](https://material.io/resources/icons). If you got your icons elsewhere, please make sure it is open source (if it does not have a license, it is NOT open source) and please document somewhere the url link to the icon's source.
2. The icon must be in a `.svg` file. You can look at the other icon files in `src/assets/icons/` for references on how they are structured. The only important thing to note here is the `fill="currentColor"` attribute. This allows us to change the color of the icon later, so it is important to put this on _solid_ parts of the icon.

## Doing it
1. Put the icon file (the svg file) into the assets folder for icons `src/assets/icons/`. Make sure it's named something unique.
2. Add an export statement in `src/components/icons/Icons.js` that exports your new icon by file name. For example:

```javascript
// ... other code ...
export { default as CoolBeansIcon } from '@flapjs/assets/icons/cool-beans.svg';
```

> ASIDE: So JavaScript by itself does not actually know how to read SVG files. Why we can do it here is because we have configured Webpack, our bundler, to use an SVG loader when importing any files with the extension `.svg`. Neat huh? This is also why we are able to write JSX as well (it's not because of React magic).

3. That's it! You should be able to import your icon as usual now from the `Icons.js` registry and use it. For example:

```javascript
import { CoolBeansIcon } from '@flapjs/src/components/icons/Icons.js';

// ...other code...
export function SomeComponent(props)
{
    return (
        <div>
            <p>That's one cool bean.</p>
            <CoolBeansIcon/>
        <div>
    );
}
```

---

Happy coding!
