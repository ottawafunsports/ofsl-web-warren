import { Button } from '../../../../../components/ui/button';
import { Input } from '../../../../../components/ui/input';
import { X } from 'lucide-react';
import { NewGymForm, EditGymForm, Sport, DayOfWeek } from '../types';

interface GymFormProps {
  isEdit?: boolean;
  title: string;
  gym: NewGymForm | EditGymForm;
  sports: Sport[];
  daysOfWeek: DayOfWeek[];
  locations: string[];
  saving: boolean;
  onGymChange: (gym: NewGymForm | EditGymForm) => void;
  onDayToggle: (dayId: number) => void;
  onSportToggle: (sportId: number) => void;
  onLocationToggle: (location: string) => void;
  onSave: () => void;
  onCancel: () => void;
}

export function GymForm({
  isEdit = false,
  title,
  gym,
  sports,
  daysOfWeek,
  locations,
  saving,
  onGymChange,
  onDayToggle,
  onSportToggle,
  onLocationToggle,
  onSave,
  onCancel
}: GymFormProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 mb-8">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold text-[#6F6F6F]">{title}</h3>
        <Button
          onClick={onCancel}
          className="text-gray-500 hover:text-gray-700 bg-transparent hover:bg-gray-100 rounded-full p-2 transition-colors"
        >
          <X className="h-5 w-5" />
        </Button>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-[#6F6F6F] mb-2">School/Gym Name</label>
          <Input
            value={gym.gym}
            onChange={(e) => onGymChange({ ...gym, gym: e.target.value })}
            placeholder="Enter school or gym name"
            className="w-full"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-[#6F6F6F] mb-2">Address</label>
          <Input
            value={gym.address}
            onChange={(e) => onGymChange({ ...gym, address: e.target.value })}
            placeholder="Enter address"
            className="w-full"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-[#6F6F6F] mb-2">Access Instructions</label>
          <textarea
            value={gym.instructions}
            onChange={(e) => onGymChange({ ...gym, instructions: e.target.value })}
            placeholder="Enter instructions for accessing the gym/school"
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-[#B20000] focus:ring-[#B20000]"
          />
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            id={`${isEdit ? 'edit' : 'new'}-gym-active`}
            checked={gym.active}
            onChange={(e) => onGymChange({ ...gym, active: e.target.checked })}
            className="mr-2"
          />
          <label htmlFor={`${isEdit ? 'edit' : 'new'}-gym-active`} className="text-sm font-medium text-[#6F6F6F]">
            Active
          </label>
        </div>

        <div>
          <label className="block text-sm font-medium text-[#6F6F6F] mb-3">Locations</label>
          <div className="flex flex-wrap gap-2">
            {locations.map((location) => (
              <button
                key={location}
                type="button"
                onClick={() => onLocationToggle(location)}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  gym.locations.includes(location)
                    ? 'bg-[#B20000] text-white'
                    : 'bg-gray-100 text-[#6F6F6F] hover:bg-gray-200'
                }`}
              >
                {location}
              </button>
            ))}
          </div>
        </div>

        {gym.active && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-[#6F6F6F] mb-3">Available Days</label>
              <div className="space-y-2">
                {daysOfWeek.map((day) => (
                  <div key={day.id} className="flex items-center">
                    <input
                      type="checkbox"
                      id={`${isEdit ? 'edit' : 'new'}-day-${day.id}`}
                      checked={gym.availableDays.includes(day.id)}
                      onChange={() => onDayToggle(day.id)}
                      className="mr-2"
                    />
                    <label htmlFor={`${isEdit ? 'edit' : 'new'}-day-${day.id}`} className="text-sm text-[#6F6F6F]">
                      {day.name}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-[#6F6F6F] mb-3">Available Sports</label>
              <div className="space-y-2">
                {sports.map((sport) => (
                  <div key={sport.id} className="flex items-center">
                    <input
                      type="checkbox"
                      id={`${isEdit ? 'edit' : 'new'}-sport-${sport.id}`}
                      checked={gym.availableSports.includes(sport.id)}
                      onChange={() => onSportToggle(sport.id)}
                      className="mr-2"
                    />
                    <label htmlFor={`${isEdit ? 'edit' : 'new'}-sport-${sport.id}`} className="text-sm text-[#6F6F6F]">
                      {sport.name}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        <div className="flex justify-end gap-4">
          <Button
            onClick={onCancel}
            className="bg-gray-100 hover:bg-gray-200 text-gray-700"
          >
            Cancel
          </Button>
          <Button
            onClick={onSave}
            className="bg-[#B20000] hover:bg-[#8A0000] text-white"
            disabled={saving}
          >
            {saving ? 'Saving...' : isEdit ? 'Save Changes' : 'Save School'}
          </Button>
        </div>
      </div>
    </div>
  );
}