import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store";

interface SelectedSlot {
  serviceId: string;
  slotId: string;
}

interface BookingState {
  selectedSlots: SelectedSlot[];
}

const initialState: BookingState = {
  selectedSlots: [],
};

const bookingSlice = createSlice({
  name: "booking",
  initialState,
  reducers: {
    setSelectedSlots: (state, action: PayloadAction<{ serviceId: string; slotIds: string[] }>) => {
      const { serviceId, slotIds } = action.payload;
      // Remove all slots for the previous service ID
      state.selectedSlots = state.selectedSlots.filter(slot => slot.serviceId !== serviceId);
      // Add the new slots for the current service ID
      const newSlots = slotIds.map(slotId => ({ serviceId, slotId }));
      state.selectedSlots = [...state.selectedSlots, ...newSlots];
    },
    clearSelectedSlots: (state) => {
      state.selectedSlots = [];
    }
  },
});

export const { clearSelectedSlots, setSelectedSlots } = bookingSlice.actions;

// Selector to get the selected slots
export const selectSelectedSlots = (state: RootState) => state.booking.selectedSlots;

export default bookingSlice.reducer;
