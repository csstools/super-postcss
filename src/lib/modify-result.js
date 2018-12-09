import { Result } from './constructors';
import refresh from './refresh';

// Result
Object.assign(
	Result.prototype,
	{
		refresh(node) {
			return refresh.call(this, node, this.processor.listeners || {});
		}
	}
);
