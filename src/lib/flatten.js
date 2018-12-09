export default function flatten(array) {
	return array.reduce(
		(flatarray, item) => flatarray.concat(item || []),
		[]
	);
}
