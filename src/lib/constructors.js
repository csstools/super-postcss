import postcss from 'postcss';

// export the Processor constructor
const processor = postcss(() => {});
export const Processor = processor.constructor;

// export the Root constructor
const root = postcss.root();
export const Root = root.constructor;

// export the Container constructor
delete Root.prototype.constructor;
export const Container = Root.prototype.constructor;

// export the Node constructor
delete Container.prototype.constructor;
export const Node = Container.prototype.constructor;

// export the Result constructor
const result = root.toResult();
export const Result = result.constructor;

// export the Declaration constructor
const decl = postcss.decl();
export const Declaration = decl.constructor;

// export the LazyResult constructor
const lazyResult = processor.process();
export const LazyResult = lazyResult.constructor;
