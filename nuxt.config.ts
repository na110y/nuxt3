export default ({
    devtools: {enabled: true},
    buildModules: ['@nuxt/typescript-build'],
    plugins: [
        // { src: '~/plugins/toast.js', ssr: false }
    ],
    css: [
        '@/assets/scss/_reset.scss',
        '@/assets/scss/_variables.scss',
        '@/assets/scss/main.scss'
    ],

});
