"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import PersonalInfoSection from "@/components/sub_members/PersonalInfoSection";
import ContactInfoSection from "@/components/sub_members/ContactInfoSection";
import SpiritualInfoSection from "@/components/sub_members/SpiritualInfoSection";
import MissionHistorySection from "@/components/sub_members/MissionHistorySection";
import ImageUploadSection from "@/components/sub_members/ImageUploadSection";
import { useAlert } from "@/components/context/AlertContext";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
<<<<<<< HEAD
import { middleware } from "@/middleware";
=======

<<<<<<< HEAD

>>>>>>> 36850d2 (implemented new and improved version of add and edit)
=======
>>>>>>> 22a6cef (IN PROGRESS: UI Update)
export default function AddMemberForm() {
  const router = useRouter();
  const { showAlert } = useAlert();

  const steps = [
    "Personal Info",
    "Contact Info",
    "Spiritual Info",
    "Mission History",
    "Upload Photo",
  ];

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
    missionHistory: [],
  });

  const [image, setImage] = useState<string | null>(null);
  const queryClient = useQueryClient();
<<<<<<< HEAD
  const [errors, setErrors] = useState<Record<string, string>>({});
  const regionQuery = useQuery({
    queryKey: ["regions"],
    queryFn: async () => {
      const res = await fetch("/api/cms/region", { method: "GET" });
      if (!res.ok) throw new Error("Failed to fetch");
      return res.json();
    },
  });
  const subregionQuery = useQuery({
    queryKey: ["subregions"],
    queryFn: async () => {
      const res = await fetch("/api/cms/subregion", { method: "GET" });
      if (!res.ok) throw new Error("Failed to fetch");
      return res.json();
    },
  });
=======
>>>>>>> 36850d2 (implemented new and improved version of add and edit)

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
      router.push("/member");
    },
    onError: (error) => {
      showAlert({
        type: "error",
        title: "Mutation Error: " + error.message,
      });
    },
  });
<<<<<<< HEAD
<<<<<<< HEAD
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleHistoryChange = (index: number, field: string, value: string) => {
    const updatedHistory = [...formData.missionHistory];
    updatedHistory[index] = {
      ...updatedHistory[index],
      [field]: value,
    };
    setFormData((prev) => ({
      ...prev,
      missionHistory: updatedHistory,
    }));
  };

  const addHistory = () => {
    setFormData((prev) => ({
      ...prev,
      missionHistory: [
        ...prev.missionHistory,
        {
          role: "",
          organization: "",
          country: "",
          startDate: "",
          endDate: "",
        },
      ],
    }));
  };

  const removeHistory = (index: number) => {
    const updatedHistory = [...formData.missionHistory];
    updatedHistory.splice(index, 1);
    setFormData((prev) => ({
      ...prev,
      missionHistory: updatedHistory,
    }));
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
=======
  
=======

>>>>>>> 22a6cef (IN PROGRESS: UI Update)
  const nextStep = () => setStep((s) => Math.min(s + 1, steps.length - 1));
  const prevStep = () => setStep((s) => Math.max(s - 1, 0));
>>>>>>> 36850d2 (implemented new and improved version of add and edit)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

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
      if (
        !formData[field.key] ||
        formData[field.key].toString().trim() === ""
      ) {
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

    const data = {
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
      blessing_status: formData.blessingStatus,
      spiritual_birthday: formData.spiritualBirthday,
      spiritual_parent: formData.spiritualParent,
      membership_category: formData.membershipCategory,
    };
    memberMutation.mutate(data);

    console.log("Member added:", data);
  };

  return (
    <div className="px-0 md:px-[150px] min-h-screen h-full bg-[#f8fafc] pt-8">
      <div className="w-full p-4 mx-auto bg-white rounded-md drop-shadow-lg flex items-center mb-8 justify-center border-[#1C5CA8] border-2 ">
        <p className="text-3xl font-bold uppercase">{steps[step]}</p>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-lg">
        {step === 0 && (
          <PersonalInfoSection formData={formData} setFormData={setFormData} />
        )}
        {step === 1 && (
          <ContactInfoSection formData={formData} setFormData={setFormData} />
        )}
        {step === 2 && (
          <SpiritualInfoSection formData={formData} setFormData={setFormData} />
        )}
        {step === 3 && (
          <MissionHistorySection
            formData={formData}
            setFormData={setFormData}
          />
        )}
        {step === 4 && (
          <ImageUploadSection formData={formData} setFormData={setFormData} />
        )}
      </div>

      <div className="flex justify-between mt-8">
        {step > 0 && (
          <button
            onClick={prevStep}
            className="px-6 py-3 rounded-lg bg-gray-300 hover:bg-gray-400"
          >
            Back
          </button>
        )}
        {step < steps.length - 1 ? (
          <button
            onClick={nextStep}
            className="px-6 py-3 rounded-lg bg-[#01438f] text-white hover:bg-blue-700"
          >
            Next
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            className="px-6 py-3 rounded-lg bg-green-600 text-white hover:bg-green-700"
          >
            Submit
          </button>
        )}
      </div>
    </div>
  );
}
