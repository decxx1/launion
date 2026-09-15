/** Sistema vigente para viajes hasta el 31/10/2026 inclusive. */
export const LEGACY_TICKET_URL =
	"https://abmws.com.ar/luweb-nuebus/sale/paso1.php";

/** Sistema vigente para viajes desde el 01/11/2026. */
export const NEW_TICKET_URL = "https://abmws.com.ar/luweb-sisorg";

/** Último día (calendario argentino) en que el sistema legado sigue activo. */
export const LEGACY_TICKET_CUTOFF = "2026-10-31";

const ARGENTINA_TZ = "America/Argentina/Buenos_Aires";

/** Fecha civil en Argentina como `YYYY-MM-DD`. */
export function argentinaCalendarDate(now = new Date()): string {
	return new Intl.DateTimeFormat("en-CA", {
		timeZone: ARGENTINA_TZ,
		year: "numeric",
		month: "2-digit",
		day: "2-digit",
	}).format(now);
}

/**
 * El modal de dos sistemas se muestra hasta el 31/10/2026 inclusive.
 * Desde el 01/11/2026 la compra va directo al sistema nuevo.
 */
export function isLegacyTicketSaleOpen(now = new Date()): boolean {
	return argentinaCalendarDate(now) <= LEGACY_TICKET_CUTOFF;
}

export function ticketSaleUrl(now = new Date()): string {
	return isLegacyTicketSaleOpen(now) ? LEGACY_TICKET_URL : NEW_TICKET_URL;
}
