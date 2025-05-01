export const indexCheck = (num: number) => {
	if (num <= 1) return false;
	if (num <= 3) return true;

	// Check if divisible by 2 or 3 to skip later checks
	if (num % 2 === 0 || num % 3 === 0) return false;

	// Check divisors up to sqrt(num)
	for (let i = 5; i * i <= num; i += 6) {
		if (num % i === 0 || num % (i + 2) === 0) {
			return false;
		}
	}

	return true;
};
