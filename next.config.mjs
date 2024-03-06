/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config, {isServer}) => {
        // this adds a rule to handle the canvas.node binary module
        config.module.rules.push({
            test: /\.node$/, use: 'raw-loader'
        })

        // exclude canvas form being processed by nextjs in the browser
        if(!isServer) config.externals.push('çanvas')
        return config
    }
};

export default nextConfig;
