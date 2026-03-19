// Cloudflare Pages SPA routing worker
export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // Let static assets pass through
    if (url.pathname.match(/\.(js|css|png|jpg|jpeg|webp|ico|svg|mp4|woff2|json|txt|xml)$/)) {
      return env.ASSETS.fetch(request);
    }

    // Serve index.html for all other routes (SPA)
    const indexUrl = new URL('/', url);
    return env.ASSETS.fetch(new Request(indexUrl, request));
  }
};
