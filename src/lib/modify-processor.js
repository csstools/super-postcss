import flatten from './flatten';
import { LazyResult, Processor } from './constructors';

// Processor
Object.assign(
	Processor.prototype,
	{
		use(...rawplugins) {
			const { plugins, listeners } = flatten(rawplugins).reduce(
				(object, plugin) => {
					if (Object(plugin) instanceof Function) {
						object.plugins.push(plugin);
					} else if (Object(plugin) === plugin) {
						const keys = Object.keys(plugin);

						keys.forEach(key => {
							if (Object(plugin[key]) instanceof Function) {
								const fn = plugin[key];

								if (object.listeners[key]) {
									object.listeners[key].push( fn );
								} else {
									object.listeners[key] = [ fn ];
								}
							}
						});
					}

					return object;
				},
				{ plugins: this.plugins || [], listeners: Object(this.listeners) }
			);

			this.listeners = listeners;
			this.plugins = plugins;

			return this;
		},
		process(css, opts = {}) {
			this.plugins.unshift(
				(root, result) => result.refresh(root)
			);

			return new LazyResult(this, css, opts);
		}
	}
);
