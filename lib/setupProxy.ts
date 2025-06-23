if (typeof window === 'undefined' && process.env.HTTPS_PROXY) {
  if (!process.env.GLOBAL_AGENT_HTTP_PROXY) {
    process.env.GLOBAL_AGENT_HTTP_PROXY = process.env.HTTPS_PROXY;
  }
  try {
    require('global-agent/bootstrap');
  } catch (err) {
    console.warn('global-agent not available, skipping proxy setup');
  }
}
