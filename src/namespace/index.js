import Fiber from 'fiber';

const NameSpace = {
    System : Fiber.namespace('data/system'),
    Todo   : Fiber.namespace('data/todo'),
};

export default NameSpace;
