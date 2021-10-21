import React from 'react';
import { useSpring, animated } from '@react-spring/web'
import { useGesture } from '@use-gesture/react'

const SwipeContainer = ({children, callback}) => {
    const swipePxOffset = 150;
    const [{ x, y }, api] = useSpring(() => ({ x: 0, y: 0 }));
    const bind = useGesture({
            onDrag: ({ down, movement: [mx] }) => api.start({ x: down ? mx : 0, immediate: down }),
            onDragEnd: (state) => {
                const distance = state.movement[0];
                if (Math.abs(distance) > swipePxOffset){
                    callback(distance > 0 ? 1 : -1);
                }
            }
        }
    );
    return (
        <animated.div {...bind()} style={{ x, y, touchAction: 'none', position: 'absolute', top: 0, left: 0, right: 0, bottom: 0}} >
            {children}
        </animated.div>
    );
};

export default SwipeContainer;