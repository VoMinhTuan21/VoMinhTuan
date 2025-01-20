let sum_to_n_a = (n: number) => {
	let total = 0;

	for (let index = 1; index <= n; index++) {
		total += index;
	}

	return total;
};

let sum_to_n_b = (n: number) => {
	if (n === 0) {
		return 0;
	}

	return n + sum_to_n_b(n - 1);
};

let sum_to_n_c = (n: number) => {
	return (n * (n + 1)) / 2;
};
