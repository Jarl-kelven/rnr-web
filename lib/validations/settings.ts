import * as z from "zod";

export const hotelSettingsSchema = z.object({
    // Profile
    fullName: z.string().min(3, "Full name is required"),
    email: z.string().email("Invalid email address"),
    phone: z.string().length(11, "Nigerian phone numbers must be 11 digits"), // e.g., 08012345678

    // Hotel Details
    hotelName: z.string().min(2, "Hotel name is required"),
    cacNumber: z.string().min(7, "Invalid CAC number format"),
    address: z.string().min(10, "Full physical address is required"),
    city: z.string().min(2, "City is required"),
    state: z.string().min(2, "State is required"),

    // Financials
    bankName: z.string().min(2, "Please select your bank"),
    accountNumber: z.string().length(10, "NUBAN Account number must be exactly 10 digits"),
    accountName: z.string().min(3, "Account name must match bank records"),
    tin: z.string().optional(),

    // Operations
    checkInTime: z.string(),
    checkOutTime: z.string(),
});

export type HotelSettingsValues = z.infer<typeof hotelSettingsSchema>;