import rawpostcss from 'postcss';
import { Processor } from './lib/constructors';
import parseSelector, { parseAsSelector } from './lib/parse-selector';
import parseValue, { parseAsValue } from './lib/parse-value';
import flatten from './lib/flatten';
import './lib/modify-processor';
import './lib/modify-result';

// Rename decl => declaration
rawpostcss.declaration = rawpostcss.decl;
delete rawpostcss.decl;

// Export postcss
export default Object.assign(
	function postcss(...plugins) {
		const processor = new Processor();

		processor.use(flatten(plugins));

		return processor;
	},
	rawpostcss,
	parseSelector,
	parseValue,
	{
		parseAsValue,
		parseAsSelector
	}
);
