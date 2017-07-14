export default [
  { path: '/intro/getting-started', redirect: '/docs/getting-started' },
  { path: '/intro/tmsp-overview', redirect: '/intro/abci-overview' },
  { path: '/intro/tendermint-vs', redirect: '/intro/tendermint-vs-x' },
  { path: '/intro/first-tmsp',
    redirect: '/docs/getting-started/first-app' },
  { path: '/docs/getting-started/first-abci',
    redirect: '/docs/getting-started/first-app' },
  { path: '/docs/getting-started/first-abci-app',
    redirect: '/docs/getting-started/first-app' },
  { path: '/docs/getting-started/install', redirect: '/download' },
  { path: '/docs/getting-started/download', redirect: '/download' },
  { path: '/intro/download-tendermint', redirect: '/download' },
  { path: '/docs/getting-started/download-tendermint', redirect: '/download' },
  { path: '/docs/specs/consensus',
    redirect: '/docs/specs/byzantine-consensus-algorithm' },
  { path: '/blog/tendermint-socket-protocol',
    redirect: '/blog/abci-the-application-blockchain-interface' },
  { path: '/docs/guides/install', redirect: '/docs/guides/install-from-source' },
  { path: '/code', redirect: '/docs' },
  { path: '/guide', redirect: '/docs' },
  { path: '/jobs', redirect: '/careers' },
  { path: '/jobs/:entry', redirect: '/careers/:entry' },
  { path: '/media', redirect: '/presentations' },
  { path: '/media/:entry', redirect: '/presentations/:entry' },
  { path: '/posts', redirect: '/blog' },
  { path: '/posts/:entry', redirect: '/blog/:entry' },
  { path: '/guides/contributing', redirect: '/docs/guides/contributing' }
]
