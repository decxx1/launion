const BASE_URL = import.meta.env.BASE_URL;

/** Prefija rutas internas con el `base` de Astro (p. ej. `/temporal/`). */
export function withBase(path: string): string {
	if (/^(https?:|mailto:|tel:)/.test(path)) return path;

	const base = BASE_URL;
	const joined = `${base}${path.replace(/^\//, "")}`;
	return joined.replace(/([^:]\/)\/+/g, "$1");
}

/** Quita el `base` del pathname para comparar rutas activas. */
export function withoutBase(pathname: string): string {
	const base = BASE_URL.replace(/\/$/, "");

	if (base && (pathname === base || pathname === `${base}/`)) {
		return "/";
	}

	if (base && pathname.startsWith(`${base}/`)) {
		return pathname.slice(base.length).replace(/\/$/, "") || "/";
	}

	return pathname.replace(/\/$/, "") || "/";
}
