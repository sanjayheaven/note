# ReactDOMLegacy

## render

**ReactDOM.render is no longer supported in React 18.**
(element: React$Element<any>,
container: Container,
callback: ?Function,){}

Container should be a DOM element

## hydrate

## legacyRenderSubtreeIntoContainer

(parentComponent: ?React$Component<any, any>,
children: ReactNodeList,
container: Container,
forceHydrate: boolean, // here is diff between render & hydrate
callback: ?Function,){}

root = container.\_reactRootContainer

!root => mount
root => update

## whats the difference between render & createRoot? why createRoot?

## what is legacy?

legacy: ReactDOM.render(<App />, rootNode)
blacking: ReactDOM.createBlockingRoot(rootNode).render(<App />)
concurrent : ReactDOM.createRoot(rootNode).render(<App />)
