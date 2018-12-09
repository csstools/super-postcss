import parseSelector from 'postcss-selector-parser';

// Rename comment => selectorComment
parseSelector.selectorComment = parseSelector.comment;
delete parseSelector.comment;

// Rename string => selectorString
parseSelector.selectorString = parseSelector.string;
delete parseSelector.string;

// Rename root => selectorRoot
parseSelector.selectorRoot = parseSelector.root;
delete parseSelector.root;

// export the modified parseSelector
export default parseSelector;

// return a selector ast from a string
export function parseAsSelector(selector) {
	let selectorAST;

	parseSelector(selectors => {
		selectors.type = 'selectors';

		selectorAST = selectors;
	}).processSync(selector);

	return selectorAST;
}

// return a selector ast from a node
export function parseNodeAsSelector(node) {
	const selectorAST = parseAsSelector(node.selector);

	selectorAST.parent = node;

	return selectorAST;
}
