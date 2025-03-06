import path from "path";

export default {
    test: {
        setupFiles: "./tests/setup.ts"
    },
    resolve: {
        alias: {
            $lib: path.resolve(__dirname, 'src/lib')
        }
    }
};