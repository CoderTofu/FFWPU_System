import React from 'react';

interface Props {
  formData: any;
  setFormData: (callback: (prev: any) => any) => void;
}

export default function MissionHistorySection({ formData, setFormData }: Props) {
  const addMission = () => {
    setFormData((prev) => ({
      ...prev,
      missionHistory: [
        ...prev.missionHistory,
        { role: '', organization: '', country: '', startDate: '', endDate: '' },
      ],
    }));
  };

  const removeMission = (index: number) => {
    const updated = [...formData.missionHistory];
    updated.splice(index, 1);
    setFormData((prev) => ({ ...prev, missionHistory: updated }));
  };

  const handleMissionChange = (index: number, field: string, value: string) => {
    const updated = [...formData.missionHistory];
    updated[index][field] = value;
    setFormData((prev) => ({ ...prev, missionHistory: updated }));
  };
  const formatDateForInput = (dateString: string) => {
    if (!dateString) return '';
    try {
      const date = new Date(dateString);
      return date.toISOString().split('T')[0];
    } catch {
      return '';
    }
  };

  return (
    <section className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-[#01438f] mb-2">Mission History</h2>
        <p className="text-sm text-gray-600 mb-6">
          List your past missions, organizations, and service periods.
        </p>
      </div>

      <div className="space-y-6">
        {formData.missionHistory.map((mission: any, idx: number) => (
          <div key={idx} className="relative rounded-lg py-4 shadow-sm">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              {/* Role */}
              <div className="flex flex-col">
                <label className="text-sm font-semibold text-gray-700 mb-1">Mission Role</label>
                <input
                  type="text"
                  value={mission.role}
                  onChange={(e) => handleMissionChange(idx, 'role', e.target.value)}
                  placeholder="Enter role"
                  className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>

              {/* Organization */}
              <div className="flex flex-col">
                <label className="text-sm font-semibold text-gray-700 mb-1">Organization</label>
                <input
                  type="text"
                  value={mission.organization}
                  onChange={(e) => handleMissionChange(idx, 'organization', e.target.value)}
                  placeholder="Enter organization"
                  className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>

              {/* Country */}
              <div className="flex flex-col">
                <label className="text-sm font-semibold text-gray-700 mb-1">Country</label>
                <input
                  type="text"
                  value={mission.country}
                  onChange={(e) => handleMissionChange(idx, 'country', e.target.value)}
                  placeholder="Enter country"
                  className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>

              {/* Start Date */}
              <div className="flex flex-col">
                <label className="text-sm font-semibold text-gray-700 mb-1">Start Date</label>
                <input
                  type="date"
                  value={mission.start_date}
                  onChange={(e) => handleMissionChange(idx, 'startDate', e.target.value)}
                  className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>

              {/* End Date */}
              <div className="flex flex-col">
                <label className="text-sm font-semibold text-gray-700 mb-1">End Date</label>
                <input
                  type="date"
                  value={mission.end_date}
                  onChange={(e) => handleMissionChange(idx, 'endDate', e.target.value)}
                  className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
            </div>

            {/* Delete Mission Button */}
            <button
              type="button"
              onClick={() => removeMission(idx)}
              className="absolute top-0 right-0 hover:scale-110 transition-all text-xl"
              title="Remove Mission"
            >
              🗑️
            </button>
          </div>
        ))}

        {/* Add Mission Button */}
        <div className="flex justify-center">
          <button
            type="button"
            onClick={addMission}
            className="bg-[#01438f] text-[#fff] font-bold px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            + Add Mission
          </button>
        </div>
      </div>
    </section>
  );
}
