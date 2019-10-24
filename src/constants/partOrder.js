/**
 * parts order
 * 
 * we need a way to keep track of who is drawing what, next.
 * For now we just have a mapping from current part to next part.
 * This works well in firebase, we can just keep updating current and next at the end of turn.
 */
export const partOrder = {
    head: 'torso',
    torso: 'leftArm',
    leftArm: 'rightArm',
    rightArm: 'legs',
    legs: 'null'
}