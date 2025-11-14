"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Button from "@/app/components/Button";
import Container from "../components/Container";
import Input from "../components/Input";
import Link from "next/link";
import LevelIcon from "./LevelIcon";
import { useRouter } from "next/navigation";

interface SignUpProps {
    formData: any;
    setFormData: React.Dispatch<React.SetStateAction<any>>;
    errors: any;
}

function SignUp({ formData, setFormData, errors }: SignUpProps) {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev: any) => ({ ...prev, [name]: value }));
    };

    return (
        <form className="flex flex-col">
            <Input
                name="fullName"
                label="Full Name"
                placeholder="e.g. John Doe"
                value={formData.fullName}
                onChange={handleChange}
                error={errors.fullName}
            />
            <Input
                name="email"
                type="email"
                label="Email"
                placeholder="e.g. john.doe@example.com"
                value={formData.email}
                onChange={handleChange}
                error={errors.email}
            />
            <Input
                name="password"
                type="password"
                label="Password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                error={errors.password}
            />
            <Input
                name="verifyPassword"
                type="password"
                label="Verify Password"
                placeholder="Enter your password again"
                value={formData.verifyPassword}
                onChange={handleChange}
                error={errors.verifyPassword}
            />
            <p className="text-sm font-normal text-center mt-4 text-gray-600">
                Already have an account? <Link href='/login' className="text-(--primary) hover:underline">Log in</Link>
            </p>
        </form>
    );
}

interface LearningGoalProps {
    selectedGoal: number | null;
    setSelectedGoal: React.Dispatch<React.SetStateAction<number | null>>;
}

function LearningGoal({ selectedGoal, setSelectedGoal }: LearningGoalProps) {
    return (
        <div className="flex flex-wrap gap-6">
            {
                [10, 25, 50, 100].map((goal) => (
                    <div
                        key={goal}
                        onClick={() => setSelectedGoal(goal)}
                        className={`cursor-pointer w-full h-[51px] md:h-auto md:w-[calc(50%-12px)] md:text-3xl md:font-bold shadow-md rounded-[20px] flex justify-center items-center aspect-square ${selectedGoal === goal ? 'bg-(--primary) text-(--secondary-white)!' : 'border border-(--secondary-cool) hover:bg-gray-100'}`}
                    >
                        {goal} words
                    </div>
                ))
            }
        </div>
    );
}

interface ProficiencyLevelProps {
    selectedLevel: string | null;
    setSelectedLevel: React.Dispatch<React.SetStateAction<string | null>>;
}

function ProficiencyLevel({ selectedLevel, setSelectedLevel }: ProficiencyLevelProps) {
    const levels = [
        { title: 'Beginner', desc: 'Just started and need to learn the basics.' },
        { title: 'Intermediate', desc: 'Know the basics and elementary level hanja.' },
        { title: 'Advanced', desc: 'Knowledge of difficult hanja used in news.' },
    ];

    return (
        <ul className="flex flex-col gap-4">
            {
                levels.map((level) => (
                    <li key={level.title} onClick={() => setSelectedLevel(level.title)}>
                        <Container className={`cursor-pointer shadow-md! rounded-[20px]! flex flex-col md:flex-row md:items-center justify-between h-[135px] box-border ${selectedLevel === level.title ? 'bg-(--primary)! text-(--secondary-white)' : 'border border-(--secondary-cool) hover:bg-gray-100'}`}>
                            <h4 className="font-medium!">{level.title} <LevelIcon level={level.title} selected={selectedLevel === level.title} /></h4>
                            <h4 className="text-[16px]! md:text-2xl! max-w-[251px] font-medium! md:leading-8">{level.desc}</h4>
                        </Container>
                    </li>
                ))
            }
        </ul>
    );
}

function Done() {
    const router = useRouter()
    return (
        <>
            <Image className="px-6 md:px-16 h-[390px]! top-1/2! -translate-y-1/2" fill src="/all-set.svg" alt="Done Image" />
            <Button onClick={() => router.push('/dashboard')} className="mt-[525.69px] md:mt-[570px] max-w-full">Done</Button>
        </>
    );
}

const StepBar = ({ currentStep, totalSteps }: { currentStep: number, totalSteps: number }) => {
    return (
        <div className="flex gap-4 mb-12">
            {Array.from({ length: totalSteps }).map((_, index) => (
                <div
                    key={index}
                    className={`flex-1 h-2.5 rounded-full transition-colors ${index <= currentStep ? "bg-(--primary)" : "bg-(--secondary-cool)"
                        }`}
                ></div>
            ))}
        </div>
    );
};

export default function SignUpPage() {
    const [step, setStep] = useState(0);
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        password: '',
        verifyPassword: '',
    });
    const [selectedGoal, setSelectedGoal] = useState<number | null>(null);
    const [selectedLevel, setSelectedLevel] = useState<string | null>(null);
    const [errors, setErrors] = useState<any>({});

    const steps = [
        { title: "Create an Account", component: <SignUp formData={formData} setFormData={setFormData} errors={errors} /> },
        { title: "Set your daily learning goal", component: <LearningGoal selectedGoal={selectedGoal} setSelectedGoal={setSelectedGoal} /> },
        { title: "Proficiency level", component: <ProficiencyLevel selectedLevel={selectedLevel} setSelectedLevel={setSelectedLevel} /> },
        { title: "You’re all set!", component: <Done /> }
    ];

    const validate = () => {
        const newErrors: any = {};

        if (step === 0) {
            if (!formData.fullName) newErrors.fullName = 'Full Name is required.';
            if (!formData.email) {
                newErrors.email = 'Email is required.';
            } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
                newErrors.email = 'Email is invalid.';
            } else if (formData.email === 'test@test.com') {
                newErrors.email = 'This email is already taken.';
            }

            if (!formData.password) {
                newErrors.password = 'Password is required.';
            } else if (formData.password.length < 8 || !/\d/.test(formData.password) || !/[a-zA-Z]/.test(formData.password)) {
                newErrors.password = 'Password must be at least 8 characters long and include both letters and numbers.';
            }

            if (!formData.verifyPassword) {
                newErrors.verifyPassword = 'Password verification is required.';
            } else if (formData.password !== formData.verifyPassword) {
                newErrors.verifyPassword = 'Passwords do not match.';
            }
        } else if (step === 1) {
            if (selectedGoal === null) {
                newErrors.learningGoal = 'Please select a daily learning goal.';
            }
        } else if (step === 2) {
            if (selectedLevel === null) {
                newErrors.proficiencyLevel = 'Please select your proficiency level.';
            }
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleNext = () => {
        if (validate()) {
            setStep((prev) => Math.min(prev + 1, steps.length - 1));
        }
    };

    const handleBack = () => {
        setStep((prev) => Math.max(prev - 1, 0));
    };

    const isLastStep = step === steps.length - 1;

    useEffect(() => {
        step === 1 && errors.learningGoal && alert(errors.learningGoal)
        step === 2 && errors.proficiencyLevel && alert(errors.proficiencyLevel)
    }, [errors])

    return (
        <Container className="max-w-[674px] h-[779.7px] relative md:h-[862px] p-6 md:px-16 md:py-10 flex flex-col justify-between">
            <div>
                <StepBar currentStep={step} totalSteps={steps.length} />
                <h3 className="font-bold text-[22px]! md:text-[32px]! mb-12">{steps[step].title}</h3>
                {steps[step].component}
            </div>

            {!isLastStep && (
                <div className="flex gap-4 mt-6">
                    {step > 0 && (
                        <Button onClick={handleBack} className="w-full text-[16px] md:text-[22px] bg-gray-200 text-gray-700 hover:bg-gray-300">Back</Button>
                    )}
                    <Button onClick={handleNext} className="w-full max-w-full text-[16px] md:text-[22px]">
                        {step === 0 ? 'Continue' : 'Next'}
                    </Button>
                </div>
            )}
        </Container>
    );
}
