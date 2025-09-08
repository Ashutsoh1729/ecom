"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { useModalStore } from "@/util/states/modal";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

// 1. Define the validation schema with Zod
const formSchema = z.object({
  storeName: z.string().min(3, {
    message: "store name must be at least 3 characters.",
  }),
  storeDescription: z
    .string()
    .min(20, {
      message: "Description must be at least 20 characters.",
    })
    .max(500, {
      message: "Description cannot exceed 500 characters.",
    }),
  businessAddress: z.string().min(10, {
    message: "Please enter a full business address.",
  }),
  phoneNumber: z.string().regex(/^\d{10}$/, {
    message: "Please enter a valid 10-digit mobile number.",
  }),
  gstin: z.string().optional(),
  agreedToTerms: z.boolean().refine((val) => val === true, {
    message: "You must agree to the Seller Terms of Service.",
  }),
});

const SellerApplicationModal = () => {
  const { closeModal } = useModalStore();

  // 2. Set up the form using React Hook Form and the Zod resolver
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      storeName: "",
      storeDescription: "",
      businessAddress: "",
      phoneNumber: "",
      gstin: "",
      agreedToTerms: false,
    },
  });

  // 3. Define the submit handler
  function onSubmit(values: z.infer<typeof formSchema>) {
    // In a real app, you would send this 'values' object to your backend API
    console.log("Submitting validated seller application:", values);
    // alert("Application submitted successfully! We will review it shortly.");
    toast("Application submitted successfully!", {
      description: "We will review it and reach to you shortly.",
    });
    closeModal(); // Close the modal on successful submission
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800">Become a Seller</h2>
      <p className="mt-2 text-sm text-gray-600">
        Fill out the form below to start selling. All fields are required unless
        marked optional.
      </p>

      {/* 4. Build the form with Shadcn UI components */}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="mt-6 space-y-4">
          <FormField
            control={form.control}
            name="storeName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Store Name</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., Rourkela Handcrafts" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="storeDescription"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Store Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Describe what makes your products special..."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="businessAddress"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Business Address</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Your complete business address"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phoneNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Contact Phone Number</FormLabel>
                <FormControl>
                  <Input placeholder="10-digit mobile number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="gstin"
            render={({ field }) => (
              <FormItem>
                <FormLabel>GSTIN</FormLabel>
                <FormControl>
                  <Input
                    placeholder="15-digit GST Identification Number (Optional)"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Optional, but recommended for business sellers.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="agreedToTerms"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>I agree to the Seller Terms of Service</FormLabel>
                  <FormDescription>
                    You agree to our terms and conditions for selling on this
                    platform.
                  </FormDescription>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full bg-blue-600">
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default SellerApplicationModal;
