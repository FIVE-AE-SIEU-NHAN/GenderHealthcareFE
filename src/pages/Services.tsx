import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FaStethoscope, FaNotesMedical, FaUserMd, FaSyringe, FaHandHoldingMedical } from "react-icons/fa";
import { FaPersonPregnant } from "react-icons/fa6";

const services = [
	{
		icon: <FaPersonPregnant className="text-4xl text-[#1A3973]" />,
		title: "Consultation",
		description:
			"Expert advice on gender-specific healthcare needs tailored to individuals.",
	},
	{
		icon: <FaSyringe className="text-4xl text-[#1A3973]" />,
		title: "Health Records",
		description:
			"Maintain accurate and inclusive medical records for all gender identities.",
	},
	{
		icon: <FaHandHoldingMedical className="text-4xl text-[#1A3973]" />,
		title: "Professional",
		description:
			"Connect with trained professionals who understand gender yes go to the zoo",
	},
	{
		icon: <FaStethoscope className="text-4xl text-[#1A3973]" />,
		title: "Consultation",
		description:
			"Expert advice on gender-specific healthcare needs tailored to individuals.",
	},
	{
		icon: <FaNotesMedical className="text-4xl text-[#1A3973]" />,
		title: "Health Records",
		description:
			"Maintain accurate and inclusive medical records for all gender identities.",
	},
	{
		icon: <FaUserMd className="text-4xl text-[#1A3973]" />,
		title: "Professional",
		description:
			"Connect with trained professionals who understand gender yes go to the zoo",
	},
];

export default function Services() {
	return (
		<div className="flex flex-col items-center justify-center min-h-[calc(100dvh-96px)]
                    bg-[url('/images/bgservices.png')] bg-no-repeat bg-center bg-cover relative">
			<section className="py-16 relative flex-1" id="services">

				<div className="relative z-10 max-w-7xl mx-auto px-4 text-center">
					<h2 className="text-4xl font-bold text-[#030D43] mb-8">SERVICES</h2>
					<h5 className="text-4xl text-[#030D43] mb-8">Diverse and Specialized Sexual Health Solutions.</h5>
					<div className="mr-50">
						<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
							{services.map((service, idx) => (
								<Card
									key={idx}
									className="shadow-lg rounded-2xl p-6 bg-white/90 border-t-4 border-t-[#030D43]"
								>
									<CardContent className="flex flex-col items-center gap-4">
										{service.icon}
										<h3 className="text-xl font-semibold text-gray-800">
											{service.title}
										</h3>
										<p className="text-gray-600 text-sm">
											{service.description}
										</p>
										<Button
											variant="link"
											className="mt-4 text-[#030D43] hover:text-[#020a31] p-0"
										>
											View service ⭢
										</Button>
									</CardContent>
								</Card>
							))}
						</div>
					</div>
				</div>
			</section>

			<footer className="w-full h-28 bg-white shadow-md py-4 border border-gray-200">
				<p className="text-gray-700 mb-3 text-center">
					Please log in or register to use sexual health care and counseling services.
				</p>
				<div className="flex items-center justify-center gap-2">
					<a
						href="/login"
						className="bg-dark-blue text-white px-6 py-2 rounded-button hover:bg-blue-800 transition duration-200 font-semibold"
					>
						Log In
					</a>
					<span className="text-[#030D43] font-medium">or</span>
					<a
						href="/signup"
						className="border-2 border-dark-blue text-dark-blue px-4 py-2 rounded-button hover:bg-blue-50 transition duration-200 font-semibold"
					>
						Sign Up
					</a>
				</div>
			</footer>
		</div>
	);
}
