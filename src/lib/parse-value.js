import parseValue from 'postcss-values-parser';

// Rename comment => valueComment
parseValue.valueComment = parseValue.comment;
delete parseValue.comment;

// Rename func => function
parseValue.function = parseValue.func;
delete parseValue.func;

// Rename string => valueString
parseValue.valueString = parseValue.string;
delete parseValue.string;

// export the modified parseValue
export default parseValue;

// return a value ast from a string
export function parseAsValue(value) {
	return parseValue(value).parse().first;
}

// return a value ast from a node
export function parseNodeAsValue(node) {
	const valueAST = parseAsValue(node.value);

	valueAST.parent = node;

	return valueAST;
}
