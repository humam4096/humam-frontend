// default open-next.config.ts file created by @opennextjs/cloudflare
import { defineCloudflareConfig } from "@opennextjs/cloudflare";
// import r2IncrementalCache from "@opennextjs/cloudflare/overrides/incremental-cache/r2-incremental-cache";

export default defineCloudflareConfig({
	// Enable R2 caching to reduce memory pressure and improve performance
	// See https://opennext.js.org/cloudflare/caching for more details
	// Note: R2 cache is temporarily disabled due to upload timeout issues
	// incrementalCache: r2IncrementalCache
});
