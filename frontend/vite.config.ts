import { defineConfig, loadEnv } from 'vite';
import path from 'path';

export default defineConfig(({ mode }) => {
	// Load env file based on `mode` in the current working directory.
	const env = loadEnv(mode, process.cwd());
	return {
		// vite config
		define: {
			__APP_ENV__: JSON.stringify(env.APP_ENV)
		},
		resolve: {
			alias: {
				'/@': path.resolve(__dirname, './src/')
			}
		}
	};
});
