# ReactLazy

seems to realize a promise?

```js
const OtherComponent = React.lazy(() => import("./OtherComponent"))
```

the Promise should resolve a component with default export

```js
import React, { Suspense } from "react"

const OtherComponent = React.lazy(() => import("./OtherComponent"))

function MyComponent() {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <OtherComponent />
      </Suspense>
    </div>
  )
}
```

use Suspense <---> React.Lazy
