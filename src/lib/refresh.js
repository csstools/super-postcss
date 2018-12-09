import { parseNodeAsSelector } from './parse-selector';
import { parseNodeAsValue } from './parse-value';

// Export refresh
export default async function refresh(node, on) {
	const type = getTypeFromNode(node);
	const beforeType = type && 'before' + getCapitalType(type);
	const specialType = type && getSpecialTypeFromNode(node);

	if (type && on[beforeType]) {
		await runAll(on[beforeType], node, this);
	}

	if (specialType) {
		const specialBeforeType = 'before' + getCapitalType(specialType);

		if (on[specialBeforeType]) {
			await runAll(on[specialBeforeType], node, this);
		}
	}

	if (node.type === 'rule') {
		const originalSelectors = node.selector;
		const selectors = parseNodeAsSelector(node);

		await refresh.call(this, selectors, on);

		const modifiedSelectors = String(selectors);

		if (originalSelectors !== modifiedSelectors) {
			node.selector = modifiedSelectors;
		}
	} else if (node.type === 'decl') {
		const originalValue = node.value;

		const values = parseNodeAsValue(node);

		await refresh.call(this, values, on);

		const modifiedValue = String(values);

		if (originalValue !== modifiedValue) {
			node.value = modifiedValue;
		}
	}

	if (hasChildNodes(node)) {
		for (const childNode of node.nodes) {
			await refresh.call(this, childNode, on);
		}
	}

	if (specialType && on[specialType]) {
		await runAll(on[specialType], node, this);
	}

	if (type && on[type]) {
		await runAll(on[type], node, this);
	}
}

function runAll(fns, node, result) {
	let promise = Promise.resolve();

	for (const fn of fns) {
		promise = promise.then(() => fn(node, result));
	}

	return promise;
}

function hasChildNodes(node) {
	return Object(node.nodes).length;
}

function getTypeFromNode(node) {
	return {
		atrule: 'rule',
		decl: 'declaration',
		func: 'function'
	}[node.type] || (
		node.type === 'root'
			? null
		: String(node.type).replace(/^./, $0 => $0.toLowerCase())
	);
}

function getKebabCaseAsCamelCase(value) {
	return String(value).replace(/-+(.?)/g, ($0, $1) => $1.toUpperCase());
}

function getCapitalType(type) {
	return String(type).replace(/^(.)(.*)$/, ($0, firstCharacter, nextCharacters) => firstCharacter.toUpperCase() + nextCharacters);
}

function getSpecialTypeFromNode(node) {
	return node.type === 'atrule'
		? getKebabCaseAsCamelCase(node.name) + 'Rule'
	: node.type === 'decl'
		? getKebabCaseAsCamelCase(node.prop) + 'Declaration'
	: node.type === 'func'
		? getKebabCaseAsCamelCase(node.value) + 'Function'
	: node.type === 'number'
		? getKebabCaseAsCamelCase(node.unit).replace(/^%$/, 'percent') + 'Number'
	: null;
}
