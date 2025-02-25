"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Helper function for button styles
const buttonStyle =
  "font-bold border-2 border-[#01438F] bg-[#FCC346] py-2 px-7 transition-all duration-300 hover:opacity-90 rounded-lg";

export function AddRegionModal() {
  const [regionName, setRegionName] = useState("");

  const handleAddRegion = () => {
    // Add logic to handle adding a region
    console.log("Adding region:", regionName);
    // Reset the input
    setRegionName("");
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className={buttonStyle}>ADD</button>
      </DialogTrigger>
      <DialogContent className="bg-white border-4 border-[#FCC346]">
        <DialogHeader>
          <DialogTitle className="font-bold text-lg">Add Region</DialogTitle>
          <DialogDescription className="text-[#B7B7B7] font-light text-sm">
            Enter the name of the new region you want to add.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="region-name" className="text-right font-bold">
              Region Name
            </Label>
            <input
              id="region-name"
              value={regionName}
              onChange={(e) => setRegionName(e.target.value)}
              className="col-span-3 border-2 border-black rounded-sm px-1 py-1"
            />
          </div>
        </div>
        <DialogFooter>
          <button className={buttonStyle} onClick={handleAddRegion}>
            Add Region
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export function DeleteRegionModal() {
  const [regionToDelete, setRegionToDelete] = useState("");

  // This is a placeholder. In a real application, you'd fetch this data from your backend.
  const regions = ["Region 1", "Region 2", "Region 3"];

  const handleDeleteRegion = () => {
    // Add logic to handle deleting a region
    console.log("Deleting region:", regionToDelete);
    // Reset the selection
    setRegionToDelete("");
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className={buttonStyle}>DELETE</button>
      </DialogTrigger>
      <DialogContent className="bg-white border-4 border-[#FCC346]">
        <DialogHeader>
          <DialogTitle className="font-bold text-lg">Delete Region</DialogTitle>
          <DialogDescription className="text-[#B7B7B7] font-light text-sm">
            Select the region you want to delete.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="region-delete" className="text-right font-bold">
              Region
            </Label>
            <Select value={regionToDelete} onValueChange={setRegionToDelete}>
              <SelectTrigger className="col-span-3 border-2 border-black rounded-sm">
                <SelectValue placeholder="Select a Region" />
              </SelectTrigger>
              <SelectContent>
                {regions.map((region, index) => (
                  <SelectItem key={index} value={region}>
                    {region}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <button
            className={buttonStyle}
            onClick={handleDeleteRegion}
            disabled={!regionToDelete}
          >
            Delete Region
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export function AddSubregionModal() {
  const [selectedRegion, setSelectedRegion] = useState("");
  const [subRegion, setSubRegion] = useState("");

  const regions = [
    { id: "1", name: "North America" },
    { id: "2", name: "Europe" },
    { id: "3", name: "Asia" },
    { id: "4", name: "Africa" },
    { id: "5", name: "South America" },
    { id: "6", name: "Oceania" },
  ];

  const handleAddSubregion = () => {
    // Add logic to handle adding a subregion
    console.log("Adding subregion:", subRegion, "to region:", selectedRegion);
    // Reset the inputs
    setSelectedRegion("");
    setSubRegion("");
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className={buttonStyle}>ADD</button>
      </DialogTrigger>
      <DialogContent className="bg-white border-4 border-[#FCC346]">
        <DialogHeader>
          <DialogTitle className="font-bold text-lg">Add Subregion</DialogTitle>
          <DialogDescription className="text-[#B7B7B7] font-light text-sm">
            Select the parent region and enter the name of the new subregion.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="parent-region" className="text-right font-bold">
              Region
            </Label>
            <Select value={selectedRegion} onValueChange={setSelectedRegion}>
              <SelectTrigger className="col-span-3 border-2 border-black rounded-sm">
                <SelectValue placeholder="Select a region" />
              </SelectTrigger>
              <SelectContent>
                {regions.map((region) => (
                  <SelectItem key={region.id} value={region.id}>
                    {region.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="subregion-name" className="text-right font-bold">
              Subregion Name
            </Label>
            <input
              id="subregion-name"
              value={subRegion}
              onChange={(e) => setSubRegion(e.target.value)}
              className="col-span-3 border-2 border-black rounded-sm px-1 py-1"
            />
          </div>
        </div>
        <DialogFooter>
          <button className={buttonStyle} onClick={handleAddSubregion}>
            Add Subregion
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export function DeleteSubregionModal() {
  const [selectedRegion, setSelectedRegion] = useState<
    keyof typeof regionsData | ""
  >("");
  const [selectedSubregion, setSelectedSubregion] = useState("");
  const [subregions, setSubregions] = useState<string[]>([]);

  const regionsData: { [key: string]: { name: string; subregions: string[] } } =
    {
      "1": {
        name: "North America",
        subregions: ["California", "New York", "Texas"],
      },
      "2": { name: "Europe", subregions: ["Paris", "London", "Berlin"] },
      "3": { name: "Asia", subregions: ["Tokyo", "Shanghai", "Mumbai"] },
    };

  useEffect(() => {
    if (selectedRegion) {
      setSubregions(
        selectedRegion ? regionsData[selectedRegion].subregions : []
      );
      setSelectedSubregion("");
    }
  }, [selectedRegion]);

  const handleDeleteSubregion = () => {
    // Add logic to handle deleting a subregion
    console.log(
      "Deleting subregion:",
      selectedSubregion,
      "from region:",
      regionsData[selectedRegion]?.name
    );
    // Reset the selections
    setSelectedRegion("");
    setSelectedSubregion("");
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className={buttonStyle}>DELETE</button>
      </DialogTrigger>
      <DialogContent className="bg-white border-4 border-[#FCC346]">
        <DialogHeader>
          <DialogTitle className="font-bold text-lg">
            Delete Subregion
          </DialogTitle>
          <DialogDescription className="text-[#B7B7B7] font-light text-sm">
            Select the region and subregion you want to delete.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="region-select" className="text-right font-bold">
              Region
            </Label>
            <Select value={selectedRegion} onValueChange={setSelectedRegion}>
              <SelectTrigger
                id="region-select"
                className="col-span-3 border-2 border-black rounded-sm"
              >
                <SelectValue placeholder="Select a region" />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(regionsData).map(([id, { name }]) => (
                  <SelectItem key={id} value={id}>
                    {name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="subregion-select" className="text-right font-bold">
              Subregion
            </Label>
            <Select
              value={selectedSubregion}
              onValueChange={setSelectedSubregion}
              disabled={!selectedRegion}
            >
              <SelectTrigger
                id="subregion-select"
                className="col-span-3 border-2 border-black rounded-sm"
              >
                <SelectValue placeholder="Select a subregion" />
              </SelectTrigger>
              <SelectContent>
                {subregions.map((subregion) => (
                  <SelectItem key={subregion} value={subregion}>
                    {subregion}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <button
            className={buttonStyle}
            onClick={handleDeleteSubregion}
            disabled={!selectedRegion || !selectedSubregion}
          >
            Delete Subregion
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export function ChangePasswordModal() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleChangePassword = () => {
    // Add logic to handle changing the password
    console.log("Changing password");
    // Reset the inputs
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className={buttonStyle}>UPDATE</button>
      </DialogTrigger>
      <DialogContent className="bg-white border-4 border-[#FCC346]">
        <DialogHeader>
          <DialogTitle className="font-bold text-lg">
            Change Password
          </DialogTitle>
          <DialogDescription className="text-[#B7B7B7] font-light text-sm">
            Enter your current password and a new password.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="current-password" className="text-right font-bold">
              Current Password
            </Label>
            <input
              id="current-password"
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="col-span-3 border-2 border-black rounded-sm px-1 py-1"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="new-password" className="text-right font-bold">
              New Password
            </Label>
            <input
              id="new-password"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="col-span-3 border-2 border-black rounded-sm px-1 py-1"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="confirm-password" className="text-right font-bold">
              Confirm Password
            </Label>
            <input
              id="confirm-password"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="col-span-3 border-2 border-black rounded-sm px-1 py-1"
            />
          </div>
        </div>
        <DialogFooter>
          <button className={buttonStyle} onClick={handleChangePassword}>
            Change Password
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export function AddNewAdminModal() {
  const [adminName, setAdminName] = useState("");
  const [adminEmail, setAdminEmail] = useState("");
  const [adminPassword, setAdminPassword] = useState("");

  const handleAddAdmin = () => {
    // Add logic to handle adding a new admin
    console.log("Adding new admin:", adminName, adminEmail);
    // Reset the inputs
    setAdminName("");
    setAdminEmail("");
    setAdminPassword("");
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className={buttonStyle}>ADD</button>
      </DialogTrigger>
      <DialogContent className="bg-white border-4 border-[#FCC346]">
        <DialogHeader>
          <DialogTitle className="font-bold text-lg">Add New Admin</DialogTitle>
          <DialogDescription className="text-[#B7B7B7] font-light text-sm">
            Enter the details for the new admin account.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="admin-name" className="text-right font-bold">
              Username
            </Label>
            <input
              id="admin-name"
              value={adminName}
              onChange={(e) => setAdminName(e.target.value)}
              className="col-span-3 border-2 border-black rounded-sm px-1 py-1"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="admin-password" className="text-right font-bold">
              Password
            </Label>
            <input
              id="admin-password"
              type="password"
              value={adminPassword}
              onChange={(e) => setAdminPassword(e.target.value)}
              className="col-span-3 border-2 border-black rounded-sm px-1 py-1"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="admin-password" className="text-right font-bold">
              Confirm Password
            </Label>
            <input
              id="admin-password"
              type="password"
              value={adminPassword}
              onChange={(e) => setAdminPassword(e.target.value)}
              className="col-span-3 border-2 border-black rounded-sm px-1 py-1"
            />
          </div>
        </div>
        <DialogFooter>
          <button className={buttonStyle} onClick={handleAddAdmin}>
            Add Admin
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
