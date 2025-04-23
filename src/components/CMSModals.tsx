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

import { axiosInstance } from "@/app/axiosInstance";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

// Helper function for button styles
const buttonStyle =
  "px-6 py-2 rounded bg-[#01438F] text-[#FCC346] font-bold transition duration-300 ease-in-out hover:bg-[#FCC346] hover:text-[#01438F] hover:shadow-lg";

export function AddRegionModal() {
  const [regionName, setRegionName] = useState("");
  const queryClient = useQueryClient();
  const handleAddRegion = async () => {
    // Add logic to handle adding a region
    console.log("Adding region:", regionName);
    const res = await fetch("/api/cms/region", {
      method: "POST",
      body: JSON.stringify({ name: regionName }),
    });
    if (res.ok) {
      alert("successfully added region");
      queryClient.refetchQueries(["regions"]);
    } else {
      alert("An error occurred: " + res.statusText);
    }
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
  const [regions, setRegions] = useState([]);

  useEffect(() => {
    const fetchRegions = async () => {
      const res = await fetch("/api/cms/region", { method: "GET" });
      if (res.ok) {
        const data = await res.json();
        setRegions(data);
      } else {
        alert("An error occurred while fetching regions");
      }
    };
    fetchRegions();
  }, []);

  const handleDeleteRegion = async () => {
    // Add logic to handle deleting a region
    console.log("Deleting region:", regionToDelete);
    const res = await fetch(`/api/cms/region/${regionToDelete}/`, {
      method: "DELETE",
    });
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
                  <SelectItem key={index} value={region.id}>
                    {region.name}
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

  const [regions, setRegions] = useState([]);
  const queryClient = useQueryClient();

  const regionQuery = useQuery({
    queryKey: ["regions"],
    queryFn: async () => {
      const res = await fetch("/api/cms/region", { method: "GET" });
      if (!res.ok) throw new Error("Failed to fetch");
      return res.json();
    },
  });

  const subregionMutation = useMutation({
    mutationFn: async (data) => {
      const res = await fetch("/api/cms/subregion", {
        method: "POST",
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Failed to fetch");
    },
    onSuccess: (data) => {
      alert("Successfully added");
      queryClient.refetchQueries(["subregions"]);
    },
    onError: (data) => {
      alert("Error while adding");
    },
  });
  const handleAddSubregion = () => {
    // Add logic to handle adding a subregion
    console.log("Adding subregion:", subRegion, "to region:", selectedRegion);
    subregionMutation.mutate({ region: selectedRegion, name: subRegion });
    // Reset the inputs
    setSelectedRegion("");
    setSubRegion("");
  };

  useEffect(() => {
    if (regionQuery.status === "success") {
      setRegions(regionQuery.data);
    } else if (regionQuery.status === "error") {
      alert("An error occurred while fetching data");
    }
  }, [regionQuery.data, regionQuery.status]);

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
            <Select
              value={selectedRegion.toString()}
              onValueChange={setSelectedRegion}
            >
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

export function AddChurchModal() {
  const [churchName, setChurchName] = useState("");
  const [regions, setRegions] = useState([]);
  const [subregions, setSubregions] = useState([]);
  const [region, setRegion] = useState("");
  const [subregion, setSubregion] = useState("");
  const [country, setCountry] = useState("");

  const queryClient = useQueryClient();

  const regionQuery = useQuery({
    queryKey: ["regions"],
    queryFn: async () => {
      const res = await fetch("/api/cms/region", { method: "GET" });
      if (!res.ok) {
        throw new Error("An error occurred while fetching regions");
      }
      return await res.json();
    },
  });
  const subregionQuery = useQuery({
    queryKey: ["subregions"],
    queryFn: async () => {
      const res = await fetch("/api/cms/subregion", { method: "GET" });
      if (!res.ok) {
        throw new Error("An error occurred while fetching subregions");
      }
      return await res.json();
    },
  });
  const handleAddChurch = async () => {
    // Add logic to handle adding a region
    console.log("Adding region:", churchName);
    const res = await fetch("/api/church", {
      method: "POST",
      body: JSON.stringify({ name: churchName, region, subregion, country }),
    });
    if (res.ok) {
      queryClient.invalidateQueries(["churches"]);
      queryClient.refetchQueries(["churches"]);
      alert("successfully added church");
    } else {
      alert("An error occurred: " + res.statusText);
    }
    // // Reset the input
    setChurchName("");
    setRegion("");
    setSubregion("");
    setCountry("");
  };

  useEffect(() => {
    if (regionQuery.status === "success") {
      setRegions(regionQuery.data);
    } else if (regionQuery.status === "error") {
      alert(regionQuery.error.message);
    }
  }, [regionQuery.data, regionQuery.status]);

  useEffect(() => {
    if (subregionQuery.status === "success") {
      setSubregions(subregionQuery.data);
    } else if (subregionQuery.status === "error") {
      alert(subregionQuery.error.message);
    }
  }, [subregionQuery.data, subregionQuery.status]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className={buttonStyle}>ADD</button>
      </DialogTrigger>
      <DialogContent className="bg-white border-4 border-[#FCC346]">
        <DialogHeader>
          <DialogTitle className="font-bold text-lg">Add Church</DialogTitle>
          <DialogDescription className="text-[#B7B7B7] font-light text-sm">
            Enter the name of the new church you want to add.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {/* Family Name */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Church Name<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="churchName"
              value={churchName}
              onChange={(e) => setChurchName(e.target.value)}
              required
              className="border-[#01438F] border rounded-[5px] w-full h-10 text-base px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Region */}
          {/* SubRegion */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Region<span className="text-red-500">*</span>
            </label>
            <select
              name="region"
              value={region}
              onChange={(e) => setRegion(e.target.value)}
              className="border-[#01438F] border rounded-[5px] w-full h-10 text-base px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              required
            >
              <option value="">SELECT </option>
              {regions.map((region) => (
                <option value={region.id} key={region.id}>
                  {region.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              Sub Region<span className="text-red-500">*</span>
            </label>
            <select
              name="subRegion"
              value={subregion}
              onChange={(e) => setSubregion(e.target.value)}
              className="border-[#01438F] border rounded-[5px] w-full h-10 text-base px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              required
            >
              <option value="">SELECT </option>
              {subregions.map((subregion) => (
                <option value={subregion.id} key={subregion.id}>
                  {subregion.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              Country<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="country"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              required
              className="border-[#01438F] border rounded-[5px] w-full h-10 text-base px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
        <DialogFooter>
          <button className={buttonStyle} onClick={handleAddChurch}>
            Add Church
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export function DeleteChurchModal() {
  const [regionToDelete, setRegionToDelete] = useState("");
  const [churches, setChurches] = useState([]);
  const queryClient = useQueryClient();
  const churchQuery = useQuery({
    queryKey: ["churches"],
    queryFn: async () => {
      const res = await fetch("/api/church", { method: "GET" });
      if (!res.ok) {
        throw new Error("An error occurred while fetching churches");
      }
      return await res.json();
    },
  });
  useEffect(() => {
    if (churchQuery.status === "success") {
      setChurches(churchQuery.data);
    } else if (churchQuery.status === "error") {
      alert(churchQuery.error.message);
    }
  }, [churchQuery.data, churchQuery.status]);

  // This is a placeholder. In a real application, you'd fetch this data from your backend.
  const handleDeleteChurch = async () => {
    // Add logic to handle deleting a region
    console.log("Deleting church:", regionToDelete);
    const res = await fetch(`/api/church/${regionToDelete}/`, {
      method: "DELETE",
    });
    if (res.ok) {
      queryClient.refetchQueries(["churches"]);
      alert("Successfully deleted church");
    }
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
          <DialogTitle className="font-bold text-lg">Delete Church</DialogTitle>
          <DialogDescription className="text-[#B7B7B7] font-light text-sm">
            Select the church you want to delete.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="region-delete" className="text-right font-bold">
              Church
            </Label>
            <Select value={regionToDelete} onValueChange={setRegionToDelete}>
              <SelectTrigger className="col-span-3 border-2 border-black rounded-sm">
                <SelectValue placeholder="Select a Church" />
              </SelectTrigger>
              <SelectContent>
                {churches.map((region, index) => (
                  <SelectItem key={index} value={region.ID}>
                    {region.Name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <button
            className={buttonStyle}
            onClick={handleDeleteChurch}
            disabled={!regionToDelete}
          >
            Delete Church
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
    axiosInstance
      .post("/add-admin/", {
        username: adminName,
        email: adminEmail,
        password: adminPassword,
      })
      .then((response) => {
        if (response.status == 201) {
          alert(`Successfully added admin ${adminName}!`);
        }
      })
      .catch((err) => {
        if (err.response) {
          alert(err.response.data.error);
        } else {
          alert(err.status);
        }
      });
    // console.log("Adding new admin:", adminName, adminEmail);
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
              Email
            </Label>
            <input
              id="admin-password"
              type="password"
              value={adminEmail}
              onChange={(e) => setAdminEmail(e.target.value)}
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
