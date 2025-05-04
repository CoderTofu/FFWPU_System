'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

import PersonalInfoSection from '@/components/sub_members/PersonalInfoSection';
import ContactInfoSection from '@/components/sub_members/ContactInfoSection';
import SpiritualInfoSection from '@/components/sub_members/SpiritualInfoSection';
import MissionHistorySection from '@/components/sub_members/MissionHistorySection';
import ImageUploadSection from '@/components/sub_members/ImageUploadSection';
import { useAlert } from '@/components/context/AlertContext';

import Button from '@/components/Button';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export default function AddMemberForm() {
  const router = useRouter();
  const { showAlert } = useAlert();

  const steps = [
    'Personal Info',
    'Contact Info',
    'Spiritual Info',
    'Mission History',
    'Upload Photo',
  ];

  const [step, setStep] = useState(0);

  const [formData, setFormData] = useState({
    givenName: '',
    middleName: '',
    familyName: '',
    gender: '',
    birthdate: '',
    region: '',
    subRegion: '',
    maritalStatus: '',
    nation: '',
    spouseName: '',
    phone: '',
    email: '',
    address: '',
    generation: '',
    blessingStatus: '',
    spiritualBirthday: '',
    spiritualParent: '',
    membershipCategory: '',
    missionHistory: [],
    image: '',
  });

  const [image, setImage] = useState<string | null>(null);
  const queryClient = useQueryClient();

  const missionMutation = useMutation({
    mutationFn: async (data) => {
      const res = await fetch('/api/members/member-mission', {
        method: 'POST',
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error('Failed to fetch');
      return await res.json();
    },
  });

  const memberMutation = useMutation({
    mutationFn: async (data) => {
      const formData = new FormData();

      // Append all text fields
      Object.keys(data).forEach((key) => {
        if (key !== 'image') {
          formData.append(key, data[key]);
        }
      });

      // Append image if it exists
      if (data.image instanceof File) {
        formData.append('image', data.image);
      }
      const res = await fetch('/api/members/', {
        method: 'POST',
        body: formData,
      });
      if (!res.ok) throw new Error('Failed to fetch');
      return await res.json();
    },
    onSuccess: async (data) => {
      formData.missionHistory.forEach((mission) => {
        const missionData = {
          member: data['ID'],
          role: mission.role,
          organization: mission.organization,
          country: mission.country,
          start_date: mission.startDate,
          end_date: mission.endDate,
        };
        missionMutation.mutate(missionData);
      });
      await queryClient.refetchQueries(['members']);
      showAlert({
        type: 'success',
        title: 'Member Added!',
      });
      router.push('/member');
    },
    onError: (error) => {
      showAlert({
        type: 'error',
        title: 'Mutation Error: ' + error.message,
      });
    },
  });

  const nextStep = () => setStep((s) => Math.min(s + 1, steps.length - 1));
  const prevStep = () => setStep((s) => Math.max(s - 1, 0));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Trim all string fields first
    const trimmedFormData = { ...formData };
    Object.keys(trimmedFormData).forEach((key) => {
      if (typeof trimmedFormData[key] === 'string') {
        trimmedFormData[key] = trimmedFormData[key].trim();
      }
    });

    const requiredFields = [
      { key: 'givenName', label: 'Given Name', step: 0 },
      { key: 'familyName', label: 'Family Name', step: 0 },
      { key: 'gender', label: 'Gender', step: 0 },
      { key: 'birthdate', label: 'Birthdate', step: 0 },
      { key: 'region', label: 'Region', step: 1 },
      { key: 'subRegion', label: 'Subregion', step: 1 },
      { key: 'maritalStatus', label: 'Marital Status', step: 0 },
      { key: 'phone', label: 'Phone', step: 1 },
      { key: 'email', label: 'Email', step: 1 },
      { key: 'address', label: 'Address', step: 1 },
      { key: 'generation', label: 'Generation', step: 2 },
      { key: 'spiritualBirthday', label: 'Spiritual Birthday', step: 2 },
      { key: 'spiritualParent', label: 'Spiritual Parent', step: 2 },
      { key: 'membershipCategory', label: 'Membership Category', step: 2 },
    ];

    for (const field of requiredFields) {
      if (!trimmedFormData[field.key]) {
        showAlert({ type: 'error', title: `Please fill out the ${field.label} field.` });
        setStep(field.step);
        return;
      }
    }

    // Custom Field Validations
    const emailRegex = /^\S+@\S+\.\S+$/;
    if (!emailRegex.test(trimmedFormData.email)) {
      showAlert({ type: 'error', title: 'Invalid email format.' });
      setStep(1);
      return;
    }

    const phoneRegex = /^[0-9+\-() ]+$/;
    if (!phoneRegex.test(trimmedFormData.phone)) {
      showAlert({ type: 'error', title: 'Phone number must start with "09" and have 11 digits.' });
      setStep(1);
      return;
    }

    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(trimmedFormData.birthdate)) {
      showAlert({ type: 'error', title: 'Birthdate must be in YYYY-MM-DD format.' });
      setStep(0);
      return;
    }

    if (trimmedFormData.spiritualBirthday && !dateRegex.test(trimmedFormData.spiritualBirthday)) {
      showAlert({ type: 'error', title: 'Spiritual Birthday must be in YYYY-MM-DD format.' });
      setStep(2);
      return;
    }

    // Image type check (optional)
    if (typeof trimmedFormData.image === 'object' && trimmedFormData.image !== null) {
      const validImageTypes = ['image/jpeg', 'image/png', 'image/jpg'];
      if (!validImageTypes.includes(trimmedFormData.image.type)) {
        showAlert({ type: 'error', title: 'Uploaded file must be an image (jpg, jpeg, png).' });
        setStep(4);
        return;
      }
    }

    // If all validations pass, submit
    const data = {
      given_name: trimmedFormData.givenName,
      middle_name: trimmedFormData.middleName,
      family_name: trimmedFormData.familyName,
      gender: trimmedFormData.gender,
      birthday: trimmedFormData.birthdate,
      region: trimmedFormData.region,
      nation: trimmedFormData.nation,
      marital_status: trimmedFormData.maritalStatus,
      name_of_spouse: trimmedFormData.spouseName,
      phone: trimmedFormData.phone,
      email: trimmedFormData.email,
      address: trimmedFormData.address,
      image: trimmedFormData.image || null,
      generation: trimmedFormData.generation,
      blessing_status: trimmedFormData.blessingStatus,
      spiritual_birthday: trimmedFormData.spiritualBirthday,
      spiritual_parent: trimmedFormData.spiritualParent,
      membership_category: trimmedFormData.membershipCategory,
    };
    memberMutation.mutate(data);
  };

  return (
    <div className="px-0 md:px-[150px] min-h-screen h-full bg-[#f8fafc] pt-8">
      <div className="w-full p-4 mx-auto bg-white rounded-md drop-shadow-lg flex items-center mb-8 justify-center border-[#1C5CA8] border-2 ">
        <p className="text-3xl font-bold uppercase">{steps[step]}</p>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-lg">
        {step === 0 && <PersonalInfoSection formData={formData} setFormData={setFormData} />}
        {step === 1 && <ContactInfoSection formData={formData} setFormData={setFormData} />}
        {step === 2 && <SpiritualInfoSection formData={formData} setFormData={setFormData} />}
        {step === 3 && <MissionHistorySection formData={formData} setFormData={setFormData} />}
        <div className={`${step === 4 ? 'block' : 'hidden'}`}>
          <ImageUploadSection formData={formData} setFormData={setFormData} />
        </div>
      </div>

      <div className="flex justify-between mt-8">
        {step > 0 && (
          <Button type="outline" onClick={prevStep}>
            Back
          </Button>
        )}
        {step < steps.length - 1 ? (
          <Button type="primary" onClick={nextStep}>
            Next
          </Button>
        ) : (
          <Button
            type="primary"
            onClick={handleSubmit}
            className={'bg-green-500 hover:bg-green-600'}
          >
            Submit
          </Button>
        )}
      </div>
    </div>
  );
}
