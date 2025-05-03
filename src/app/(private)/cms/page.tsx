"use client";

import { useState } from "react";
import Button from '@/components/Button';
import {
  AddRegionModal,
  DeleteRegionModal,
  AddSubregionModal,
  DeleteSubregionModal,
  AddChurchModal,
  DeleteChurchModal,
  AddNewAdminModal,
  ChangePasswordModal,
} from '@/components/CMSModalsNew';

export default function CMS() {
  const [isAddRegionOpen, setIsAddRegionOpen] = useState(false);
  const [isDeleteRegionOpen, setIsDeleteRegionOpen] = useState(false);
  const [isAddSubregionOpen, setIsAddSubregionOpen] = useState(false);
  const [isDeleteSubregionOpen, setIsDeleteSubregionOpen] = useState(false);
  const [isAddChurchOpen, setIsAddChurchOpen] = useState(false);
  const [isDeleteChurchOpen, setIsDeleteChurchOpen] = useState(false);
  const [isAddNewAdminOpen, setIsAddNewAdminOpen] = useState(false);
  const [isChangePasswordOpen, setIsChangePasswordOpen] = useState(false);

  const cards = [
    {
      title: 'Regions',
      subtitle: 'Add & delete regions',
      icon: '/icons/location_icon.svg',
      actions: [
        { label: 'Add', onClick: () => setIsAddRegionOpen(true), type: 'primary' },
        { label: 'Delete', onClick: () => setIsDeleteRegionOpen(true), type: 'outline' },
      ],
    },
    {
      title: 'Subregions',
      subtitle: 'Add & delete subregions',
      icon: '/icons/location_icon.svg',
      actions: [
        { label: 'Add', onClick: () => setIsAddSubregionOpen(true), type: 'primary' },
        { label: 'Delete', onClick: () => setIsDeleteSubregionOpen(true), type: 'outline' },
      ],
    },
    {
      title: 'Churches',
      subtitle: 'Add & delete churches',
      icon: '/icons/location_icon.svg',
      actions: [
        { label: 'Add', onClick: () => setIsAddChurchOpen(true), type: 'primary' },
        { label: 'Delete', onClick: () => setIsDeleteChurchOpen(true), type: 'outline' },
      ],
    },
    {
      title: 'Password',
      subtitle: 'Change your password',
      icon: '/icons/lock_icon.svg',
      actions: [{ label: 'Update', onClick: () => setIsChangePasswordOpen(true), type: 'primary' }],
    },
    {
      title: 'New Admin',
      subtitle: 'Invite a new administrator',
      icon: '/icons/add_acc_icon.svg',
      actions: [{ label: 'Add', onClick: () => setIsAddNewAdminOpen(true), type: 'primary' }],
    },
  ];

  return (
    <div className="px-0 md:px-[150px] min-h-screen h-full pt-8">
      {/* Header */}
      <div className="w-full p-4 mx-auto bg-white rounded-md drop-shadow-lg flex items-center justify-center border-[#1C5CA8] border-2 shadow-lg">
        <p className="text-3xl font-bold uppercase">CMS Dashboard</p>
      </div>

      <section className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {cards.map(({ title, subtitle, icon, actions }) => (
          <div
            key={title}
            className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-200 flex flex-col items-center p-6"
          >
            <img src={icon} alt={`${title} icon`} className="h-10 w-10 mb-4" />
            <h2 className="text-xl font-semibold text-[#01438F]">{title}</h2>
            <p className="text-gray-500 text-sm mb-6 text-center">{subtitle}</p>
            <div className="flex gap-2 flex-row-reverse">
              {actions.map(({ label, onClick, type }) => (
                <Button key={label} type={type} onClick={onClick}>
                  {label}
                </Button>
              ))}
            </div>
          </div>
        ))}
      </section>

      {/* Modals */}
      <AddRegionModal isOpen={isAddRegionOpen} onClose={() => setIsAddRegionOpen(false)} />
      <DeleteRegionModal isOpen={isDeleteRegionOpen} onClose={() => setIsDeleteRegionOpen(false)} />
      <AddSubregionModal isOpen={isAddSubregionOpen} onClose={() => setIsAddSubregionOpen(false)} />
      <DeleteSubregionModal
        isOpen={isDeleteSubregionOpen}
        onClose={() => setIsDeleteSubregionOpen(false)}
      />
      <AddChurchModal isOpen={isAddChurchOpen} onClose={() => setIsAddChurchOpen(false)} />
      <DeleteChurchModal isOpen={isDeleteChurchOpen} onClose={() => setIsDeleteChurchOpen(false)} />
      <ChangePasswordModal
        isOpen={isChangePasswordOpen}
        onClose={() => setIsChangePasswordOpen(false)}
      />
      <AddNewAdminModal isOpen={isAddNewAdminOpen} onClose={() => setIsAddNewAdminOpen(false)} />
    </div>
  );
}
