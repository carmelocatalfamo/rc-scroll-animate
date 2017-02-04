## rc-scroll-animate
Simple react component for animating DOM elements on scroll with animate.css or custom classes.
___
#### Getting start
###### Install
```
$ npm install --save rc-scroll-animate
```
###### Usage
Link [Animate.css](https://github.com/daneden/animate.css) in your *index.html*

```jsx
import React, { Component } from 'react'
import ScrollAnimate from 'rc-scroll-animate'

export default class Example extends Component {
  render () {
    return (
      <div>
        <h1>Hello World!</h1>
        <ScrollAnimate animationClassName='fadeInUp' percentage={50} >
          <p>Some text.. some text..</p>
        </ScrollAnimate
      </div>
    )
  }
}
```
###### Options
|Props|Type|Description|
|---|---|---|
| percentage  |*number*, Default: 50 (min: 0, max: 100)| Percentage of element position in window size when start animation |
| animationClassName |  *string*, **Required**  | Name of the class that will be added when animation trigger |
| hidden | *boolean*, Default: true | Hide element if animation not fired |
| loop | *boolean*, Default: false | Animation loop on scrolling |

###### Customize
If you want to customize animation timing and some else or you do not want to use Animate.css , just insert in your css class **.animated**
and a class for animating DOM Element.
```css
.animated {
  -webkit-animation-duration: .5s;
  animation-duration: .5s;
  -webkit-animation-fill-mode: both;
  animation-fill-mode: both;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}

/* This will be animationClassName */
.fadeIn {
  -webkit-animation-name: fadeIn;
  animation-name: fadeIn;
}
```
