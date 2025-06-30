import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog";
import {
    FaDownload,
    FaStar,
    FaAngry,
    FaFrown,
    FaMeh,
    FaSmile,
    FaGrinHearts,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { toast } from "sonner";

const ViewResultService = () => {
    const [feedback, setFeedback] = useState("");
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);
    const [showRatingError, setShowRatingError] = useState(false);
    const [isOpen, setIsOpen] = useState(false); // Dialog open state

    const resultData = {
        serviceName: "Female Sex Hormone Test",
        date: "06/24/2025",
        doctor: "Dr. Nguyen Thi Lan",
        results: [
            { name: "Estrogen", value: "85 pg/mL", status: "Normal" },
            { name: "Progesterone", value: "4 ng/mL", status: "Slightly Low" },
            { name: "LH", value: "15 mIU/mL", status: "High" },
        ],
        advice:
            "High LH levels may suggest polycystic ovary syndrome (PCOS). Further testing is recommended after your next menstrual cycle.",
    };

    return (
        <div className="max-w-3xl mx-auto px-4 py-10 space-y-6 relative z-10">
            <h1 className="text-3xl font-bold text-center text-[#1A3973] mb-6">
                Service Result
            </h1>

            {/* Info Card */}
            <Card className="border border-[#1A3973]/30 shadow rounded-2xl">
                <CardContent className="p-6 space-y-2 text-gray-700">
                    <p>
                        <strong className="text-[#1A3973]">Service:</strong>{" "}
                        {resultData.serviceName}
                    </p>
                    <p>
                        <strong className="text-[#1A3973]">Date:</strong>{" "}
                        {resultData.date}
                    </p>
                    <p>
                        <strong className="text-[#1A3973]">Doctor:</strong>{" "}
                        {resultData.doctor}
                    </p>
                </CardContent>
            </Card>

            {/* Result Card */}
            <Card className="border border-[#1A3973]/30 shadow rounded-2xl">
                <CardContent className="p-6 space-y-3 text-gray-700">
                    <h2 className="text-xl font-semibold text-[#1A3973] mb-2">
                        Test Results
                    </h2>
                    {resultData.results.map((item, index) => (
                        <div key={index} className="flex justify-between border-b py-1">
                            <span>{item.name}</span>
                            <span className="font-semibold">
                                {item.value}{" "}
                                <span className="text-sm text-gray-500">({item.status})</span>
                            </span>
                        </div>
                    ))}
                </CardContent>
            </Card>

            {/* Advice Card */}
            <Card className="border border-[#1A3973]/30 shadow rounded-2xl">
                <CardContent className="p-6">
                    <h2 className="text-xl font-semibold text-[#1A3973] mb-2">
                        Doctor's Advice
                    </h2>
                    <p className="italic text-gray-700">{resultData.advice}</p>
                </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="flex justify-end gap-4 mt-6">
                <Button
                    variant="outline"
                    className="border-[#1A3973] text-[#1A3973] hover:bg-[#1A3973]/10 rounded-2xl px-6 py-3 text-md"
                >
                    <FaDownload className="mr-2" /> Download PDF
                </Button>

                {/* Dialog for Feedback */}
                <Dialog open={isOpen} onOpenChange={setIsOpen}>
                    <DialogTrigger asChild>
                        <Button
                            className="bg-gradient-to-r from-[#1A3973] to-[#4F80E1] text-white text-md 
              font-semibold rounded-2xl px-6 py-3 shadow-md hover:shadow-lg flex items-center gap-2 transition-all"
                        >
                            <FaStar /> Rate Service
                        </Button>
                    </DialogTrigger>

                    <DialogContent className="rounded-2xl">
                        <DialogHeader>
                            <DialogTitle className="text-center text-[#1A3973] text-xl">
                                Rate the Service
                            </DialogTitle>
                        </DialogHeader>


                        <div className="mb-6">
                            <label className="block font-medium mb-2 text-gray-700 text-center">
                                How satisfied are you?
                            </label>
                            <div className="flex justify-center gap-4">
                                {[
                                    { level: 1, icon: <FaAngry />, label: "Terrible", color: "text-red-600" },
                                    { level: 2, icon: <FaFrown />, label: "Bad", color: "text-orange-500" },
                                    { level: 3, icon: <FaMeh />, label: "Okay", color: "text-yellow-500" },
                                    { level: 4, icon: <FaSmile />, label: "Good", color: "text-green-500" },
                                    { level: 5, icon: <FaGrinHearts />, label: "Excellent", color: "text-blue-600" },
                                ].map(({ level, icon, label, color }) => (
                                    <div key={level} className="flex flex-col items-center group">
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setRating(level);
                                                setShowRatingError(false);
                                            }}
                                            onMouseEnter={() => setHover(level)}
                                            onMouseLeave={() => setHover(0)}
                                            className={`text-4xl transition-transform hover:scale-125 ${color}
                      ${level === (hover || rating) ? "opacity-100 scale-110" : "opacity-40"}`}
                                        >
                                            {icon}
                                        </button>
                                        <span
                                            className={`text-xs mt-1 font-medium ${level === (hover || rating)
                                                ? "opacity-100 text-[#1A3973]"
                                                : "opacity-30"
                                                }`}
                                        >
                                            {label}
                                        </span>
                                    </div>
                                ))}
                            </div>
                            {showRatingError && (
                                <p className="text-red-500 text-sm mt-2 text-center">
                                    Please select your satisfaction level before submitting.
                                </p>
                            )}
                        </div>

                        {/* Feedback Textarea */}
                        <div className="mb-6">
                            <label className="block font-medium mb-1 text-gray-700">
                                Detailed Feedback
                            </label>
                            <textarea
                                value={feedback}
                                onChange={(e) => setFeedback(e.target.value)}
                                rows={4}
                                className="w-full border rounded-md px-3 py-2 text-gray-700"
                                placeholder="Enter your feedback..."
                            />
                        </div>

                        <DialogFooter>
                            <Button
                                className="bg-gradient-to-r from-[#1A3973] to-[#4F80E1] text-white rounded-xl px-6 py-2 font-semibold"
                                onClick={() => {
                                    if (rating === 0) {
                                        setShowRatingError(true);
                                        return;
                                    }
                                    setShowRatingError(false);
                                    console.log("Rating:", rating);
                                    console.log("Feedback:", feedback);
                                    toast.success("Thank you for your feedback!", {
                                        icon: "🎉",
                                        duration: 3000,
                                    });

                                    setIsOpen(false);
                                    setRating(0);
                                    setFeedback("");
                                    setHover(0);
                                }}
                            >
                                Submit Feedback
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    );
};

export default ViewResultService;
