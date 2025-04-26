"use client";

import { useState } from "react";
import PersonalInfoSection from "./PersonalInfoSection";
import ContactInfoSection from "./ContactInfoSection";
import SpiritualInfoSection from "./SpiritualInfoSection";
import MissionHistorySection from "./MissionHistorySection";
import ImageUploadSection from "./ImageUploadSection";
import { useAlert } from "@/components/context/AlertContext";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";


export default function AddMemberForm() {
  const queryClient = useQueryClient();
  const { showAlert } = useAlert();

  const [image, setImage] = useState<string | null>(null);
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({
    givenName: "",
    middleName: "",
    familyName: "",
    gender: "",
    birthdate: "",
    region: "",
    subRegion: "",
    maritalStatus: "",
    nation: "",
    spouseName: "",
    phone: "",
    email: "",
    address: "",
    generation: "",
    blessingStatus: "",
    spiritualBirthday: "",
    spiritualParent: "",
    membershipCategory: "",
    missionHistory: [
      {
        role: "",
        organization: "",
        country: "",
        startDate: "",
        endDate: "",
      },
    ],
    image: "",
  });

  const steps = [
    "Personal Info",
    "Contact Info",
    "Spiritual Info",
    "Mission History",
    "Upload Photo",
  ];

  const missionMutation = useMutation({
    mutationFn: async (data) => {
      const res = await fetch("/api/members/member-mission", {
        method: "POST",
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Failed to fetch");
      return await res.json();
    },
  });

  const memberMutation = useMutation({
    mutationFn: async (data) => {
      const res = await fetch("/api/members/", {
        method: "POST",
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Failed to fetch");
      return await res.json();
    },
    onSuccess: (data) => {
      formData.missionHistory.forEach((mission) => {
        const missionData = {
          member: data["ID"],
          role: mission.role,
          organization: mission.organization,
          country: mission.country,
          start_date: mission.startDate,
          end_date: mission.endDate,
        };
        missionMutation.mutate(missionData);
      });
      queryClient.refetchQueries(["members"]);
      
      showAlert({
        type: "success",
        title: "Member Added!",
      });
    },
    onError: (error) => {
      console.log(error)
      showAlert({
        type: "error",
        title: "Mutation Error: " + error.message,
      });
    },
  });

  const nextStep = () => setStep((s) => Math.min(s + 1, steps.length - 1));
  const prevStep = () => setStep((s) => Math.max(s - 1, 0));

  const handleSubmit = async () => {
    try {
      // Define required fields and their corresponding page step
      const requiredFields = [
        { key: "givenName", label: "Given Name", step: 0 },
        { key: "familyName", label: "Family Name", step: 0 },
        { key: "gender", label: "Gender", step: 0 },
        { key: "birthdate", label: "Birthdate", step: 0 },
        { key: "region", label: "Region", step: 1 },
        { key: "subRegion", label: "Subregion", step: 1 },
        { key: "maritalStatus", label: "Marital Status", step: 0 },
        { key: "phone", label: "Phone", step: 1 },
        { key: "email", label: "Email", step: 1 },
        { key: "address", label: "Address", step: 1 },
        { key: "generation", label: "Generation", step: 2 },
        { key: "spiritualBirthday", label: "Spiritual Birthday", step: 2 },
        { key: "spiritualParent", label: "Spiritual Parent", step: 2 },
        { key: "membershipCategory", label: "Membership Category", step: 2 },
      ];
  
      // Check each required field
      for (const field of requiredFields) {
        if (!formData[field.key] || formData[field.key].toString().trim() === "") {
          showAlert({
            type: "error",
            title: `Please fill out the ${field.label} field.`,
          });
  
          // Set page/step where that field is located
          setStep(field.step);
  
          // STOP submitting
          return;
        }
      }
  
      // All fields OK, create payload
      const payload = {
        given_name: formData.givenName,
        middle_name: formData.middleName,
        family_name: formData.familyName,
        gender: formData.gender,
        birthday: formData.birthdate,
        region: formData.region,
        nation: formData.nation,
        marital_status: formData.maritalStatus,
        name_of_spouse: formData.spouseName,
        phone: formData.phone,
        email: formData.email,
        address: formData.address,
        image,
        generation: formData.generation,
        blessing_status: "aaaaaaaaaaaaa",
        spiritual_birthday: formData.spiritualBirthday,
        spiritual_parent: formData.spiritualParent,
        membership_category: formData.membershipCategory,
      };
  
      // Submit to API
      memberMutation.mutate(payload);
      console.log("Member added:", payload);

  
    } catch (error) {
      console.error(error);
      showAlert({
        type: "error",
        title: "Something went wrong while submitting.",
      });
    }
  };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files[0]) {
        const file = e.target.files[0];
        const reader = new FileReader();
  
        reader.onload = (event) => {
          if (event.target && typeof event.target.result === "string") {
            setImage(event.target.result);
          }
        };
  
        reader.readAsDataURL(file);
      }
    };
  
  
  return (
    <div className="max-w-6xl mx-auto p-8">
      <h1 className="text-3xl font-bold text-center mb-8 text-[#01438f]">
        {steps[step]}
      </h1>

      <div className="bg-white rounded-xl p-6 shadow-lg">
        {step === 0 && <PersonalInfoSection formData={formData} setFormData={setFormData} />}
        {step === 1 && <ContactInfoSection formData={formData} setFormData={setFormData} />}
        {step === 2 && <SpiritualInfoSection formData={formData} setFormData={setFormData} />}
        {step === 3 && <MissionHistorySection formData={formData} setFormData={setFormData} />}
        {step === 4 && <ImageUploadSection formData={formData} setFormData={setFormData} />}
      </div>

      <div className="flex justify-between mt-8">
        {step > 0 && (
          <button onClick={prevStep} className="px-6 py-3 rounded-lg bg-gray-300 hover:bg-gray-400">
            Back
          </button>
        )}
        {step < steps.length - 1 ? (
          <button onClick={nextStep} className="px-6 py-3 rounded-lg bg-[#01438f] text-white hover:bg-blue-700">
            Next
          </button>
        ) : (
          <button onClick={handleSubmit} className="px-6 py-3 rounded-lg bg-green-600 text-white hover:bg-green-700">
            Submit
          </button>
        )}
      </div>

    </div>
  );
}

