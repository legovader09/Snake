const dir = { w: 'up', a: 'left', s: 'down', d: 'right', ' ': 'pause', r: 'restart' };
const getDirection = (input) => dir[input];

export default getDirection;