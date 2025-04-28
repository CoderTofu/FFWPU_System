"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

import {
  User,
  Calendar,
  MapPin,
  Phone,
  Mail,
  Award,
  Briefcase,
} from "lucide-react";
import { axiosInstance } from "@/app/axiosInstance";

export default function DisplayMember() {
  const params = useParams();
  const memberID = params.memberID;
  const [userData, setUserData] = useState({});
  const [userBlessings, setUserBlessings] = useState([]);
  // In a real app, you would fetch data based on memberID
  useEffect(() => {
    // This would be replaced with an actual API call
    console.log("here");
    console.log("Fetching data for member ID:", memberID);
    (async function () {
      const response = await fetch(`/api/members/${params.memberID}`, {
        method: "GET",
      });
      const data = await response.json();
      console.log(data.Blessings);
      setUserData(data);
      setUserBlessings(data.Blessings);
    })();
  }, []);

  // Dummy data (would come from API in real implementation)
  // const [userData] = useState({
  //   name: "Taylor Marie Swift Batumbakal",
  //   gender: "Female",
  //   birthday: "12/13/1989",
  //   age: "35",
  //   nation: "Philippines",
  //   maritalStatus: "Single",
  //   spouseName: "",
  //   phone: "09999999999",
  //   email: "taylormariebatumbakal@gmail.com",
  //   address:
  //     "General Luna, corner Muralla St, Intramuros, Manila, 1002 Metro Manila",
  //   generation: "1st",
  //   spiritualBirthday: "01/31/2024",
  //   membershipCategory: "Member",
  //   spiritualParent1: "Rafael Torres",
  //   spiritualParent2: "Paolo Dionisio",
  //   missions: [
  //     {
  //       role: "Priest",
  //       organization: "Main Branch",
  //       country: "Philippines",
  //       date: "01/31/2025",
  //     },
  //     {
  //       role: "Staff",
  //       organization: "2nd Branch",
  //       country: "Philippines",
  //       date: "06/19/2024",
  //     },
  //   ],
  //   blessings: [
  //     { name: "Marriage", date: "01/31/2025" },
  //     { name: "Baptism", date: "08/19/1999" },
  //   ],
  // });

  // Helper function to render field with label
  const InfoField = ({ label, value }) => (
    <div className="flex flex-col space-y-1">
      <span className="text-sm text-muted-foreground">{label}</span>
      <span className="font-medium">{value || "—"}</span>
    </div>
  );

  return (
    <div className="container mx-auto py-8 bg-[#f8fafc] w-full px-0 md:[60px] lg:px-[150px]">
      <div className="w-full p-4 mx-auto bg-white rounded-md drop-shadow-lg flex items-center justify-center border-[#1C5CA8] border-2 shadow-lg">
        <p className="text-3xl font-bold uppercase">PROFILE INFORMATION</p>
      </div>

      <Card className="shadow-lg mt-4 w-full">
        <CardContent className="p-[30px] pt-6">
          {/* Profile Header */}
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6 mb-8">
            <Avatar className="w-24 h-24 border-2 border-primary">
              <AvatarImage src="/placeholder.svg?height=96&width=96" alt={userData['Full Name']} />
              <AvatarFallback className="bg-primary/10">
                <User className="h-12 w-12 text-primary" />
              </AvatarFallback>
            </Avatar>

            <div className="flex flex-col items-center md:items-start">
              <h2 className="text-2xl md:text-3xl font-bold">{userData['Full Name']}</h2>
              <div className="flex items-center gap-2 mt-2">
                <Badge variant="outline" className="bg-primary/10">
                  {userData['Membership Category']}
                </Badge>
                <Badge variant="outline" className="bg-primary/10">
                  Generation: {userData.Generation}
                </Badge>
              </div>

              <div className="flex items-center gap-2 mt-4">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{userData.Email}</span>
              </div>
              <div className="flex items-center gap-2 mt-1">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{userData.Phone}</span>
              </div>
            </div>
          </div>

          <Tabs defaultValue="personal" className="w-full">
            <TabsList className="grid grid-cols-3 mb-6">
              <TabsTrigger value="personal">Personal</TabsTrigger>
              <TabsTrigger value="spiritual">Spiritual</TabsTrigger>
              <TabsTrigger value="history">History</TabsTrigger>
            </TabsList>

            {/* Personal Information Tab */}
            <TabsContent value="personal" className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-4 text-[#BE9231]">Personal Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <InfoField label="Gender" value={userData.Gender} />
                  <InfoField label="Date of Birth" value={userData['Date Of Birth']} />
                  <InfoField label="Age" value={userData.Age} />
                  <InfoField label="Nation" value={userData.Country} />
                  <InfoField label="Marital Status" value={userData['Marital Status']} />
                  {/* <InfoField
                    label="Name of Spouse"
                    value={userData.spouseName}
                  /> */}
                </div>

                <div className="mt-6">
                  <InfoField label="Address" value={userData.Address} />
                  <div className="flex items-start gap-2 mt-2">
                    <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
                    <span className="text-sm text-muted-foreground">{userData.Address}</span>
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* Spiritual Information Tab */}
            <TabsContent value="spiritual" className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-[#BE9231] mb-4">Spiritual Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <InfoField label="Generation" value={userData.Generation} />
                  <InfoField label="Spiritual Birthday" value={userData['Spiritual Birthday']} />
                  <InfoField label="Membership Category" value={userData['Membership Category']} />

                  <div className="flex flex-col space-y-1">
                    <span className="text-sm text-muted-foreground">Spiritual Parents</span>
                    <ul className="space-y-1">
                      <li className="font-medium">{userData['Spiritual Parent']}</li>
                      {/* <li className="font-medium">
                        {userData.spiritualParent2}
                      </li> */}
                    </ul>
                  </div>
                </div>

                <div className="mt-8">
                  <h4 className="text-md font-semibold mb-3 text-[#BE9231]">Blessings</h4>
                  <div className="space-y-3">
                    {userBlessings != undefined ? (
                      userBlessings.map((blessing, index) => (
                        <div
                          key={index}
                          className="flex items-center gap-4 p-3 rounded-md bg-muted/50"
                        >
                          <Award className="h-5 w-5 text-primary" />
                          <div>
                            <div className="font-medium">{blessing['Name Of Blessing']}</div>
                            <div className="text-sm text-muted-foreground flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              {blessing['Blessing Date']}
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-sm text-muted-foreground">No blessings available.</div>
                    )}
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* Mission History Tab */}
            {/* <TabsContent value="history" className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-[#BE9231] mb-4">
                  Mission History
                </h3>
                <div className="space-y-4">
                  {userData.missions.map((mission, index) => (
                    <Card key={index} className="overflow-hidden">
                      <div className="p-4 border-l-4 border-primary">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                          <div className="flex items-start gap-3">
                            <Briefcase className="h-5 w-5 text-primary mt-0.5" />
                            <div>
                              <h4 className="font-semibold">{mission.role}</h4>
                              <p className="text-sm text-muted-foreground">
                                {mission.organization}
                              </p>
                            </div>
                          </div>

                          <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
                            <Badge variant="outline">{mission.country}</Badge>
                            <div className="text-sm flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              {mission.date}
                            </div>
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent> */}
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
