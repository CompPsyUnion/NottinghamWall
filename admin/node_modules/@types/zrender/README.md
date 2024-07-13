# Installation
> `npm install --save @types/zrender`

# Summary
This package contains type definitions for zrender (https://github.com/ecomfe/zrender).

# Details
Files were exported from https://github.com/DefinitelyTyped/DefinitelyTyped/tree/master/types/zrender.
## [index.d.ts](https://github.com/DefinitelyTyped/DefinitelyTyped/tree/master/types/zrender/index.d.ts)
````ts
// Type definitions for zrender 4.0
// Project: https://github.com/ecomfe/zrender
// Definitions by: Roman <https://github.com/iRON5>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped
// TypeScript Version: 2.3

declare namespace zrender {
    type X = number;
    type Y = number;
    type X2 = number;
    type Y2 = number;
    type GlobalCoords = boolean;
    type ColorStops = Array<{
        offset: number;
        color: string;
    }>;

    /**
     * x, y, x2, y2 are all percent from 0 to 1
     */
    interface LinearGradient {
        new (
            /** @default 0 */
            x?: X,

            /** @default 0 */
            y?: Y,

            /** @default 1 */
            x2?: X2,

            /** @default 0 */
            y2?: Y2,

            /** @default [] */
            colorStops?: ColorStops,

            /** @default false */
            globalCoord?: GlobalCoords,
        ): {
            type: 'linear';
            x: X;
            y: Y;
            x2: X2;
            y2: Y2;
            colorStops: ColorStops;
            global: GlobalCoords;

            addColorStop(offset: number, color: string): void;
        };
    }
}

declare module 'zrender' {
    export = zrender;
}

````

### Additional Details
 * Last updated: Sun, 22 Aug 2021 05:01:23 GMT
 * Dependencies: none
 * Global values: none

# Credits
These definitions were written by [Roman](https://github.com/iRON5).
