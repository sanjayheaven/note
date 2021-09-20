# ReactChildren

Offers four funcitons: map forEach count isValid

## excape

Escape and wrap key so it is safe to use as a reactid

```js
function escape(key: string): string {
  const escapeRegex = /[=:]/g // match either = or :
  const escaperLookup = {
    "=": "=0",
    ":": "=2",
  }
  const escapedString = key.replace(escapeRegex, function (match) {
    return escaperLookup[match]
  })
  /**
   * replace = with  =0
   * replace : with  =2
   */
  return "$" + escapedString
}
```

```js
function getElementKey(element: any, index: number): string {
  // Do some typechecking here since we call this blindly. We want to ensure
  // that we don't block potential future ES APIs.
  if (typeof element === "object" && element !== null && element.key != null) {
    // Explicit key
    return escape("" + element.key)
  }
  // Implicit key determined by the index in the set
  return index.toString(36)
}
```

## mapIntoArray

<!-- still need to review -->

a funciton with arguments:
(Children:ReactNodeList,array:Array<React$Node>,escapedPrefix,nameSoFar,
callback: (?React$Node) => ?ReactNodeList,)

map React$Node to ReactNodeList

- verify if can invokeCallback
-

## mapChildren

## countChildren

Count the number of children that are typically specified

## forEachChildren

## toArray

Flatten a children object (typically specified as `props.children`) and
return an array with appropriately re-keyed children

## REACT_PORTAL_TYPE
