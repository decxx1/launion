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
					"Tel: 02625 – 480041",
					"WhatsApp: +54 9 2625 445079",
					"Lunes a viernes de 8 a 12 h y de 16.30 a 20 h. Sábados de 8 a 12 h",
				],
			},
			{
				title: "Terminal Bowen (Pasajes y encomiendas)",
				details: [
					"Sarmiento S/N, Bowen, Gral. Alvear.",
					"Tel: 02625 15404625",
				],
			},
			{
				title: "Terminal General Alvear (Pasajes y encomiendas)",
				details: [
					"Chaperouge 94, Gral. Alvear.",
					"Tel: +54 9 02625 424550",
					"WhatsApp: +54 9 2625 64 4251",
					"Lunes a sábados de 7 a 22 h. Domingos de 14 a 15 h y de 19 a 20 h",
				],
			},
			{
				title: "Monte Comán (Pasajes y encomiendas)",
				details: [
					"Montevideo 87, San Rafael.",
					"Tel: 0260 4490146 / 4490148",
				],
			},
			{
				title: "Real del Padre (Pasajes y encomiendas)",
				details: [
					"Río Negro y Chaco, San Rafael.",
					"Tel: 02625 401741",
				],
			},
			{
				title: "Terminal San Rafael (Pasajes y encomiendas)",
				details: [
					"Granaderos y Gral. Paz, San Rafael.",
					"Tel: 0260 4433233",
					"WhatsApp: +54 9 2604 12 2086",
					"Lunes a viernes de 8:30 a 13 h y de 16 a 20.30 h",
					"Sábados de 8:30 a 13 h y de 16.30 a 19.30 h",
					"Domingos de 16 a 18.15 h",
				],
			},
			{
				title: "Terminal Mendoza (Pasajes y encomiendas)",
				details: [
					"Local 21, Alberdi 435, San José, Ala Este.",
					"Tel: +54 9 2613 35 4036",
					"Lunes a sábados de 7 a 20 h. Domingos de 17 a 20 h",
				],
			},
			{
				title: "Punta del Agua (Pasajes y encomiendas)",
				details: [
					"Av. 25 de Mayo s/n, San Rafael",
					"Tel: 02625 15528272",
				],
			},
		],
	},
	{
		name: "San Luis",
		locations: [
			{
				title: "San Luis (Pasajes)",
				details: ["Tel y WhatsApp: +54 9 2665 000688"],
			},
			{
				title: "San Luis (Encomiendas)",
				details: [
					"Local 25 subsuelo",
					"Horario de atención de 9 a 19 h. Sábados de 9 a 13 h",
				],
			},
			{
				title: "Villa Mercedes (Pasajes)",
				details: ["Tel y WhatsApp: +54 2657 306116"],
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
					"Tel: 011 4644 3633",
				],
			},
			{
				title: "Terminal Retiro (Pasajes)",
				details: [
					"Boleterias de Retiro, lado impar: Nº 47/49/51",
					"Horarios de 8 a 21 h",
					"Tel y WhatsApp: +54 9 11 5507 3550",
					"-Boletería 76.",
					"Tel: +54 9 11 5527 6488",
				],
			},
			{
				title: "Boletería Sarmiento (Encomiendas)",
				details: [
					"Sarmiento 1947, C.A.B.A.",
					"Tel: 011 – 49541839",
					"WhatsApp: 11-4954-1839",
					"Lunes a viernes de 9 a 20.30 h",
				],
			},
			{
				title: "Terminal Retiro (Encomiendas)",
				details: [
					"Depósito N° 6, C.A.B.A.",
					"Tel:  011 4313 3270",
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
					"Tel: 02302 647795",
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
