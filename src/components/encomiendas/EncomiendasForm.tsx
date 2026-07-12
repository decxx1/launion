import { useState, useRef } from "react";
import { Toaster, toast } from "sonner";
import { SECRET_KEY, SITE_KEY, ENDPOINT, EMAIL } from "astro:env/client";

declare global {
	interface Window {
		grecaptcha: {
			ready: (callback: () => void) => void;
			execute: (
				siteKey: string,
				options: { action: string },
			) => Promise<string>;
		};
	}
}

interface FormFields {
	name: string;
	phone: string;
	email: string;
	message: string;
	secret_key: string;
	addressee: string;
	asunto: string;
	token?: string;
}

interface Props {
	puntos: string[];
}

const inputClass =
	"w-full rounded-xl border-0 bg-white px-4 py-3 text-sm text-gray-900 outline-none ring-0 placeholder:text-gray-400 focus:ring-2 focus:ring-white/60 sm:text-base";
const labelClass =
	"mb-1.5 block text-xs font-semibold uppercase tracking-wide text-white sm:text-sm";
const selectClass = `${inputClass} encomiendas-select appearance-none pr-10`;

export default function EncomiendasForm({ puntos }: Props) {
	const [isSending, setIsSending] = useState(false);
	const formRef = useRef<HTMLFormElement>(null);

	const resetForm = () => {
		formRef.current?.reset();
	};

	const handleSubmit = (event: React.SyntheticEvent<HTMLFormElement>) => {
		event.preventDefault();
		const formData = new FormData(event.currentTarget);
		const name = formData.get("name") as string;
		const puntoEntrega = formData.get("punto_entrega") as string;
		const puntoRetiro = formData.get("punto_retiro") as string;
		const userMessage = formData.get("message") as string;

		const fields: FormFields = {
			name,
			phone: formData.get("phone") as string,
			email: formData.get("email") as string,
			message: `${userMessage}\n\nPunto de entrega: ${puntoEntrega}\nPunto de retiro: ${puntoRetiro}`,
			secret_key: SECRET_KEY ?? "",
			addressee: EMAIL ?? "",
			asunto: `Consulta de encomiendas - de: ${name}`,
		};

		if (!isSending) {
			setIsSending(true);
			window.grecaptcha.ready(function () {
				window.grecaptcha
					.execute(SITE_KEY ?? "", { action: "encomiendas" })
					.then(function (getToken: string) {
						fields.token = getToken;
						sendForm(fields);
					})
					.catch(() => {
						toast.error("No se pudo validar reCAPTCHA. Intentá de nuevo.");
						setIsSending(false);
					});
			});
		}
	};

	const sendForm = (fields: FormFields) => {
		fetch(ENDPOINT ?? "", {
			method: "POST",
			body: JSON.stringify(fields),
			headers: {
				"Content-Type": "application/json",
			},
		})
			.then((response) => {
				if (!response.ok) {
					return response.json().then((err) => {
						throw err;
					});
				}
				return response.json();
			})
			.then(() => {
				toast.success(
					"Gracias por consultar, te responderemos a la brevedad",
				);
				resetForm();
			})
			.catch((error) => {
				if (error.errors) {
					const formErrors = error.errors;
					for (const field in formErrors) {
						if (Object.prototype.hasOwnProperty.call(formErrors, field)) {
							toast.warning(formErrors[field]);
							break;
						}
					}
				} else if (error.message) {
					toast.error(error.message);
				} else {
					toast.error("Ocurrió un error al enviar. Intentá de nuevo.");
				}
			})
			.finally(() => {
				setIsSending(false);
			});
	};

	return (
		<form
			ref={formRef}
			onSubmit={handleSubmit}
			className="flex flex-col gap-4"
			data-aos="fade-right"
			data-aos-duration="800"
			data-aos-delay="100"
		>
			<Toaster
				richColors
				position="bottom-right"
				toastOptions={{
					style: { marginBottom: "60px" },
				}}
			/>

			<div>
				<label htmlFor="nombre" className={labelClass}>
					Nombre y apellido
				</label>
				<input
					type="text"
					id="nombre"
					name="name"
					required
					autoComplete="name"
					className={inputClass}
				/>
			</div>

			<div>
				<label htmlFor="telefono" className={labelClass}>
					Teléfono
				</label>
				<input
					type="tel"
					id="telefono"
					name="phone"
					required
					autoComplete="tel"
					className={inputClass}
				/>
			</div>

			<div>
				<label htmlFor="email" className={labelClass}>
					Correo electrónico
				</label>
				<input
					type="email"
					id="email"
					name="email"
					required
					autoComplete="email"
					className={inputClass}
				/>
			</div>

			<div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
				<div>
					<label htmlFor="punto-entrega" className={labelClass}>
						Punto de entrega
					</label>
					<select
						id="punto-entrega"
						name="punto_entrega"
						required
						defaultValue=""
						className={selectClass}
					>
						<option value="" disabled>
							Seleccionar
						</option>
						{puntos.map((punto) => (
							<option key={punto} value={punto}>
								{punto}
							</option>
						))}
					</select>
				</div>
				<div>
					<label htmlFor="punto-retiro" className={labelClass}>
						Punto de retiro
					</label>
					<select
						id="punto-retiro"
						name="punto_retiro"
						required
						defaultValue=""
						className={selectClass}
					>
						<option value="" disabled>
							Seleccionar
						</option>
						{puntos.map((punto) => (
							<option key={`retiro-${punto}`} value={punto}>
								{punto}
							</option>
						))}
					</select>
				</div>
			</div>

			<div>
				<label htmlFor="mensaje" className={labelClass}>
					Mensaje
				</label>
				<textarea
					id="mensaje"
					name="message"
					rows={4}
					required
					className={`${inputClass} min-h-28 resize-y`}
				/>
			</div>

			<button
				type="submit"
				disabled={isSending}
				className="mt-2 ml-auto cursor-pointer rounded-xl bg-white px-8 py-3 text-sm font-bold tracking-wide text-launion uppercase transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50 sm:text-base"
			>
				{isSending ? "Enviando..." : "Enviar"}
			</button>
		</form>
	);
}
