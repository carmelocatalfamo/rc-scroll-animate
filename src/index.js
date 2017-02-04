import React, { Component, PropTypes } from 'react'

/**
 * FadeInUp Component
 *
 * this.state = {
 *  actualPercentage: {number}, // Percentage of actual scrolling
 *  animated: {boolean}, // Determinate if animation has been done at least one time
 *  percentage: {number}, // Percentage start animate. Default: 50
 *  animationClassName: {string}, // ClassName for animation. Animate.css
 *  hidden: {boolean}, // Element hidden at the start. Default: true
 *  loop: {boolean} // Animation loop. Default: false
 * }
 */

let _id = 'parallax' + new Date().getTime()
let _elemOffset = 0

class ScrollAnimate extends Component {
  constructor (props) {
    super(props)
    this.state = {
      actualPercentage: 0,
      animated: false,
      percentage: props.percentage || 50,
      animationClassName: props.animationClassName || '',
      hidden: typeof props.hidden === 'boolean' ? props.hidden : true,
      loop: props.loop || false
    }
  }

  componentDidMount () {
    _elemOffset = this.refs[_id].offsetTop - window.innerHeight

    window.addEventListener('scroll', () => {
      let actualPercentage
      let pageScrollTop = document.body.scrollTop
      let windowHeight = window.innerHeight

      pageScrollTop >= _elemOffset && (pageScrollTop - _elemOffset) <= windowHeight
        ? actualPercentage = parseInt((pageScrollTop - _elemOffset) * 100 / windowHeight)
        : pageScrollTop < _elemOffset
          ? actualPercentage = 0
          : (pageScrollTop - _elemOffset) > windowHeight
            ? actualPercentage = 100
            : null

      this.setState({ actualPercentage })
    })
  }

  componentWillUpdate (nextProps, nextState) {
    let { loop, actualPercentage, percentage, animated } = nextState

    if (loop) {
      percentage < actualPercentage
        ? animated
          ? null
          : this.setState({ animated: true })
        : !animated
          ? null
          : this.setState({ animated: false })
    } else {
      percentage < actualPercentage
        ? animated
          ? null
          : this.setState({ animated: true })
        : null
    }
  }

  componentWillUnmount () {
    window.removeEventListener('resize')
  }

  render () {
    let { animated, hidden, animationClassName } = this.state
    let { className } = this.props
    let classNameString =
      (className || '') +
      ' animated ' +
      (animated ? animationClassName : '')

    return (
      <div ref={_id} className={classNameString} style={hidden ? {opacity: '0'} : {}}>
        {this.props.children}
      </div>
    )
  }
}

ScrollAnimate.propTypes = {
  percentage: PropTypes.number,
  animationClassName: PropTypes.string.isRequired,
  hidden: PropTypes.bool,
  loop: PropTypes.bool
}

export default ScrollAnimate
