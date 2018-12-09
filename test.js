const spostcss = require('.');

spostcss({
	CustomSpacingDeclaration(node, result) {
		node.prop = 'margin';
		return result.refresh(node);
	},
	pxNumber(node, result) {
		if (node.value === '0') {
			node.unit = '';

			return result.refresh(node);
		}
	}
}).use({
	declaration(node, result) {
		if (node.prop === 'spacing') {
			node.prop = '-custom-spacing';
			return result.refresh(node);
		}
	}
}).process('body { spacing: 0px; }', { from: '<stdin>' }).then(
	({ css: resultCSS }) => {
		const expectCSS = 'body { margin: 0; }';

		if (resultCSS === expectCSS) {
			console.log('Pass!');
			process.exit(0);
		} else {
			console.log(`Expected: ${expectCSS}`);
			console.log(`Received: ${resultCSS}`);
		}
	},
	error => {
		console.error(error);

		process.exit(1);
	}
);
