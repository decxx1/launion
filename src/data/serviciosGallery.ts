export interface ServicioGalleryImage {
	src: string;
	thumb: string;
	alt: string;
}

const galleryBase = "/images/galeria";

function galleryImage(folder: string, filename: string, alt: string): ServicioGalleryImage {
	return {
		src: `${galleryBase}/${folder}/${filename}`,
		thumb: `${galleryBase}/${folder}/thumb/${filename}`,
		alt,
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
		"Cama ejecutivo en piso superior",
	),
	galleryImage("larga-distancia", "cama-suite-piso-inferior.webp", "Cama suite en piso inferior"),
	galleryImage("larga-distancia", "servicio-a-bordo.webp", "Servicio a bordo en larga distancia"),
	galleryImage("larga-distancia", "unidad-0-km-frente.webp", "Unidad 0 km vista frontal"),
	galleryImage("larga-distancia", "unidad-0-km-lateral.webp", "Unidad 0 km vista lateral"),
];

export const serviciosGallerySections = [
	{ id: "urbano", title: "Urbano", images: urbanoImages },
	{ id: "media-distancia", title: "Media distancia", images: mediaDistanciaImages },
	{ id: "larga-distancia", title: "Larga distancia", images: largaDistanciaImages },
] as const;
