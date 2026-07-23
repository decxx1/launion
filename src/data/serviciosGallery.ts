export interface ServicioGalleryImage {
	src: string;
	thumb: string;
	alt: string;
	seatIcon?: string;
	seatType?: string;
	seatLabel?: string;
}

const galleryBase = "/images/galeria";
const iconsBase = "/images/icons";

function galleryImage(
	folder: string,
	filename: string,
	alt: string,
	options?: Pick<ServicioGalleryImage, "seatIcon" | "seatType" | "seatLabel">,
): ServicioGalleryImage {
	return {
		src: `${galleryBase}/${folder}/${filename}`,
		thumb: `${galleryBase}/${folder}/thumb/${filename}`,
		alt,
		...options,
	};
}

export const urbanoImages: ServicioGalleryImage[] = [
	galleryImage("urbano", "dsc0396.webp", "Micro para recorridos urbanos"),
	galleryImage("urbano", "dsc0390-b.webp", "Interior de micro urbano"),
	galleryImage("urbano", "dsc06798.webp", "Unidad de servicio urbano LA UNION"),
];

export const mediaDistanciaImages: ServicioGalleryImage[] = [
	galleryImage("media-distancia", "dsc06809.webp", "Unidad de media distancia"),
	galleryImage("media-distancia", "dsc0428.webp", "Interior semicama de media distancia"),
	galleryImage("media-distancia", "dsc0448.webp", "Servicio a bordo en media distancia"),
];

export const largaDistanciaImages: ServicioGalleryImage[] = [
	galleryImage(
		"larga-distancia",
		"cama-ejecutivo-piso-superior.webp",
		"Cama ejecutivo en piso superior, asiento 160°",
		{ seatIcon: `${iconsBase}/asiento-160.svg`, seatType: "Cama ejecutivo", seatLabel: "160°" },
	),
	galleryImage(
		"larga-distancia",
		"cama-suite-piso-inferior.webp",
		"Cama suite en piso inferior, asiento 180°",
		{ seatIcon: `${iconsBase}/asiento-180.svg`, seatType: "Cama suite", seatLabel: "180°" },
	),
	galleryImage("larga-distancia", "servicio-a-bordo.webp", "Servicio a bordo en larga distancia"),
	galleryImage("larga-distancia", "unidad-0-km-frente.webp", "Unidad 0 km vista frontal"),
	galleryImage("larga-distancia", "unidad-0-km-lateral.webp", "Unidad 0 km vista lateral"),
];

export const serviciosGallerySections = [
	{ id: "urbano", title: "Urbano", images: urbanoImages },
	{ id: "media-distancia", title: "Media distancia", images: mediaDistanciaImages },
	{ id: "larga-distancia", title: "Larga distancia", images: largaDistanciaImages },
] as const;
