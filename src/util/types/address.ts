import z from "zod";

// default is set to home
export const AddressTypeEnum = z.enum(["Home", "Work", "Other"]);

// fields - 1. Address Type (Optional), 2. Recipient Name, 3. Lane 1,
// 4. Lane 2( optional ), 5. Landmark, 6. city, 7. state
// 8. country, 9. Postalcode
export const addressFormSchema = z
  .object({
    recipientName: z
      .string()
      .trim()
      .min(3, { message: "Name can't be less than 3 characters." })
      .max(30, { message: "Name can't be more than 30 characters" }),
    lane1: z
      .string()
      .trim()
      .min(5, { message: "Address Lane 1 must be at least 5 characters." })
      .max(100, {
        message: "Address Lane 1 cannot be more than 100 characters.",
      }),
    lane2: z
      .string()
      .trim()
      .max(100, {
        message: "Address Lane 2 cannot be more than 100 characters.",
      })
      // 3. Handle optional fields that could be empty strings
      .optional()
      .nullable(),

    landmark: z
      .string()
      .trim()
      .max(100, {
        message: "Address Lane 2 cannot be more than 100 characters.",
      })
      .optional()
      .nullable(),
    // 3. Handle optional fields that could be empty strings
    city: z.string().trim().nonempty({ message: "City is required." }),
    state: z.string().trim().nonempty({ message: "City is required." }),
    country: z.enum(["India", "United States"]),
    postalCode: z
      .string()
      .trim()
      .nonempty({ message: "Postal Code is required." }),
    phoneNumber: z
      .string()
      .trim()
      // 2. Add regex for a common phone number format (e.g., 10 digits)
      .regex(/^\d{10}$/, "Please enter a valid 10-digit phone number.")
      .optional(), // Making phone number optional but validated if present

    // NEW: The addressType field
    // .nullable() allows the value to be `null`.
    // .optional() allows the key to be missing entirely (`undefined`).
    addressType: AddressTypeEnum.nullable().optional(),

    // NEW: The field for custom input when 'Other' is selected.
    // This is optional by default. We will make it required conditionally.
    otherAddressType: z.string().trim().optional().nullable(),
  })
  .superRefine((data, ctx) => {
    if (data.addressType === "Other") {
      if (!data.otherAddressType || data.otherAddressType.trim() === "") {
        ctx.addIssue({
          code: "custom",
          message: "Please specify your address type in the input field.",
          path: ["otherAddressType"],
        });
      }
    }
  });
