const config = {
	mode: 'jit',
	purge: ['./src/**/*.{html,js,svelte,ts}'],

	theme: {
		extend: {},
		container: {
			center: true,
		  },
	},

	plugins: [require('daisyui')]
};

module.exports = config;
