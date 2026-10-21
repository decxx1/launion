export interface Location {
	title: string;
	details: string[];
}

export interface Province {
	name: string;
	locations: Location[];
}

export const provinces: Province[] = [
	{
		name: "Mendoza",
		locations: [
			{
				title: "Casa Central – Bowen (Pasajes y encomiendas)",
				details: [
					"Centenario 150, Bowen, Gral. Alvear.",
					"Tel: +54 9 2625 480041",
					"WhatsApp: +54 9 2625 445079",
					"Lunes a viernes de 8:00 a 12:00 h y de 16:30 a 20:00 h",
					"Sábados de 8:00 a 12:00 h",
				],
			},
			{
				title: "Terminal General Alvear (Pasajes y encomiendas)",
				details: [
					"Chaperouge 94, Gral. Alvear.",
					"Tel: +54 9 2625 424550",
					"WhatsApp: +54 9 2625 644251",
					"Lunes a sábados de 7:00 a 22:00 h",
					"Domingos de 14:00 a 15:00 h y de 19:00 a 20:00 h",
				],
			},
			{
				title: "Monte Comán (Pasajes y encomiendas)",
				details: [
					"Montevideo 87, San Rafael.",
					"WhatsApp: +54 9 260 4274414",
					"Tel: +54 9 260 4626170",
				],
			},
			{
				title: "Real del Padre (Pasajes y encomiendas)",
				details: [
					"Río Negro y Chaco, San Rafael.",
					"Tel: +54 9 2625 401741",
				],
			},
			{
				title: "Terminal San Rafael (Pasajes y encomiendas)",
				details: [
					"Granaderos y Gral. Paz, San Rafael.",
					"Tel: +54 9 260 4433233",
					"WhatsApp: +54 9 2604 122086",
					"Lunes a viernes de 8:30 a 13:00 h y de 16:00 a 20:30 h",
					"Sábados de 8:30 a 13:00 h y de 16:30 a 19:30 h",
					"Domingos de 16:00 a 18:15 h",
				],
			},
			{
				title: "Punta del Agua (Pasajes y encomiendas)",
				details: [
					"Av. 25 de Mayo s/n, San Rafael.",
					"Tel: +54 9 2625 528272",
				],
			},
			{
				title: "Terminal Mendoza (Pasajes y encomiendas)",
				details: [
					"Local 21, Alberdi 435, San José, Ala Este.",
					"Tel: +54 9 2613 354036",
					"Lunes a sábados de 7:00 a 20:00 h",
					"Domingos de 17:00 a 20:00 h",
				],
			},
		],
	},
	{
		name: "San Luis",
		locations: [
			{
				title: "San Luis (Pasajes)",
				details: [
					"Terminal de Ómnibus EDIRO, Primer Piso, Ala Sur, Local 18.",
					"Tel y WhatsApp (8:00 a 21:00 h): +54 9 2665 275071",
					"Horario de atención: lunes a sábados de 9:00 a 13:00 h y de 17:00 a 21:00 h",
					"Domingos y feriados de 17:00 a 21:00 h",
				],
			},
			{
				title: "San Luis (Encomiendas)",
				details: [
					"Local 25 subsuelo",
					"Horario de atención de 9:00 a 19:00 hs",
					"Sábados de 9:00 a 13:00 hs",
				],
			},
			{
				title: "Villa Mercedes (Pasajes)",
				details: [
					"Terminal Villa Mercedes, Local 6.",
					"Horario de atención: todos los días de 5:30 a 21:30 h",
					"Teléfono y WhatsApp: +54 9 2657 306116",
				],
			},
		],
	},
	{
		name: "Buenos Aires",
		locations: [
			{
				title: "Terminal de Liniers (Pasajes)",
				details: [
					"Local N° 23 – Rosaltur, Buenos Aires.",
					"Tel: +54 9 11 46443633",
				],
			},
			{
				title: "Terminal Retiro (Pasajes)",
				details: [
					"Boleterias de Retiro, lado impar: Nº 47/49/51",
					"Horarios de 8:00 a 21:00 hs",
					"Tel y WhatsApp: +54 9 11 5507 3550",
					"-Boletería 76.",
					"Tel: +54 011 7234 4375",
				],
			},
			{
				title: "Boletería Sarmiento (Pasajes)",
				details: [
					"Sarmiento 1947, C.A.B.A.",
					"Tel: +54 9 11 49541839",
					"WhatsApp: +54 9 11 49541839",
					"Lunes a sábados de 9:00 a 20:30 h",
					"Domingos de 18:00 a 20:30 h",
				],
			},
			{
				title: "Boletería Sarmiento (Encomiendas)",
				details: [
					"Sarmiento 1947, C.A.B.A.",
					"Tel: +54 9 11 49541839",
					"WhatsApp: +54 9 11 49541839",
					"Lunes a viernes de 9:00 a 20:30 h",
				],
			},
			{
				title: "Terminal Retiro (Encomiendas)",
				details: [
					"Depósito N° 6, C.A.B.A.",
					"Tel: +54 9 11 43133270",
				],
			},
		],
	},
	{
		name: "La Pampa",
		locations: [
			{
				title: "Terminal Realicó (Pasajes y encomiendas)",
				details: [
					"Av. Mullally y Constitución, Realicó.",
					"Tel: +54 9 2302 647795",
				],
			},
		],
	},
];

export function isEncomiendasLocation(title: string): boolean {
	return /\(pasajes y encomiendas\)|\(encomiendas\)/i.test(title);
}

export function isExclusiveEncomiendasLocation(title: string): boolean {
	return /\(encomiendas\)/i.test(title) && !/\(pasajes y encomiendas\)/i.test(title);
}

export function getEncomiendasProvinces(): Province[] {
	return provinces
		.map((province) => ({
			...province,
			locations: province.locations.filter((location) =>
				isEncomiendasLocation(location.title),
			),
		}))
		.filter((province) => province.locations.length > 0);
}

export function getPuntosDeVentaProvinces(): Province[] {
	return provinces
		.map((province) => ({
			...province,
			locations: province.locations.filter(
				(location) => !isExclusiveEncomiendasLocation(location.title),
			),
		}))
		.filter((province) => province.locations.length > 0);
}

export function getLocationDisplayTitle(title: string): string {
	return title
		.replace(/\s*\((Pasajes y encomiendas|Encomiendas|Pasajes)\)\s*$/i, "")
		.trim();
}
